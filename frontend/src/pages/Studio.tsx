import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

// --- DATA ARRAYS ---
const studioMetrics = [
  { label: "Years of Practice", value: "8+" },
  { label: "Completed Projects", value: "22+" },
  { label: "Active Sites", value: "8" },
];

const teamMetrics = [
  { label: "Architects", value: "05+" },
  { label: "Structural Engineers", value: "02+" },
  { label: "Execution & Support Team", value: "08+" },
];

const methodologySteps = [
  {
    phase: "PHASE_01",
    title: "Context & Mapping",
    description: "Analyzing local terrains, solar paths, and structural parameters before initiating geometric drawings.",
    vertices: [
      [-1.0, -0.1, -1.0], [0.0, 0.1, -1.0], [1.0, -0.1, -1.0],
      [-1.0, 0.0, 0.0], [0.0, 0.2, 0.0], [1.0, -0.1, 0.0],
      [-1.0, -0.2, 1.0], [0.0, 0.1, 1.0], [1.0, -0.2, 1.0],
    ],
    edges: [
      [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
      [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8],
    ],
    angleX: 65,
    angleY: 0,
    scale: 105,
    colClass: "col-start-1 col-end-2 row-start-1 row-end-2",
  },
  {
    phase: "PHASE_02",
    title: "Volumetric Massing",
    description: "Developing raw structural masses to command physical scale and ground the project on site.",
    vertices: [
      [-0.8, -0.5, -0.8], [0.8, -0.5, -0.8], [0.8, -0.5, 0.8], [-0.8, -0.5, 0.8],
      [-0.8, 0.1, -0.8], [0.8, 0.1, -0.8], [0.8, 0.1, 0.8], [-0.8, 0.1, 0.8],
      [-0.4, 0.1, -0.4], [1.0, 0.1, -0.4], [1.0, 0.1, 0.4], [-0.4, 0.1, 0.4],
      [-0.4, 0.6, -0.4], [1.0, 0.6, -0.4], [1.0, 0.6, 0.4], [-0.4, 0.6, 0.4],
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7],
      [8, 9], [9, 10], [10, 11], [11, 8], [12, 13], [13, 14], [14, 15], [15, 12], [8, 12], [9, 13], [10, 14], [11, 15],
    ],
    angleX: 22,
    angleY: 45,
    scale: 90,
    colClass: "col-start-3 col-end-4 row-start-1 row-end-2",
  },
  {
    phase: "PHASE_03",
    title: "The Spatial Void",
    description: "Carving intentional negative spaces inside the mass to capture natural light, shadow, and quiet pathways.",
    vertices: [
      [-0.7, -0.7, -0.7], [0.7, -0.7, -0.7], [0.7, -0.7, 0.7], [-0.7, -0.7, 0.7],
      [-0.7, 0.7, -0.7], [0.7, 0.7, -0.7], [0.7, 0.7, 0.7], [-0.7, 0.7, 0.7],
      [-0.3, -0.3, -0.7], [0.3, -0.3, -0.7], [0.3, -0.3, 0.7], [-0.3, -0.3, 0.7],
      [-0.3, 0.3, -0.7], [0.3, 0.3, -0.7], [0.3, 0.3, 0.7], [-0.3, 0.3, 0.7],
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7],
      [8, 9], [9, 10], [10, 11], [11, 8], [12, 13], [13, 14], [14, 15], [15, 12], [8, 12], [9, 13], [10, 14], [11, 15],
    ],
    angleX: 15,
    angleY: -30,
    scale: 90,
    colClass: "col-start-2 col-end-3 row-start-2 row-end-3",
  },
  {
    phase: "PHASE_04",
    title: "Tactile Materiality",
    description: "Selecting honest, raw materials—textured concrete, untreated wood, and raw iron—designed to wear with age.",
    vertices: [
      [-0.8, -0.2, -0.8], [0.8, -0.2, -0.8], [0.8, -0.2, 0.8], [-0.8, -0.2, 0.8],
      [-0.8, 0.2, -0.8], [0.8, 0.2, -0.8], [0.8, 0.2, 0.8], [-0.8, 0.2, 0.8],
      [-0.6, 0.2, -0.6], [0.6, 0.2, -0.6],
      [-0.6, 0.2, -0.2], [0.6, 0.2, -0.2],
      [-0.6, 0.2, 0.2], [0.6, 0.2, 0.2],
      [-0.6, 0.2, 0.6], [0.6, 0.2, 0.6],
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7],
      [8, 9], [10, 11], [12, 13], [14, 15],
    ],
    angleX: 8,
    angleY: 65,
    scale: 100,
    colClass: "col-start-1 col-end-2 row-start-3 row-end-4",
  },
  {
    phase: "PHASE_05",
    title: "Assembly & Permanence",
    description: "Directing structural engineering oversight to ensure physical stability and detail execution.",
    vertices: [
      [-0.8, -0.6, -0.8], [0.8, -0.6, -0.8], [0.8, -0.6, 0.8], [-0.8, -0.6, 0.8],
      [-0.8, 0.2, -0.8], [0.8, 0.2, -0.8], [0.8, 0.2, 0.8], [-0.8, 0.2, 0.8],
      [-0.9, 0.5, -0.9], [0.9, 0.5, -0.9], [0.9, 0.5, 0.9], [-0.9, 0.5, 0.9],
      [0.0, 0.8, -0.9], [0.0, 0.8, 0.9],
    ],
    edges: [
      [0, 4], [1, 5], [2, 6], [3, 7],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [8, 9], [9, 10], [10, 11], [11, 8],
      [8, 12], [9, 12], [10, 13], [11, 13], [12, 13],
    ],
    angleX: 35,
    angleY: -45,
    scale: 90,
    colClass: "col-start-3 col-end-4 row-start-3 row-end-4",
  },
];

