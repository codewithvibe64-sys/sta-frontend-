import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MagneticButton } from "../components/InteractiveButton";

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // 3D Point Interface
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    // Colors shading helper
    const colorShade = (r: number, g: number, b: number, a: number = 0.95) => {
      return (intensity: number) => {
        const factor = Math.max(0.4, Math.min(1.0, intensity));
        return `rgba(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)}, ${a})`;
      };
    };

    // Define vertices for the Deconstructivist Cantilevered Art Pavilion maquette
    const vertices: Point3D[] = [
      // 0-3: Foundation slab bottom (y = 80)
      { x: -140, y: 80, z: -140 },
      { x: 140, y: 80, z: -140 },
      { x: 140, y: 80, z: 140 },
      { x: -140, y: 80, z: 140 },
      // 4-7: Foundation slab top (y = 68)
      { x: -140, y: 68, z: -140 },
      { x: 140, y: 68, z: -140 },
      { x: 140, y: 68, z: 140 },
      { x: -140, y: 68, z: 140 },

      // 8-11: Lower Concrete Gallery Block Bottom (y = 68) - unrotated
      { x: -100, y: 68, z: -90 },
      { x: 20, y: 68, z: -90 },
      { x: 20, y: 68, z: 90 },
      { x: -100, y: 68, z: 90 },
      // 12-15: Lower Concrete Gallery Block Top (y = 10)
      { x: -100, y: 10, z: -90 },
      { x: 20, y: 10, z: -90 },
      { x: 20, y: 10, z: 90 },
      { x: -100, y: 10, z: 90 },

      // 16-19: Upper Cantilevered Glass Block Floor (y = 10) - rotated 45 degrees
      { x: -4, y: 10, z: -67 },
      { x: 110, y: 10, z: 46 },
      { x: 46, y: 10, z: 110 },
      { x: -67, y: 10, z: -4 },
      // 20-23: Upper Cantilevered Glass Block Ceiling (y = -40)
      { x: -4, y: -40, z: -67 },
      { x: 110, y: -40, z: 46 },
      { x: 46, y: -40, z: 110 },
      { x: -67, y: -40, z: -4 },

      // 24-27: Flat Floating Roof Slab Bottom (y = -50) - rotated 45 degrees, overhang
      { x: -7, y: -50, z: -85 },
      { x: 127, y: -50, z: 49 },
      { x: 49, y: -50, z: 127 },
      { x: -85, y: -50, z: -7 },
      // 28-31: Flat Floating Roof Slab Top (y = -62)
      { x: -7, y: -62, z: -85 },
      { x: 127, y: -62, z: 49 },
      { x: 49, y: -62, z: 127 },
      { x: -85, y: -62, z: -7 },

      // 32-35: Vertical concrete chimney core bottom (y = 68) - unrotated
      { x: -50, y: 68, z: -40 },
      { x: -20, y: 68, z: -40 },
      { x: -20, y: 68, z: -10 },
      { x: -50, y: 68, z: -10 },
      // 36-39: Vertical concrete chimney core top (y = -85) - extends above roof
      { x: -50, y: -85, z: -40 },
      { x: -20, y: -85, z: -40 },
      { x: -20, y: -85, z: -10 },
      { x: -50, y: -85, z: -10 },

      // 40-43: Recessed Reflection Pool (y = 67.8 to sit on top of slab)
      { x: 40, y: 67.8, z: -120 },
      { x: 120, y: 67.8, z: -120 },
      { x: 120, y: 67.8, z: -20 },
      { x: 40, y: 67.8, z: -20 },

      // 44-47: Wooden Terrace Deck (y = 65 to raise slightly)
      { x: -120, y: 65, z: 40 },
      { x: -50, y: 65, z: 40 },
      { x: -50, y: 65, z: 120 },
      { x: -120, y: 65, z: 120 },

      // 48-50: Pillar bases on foundation top (y = 68)
      { x: 110, y: 68, z: 46 }, // Under V17
      { x: 46, y: 68, z: 110 }, // Under V18
      { x: -4, y: 68, z: -67 },  // Under V16

      // 51-54: Floating Stair Step 1 (y = 75)
      { x: -130, y: 75, z: 0 },
      { x: -115, y: 75, z: 0 },
      { x: -115, y: 75, z: 25 },
      { x: -130, y: 75, z: 25 },
      // 55-58: Floating Stair Step 2 (y = 70)
      { x: -125, y: 70, z: 0 },
      { x: -110, y: 70, z: 0 },
      { x: -110, y: 70, z: 25 },
      { x: -125, y: 70, z: 25 }
    ];

    // Define vertices group component classification
    const getVertexComponent = (idx: number): string => {
      if (idx >= 0 && idx <= 7) return "foundation";
      if (idx >= 8 && idx <= 15) return "lowerBlock";
      if (idx >= 16 && idx <= 23) return "upperBlock";
      if (idx >= 24 && idx <= 31) return "roof";
      if (idx >= 32 && idx <= 39) return "chimney";
      if (idx >= 40 && idx <= 43) return "foundation"; // pool sits on foundation base
      if (idx >= 44 && idx <= 47) return "terrace";
      if (idx >= 48 && idx <= 50) return "upperBlock"; // pillars move with upper rotated block
      if (idx >= 51 && idx <= 58) return "foundation"; // stairs on foundation
      return "foundation";
    };

    // Exploded view offset tracking
    interface Offset3D {
      x: number;
      y: number;
      z: number;
    }

    const componentOffsets: Record<string, Offset3D> = {
      foundation: { x: 0, y: 0, z: 0 },
      lowerBlock: { x: 0, y: 0, z: 0 },
      upperBlock: { x: 0, y: 0, z: 0 },
      roof: { x: 0, y: 0, z: 0 },
      chimney: { x: 0, y: 0, z: 0 },
      terrace: { x: 0, y: 0, z: 0 }
    };

    const targetComponentOffsets: Record<string, Offset3D> = {
      foundation: { x: 0, y: 0, z: 0 },
      lowerBlock: { x: 0, y: 0, z: 0 },
      upperBlock: { x: 0, y: 0, z: 0 },
      roof: { x: 0, y: 0, z: 0 },
      chimney: { x: 0, y: 0, z: 0 },
      terrace: { x: 0, y: 0, z: 0 }
    };

    // Point in Polygon PNPOLY check for piece selection
    const isPointInPolygon = (x: number, y: number, polygon: { x: number; y: number }[]) => {
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;
        
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // Define Drawables (Faces & Pillars & Rails) for Painter's depth-sorting
    interface Drawable {
      type: "face" | "line";
      indices: number[];
      color?: (intensity: number) => string;
      strokeColor: string;
      isGlass?: boolean;
      lineWidth?: number;
    }

    const drawables: Drawable[] = [
      // --- Foundation Slab (Concrete Grey) ---
      { type: "face", indices: [0, 3, 2, 1], color: colorShade(25, 25, 25), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [0, 1, 5, 4], color: colorShade(35, 35, 35), strokeColor: "rgba(255, 255, 255, 0.1)" },
      { type: "face", indices: [1, 2, 6, 5], color: colorShade(30, 30, 30), strokeColor: "rgba(255, 255, 255, 0.1)" },
      { type: "face", indices: [2, 3, 7, 6], color: colorShade(40, 40, 40), strokeColor: "rgba(255, 255, 255, 0.1)" },
      { type: "face", indices: [3, 0, 4, 7], color: colorShade(33, 33, 33), strokeColor: "rgba(255, 255, 255, 0.1)" },
      { type: "face", indices: [4, 5, 6, 7], color: colorShade(50, 50, 50), strokeColor: "rgba(255, 255, 255, 0.15)" },

      // --- Lower Concrete Gallery Block ---
      { type: "face", indices: [8, 9, 13, 12], color: colorShade(22, 22, 22), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [9, 10, 14, 13], color: colorShade(18, 18, 18), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [10, 11, 15, 14], color: colorShade(24, 24, 24), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [11, 8, 12, 15], color: colorShade(20, 20, 20), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [12, 13, 14, 15], color: colorShade(28, 28, 28), strokeColor: "rgba(255, 255, 255, 0.12)" },

      // --- Reflection Pool ---
      { type: "face", indices: [40, 41, 42, 43], color: colorShade(30, 120, 180, 0.45), strokeColor: "rgba(255, 255, 255, 0.4)" },

      // --- Wooden Terrace Deck ---
      { type: "face", indices: [44, 45, 46, 47], color: colorShade(139, 90, 43, 0.85), strokeColor: "rgba(139, 90, 43, 0.3)" },

      // --- Upper Rotated Block Floor & Ceiling ---
      { type: "face", indices: [16, 17, 18, 19], color: colorShade(35, 35, 35), strokeColor: "rgba(255, 255, 255, 0.08)" }, // floor
      { type: "face", indices: [20, 21, 22, 23], color: colorShade(26, 26, 26), strokeColor: "rgba(255, 255, 255, 0.08)" }, // ceiling

      // --- Upper Rotated Block Glass Facades ---
      { type: "face", indices: [16, 17, 21, 20], color: colorShade(224, 58, 47, 0.12), strokeColor: "rgba(224, 58, 47, 0.45)", isGlass: true }, // front-right red glass
      { type: "face", indices: [17, 18, 22, 21], color: colorShade(255, 255, 255, 0.03), strokeColor: "rgba(255, 255, 255, 0.18)", isGlass: true }, // front-left glass
      { type: "face", indices: [18, 19, 23, 22], color: colorShade(224, 58, 47, 0.08), strokeColor: "rgba(224, 58, 47, 0.35)", isGlass: true }, // back-left glass
      { type: "face", indices: [19, 16, 20, 23], color: colorShade(255, 255, 255, 0.05), strokeColor: "rgba(255, 255, 255, 0.18)", isGlass: true }, // back-right glass

      // --- Floating Roof Slab ---
      { type: "face", indices: [24, 25, 29, 28], color: colorShade(38, 38, 38), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [25, 26, 30, 29], color: colorShade(32, 32, 32), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [26, 27, 31, 30], color: colorShade(42, 42, 42), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [27, 24, 28, 31], color: colorShade(35, 35, 35), strokeColor: "rgba(255, 255, 255, 0.08)" },
      { type: "face", indices: [28, 29, 30, 31], color: colorShade(55, 55, 55), strokeColor: "rgba(255, 255, 255, 0.16)" }, // Roof Top

      // --- Concrete Chimney Core ---
      { type: "face", indices: [32, 33, 37, 36], color: colorShade(15, 15, 15), strokeColor: "rgba(255, 255, 255, 0.06)" },
      { type: "face", indices: [33, 34, 38, 37], color: colorShade(12, 12, 12), strokeColor: "rgba(255, 255, 255, 0.06)" },
      { type: "face", indices: [34, 35, 39, 38], color: colorShade(16, 16, 16), strokeColor: "rgba(255, 255, 255, 0.06)" },
      { type: "face", indices: [35, 32, 36, 39], color: colorShade(14, 14, 14), strokeColor: "rgba(255, 255, 255, 0.06)" },
      { type: "face", indices: [36, 37, 38, 39], color: colorShade(20, 20, 20), strokeColor: "rgba(255, 255, 255, 0.08)" },

      // --- Red Steel Structural Columns ---
      { type: "line", indices: [17, 48], strokeColor: "#e03a2f", lineWidth: 2.2 },
      { type: "line", indices: [18, 49], strokeColor: "#e03a2f", lineWidth: 2.2 },
      { type: "line", indices: [16, 50], strokeColor: "#e03a2f", lineWidth: 2.2 },

      // --- Diagonal Truss Bracing (Lines) ---
      { type: "line", indices: [17, 49], strokeColor: "rgba(224, 58, 47, 0.6)", lineWidth: 1.2 },
      { type: "line", indices: [18, 48], strokeColor: "rgba(224, 58, 47, 0.6)", lineWidth: 1.2 },

      // --- Stair Steps ---
      { type: "face", indices: [51, 52, 53, 54], color: colorShade(80, 80, 80), strokeColor: "rgba(255, 255, 255, 0.15)" },
      { type: "face", indices: [55, 56, 57, 58], color: colorShade(90, 90, 90), strokeColor: "rgba(255, 255, 255, 0.15)" }
    ];

    // Blueprint grid on floor
    const gridPoints: Point3D[] = [];
    const gridSize = 350;
    const gridDivs = 10;
    for (let i = 0; i <= gridDivs; i++) {
      const coord = -gridSize / 2 + (gridSize * i) / gridDivs;
      gridPoints.push({ x: coord, y: 80, z: -gridSize / 2 });
      gridPoints.push({ x: coord, y: 80, z: gridSize / 2 });
      gridPoints.push({ x: -gridSize / 2, y: 80, z: coord });
      gridPoints.push({ x: gridSize / 2, y: 80, z: coord });
    }

    // Camera physics state variables
    let rotationY = -0.6;
    let rotationX = -0.3;
    let targetRotY = -0.6;
    let targetRotX = -0.3;
    let autoRotY = -0.6;
    const autoSpeedY = 0.0025;

    let currentFov = 520;
    let currentYOffset = 0;

    let panX = 0;
    let panY = 0;
    let targetPanX = 0;
    let targetPanY = 0;

    let zoomFactor = 1.0;
    let targetZoomFactor = 1.0;

    let isDragging = false;
    let isPanning = false;
    const dragStart = { x: 0, y: 0 };
    let baseRotY = -0.6;
    let baseRotX = -0.3;
    let basePanX = 0;
    let basePanY = 0;

    // Touch support variables
    let lastTouchTime = 0;
    let initialTouchDistance = 0;
    let initialZoom = 1.0;

    // Piece selection tracking
    let hoveredComponent: string | null = null;
    let activeDragComponent: string | null = null;

    // Scope level variables so event handlers can read them
    let projected: { x: number; y: number; visible: boolean }[] = [];
    let sortedDrawables: (Drawable & { avgZ: number })[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const cameraDistance = 460;

    if (canvas) {
      canvas.style.cursor = "grab";
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let activeFovTarget = 520;
      let activeYOffsetTarget = 0;

      // Smoothly interpolate component offsets
      Object.keys(componentOffsets).forEach(key => {
        const current = componentOffsets[key];
        const target = targetComponentOffsets[key];
        current.x += (target.x - current.x) * 0.15;
        current.y += (target.y - current.y) * 0.15;
        current.z += (target.z - current.z) * 0.15;
      });

      // Camera auto-rotation if not interacting
      if (isDragging || mouseRef.current.active) {
        activeFovTarget = 560; // Zoom in slightly when active
        activeYOffsetTarget = -15; // Float up slightly when active
      } else {
        autoRotY += autoSpeedY;
        targetRotY = autoRotY;
        targetRotX = -0.3;

        activeFovTarget = 520;
        activeYOffsetTarget = 0;
      }

      // Smooth camera interpolation
      rotationY += (targetRotY - rotationY) * 0.08;
      rotationX += (targetRotX - rotationX) * 0.08;
      
      currentFov += (activeFovTarget - currentFov) * 0.08;
      currentYOffset += (activeYOffsetTarget - currentYOffset) * 0.08;

      panX += (targetPanX - panX) * 0.08;
      panY += (targetPanY - panY) * 0.08;
      zoomFactor += (targetZoomFactor - zoomFactor) * 0.08;

      // Keep auto-rotation aligned so there is no jumping when user releases drag
      if (isDragging) {
        autoRotY = rotationY;
      }

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      // Shift vertex coordinates by active component offsets before rotating
      const shiftedVertices = vertices.map((v, idx) => {
        const comp = getVertexComponent(idx);
        const off = componentOffsets[comp];
        return {
          x: v.x + off.x,
          y: v.y + off.y,
          z: v.z + off.z
        };
      });

      // Rotate a 3D vertex
      const rotate = (p: Point3D) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        return { x: x1, y: y2, z: z2 };
      };

      // Project vertices to 2D screen coordinates incorporating Zoom and Panning
      const rotatedVertices = shiftedVertices.map(rotate);
      const zoomFov = currentFov * zoomFactor;

      projected = rotatedVertices.map(p => {
        const scale = zoomFov / (p.z + cameraDistance);
        return {
          x: width / 2 + panX + p.x * scale,
          y: height / 2 + panY + (p.y + currentYOffset) * scale,
          visible: p.z + cameraDistance > 0,
        };
      });

      // 1. Draw Floor Grid lines
      ctx.strokeStyle = "rgba(224, 58, 47, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < gridPoints.length; i += 2) {
        const p1 = rotate(gridPoints[i]);
        const p2 = rotate(gridPoints[i + 1]);
        const scale1 = zoomFov / (p1.z + cameraDistance);
        const scale2 = zoomFov / (p2.z + cameraDistance);

        if (p1.z + cameraDistance > 0 && p2.z + cameraDistance > 0) {
          ctx.beginPath();
          ctx.moveTo(width / 2 + panX + p1.x * scale1, height / 2 + panY + (p1.y + currentYOffset) * scale1);
          ctx.lineTo(width / 2 + panX + p2.x * scale2, height / 2 + panY + (p2.y + currentYOffset) * scale2);
          ctx.stroke();
        }
      }

      // 2. Sort drawables using Painter's depth sorting
      sortedDrawables = drawables.map((item) => {
        const avgZ = item.indices.reduce((sum, idx) => sum + rotatedVertices[idx].z, 0) / item.indices.length;
        return { ...item, avgZ };
      }).sort((a, b) => b.avgZ - a.avgZ);

      // 3. Render sorted drawables
      sortedDrawables.forEach((item) => {
        if (item.indices.some(idx => !projected[idx].visible)) return;

        // Determine if this drawable component is selected (hovered or being dragged)
        const comp = getVertexComponent(item.indices[0]);
        const isSelected = (comp === hoveredComponent || comp === activeDragComponent);

        if (item.type === "face") {
          // Calculate face normal in 3D rotated space
          const a = rotatedVertices[item.indices[0]];
          const b = rotatedVertices[item.indices[1]];
          const c = rotatedVertices[item.indices[2]];

          const v1 = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
          const v2 = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };

          const nx = v1.y * v2.z - v1.z * v2.y;
          const ny = v1.z * v2.x - v1.x * v2.z;
          const nz = v1.x * v2.y - v1.y * v2.x;

          const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
          if (len === 0) return;
          const normal = { x: nx / len, y: ny / len, z: nz / len };

          // Shading Light Vector - shifts dynamically with cursor position
          let lightX = 0.6;
          let lightZ = -0.4;
          if (mouseRef.current.active) {
            const dx = (mouseRef.current.x - width / 2) / (width / 2);
            const dy = (mouseRef.current.y - height / 2) / (height / 2);
            lightX = 0.6 + dx * 0.3;
            lightZ = -0.4 + dy * 0.3;
          }
          const light = { x: lightX, y: -0.8, z: lightZ };
          const lightLen = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
          const lightNorm = { x: light.x / lightLen, y: light.y / lightLen, z: light.z / lightLen };

          // Dot intensity
          const dot = normal.x * lightNorm.x + normal.y * lightNorm.y + normal.z * lightNorm.z;
          const intensity = Math.max(0.45, Math.min(1.0, (dot + 1) / 2));

          // Draw face
          ctx.beginPath();
          item.indices.forEach((idx, idxOrder) => {
            const pt = projected[idx];
            if (idxOrder === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.closePath();

          if (item.isGlass) {
            ctx.fillStyle = item.color ? item.color(intensity) : "rgba(224,58,47,0.15)";
          } else {
            ctx.fillStyle = item.color ? item.color(intensity) : "#333";
          }
          ctx.fill();

          // Apply glowing highlight overlay for selection
          if (isSelected) {
            ctx.fillStyle = "rgba(224, 58, 47, 0.08)";
            ctx.fill();
            ctx.strokeStyle = "#e03a2f"; // Bright red highlights
            ctx.lineWidth = 1.3;
          } else {
            ctx.strokeStyle = item.strokeColor;
            ctx.lineWidth = 0.8;
          }
          ctx.stroke();

        } else if (item.type === "line") {
          // Render pillars/steel railings
          const pt1 = projected[item.indices[0]];
          const pt2 = projected[item.indices[1]];

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = isSelected ? "#e03a2f" : item.strokeColor;
          ctx.lineWidth = isSelected ? (item.lineWidth || 2) * 1.5 : (item.lineWidth || 2);
          ctx.stroke();
        }
      });

      // 4. Draw detailed architectural window mullions for rotated upper glass block
      const drawWindowMullions = (idxL: number, idxR: number, idxTR: number, idxTL: number, strokeColor = "rgba(255, 255, 255, 0.25)") => {
        const wBotL = projected[idxL];
        const wBotR = projected[idxR];
        const wTopR = projected[idxTR];
        const wTopL = projected[idxTL];

        if (wBotL?.visible && wBotR?.visible && wTopR?.visible && wTopL?.visible) {
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 0.6;

          // Draw horizontal transom bar at 55% height
          ctx.beginPath();
          ctx.moveTo(wBotL.x + (wTopL.x - wBotL.x) * 0.55, wBotL.y + (wTopL.y - wBotL.y) * 0.55);
          ctx.lineTo(wBotR.x + (wTopR.x - wBotR.x) * 0.55, wBotR.y + (wTopR.y - wBotR.y) * 0.55);
          ctx.stroke();

          // Draw vertical mullion dividing bars (split into 3 equal panels)
          for (let t = 0.33; t <= 0.67; t += 0.34) {
            const topX = wTopL.x + (wTopR.x - wTopL.x) * t;
            const topY = wTopL.y + (wTopR.y - wTopL.y) * t;
            const botX = wBotL.x + (wBotR.x - wBotL.x) * t;
            const botY = wBotL.y + (wBotR.y - wBotL.y) * t;

            ctx.beginPath();
            ctx.moveTo(botX, botY);
            ctx.lineTo(topX, topY);
            ctx.stroke();
          }
        }
      };

      // Draw glass mullions for the visible facades of the rotated upper box
      drawWindowMullions(16, 17, 21, 20); // Front-Right
      drawWindowMullions(17, 18, 22, 21); // Front-Left
      drawWindowMullions(18, 19, 23, 22, "rgba(255, 255, 255, 0.15)"); // Back-Left

      // 5. Blueprint Drafting lines (Vertical dashed lines connecting roof corners straight down)
      if (mouseRef.current.active || isDragging) {
        ctx.strokeStyle = "rgba(224, 58, 47, 0.32)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 4]);

        const roofIndices = [24, 25, 26, 27];
        roofIndices.forEach(idx => {
          const roofPt = projected[idx];
          
          // Project the corresponding bottom point at y = 68 (foundation slab height) shifted by roof offsets
          const comp = getVertexComponent(idx);
          const off = componentOffsets[comp];
          const pBot3D = rotate({ 
            x: vertices[idx].x + off.x, 
            y: 68 + off.y, 
            z: vertices[idx].z + off.z 
          });
          const scaleBot = zoomFov / (pBot3D.z + cameraDistance);
          const botX = width / 2 + panX + pBot3D.x * scaleBot;
          const botY = height / 2 + panY + (pBot3D.y + currentYOffset) * scaleBot;

          if (roofPt.visible && pBot3D.z + cameraDistance > 0) {
            ctx.beginPath();
            ctx.moveTo(roofPt.x, roofPt.y);
            ctx.lineTo(botX, botY);
            ctx.stroke();
          }
        });
        
        ctx.setLineDash([]);
      }

      // 6. Elevation Dimension Annotations
      ctx.font = "8px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      
      const slabTopCorner = projected[5];
      if (slabTopCorner?.visible) {
        ctx.beginPath();
        ctx.arc(slabTopCorner.x, slabTopCorner.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillText(" BASE EL. +0.00m", slabTopCorner.x + 6, slabTopCorner.y + 3);
      }

      const roofTopCorner = projected[29];
      if (roofTopCorner?.visible) {
        ctx.beginPath();
        ctx.arc(roofTopCorner.x, roofTopCorner.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#e03a2f";
        ctx.fill();
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillText(" ROOF EL. +12.80m", roofTopCorner.x + 6, roofTopCorner.y + 3);
      }

      const chimneyTopCorner = projected[36];
      if (chimneyTopCorner?.visible) {
        ctx.beginPath();
        ctx.arc(chimneyTopCorner.x, chimneyTopCorner.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillText(" CORE EL. +15.50m", chimneyTopCorner.x + 6, chimneyTopCorner.y + 3);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Interaction Event Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStart.x = e.clientX;
      dragStart.y = e.clientY;
      baseRotY = rotationY;
      baseRotX = rotationX;
      basePanX = targetPanX;
      basePanY = targetPanY;

      if (hoveredComponent) {
        // If clicking on a component, drag that piece
        activeDragComponent = hoveredComponent;
        if (canvas) {
          canvas.style.cursor = "grabbing";
        }
      } else {
        // Otherwise drag camera (Pan with Shift-key, Right-click (2), or Middle-click (1), orbit otherwise)
        activeDragComponent = null;
        isPanning = (e.shiftKey || e.button === 2 || e.button === 1);
        if (canvas) {
          canvas.style.cursor = isPanning ? "move" : "grabbing";
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      mouseRef.current = {
        x: mouseX,
        y: mouseY,
        active: true,
      };

      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;

        // Reset dragStart for delta calculations
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;

        if (activeDragComponent) {
          // Drag and slide component in 3D space, translating screen coordinates to camera-rotated 3D space
          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);
          
          const targetOff = targetComponentOffsets[activeDragComponent];
          targetOff.x += dx * cosY * 0.45;
          targetOff.z -= dx * sinY * 0.45;
          targetOff.y += dy * 0.45; // Down is positive Y
          
          // Clamp dragging bounds
          targetOff.x = Math.max(-180, Math.min(180, targetOff.x));
          targetOff.y = Math.max(-180, Math.min(180, targetOff.y));
          targetOff.z = Math.max(-180, Math.min(180, targetOff.z));
        } else if (isPanning) {
          targetPanX = basePanX + dx;
          targetPanY = basePanY + dy;
          targetPanX = Math.max(-200, Math.min(200, targetPanX));
          targetPanY = Math.max(-250, Math.min(250, targetPanY));
          
          basePanX = targetPanX;
          basePanY = targetPanY;
        } else {
          targetRotY = baseRotY + dx * 0.0075;
          targetRotX = baseRotX + dy * 0.0075;
          const tiltLimit = Math.PI * 0.45;
          targetRotX = Math.max(-tiltLimit, Math.min(tiltLimit, targetRotX));
          
          baseRotY = targetRotY;
          baseRotX = targetRotX;
        }
      } else {
        // PNPOLY Raycasting to check hovered component
        let foundHover = null;
        for (let i = sortedDrawables.length - 1; i >= 0; i--) {
          const item = sortedDrawables[i];
          if (item.type === "face") {
            const facePoints = item.indices.map(idx => projected[idx]);
            if (facePoints.every(pt => pt && pt.visible)) {
              if (isPointInPolygon(mouseX, mouseY, facePoints)) {
                foundHover = getVertexComponent(item.indices[0]);
                break;
              }
            }
          }
        }
        hoveredComponent = foundHover;
        
        // Update cursors
        if (canvas) {
          if (hoveredComponent) {
            canvas.style.cursor = "pointer"; // Hand icon indicates dragging parts
          } else {
            canvas.style.cursor = "grab";
          }
        }
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      activeDragComponent = null;
      if (canvas) {
        canvas.style.cursor = hoveredComponent ? "pointer" : "grab";
      }
    };

    const handleMouseLeave = () => {
      isDragging = false;
      activeDragComponent = null;
      mouseRef.current.active = false;
      if (canvas) {
        canvas.style.cursor = "grab";
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Normalize wheel delta across browsers and delta modes
      let delta = e.deltaY;
      if (e.deltaMode === 1) { // Line mode
        delta *= 33;
      } else if (e.deltaMode === 2) { // Page mode
        delta *= 600;
      }
      
      const zoomSpeed = 0.0012;
      targetZoomFactor -= delta * zoomSpeed;
      targetZoomFactor = Math.max(0.35, Math.min(2.5, targetZoomFactor));
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Double click to smoothly animate pieces back to original position
    const handleDoubleClick = () => {
      Object.keys(targetComponentOffsets).forEach(key => {
        targetComponentOffsets[key] = { x: 0, y: 0, z: 0 };
      });
    };

    // Touch Support for Mobile Dragging
    const handleTouchStart = (e: TouchEvent) => {
      // Custom double-tap reset check
      const now = Date.now();
      if (now - lastTouchTime < 300) {
        handleDoubleClick();
        lastTouchTime = 0;
        return;
      }
      lastTouchTime = now;

      if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        dragStart.x = touch.clientX;
        dragStart.y = touch.clientY;
        baseRotY = rotationY;
        baseRotX = rotationX;
        basePanX = targetPanX;
        basePanY = targetPanY;

        // Check if touched a component face
        let foundHover = null;
        for (let i = sortedDrawables.length - 1; i >= 0; i--) {
          const item = sortedDrawables[i];
          if (item.type === "face") {
            const facePoints = item.indices.map(idx => projected[idx]);
            if (facePoints.every(pt => pt && pt.visible)) {
              if (isPointInPolygon(touchX, touchY, facePoints)) {
                foundHover = getVertexComponent(item.indices[0]);
                break;
              }
            }
          }
        }

        activeDragComponent = foundHover;
        isPanning = false;
      } else if (e.touches.length === 2) {
        isDragging = true;
        activeDragComponent = null;
        isPanning = true;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        dragStart.x = (touch1.clientX + touch2.clientX) / 2;
        dragStart.y = (touch1.clientY + touch2.clientY) / 2;
        basePanX = targetPanX;
        basePanY = targetPanY;

        // Calculate initial distance for pinch-to-zoom
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        initialTouchDistance = Math.sqrt(dx * dx + dy * dy);
        initialZoom = targetZoomFactor;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        // Prevent default scrolling only when actively interacting
        if (e.cancelable) {
          e.preventDefault();
        }

        if (activeDragComponent && e.touches.length === 1) {
          const touch = e.touches[0];
          const dx = touch.clientX - dragStart.x;
          const dy = touch.clientY - dragStart.y;
          
          dragStart.x = touch.clientX;
          dragStart.y = touch.clientY;

          // Drag selected piece
          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);
          const targetOff = targetComponentOffsets[activeDragComponent];
          targetOff.x += dx * cosY * 0.5;
          targetOff.z -= dx * sinY * 0.5;
          targetOff.y += dy * 0.5;
          
          targetOff.x = Math.max(-180, Math.min(180, targetOff.x));
          targetOff.y = Math.max(-180, Math.min(180, targetOff.y));
          targetOff.z = Math.max(-180, Math.min(180, targetOff.z));
        } else if (e.touches.length === 1 && !isPanning) {
          const touch = e.touches[0];
          const dx = touch.clientX - dragStart.x;
          const dy = touch.clientY - dragStart.y;
          
          dragStart.x = touch.clientX;
          dragStart.y = touch.clientY;

          // Orbit camera
          targetRotY = baseRotY + dx * 0.01;
          targetRotX = baseRotX + dy * 0.01;
          const tiltLimit = Math.PI * 0.45;
          targetRotX = Math.max(-tiltLimit, Math.min(tiltLimit, targetRotX));
          baseRotY = targetRotY;
          baseRotX = targetRotX;
        } else if (e.touches.length === 2 && isPanning) {
          // Pan camera
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const centerX = (touch1.clientX + touch2.clientX) / 2;
          const centerY = (touch1.clientY + touch2.clientY) / 2;
          const deltaX = centerX - dragStart.x;
          const deltaY = centerY - dragStart.y;
          
          dragStart.x = centerX;
          dragStart.y = centerY;
          
          targetPanX = basePanX + deltaX;
          targetPanY = basePanY + deltaY;
          targetPanX = Math.max(-200, Math.min(200, targetPanX));
          targetPanY = Math.max(-250, Math.min(250, targetPanY));
          basePanX = targetPanX;
          basePanY = targetPanY;

          // Pinch-to-zoom calculation
          const dx = touch1.clientX - touch2.clientX;
          const dy = touch1.clientY - touch2.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (initialTouchDistance > 0) {
            const factor = dist / initialTouchDistance;
            targetZoomFactor = Math.max(0.35, Math.min(2.5, initialZoom * factor));
          }
        }
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      activeDragComponent = null;
    };

    // Bind event listeners to canvas itself for mousedown/touchstart
    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("contextmenu", handleContextMenu);
      canvas.addEventListener("dblclick", handleDoubleClick);
      
      canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
      canvas.addEventListener("touchend", handleTouchEnd);
    }
    
    // Bind window event listeners to keep interaction smooth even when dragging outside bounds
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("contextmenu", handleContextMenu);
        canvas.removeEventListener("dblclick", handleDoubleClick);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
      
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-background text-foreground flex flex-col justify-between p-6 md:p-16 overflow-hidden select-none"
    >
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/20 to-background pointer-events-none z-0" />

      {/* Top Header */}
      <header className="relative w-full z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#e03a2f] block">Studio Tactile</span>
        <div className="h-[1px] w-12 bg-white/10 mt-4" />
      </header>

      {/* Split Grid Layout */}
      <main className="relative w-full flex-grow grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center z-10 my-auto">
        {/* Left Column: Text & Navigation */}
        <div className="flex flex-col items-start text-left space-y-8 max-w-lg md:pr-12 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#e03a2f] block">Volume 05</span>
            <h1 className="text-5xl md:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] mt-2 mb-6">
              Coming<br />
              <span className="text-white/40">Soon.</span>
            </h1>
            <p className="text-[#888888] text-sm md:text-base leading-relaxed font-medium mb-8">
              We are detailing this essay on material honesty, thermal poetry, and structural lines. Expected publication in Autumn 2026.
            </p>
            <MagneticButton 
              to="/" 
              text="Back to Homepage" 
            />
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Canvas */}
        <div className="relative w-full h-[280px] xs:h-[320px] md:h-[550px] flex items-center justify-center order-1 md:order-2 group">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain opacity-90 md:opacity-100 z-10"
          />
          {/* Interaction Legend Overlay */}
          <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/35 bg-black/45 backdrop-blur-md px-3 py-2 rounded border border-white/5 pointer-events-none transition-all duration-300 opacity-60 group-hover:opacity-100 z-20 shadow-lg tracking-wider space-y-1 text-right">
            {isMobile ? (
              <>
                <div>Touch & Drag to Orbit · 2-Finger Drag to Pan & Zoom</div>
                <div className="text-[#e03a2f]/70 font-semibold">Drag Pieces to Explode Maquette · Double-tap to Reset</div>
              </>
            ) : (
              <>
                <div>Drag Background to Orbit · Shift+Drag to Pan · Scroll to Zoom</div>
                <div className="text-[#e03a2f]/70 font-semibold">Drag Pieces to Explode Maquette · Double-click to Reset</div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full flex justify-between items-center">
        <span className="text-[8px] font-mono tracking-[0.3em] text-[#444444] uppercase">
          All Rights Reserved. 2026
        </span>
      </footer>
    </div>
  );
}
