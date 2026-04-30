import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

// --- DATA ARRAYS ---
const stats = [
  { label: "Years of Practice", value: "8+" },
  { label: "Completed Projects", value: "22" },
  { label: "Active Sites", value: "8" },
];

const team = [
  {
    name: "R.Vijaykumar",
    role: "Architect - Execution Head",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAFbFB1StuuVOJ1oyNeNc4puBh0W8dz5K_W2jqu7B_FveINbmV3J5Wt05PBcWAX_x_0PTV6Z-VYK7NbjR8cYCqeuEOVEuARI_89xDiHxRs11ZCk1Y1GodehFvq9oE6falsjTYaSCt7n64OifxKw1YP9qYL5oTsQJJJ4ZAVIVVQBavYGFdLhzYdNdrX9YlARYWy5wXx11MmZmys25VhXq9TrkHENJ4WvrIk-xXtTLpoTfF4fWjUsMXqz6c21C3uzvDKvhzF_VqZtQ8",
  },
  {
    name: "B.Govindraj",
    role: "Architect - Design Head",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn2_p_gibyphYwD4zgIij4o43n2mHyONfWZ72VvevPXmxYAU6cMv0b5AF-6-rqAPaDBMZERe2tQcrQJOgxmOz1B0r-0sWSmz2XnJh1QaIUqaOWt21iU_-wHKEb7hH9U8s39eqiopyBxAOMVZg2ksFfnb3wdJg7LyXsb2heb6nbuJ5gVAavMoPHoowie4ggLLFMQKRK0IIwW4oqpu_zfWAbzmiP8r3tvy5-27pULyKnQmP61htgFjM1Ww7Uv_Geo6ADiJfWwGC5ulM",
  },
  {
    name: "M.Senthil velan",
    role: "Architect - Interior Team head",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuARQjfSrqlk_UDLoYYHcEyrYibTEpUasljsulecvGrubTJPO6ukkNiizesIyMyQPQnY3FaBUwNeILyFs6ttu9YuALGEapfWAE_r51tmVKiyHnLFf23imO3qLHmSin7iMgtzvim82yIYbvkcF71XvC9YyMjxP3JsigrVAEN0RGJx9z0iIu_bSqLnPpNYs9VsDHSOoAgNC4Kx_YbxCiLXTmJtfXQAzeqgZUlesPT1FsdpQlEqxXwxkNkHAGj9G3Z86-GgN-ssfvHwdFg",
  },
  {
    name: "Sowmiyaa",
    role: "Architect - Client Relationship management",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPK2GIbPlJryd6JqCM7ViIm03PloUWiKsHeXnQZ1cMybeRaBMu1XYU4hWP3BQAqH9zsfb4oG-Pl5lI65gb0sy4QaXVRwyU_gicbcNdft0h3dmgAai9PvHFROS5myTmvUbHvxxOsWAMcd5uA6UkECAro68A8GzhmR_nbWMT-BlfOLMcB4ZK6DocF3TkH8mdvC3FPzVOMhv15tx55E087foWvns2lSPhU0j2_mrR5w54UnzUYxgO5KdVs7a3FyFf0ENgteQYvifl7Eo",
  },
  {
    name: "Priyadharshini",
    role: "Architect",
    img: "/images/prabba.jpg",
  },
];

const clients = [
  "SRV HORIZON",
  "HAUS OF HORIZON",
  "SRV THAILA MAHAL",
  "AGAM FURNITURE",
  "AVANTAS CONSTRUCTION",
  "SR PROMOTORS",
];

const careers = [
  { 
    id: "snr-arch",
    title: "Senior Architect", 
    location: "London / Full-Time",
    description: "We are seeking a visionary Senior Architect to lead complex residential and cultural projects from concept to completion.",
    responsibilities: [
      "Lead design teams through all project phases.",
      "Manage client relationships and technical coordination.",
      "Oversee construction documentation and on-site quality control.",
      "Mentor junior staff and contribute to studio culture."
    ],
    requirements: [
      "8+ years of experience in high-end architecture.",
      "Proficiency in Revit, Rhino, and Adobe Creative Suite.",
      "Strong technical knowledge of materials and detailing.",
      "Excellent communication and leadership skills."
    ]
  },
  { 
    id: "vis-intern",
    title: "Visualizer & Intern", 
    location: "Remote / Seasonal",
    description: "Join our design lab to push the boundaries of architectural representation and neural rendering.",
    responsibilities: [
      "Produce high-end cinematic visualizations.",
      "Assist in conceptual modeling and material research.",
      "Contribute to the studio's digital publication efforts.",
      "Support the design team with 3D assets."
    ],
    requirements: [
      "Strong portfolio of architectural visualization.",
      "Experience with Unreal Engine, V-Ray, or similar tools.",
      "Currently enrolled in or recently graduated from an architecture program.",
      "A keen eye for light, texture, and composition."
    ]
  },
  { 
    id: "prj-mgr",
    title: "Project Manager", 
    location: "Zurich / Full-Time",
    description: "A technical role focused on the precise execution of our Swiss portfolio.",
    responsibilities: [
      "Coordinate with local authorities and contractors.",
      "Manage project timelines, budgets, and resources.",
      "Ensure adherence to local building codes and standards.",
      "Facilitate communication between the London studio and Zurich sites."
    ],
    requirements: [
      "5+ years of project management experience in Switzerland.",
      "Fluency in German and English.",
      "Deep understanding of Swiss construction laws (SIA).",
      "Highly organized with strong problem-solving abilities."
    ]
  },
];

