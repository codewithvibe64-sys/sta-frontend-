import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TextPressure from "../components/TextPressure";
import ScrollFloat from "../components/ScrollFloat";
import ScrollRevealText from "../components/ScrollRevealText";
import SplitText from "../components/SplitText";
import { MagneticButton, RollingTextLink } from "../components/InteractiveButton";
import TiltCard from "../components/TiltCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Hero slideshow images (served from /public/images/) ---
const heroImg1 = "/images/hero1.jpg";
const heroImg2 = "/images/hero2.jpg";
const heroImg3 = "/images/hero3.png";
const heroImg4 = "/images/hero4.jpg";

// --- Service card images ---
const svcArchitecture = "/images/svc-architecture.png";
const svcInterior     = "/images/svc-interior.png";
const svcRenovation   = "/images/svc-renovation.jpeg";
const svcTurnkey      = "/images/svc-turnkey.jpg";
const svcVastu        = "/images/svc-vastu.jpg";
const svcDesign       = "/images/svc-design.jpg";

// --- Featured + Portfolio images ---
const cornerHouseHero = "/images/front_elevation.jpg";
const masalaImg1 = "/images/IMG_20220907_201623.jpg";

const featuredImg  = "/images/featured.jpg";
const portfolioImg1 = cornerHouseHero;
const portfolioImg2 = masalaImg1;

const heroSlides = [
  { src: heroImg1, label: "Dinesh Residence · Coimbatore" },
  { src: heroImg2, label: "Aiswarya Residence · Thanjavur" },
  { src: heroImg3, label: "A1 Travels Interior · Chennai" },
  { src: heroImg4, label: "A1 Travels Interior · Chennai" },
];

