import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Article {
  id: string;
  date: string;
  cat: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  img: string;
}

interface Award {
  year: string;
  title: string;
  description: string;
}

export default function Journal() {
  const [activeTab, setActiveTab] = useState<"Articles" | "Recognition">("Articles");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const articles: Article[] = [
    {
      id: "featured-1",
      date: "05.12.2024",
      cat: "Philosophy",
      title: "The Weight of Light: Sculpting Atmosphere with Void.",
      excerpt: "How can something as weightless as a photon define the physical gravity of a room? We explore the tension between concrete mass and the ephemeral nature of natural light.",
      content: "Light is the most fundamental material in architecture. It is the only element that can transform a static space into a dynamic experience. In this exploration, we delve into the technical and philosophical implications of using 'void' as a structural tool. By strategically placing openings and managing reflections, we can create a sense of 'weight' that rivals the most massive concrete walls. This article examines three case studies where light was used not just for visibility, but as a primary sculpting medium.\n\nThe interaction between shadow and surface creates a tactile quality that defines the user's perception of space. We discuss the use of aggregate textures to catch light and the importance of orientation in achieving cinematic results.",
      tags: ["Philosophy", "Materials"],
      img: "/images/Model_1.4.png"
    },
    {
      id: "1",
      date: "14.11.23",
      cat: "Architecture",
      title: "The Weight of Silence: Designing for the Quiet Life.",
      excerpt: "A study of silent spaces, acoustical mass, and structural stillness.",
      content: "Silent design is about removing the acoustic and visual pollution that dominates modern urban life. In this essay, we explore the integration of structural mass, natural thermal barriers, and sound-absorbing textures to design homes that act as permanent acoustic sanctuaries. True luxury is not just visual; it is the physical sensation of quietness.\n\nWe review key details on layout orientation, spatial sequence, and how selecting natural materials like stone and rough timber naturally dampens sound reverberation to create a serene daily environment.",
      tags: ["Architecture", "Materials"],
      img: "/images/10.png"
    },
    {
      id: "3",
      date: "02.11.23",
      cat: "Sustainability",
      title: "Thermal Mass as a Poetic Instrument.",
      excerpt: "Volume 05: Coming Soon. Autumn 2026.",
      content: "Thermal Mass as a Poetic Instrument is currently in production for Volume 05. Coming soon Autumn 2026.\n\nWe are exploring the passive thermal properties of stone, earth, and concrete structure, and how these performance layers can be expressed openly as structural poetry in modern building envelopes. Stay tuned for the full release.",
      tags: ["Sustainability", "Materials"],
      img: "/images/11.png"
    },
    {
      id: "2",
      date: "22.10.23",
      cat: "Practice",
      title: "Why We Abandoned the Curve.",
      excerpt: "Why we chose structural lines over curves. Coming soon Autumn 2026.",
      content: "For years, contemporary architecture has been obsessed with digital curves, complex geometries, and plastic form-making. At Studio Tactile, we made a conscious decision to return to the straight line. This essay details the structural logic, material honesty, and permanent stability of linear designs.\n\nWe discuss the architectural heritage of straight lines, the engineering complexities that curves introduce, and why the permanent is best recorded through structural grids that align with gravity, light, and construction efficiency.",
      tags: ["Practice", "Materials"],
      img: "/images/9.png"
    }
  ];

  const awards: Award[] = [
    { year: "2025", title: "Global Design Visionary", description: "Awarded for our innovative use of neural rendering in conceptual architecture." },
    { year: "2024", title: "Residential Excellence Award", description: "Recognized for 'The Obsidian House' in the High-End Housing category by ArchDesign Gold." },
    { year: "2024", title: "Top 50 Emerging Studios", description: "Selected as one of the leading new voices in cinematic architecture by Global Architecture Review." },
    { year: "2023", title: "Material Honesty Masterclass", description: "Featured in the Wall Street Journal for our radical departure from contemporary plastic trends." }
  ];

  const latestHighlight = awards[0];
  const filteredAwards = awards.filter(a => a.year === selectedYear);
  const years = ["2025", "2024", "2023"];

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="pt-40 pb-20 selection:bg-[#e03a2f] selection:text-white">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-40 relative min-h-[50vh] flex flex-col justify-center group/hero">
        {/* Background Image Behind the Text */}
        <div className="absolute inset-0 md:left-1/4 -z-10 opacity-25 pointer-events-none overflow-hidden">
          <img
            src="/images/IMG_20220907_201623.jpg"
            alt="Journal Background"
            className="w-full h-[120%] object-cover object-center" data-aos="zoom-in"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%, black 80%, transparent)'
            }}
          />
        </div>

        <div className="flex flex-col md:grid md:grid-cols-12 gap-12 items-end relative z-10">
          <div className="md:col-span-8">
            <span className="font-bold uppercase tracking-[0.4em] text-[10px] text-[#e03a2f] mb-8 block drop-shadow-md">The Journal — Vol. 04</span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter leading-[0.9] uppercase mb-12 drop-shadow-2xl mix-blend-plus-lighter"
            >
              Thoughts on <br /><span className="text-[#e03a2f] drop-shadow-2xl">Permanence.</span>
            </motion.h1>
            <p className="text-[#888888] text-xl leading-relaxed max-w-xl font-medium drop-shadow-lg backdrop-blur-sm bg-black/10 p-4 -ml-4 rounded-lg">
              Experiments, observations, and work in progress. Notes from design, site, and
