import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-background selection:bg-[#e03a2f] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-end px-6 md:px-12 pb-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeOut" }}
            alt="Minimalist concrete architecture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtRQW80Q4EhEjL2M8VM5W9F9cLquaBG127tCuAq9uDVTDO3t8PJ2jqq61qLQeQU0_6wX31oc86tIK9SuoZPUW4R2TKs4So1OGWpQ193GYnyk64VzchkzYi_z4u_yXj5PCuyhlxAVENPBitFkY_2Z78ZJVFPlA0lMON__O6ZbSPjylyXjvxD8P0i41G397vr9_SU6KijdyDYdIUD-LNkYaSpgYcX3I0p8aRDuWxuodK7XfDiFRJW3f1xg5wX4g6TS1VgOBH0BPJLHY"
          /> */}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
          className="relative z-10 max-w-6xl"
        >
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter mb-12 uppercase">
            Sculpting<br />
            <span className="text-[#e03a2f]">Silence.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-12">
            <p className="text-lg text-[#888888] max-w-xl font-medium leading-relaxed">
              Architecture is the silent stage for human life. We sculpt light, air, and material to create permanent anchors in an ephemeral world.
            </p>
            <Link to="/portfolio" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#e03a2f] transition-colors duration-500">
              Explore Works
              <div className="w-12 h-[1px] bg-[#444444] group-hover:bg-[#e03a2f] group-hover:w-20 transition-all duration-500"></div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Thinking Blocks - Simplified */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-y border-[#1c1b1b]">
        <div className="p-12 md:p-24 bg-[#0f0f0f] border-r border-[#1c1b1b] flex flex-col justify-center min-h-[400px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] mb-8">Philosophy 01</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 uppercase leading-tight">Volume over<br />Square Footage.</h2>
          <p className="text-[#888888] leading-relaxed max-w-xs text-sm">
            True luxury is the quality of volume, the choreography of light, and the honesty of materials.
          </p>
        </div>
        <div className="p-12 md:p-24 bg-[#0f0f0f] flex flex-col justify-center min-h-[400px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#444444] mb-8">Philosophy 02</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 uppercase leading-tight">Structure as<br />Decoration.</h2>
          <p className="text-[#888888] leading-relaxed max-w-xs text-sm">
            We strip away the unnecessary to reveal the essential structure of your daily experience.
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
          <p className="text-[#f5f5f5] text-xl leading-relaxed break-words">
            We are a practice of cinematic brutalism. We view architecture as a physical manifestation of thought—permanent, heavy, and undeniably present.
          </p>
          <p className="text-[#888888] leading-relaxed break-words">
            Founded on the belief that a building should feel as though it grew from its site, rather than being placed upon it. We balance technical precision with emotional resonance.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-1 gap-12 md:gap-16">
          <div className="border-l-2 border-outline-variant/20 pl-8 pb-8 hover:border-[#e03a2f] transition-colors duration-500">
            <div className="text-[10px] font-bold uppercase text-[#888888] mb-2 tracking-widest">01. Planning</div>
            <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Mathematical Rigor</h4>
            <p className="text-sm text-[#888888] leading-relaxed break-words">Zoning and flow dictated by behavioral patterns, not just aesthetic trends.</p>
          </div>
          <div className="border-l-2 border-outline-variant/20 pl-8 pb-8 hover:border-[#e03a2f] transition-colors duration-500">
            <div className="text-[10px] font-bold uppercase text-[#888888] mb-2 tracking-widest">02. Execution</div>
            <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Material Honesty</h4>
            <p className="text-sm text-[#888888] leading-relaxed break-words">Concrete, steel, and timber used in their rawest forms to celebrate their structural truth.</p>
          </div>
          <div className="border-l-2 border-outline-variant/20 pl-8 pb-8 hover:border-[#e03a2f] transition-colors duration-500">
            <div className="text-[10px] font-bold uppercase text-[#888888] mb-2 tracking-widest">03. Context</div>
            <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">Environmental Context</h4>
            <p className="text-sm text-[#888888] leading-relaxed break-words">Design that breathes with the landscape, utilizing passive cooling and solar orientation.</p>
          </div>
        </div>
      </section>

      {/* Featured Project: The Obsidian Void */}
      <section className="bg-surface-container-lowest">
        <div className="flex flex-col md:grid md:grid-cols-12 min-h-[800px]">
          <div className="md:col-span-8 overflow-hidden h-[500px] md:h-auto">
            <img
              alt="Monolithic black modern house with large glass windows reflecting a dramatic mountain landscape at twilight"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxmnWwgs8U8jZK8O6HfU25j-M6y0bPdfLcU05MNEm5JM258kBqOqv9E9LqDWMExzgf9k_7ngNrk7pnw_ZuFjiYJWQX4rZkOsPuOI4w9vEZ04zTG4TjOIXVqg1vf_WnhQe0-mXz43NhkHZb7V91v2Ab54rJj_kq1aZEYYf6mbjXXwrT30EzzC4XCB8Pw72Lb3oY2AX-BII9-cvfzq3nm00t3T7j8nnDynmmbASXIltIGzxPy1nnFUNQ0oLFBdRZagW1NzKjR5_L_OQ"
            />
          </div>
          <div className="md:col-span-4 p-8 md:p-16 flex flex-col justify-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#e03a2f] mb-4">Featured Work</div>
            <h2 className="text-4xl font-bold mb-8 tracking-tighter uppercase">The Obsidian Void</h2>
            <p className="text-[#888888] mb-12 leading-relaxed">
              A private residence carved into the basalt cliffs of the coast. A study in total darkness and strategic punctures of light.
            </p>
            <button className="self-start border-b border-[#f5f5f5] pb-2 text-[10px] font-bold tracking-widest uppercase hover:text-[#e03a2f] hover:border-[#e03a2f] transition-all">
              View Project Details
            </button>
          </div>
        </div>
      </section>

      {/* Services: Bento Grid */}
      <section className="px-6 md:px-12 py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase">Scope of Craft</h2>
          <div className="text-[#888888] max-w-sm md:text-right font-medium">From initial strategy to the final grain of timber—we control the entire narrative of the build.</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { title: "Architecture", desc: "Structural foundations and spatial volume." },
            { title: "Interior", desc: "Human-scale environments and bespoke textures." },
            { title: "Renovation", desc: "Restructuring the legacy of existing bones." },
            { title: "Turnkey", desc: "Total project management from site to keys." },
            { title: "Vastu", desc: "Ancient geometry met with modern utility." },
            { title: "Design Strategy", desc: "Visionary consulting for developers and estates." },
          ].map((service, i) => (
            <div key={i} className="bg-surface-container-low p-12 aspect-square flex flex-col justify-end group hover:bg-[#e03a2f] transition-colors duration-500 cursor-default">
              <div>
                <h3 className="text-2xl font-bold mb-2 uppercase group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-sm text-[#888888] group-hover:text-white/80 transition-colors">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface-container-lowest px-12 py-32 border-y border-[#1c1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-black uppercase tracking-widest mb-24">The Lifecycle of a Thought</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { num: "01", title: "Consult", desc: "Defining needs, site analysis, and feasibility studies." },
              { num: "02", title: "Design", desc: "Conceptual philosophy, precision 3D modeling and material specification." },
              { num: "03", title: "Execute", desc: "On-site management and technical coordination." },
              { num: "04", title: "Handover", desc: "Final refinement and the keys to your new reality." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-[4rem] font-extrabold text-[#1c1b1b] mb-4">{step.num}</div>
                <h5 className="font-bold uppercase text-xs tracking-widest mb-4">{step.title}</h5>
                <p className="text-xs text-[#888888]">{step.desc}</p>
              </div>
            ))}
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
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV7B0-IPTTC5IspXaoI4tqgHWSdwur30aZuxWTpVmWi0H5ZHAjvsUZFTBdKiIt_uX2t7xlb6j3XuOAXqHeZqVdXzGzM9OLObq_BwedLdQvoQPRPGwXs0gt5Pz-CyrE1Ber_A6OKIOLMylb5y4TFGq-0UVbdGy1MChhW85Bb5FV9KNlR07azgf_yMFR1bvWL8ETUxez7j6blDbXTEmZXaSKpkRKXnNQe3OIr2wUuW89d2yOt_XBVByoI2esZc03d742jm6FYOjsBL4" alt="Vanguard HQ" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Vanguard HQ</span>
            </div>
          </Link>
          <Link to="/projects" className="group relative aspect-video overflow-hidden bg-[#131313]">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk-uy2_Lsr4EgmaENfbR93rFMkngi_AcQAyXRkDxKtAJqbnUL__WIRLITPP3vHef5HPgUC68w9uEqrwsswqiaO_5fkt6-oRgYdghM3uU7M2wyGc4DXJMeyzOp4HQATLevvDZ2dU97tS-aiRymmxZlxL3DpAaO2zeFmHfBZtQwb5MlMujSABiXxZUnGdj4Avbwa1x-Hq6qpdhmg5FMwkKuW6nHyK6NcUWY-9ytQ34MFhM9fpaxPlTR9IBVGW0eck18g1Rob5U6fn5s" alt="Kinetic Atrium" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Kinetic Atrium</span>
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
          <h2 className="text-4xl font-extrabold tracking-tight uppercase">The Journal</h2>
          <Link to="/journal" className="text-[10px] font-bold uppercase tracking-widest border-b border-[#f5f5f5] pb-1 hover:text-[#e03a2f] hover:border-[#e03a2f] transition-all">Read All Essays</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { date: "14.11.23", cat: "Architecture", title: "The Weight of Silence: Designing for the Quiet Life.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOCTfAmwrT1V7TrBK7COosFlDKc2wx_x4Af9maNHsTgSgQO8uCpujvYtjedg41otclZurGMjot_DWodA2jgAFRswLNLxFQtz7JGJawylo0PITgGiRLOJRgak7oh0mJRbTTCwAS-PKT27m3V6z1wo8UWsotcZEzV8nwq6l8deXnUayGrYhrJviJ04B1PlUdvrNPGVtpwcJGPoLj74rdG96TSzgRx3N06_LukvzWgtP5RQVbGQtXXEj9_JFOEztWxhnSGRiAZtL_Bn4" },
            { date: "02.11.23", cat: "Sustainability", title: "Thermal Mass as a Poetic Instrument.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp6m9hClFQgSkwsrlchyN6E7nUeV4P1DCPychyamEmEmAG53WJBAQVhgCPSfoa6h0srTWoOY_1fWVOGr4nrt7gX0Nc0WbJ4YhLA7PTp05asHkk2EcaeOU090XeY2Em3MicnLI0641_ijeLspKw3IXjzR8Cp-EDeyByT8gHjBTKVtPJm4WQwsuq45W1l_9OL2uSAFn9ZzQuPbPV2JC7-rANMysv7IZ0BuwXPd0G0QDzouysRE_t-mOcgc2vE3zeHrBRpy6ccG4BPUw" },
            { date: "22.10.23", cat: "Practice", title: "Why We Abandoned the Curve.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSEdM7n12H2yYARZSVYrpCYG0DPjps2tGgyOdsQ5uAyWC070QsxvhEfATiA9udGZmDHPjGNzfCmasiIUvBic1J6qu58i7pFmu-HRD1DAAGKDwwhVRa3kMic7Fv74Cs7OeyZMdMKh08NyKZshOm7Z-ZtA9cqFHk_NmSY48OqhK8O44hh30w10TrNZg15bQjS9C2V4GR0iTZ38w7jjbgtlDvojFQkX9bhG2PAlie9klA20ZHbU7EGc7LyV0EPf8qknappSiJvjUkA5w" },
          ].map((post, i) => (
            <Link to="/journal" key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container-low mb-8 overflow-hidden">
                <img
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  src={post.img}
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
