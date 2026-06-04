import { motion } from "motion/react";

export default function Team() {
  const team = [
    {
      name: "R.Vijaykumar",
      role: "Architect - Execution Head",
      desc: "Overseeing structural conceptualization and driving project execution with uncompromising precision.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAFbFB1StuuVOJ1oyNeNc4puBh0W8dz5K_W2jqu7B_FveINbmV3J5Wt05PBcWAX_x_0PTV6Z-VYK7NbjR8cYCqeuEOVEuARI_89xDiHxRs11ZCk1Y1GodehFvq9oE6falsjTYaSCt7n64OifxKw1YP9qYL5oTsQJJJ4ZAVIVVQBavYGFdLhzYdNdrX9YlARYWy5wXx11MmZmys25VhXq9TrkHENJ4WvrIk-xXtTLpoTfF4fWjUsMXqz6c21C3uzvDKvhzF_VqZtQ8"
    },
    {
      name: "B.Govindraj",
      role: "Architect - Design Head",
      desc: "Leading the conceptual narrative, focusing on material honesty and the brutalist revival of space.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn2_p_gibyphYwD4zgIij4o43n2mHyONfWZ72VvevPXmxYAU6cMv0b5AF-6-rqAPaDBMZERe2tQcrQJOgxmOz1B0r-0sWSmz2XnJh1QaIUqaOWt21iU_-wHKEb7hH9U8s39eqiopyBxAOMVZg2ksFfnb3wdJg7LyXsb2heb6nbuJ5gVAavMoPHoowie4ggLLFMQKRK0IIwW4oqpu_zfWAbzmiP8r3tvy5-27pULyKnQmP61htgFjM1Ww7Uv_Geo6ADiJfWwGC5ulM"
    },
    {
      name: "M.Senthil velan",
      role: "Architect - Interior Team head",
      desc: "Expert in interior volume, shaping how light and materials interact for functional daily use.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuARQjfSrqlk_UDLoYYHcEyrYibTEpUasljsulecvGrubTJPO6ukkNiizesIyMyQPQnY3FaBUwNeILyFs6ttu9YuALGEapfWAE_r51tmVKiyHnLFf23imO3qLHmSin7iMgtzvim82yIYbvkcF71XvC9YyMjxP3JsigrVAEN0RGJx9z0iIu_bSqLnPpNYs9VsDHSOoAgNC4Kx_YbxCiLXTmJtfXQAzeqgZUlesPT1FsdpQlEqxXwxkNkHAGj9G3Z86-GgN-ssfvHwdFg"
    },
    {
      name: "Sowmiyaa",
      role: "Architect - Client Relationship management",
      desc: "Bridging the gap between the studio's technical execution and the client's vision for the future.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPK2GIbPlJryd6JqCM7ViIm03PloUWiKsHeXnQZ1cMybeRaBMu1XYU4hWP3BQAqH9zsfb4oG-Pl5lI65gb0sy4QaXVRwyU_gicbcNdft0h3dmgAai9PvHFROS5myTmvUbHvxxOsWAMcd5uA6UkECAro68A8GzhmR_nbWMT-BlfOLMcB4ZK6DocF3TkH8mdvC3FPzVOMhv15tx55E087foWvns2lSPhU0j2_mrR5w54UnzUYxgO5KdVs7a3FyFf0ENgteQYvifl7Eo"
    },
    {
      name: "Priyadharshini",
      role: "Architect",
      desc: "Contributing to the studio's architectural output, from initial design concepts to final handover.",
      img: "/images/prabba.jpg"
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
