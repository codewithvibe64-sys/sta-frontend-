import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronDown, Check, Phone, ArrowRight, MapPin } from "lucide-react";
import { servicesData } from "../services/servicesData";

// Decoupled portfolio project reference mapping for service pages
const projectList = [
  { id: "08", title: "The Vela House", location: "Thanjavur, TN", img: "/images/outside_1.jpg" },
  { id: "09", title: "The Delta’s Masala", location: "Thanjavur, TN", img: "/images/thanjavur_1.jpg" },
  { id: "03", title: "Mr. Mahaveer Residence", location: "Kilpauk, Chennai", img: "/images/mahaveer_1.png" },
  { id: "04", title: "Luxury Salon", location: "Thousand Lights, Chennai", img: "/images/salon_1.png" },
  { id: "05", title: "Corner House", location: "Sri Lanka", img: "/images/cube_house_2.png" },
  { id: "06", title: "Cube House", location: "Sri Lanka", img: "/images/cube_house_1.png" },
  { id: "07", title: "Kamath Residence", location: "Shimoga, Karnataka", img: "/images/kamath_1.png" },
  { id: "10", title: "Farm House", location: "Thanjavur, TN", img: "/images/farm_house_1.png" },
  { id: "11", title: "Terra House", location: "Trichy, TN", img: "/images/portfolio1.jpg" },
  { id: "12", title: "Weekend Villa", location: "Pondicherry", img: "/images/outside_9.jpg" },
  { id: "13", title: "GP residence", location: "Kumbakonam, TN", img: "/images/outside_13.jpg" },
  { id: "14", title: "Commercial Office Space", location: "Chennai", img: "/images/outside_11.jpg" },
  { id: "15", title: "Residential apartment Interior", location: "Bangalore", img: "/images/thanjavur_10.jpg" },
  { id: "16", title: "IT corridor", location: "Chennai", img: "/images/outside_12.jpg" },
];

