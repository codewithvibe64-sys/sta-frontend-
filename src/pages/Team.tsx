import { motion } from "motion/react";

export default function Team() {
  const team = [
    {
      name: "Elias Vance",
      role: "Principal Architect",
      desc: "Pioneering the studio's commitment to material honesty and brutalist revival. Elias oversees structural conceptualization.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3w8gPMdurR-llSxav4WazIsaIvySaQrhSXew7R8aEnZoiUU6v2VUfWFdlyGMx6PLZ3MoeeZZ2EOO9p2HZvZWEeEHEQZWb73utt__6iOos3zAJmxK6OwsBwNoIdvcpf-o9b2EKRRdlftS_b0e7eH3VExrxGpT7mHAogUqK1CKIH4v0vxIsPiGt7jCAk4Ta5IguDbY6-rrh6FerNLup_IU3Q39U2RMy5Eto8cKr2pm0zsdgglRB1ShHJ1IPSlsw32hyIdJPHZeN3YA"
    },
    {
      name: "Sarah Chen",
      role: "Design Lead",
      desc: "Expert in interior volume and light manipulation. Sarah bridges the gap between massive exteriors and intimate living spaces.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2X02qq8aZUqFRFp3JGLr06ELcEsdRGxXB51WqZVTT7TnJR87tNW-ZImy8AEAy_iMNMgLKKgVPKexDx-6KHwPffNYQTse0GpxTw9JS1w13x6_WAWUMmtLs2yhjGDBHTaaGhqq9RzpDaZDCcbGrAzMq47XpHGLvwfbzlziV-KcFpooUdRH_Cw5fCsbhYXpLGK3xDQyLg-fd5vgWMRGTHtzmk83lFMO1EeX2HAIX5Yvqmw463z-bT1HvAexq5pFDCI1iOnzydu7G47k"
    },
    {
      name: "Marcus Chen",
      role: "Technical Director",
      desc: "Managing complex delivery schedules and technical engineering feasibility for our largest commercial infrastructures.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAagjsDofpbK5uUYQ-AMG4Nzw3WXbpymRRi8KIhvzy4PGi2ZsXoLFP8pjNDBy5yLLEtOQpm2GgS_3R3oVnTI7oZnF_wCPQqcPq74HCpZ1Fpy9_42r3U0ow74bDAvGNqthz40Mgkx18fDeUCYO9J7NmCpc0OAhYHABGXwUWw1tF7_E9ipBl1MTu5zDOm9uyXbIHEC-T-BEeFQVoCt8Wk420_1VXp36NeeUJeekUqpk4CcQ_ey-f0pVPbD5D2rbCcSI-mgf0QMrGWivc"
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
