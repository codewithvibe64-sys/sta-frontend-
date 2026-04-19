import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CaseStudy() {
  const { id } = useParams();

  // Mock data for projects - in a real app this would come from a shared constants file or API
  const projects = [
    {
      id: "01",
      title: "The Obsidian Void",
      category: "Architecture",
      location: "Reykjavík, Iceland | 2023",
      context: "A private residential commission situated on the volcanic outskirts of the capital, facing extreme weather conditions.",
      problem: "How to create a sanctuary that feels open to the landscape while providing absolute thermal and psychological security.",
      approach: "Subterranean Integration. We carved the living spaces into the basalt bedrock, using the earth's natural thermal mass to regulate temperature. The exterior is clad in charred timber and black volcanic stone, allowing the structure to disappear into the landscape during the long winter nights.",
      execution: "Cast-in-place concrete with exposed aggregate. The interior features raw basalt floors and hand-applied plaster walls. Custom steel apertures frame specific views of the North Atlantic, acting as cinematic lenses for the changing light.",
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
      location: "Berlin, Germany | 2022",
      context: "Adaptive reuse of a decommissioned 1970s industrial pumping station into a tech-pioneer headquarters.",
      problem: "Converting a rigid, windowless shell into a vibrant, collaborative workspace without losing its brutalist soul.",
      approach: "Atrium Insertion. We cut a massive central void through the three-story concrete structure, allowing natural light to penetrate the core. This void serves as the social heart of the building, connected by a series of suspended steel walkways.",
      execution: "The original board-marked concrete was sandblasted and left exposed. New interventions are clearly defined by their material palette: cold-rolled steel, industrial glass, and recycled rubber flooring. The contrast between the heavy historical shell and the light modern inserts defines the spatial experience.",
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
      location: "Tokyo, Japan | 2024",
      context: "A public museum expansion focused on the intersection of light, movement, and static materials.",
      problem: "Designing a space that actively participates in the art display rather than serving as a passive container.",
      approach: "Light Well Modulation. We designed a series of motorized ceiling apertures that respond to the sun's position, constantly shifting the shadow patterns on the limestone walls. The space becomes a living sundial.",
      execution: "Honed limestone walls with recessed basalt accents. The floor is a continuous pour of polished concrete with local river stone aggregate. The precision of the mechanical light wells contrasts with the raw, earthy textures of the primary surfaces.",
      img: "/images/svc-interior.png",
      gallery: [
        "/images/hero3.png"
      ]
    },
    {
      id: "04",
      title: "AI Generative Pavilion",
      category: "Design Lab",
      location: "Virtual / Experimental | 2025",
      context: "An experimental exploration of AI-generated architectural forms using Studio Tactile's design DNA.",
      problem: "Can machine intelligence replicate the 'Silent Monolith' philosophy without human intervention?",
      approach: "Algorithmic Brutalism. We trained a custom neural network on our archive of physical models and technical drawings. The AI was tasked with generating forms that prioritize mass, shadow, and structural honesty.",
      execution: "Neural Rendering. The resulting forms were rendered using advanced path-tracing algorithms to simulate the behavior of light on raw concrete and weathered steel. This project serves as a bridge between our physical practice and the future of computational design.",
      img: "/images/featured.jpg",
      gallery: [
        "/images/hero4.jpg"
      ]
    }
  ];

  const project = projects.find(p => p.id === id) || projects[0];

  return (
    <div className="pt-32 pb-32 selection:bg-[#e03a2f] selection:text-white">
      <section className="px-6 md:px-12 mb-24">
        <Link to="/projects" className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] hover:text-[#f5f5f5] transition-colors mb-12">
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
        <div className="flex flex-col md:grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-6 block">{project.category} / Case Study {project.id}</span>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tighter leading-[0.9] uppercase mb-8">{project.title}</h1>
            <p className="text-[#888888] text-xl font-medium tracking-tight uppercase">{project.location}</p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="mb-32 px-6 md:px-12">
        <div className="aspect-[21/9] overflow-hidden bg-[#131313]">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-6 md:px-12 mb-40">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-12">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] mb-4">Context</h3>
              <p className="text-[#f5f5f5] leading-relaxed">{project.context}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] mb-4">The Problem</h3>
              <p className="text-[#f5f5f5] leading-relaxed">{project.problem}</p>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-24">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-8">The Approach</h3>
              <p className="text-2xl md:text-3xl font-bold tracking-tight leading-snug uppercase">{project.approach}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-8">Execution</h3>
              <p className="text-2xl md:text-3xl font-bold tracking-tight leading-snug uppercase">{project.execution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Placeholder */}
      {project.gallery && (
        <section className="px-6 md:px-12 mb-40 grid grid-cols-1 md:grid-cols-2 gap-12">
          {project.gallery.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden bg-[#131313]">
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>
          ))}
        </section>
      )}

      {/* Footer CTA */}
      <section className="px-6 md:px-12 py-32 border-t border-[#1c1b1b] text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-12 uppercase tracking-tighter">Next Project.</h2>
        <Link to="/projects" className="group inline-flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#e03a2f] transition-colors">
          View All Works
          <div className="w-12 h-px bg-[#444444] group-hover:bg-[#e03a2f] group-hover:w-20 transition-all duration-500"></div>
        </Link>
      </section>
    </div>
  );
}