const clients = [
  "SRV HORIZON",
  "HAUS OF HORIZON",
  "SRV THAILA MAHAL",
  "AGAM FURNITURE",
  "AVANTAS CONSTRUCTION",
  "SR PROMOTORS",
];

const careers = [
  { 
    id: "snr-arch",
    title: "Senior Architect", 
    location: "London / Full-Time",
    description: "We are seeking a visionary Senior Architect to lead complex residential and cultural projects from concept to completion.",
    responsibilities: [
      "Lead design teams through all project phases.",
      "Manage client relationships and technical coordination.",
      "Oversee construction documentation and on-site quality control.",
      "Mentor junior staff and contribute to studio culture."
    ],
    requirements: [
      "8+ years of experience in high-end architecture.",
      "Proficiency in Revit, Rhino, and Adobe Creative Suite.",
      "Strong technical knowledge of materials and detailing.",
      "Excellent communication and leadership skills."
    ]
  },
  { 
    id: "vis-intern",
    title: "Visualizer & Intern", 
    location: "Remote / Seasonal",
    description: "Join our design lab to push the boundaries of architectural representation and neural rendering.",
    responsibilities: [
      "Produce high-end cinematic visualizations.",
      "Assist in conceptual modeling and material research.",
      "Contribute to the studio's digital publication efforts.",
      "Support the design team with 3D assets."
    ],
    requirements: [
      "Strong portfolio of architectural visualization.",
      "Experience with Unreal Engine, V-Ray, or similar tools.",
      "Currently enrolled in or recently graduated from an architecture program.",
      "A keen eye for light, texture, and composition."
    ]
  },
  { 
    id: "prj-mgr",
    title: "Project Manager", 
    location: "Zurich / Full-Time",
    description: "A technical role focused on the precise execution of our Swiss portfolio.",
    responsibilities: [
      "Coordinate with local authorities and contractors.",
      "Manage project timelines, budgets, and resources.",
      "Ensure adherence to local building codes and standards.",
      "Facilitate communication between the London studio and Zurich sites."
    ],
    requirements: [
      "5+ years of project management experience in Switzerland.",
      "Fluency in German and English.",
      "Deep understanding of Swiss construction laws (SIA).",
      "Highly organized with strong problem-solving abilities."
    ]
  },
];

