import { motion } from "motion/react";

export default function Clients() {
  const testimonials = [
    {
      quote: "Tactile doesn't just design buildings; they curate a legacy.",
      author: "Julian Thorne",
      role: "CEO, Aether Developments"
    },
    {
      quote: "The intersection of raw materiality and spatial precision is where Studio Tactile excels.",
      author: "Elena Rossi",
      role: "Director, Urban Future"
    }
  ];

  return (
    <div className="pt-40 pb-32 selection:bg-[#e03a2f] selection:text-white">
      <section className="px-6 md:px-12 mb-40">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-[#444444] mb-4">Partnerships</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Our Clients.</h2>
          </div>
          <div className="hidden md:block w-1/3 h-px bg-[#1c1b1b]"></div>
        </div>
        
        <div className="space-y-32">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl"
            >
              <div className="border-l-4 border-[#e03a2f] pl-8 md:pl-12 py-4">
                <p className="text-3xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-12 uppercase">
                  "{t.quote}"
                </p>
                <cite className="not-italic flex items-center gap-6">
                  <div className="w-12 h-px bg-[#444444]"></div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f5]">{t.author}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#444444]">{t.role}</span>
                  </div>
                </cite>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Client Logos Placeholder */}
      <section className="px-6 md:px-12 mb-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30 grayscale">
          {["AETHER", "URBAN FUTURE", "NORDIC", "VANGUARD"].map((logo) => (
            <div key={logo} className="h-32 border border-[#1c1b1b] flex items-center justify-center font-black tracking-tighter text-2xl">
              {logo}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