upcoming sessions.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444]">
              <span
                onClick={() => setActiveTab("Articles")}
                className={`${activeTab === "Articles" ? "text-[#f5f5f5] border-b border-[#e03a2f]" : "hover:text-[#f5f5f5]"} cursor-pointer transition-colors`}
              >
                Articles
              </span>
              <span
                onClick={() => setActiveTab("Recognition")}
                className={`${activeTab === "Recognition" ? "text-[#f5f5f5] border-b border-[#e03a2f]" : "hover:text-[#f5f5f5]"} cursor-pointer transition-colors`}
              >
                Recognition
              </span>
            </div>
          </div>
        </div>
      </section>

      {activeTab === "Articles" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Featured Thought Piece */}
          <section className="px-6 md:px-12 mb-40">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-0 bg-[#131313] border border-[#1c1b1b]">
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover" data-aos="zoom-in"
                  referrerPolicy="no-referrer"
                  src={featuredArticle.img}
                />
              </div>
              <div className="lg:col-span-5 p-12 md:p-20 flex flex-col justify-center">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-12 h-px bg-[#e03a2f]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444]">{featuredArticle.cat}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-none uppercase tracking-tighter">{featuredArticle.title}</h2>
                <p className="text-[#888888] mb-12 leading-relaxed text-lg">
                  {featuredArticle.excerpt}
                </p>
                <button
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="group flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#e03a2f] transition-colors"
                >
                  Read Full Article
                  <div className="w-12 h-px bg-[#444444] group-hover:bg-[#e03a2f] group-hover:w-20 transition-all duration-500"></div>
                </button>
              </div>
            </div>
          </section>

          {/* Insights & Technicals Grid */}
          <section className="px-6 md:px-12 mb-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-16">
            {[
              { 
                img: "/images/10.png",
                frontMeta: "Architecture / 14.11.23",
                frontTitle: "The Weight of Silence: Designing for the Quiet Life.",
                backTag: "Sustainability",
                backTitle: "Coming Soon",
                backSub: "Autumn 2026",
                cat: "Architecture",
                title: "The Weight of Silence: Designing for the Quiet Life.",
                articleId: "1"
              },
              { 
                img: "/images/11.png",
                frontMeta: "Sustainability / 02.11.23",
                frontTitle: "Thermal Mass as a Poetic Instrument.",
                backTag: "Upcoming / Autumn 26",
                backTitle: "Volume 05: Coming Soon",
                backSub: "Autumn 2026",
                cat: "Sustainability",
                title: "Thermal Mass as a Poetic Instrument.",
                articleId: "3"
              },
              { 
                img: "/images/9.png",
                frontMeta: "Practice / 22.10.23",
                frontTitle: "Why We Abandoned the Curve.",
                backTag: "Practice",
                backTitle: "Coming Soon",
                backSub: "Why we chose structural lines over curves. Coming soon Autumn 2026.",
                cat: "Practice",
                title: "Why We Abandoned the Curve.",
                articleId: "2"
              }
            ].map((post, i) => {
              const handleCardClick = (e: React.MouseEvent) => {
                if (isMobile) {
                  if (flippedCard !== i) {
                    e.preventDefault();
                    setFlippedCard(i);
                  } else {
                    if (post.articleId) {
                      const articleObj = articles.find(a => a.id === post.articleId);
                      if (articleObj) {
                        setSelectedArticle(articleObj);
                      }
                    }
                  }
                } else {
                  if (post.articleId) {
                    const articleObj = articles.find(a => a.id === post.articleId);
                    if (articleObj) {
                      setSelectedArticle(articleObj);
                    }
                  }
                }
              };

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="group cursor-pointer select-none"
                  onClick={handleCardClick}
                >
                  {/* Interactive 3D Aspect Box */}
                  <motion.div 
                    initial="default"
                    whileHover={isMobile ? undefined : "hover"}
                    animate={isMobile && flippedCard === i ? "hover" : "default"}
                    className="relative aspect-[16/10] mb-10 overflow-visible"
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
                        className="w-full h-full object-cover"
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
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f]">{post.frontMeta.split(" / ")[0]}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444]">{post.frontMeta.split(" / ")[1]}</span>
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter leading-none group-hover:text-[#e03a2f] transition-colors">{post.frontTitle}</h3>
                  <div className="h-px w-full bg-[#1c1b1b] group-hover:bg-[#e03a2f] transition-all duration-500"></div>
                </motion.div>
              );
            })}
          </section>

          {/* Testimonials Section */}
          <section className="px-6 md:px-12 mb-40">
            <div className="max-w-5xl mx-auto">
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-12">Voices of Impact</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                <div>
                  <p className="text-2xl md:text-3xl font-black tracking-tighter leading-tight mb-8 uppercase">
                    "Their approach to material honesty is a radical departure from the plastic trends of today."
                  </p>
                  <cite className="not-italic flex items-center gap-4">
                    <div className="w-8 h-px bg-[#444444]"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">Marcus V., Design Critic</span>
                  </cite>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-black tracking-tighter leading-tight mb-8 uppercase">
                    "Tactile designs for the next century, not the next season."
                  </p>
                  <cite className="not-italic flex items-center gap-4">
                    <div className="w-8 h-px bg-[#444444]"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">Elena S., Urban Planner</span>
                  </cite>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {activeTab === "Recognition" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Recognition Section */}
          <section className="px-6 md:px-12 mb-40">
            <div className="flex items-end justify-between mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Recognition.</h2>
              <div className="hidden md:block w-1/3 h-px bg-[#1c1b1b]"></div>
            </div>

            {/* Latest Highlight */}
            <div className="mb-24 bg-[#131313] border border-[#e03a2f] p-12 md:p-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] mb-8 block">Latest Highlight</span>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">{latestHighlight.title}</h3>
                  <p className="text-[#888888] text-lg leading-relaxed">{latestHighlight.description}</p>
                </div>
                <span className="text-6xl md:text-8xl font-black text-[#1c1b1b] leading-none">{latestHighlight.year}</span>
              </div>
            </div>

            {/* Year Filter */}
            <div className="flex gap-8 mb-16 border-b border-[#1c1b1b] pb-4">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all ${selectedYear === year ? "text-[#e03a2f]" : "text-[#444444] hover:text-[#f5f5f5]"
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAwards.map((award, i) => (
                <div key={i} className="bg-[#131313] border border-[#1c1b1b] p-8 md:p-12 flex flex-col justify-between aspect-square">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444]">{award.year}</span>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 uppercase tracking-tighter leading-none">{award.title}</h4>
                    <p className="text-[#888888] text-xs md:text-sm leading-relaxed">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      )}

      {/* Newsletter */}
      <section className="px-6 md:px-12 py-48 bg-[#131313] border-y border-[#1c1b1b] text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-16 uppercase tracking-tighter leading-[0.9] max-w-4xl mx-auto">Curated insights delivered seasonally.</h2>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-end gap-12">
          <input
            className="flex-grow bg-transparent border-b border-[#1c1b1b] focus:border-[#e03a2f] focus:ring-0 text-[10px] font-bold uppercase tracking-[0.4em] py-6 transition-all placeholder:text-[#444444] w-full"
            placeholder="YOUR EMAIL ADDRESS"
            type="email"
          />
          <button className="bg-[#f5f5f5] text-[#0f0f0f] px-12 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#e03a2f] hover:text-[#f5f5f5] transition-all duration-400 w-full md:w-auto">Subscribe</button>
        </div>
      </section>

      {/* Article Detail View Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0f0f0f] overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col">
              <header className="fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md flex justify-between items-center px-6 md:px-12 py-8">
                <span className="text-xl font-bold tracking-tighter text-[#f5f5f5]">STUDIO TACTILE</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-[#f5f5f5] hover:text-[#e03a2f] transition-colors"
                >
                  <X size={24} />
                </button>
              </header>

              <main className="flex-grow pt-40 pb-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-12">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f]">{selectedArticle.cat}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444]">{selectedArticle.date}</span>
                  </div>
                  <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.1] tracking-tighter uppercase mb-12">
                    {selectedArticle.title}
                  </h1>

                  {/* Tags display if available in UI structure - using simple list */}
                  <div className="flex gap-4 mb-12">
                    {selectedArticle.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444] border border-[#1c1b1b] px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="aspect-[16/9] mb-16 overflow-hidden bg-[#131313]">
                    <img
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover no-grayscale"
                      referrerPolicy="no-referrer"
                      src={selectedArticle.img}
                    />
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-[#888888] text-xl leading-relaxed font-medium mb-12">
                      {selectedArticle.excerpt}
                    </p>
                    <div className="text-[#f5f5f5] text-lg leading-relaxed space-y-8 whitespace-pre-wrap">
                      {selectedArticle.content}
                    </div>
                  </div>
                </div>
              </main>

              <footer className="w-full border-t border-[#1c1b1b] bg-[#0f0f0f] px-12 py-20 text-center">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#e03a2f] hover:text-[#f5f5f5] transition-colors"
                >
                  Back to Journal
                </button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