const partners = [
  { name: "Promoters / Developers", partner: "Adisha Realty" },
  { name: "Material Suppliers", partner: "Ramco Cement / Kajaria Tiles" },
  { name: "Builders / Contractors", partner: "Sri Builders / RK Constructions" },
  { name: "Structural Engineering", partner: "S. Kumar Structural Consultants, Vertex Structures" },
];

interface Projected3DModelProps {
  vertices: number[][];
  edges: number[][];
  angleX: number;
  angleY: number;
  scale: number;
  isHovered: boolean;
}

function Projected3DModel({ vertices, edges, angleX, angleY, scale, isHovered }: Projected3DModelProps) {
  const [rotation, setRotation] = useState({ x: angleX, y: angleY });
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const delta = time - previousTimeRef.current;
        const speedMultiplier = isHovered ? 0.03 : 0.01;
        setRotation(prev => ({
          x: prev.x + (isHovered ? 0.15 : 0.04) * speedMultiplier * delta,
          y: prev.y + (isHovered ? 0.35 : 0.1) * speedMultiplier * delta,
        }));
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered]);

  const width = 200;
  const height = 180;
  
  const radX = (rotation.x * Math.PI) / 180;
  const radY = (rotation.y * Math.PI) / 180;

  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);
  const cosY = Math.cos(radY);
  const sinY = Math.sin(radY);

  const projectedPoints = vertices.map(([vx, vy, vz]) => {
    const x1 = vx * cosY - vz * sinY;
    const z1 = vx * sinY + vz * cosY;
    const y1 = vy;

    const x2 = x1;
    const y2 = y1 * cosX - z1 * sinX;
    const z2 = y1 * sinX + z1 * cosX;

    const d = 3.0;
    const perspective = d / (d + z2);

    const sx = width / 2 + x2 * scale * perspective;
    const sy = height / 2 - y2 * scale * perspective;

    return { x: sx, y: sy };
  });

  return (
    <svg className="w-full h-full text-foreground/30 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
      <line x1={width/2} y1={0} x2={width/2} y2={height} stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="opacity-25" />
      <line x1={0} y1={height/2} x2={width} y2={height/2} stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="opacity-25" />
      <circle cx={width/2} cy={height/2} r={scale * 0.75} fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 6" className="opacity-15" />

      {edges.map(([p1, p2], idx) => {
        const pt1 = projectedPoints[p1];
        const pt2 = projectedPoints[p2];
        if (!pt1 || !pt2) return null;
        return (
          <line
            key={idx}
            x1={pt1.x}
            y1={pt1.y}
            x2={pt2.x}
            y2={pt2.y}
            stroke={isHovered ? "#e03a2f" : "currentColor"}
            strokeWidth={isHovered ? "0.75" : "0.5"}
            className="transition-all duration-300 opacity-70"
          />
        );
      })}

      {projectedPoints.map((pt, idx) => (
        <circle
          key={idx}
          cx={pt.x}
          cy={pt.y}
          r={isHovered ? 2 : 1}
          fill={isHovered ? "#e03a2f" : "currentColor"}
          className="transition-all duration-300 opacity-80"
        />
      ))}
    </svg>
  );
}