const serviceHeroImages: Record<string, string> = {
  "residential-architecture": "/images/hero1.jpg",
  "luxury-villa-design": "/images/outside_1.jpg",
  "commercial-architecture": "/images/portfolio2.jpg",
  "interior-design": "/images/svc-interior.png",
  "landscape-design": "/images/farm_house_1.png",
  "renovation-remodeling": "/images/outside_6.jpg",
  "turnkey-construction": "/images/view_1.jpg"
};

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-black uppercase text-accent mb-4">Service Not Found</h1>
        <p className="text-muted mb-8 max-w-md">The service page you are looking for does not exist or has been relocated.</p>
        <Link to="/" className="border border-border hover:border-accent px-8 py-3 text-[10px] font-mono uppercase tracking-widest text-foreground transition-all duration-300">
          Return Home
        </Link>
      </div>
    );
  }

  // Get project details for featured projects
  const featuredProjects = projectList.filter(p => service.featuredProjectIds.includes(p.id));
  const heroImage = serviceHeroImages[service.id] || "/images/hero1.jpg";

  // Scroll to contact form trigger or external handler
  const handleCtaClick = () => {
    const contactSection = document.getElementById("service-cta");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/contact");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#0f0f0f] text-foreground selection:bg-accent selection:text-white pt-24">
      {/* React 19 Document Metadata Hoisting */}
      <title>{`${service.title} | Studio Tactile`}</title>
      <meta name="description" content={service.metaDescription} />
      <link rel="canonical" href={`https://stadesign.net/services/${service.id}`} />

      {/* 1. Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-border">
        {/* Background Image Parallax/Fade */}
        <div className="absolute inset-0 bg-[#0f0f0f]">
          <img
            src={heroImage}
            alt={service.title}
            className="w-full h-full object-cover opacity-35 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/40" />
          {/* Subtle cad style overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,7vw,5.5rem)] font-black tracking-tighter leading-[0.9] uppercase text-foreground mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.0 }}
            className="text-muted text-base md:text-xl max-w-3xl leading-relaxed mb-12 font-medium"
          >
            {service.tagline}
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onClick={handleCtaClick}
            className="group relative px-8 py-4 border border-accent text-accent font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white transition-all duration-500 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              {service.ctaText}
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </div>

        {/* CAD technical coordinate indicators */}
        <div className="absolute bottom-6 left-6 text-[8px] font-mono text-muted/30 hidden md:block">
          SYS_REF // SRV_{service.id.toUpperCase().replace(/-/g, "_")} // LAT_10.78 // LON_79.37
        </div>
        <div className="absolute bottom-6 right-6 text-[8px] font-mono text-muted/30 hidden md:block">
          SCALE: 1:50 // DETAIL_LVL: COMPREHENSIVE
        </div>
      </section>

      {/* 2. Service Overview Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 sticky top-32">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 block">01 / OVERVIEW</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground leading-none">
              The Architecture of Purpose.
            </h2>
            <div className="w-16 h-1 bg-accent mt-6"></div>
          </div>
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#555555]">What We Do</h3>
              <p className="text-muted leading-relaxed text-base font-medium">
                {service.overview.what}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#555555]">Who It Is For</h3>
              <p className="text-muted leading-relaxed text-base font-medium">
                {service.overview.who}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#555555]">Why You Need It</h3>
              <p className="text-muted leading-relaxed text-base font-medium">
                {service.overview.why}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Offer Section */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 block">02 / CORE CAPABILITIES</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
              Scope of Deliverables.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.offerings.map((offering, idx) => (
              <div 
                key={idx} 
                className="bg-[#0f0f0f] border border-border/80 hover:border-accent p-8 hover:translate-y-[-4px] transition-all duration-300 group flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <span className="text-[10px] font-mono text-accent block mb-4">OFFER // 0{idx + 1}</span>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-foreground mb-3 group-hover:text-accent transition-colors">
                    {offering.title}
                  </h3>
                </div>
                <p className="text-muted text-xs leading-relaxed font-light">
                  {offering.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-border">
        <div className="mb-16 md:flex md:justify-between md:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 block">03 / THE METHODOLOGY</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
              Design &amp; Build Lifecycle.
            </h2>
          </div>
          <div className="text-[9px] font-mono text-muted/40 uppercase mt-4 md:mt-0">
            CONTROLLED EXECUTION // SYSTEMATIC WORKFLOW
          </div>
        </div>

        {/* Workflow Timeline Grid */}
        <div className="relative border-l border-border md:border-l-0 md:grid md:grid-cols-3 lg:grid-cols-6 gap-6 pl-6 md:pl-0 pt-4">
          {/* horizontal timeline line for desktop */}
          <div className="absolute top-8 left-0 right-0 h-px bg-border hidden md:block" />
          
          {service.process.map((step, idx) => (
            <div key={idx} className="relative mb-12 md:mb-0 group">
              {/* marker dot */}
              <div className="absolute -left-[31px] md:left-4 top-1.5 md:top-6 w-3 h-3 bg-[#0f0f0f] border-2 border-accent rounded-full group-hover:bg-accent transition-colors z-10" />
              <div className="md:pt-12 md:px-4">
                <span className="text-[9px] font-mono text-accent block mb-2">{step.step} // PHASE</span>
                <h3 className="text-base font-bold uppercase tracking-tight text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-16 md:py-24 bg-[#0a0a0a] border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 block">04 / SELECTED PROOFS</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
                  Featured Case Studies.
                </h2>
              </div>
              <Link 
                to="/projects" 
                className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-accent mt-4 md:mt-0 hover:text-foreground transition-colors"
              >
                All Projects
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects?id=${project.id}`}
                  className="group relative aspect-[4/3] bg-background border border-border overflow-hidden block"
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[8px] font-mono text-accent uppercase tracking-widest block mb-2">CASE STUDY {project.id}</span>
                    <h3 className="text-lg font-black uppercase tracking-tighter text-foreground mb-1 group-hover:text-accent transition-colors leading-none">
                      {project.title}
                    </h3>
                    <p className="text-[10px] font-bold text-muted/60 uppercase tracking-widest">{project.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Why Choose Studio Tactile */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 sticky top-32">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 block">05 / ADVANTAGES</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
              Rigorous Quality Standards.
            </h2>
            <p className="text-muted mt-6 text-sm leading-relaxed max-w-md">
              We operate at the interface of design philosophy and structural reality, implementing controls that protect your investment.
            </p>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            {service.whyChooseUs.map((point, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-6 p-6 border border-border bg-[#0a0a0a]/50"
              >
                <div className="p-2 border border-accent text-accent">
                  <Check size={14} />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-muted/40 uppercase">STANDARD // 0{idx + 1}</span>
                  <p className="text-foreground text-sm font-medium leading-relaxed">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section (Local SEO Power) */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 block">06 / COMMON QUERIES</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
              Frequently Asked.
            </h2>
            <p className="text-muted mt-4 text-xs tracking-wider">
              TRANSPARENT ANSWERS ON PRICING, PROCESSES, AND LOGISTICS
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-border bg-[#0f0f0f] rounded-none overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-[#141414] transition-colors focus:outline-none"
                >
                  <span className="text-sm font-bold uppercase tracking-tight text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-accent transition-transform duration-300 flex-shrink-0 ${openFaqIndex === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-xs text-muted leading-relaxed border-t border-border/30 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Service Area Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-border">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4 block">07 / REGIONAL COVERAGE</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
            Serving Local Areas.
          </h2>
          <p className="text-muted mt-4 text-xs max-w-md mx-auto leading-relaxed">
            Our architectural practice serves premium sites across these major municipal divisions and neighborhood belts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 text-center">
          {service.serviceAreas.map((area, idx) => (
            <div 
              key={idx} 
              className="border border-border p-2 sm:p-4 bg-[#0a0a0a]/30 flex flex-col items-center justify-center gap-2 group hover:border-accent hover:bg-[#0f0f0f] transition-all"
            >
              <MapPin size={14} className="text-muted/40 group-hover:text-accent transition-colors" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
                {area}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Strong CTA Section */}
      <section id="service-cta" className="py-20 md:py-32 px-6 md:px-12 text-center bg-[#0a0a0a] relative overflow-hidden">
        {/* Decorative CAD crosshairs */}
        <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-muted/20 pointer-events-none" />
        <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-muted/20 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-muted/20 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-muted/20 pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <span className="text-[10px] font-mono text-accent tracking-[0.4em] uppercase block">
            READY TO COLLABORATE? // SCHEDULE AN INTERVIEW
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.95]">
            Let's build the permanent.
          </h2>
          <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed font-light">
            Book a detailed project consultation with Studio Tactile. We will assess your site layout, outline custom design ideas, and discuss structural feasibility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <a 
              href="tel:+919600221902" 
              className="w-full sm:w-auto px-8 py-4 border border-border hover:border-accent hover:bg-[#0f0f0f] text-foreground text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Phone size={12} className="text-accent" />
              Call +91 9600 22 1902
            </a>
            
            <a 
              href="https://wa.me/919600221902" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-8 py-4 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#c92d24] transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.835-4.86c1.62.962 3.21 1.462 4.905 1.464 5.409 0 9.809-4.385 9.813-9.78.002-2.614-1.011-5.074-2.853-6.918C16.867 2.063 14.421 1.05 11.999 1.05 6.586 1.05 2.184 5.435 2.18 10.83c0 1.777.472 3.51 1.365 5.027l-.993 3.628 3.734-.975z" />
              </svg>
              Chat on WhatsApp
            </a>

            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 border border-border hover:border-accent hover:bg-[#0f0f0f] text-foreground text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center transition-all cursor-pointer"
            >
              Open Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
