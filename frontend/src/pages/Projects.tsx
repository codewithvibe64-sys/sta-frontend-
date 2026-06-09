import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { MagneticButton, RollingTextLink, StoneCarvedButton } from "../components/InteractiveButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealText from "../components/ScrollRevealText";

// Corner House Images
const cornerHouseHero = "/images/front_elevation.jpg";
const cornerHouseNight = "/images/night_view.jpg";
const cornerHouseCourt = "/images/court_2.jpg";
const cornerHouseLiving = "/images/living.jpg";
const cornerHouseDining = "/images/dining.jpg";
const cornerHouseStaircase = "/images/staircase.jpg";

// Delta's Masala Images
const masalaImg1 = "/images/IMG_20220907_201623.jpg";
const masalaImg2 = "/images/IMG_20220907_201935.jpg";
const masalaImg3 = "/images/IMG_20220907_202031.jpg";
const masalaImg4 = "/images/IMG_20220907_202051.jpg";
const masalaImg5 = "/images/IMG_20220907_203310.jpg";
const masalaImg6 = "/images/IMG_20220907_223614.jpg";
const masalaImg7 = "/images/IMG_20220907_223808.jpg";

gsap.registerPlugin(ScrollTrigger);

const detailsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
} as any;

const detailsItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
} as any;

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  context: string;
  problem: string;
  approach: string;
  execution: string;
  concept: string;
  solution: string;
  img: string;
  gallery: string[];
  reverse?: boolean;
}

