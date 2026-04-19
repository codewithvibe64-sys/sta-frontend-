import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        <section className="w-full aspect-[21/9] mb-24 overflow-hidden bg-background">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover no-grayscale"
            referrerPolicy="no-referrer"
          />
        </section>

        {/* B. PROJECT INFO */}
        <section className="px-6 md:px-12 mb-32">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Case Study {project.id}</span>
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-[0.9] uppercase text-foreground mb-12">
                {project.title}
              </h1>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
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
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40">
            <div className="space-y-24">
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">01 / Context</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.context}
                </p>
              </div>
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">02 / The Problem</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.problem}
                </p>
              </div>
            </div>
            <div className="space-y-24">
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">03 / Concept & Approach</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.concept}
                </p>
              </div>
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">04 / The Solution</h2>
                <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted/60 mb-16 text-center">Visual Documentation</h2>
          <div className="space-y-12">
            {project.gallery.map((img, i) => (
              <div key={i} className="w-full bg-background overflow-hidden">
                <img
                  src={img}
                  alt={`${project.title} documentation ${i + 1}`}
                  className="w-full h-auto no-grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
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
      id: "01",
      title: "The Obsidian Void",
      category: "Architecture",
      location: "Reykjavík, Iceland",
      year: "2023",
      context: "A private residential commission situated on the volcanic outskirts of the capital, facing extreme weather conditions.",
      problem: "How to create a sanctuary that feels open to the landscape while providing absolute thermal and psychological security.",
      approach: "Subterranean Integration",
      execution: "Cast-in-place Concrete",
      concept: "The design utilizes the natural thermal mass of the earth. By carving the living spaces into the basalt bedrock, we achieved a stable internal climate and a profound sense of grounding.",
      solution: "A monolithic concrete shell that emerges from the rock, featuring triple-glazed apertures that frame the aurora borealis while maintaining a R-value of 40.",
      img: "/images/portfolio1.jpg",
      gallery: [
        "/images/hero1.jpg",
        "/images/svc-architecture.png"
      ]
    },
    {
      id: "02",
      title: "Vanguard HQ",
      category: "Architecture",
      location: "Berlin, Germany",
      year: "2022",
      context: "Adaptive reuse of a decommissioned 1970s industrial pumping station into a tech-pioneer headquarters.",
      problem: "Converting a rigid, windowless shell into a vibrant, collaborative workspace without losing its brutalist soul.",
      approach: "Atrium Insertion",
      execution: "Steel & Glass Contrast",
      concept: "We introduced a central light-well that pierces through all four floors, bringing natural illumination to the core while preserving the heavy concrete perimeter.",
      solution: "A series of suspended glass meeting pods that float within the original industrial volume, creating a dialogue between the past and the future of work.",
      img: "/images/portfolio2.jpg",
      reverse: true,
      gallery: [
        "/images/hero2.jpg",
        "/images/svc-renovation.jpeg"
      ]
    },
    {
      id: "03",
      title: "Kinetic Atrium",
      category: "Interior",
      location: "Tokyo, Japan",
      year: "2024",
      context: "A public museum expansion focused on the intersection of light, movement, and static materials.",
      problem: "Designing a space that actively participates in the art display rather than serving as a passive container.",
      approach: "Light Well Modulation",
      execution: "Limestone & Basalt",
      concept: "The atrium uses a series of motorized limestone louvers that adjust based on the sun's position, creating a constantly shifting pattern of light and shadow.",
      solution: "A multi-sensory environment where the architecture itself becomes a kinetic sculpture, enhancing the visitor's perception of time and space.",
      img: "/images/svc-interior.png",
      gallery: [
        "/images/hero3.png"
      ]
    },
    {
      id: "04",
      title: "AI Generative Pavilion",
      category: "Design Lab",
      location: "Virtual / Experimental",
      year: "2025",
      context: "An exploration into algorithmic architecture where structural forms are co-created with Gemini Intelligence.",
      problem: "Bridging the gap between pure mathematical optimization and human emotional resonance in brutalist forms.",
      approach: "Neural Topology Optimization",
      execution: "3D Printed Graphene-Concrete",
      concept: "We trained a neural network on 20th-century brutalist masterpieces to generate new structural topologies that optimize for both load-bearing and aesthetic 'weight'.",
      solution: "The result is a pavilion that feels both ancient and alien—a complex web of graphene-reinforced concrete that pushes the limits of what is physically possible.",
      img: "/images/featured.jpg",
      gallery: [
        "/images/hero4.jpg"
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
          <img
            src="/images/totem-kamen-lica.webp"
            alt="Totem Kamen Lica"
            className="w-full h-[120%] object-cover object-center grayscale brightness-75 transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover/hero:grayscale-0 group-hover/hero:brightness-100 group-hover/hero:scale-105"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)'
            }}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter leading-[0.9] uppercase max-w-5xl text-foreground drop-shadow-2xl mix-blend-plus-lighter"
        >
          Defining the <br /><span className="text-accent drop-shadow-2xl">Silent</span> Monolith.
        </motion.h1>
        <p className="mt-12 text-muted text-xl max-w-2xl leading-relaxed font-medium drop-shadow-lg">
          Our portfolio is a testament to architectural permanence. We design spaces that command attention through restraint, precision, and structural honesty.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 md:px-12 mb-24">
        <div className="flex flex-wrap gap-x-12 gap-y-6 items-center">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-bold uppercase tracking-[0.4em] text-[10px] transition-all pb-2 border-b ${activeFilter === filter ? "text-accent border-accent" : "text-muted/60 border-transparent hover:text-foreground"
                }`}
            >
              {filter === "All" ? "All Projects" : filter}
            </button>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-6 md:px-12 space-y-48">
        {filteredProjects.map((project, i) => (
          <motion.article
            key={project.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
            className="flex flex-col lg:grid lg:grid-cols-12 gap-12 group"
          >
            <div className={`lg:col-span-8 relative overflow-hidden aspect-[16/9] bg-background ${project.reverse ? 'lg:order-2' : ''}`}>
              <img
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
                referrerPolicy="no-referrer"
                src={project.img}
              />
            </div>
            <div className={`lg:col-span-4 flex flex-col justify-center ${project.reverse ? 'lg:order-1' : ''}`}>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">Project {project.id}</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase group-hover:text-accent transition-colors duration-500 leading-none">{project.title}</h2>
              <p className="text-muted/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">{project.location}</p>
              <ProjectDetails project={project} onViewCaseStudy={() => setSelectedProject(project)} />
            </div>
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