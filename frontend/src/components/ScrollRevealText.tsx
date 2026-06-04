import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  lines: string[];
  containerClassName?: string;
  stagger?: number;
  duration?: number;
  start?: string;
  ease?: string;
  delay?: number;
}

export default function ScrollRevealText({
  lines,
  containerClassName = "",
  stagger = 0.05,
  duration = 0.5,
  start = "top center",
  ease = "power1.out",
  delay = 0
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll(".char");
    if (charElements.length === 0) return;

    // Create a gsap animation context for clean mounting/unmounting
    const ctx = gsap.context(() => {
      const isPast = el.getBoundingClientRect().top < window.innerHeight * 0.95;

      gsap.fromTo(
        charElements,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: duration,
          ease: ease,
          stagger: stagger,
          delay: delay,
          scrollTrigger: isPast ? undefined : {
            trigger: el,
            start: start,
            toggleActions: "play none none none"
          }
        }
      );
    }, el);

    // Clean up all triggers on unmount to prevent memory leaks
    return () => ctx.revert();
  }, [JSON.stringify(lines), stagger, duration, start, ease, delay]);

  return (
    <div ref={containerRef} className={containerClassName}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="overflow-hidden block leading-normal">
          {line.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="char inline-block will-change-[transform,opacity]"
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