function VisualDocumentationCluster({ 
  src, 
  alt, 
  index, 
  scrollContainerEl 
}: { 
  src: string; 
  alt: string; 
  index: number; 
  scrollContainerEl: HTMLDivElement;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRefForScroll = useRef<HTMLDivElement | null>(null);
  if (!containerRefForScroll.current) {
    containerRefForScroll.current = scrollContainerEl;
  }
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: containerRefForScroll,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;

  // Multi-layered parallax translation offsets (matching the owl cluster sample precisely):
  const yCluster = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yDots = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yCircle = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const yTriangle = useTransform(scrollYProgress, [0, 1], ["25%", "-5%"]);
  const rotateTriangle = useTransform(scrollYProgress, [0, 1], [-90, 40]);
  const yHexagon = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const rotateHexagon = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yCaption = useTransform(scrollYProgress, [0, 1], isEven ? ["0%", "100%"] : ["0%", "200%"]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ y: yCluster }}
      className="relative w-full max-w-[850px] h-[450px] sm:h-[580px] md:h-[680px] mx-auto mb-40 md:mb-56 overflow-visible"
    >
      {isEven ? (
        // Style 1: Great Horned Owl Layout
        <>
          {/* Backdrop Circle (Moves slow: yCircle) - Laptop and tablet view */}
          <motion.div
            style={{ y: yCircle }}
            className="absolute left-[5%] top-[10%] w-[clamp(200px,38vw,382px)] aspect-square rounded-full bg-accent/5 border border-accent/15 z-0 pointer-events-none hidden sm:block"
          />

          {/* Backdrop Hexagon (Moves & rotates: yHexagon, rotateHexagon) - Phone view */}
          <motion.svg
            style={{ y: yHexagon, rotate: rotateHexagon }}
            className="absolute left-[5%] top-[10%] w-[clamp(180px,38vw,300px)] aspect-square z-0 pointer-events-none text-accent/25 block sm:hidden"
            viewBox="0 0 382 382"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polygon points="191,10 346,100 346,282 191,372 36,282 36,100" />
          </motion.svg>

          {/* Dotted Grid SVG (Moves opposite way: yDots) */}
          <motion.svg
            style={{ y: yDots }}
            className="absolute left-[-5%] top-[15%] w-[clamp(150px,30vw,350px)] h-[clamp(150px,30vw,320px)] z-0 pointer-events-none text-accent/25 hidden sm:block"
            viewBox="0 0 494 434"
          >
            <pattern id={`dots-blue-${index}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#dots-blue-${index})`} />
          </motion.svg>

          {/* Main image card (Moves parallax: yImage) */}
          <motion.div
            style={{ y: yImage }}
            className="absolute right-[5%] top-[10%] w-[55%] max-w-[500px] aspect-[4/5] z-10 overflow-hidden bg-[#131313] border border-border/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
          >
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-full object-cover no-grayscale"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>

          {/* Floating Caption (Moves fast: yCaption) */}
          <motion.div
            style={{ y: yCaption }}
            className="absolute right-[5%] bottom-0 sm:bottom-[-5%] z-20 font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-accent uppercase text-right"
          >
            <span className="text-foreground/40 font-light">/{String(index + 1).padStart(2, "0")}</span> DETAIL VIEW
          </motion.div>
        </>
      ) : (
        // Style 2: Burrowing Owl Layout
        <>
          {/* Rotating Outline Triangle (Moves & Rotates: yTriangle, rotateTriangle) */}
          <motion.svg
            style={{ y: yTriangle, rotate: rotateTriangle }}
            className="absolute right-[5%] top-[5%] w-[clamp(200px,45vw,448px)] aspect-square z-0 pointer-events-none text-muted/20"
            viewBox="0 0 448 446"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polygon points="224,10 438,436 10,436" />
          </motion.svg>

          {/* Dotted Grid SVG (Moves opposite way: yDots) */}
          <motion.svg
            style={{ y: yDots }}
            className="absolute right-[-5%] bottom-[5%] w-[clamp(120px,25vw,280px)] h-[clamp(220px,45vw,500px)] z-0 pointer-events-none text-muted/15 hidden lg:block"
            viewBox="0 0 310 588"
          >
            <pattern id={`dots-white-${index}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#dots-white-${index})`} />
          </motion.svg>

          {/* Main image card (Moves parallax: yImage) */}
          <motion.div
            style={{ y: yImage }}
            className="absolute left-[5%] top-[10%] w-[55%] max-w-[500px] aspect-[4/5] z-10 overflow-hidden bg-[#131313] border border-border/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
          >
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-full object-cover no-grayscale"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>

          {/* Floating Caption (Moves fast: yCaption) */}
          <motion.div
            style={{ y: yCaption }}
            className="absolute left-[5%] bottom-0 sm:bottom-[-10%] z-20 font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-accent uppercase text-left"
          >
            <span className="text-foreground/40 font-light">/{String(index + 1).padStart(2, "0")}</span> DETAIL VIEW
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

function ProjectImage({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const trigger = containerRef.current;
    const wrapper = imgWrapperRef.current;
    const img = imgRef.current;
    if (!trigger || !wrapper || !img) return;

    // Premium ScrollTrigger clip-path curtain wipe reveal (sliding bottom-to-top)
    const ctx = gsap.context(() => {
      const isPast = trigger.getBoundingClientRect().top < window.innerHeight * 0.9;

      gsap.fromTo(
        wrapper,
        {
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: isPast ? undefined : {
            trigger: trigger,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image scales down from 1.3 to its base parallax starting scale (1.15)
      gsap.fromTo(
        img,
        {
          scale: 1.3,
        },
        {
          scale: 1.15,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: isPast ? undefined : {
            trigger: trigger,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Diagonal scroll-linked parallax: starts at bottom-right (6% X, 6% Y) and ends at top-left (-6% X, -6% Y)
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#0f0f0f]">
      <div
        ref={imgWrapperRef}
        className="w-full h-full relative overflow-hidden will-change-[clip-path]"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <motion.img
          ref={imgRef}
          src={src}
          alt={title}
          className="w-full h-full object-cover origin-center no-grayscale"
          referrerPolicy="no-referrer"
          style={{
            x,
            y,
            scale: 1.15, // base buffer scale to ensure no edge clipping
            filter: "none"
          }}
          whileHover={{ scale: 1.22 }}
          transition={{
            scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        />
      </div>
    </div>
  );
}

function CaseStudyView({ project, onClose }: { project: Project; onClose: () => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

  // Lock scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      ref={(el) => {
        if (el) {
          scrollContainerRef.current = el;
          if (!scrollContainer) {
            setScrollContainer(el);
          }
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background overflow-y-auto selection:bg-accent selection:text-background"
    >
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-[110] px-6 md:px-12 py-8 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border">
        <button
          onClick={onClose}
          className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>
        <button
          onClick={onClose}
          className="text-muted hover:text-accent transition-colors"
        >
          <X size={24} />
        </button>
      </header>

      <div className="pt-32 pb-24">
        {/* A. HERO IMAGE */}
        <motion.section 
          className="w-full aspect-[21/9] mb-24 overflow-hidden bg-background"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover no-grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.section>

        {/* B. PROJECT INFO */}
        <section className="px-6 md:px-12 mb-32">
          <motion.div 
            className="flex flex-col md:grid md:grid-cols-12 gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                }
              }
            }}
          >
            <motion.div 
              className="md:col-span-8"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Case Study {project.id}</span>
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-[0.9] uppercase text-foreground mb-12">
                {project.title}
              </h1>
            </motion.div>
            <motion.div 
              className="md:col-span-4 flex flex-col justify-end"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <div className="border-l border-border pl-8 space-y-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-muted/60">Location</span>
                  <span className="text-sm font-bold uppercase text-foreground">{project.location.split('|')[0]}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-muted/60">Year</span>
                  <span className="text-sm font-bold uppercase text-foreground">{project.year}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-muted/60">Category</span>
                  <span className="text-sm font-bold uppercase text-foreground">{project.category}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="px-6 md:px-12 mb-40">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                }
              }
            }}
          >
            <div className="space-y-24">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">01 / Context</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.context}
                </p>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">02 / The Problem</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.problem}
                </p>
              </motion.div>
            </div>
            <div className="space-y-24">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">03 / Concept & Approach</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.concept}
                </p>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">04 / The Solution</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.solution}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="px-6 md:px-12">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted/60 mb-16 text-center">Visual Documentation</h2>
          <div className="max-w-5xl mx-auto space-y-16">
            {scrollContainer && project.gallery && project.gallery.map((img, idx) => (
              <VisualDocumentationCluster 
                key={idx} 
                src={img} 
                alt={`${project.title} documentation ${idx + 1}`} 
                index={idx}
                scrollContainerEl={scrollContainer}
              />
            ))}
          </div>
        </section>

        <footer className="mt-40 px-6 md:px-12 py-24 border-t border-border text-center flex justify-center">
          <StoneCarvedButton onClick={onClose} text="Close Case Study" />
        </footer>
      </div>
    </motion.div>
  );
}

function ProjectDetails({ project, onViewCaseStudy }: { project: Project; onViewCaseStudy: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex gap-8 border-b border-border pb-2">
        {["overview", "technical"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative pb-2 ${activeTab === tab ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-[-1px] left-0 right-0 h-px bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[180px]">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          {activeTab === "overview" ? (
            <>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent mb-2">Context</h4>
                <p className="text-sm text-muted leading-relaxed">{project.context}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent mb-2">The Problem</h4>
                <p className="text-sm text-muted leading-relaxed">{project.problem}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent mb-2">Approach</h4>
                <p className="text-sm text-muted leading-relaxed">{project.approach}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent mb-2">Execution</h4>
                <p className="text-sm text-muted leading-relaxed">{project.execution}</p>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div className="pt-6 flex justify-start">
        <MagneticButton onClick={onViewCaseStudy} text="View Full Case Study" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Architecture");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to URL search parameter ?id=... to automatically open a project case study
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get("id");
    if (projectId) {
      const proj = projects.find(p => p.id === projectId);
      if (proj) {
        setSelectedProject(proj);
        setActiveFilter(proj.category);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const projects: Project[] = [
    /*
    {
      id: "08",
      title: "The Vela House",
      category: "Architecture",
      location: "Thanjavur, TN, India.",
      year: "2021",
      context: "A north-facing residential plot set between open agricultural land on the east and south, with a neighboring house to the west. The site is exposed to sun, wind, and open views towards the surrounding fields. Designed as a contemporary farmhouse that remains connected to its rural setting.",
      problem: "How to create a modern home that stays open to its surroundings, while managing heat, privacy, and maintaining a calm, usable living environment.",
      approach: "Developed as a horizontal built form to retain openness and visual continuity with the landscape. Openings are directed towards the east and south to capture light, air, and views. Central spaces are planned to anchor daily living, with orientation and setbacks used to control heat and ventilation.",
      execution: "A G+1 residence with five bedrooms, organized around a central living and pooja space facing the fields. Larger openings are placed towards open sides, while the west is buffered with reduced openings and landscape. The layout supports cross ventilation, natural light, and a balanced indoor-outdoor connection.",
      concept: "Developed as a horizontal built form to retain openness and visual continuity with the landscape. Openings are directed towards the east and south to capture light, air, and views. Central spaces are planned to anchor daily living, with orientation and setbacks used to control heat and ventilation.",
      solution: "A G+1 residence with five bedrooms, organized around a central living and pooja space facing the fields. Larger openings are placed towards open sides, while the west is buffered with reduced openings and landscape. The layout supports cross ventilation, natural light, and a balanced indoor-outdoor connection.",
      img: "/images/portfolio1.jpg",
      gallery: [
        "/images/hero1.jpg",
        "/images/svc-architecture.png"
      ]
    },
    */
    {
      id: "09",
      title: "The Delta’s Masala",
      category: "Interior",
      location: "Kumbakonam, TN, India.",
      year: "2022",
      context: "A compact 180 sq.ft retail space within a commercial setting, previously used as a bike shop. The plan is triangular, with two acute corners and one right angle, creating spatial constraints. The project required conversion into a masala and nuts store with clear display, storage, and customer movement.",
      problem: "How to organize a dense product range within a tight triangular layout, while managing budget, hygiene requirements, and maintaining a clean retail experience.",
      approach: "Designed as a structured display system using linear shelving adapted to the triangular geometry. Circulation, storage, and billing are planned without wasting corner spaces. Material, pattern, and form are used in a controlled way to create identity within budget constraints.",
      execution: "A compact interior integrating display, storage, and billing within a clear layout. Custom shelving maximizes product visibility while maintaining easy access and movement. Execution was handled with direct coordination, achieving a balanced result within cost and time limits.",
      concept: "Designed as a structured display system using linear shelving adapted to the triangular geometry. Circulation, storage, and billing are planned without wasting corner spaces. Material, pattern, and form are used in a controlled way to create identity within budget constraints.",
      solution: "A compact interior integrating display, storage, and billing within a clear layout. Custom shelving maximizes product visibility while maintaining easy access and movement. Execution was handled with direct coordination, achieving a balanced result within cost and time limits.",
      img: masalaImg1,
      reverse: true,
      gallery: [
        masalaImg2,
        masalaImg3,
        masalaImg4,
        masalaImg5,
        masalaImg6,
        masalaImg7
      ]
    },
    /*
    {
      id: "12",
      title: "Mahaveer Residence",
      category: "Interior",
      location: "Kilpauk, Chennai, TN, India.",
      year: "2023",
      context: "A budget-conscious residential interior within a formal apartment setting. The project focused on achieving a clean, functional layout with a refined visual finish. Design scope was limited to interiors, with execution handled by the contractor.",
      problem: "How to create a balanced and refined interior within budget, while maintaining clarity, usability, and a consistent finish across spaces.",
      approach: "Designed with a straightforward, functional layout using controlled materials and finishes. Emphasis was placed on clarity, proportion, and ease of use rather than experimentation. A focused design intervention was introduced in the pooja space to create a distinct identity.",
      execution: "A clean interior layout with practical material selection and controlled detailing. The pooja unit was developed using custom-cut tiles and marble to create a refined focal element. The overall design remained simple and effective, achieving a balanced outcome within constraints.",
      concept: "Designed with a straightforward, functional layout using controlled materials and finishes. Emphasis was placed on clarity, proportion, and ease of use rather than experimentation. A focused design intervention was introduced in the pooja space to create a distinct identity.",
      solution: "A clean interior layout with practical material selection and controlled detailing. The pooja unit was developed using custom-cut tiles and marble to create a refined focal element. The overall design remained simple and effective, achieving a balanced outcome within constraints.",
      img: "/images/svc-interior.png",
      gallery: [
        "/images/hero3.png"
      ]
    },
    */
    {
      id: "01",
      title: "Corner House",
      category: "Architecture",
      location: "Thiruthuraipoondi, Thiruvarur, TN, India.",
      year: "2019",
      context: "A budget-conscious residential interior within a formal apartment setting. The project focused on achieving a clean, functional layout with a refined visual finish. Design scope was limited to interiors, with execution handled by the contractor.",
      problem: "How to create a balanced and refined interior within budget, while maintaining clarity, usability, and a consistent finish across spaces.",
      approach: "Designed with a straightforward, functional layout using controlled materials and finishes. Emphasis was placed on clarity, proportion, and ease of use rather than experimentation. A focused design intervention was introduced in the pooja space to create a distinct identity.",
      execution: "A clean interior layout with practical material selection and controlled detailing. The pooja unit was developed using custom-cut tiles and marble to create a refined focal element. The overall design remained simple and effective, achieving a balanced outcome within constraints.",
      concept: "Designed with a straightforward, functional layout using controlled materials and finishes. Emphasis was placed on clarity, proportion, and ease of use rather than experimentation. A focused design intervention was introduced in the pooja space to create a distinct identity.",
      solution: "A clean interior layout with practical material selection and controlled detailing. The pooja unit was developed using custom-cut tiles and marble to create a refined focal element. The overall design remained simple and effective, achieving a balanced outcome within constraints.",
      img: cornerHouseHero,
      reverse: true,
      gallery: [
        cornerHouseNight,
        cornerHouseCourt,
        cornerHouseLiving,
        cornerHouseDining,
        cornerHouseStaircase
      ]
    },
    /*
    {
      id: "11",
      title: "Terra House",
      category: "Architecture",
      location: "Coimbatore, TN, India.",
      year: "2022",
      context: "A residential living space designed to connect indoor areas with natural light and surrounding greenery. The layout allows visual continuity between living, seating, and outdoor edge spaces. Designed for a calm, everyday living environment.",
      problem: "How to create an open and connected living space, while maintaining comfort, usability, and controlled light within the interior.",
      approach: "Designed as an open layout with minimal partitions to allow light and air to flow freely. Furniture and spatial elements are used to define zones without closing the space. The material palette is kept light and natural to enhance brightness and warmth.",
      execution: "A continuous living space with clear zones for seating, dining, and interaction. Large openings and controlled shading create patterned light and maintain comfort. The result is a balanced interior that feels open, calm, and connected to nature.",
      concept: "Designed as an open layout with minimal partitions to allow light and air to flow freely. Furniture and spatial elements are used to define zones without closing the space. The material palette is kept light and natural to enhance brightness and warmth.",
      solution: "A continuous living space with clear zones for seating, dining, and interaction. Large openings and controlled shading create patterned light and maintain comfort. The result is a balanced interior that feels open, calm, and connected to nature.",
      img: "/images/portfolio1.jpg",
      gallery: [
        "/images/hero1.jpg"
      ]
    },
    {
      id: "15",
      title: "Weekend Villa",
      category: "Architecture",
      location: "Mahabalipuram, TN, India.",
      year: "2024",
      context: "A serene getaway designed to blend with the coastal landscape.",
      problem: "Balancing the harsh coastal climate with comfortable indoor-outdoor living.",
      approach: "Utilization of deep overhangs and local materials.",
      execution: "Careful orientation to catch sea breezes while protecting from afternoon sun.",
      concept: "Creating a restorative environment that feels intimately connected to the site.",
      solution: "A relaxed, open-plan villa that offers both refuge and expansive views.",
      img: "/images/portfolio2.jpg",
      reverse: true,
      gallery: [
        "/images/hero2.jpg"
      ]
    },
    {
      id: "18",
      title: "GP residence",
      category: "Architecture",
      location: "Chennai, TN, India.",
      year: "2025",
      context: "Urban residential context focusing on modern living.",
      problem: "Maximizing space and natural light in a dense urban plot.",
      approach: "Vertical spatial organization and light wells.",
      execution: "Integration of smart home technologies and sustainable materials.",
      concept: "A quiet urban retreat.",
      solution: "A multi-level home that balances privacy with open, light-filled living areas.",
      img: "/images/svc-architecture.png",
      gallery: [
        "/images/hero3.png"
      ]
    },
    */
    /*
    {
      id: "13",
      title: "Commercial Office Space",
      category: "Interior",
      location: "Chennai, TN, India.",
      year: "2023",
      context: "Client: A1 Travels Pvt, Ltd. A corporate office needing a modern, efficient layout.",
      problem: "Creating a productive workspace that reflects the company's dynamic brand.",
      approach: "Open plan with designated quiet zones and collaborative spaces.",
      execution: "Use of ergonomic furniture, acoustic treatments, and branded color accents.",
      concept: "A workspace that fosters collaboration and focus.",
      solution: "A balanced office interior that enhances employee well-being and productivity.",
      img: "/images/svc-interior.png",
      reverse: true,
      gallery: [
        "/images/hero4.jpg"
      ]
    },
    {
      id: "11B",
      title: "Residential apartment Interior",
      category: "Interior",
      location: "Bangalore, Karnataka, India.",
      year: "2024",
      context: "A modern apartment requiring a tailored interior design.",
      problem: "Personalizing a standard apartment layout to fit the client's lifestyle.",
      approach: "Custom joinery and a curated material palette.",
      execution: "Detail-oriented craftsmanship and smart storage solutions.",
      concept: "Refined urban living.",
      solution: "A cohesive, elegant interior that maximizes space and functionality.",
      img: "/images/portfolio1.jpg",
      gallery: [
        "/images/hero1.jpg"
      ]
    },
    {
      id: "11C",
      title: "IT corridor",
      category: "Interior",
      location: "Chennai, TN, India.",
      year: "2026",
      context: "Client: Fynxt Corporation. A large-scale tech office environment.",
      problem: "Designing an inspiring and scalable workspace for a growing tech firm.",
      approach: "Flexible floor plans and tech-integrated collaborative areas.",
      execution: "Durable materials, advanced lighting systems, and biophilic design elements.",
      concept: "An innovative hub for technology and collaboration.",
      solution: "A state-of-the-art office interior designed for adaptability and future growth.",
      img: "/images/featured.jpg",
      reverse: true,
      gallery: [
        "/images/hero2.jpg"
      ]
    }
    */
  ];

  const filteredProjects = projects.filter(p => p.category === activeFilter);

  const filters = ["Architecture", "Interior", "Design Lab"];

  return (
    <div className="pt-40 pb-32 selection:bg-accent selection:text-background">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-32 relative min-h-[50vh] flex flex-col justify-center group/hero">
        {/* Background Image Behind the Text */}
        <div className="absolute inset-0 md:left-1/4 -z-10 opacity-30 pointer-events-none overflow-hidden">
          <motion.img
            src="/images/totem-kamen-lica.webp"
            alt="Totem Kamen Lica"
            className="w-full h-[120%] object-cover object-center grayscale brightness-75 transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover/hero:grayscale-0 group-hover/hero:brightness-100 group-hover/hero:scale-105"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)'
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1.0 }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter leading-[0.9] uppercase max-w-5xl text-foreground drop-shadow-2xl mix-blend-plus-lighter"
        >
          Defining the <br /><span className="text-accent drop-shadow-2xl">Silent Monolith.</span>
        </motion.h1>
        <motion.p 
          className="mt-12 text-muted text-xl max-w-2xl leading-relaxed font-medium drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Spaces shaped with restraint, structure, and intent. Built to feel grounded in use and material.<br/>
          Designed to remain, beyond time and trend.<br/>
          Simple. Practical. Timeless.
        </motion.p>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 md:px-12 mb-24">
        <div className="flex flex-wrap gap-x-12 gap-y-6 items-center">
          {filters.map((filter, idx) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
              className={`font-bold uppercase tracking-[0.4em] text-[10px] transition-all pb-2 border-b ${activeFilter === filter ? "text-accent border-accent" : "text-muted/60 border-transparent hover:text-foreground"
                }`}
            >
              {filter === "All" ? "All" : filter}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-6 md:px-12 space-y-48">
        {filteredProjects.map((project, i) => (
          <motion.article
            key={project.id}
            layout
            className="flex flex-col lg:grid lg:grid-cols-12 gap-12 group"
          >
            {/* Project Image Column with Dynamic Diagonal Scroll-Linked Parallax */}
            <div className={`lg:col-span-8 overflow-hidden aspect-[16/9] ${project.reverse ? 'lg:order-2' : ''}`}>
              <ProjectImage src={project.img} title={project.title} />
            </div>
            
            {/* Project Details Column with Staggered Slide-up Reveals */}
            <motion.div 
              className={`lg:col-span-4 flex flex-col justify-center ${project.reverse ? 'lg:order-1' : ''}`}
              variants={detailsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={detailsItemVariants} className="flex items-center gap-6 mb-8">
                <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">Project {project.id}</span>
                <div className="h-px flex-1 bg-border"></div>
              </motion.div>
              <motion.div variants={detailsItemVariants}>
                <ScrollRevealText
                  lines={[project.title]}
                  containerClassName="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase group-hover:text-accent transition-colors duration-500 leading-none"
                  start="top 90%"
                  duration={0.7}
                  ease="power3.out"
                />
              </motion.div>
              <motion.p variants={detailsItemVariants} className="text-muted/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">{project.location}</motion.p>
              <motion.div variants={detailsItemVariants}>
                <ProjectDetails project={project} onViewCaseStudy={() => setSelectedProject(project)} />
              </motion.div>
            </motion.div>
          </motion.article>
        ))}
      </section>

      {/* Full Case Study Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyView
            project={selectedProject}
            onClose={() => {
              setSelectedProject(null);
              navigate(location.pathname, { replace: true });
            }}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="mt-64 px-6 md:px-12 py-48 bg-background border-y border-border text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-12 block">Inquiry</span>
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 max-w-4xl mx-auto uppercase leading-[0.9]">
          We specialize in challenging sites and radical material honesty.
        </h3>
        <div className="flex justify-center mt-12">
          <MagneticButton to="/contact" text="START A CONVERSATION" />
        </div>
      </section>
    </div>
  );
}