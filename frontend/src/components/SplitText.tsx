import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify" | "inherit";
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts && document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;

      // Extract ScrollTrigger start calculations
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      // Select targets for animation
      let targets: HTMLElement[] = [];
      if (splitType.includes("chars")) {
        targets = gsap.utils.toArray(el.querySelectorAll(".split-char"));
      } else if (splitType.includes("words")) {
        targets = gsap.utils.toArray(el.querySelectorAll(".split-word"));
      } else {
        targets = gsap.utils.toArray(el.querySelectorAll(".split-word, .split-char"));
      }

      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true
        }
      );
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const words = text.split(" ");

  const renderContent = () => {
    return words.map((word, wordIdx) => {
      const isLastWord = wordIdx === words.length - 1;
      
      if (splitType === "chars" || splitType === "words, chars") {
        const chars = word.split("");
        return (
          <span key={wordIdx} className="split-word inline-block whitespace-nowrap">
            {chars.map((char, charIdx) => (
              <span key={charIdx} className="split-char inline-block will-change-[transform,opacity]">
                {char}
              </span>
            ))}
            {!isLastWord && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      } else {
        // splitType === "words"
        return (
          <span key={wordIdx} className="split-word inline-block will-change-[transform,opacity]">
            {word}
            {!isLastWord && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      }
    });
  };

  const style = {
    textAlign,
    overflow: "hidden" as const,
    display: "inline-block" as const,
    whiteSpace: "normal" as const,
    wordWrap: "break-word" as const,
    willChange: "transform, opacity" as const
  };

  const classes = `split-parent ${className}`;
  const Tag = tag;

  if (!text) return null;

  return (
    <Tag ref={ref as any} style={style} className={classes}>
      {renderContent()}
    </Tag>
  );
}
