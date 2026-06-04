import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Array of beautiful architectural background wireframes from public/images
const BLUEPRINT_IMAGES = [
  "/images/Model_1.1.png",
  "/images/Model_1.3.png",
  "/images/svc-architecture.png",
];

const DURATION = 7000; // 7.0 seconds execution duration

// Plateau generator for CAD-like loading profile (spread over 7 seconds)
const getSteppedProgress = (linearPct: number) => {
  if (linearPct < 15) return linearPct * 1.33; // 0 to 20%
  if (linearPct < 30) return 20 + (linearPct - 15) * 1.33; // 20 to 40%
  if (linearPct < 42) return 40; // Plateau 1 at 40% (base complete)
  if (linearPct < 60) return 40 + (linearPct - 42) * 1.77; // 40 to 72%
  if (linearPct < 70) return 72; // Plateau 2 at 72% (structure complete)
  if (linearPct < 90) return 72 + (linearPct - 70) * 0.8; // 72 to 88%
  if (linearPct < 95) return 88; // Plateau 3 at 88% (details complete)
  return 88 + (linearPct - 95) * 2.4; // 88 to 100%
};

// Bezier interpolation helper
const interpolateBezier = (
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] => {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  const x = mt3 * p0[0] + 3 * mt2 * t * p1[0] + 3 * mt * t2 * p2[0] + t3 * p3[0];
  const y = mt3 * p0[1] + 3 * mt2 * t * p1[1] + 3 * mt * t2 * p2[1] + t3 * p3[1];
  return [x, y];
};

// Bezier-based tracking path for Left Logo Shape (normalized inside 80x80 box, offset by 80, 80)
const getLeftLogoTracer = (t: number): [number, number] => {
  const ox = 80;
  const oy = 80;

  if (t < 0.2) {
    const pct = t / 0.2;
    return [ox + 42 * pct, oy];
  } else if (t < 0.6) {
    const pct = (t - 0.2) / 0.4;
    return interpolateBezier([ox + 42, oy], [ox + 42, oy + 28], [ox + 22, oy + 52], [ox + 22, oy + 80], pct);
  } else if (t < 0.8) {
    const pct = (t - 0.6) / 0.2;
    return [ox + 22 - 22 * pct, oy + 80];
  } else {
    const pct = (t - 0.8) / 0.2;
    return [ox, oy + 80 - 80 * pct];
  }
};

// Bezier-based tracking path for Right Logo Shape
const getRightLogoTracer = (t: number): [number, number] => {
  const ox = 80;
  const oy = 80;

  if (t < 0.2) {
    const pct = t / 0.2;
    return [ox + 80 - 42 * pct, oy + 80];
  } else if (t < 0.6) {
    const pct = (t - 0.2) / 0.4;
    return interpolateBezier([ox + 38, oy + 80], [ox + 38, oy + 52], [ox + 58, oy + 28], [ox + 58, oy], pct);
  } else if (t < 0.8) {
    const pct = (t - 0.6) / 0.2;
    return [ox + 58 + 22 * pct, oy];
  } else {
    const pct = (t - 0.8) / 0.2;
    return [ox + 80, oy + 80 * pct];
  }
};

// 3D coordinates representing a minimalist luxury Mies van der Rohe Pavilion [x, y, z]
const VERTICES = [
  // Base slab (y = -0.4)
  [-1.2, -0.4, -0.6], [1.2, -0.4, -0.6], [1.2, -0.4, 0.6], [-1.2, -0.4, 0.6],
  // Roof slab (y = 0.4)
  [-1.0, 0.4, -0.5], [1.0, 0.4, -0.5], [1.0, 0.4, 0.5], [-1.0, 0.4, 0.5],
  // Columns (slender vertical posts)
  [-0.6, -0.4, -0.2], [-0.6, 0.4, -0.2],
  [0.6, -0.4, 0.2], [0.6, 0.4, 0.2],
  // Minimal marble wall plane
  [-0.2, -0.4, -0.3], [-0.2, 0.4, -0.3], [-0.2, 0.4, 0.3], [-0.2, -0.4, 0.3],
  // Water pool border (on base)
  [0.2, -0.4, -0.4], [0.8, -0.4, -0.4], [0.8, -0.4, 0.2], [0.2, -0.4, 0.2],
];

