import { motion } from "motion/react";

export default function Team() {
  const team = [
    {
      name: "Elias Vance",
      role: "Principal Architect",
      desc: "Pioneering the studio's commitment to material honesty and brutalist revival. Elias oversees structural conceptualization.",
      img: "/images/prabba.jpg"
    },
    {
      name: "Sarah Chen",
      role: "Design Lead",
      desc: "Expert in interior volume and light manipulation. Sarah bridges the gap between massive exteriors and intimate living spaces.",
      img: "/images/12.png"
    },
    {
      name: "Marcus Chen",
      role: "Technical Director",
      desc: "Managing complex delivery schedules and technical engineering feasibility for our largest commercial infrastructures.",
      img: "/images/13.png"
    }
  ];

  return (
    <div className="pt-40 pb-32 selection:bg-[#e03a2f] selection:text-white">
      <section className="px-6 md:px-12 mb-40">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-[#444444] mb-4">The Architects</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Human Intelligence.</h2>
          </div>
          <div className="hidden md:block w-1/3 h-px bg-[#1c1b1b]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group"
            >
              <div className="overflow-hidden mb-8 aspect-[4/5] bg-[#1c1b1b]">
                <img
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                  src={member.img}
                />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2 text-[#f5f5f5] group-hover:text-[#e03a2f] transition-colors">{member.name}</h3>
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#e03a2f] mb-6">{member.role}</span>
              <p className="text-[#888888] text-sm leading-relaxed max-w-xs">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