const services = [
  { title: "Residential Architecture", id: "residential-architecture", desc: "Timeless residences that combine functionality, innovation, and elegant design.", img: svcArchitecture, color: "#e03a2f" },
  { title: "Luxury Villa Design", id: "luxury-villa-design", desc: "Resort-style private estates and beachfront weekend retreats.", img: svcDesign, color: "#ffffff" },
  { title: "Commercial Architecture", id: "commercial-architecture", desc: "High-performance offices, retail spaces, and creative workspaces.", img: svcVastu, color: "#888888" },
  { title: "Interior Design", id: "interior-design", desc: "Curated, material-rich indoor spaces designed for comfort and clarity.", img: svcInterior, color: "#ffffff" },
  { title: "Landscape Design", id: "landscape-design", desc: "Integrating built form and nature with native flora and hardscaping.", img: svcTurnkey, color: "#888888" },
  { title: "Renovation & Remodeling", id: "renovation-remodeling", desc: "Reworking and expanding older structures with purpose and precision.", img: svcRenovation, color: "#888888" },
  { title: "Turnkey Construction", id: "turnkey-construction", desc: "Complete execution from design planning to hand-key construction.", img: svcTurnkey, color: "#e03a2f" },
];

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.15,
    filter: "blur(25px) brightness(1.2)",
  },
  center: {
    opacity: 1,
    scale: 1.0,
    filter: "blur(0px) brightness(1)",
    transition: {
      opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
      scale: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }, // Cinematic focus stabilization
      filter: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(20px) brightness(0.8)",
    transition: {
      opacity: { duration: 1.0, ease: [0.42, 0, 1, 1] },
      scale: { duration: 1.2, ease: [0.42, 0, 1, 1] },
      filter: { duration: 1.0, ease: [0.42, 0, 1, 1] },
    },
  },
} as unknown as Variants;

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const scopeOfCraftRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scopeOfCraftRef,
    offset: ["start start", "end end"],
  });

  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth < 768;
      const width = isMobileSize ? 280 : 400;
      const gap = isMobileSize ? 20 : 30;
      setScrollDistance((services.length - 1) * (width + gap));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay disabled by user request. Navigation is handled manually via arrow buttons and dots.

  // Scroll-triggered nested reveal for Manifesto cards
  useEffect(() => {
    const cards = document.querySelectorAll(".manifesto-card");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const isMobileSize = window.innerWidth < 768;

      cards.forEach((card, idx) => {
        const content = card.querySelector(".manifesto-content");
        if (!content) return;

        // Select the child elements (lines) inside manifesto-content: label, h4, and p
        const lines = content.children;

        // Animate the card container (the border-left and hover zone)
        gsap.fromTo(
          card,
          {
            x: isMobileSize ? -15 : -35,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: isMobileSize ? 1.0 : 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: isMobileSize ? "top bottom-=5%" : "top bottom-=15%",
              toggleActions: "play none none none",
            }
          }
        );

        // Animate the card's text line-by-line
        gsap.fromTo(
          lines,
          {
            y: 15,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: isMobileSize ? 0.8 : 1.2,
            stagger: 0.15, // Stagger between the lines inside the card
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: isMobileSize ? "top bottom-=5%" : "top bottom-=15%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // 3D Pop-Up Catalog Brochure Unfolding sequence for Journal Cards
  useEffect(() => {
    const cards = document.querySelectorAll(".journal-card");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        const img = card.querySelector(".journal-img");
        const container = card.querySelector(".journal-img-container");
        if (!img || !container) return;

        const isMobileSize = window.innerWidth < 768;

        // Set 3D perspective settings on the parent card (gentler on mobile)
        gsap.set(card, {
          perspective: isMobileSize ? 800 : 1500,
          transformStyle: "preserve-3d",
        });

        // Determine custom brochure unfolding parameters based on column index
        let fromRotateX = 0;
        let fromRotateY = 0;
        let fromZ = isMobileSize ? -30 : -120;
        let fromScale = isMobileSize ? 0.95 : 0.88;
        let transformOrigin = "center center";

        if (isMobileSize) {
          // On mobile: gentle, non-obtrusive vertical blueprint lift
          fromRotateX = 14;
          transformOrigin = "bottom center";
        } else {
          // On desktop: premium alternating 3D brochure flips sequence
          if (idx === 0) {
            fromRotateY = -80;
            fromRotateX = 4;
            transformOrigin = "left center";
          } else if (idx === 1) {
            fromRotateY = -80;
            fromRotateX = 4;
            transformOrigin = "center center";
          } else {
            fromRotateY = 80;
            fromRotateX = 4;
            transformOrigin = "right center";
          }
        }

        // 3D Catalog Flip Unfolding Reveal for the Image Container
        gsap.fromTo(
          container,
          {
            rotateX: fromRotateX,
            rotateY: fromRotateY,
            transformOrigin: transformOrigin,
            opacity: 0,
            scale: fromScale,
            z: fromZ,
          },
          {
            rotateX: 0,
            rotateY: 0,
            transformOrigin: transformOrigin,
            opacity: 1,
            scale: 1.0,
            z: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=8%",
              end: "bottom center+=10%",
              scrub: 1.3, // Ultra-smooth weighted hydraulic scrub
            }
          }
        );

        // Zoom and Scale for the Image inside (maintaining original color always)
        gsap.fromTo(
          img,
          {
            scale: 1.25,
          },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=8%",
              end: "bottom center+=10%",
              scrub: 1.3,
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSlideChange = (newIndex: number) => {
    if (newIndex === currentSlide) return;
    setCurrentSlide(newIndex);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="bg-background selection:bg-[#e03a2f] selection:text-white">
      {/* React 19 Document Metadata Hoisting */}
      <title>Studio Tactile | Contemporary Architecture &amp; Interior Design</title>
      <meta name="description" content="Studio Tactile is a premium contemporary architecture and interior design practice based in India. We focus on structural honesty, spatial clarity, and silent brutalism." />
      <link rel="canonical" href="https://stadesign.net/" />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col justify-start md:justify-end px-6 md:px-12 pb-16 md:pb-24 pt-32 overflow-hidden group/hero"
        onMouseMove={(e) => {
          if (isMobile) return;
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
          const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1..1
          setParallax({ x: px * 18, y: py * 10 });
        }}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      >
        {/* Slideshow Background / Stacked Container */}
        {/* 3D Coverflow Slideshow Background */}
        <motion.div
          className="relative md:absolute inset-0 w-full h-[380px] md:h-auto flex items-center justify-center md:justify-end md:pr-6 lg:pr-10 xl:pr-12 md:pt-24 order-2 md:order-1 z-10 md:z-0 mt-8 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          style={{ perspective: "1200px" }}
        >
          {/* Slideshow Wrapper to absolute-position arrows next to the slides */}
          <div className="relative w-full max-w-xl h-[360px] md:h-[500px] flex items-center justify-center">
            
            {/* 3D transformed slides container */}
            <div 
              className="w-full h-full flex items-center justify-center relative" 
              style={{ transformStyle: "preserve-3d", transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
            >
              {heroSlides.map((slide, i) => {
                const rawOffset = i - currentSlide;
                const offset = rawOffset > heroSlides.length / 2
                  ? rawOffset - heroSlides.length
                  : rawOffset < -heroSlides.length / 2
                    ? rawOffset + heroSlides.length
                    : rawOffset;

                const rotateY = offset === 0 ? 0 : offset > 0 ? -42 : 42;
                const z = Math.abs(offset) === 0 ? 0 : Math.abs(offset) === 1 ? -180 : -320;
                const x = offset * (isMobile ? 120 : 220); // Dynamic responsive spacing
                const scale = Math.abs(offset) === 0 ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.66;
                const opacity = Math.abs(offset) === 0 ? 1 : Math.abs(offset) === 1 ? 0.72 : 0.28;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-[240px] md:w-[500px] h-[300px] md:h-[450px] bg-[#131313] border border-white/5 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer group"
                    style={{
                      transformOrigin: "center center",
                    }}
                    animate={{
                      x: x,
                      z: z,
                      rotateY: rotateY,
                      scale: scale,
                      opacity: opacity,
                      zIndex: 10 - Math.abs(offset),
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => handleSlideChange(i)}
                  >
                    <img
                      src={slide.src}
                      alt={slide.label}
                      className="w-full h-full object-cover no-grayscale"
                      style={{ filter: "none" }}
                    />
                    {/* Subtle contrast gradient for readable overlay text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 opacity-90 transition-opacity group-hover/opacity-80" />
                  </motion.div>
                );
              })}
            </div>

            {/* Left Prev Arrow Button (Placed after 3D container with z-40 to prevent overlap blocks) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevSlide();
              }}
              className="absolute left-4 md:left-[-60px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/45 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e03a2f] hover:border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto shadow-2xl"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Next Arrow Button (Placed after 3D container with z-40 to prevent overlap blocks) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextSlide();
              }}
              className="absolute right-4 md:right-[-60px] top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/45 backdrop-blur-md flex items-center justify-center text-white hover:text-[#e03a2f] hover:border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto shadow-2xl"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Combined Label & Dots Indicator (Responsive Placement) */}
        <div className="order-3 mt-8 flex items-center justify-between w-full z-20 relative md:absolute md:bottom-8 md:left-0 md:right-0 md:px-12 md:mt-0">
          {/* Current project label */}
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#444444] select-none">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {heroSlides[currentSlide].label}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === currentSlide
                    ? "w-8 h-[3px] bg-[#e03a2f]"
                    : "w-[3px] h-[3px] bg-[#444444] hover:bg-[#888888]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Typography Block */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
          className="relative z-10 max-w-6xl order-1 md:order-2 pointer-events-none"
        >
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter mb-8 md:mb-12 uppercase">
            Sculpting<br />
            <span className="text-[#e03a2f]">Silence.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12">
            <p className="text-base md:text-lg text-[#888888] max-w-xl font-medium leading-relaxed">
              Architecture is the silent stage for human life. We sculpt light, air, and material to create permanent anchors in an ephemeral world.
            </p>
            <Link to="/projects" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#e03a2f] transition-colors duration-500 pointer-events-auto">
              Explore Works
              <div className="w-12 h-[1px] bg-[#444444] group-hover:bg-[#e03a2f] group-hover:w-20 transition-all duration-500"></div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Thinking Blocks - Simplified */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-y border-[#1c1b1b]">
        <div className="p-8 md:p-16 bg-[#0f0f0f] border-r border-[#1c1b1b] flex flex-col justify-center min-h-[360px]">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#e03a2f]/80 mb-4 block">Philosophy 01</span>
          <ScrollRevealText
            lines={["Space over", "size."]}
            containerClassName="text-3xl md:text-[2.5rem] font-black tracking-tighter mb-4 uppercase leading-[0.95] text-[#f5f5f5]"
            start="top bottom-=15%"
            stagger={0.03}
            delay={0}
          />
          <ScrollRevealText
            lines={["We focus on how a space feels and functions, not just how much area it covers."]}
            containerClassName="text-sm text-[#888888] leading-relaxed max-w-xs font-medium mt-4"
            start="top bottom-=10%"
            stagger={0.01}
            delay={0.15}
          />
        </div>
        <div className="p-8 md:p-16 bg-[#0f0f0f] border-r border-[#1c1b1b] flex flex-col justify-center min-h-[360px]">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#e03a2f]/80 mb-4 block">Philosophy 02</span>
          <ScrollRevealText
            lines={["Clarity over", "clutter."]}
            containerClassName="text-3xl md:text-[2.5rem] font-black tracking-tighter mb-4 uppercase leading-[0.95] text-[#f5f5f5]"
            start="top bottom-=15%"
            stagger={0.03}
            delay={0.5}
          />
          <ScrollRevealText
            lines={["We remove the unnecessary so the structure, light, and materials speak clearly."]}
            containerClassName="text-sm text-[#888888] leading-relaxed max-w-xs font-medium mt-4"
            start="top bottom-=10%"
            stagger={0.01}
            delay={0.65}
          />
        </div>
        <div className="p-8 md:p-16 bg-[#0f0f0f] flex flex-col justify-center min-h-[360px]">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#e03a2f]/80 mb-4 block">Philosophy 03</span>
          <ScrollRevealText
            lines={["Performance ", "over", "appearance."]}
            containerClassName="text-3xl md:text-[2.5rem] font-black tracking-tighter mb-4 uppercase leading-[0.95] text-[#f5f5f5]"
            start="top bottom-=15%"
            stagger={0.03}
            delay={1.0}
          />
          <ScrollRevealText
            lines={["We design for durability, efficiency, and long-term use. Spaces are made to perform, not just impress."]}
            containerClassName="text-sm text-[#888888] leading-relaxed max-w-xs font-medium mt-4"
            start="top bottom-=10%"
            stagger={0.01}
            delay={1.15}
          />
        </div>
      </section>

      {/* Who We Are / Why Us */}
      <section className="manifesto-section px-6 md:px-12 py-16 md:py-20 flex flex-col lg:grid lg:grid-cols-12 gap-12 md:gap-24">
        <div className="lg:col-span-5 space-y-8 md:space-y-10">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#e03a2f] mb-3 block">Manifesto</span>
            <SplitText
              tag="h3"
              text="Who is Studio Tactile?"
              className="text-4xl md:text-[3.5rem] font-black tracking-tighter leading-[0.95] uppercase break-words text-[#f5f5f5]"
              delay={isMobile ? 120 : 35}
              duration={0.7}
              ease="power3.out"
              splitType={isMobile ? "words" : "chars"}
            />
          </div>
          <div className="text-lg md:text-xl text-[#f5f5f5] leading-relaxed break-words font-semibold flex flex-col gap-2">
            <SplitText
              tag="p"
              text="We design with clarity. We build with intent."
              className="text-lg md:text-xl text-[#f5f5f5] font-semibold"
              delay={isMobile ? 95 : 20}
              duration={0.6}
              ease="power3.out"
              splitType={isMobile ? "words" : "chars"}
            />
            <SplitText
              tag="p"
              text="Every space is shaped by function, structure, and use. Nothing is added without purpose."
              className="text-lg md:text-xl text-[#f5f5f5] font-semibold"
              delay={isMobile ? 75 : 15}
              duration={0.6}
              ease="power3.out"
              splitType={isMobile ? "words" : "chars"}
            />
            <SplitText
              tag="p"
              text="We detail and execute with the same precision."
              className="text-lg md:text-xl text-[#f5f5f5] font-semibold"
              delay={isMobile ? 95 : 20}
              duration={0.6}
              ease="power3.out"
              splitType={isMobile ? "words" : "chars"}
            />
          </div>
          <div className="text-sm text-[#888888] leading-relaxed break-words font-medium flex flex-col gap-2">
            <SplitText
              tag="p"
              text="We respond to the site, climate, and context. Not trends."
              className="text-sm text-[#888888] font-medium"
              delay={isMobile ? 95 : 20}
              duration={0.6}
              ease="power3.out"
              splitType={isMobile ? "words" : "chars"}
            />
            <SplitText
              tag="p"
              text="We focus on what lasts. Not what impresses for a moment."
              className="text-sm text-[#888888] font-medium"
              delay={isMobile ? 95 : 20}
              duration={0.6}
              ease="power3.out"
              splitType={isMobile ? "words" : "chars"}
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 gap-8 md:gap-10">
          <div 
            className="manifesto-card opacity-0 border-l-2 border-outline-variant/20 pl-8 pb-4 hover:border-[#e03a2f] transition-all duration-500 cursor-pointer"
          >
            <div className="manifesto-content will-change-transform">
              <span className="text-[11px] font-black uppercase text-[#e03a2f]/80 mb-2 tracking-[0.3em] block">01. Planning</span>
              <h4 className="text-xl md:text-2xl font-black mb-3 uppercase tracking-tight text-[#f5f5f5]">Precise Planning.</h4>
              <p className="text-xs md:text-sm text-[#888888] leading-relaxed font-medium break-words">Zoning and flow are defined by how spaces are used. Decisions are based on function, not visual preference.</p>
            </div>
          </div>
          <div 
            className="manifesto-card opacity-0 border-l-2 border-outline-variant/20 pl-8 pb-4 hover:border-[#e03a2f] transition-all duration-500 cursor-pointer"
          >
            <div className="manifesto-content will-change-transform">
              <span className="text-[11px] font-black uppercase text-[#e03a2f]/80 mb-2 tracking-[0.3em] block">02. Execution</span>
              <h4 className="text-xl md:text-2xl font-black mb-3 uppercase tracking-tight text-[#f5f5f5]">Material Clarity.</h4>
              <p className="text-xs md:text-sm text-[#888888] leading-relaxed font-medium break-words">Materials are used as they are. Structure is expressed, not concealed.</p>
            </div>
          </div>
          <div 
            className="manifesto-card opacity-0 border-l-2 border-outline-variant/20 pl-8 pb-4 hover:border-[#e03a2f] transition-all duration-500 cursor-pointer"
          >
            <div className="manifesto-content will-change-transform">
              <span className="text-[11px] font-black uppercase text-[#e03a2f]/80 mb-2 tracking-[0.3em] block">03. Context</span>
              <h4 className="text-xl md:text-2xl font-black mb-3 uppercase tracking-tight text-[#f5f5f5]">Site Response.</h4>
              <p className="text-xs md:text-sm text-[#888888] leading-relaxed font-medium break-words">Design aligns with climate, light, and orientation. Spaces are positioned for comfort and long-term use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project: The Obsidian Void */}
      <section className="bg-surface-container-lowest">
        <div className="flex flex-col md:grid md:grid-cols-12 min-h-[800px]">
          <div className="md:col-span-8 overflow-hidden h-[500px] md:h-auto">
            <motion.img
              alt="Delta Masala Interior Render - Kumbakonam"
              className="w-full h-full object-cover"
              src={featuredImg}
              initial={{ scale: 1.15, filter: "grayscale(100%) brightness(0.8)", x: "-4%" }}
              whileInView={{ 
                scale: 1.10, 
                filter: "grayscale(0%) brightness(1)",
                x: ["-4%", "4%", "-4%"],
              }}
              whileHover={{ scale: 1.13 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ 
                scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                x: {
                  duration: 24,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
              }}
            />
          </div>
          <div className="md:col-span-4 p-6 md:p-12 flex flex-col justify-center">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#e03a2f] mb-3 block">Featured Work</span>
            <h2 className="text-4xl md:text-[3.5rem] font-black mb-6 tracking-tighter uppercase leading-[0.95] text-[#f5f5f5]">The Obsidian Void</h2>
            <p className="text-sm text-[#888888] mb-8 leading-relaxed font-medium">
              A private residence carved into the basalt cliffs of the coast. A study in total darkness and strategic punctures of light.
            </p>
            <RollingTextLink 
              to="/projects" 
              text="View Project Details" 
              className="self-start" 
            />
          </div>
        </div>
      </section>

      {/* Services: Horizontal Scrolling Gallery */}
      <section ref={scopeOfCraftRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-24 overflow-hidden">
          {/* Header */}
          <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 z-20">
            <h2 className="text-4xl md:text-[3.5rem] font-black tracking-tighter uppercase leading-[0.95] text-[#f5f5f5]">
              Scope of Craft
            </h2>
            <div className="text-xs md:text-sm text-[#888888] max-w-xs md:text-right font-medium leading-relaxed">
              We manage the entire process. From first decision to final execution.
            </div>
          </div>

          {/* Sticky Horizontal Scroll Container */}
          <div className="sticky-wrapper w-[280px] md:w-[400px] mx-auto flex items-center justify-start overflow-visible my-auto">
            <motion.div className="gallery flex gap-[20px] md:gap-[30px] will-change-transform" style={{ x }}>
              {services.map((service, i) => (
                <Link
                  key={i}
                  to={`/services/${service.id}`}
                  className="gallery-item shrink-0 block w-[280px] md:w-[400px] h-[350px] md:h-[500px] cursor-pointer rounded-xl overflow-hidden"
                >
                  <TiltCard
                    className="w-full h-full rounded-xl relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/5"
                  >
                    {/* Background image — zoom & color reveal on scroll, premium hover interaction */}
                    <motion.img
                      src={service.img}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ scale: 1.15, filter: "grayscale(100%) brightness(0.6)" }}
                      whileInView={{
                        scale: 1.0,
                        filter: "grayscale(0%) brightness(0.8)",
                      }}
                      whileHover={{ scale: 1.05, filter: "grayscale(0%) brightness(0.9)" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                    {/* Dark overlay — subtle interaction */}
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-700 pointer-events-none" />
                    {/* Bottom gradient for text readability always */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                    
                    {/* Text content with 3D Parallax offset */}
                    <div 
                      className="absolute bottom-8 left-8 z-10 pr-8 pointer-events-none"
                      style={{ transform: "translate3d(0, 0, 35px)", transformStyle: "preserve-3d" }}
                    >
                      <span 
                        className="text-[11px] font-mono tracking-[0.25em] block mb-2 font-bold" 
                        style={{ color: service.color }}
                      >
                        0{i + 1}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black mb-2 uppercase text-white tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/75 leading-relaxed font-medium">
                        {service.desc}
                      </p>
                    </div>
                  </TiltCard>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Bottom spacing helper */}
          <div className="h-4 w-full select-none pointer-events-none" />
        </div>
      </section>

      {/* Process (Design Strategy) */}
      <section className="bg-surface-container-lowest px-6 md:px-12 py-32 border-y border-[#1c1b1b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-4 block">Our Process</span>
            <ScrollFloat
              animationDuration={0.8}
              ease="back.out(1.5)"
              scrollStart="top bottom-=10%"
              scrollEnd="bottom top+=30%"
              stagger={0.03}
              containerClassName="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#f5f5f5]"
              textClassName="text-white"
            >
              Design Strategy
            </ScrollFloat>
          </div>

          <div className="relative">
            {/* Timeline Line (Desktop - Horizontal) */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-[#1c1b1b] hidden md:block z-0">
              <motion.div
                className="h-full bg-[#e03a2f]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Timeline Line (Mobile - Vertical) */}
            <div className="absolute left-10 top-10 bottom-10 w-[1px] bg-[#1c1b1b] md:hidden z-0">
              <motion.div
                className="w-full bg-[#e03a2f]"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
              {[
                { 
                  num: "01", 
                  title: "Consult", 
                  desc: "Requirements, site conditions, and feasibility are defined clearly.",
                  icon: (
                    <svg className="w-8 h-8 stroke-[1.2] text-[#888888] group-hover/step:text-[#e03a2f] group-hover/step:rotate-12 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="6" />
                      <path d="m21 21-4.3-4.3" />
                      <path d="M11 2v4" />
                      <path d="M11 18v4" />
                      <path d="M2 11h4" />
                      <path d="M18 11h4" />
                    </svg>
                  )
                },
                { 
                  num: "02", 
                  title: "Design", 
                  desc: "Plans, layouts, and materials are developed with precision.",
                  icon: (
                    <svg className="w-8 h-8 stroke-[1.2] text-[#888888] group-hover/step:text-[#e03a2f] group-hover/step:-rotate-12 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-8 16" />
                      <path d="m12 3 8 16" />
                      <path d="M7 14h10" />
                      <path d="M12 3v3" />
                      <circle cx="12" cy="6" r="1" />
                      <circle cx="12" cy="14" r="1.5" />
                    </svg>
                  )
                },
                { 
                  num: "03", 
                  title: "Execute", 
                  desc: "Construction is managed on-site with coordination and control.",
                  icon: (
                    <svg className="w-8 h-8 stroke-[1.2] text-[#888888] group-hover/step:text-[#e03a2f] group-hover/step:scale-110 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
                      <path d="M12 22.08V12" />
                    </svg>
                  )
                },
                { 
                  num: "04", 
                  title: "Handover", 
                  desc: "Final detailing is completed before delivery.",
                  icon: (
                    <svg className="w-8 h-8 stroke-[1.2] text-[#888888] group-hover/step:text-[#e03a2f] group-hover/step:rotate-45 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 18 5" />
                    </svg>
                  )
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: (index: number) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    })
                  }}
                  className="group/step flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 relative"
                >
                  {/* Icon Container */}
                  <div className="w-20 h-20 rounded-full bg-[#0f0f0f] border border-[#1c1b1b] group-hover/step:border-[#e03a2f]/40 flex items-center justify-center shrink-0 z-10 transition-all duration-500 relative shadow-inner group-hover/step:shadow-[0_0_25px_rgba(224,58,47,0.15)]">
                    <div className="absolute inset-0.5 rounded-full border border-dashed border-[#1c1b1b] group-hover/step:border-[#e03a2f]/20 group-hover/step:rotate-180 transition-all duration-[2s] ease-linear" />
                    {step.icon}
                  </div>

                  {/* Step Info Content */}
                  <div className="flex-1 md:text-center md:mt-8">
                    {/* Big Step Number on Hover/Active */}
                    <div className="text-3xl md:text-5xl font-black tracking-tighter text-[#1c1b1b] group-hover/step:text-[#e03a2f] transition-colors duration-500 mb-2 md:mb-4">
                      {step.num}
                    </div>
                    <ScrollFloat
                      animationDuration={0.6}
                      ease="back.out(2)"
                      scrollStart="top bottom-=5%"
                      scrollEnd="bottom top+=45%"
                      stagger={0.05}
                      containerClassName="font-bold uppercase text-base tracking-widest mb-2 group-hover/step:text-[#e03a2f] transition-colors duration-500 md:text-center"
                      textClassName="text-[#f5f5f5] group-hover/step:text-[#e03a2f] transition-colors"
                    >
                      {step.title}
                    </ScrollFloat>
                    <p className="text-xs text-[#888888] leading-relaxed max-w-[200px] mx-auto group-hover/step:text-[#cccccc] transition-colors duration-500">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="px-6 md:px-12 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Selected Works.</h2>
          </div>
          <Link to="/projects" className="text-[10px] font-bold uppercase tracking-[0.4em] border-b border-[#f5f5f5] pb-1 hover:text-[#e03a2f] hover:border-[#e03a2f] transition-all">View All Projects</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <Link to="/projects?id=01" className="group relative aspect-video overflow-hidden bg-[#131313]">
            <motion.img
              src={portfolioImg1}
              alt="Corner House"
              className="w-full h-full object-cover"
              initial={{ scale: 1.15, filter: "grayscale(100%) brightness(0.8)" }}
              whileInView={{ 
                scale: 1.0, 
                filter: "grayscale(0%) brightness(1)",
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Corner House</span>
            </div>
          </Link>
          <Link to="/projects?id=09" className="group relative aspect-video overflow-hidden bg-[#131313]">
            <motion.img
              src={portfolioImg2}
              alt="The Delta’s Masala"
              className="w-full h-full object-cover"
              initial={{ scale: 1.15, filter: "grayscale(100%) brightness(0.8)" }}
              whileInView={{ 
                scale: 1.0, 
                filter: "grayscale(0%) brightness(1)",
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">The Delta’s Masala</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Testimonials Filmstrip */}
      <section className="py-32 overflow-hidden bg-[#0f0f0f] border-y border-[#1c1b1b]">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex gap-16">
              {[
                { quote: "Studio Tactile didn't just build us a house; they curated a way for our family to exist in silence and light.", author: "ELIAS VANCE, THE QUARRY HOUSE" },
                { quote: "The mathematical precision of their planning meant zero waste and maximum impact. Truly world-class.", author: "MARINA KOSTAS, URBAN MONolith" },
                { quote: "Tactile by name, tactile by nature. You can feel the weight and quality in every single corner of the build.", author: "JULIAN THORN, SKY RIDGE" },
              ].map((t, i) => (
                <div key={i} className="min-w-[300px] md:min-w-[600px] border-l-4 border-[#e03a2f] pl-8 md:pl-12 py-8">
                  <div className="text-xl md:text-3xl font-bold leading-tight mb-6 whitespace-normal">"{t.quote}"</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">— {t.author}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Journal Preview */}
      <section className="px-6 md:px-12 py-32 border-t border-[#1c1b1b]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-4 block">Thoughts on Permanence.</span>
            <h2 className="text-4xl font-extrabold tracking-tight uppercase">The Journal</h2>
            <p className="text-[#888888] mt-4 font-medium text-sm">Experiments, observations, and work in progress. Notes from design, site, and upcoming sessions.</p>
          </div>
          <Link to="/journal" className="text-[10px] font-bold uppercase tracking-widest border-b border-[#f5f5f5] pb-1 hover:text-[#e03a2f] hover:border-[#e03a2f] transition-all">Read All Essays</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              img: "/images/10.png",
              frontMeta: "Architecture / 14.11.23",
              frontTitle: "The Weight of Silence: Designing for the Quiet Life.",
              backTag: "Sustainability",
              backTitle: "Coming Soon",
              backSub: "Autumn 2026",
              cat: "Architecture",
              title: "The Weight of Silence: Designing for the Quiet Life."
            },
            { 
              img: "/images/11.png",
              frontMeta: "Sustainability / 02.11.23",
              frontTitle: "Thermal Mass as a Poetic Instrument.",
              backTag: "Upcoming / Autumn 26",
              backTitle: "Volume 05: Coming Soon",
              backSub: "Autumn 2026",
              cat: "Sustainability",
              title: "Thermal Mass as a Poetic Instrument."
            },
            { 
              img: "/images/9.png",
              frontMeta: "Practice / 22.10.23",
              frontTitle: "Why We Abandoned the Curve.",
              backTag: "Practice",
              backTitle: "Coming Soon",
              backSub: "Why we chose structural lines over curves. Coming soon Autumn 2026.",
              cat: "Practice",
              title: "Why We Abandoned the Curve."
            }
          ].map((post, i) => (
            <Link 
              to="/coming-soon" 
              key={i} 
              className="group cursor-pointer journal-card block"
              onClick={(e) => {
                if (isMobile) {
                  if (flippedCard !== i) {
                    e.preventDefault();
                    setFlippedCard(i);
                  }
                }
              }}
            >
              {/* Interactive 3D Aspect Box */}
              <motion.div 
                initial="default"
                whileHover={isMobile ? undefined : "hover"}
                animate={isMobile && flippedCard === i ? "hover" : "default"}
                className="relative aspect-[16/10] mb-8 overflow-visible journal-img-container shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-white/5"
                style={{ perspective: 1200, transformStyle: "preserve-3d" as any }}
              >
                {/* Outer Border (60 degrees on hover) */}
                <motion.div
                  className="absolute inset-0 border border-[#e03a2f]/70 pointer-events-none z-30"
                  style={{ transformStyle: "preserve-3d" as any }}
                  variants={{
                    default: { rotateX: isMobile ? 8 : 10, rotateY: isMobile ? -5 : -15, z: 15, opacity: 0.5 },
                    hover: { rotateX: 0, rotateY: isMobile ? 40 : 60, z: isMobile ? 25 : 40, opacity: 1 }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                />

                {/* Card Base (Falls backward on hover) */}
                <motion.div
                  className="absolute inset-0 bg-[#131313] border border-[#1c1b1b] flex flex-col items-center justify-center p-8 text-center z-10"
                  style={{ transformStyle: "preserve-3d" as any }}
                  variants={{
                    default: { rotateX: isMobile ? 8 : 10, rotateY: isMobile ? -5 : -15, z: 0 },
                    hover: { rotateX: isMobile ? -10 : -20, rotateY: isMobile ? -5 : -10, z: isMobile ? -40 : -80 }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-4">{post.backTag}</span>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-[#f5f5f5] mb-2 leading-snug">{post.backTitle}</h3>
                  <p className="text-[10px] text-[#888888] leading-relaxed max-w-xs">{post.backSub}</p>
                </motion.div>

                {/* Image Layer (Rotates 90 degrees on hover to reveal the text behind it) */}
                <motion.div
                  className="absolute inset-0 w-full h-full overflow-hidden z-20"
                  style={{ 
                    transformStyle: "preserve-3d" as any, 
                    backfaceVisibility: "hidden" as any, 
                    WebkitBackfaceVisibility: "hidden" as any 
                  }}
                  variants={{
                    default: { rotateX: isMobile ? 8 : 10, rotateY: isMobile ? -5 : -15, z: 8, opacity: 1 },
                    hover: { rotateX: 0, rotateY: 90, z: 0, opacity: 0 }
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover journal-img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute inset-x-0 bottom-6 left-6 pr-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-1 block">{post.cat}</span>
                    <h4 className="text-base font-black uppercase tracking-tight text-white line-clamp-1">{post.title}</h4>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card Meta details (Aligned with standard layout) */}
              <div className="text-[10px] font-bold uppercase text-[#e03a2f] mb-4">{post.frontMeta}</div>
              <h4 className="text-xl font-bold uppercase leading-tight group-hover:text-[#e03a2f] transition-colors">{post.frontTitle}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 md:px-12 py-48 bg-[#131313] border-y border-[#1c1b1b] text-center">
        <motion.span 
          className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#e03a2f] mb-12 block cursor-pointer select-none origin-center w-max mx-auto"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
          whileHover={{ scale: 1.25 }}
        >
          Inquiry
        </motion.span>
        <div className="mb-16 max-w-4xl mx-auto select-none" style={{ position: 'relative', height: 'clamp(40px, 6vw, 90px)', width: '100%' }}>
          <TextPressure
            text="Ready to build the permanent?"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#f5f5f5"
            minFontSize={20}
          />
        </div>
        <div className="flex justify-center mt-12">
          <MagneticButton 
            to="/contact" 
            text="Start a Conversation" 
          />
        </div>
      </section>
    </div>
  );
}