// Edges connecting vertices with minimum progress percentages to construct live
const EDGES = [
  // Base slab (minPct: 0)
  { p1: 0, p2: 1, minPct: 0, color: "white" },
  { p1: 1, p2: 2, minPct: 0, color: "white" },
  { p1: 2, p2: 3, minPct: 0, color: "white" },
  { p1: 3, p2: 0, minPct: 0, color: "white" },

  // Columns (minPct: 20)
  { p1: 8, p2: 9, minPct: 20, color: "red" },
  { p1: 10, p2: 11, minPct: 20, color: "red" },

  // Minimal wall plane (minPct: 40)
  { p1: 12, p2: 13, minPct: 40, color: "white" },
  { p1: 13, p2: 14, minPct: 40, color: "white" },
  { p1: 14, p2: 15, minPct: 40, color: "white" },
  { p1: 15, p2: 12, minPct: 40, color: "white" },

  // Roof slab (minPct: 60)
  { p1: 4, p2: 5, minPct: 60, color: "white" },
  { p1: 5, p2: 6, minPct: 60, color: "white" },
  { p1: 6, p2: 7, minPct: 60, color: "white" },
  { p1: 7, p2: 4, minPct: 60, color: "white" },

  // Water pool (minPct: 80)
  { p1: 16, p2: 17, minPct: 80, color: "red" },
  { p1: 17, p2: 18, minPct: 80, color: "red" },
  { p1: 18, p2: 19, minPct: 80, color: "red" },
  { p1: 19, p2: 16, minPct: 80, color: "red" },
];

// Rotate around X-axis
const rotateX = (x: number, y: number, z: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [x, y * cos - z * sin, y * sin + z * cos];
};

// Rotate around Y-axis
const rotateY = (x: number, y: number, z: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [x * cos + z * sin, y, -x * sin + z * cos];
};

// Perspective project 3D to 2D screen coordinate space
const project = (x: number, y: number, z: number, angleX: number, angleY: number) => {
  let [rx, ry, rz] = rotateY(x, y, z, angleY);
  [rx, ry, rz] = rotateX(rx, ry, rz, angleX);

  const CAMERA_DIST = 3.5;
  const SCALE = 100; // scaling size
  const CX = 120; // center X of 240x240 view
  const CY = 120; // center Y of 240x240 view

  const sz = rz + CAMERA_DIST;
  const px = (rx / sz) * SCALE + CX;
  const py = (-ry / sz) * SCALE + CY;
  return [px, py];
};

