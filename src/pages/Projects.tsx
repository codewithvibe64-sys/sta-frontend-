import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const detailsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const detailsItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

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

const GalleryCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden py-12 select-none">
      {/* Outer frame container */}
      <div className="relative w-full max-w-5xl mx-auto h-[320px] md:h-[580px] overflow-hidden flex items-center justify-center">
        {/* Carousel Track */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>
          {images.map((img, i) => {
            const offset = i - activeIndex;
            const isActive = i === activeIndex;

            // Offset-linked animations (Parallax shifting inside the frame)
            const x = offset * 110 + "%"; // Slide layout offset
            const imageParallaxX = offset * -25; // Parallax image offset (in percentage)
            const scale = isActive ? 1.0 : 0.9;
            const opacity = isActive ? 1.0 : 0.35;
            const zIndex = isActive ? 20 : 10;

            return (
              <motion.div
                key={i}
                className="absolute w-[85%] md:w-[75%] h-[90%] bg-[#0f0f0f] border border-[#1c1b1b] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] rounded-sm"
                style={{
                  transformOrigin: "center center",
                }}
                animate={{
                  x: x,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Parallax Image Container */}
                <motion.div
                  className="w-full h-full overflow-hidden"
                  animate={{
                    x: `${imageParallaxX}%`,
                    scale: isActive ? 1.05 : 1.15,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <img
                    src={img}
                    alt={`${title} visual documentation ${i + 1}`}
                    className="w-full h-full object-cover no-grayscale"
                    referrerPolicy="no-referrer"
                    style={{ filter: "none" }}
                  />
                </motion.div>
                
                {/* Subtle light/dark dynamic tint */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none transition-opacity duration-500 group-hover:bg-black/10" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls (Only render if there is more than 1 image) */}
      {images.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-12">
          <button
            onClick={handlePrev}
            className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted hover:text-foreground transition-colors"
            aria-label="Previous image"
          >
            <div className="w-10 h-px bg-border group-hover:bg-accent group-hover:w-16 transition-all duration-300"></div>
            Prev
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60 select-none">
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <button
            onClick={handleNext}
            className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-muted hover:text-foreground transition-colors"
            aria-label="Next image"
          >
            Next
            <div className="w-10 h-px bg-border group-hover:bg-accent group-hover:w-16 transition-all duration-300"></div>
          </button>
        </div>
      )}
    </div>
  );
};

function ProjectImage({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Diagonal scroll-linked parallax: starts at bottom-right (6% X, 6% Y) and ends at top-left (-6% X, -6% Y)
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-background">
      <motion.img
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
  );
}

function CaseStudyView({ project, onClose }: { project: Project; onClose: () => void }) {
  // Lock scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
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
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted/60 mb-8 text-center">Visual Documentation</h2>
          <GalleryCarousel images={project.gallery} title={project.title} />
        </section>

        <footer className="mt-40 px-6 md:px-12 py-24 border-t border-border text-center">
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-accent transition-colors"
          >
            Close Case Study
            <div className="w-12 h-px bg-border group-hover:bg-accent group-hover:w-20 transition-all duration-500"></div>
          </button>
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

      <div className="pt-6">
        <button
          onClick={onViewCaseStudy}
          className="bg-foreground text-background px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-400"
        >
          View Full Case Study
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const projects: Project[] = [
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
      img: "/images/portfolio2.jpg",
      reverse: true,
      gallery: [
        "/images/hero2.jpg",
        "/images/svc-renovation.jpeg"
      ]
    },
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
      img: "/images/featured.jpg",
      reverse: true,
      gallery: [
        "/images/hero4.jpg"
      ]
    },
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
  ];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const filters = ["All", "Architecture", "Interior", "Design Lab"];

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
              {filter === "All" ? "All Projects" : filter}
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
              <motion.h2 variants={detailsItemVariants} className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase group-hover:text-accent transition-colors duration-500 leading-none">{project.title}</motion.h2>
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
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="mt-64 px-6 md:px-12 py-48 bg-background border-y border-border text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-12 block">Inquiry</span>
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 max-w-4xl mx-auto uppercase leading-[0.9]">
          We specialize in challenging sites and radical material honesty.
        </h3>
        <button
          onClick={() => navigate("/contact")}
          className="group inline-flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-accent transition-colors"
        >
          START A CONVERSATION
          <div className="w-12 h-px bg-border group-hover:bg-accent group-hover:w-20 transition-all duration-500"></div>
        </button>
      </section>
    </div>
  );
}