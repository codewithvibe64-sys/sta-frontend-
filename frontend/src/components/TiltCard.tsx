import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees
  perspective?: number; // Perspective distance in px
  scale?: number; // Scale on hover
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize cursor position from -1 to 1 relative to center
    const xc = (x - rect.width / 2) / (rect.width / 2);
    const yc = (y - rect.height / 2) / (rect.height / 2);

    // Calculate rotation angles
    const rotateX = yc * maxTilt;
    const rotateY = -xc * maxTilt;

    // Apply 3D rotation, scale, and dynamic soft floating box shadow
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: scale,
      boxShadow: "0 35px 80px -15px rgba(0, 0, 0, 0.95)",
      duration: 0.35,
      ease: "power2.out",
    });

    // Move shine glare reflection
    if (glareRef.current) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      
      gsap.to(glareRef.current, {
        background: `radial-gradient(circle 200px at ${px}% ${py}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)`,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;

    const card = cardRef.current;
    if (!card) return;

    // Reset card tilt and drop shadow smoothly
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.85)",
      duration: 0.6,
      ease: "power3.out",
    });

    // Fade out glare
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)",
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <div
      style={{ perspective: `${perspective}px`, transformStyle: "preserve-3d" }}
      className="w-full h-full block overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={`relative ${className}`}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Child elements */}
        {children}

        {/* Glare reflection overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 z-30 pointer-events-none rounded-[inherit]"
          style={{ mixBlendMode: "overlay" }}
        />
      </div>
    </div>
  );
}