interface PageTransitionLoaderProps {
  isIntroActive?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

export default function PageTransitionLoader({
  isIntroActive = false,
  onStart,
  onComplete,
}: PageTransitionLoaderProps) {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(BLUEPRINT_IMAGES[0]);
  const [angles, setAngles] = useState({ x: 18, y: 0 });
  const prevPathname = useRef(location.pathname);
  const wasIntroActive = useRef(isIntroActive);

  // Cursors representing the "2 main characters" (lasers drawing the building)
  const [tracer1, setTracer1] = useState<[number, number]>([120, 120]);
  const [tracer2, setTracer2] = useState<[number, number]>([120, 120]);

  // Cycle logs based on progress percentage
  const getLogMessage = (pct: number) => {
    if (pct < 10) return "CALIBRATING DRAWING CHANNELS...";
    if (pct < 25) return "TRACING BRAND IDENTITY LOGO...";
    if (pct < 40) return "MORPHING PLANES & GEOMETRIES...";
    if (pct < 60) return "LASER-ERECTING STRUCTURAL PILLARS...";
    if (pct < 80) return "ALIGNING ROOF CANOPY SEGMENTS...";
    if (pct < 100) return "STABILIZING WATER ENCLOSURE RATIOS...";
    return "TACTILE MATRIX INITIALIZATION COMPLETE.";
  };

  // Monitor isIntroActive and route changes
  useEffect(() => {
    // 1. If the intro video has just finished playing, trigger loader
    if (wasIntroActive.current && !isIntroActive) {
      wasIntroActive.current = false;
      setProgress(0);
      setIsActive(true);
      setIsVisible(true);
      onStart?.();
      return;
    }

    wasIntroActive.current = isIntroActive;

    // 2. If intro video is currently playing, hold/do nothing
    if (isIntroActive) return;

    // 3. Initial mount check (if intro was already played)
    if (!isActive && progress === 0) {
      setProgress(0);
      setIsActive(true);
      setIsVisible(true);
      onStart?.();
      return;
    }

    // 4. Route change check
    if (location.pathname !== prevPathname.current) {
      prevPathname.current = location.pathname;

      const randomIndex = Math.floor(Math.random() * BLUEPRINT_IMAGES.length);
      setCurrentImage(BLUEPRINT_IMAGES[randomIndex]);

      setProgress(0);
      setIsActive(true);
      setIsVisible(true);
      onStart?.();
    }
  }, [location.pathname, isIntroActive]);

  // Handle progress, rotation, and tracer updates
  useEffect(() => {
    if (!isActive) return;

    const startTime = Date.now();
    let animationFrameId: number;

    const update = () => {
      const elapsed = Date.now() - startTime;
      const linearPct = Math.min((elapsed / DURATION) * 100, 100);
      const steppedPct = Math.floor(getSteppedProgress(linearPct));

      setProgress(steppedPct);

      // Rotate model slowly over time (luxury feel)
      const timeSec = elapsed / 1000;
      const currentAngles = {
        x: 18 + Math.sin(timeSec * 0.25) * 4,
        y: timeSec * 16,
      };
      setAngles(currentAngles);

      // Determine tracers (the "2 characters") coordinates
      if (steppedPct < 25) {
        // Logo Tracing Phase (0% to 25% progress)
        // Normalize parameter t between 0 and 1 for the first phase
        const t = Math.min(steppedPct / 24, 1);
        setTracer1(getLeftLogoTracer(t));
        setTracer2(getRightLogoTracer(t));
      } else {
        // 3D Building Construction Phase (25% to 100% progress)
        // Find active construction edges in their phase window
        const activeEdges = EDGES.filter(e => steppedPct >= e.minPct && steppedPct < e.minPct + 15);
        
        let t1Assigned = false;
        let t2Assigned = false;

        const timeFactor = (Date.now() % 1000) / 1000;

        if (activeEdges.length > 0) {
          // Tracer 1: slides along first active edge
          const edge1 = activeEdges[0];
          const p1 = VERTICES[edge1.p1];
          const p2 = VERTICES[edge1.p2];
          const [x1, y1] = project(p1[0], p1[1], p1[2], currentAngles.x, currentAngles.y);
          const [x2, y2] = project(p2[0], p2[1], p2[2], currentAngles.x, currentAngles.y);
          const slide = Math.sin(timeFactor * Math.PI * 2) * 0.5 + 0.5;
          setTracer1([x1 + (x2 - x1) * slide, y1 + (y2 - y1) * slide]);
          t1Assigned = true;

          if (activeEdges.length > 1) {
            // Tracer 2: slides along second active edge
            const edge2 = activeEdges[1];
            const ep1 = VERTICES[edge2.p1];
            const ep2 = VERTICES[edge2.p2];
            const [ex1, ey1] = project(ep1[0], ep1[1], ep1[2], currentAngles.x, currentAngles.y);
            const [ex2, ey2] = project(ep2[0], ep2[1], ep2[2], currentAngles.x, currentAngles.y);
            const slide2 = Math.cos(timeFactor * Math.PI * 2) * 0.5 + 0.5;
            setTracer2([ex1 + (ex2 - ex1) * slide2, ey1 + (ey2 - ey1) * slide2]);
            t2Assigned = true;
          }
        }

        // Orbit fallback if tracers are idle (plateaus)
        if (!t1Assigned) {
          // Tracer 1 glides slowly around the base perimeter (vertices 0-3)
          const loopT = (Date.now() % 4000) / 4000;
          const pIdx = Math.floor(loopT * 4) % 4;
          const nextIdx = (pIdx + 1) % 4;
          const p1 = VERTICES[pIdx];
          const p2 = VERTICES[nextIdx];
          const [x1, y1] = project(p1[0], p1[1], p1[2], currentAngles.x, currentAngles.y);
          const [x2, y2] = project(p2[0], p2[1], p2[2], currentAngles.x, currentAngles.y);
          const slide = (loopT * 4) % 1;
          setTracer1([x1 + (x2 - x1) * slide, y1 + (y2 - y1) * slide]);
        }

        if (!t2Assigned) {
          // Tracer 2 glides slowly around the roof perimeter (vertices 4-7)
          const loopT = ((Date.now() + 2000) % 4000) / 4000;
          const pIdx = (Math.floor(loopT * 4) % 4) + 4;
          const nextIdx = ((pIdx - 4 + 1) % 4) + 4;
          const p1 = VERTICES[pIdx];
          const p2 = VERTICES[nextIdx];
          const [x1, y1] = project(p1[0], p1[1], p1[2], currentAngles.x, currentAngles.y);
          const [x2, y2] = project(p2[0], p2[1], p2[2], currentAngles.x, currentAngles.y);
          const slide = (loopT * 4) % 1;
          setTracer2([x1 + (x2 - x1) * slide, y1 + (y2 - y1) * slide]);
        }
      }

      if (linearPct < 100) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        // Finished! Stay at 100% briefly before fading out
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.(); // Fades in the layout page in parallel
          // Wait for fadeout animation (500ms) to hide loader entirely
          setTimeout(() => {
            setIsActive(false);
          }, 500);
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  if (!isActive) return null;

  // Compute smooth morph opacities between logo and 3D wireframe (blend range: 20% to 30%)
  const logoOpacity = Math.max(0, Math.min(1, (28 - progress) / 8));
  const buildOpacity = Math.max(0, Math.min(1, (progress - 20) / 8));

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 bg-[#0a0a0a] transition-opacity duration-500 ease-out select-none pointer-events-auto ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blueprint Graphic Background Shadow (very subtle low-opacity) */}
      <div
        className="absolute inset-0 opacity-[0.015] grayscale invert contrast-125 bg-center bg-cover bg-no-repeat transition-all duration-700 ease-out scale-105 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url(${currentImage})`,
        }}
      />

      {/* Screen Border Ticks (CAD-like style) */}
      <div className="absolute top-0 left-0 w-full h-full border border-white/5 pointer-events-none">
        <div className="absolute top-0 left-12 w-[1px] h-3 bg-white/20" />
        <div className="absolute top-0 right-12 w-[1px] h-3 bg-white/20" />
        <div className="absolute bottom-0 left-12 w-[1px] h-3 bg-white/20" />
        <div className="absolute bottom-0 right-12 w-[1px] h-3 bg-white/20" />
        <div className="absolute left-0 top-12 w-3 h-[1px] bg-white/20" />
        <div className="absolute left-0 bottom-12 w-3 h-[1px] bg-white/20" />
        <div className="absolute right-0 top-12 w-3 h-[1px] bg-white/20" />
        <div className="absolute right-0 bottom-12 w-3 h-[1px] bg-white/20" />
      </div>

      {/* TOP: Header info */}
      <div className="flex justify-between items-start w-full relative z-10 text-[9px] md:text-[10px] text-white/30 font-mono tracking-[0.25em] uppercase">
        <div className="flex flex-col gap-1">
          <div>STUDIO TACTILE // CORE INITIALIZER</div>
          <div className="text-[8px] opacity-50">SYSTEM STATE: ACTIVE</div>
        </div>
        <div className="text-right flex flex-col gap-1">
          <div>LOC: {location.pathname.toUpperCase()}</div>
          <div className="text-[8px] opacity-50">REF: {currentImage.split("/").pop()}</div>
        </div>
      </div>

      {/* CENTER: Drawing stage featuring Logo morphing to 3D and the Tracing Laser Cursors */}
      <div className="flex flex-col items-center justify-center relative z-10 my-auto">
        <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
          
          {/* Static CAD alignment wheels */}
          <svg className="absolute inset-0 w-full h-full text-white/5" viewBox="0 0 240 240">
            <line x1="120" y1="0" x2="120" y2="240" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="240" y2="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="120" cy="120" r="110" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 10" fill="none" className="origin-center animate-[spin_60s_linear_infinite]" />
          </svg>

          {/* SVG stage for drawing both paths and tracers */}
          <svg className="absolute w-64 h-64 overflow-visible" viewBox="0 0 240 240">
            
            {/* STAGE A: Logo Outlines (Active during progress < 28%) */}
            {logoOpacity > 0 && (
              <g style={{ opacity: logoOpacity }}>
                {/* Left Logo segment outline */}
                <path
                  d="M 80,80 H 122 C 122,108 102,132 102,160 H 80 Z"
                  fill="none"
                  stroke="#eaeaea"
                  strokeWidth="0.75"
                  strokeDasharray="260"
                  strokeDashoffset={260 - Math.min(progress / 24, 1) * 260}
                />
                {/* Right Logo segment outline */}
                <path
                  d="M 160,160 H 118 C 118,132 138,108 138,80 H 160 Z"
                  fill="none"
                  stroke="#eaeaea"
                  strokeWidth="0.75"
                  strokeDasharray="260"
                  strokeDashoffset={260 - Math.min(progress / 24, 1) * 260}
                />
              </g>
            )}

            {/* STAGE B: 3D Mies Pavilion wireframe (Active during progress > 20%) */}
            {buildOpacity > 0 && (
              <g style={{ opacity: buildOpacity }}>
                {EDGES.map((edge, index) => {
                  // Only construct the edge if progress exceeds its target
                  if (progress < edge.minPct) return null;

                  const p1 = VERTICES[edge.p1];
                  const p2 = VERTICES[edge.p2];
                  const [x1, y1] = project(p1[0], p1[1], p1[2], angles.x, angles.y);
                  const [x2, y2] = project(p2[0], p2[1], p2[2], angles.x, angles.y);

                  return (
                    <line
                      key={index}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={edge.color === "red" ? "#e03a2f" : "#eaeaea"}
                      strokeWidth={edge.color === "red" ? "0.6" : "0.75"}
                      strokeOpacity={edge.color === "red" ? "0.6" : "0.8"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </g>
            )}

            {/* STAGE C: Glowing Laser Tracers (The "2 characters" constructing the forms) */}
            <g>
              {/* Tracer 1: Red Laser */}
              <g>
                <circle cx={tracer1[0]} cy={tracer1[1]} r="6" fill="#e03a2f" opacity="0.3" className="animate-pulse" />
                <circle cx={tracer1[0]} cy={tracer1[1]} r="2.5" fill="#e03a2f" />
                {/* Horizontal reference line */}
                <line x1={tracer1[0] - 15} y1={tracer1[1]} x2={tracer1[0] + 15} y2={tracer1[1]} stroke="#e03a2f" strokeWidth="0.5" strokeOpacity="0.4" />
                {/* Vertical reference line */}
                <line x1={tracer1[0]} y1={tracer1[1] - 15} x2={tracer1[0]} y2={tracer1[1] + 15} stroke="#e03a2f" strokeWidth="0.5" strokeOpacity="0.4" />
              </g>

              {/* Tracer 2: White/Silver Laser */}
              <g>
                <circle cx={tracer2[0]} cy={tracer2[1]} r="6" fill="#f5f5f5" opacity="0.25" className="animate-pulse" />
                <circle cx={tracer2[0]} cy={tracer2[1]} r="2.5" fill="#f5f5f5" />
                {/* Horizontal reference line */}
                <line x1={tracer2[0] - 15} y1={tracer2[1]} x2={tracer2[0] + 15} y2={tracer2[1]} stroke="#f5f5f5" strokeWidth="0.5" strokeOpacity="0.3" />
                {/* Vertical reference line */}
                <line x1={tracer2[0]} y1={tracer2[1] - 15} x2={tracer2[0]} y2={tracer2[1] + 15} stroke="#f5f5f5" strokeWidth="0.5" strokeOpacity="0.3" />
              </g>
            </g>

          </svg>

          {/* Dynamic glowing expansion ring */}
          <div className="absolute w-44 h-44 rounded-full border border-white/5 animate-ping opacity-15" />
        </div>
      </div>

      {/* BOTTOM: Progress bar, custom logo on bottom-left, percentage & details on bottom-right */}
      <div className="w-full flex flex-col gap-5 relative z-10">
        {/* Laser scanner line / Progress bar (extremely thin hair-thin line) */}
        <div className="w-full bg-white/5 h-[1px] relative overflow-hidden">
          <div
            className="bg-[#e03a2f] h-full transition-all duration-100 ease-out shadow-[0_0_4px_#e03a2f]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
          {/* Logo on the bottom-left */}
          <div className="flex items-center gap-4 bg-[#0a0a0a]/80 backdrop-blur-sm p-3 border border-white/5 rounded-sm">
            {/* Logo Icon SVG */}
            <svg className="w-10 h-10 text-[#eaeaea]" viewBox="0 0 80 80" fill="currentColor">
              {/* Left shape */}
              <path d="M 0,0 H 42 C 42,28 22,52 22,80 H 0 Z" />
              {/* Right shape */}
              <path d="M 80,80 H 38 C 38,52 58,28 58,0 H 80 Z" />
            </svg>

            {/* Logo Text Block */}
            <div className="flex flex-col justify-center text-left">
              <span className="text-[8.5px] font-light tracking-[0.38em] text-[#eaeaea] uppercase leading-none mb-0.5">
                STUDIO
              </span>
              <span className="text-[17px] font-black tracking-[0.06em] text-[#eaeaea] uppercase leading-none mb-1">
                TACTILE
              </span>
              <span className="text-[6.5px] font-normal tracking-[0.1em] text-white/30 uppercase font-mono leading-none">
                Architecture + Design
              </span>
            </div>
          </div>

          {/* Status logs & Percentage on bottom-right */}
          <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-left sm:text-right w-full sm:w-auto">
            <div className="text-[8px] font-mono tracking-[0.25em] text-[#e03a2f] uppercase">
              {getLogMessage(progress)}
            </div>
            <div className="flex items-baseline gap-3">
              <div className="text-[8px] text-white/30 tracking-[0.2em] uppercase">
                LOAD RATIO
              </div>
              <div className="text-2xl md:text-3xl font-light tracking-[0.05em] text-[#eaeaea] leading-none">
                {String(progress).padStart(3, "0")}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
