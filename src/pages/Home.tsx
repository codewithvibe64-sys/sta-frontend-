import { motion, AnimatePresence, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
const featuredImg  = "/images/featured.jpg";
const portfolioImg1 = "/images/portfolio1.jpg";
const portfolioImg2 = "/images/portfolio2.jpg";

const heroSlides = [
  { src: heroImg1, label: "Dinesh Residence · Coimbatore" },
  { src: heroImg2, label: "Aiswarya Residence · Thanjavur" },
  { src: heroImg3, label: "A1 Travels Interior · Chennai" },
  { src: heroImg4, label: "A1 Travels Interior · Chennai" },
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-advance every 5 seconds (reset on slide change for perfect UX)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = (newIndex: number) => {
    if (newIndex === currentSlide) return;
    setCurrentSlide(newIndex);
  };

  return (
    <div className="bg-background selection:bg-[#e03a2f] selection:text-white">
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
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <div 
            className="relative w-full max-w-xl h-[360px] md:h-[500px] flex items-center justify-center" 
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
          className="relative z-10 max-w-6xl order-1 md:order-2"
        >
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter mb-8 md:mb-12 uppercase">
            Sculpting<br />
            <span className="text-[#e03a2f]">Silence.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-12">
            <p className="text-base md:text-lg text-[#888888] max-w-xl font-medium leading-relaxed">
              Architecture is the silent stage for human life. We sculpt light, air, and material to create permanent anchors in an ephemeral world.
            </p>
            <Link to="/projects" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#e03a2f] transition-colors duration-500">
              Explore Works
              <div className="w-12 h-[1px] bg-[#444444] group-hover:bg-[#e03a2f] group-hover:w-20 transition-all duration-500"></div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Thinking Blocks - Simplified */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-y border-[#1c1b1b]">
        <div className="p-12 md:p-24 bg-[#0f0f0f] border-r border-[#1c1b1b] flex flex-col justify-center min-h-[400px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] mb-8">Philosophy 01</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 uppercase leading-tight">Space over<br />size.</h2>
          <p className="text-[#888888] leading-relaxed max-w-xs text-sm">
            We focus on how a space feels and functions, not just how much area it covers.
          </p>
        </div>
        <div className="p-12 md:p-24 bg-[#0f0f0f] border-r border-[#1c1b1b] flex flex-col justify-center min-h-[400px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] mb-8">Philosophy 02</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 uppercase leading-tight">Clarity over<br />clutter.</h2>
          <p className="text-[#888888] leading-relaxed max-w-xs text-sm">
            We remove the unnecessary so the structure, light, and materials speak clearly.
          </p>
        </div>
        <div className="p-12 md:p-24 bg-[#0f0f0f] flex flex-col justify-center min-h-[400px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] mb-8">Philosophy 03</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 uppercase leading-tight">Performance over<br />appearance.</h2>
          <p className="text-[#888888] leading-relaxed max-w-xs text-sm">
           We design for durability, efficiency, and long-term use. Spaces are made to perform, not
just impress.
          </p>
        </div>
      </section>

      {/* Who We Are / Why Us */}
      <section className="px-6 md:px-12 py-24 md:py-32 flex flex-col lg:grid lg:grid-cols-12 gap-12 md:gap-24">
        <div className="lg:col-span-5 space-y-8 md:space-y-12">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e03a2f] mb-6">Manifesto</div>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.1] uppercase break-words">Who is Studio Tactile?</h3>
          </div>
          <p className="text-[#f5f5f5] text-xl leading-relaxed break-words font-bold">
            We design with clarity. We build with intent.<br />
            Every space is shaped by function, structure, and use. Nothing is added without purpose.<br />
            We detail and execute with the same precision.
          </p>
          <p className="text-[#888888] leading-relaxed break-words">
            We respond to the site, climate, and context. Not trends.<br />
            We focus on what lasts. Not what impresses for a moment.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 gap-12 md:gap-16">
          <div className="border-l-2 border-outline-variant/20 pl-8 pb-8 hover:border-[#e03a2f] transition-colors duration-500">
            <div className="text-[10px] font-bold uppercase text-[#888888] mb-2 tracking-widest">01. Planning</div>
            <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Precise Planning.</h4>
            <p className="text-sm text-[#888888] leading-relaxed break-words">Zoning and flow are defined by how spaces are used. Decisions are based on function, not visual preference.</p>
          </div>
          <div className="border-l-2 border-outline-variant/20 pl-8 pb-8 hover:border-[#e03a2f] transition-colors duration-500">
            <div className="text-[10px] font-bold uppercase text-[#888888] mb-2 tracking-widest">02. Execution</div>
            <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Material Clarity.</h4>
            <p className="text-sm text-[#888888] leading-relaxed break-words">Materials are used as they are. Structure is expressed, not concealed.</p>
          </div>
          <div className="border-l-2 border-outline-variant/20 pl-8 pb-8 hover:border-[#e03a2f] transition-colors duration-500">
            <div className="text-[10px] font-bold uppercase text-[#888888] mb-2 tracking-widest">03. Context</div>
            <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Site Response.</h4>
            <p className="text-sm text-[#888888] leading-relaxed break-words">Design aligns with climate, light, and orientation. Spaces are positioned for comfort and long-term use.</p>
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
          <div className="md:col-span-4 p-8 md:p-16 flex flex-col justify-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e03a2f] mb-4">Featured Work</div>
            <h2 className="text-4xl font-bold mb-8 tracking-tighter uppercase">The Obsidian Void</h2>
            <p className="text-[#888888] mb-12 leading-relaxed">
              A private residence carved into the basalt cliffs of the coast. A study in total darkness and strategic punctures of light.
            </p>
            <Link to="/projects" className="self-start border-b border-[#f5f5f5] pb-2 text-[10px] font-bold tracking-widest uppercase hover:text-[#e03a2f] hover:border-[#e03a2f] transition-all">
              View Project Details
            </Link>
          </div>
        </div>
      </section>

      {/* Services: Bento Grid */}
      <section className="px-6 md:px-12 py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase">Scope of Craft</h2>
          <div className="text-[#888888] max-w-sm md:text-right font-medium">We manage the entire process. From first decision to final execution.</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { title: "Architecture", desc: "Spaces defined by structure, proportion, and use.", img: svcArchitecture },
            { title: "Interior", desc: "Designed for daily use, comfort, and clarity.", img: svcInterior },
            { title: "Renovation", desc: "Existing spaces reworked with purpose and precision.", img: svcRenovation },
            { title: "Turnkey", desc: "Complete execution from planning to handover.", img: svcTurnkey },
            { title: "Vastu", desc: "Spatial alignment based on logic, balance, and use.", img: svcVastu },
            { title: "Design Strategy", desc: "Early decisions that shape the entire outcome.", img: svcDesign },
          ].map((service, i) => (
            <div key={i} className="relative aspect-square overflow-hidden flex flex-col justify-end group cursor-default">
              {/* Background image — zoom & color reveal on scroll, premium hover interaction */}
              <motion.img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.15, filter: "grayscale(100%) brightness(0.7)" }}
                whileInView={{ 
                  scale: 1.0, 
                  filter: "grayscale(0%) brightness(0.9)",
                }}
                whileHover={{ scale: 1.05, filter: "grayscale(0%) brightness(1.0)" }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 1.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.08,
                }}
              />
              {/* Dark overlay — subtle interaction */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-700" />
              {/* Bottom gradient for text readability always */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              {/* Text content */}
              <div className="relative z-10 p-10">
                <h3 className="text-2xl font-bold mb-2 uppercase text-white transition-colors">{service.title}</h3>
                <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process (Design Strategy) */}
      <section className="bg-surface-container-lowest px-6 md:px-12 py-32 border-y border-[#1c1b1b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-4 block">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest">Design Strategy</h2>
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
                    <h3 className="font-bold uppercase text-base tracking-widest text-[#f5f5f5] mb-2 group-hover/step:text-[#e03a2f] transition-colors duration-500">
                      {step.title}
                    </h3>
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
          <Link to="/projects" className="group relative aspect-video overflow-hidden bg-[#131313]">
            <motion.img
              src={portfolioImg1}
              alt="Aiswarya Residence"
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
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Aiswarya Residence</span>
            </div>
          </Link>
          <Link to="/projects" className="group relative aspect-video overflow-hidden bg-[#131313]">
            <motion.img
              src={portfolioImg2}
              alt="Delta Masala Interior"
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
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Delta Masala Interior</span>
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
            { date: "14.11.23", cat: "Architecture", title: "The Weight of Silence: Designing for the Quiet Life.", img: "/images/10.png" },
            { date: "02.11.23", cat: "Sustainability", title: "Thermal Mass as a Poetic Instrument.", img: "/images/11.png" },
            { date: "22.10.23", cat: "Practice", title: "Why We Abandoned the Curve.", img: "/images/9.png" },
          ].map((post, i) => (
            <Link to="/journal" key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-low mb-8 overflow-hidden">
                <motion.img
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  src={post.img}
                  initial={{ scale: 1.15, filter: "grayscale(100%) brightness(0.8)" }}
                  whileInView={{ 
                    scale: 1.0, 
                    filter: "grayscale(0%) brightness(1)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 1.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.1,
                  }}
                />
              </div>
              <div className="text-[10px] font-bold uppercase text-[#e03a2f] mb-4">{post.cat} / {post.date}</div>
              <h4 className="text-xl font-bold uppercase leading-tight group-hover:text-[#e03a2f] transition-colors">{post.title}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 md:px-12 py-48 bg-[#131313] border-y border-[#1c1b1b] text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#e03a2f] mb-12 block">Inquiry</span>
        <h2 className="text-4xl md:text-6xl font-black mb-16 uppercase tracking-tighter leading-[0.9] max-w-4xl mx-auto">Ready to build the permanent?</h2>
        <Link to="/contact" className="bg-[#f5f5f5] text-[#0f0f0f] px-16 py-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#e03a2f] hover:text-[#f5f5f5] transition-all duration-400 inline-block">Start a Conversation</Link>
      </section>
    </div>
  );
}