const partners = [
  { name: "Promoters / Developers", partner: "Adisha Realty" },
  { name: "Material Suppliers", partner: "Ramco Cement / Kajaria Tiles" },
  { name: "Builders / Contractors", partner: "Sri Builders / RK Constructions" },
  { name: "Structural Engineering", partner: "S. Kumar Structural Consultants, Vertex Structures" },
];

// --- COMPONENT ---
export default function Studio() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(careers[0].id);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);

  const selectedJob = careers.find(j => j.id === selectedJobId) || careers[0];

  const handleJobClick = (id: string) => {
    setSelectedJobId(id);
    if (window.innerWidth < 768) {
      setIsMobileOverlayOpen(true);
    }
  };

  return (
    <main className="pt-24 md:pt-32 overflow-x-hidden selection:bg-accent selection:text-background">
      {/* 1. STUDIO OVERVIEW (What We Do + Philosophy) */}
      <section
        className="px-4 md:px-12 mb-24 md:mb-40 relative min-h-[50vh] flex flex-col justify-center group/hero"
        aria-labelledby="studio-hero-title"
      >
        <div className="absolute inset-0 md:left-1/4 -z-10 opacity-30 overflow-hidden pointer-events-none">
          <img 
            src="/images/view_2.jpg" 
            alt="Studio Background" 
            className="w-full h-[120%] object-cover object-center grayscale brightness-75 transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover/hero:grayscale-0 group-hover/hero:brightness-100 group-hover/hero:scale-105" 
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)' 
            }}
          />
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 relative z-10 w-full">
          <header className="col-span-12 md:col-span-8">
            <motion.h1
              id="studio-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12 break-words text-foreground drop-shadow-2xl mix-blend-plus-lighter"
            >
              Building the <br />
              <span className="text-accent drop-shadow-2xl">Permanent.</span>
            </motion.h1>
            <p className="text-base md:text-xl leading-relaxed text-muted max-w-2xl font-medium drop-shadow-lg backdrop-blur-sm bg-background/5 p-4 -ml-4 rounded-lg">
              Studio Tactile is a design practice focused on clarity, structure, and long-term use. We approach each project with defined planning and controlled execution. The aim is to create spaces that remain relevant beyond trends.
            </p>
          </header>

          <aside className="col-span-12 md:col-span-4 flex flex-col justify-end">
            <div className="border-l border-accent pl-6 md:pl-8 py-2">
              <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-accent mb-4">
                Philosophy
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted leading-relaxed">
                Architecture records how we live. We build for long-term use, not short-term effect.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-label="Studio statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-8 md:p-12 border-b md:border-b-0 md:border-r border-border ${
                index === stats.length - 1 ? "border-b-0 md:border-r-0" : ""
              }`}
            >
              <p className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
                {stat.value}
              </p>
              <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-muted/60 mt-4">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-labelledby="studio-team-title">
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <h2 id="studio-team-title" className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-foreground">The Practice.</h2>
          <div className="hidden md:block w-1/3 h-px bg-border"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-background"
            >
              <img 
                src={member.img} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 group-hover:rotate-3"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-xl font-bold tracking-tighter uppercase text-foreground">{member.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-labelledby="studio-clients-title">
        <div className="grid grid-cols-12 gap-12 mb-16">
          <div className="col-span-12 md:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8 block">Trust</span>
            <h2 id="studio-clients-title" className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">Selected Clients.</h2>
          </div>
        </div>
        
        <div className="space-y-12 overflow-hidden py-4">
          {/* Row 1: Moves from LEFT → RIGHT */}
          <div className="flex gap-16 animate-marquee-reverse whitespace-nowrap">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex gap-16 items-center">
                {clients.map((client, i) => (
                  <div key={i} className="flex items-center gap-12 group">
                    <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-muted group-hover:text-foreground transition-colors">{client}</span>
                    <div className="w-2 h-2 bg-border group-hover:bg-accent transition-colors"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2: Moves from RIGHT → LEFT */}
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex gap-16 items-center">
                {[...clients].reverse().map((client, i) => (
                  <div key={i} className="flex items-center gap-12 group">
                    <span className="text-xl md:text-3xl font-bold uppercase tracking-tight text-muted group-hover:text-foreground transition-colors">{client}</span>
                    <div className="w-2 h-2 bg-border group-hover:bg-accent transition-colors"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-12 mb-24 md:mb-40" aria-labelledby="studio-careers-title">
        <div className="bg-background border border-border p-8 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[120px]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 relative z-10">
            {/* Left Column: Job List */}
            <div className="md:col-span-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8 block">Careers</span>
              <h2 id="studio-careers-title" className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-12 leading-[0.9] text-foreground">Join the pursuit of permanence.</h2>
              
              <div className="space-y-8 mb-16">
                {careers.map((job) => (
                  <div 
                    key={job.id} 
                    onClick={() => handleJobClick(job.id)}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div>
                      <h3 className={`text-2xl font-bold uppercase tracking-tight transition-colors ${selectedJobId === job.id ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{job.title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted/60">{job.location}</p>
                    </div>
                    <div className={`h-px transition-all duration-500 ${selectedJobId === job.id ? 'w-20 bg-accent' : 'w-12 bg-border group-hover:bg-accent group-hover:w-20'}`}></div>
                  </div>
                ))}
              </div>
              
              <p className="text-muted text-sm max-w-md leading-relaxed">
                We are always looking for rigorous thinkers and technical masters.
              </p>
            </div>

            {/* Right Column: Job Details & Form (Desktop) */}
            <div className="hidden md:block md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedJobId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                  {/* Job Details */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground mb-2">{selectedJob.title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{selectedJob.location}</p>
                    </div>
                    <p className="text-muted leading-relaxed">{selectedJob.description}</p>
                    
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Responsibilities</h4>
                        <ul className="space-y-2">
                          {selectedJob.responsibilities.map((item, i) => (
                            <li key={i} className="text-xs text-muted flex gap-3">
                              <span className="text-accent">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Requirements</h4>
                        <ul className="space-y-2">
                          {selectedJob.requirements.map((item, i) => (
                            <li key={i} className="text-xs text-muted flex gap-3">
                              <span className="text-accent">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Application Form (Google Form Embed) */}
                  <div className="pt-12 border-t border-border">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground mb-8">Apply for this position</h4>
                    <div className="w-full bg-background border border-border overflow-hidden">
                      <iframe 
                        src="https://docs.google.com/forms/d/e/1FAIpQLSdw_Xf-X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X/viewform?embedded=true" 
                        width="100%" 
                        height="800" 
                        frameBorder="0" 
                        marginHeight={0} 
                        marginWidth={0}
                        className="grayscale invert brightness-90 contrast-125 theme-aware-iframe"
                        title="Application Form"
                      >
                        Loading…
                      </iframe>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Job Overlay */}
      <AnimatePresence>
        {isMobileOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background overflow-y-auto p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Job Details</span>
              <button onClick={() => setIsMobileOverlayOpen(false)} className="text-foreground hover:text-accent">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-12 pb-20">
              <div className="space-y-6">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-foreground leading-none">{selectedJob.title}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{selectedJob.location}</p>
                <p className="text-muted leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Responsibilities</h4>
                  <ul className="space-y-3">
                    {selectedJob.responsibilities.map((item, i) => (
                      <li key={i} className="text-xs text-muted flex gap-3">
                        <span className="text-accent">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground mb-4">Requirements</h4>
                  <ul className="space-y-3">
                    {selectedJob.requirements.map((item, i) => (
                      <li key={i} className="text-xs text-muted flex gap-3">
                        <span className="text-accent">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-12 border-t border-border">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground mb-8">Apply Now</h4>
                <div className="w-full bg-background border border-border overflow-hidden">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdw_Xf-X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X/viewform?embedded=true" 
                    width="100%" 
                    height="800" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}
                    className="grayscale invert brightness-90 contrast-125 theme-aware-iframe"
                    title="Application Form Mobile"
                  >
                    Loading…
                  </iframe>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        className="px-4 md:px-12 mb-24 md:mb-40"
        aria-labelledby="studio-collab-title"
      >
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60 mb-4">
              Network
            </span>
            <h2
              id="studio-collab-title"
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground"
            >
              Collaborations.
            </h2>
          </div>
          <div className="hidden md:block w-1/3 h-px bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {partners.map((collab) => (
            <article
              key={collab.name}
              className="border-l border-border pl-6 md:pl-8 py-4 hover:border-accent transition-colors group"
            >
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-muted/60 mb-2 group-hover:text-accent transition-colors">
                {collab.name}
              </span>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-foreground">
                {collab.partner}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