// --- COMPONENT ---
export default function Studio() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(careers[0].id);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // 0 = Studio Metrics, 1 = Team Metrics

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) return;

      const elements = methodologySteps.map((_, i) =>
        document.getElementById(`methodology-step-${i}`)
      );

      const viewportCenter = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let minDistance = Infinity;

      elements.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance && rect.top < window.innerHeight && rect.bottom > 0) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== null) {
        setHoveredStep(closestIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run immediately to capture initial screen state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedJob = careers.find(j => j.id === selectedJobId) || careers[0];

  const handleJobClick = (id: string) => {
    setSelectedJobId(id);
    setFormSubmitted(false); // Reset form status when switching jobs
    if (window.innerWidth < 768) {
      setIsMobileOverlayOpen(true);
    }
  };

  const handleApplyClick = () => {
    setIsSubmitting(true);
    // Open Google Form in a new tab
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfCFuuakblZtZZWweeks9PZJ-thRowOUPohAjZ2pgOp2_CY6w/viewform";
    window.open(GOOGLE_FORM_URL, "_blank");
    
    // Simulate redirection delay for premium look feedback on-page
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1000);
  };

  const renderApplicationForm = () => {
    if (formSubmitted) {
      return (
        <div className="border border-border bg-background p-8 md:p-12 text-center flex flex-col items-center justify-center gap-6 relative min-h-[280px] overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          
          <svg className="w-10 h-10 text-accent animate-pulse" viewBox="0 0 80 80" fill="currentColor">
            <path d="M 0,0 H 42 C 42,28 22,52 22,80 H 0 Z" />
            <path d="M 80,80 H 38 C 38,52 58,28 58,0 H 80 Z" />
          </svg>

          <div className="space-y-1 relative z-10">
            <h4 className="text-lg font-black uppercase tracking-[0.2em] text-foreground">
              Dossier Accessed
            </h4>
            <p className="text-[8px] font-mono tracking-widest text-accent uppercase">
              GOOGLE FORM LINK LAUNCHED // STATUS: ACTIVE
            </p>
          </div>
          
          <p className="text-xs text-muted max-w-sm leading-relaxed relative z-10 font-medium">
            The secure official form has been opened in a new tab. Please complete your submission details there to apply.
          </p>

          <button
            onClick={() => setFormSubmitted(false)}
            className="mt-2 border border-border hover:border-accent px-6 py-2 text-[9px] font-mono tracking-widest uppercase transition-colors duration-300 cursor-pointer"
          >
            Launch Form Again
          </button>
        </div>
      );
    }

    return (
      <div className="bg-background/30 backdrop-blur-sm p-8 md:p-12 border border-border text-center flex flex-col items-center justify-center gap-6 min-h-[280px] relative">
        <style>{`
          @keyframes laser-scan-btn {
            0% { left: 0%; }
            50% { left: 100%; }
            100% { left: 0%; }
          }
          .animate-laser-scan-btn {
            position: absolute;
            top: 0;
            height: 100%;
            width: 2px;
            background-color: #e03a2f;
            box-shadow: 0 0 8px #e03a2f;
            animation: laser-scan-btn 2.5s ease-in-out infinite;
          }
        `}</style>
        
        {/* CAD layout designators */}
        <div className="absolute top-2 left-2 text-[7px] font-mono text-muted/30">SEC_REF // GP_FORM</div>
        <div className="absolute top-2 right-2 text-[7px] font-mono text-muted/30">V_1.02</div>

        <div className="space-y-2 max-w-md">
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">
            Official Application Portal
          </h4>
          <p className="text-xs text-muted leading-relaxed font-light">
            We utilize secure Google Forms for screening candidate credentials. Click below to launch the document in a new window.
          </p>
        </div>

        {/* Laser Action Button */}
        <button
          onClick={handleApplyClick}
          disabled={isSubmitting}
          className="relative w-full max-w-sm border border-border hover:border-accent py-4 text-[10px] font-mono font-bold tracking-[0.3em] uppercase transition-all duration-300 overflow-hidden group/btn cursor-pointer"
        >
          <div className="hidden group-hover/btn:block animate-laser-scan-btn" />
          {isSubmitting ? "REDIRECTING..." : "LAUNCH APPLICATION FORM"}
        </button>
      </div>
    );
  };

  return (
    <main className="pt-24 md:pt-32 overflow-x-hidden selection:bg-accent selection:text-background">
      {/* 1. STUDIO OVERVIEW (What We Do + Philosophy) */}
      <section
        className="px-4 md:px-12 mb-24 md:mb-40 relative min-h-[50vh] flex flex-col justify-center group/hero"
        aria-labelledby="studio-hero-title"
      >
        <div className="absolute inset-0 md:left-1/4 -z-10 opacity-30 overflow-hidden pointer-events-none">
          <img 
            src="/images/view_2.jpg" 
            alt="Studio Background" 
            className="w-full h-[120%] object-cover object-center grayscale brightness-75 transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover/hero:grayscale-0 group-hover/hero:brightness-100 group-hover/hero:scale-105" 
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)' 
            }}
          />
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 relative z-10 w-full">
          <header className="col-span-12 md:col-span-8">
            <motion.h1
              id="studio-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12 break-words text-foreground drop-shadow-2xl mix-blend-plus-lighter"
            >
              Building the <br />
              <span className="text-accent drop-shadow-2xl">Permanent.</span>
            </motion.h1>
            <p className="text-base md:text-xl leading-relaxed text-muted max-w-2xl font-medium drop-shadow-lg backdrop-blur-sm bg-background/5 p-4 -ml-4 rounded-lg">
              Studio Tactile is a design practice focused on clarity, structure, and long-term use. We approach each project with defined planning and controlled execution. The aim is to create spaces that remain relevant beyond trends.
            </p>
          </header>

          <aside className="col-span-12 md:col-span-4 flex flex-col justify-end">
            <div className="border-l border-accent pl-6 md:pl-8 py-2">
              <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-accent mb-4">
                Philosophy
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted leading-relaxed">
                Architecture records how we live. We build for long-term use, not short-term effect.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-label="Studio statistics">
        {/* Toggle Switcher */}
        <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveSlide(0)}
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative py-2 cursor-pointer ${
                activeSlide === 0 ? "text-accent" : "text-muted/60 hover:text-foreground"
              }`}
            >
              Practice Metrics
              {activeSlide === 0 && (
                <motion.div
                  layoutId="activeStatsTab"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveSlide(1)}
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative py-2 cursor-pointer ${
                activeSlide === 1 ? "text-accent" : "text-muted/60 hover:text-foreground"
              }`}
            >
              In-Office Team
              {activeSlide === 1 && (
                <motion.div
                  layoutId="activeStatsTab"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </div>
          <div className="text-[8px] font-mono text-muted/40 uppercase hidden sm:block">
            SYS_REF // STATS_SLIDE_0{activeSlide + 1}
          </div>
        </div>

        {/* Slide Content with AnimatePresence */}
        <div className="relative overflow-hidden border border-border bg-[#0f0f0f]/30 backdrop-blur-sm p-8 md:p-12 min-h-[300px] lg:min-h-[220px] flex items-center">
          {/* Subtle blueprint grid overlay background */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: activeSlide === 0 ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeSlide === 0 ? 15 : -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10"
            >
              {/* Left Column: Context / Descriptions */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[8px] font-mono tracking-widest text-accent uppercase leading-none bg-accent/10 px-1.5 py-0.5 border border-accent/20 inline-block">
                  {activeSlide === 0 ? "STUDIO METRICS" : "PEOPLE BEHIND PRACTICE"}
                </span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground leading-none">
                  {activeSlide === 0 
                    ? "QUANTIFIED FOCUS." 
                    : "THE PEOPLE BEHIND THE PRACTICE."}
                </h3>
                <p className="text-[11px] text-muted leading-relaxed max-w-md">
                  {activeSlide === 0 
                    ? "A record of our spatial execution. Every project represents a rigorous process of mapping, massing, and construction permanence."
                    : "Every project is supported by architects, engineers, consultants, and execution teams working as a single coordinated practice. Ensuring continuity from concept to completion."}
                </p>
              </div>

              {/* Right Column: Stats Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:border-l lg:border-border lg:pl-12">
                {(activeSlide === 0 ? studioMetrics : teamMetrics).map((stat) => (
                  <div key={stat.label} className="space-y-1.5 group">
                    <p className="text-4xl md:text-5xl font-black text-foreground tracking-tighter group-hover:text-accent transition-colors duration-300">
                      {stat.value}
                    </p>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-muted/60">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-labelledby="studio-methodology-title">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div>
            <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-accent mb-4">Approach</span>
            <h2 id="studio-methodology-title" className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-foreground">
              Design Methodology.
            </h2>
          </div>
          <div className="hidden md:block w-1/3 h-px bg-border"></div>
        </div>

        {/* FLOW CHART CONTAINER */}
        <div className="relative border border-border p-8 md:p-12 md:py-24 bg-background/30 backdrop-blur-sm overflow-hidden">
          
          {/* Subtle blueprint grid overlay background */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* DESKTOP FLOW LINES (Horizontal & diagonal connecting flow wires in a 3x3 layout) */}
          <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 300 300" preserveAspectRatio="none">
            {/* Define glowing filter */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base flowchart path segments (background dashed lines) */}
            <path d="M 50,75 L 250,75" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 250,75 L 150,175" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 150,175 L 50,275" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 50,275 L 250,275" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Segment 1: Phase 1 -> 2 */}
            <motion.path 
              d="M 50,75 L 250,75"
              fill="none"
              stroke={hoveredStep === 0 || hoveredStep === 1 ? "#e03a2f" : "rgba(255, 255, 255, 0.2)"}
              strokeWidth={hoveredStep === 0 || hoveredStep === 1 ? "1.5" : "0.75"}
              filter={hoveredStep === 0 || hoveredStep === 1 ? "url(#glow)" : "none"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
              className="transition-all duration-300"
            />

            {/* Segment 2: Phase 2 -> 3 */}
            <motion.path 
              d="M 250,75 L 150,175"
              fill="none"
              stroke={hoveredStep === 1 || hoveredStep === 2 ? "#e03a2f" : "rgba(255, 255, 255, 0.2)"}
              strokeWidth={hoveredStep === 1 || hoveredStep === 2 ? "1.5" : "0.75"}
              filter={hoveredStep === 1 || hoveredStep === 2 ? "url(#glow)" : "none"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
              className="transition-all duration-300"
            />

            {/* Segment 3: Phase 3 -> 4 */}
            <motion.path 
              d="M 150,175 L 50,275"
              fill="none"
              stroke={hoveredStep === 2 || hoveredStep === 3 ? "#e03a2f" : "rgba(255, 255, 255, 0.2)"}
              strokeWidth={hoveredStep === 2 || hoveredStep === 3 ? "1.5" : "0.75"}
              filter={hoveredStep === 2 || hoveredStep === 3 ? "url(#glow)" : "none"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.8, ease: "easeInOut" }}
              className="transition-all duration-300"
            />

            {/* Segment 4: Phase 4 -> 5 */}
            <motion.path 
              d="M 50,275 L 250,275"
              fill="none"
              stroke={hoveredStep === 3 || hoveredStep === 4 ? "#e03a2f" : "rgba(255, 255, 255, 0.2)"}
              strokeWidth={hoveredStep === 3 || hoveredStep === 4 ? "1.5" : "0.75"}
              filter={hoveredStep === 3 || hoveredStep === 4 ? "url(#glow)" : "none"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
              className="transition-all duration-300"
            />
          </svg>

          {/* MOBILE FLOW LINE (Vertical connecting line on the left side) */}
          <div className="md:hidden absolute top-[48px] bottom-[48px] left-[32px] w-[1px] bg-border/40 pointer-events-none">
            {/* Animated Mobile Red Laser path */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#e03a2f] origin-top shadow-[0_0_4px_#e03a2f]"
            />
          </div>

          {/* 3x3 Flow Grid (Desktop) / Vertical Stack (Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 relative z-10">
            {methodologySteps.map((step, i) => {
              const desktopGridClasses = step.colClass
                .split(" ")
                .map((cls) => `md:${cls}`)
                .join(" ");

              return (
                <div 
                  key={i} 
                  id={`methodology-step-${i}`}
                  className={`relative flex flex-col gap-6 pl-12 md:pl-0 group ${desktopGridClasses}`}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  
                  {/* FLOW NODE CONNECTOR */}
                  {/* Desktop Dot */}
                  <div className="hidden md:flex absolute top-[67px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-border bg-[#0a0a0a] items-center justify-center transition-all duration-500 group-hover:border-accent z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.3, duration: 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#e03a2f] shadow-[0_0_4px_#e03a2f]"
                    />
                    <div className="absolute w-6 h-6 border border-white/5 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-accent/40" />
                  </div>

                  {/* Mobile Dot */}
                  <div className="md:hidden absolute top-4 left-[24px] w-4 h-4 rounded-full border border-border bg-[#0a0a0a] flex items-center justify-center transition-all duration-500 group-hover:border-accent z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#e03a2f] shadow-[0_0_4px_#e03a2f]"
                    />
                    <div className="absolute w-6 h-6 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                  </div>

                  {/* Premium Glassmorphism Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.7, ease: "easeOut" }}
                    className={`p-6 border ${hoveredStep === i ? "border-accent bg-[#0f0f0f]/80" : "border-border bg-background/20"} backdrop-blur-sm transition-all duration-500 flex flex-col gap-6 h-full relative`}
                  >
                    {/* Phase ID Label */}
                    <div className="absolute top-3 right-3 font-mono text-[7px] text-muted/30">
                      [0{i+1}]
                    </div>

                    {/* 3D Model Viewport */}
                    <div className="h-44 w-full flex items-center justify-center relative overflow-hidden border-b border-border/40 pb-4">
                      <Projected3DModel
                        vertices={step.vertices}
                        edges={step.edges}
                        angleX={step.angleX}
                        angleY={step.angleY}
                        scale={step.scale}
                        isHovered={hoveredStep === i}
                      />
                      
                      {/* Glowing coordinate overlay */}
                      <div className={`absolute bottom-1 left-2 font-mono text-[7px] tracking-widest text-muted/60 transition-opacity duration-300 ${hoveredStep === i ? "opacity-100" : "opacity-40"}`}>
                        {hoveredStep === i ? (
                          <span className="text-accent animate-pulse">SYS_ACTIVE // CAMERA_X: {step.angleX}°</span>
                        ) : (
                          <span>SYS_IDLE // REF_GRID</span>
                        )}
                      </div>
                    </div>

                    {/* Step Description */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-mono tracking-widest text-accent uppercase leading-none bg-accent/10 px-1.5 py-0.5 border border-accent/20">
                          {step.phase}
                        </span>
                      </div>
                      <h3 className={`text-sm font-bold uppercase tracking-tight transition-colors duration-300 ${hoveredStep === i ? "text-accent" : "text-foreground"}`}>
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-muted leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-labelledby="studio-clients-title">
        <div className="grid grid-cols-12 gap-12 mb-16">
          <div className="col-span-12 md:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8 block">Trust</span>
            <h2 id="studio-clients-title" className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">Selected Clients.</h2>
          </div>
        </div>
        
        <div className="space-y-12 overflow-hidden py-4">
          {/* Row 1: Moves from LEFT → RIGHT */}
          <div className="flex gap-16 animate-marquee-reverse whitespace-nowrap">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex gap-16 items-center">
                {clients.map((client, i) => (
                  <div key={i} className="flex items-center gap-12 group">
                    <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-muted group-hover:text-foreground transition-colors">{client}</span>
                    <div className="w-2 h-2 bg-border group-hover:bg-accent transition-colors"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2: Moves from RIGHT → LEFT */}
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex gap-16 items-center">
                {[...clients].reverse().map((client, i) => (
                  <div key={i} className="flex items-center gap-12 group">
                    <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-muted group-hover:text-foreground transition-colors">{client}</span>
                    <div className="w-2 h-2 bg-border group-hover:bg-accent transition-colors"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-labelledby="studio-careers-title">
        <div className="bg-background border border-border p-8 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[120px]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 relative z-10">
            {/* Left Column: Job List */}
            <div className="md:col-span-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8 block">Careers</span>
              <h2 id="studio-careers-title" className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-12 leading-[0.9] text-foreground">Join the pursuit of permanence.</h2>
              
              <div className="space-y-8 mb-16">
                {careers.map((job) => (
                  <div 
                    key={job.id} 
                    onClick={() => handleJobClick(job.id)}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div>
                      <h3 className={`text-2xl font-bold uppercase tracking-tight transition-colors ${selectedJobId === job.id ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{job.title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted/60">{job.location}</p>
                    </div>
                    <div className={`h-px transition-all duration-500 ${selectedJobId === job.id ? 'w-20 bg-accent' : 'w-12 bg-border group-hover:bg-accent group-hover:w-20'}`}></div>
                  </div>
                ))}
              </div>
              
              <p className="text-muted text-sm max-w-md leading-relaxed">
                We are always looking for rigorous thinkers and technical masters.
              </p>
            </div>

            {/* Right Column: Job Details & Form (Desktop) */}
            <div className="hidden md:block md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedJobId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  {/* Job Details */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-2">{selectedJob.title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{selectedJob.location}</p>
                    </div>
                    <p className="text-muted leading-relaxed">{selectedJob.description}</p>
                    
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Responsibilities</h4>
                        <ul className="space-y-2">
                          {selectedJob.responsibilities.map((item, i) => (
                            <li key={i} className="text-xs text-muted flex gap-3">
                              <span className="text-accent">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Requirements</h4>
                        <ul className="space-y-2">
                          {selectedJob.requirements.map((item, i) => (
                            <li key={i} className="text-xs text-muted flex gap-3">
                              <span className="text-accent">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Application Form (Custom Styled Form) */}
                  <div className="pt-12 border-t border-border">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground mb-8">Apply for this position</h4>
                    {renderApplicationForm()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Job Overlay */}
      <AnimatePresence>
        {isMobileOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background overflow-y-auto p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Job Details</span>
              <button onClick={() => setIsMobileOverlayOpen(false)} className="text-foreground hover:text-accent">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-12 pb-20">
              <div className="space-y-6">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground leading-none">{selectedJob.title}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{selectedJob.location}</p>
                <p className="text-muted leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Responsibilities</h4>
                  <ul className="space-y-3">
                    {selectedJob.responsibilities.map((item, i) => (
                      <li key={i} className="text-xs text-muted flex gap-3">
                        <span className="text-accent">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Requirements</h4>
                  <ul className="space-y-3">
                    {selectedJob.requirements.map((item, i) => (
                      <li key={i} className="text-xs text-muted flex gap-3">
                        <span className="text-accent">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-12 border-t border-border">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground mb-8">Apply Now</h4>
                {renderApplicationForm()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        className="px-4 md:px-12 mb-24 md:mb-40"
        aria-labelledby="studio-collab-title"
      >
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60 mb-4">
              Network
            </span>
            <h2
              id="studio-collab-title"
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground"
            >
              Collaborations.
            </h2>
          </div>
          <div className="hidden md:block w-1/3 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {partners.map((collab) => (
            <article
              key={collab.name}
              className="border-l border-border pl-6 md:pl-8 py-4 hover:border-accent transition-colors group"
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-muted/60 mb-2 group-hover:text-accent transition-colors">
                {collab.name}
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-foreground">
                {collab.partner}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
