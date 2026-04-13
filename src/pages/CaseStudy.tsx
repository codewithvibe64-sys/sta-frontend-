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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG0QDLhGXXFEK_tSY4XwRAKYDHO2ECH2O1stbwsVkzxEi_HFtA_l1BmGmWxhNeRccFEdL5BrcM9wfGCqQaLSHLqNqcaPDSXfvv6SwbpOIRVyVVKtYkK65m29EZ_8A0HagiNGl3Ar2XOsYlN64L1le5W0m_UdLUHR-arROfVxsRTFWeO0kl94cyLfdhRxPyhSJHSqua19QycMJ8QTdPtLVKHH034XhAlvbpCASBXmpRSCIkey6Wr_4o3Sj3d7B7KZPSSZ1JzMv_Djs",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtRQW80Q4EhEjL2M8VM5W9F9cLquaBG127tCuAq9uDVTDO3t8PJ2jqq61qLQeQU0_6wX31oc86tIK9SuoZPUW4R2TKs4So1OGWpQ193GYnyk64VzchkzYi_z4u_yXj5PCuyhlxAVENPBitFkY_2Z78ZJVFPlA0lMON__O6ZbSPjylyXjvxD8P0i41G397vr9_SU6KijdyDYdIUD-LNkYaSpgYcX3I0p8aRDuWxuodK7XfDiFRJW3f1xg5wX4g6TS1VgOBH0BPJLHY",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBeaJxm2n3e6gRGBcqX6ruVOOsxawIk_L1ia4QlrzGbTE9lSPj5guTtlBzQQlzxFVrzjhLwjwIEWb5KS7fQPneRLeDnH2VRHRyYcKMYhS1Fw6XyfqJUSXcPolLlvLjZdDja2lCo5JsB7_xFDf208rLG5pq2oU1K38CfgqSaNWLqP_t7drpmSVD9kotZpcvjP_LwW7Z5NuIyURaCYHQPeWn1bmRO5GGM_F1u6l19ZHZuWRCx7D7CwfbDDvAGCiL2eFrLPNd3z9Oa3Dk"
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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV7B0-IPTTC5IspXaoI4tqgHWSdwur30aZuxWTpVmWi0H5ZHAjvsUZFTBdKiIt_uX2t7xlb6j3XuOAXqHeZqVdXzGzM9OLObq_BwedLdQvoQPRPGwXs0gt5Pz-CyrE1Ber_A6OKIOLMylb5y4TFGq-0UVbdGy1MChhW85Bb5FV9KNlR07azgf_yMFR1bvWL8ETUxez7j6blDbXTEmZXaSKpkRKXnNQe3OIr2wUuW89d2yOt_XBVByoI2esZc03d742jm6FYOjsBL4"
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
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk-uy2_Lsr4EgmaENfbR93rFMkngi_AcQAyXRkDxKtAJqbnUL__WIRLITPP3vHef5HPgUC68w9uEqrwsswqiaO_5fkt6-oRgYdghM3uU7M2wyGc4DXJMeyzOp4HQATLevvDZ2dU97tS-aiRymmxZlxL3DpAaO2zeFmHfBZtQwb5MlMujSABiXxZUnGdj4Avbwa1x-Hq6qpdhmg5FMwkKuW6nHyK6NcUWY-9ytQ34MFhM9fpaxPlTR9IBVGW0eck18g1Rob5U6fn5s"
    },
    {
      id: "04",
      title: "AI Concept: Monolith",
      category: "Design Lab",
      location: "Digital Space | 2025",
      context: "An experimental exploration of AI-generated architectural forms using Studio Tactile's design DNA.",
      problem: "Can machine intelligence replicate the 'Silent Monolith' philosophy without human intervention?",
      approach: "Algorithmic Brutalism. We trained a custom neural network on our archive of physical models and technical drawings. The AI was tasked with generating forms that prioritize mass, shadow, and structural honesty.",
      execution: "Neural Rendering. The resulting forms were rendered using advanced path-tracing algorithms to simulate the behavior of light on raw concrete and weathered steel. This project serves as a bridge between our physical practice and the future of computational design.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC36FwbRYgTEniAUkPtcUi2gBhSntQ4ZkOnzJ90jdOB7FEJbXfFj0BhtSzRXwg_kCy0xPSzG_69mAF6wpuldVa90IYkg48ct7t-IMGYxWzlxb-sWJMWG4oW1QsOWBOYaYAI2QTeobGas1iEW4qVHzsziYti7x1HEdA_dNBSs8qh1D0sxEylCm0vS1CqxjQmWBvnMnaeYCuMpG0idvngg3egIal3YynGiFj2GTRoNgokIiffxOY7iOPTpzSiyYz5MFIJNAa8spC1dgM"
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
