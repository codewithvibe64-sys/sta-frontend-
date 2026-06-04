import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

// --- Rolling Text (Staggered Mechanical Roll Effect) ---
interface RollingTextProps {
  text: string;
  className?: string;
  isHovered?: boolean;
}

export function RollingText({ text, className = "", isHovered = false }: RollingTextProps) {
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const dupCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setLetters(text.split(""));
    charsRef.current = [];
    dupCharsRef.current = [];
  }, [text]);

  useEffect(() => {
    if (letters.length === 0) return;

    const duration = 0.4;
    const ease = "power2.out";
    const stagger = 0.02;

    const activeChars = charsRef.current.filter((el): el is HTMLSpanElement => el !== null);
    const activeDupChars = dupCharsRef.current.filter((el): el is HTMLSpanElement => el !== null);

    if (isHovered) {
      // Roll original letters up and out
      gsap.to(activeChars, {
        y: "-100%",
        duration,
        ease,
        stagger,
        overwrite: "auto",
      });
      // Roll duplicate letters up and in
      gsap.to(activeDupChars, {
        y: "0%",
        duration,
        ease,
        stagger,
        overwrite: "auto",
      });
    } else {
      // Roll original letters back down and in
      gsap.to(activeChars, {
        y: "0%",
        duration,
        ease,
        stagger,
        overwrite: "auto",
      });
      // Roll duplicate letters back down and out
      gsap.to(activeDupChars, {
        y: "100%",
        duration,
        ease,
        stagger,
        overwrite: "auto",
      });
    }
  }, [isHovered, letters]);

  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      {/* Layout placeholder to preserve exact dimensions */}
      <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">
        {text}
      </span>

      {/* Set 1: Original letters absolute overlay */}
      <span className="absolute inset-0 flex select-none pointer-events-none">
        {letters.map((char, i) => (
          <span
            key={`orig-${i}`}
            ref={(el) => {
              charsRef.current[i] = el;
            }}
            className="inline-block will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>

      {/* Set 2: Duplicate letters absolute overlay (starts below at y: 100%) */}
      <span className="absolute inset-0 flex select-none pointer-events-none">
        {letters.map((char, i) => (
          <span
            key={`dup-${i}`}
            ref={(el) => {
              dupCharsRef.current[i] = el;
            }}
            className="inline-block will-change-transform"
            style={{ transform: "translateY(100%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  );
}

// --- Magnetic Button with Integrated Rolling Text (Primary CTA) ---
interface MagneticButtonProps {
  to?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  magneticStrength?: number;
  textStrength?: number;
}

export function MagneticButton({
  to,
  onClick,
  text,
  className = "",
  magneticStrength = 22,
  textStrength = 11,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic pull container
    gsap.to(container, {
      x: x * (magneticStrength / 100),
      y: y * (magneticStrength / 100),
      duration: 0.35,
      ease: "power2.out",
    });

    // Parallax text shift (slightly slower)
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * (textStrength / 100),
        y: y * (textStrength / 100),
        duration: 0.35,
        ease: "power2.out",
      });
    }

    // Parallax border shift (slightly faster)
    if (borderRef.current) {
      gsap.to(borderRef.current, {
        x: x * ((textStrength + 4) / 100),
        y: y * ((textStrength + 4) / 100),
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const container = containerRef.current;
    if (!container) return;

    // Return container to center elastically
    gsap.to(container, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });

    // Return text inside
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    }

    // Return border inside
    if (borderRef.current) {
      gsap.to(borderRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  const renderInner = () => (
    <>
      {/* Premium Sliding Double Curtain Background (Bronze to Charcoal) */}
      <div
        className="absolute inset-0 bg-[#c5a880] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] z-0 pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-[#090909] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] delay-[60ms] z-0 pointer-events-none"
      />
      
      {/* Main Text Content */}
      <div ref={textRef} className="relative z-10 pointer-events-none">
        <RollingText text={text} isHovered={isHovered} />
      </div>
    </>
  );

  const classes = `relative z-10 flex items-center justify-center bg-[#1c1c1c]/90 border border-[#c5a880]/30 text-[#c5a880] px-16 py-8 text-[10px] font-bold uppercase tracking-[0.4em] group-hover:tracking-[0.55em] overflow-hidden transition-all duration-500 group-hover:text-[#ffffff] group-hover:border-[#c5a880]/80 ${className}`;

  return (
    <div
      ref={containerRef}
      className="inline-block relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Structural double outline back-frame */}
      <div
        ref={borderRef}
        className="absolute inset-0 border border-[#c5a880]/20 scale-100 group-hover:scale-105 group-hover:border-[#c5a880]/60 transition-all duration-700 pointer-events-none"
      />

      {to ? (
        <Link to={to} className={classes} style={{ display: "flex" }}>
          {renderInner()}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={classes}
          style={{ display: "flex", border: "none", outline: "none", cursor: "pointer" }}
        >
          {renderInner()}
        </button>
      )}
    </div>
  );
}

// --- Dynamic Drawing Underline & Rolling Arrow Link (Secondary CTA) ---
interface RollingTextLinkProps {
  to?: string;
  onClick?: () => void;
  text: string;
  className?: string;
}

export function RollingTextLink({ to, onClick, text, className = "" }: RollingTextLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderContent = () => (
    <>
      <RollingText text={text} isHovered={isHovered} />

      {/* Dynamic elastic sliding arrow icon */}
      <span className="inline-flex items-center relative w-4 group-hover:w-8 transition-all duration-500 ease-out origin-left pointer-events-none">
        <span className="w-full h-[1px] bg-current" />
        <span className="absolute right-0 w-1.5 h-1.5 border-t border-r border-current rotate-45 transform -translate-y-[0px] group-hover:translate-x-0.5 transition-transform duration-300" />
      </span>

      {/* Drawing structural double underline */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#444444] scale-x-100 origin-left transition-transform duration-500 group-hover:scale-x-0 pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#e03a2f] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 delay-75 pointer-events-none" />
    </>
  );

  const classes = `group relative inline-flex items-center gap-4 pb-2 text-[10px] font-bold tracking-widest uppercase hover:text-[#e03a2f] transition-colors duration-500 ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ border: "none", outline: "none", cursor: "pointer", background: "none" }}
    >
      {renderContent()}
    </button>
  );
}

// --- Stone Carved Basalt Slab Button with Glowing Gold Inlay Sweep ---
interface StoneCarvedButtonProps {
  to?: string;
  onClick?: () => void;
  text: string;
  className?: string;
  magneticStrength?: number;
  textStrength?: number;
}

export function StoneCarvedButton({
  to,
  onClick,
  text,
  className = "",
  magneticStrength = 20,
  textStrength = 10,
}: StoneCarvedButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic pull
    gsap.to(container, {
      x: x * (magneticStrength / 100),
      y: y * (magneticStrength / 100),
      duration: 0.35,
      ease: "power2.out",
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * (textStrength / 100),
        y: y * (textStrength / 100),
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (borderRef.current) {
      gsap.to(borderRef.current, {
        x: x * ((textStrength + 3) / 100),
        y: y * ((textStrength + 3) / 100),
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    }

    if (borderRef.current) {
      gsap.to(borderRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  const renderContent = () => {
    return (
      <div 
        ref={textRef} 
        className="relative flex items-center justify-center select-none pointer-events-none w-full h-full"
      >
        {/* Underlay / The Deep Inset Carved Shadow */}
        <span 
          className="font-sans text-[11px] md:text-[12px] font-black uppercase tracking-[0.45em] text-[#9c9a96] will-change-transform transition-all duration-700 group-hover:tracking-[0.55em]"
          style={{
            textShadow: "-1px -1px 0px rgba(0, 0, 0, 0.85), 1px 1px 0px rgba(255, 255, 255, 0.08)"
          }}
        >
          {text}
        </span>

        {/* Overlay / The Glowing Molten Gold Sweep */}
        <span 
          className="absolute inset-0 flex items-center justify-center font-sans text-[11px] md:text-[12px] font-black uppercase tracking-[0.45em] will-change-[background-position,tracking] transition-all duration-700 group-hover:tracking-[0.55em]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #c5a880 40%, #eae6df 50%, #c5a880 60%, transparent 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: isHovered ? "0% 0%" : "150% 0%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "background-position 0.9s cubic-bezier(0.25, 1, 0.5, 1), letter-spacing 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
          }}
        >
          {text}
        </span>
      </div>
    );
  };

  const classes = `relative z-10 flex items-center justify-center bg-[#141414] border border-[#222222] px-16 py-8 overflow-hidden transition-all duration-500 group-hover:border-[#c5a880]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] ${className}`;

  return (
    <div
      ref={containerRef}
      className="inline-block relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Dynamic 3D Bezel Stone Border */}
      <div
        ref={borderRef}
        className="absolute inset-0 border border-[#c5a880]/10 scale-100 group-hover:scale-105 group-hover:border-[#c5a880]/40 transition-all duration-700 pointer-events-none"
      />

      {to ? (
        <Link to={to} className={classes} style={{ display: "flex", width: "100%", height: "100%" }}>
          {renderContent()}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={classes}
          style={{ display: "flex", border: "none", outline: "none", cursor: "pointer", width: "100%", height: "100%", background: "none" }}
        >
          {renderContent()}
        </button>
      )}
    </div>
  );
}
