import { motion } from "motion/react";

export default function Careers() {
  const jobs = [
    { title: "Senior Project Architect", loc: "BERLIN / FULL-TIME" },
    { title: "BIM Manager", loc: "TOKYO / FULL-TIME" },
    { title: "Design Intern", loc: "REMOTE / SEASONAL" }
  ];

  return (
    <div className="pt-40 pb-32 selection:bg-[#e03a2f] selection:text-white">
      <section className="px-6 md:px-12 mb-40">
        <div className="bg-[#131313] border border-[#1c1b1b] p-12 md:p-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <span className="block font-bold uppercase tracking-[0.4em] text-[10px] text-[#e03a2f] mb-8">Join the Studio</span>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Architectural<br/>Talent.</h2>
              <p className="text-[#888888] max-w-md mb-12 leading-relaxed">We are looking for disciplined minds to join our Tokyo and Berlin offices. Proficiency in physical modeling is essential.</p>
              <button className="group flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-[#e03a2f] transition-colors">
                View Open Roles
                <div className="w-12 h-px bg-[#444444] group-hover:bg-[#e03a2f] group-hover:w-20 transition-all duration-500"></div>
              </button>
            </div>
            <div className="space-y-2">
              {jobs.map((job, i) => (
                <div key={i} className="flex justify-between items-center py-8 border-b border-[#1c1b1b] hover:border-[#e03a2f] group transition-all cursor-pointer">
                  <span className="text-xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform">{job.title}</span>
                  <span className="text-[10px] font-bold text-[#444444] group-hover:text-[#e03a2f] tracking-widest">{job.loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="px-6 md:px-12 mb-40 max-w-4xl">
        <h3 className="text-3xl font-black uppercase tracking-tighter mb-12">Submit Application.</h3>
        <form className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#444444]">Full Name</label>
              <input type="text" className="w-full bg-transparent border-b border-[#1c1b1b] focus:border-[#e03a2f] py-4 outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#444444]">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-[#1c1b1b] focus:border-[#e03a2f] py-4 outline-none transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#444444]">Portfolio Link</label>
            <input type="url" className="w-full bg-transparent border-b border-[#1c1b1b] focus:border-[#e03a2f] py-4 outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#444444]">Cover Letter (Optional)</label>
            <textarea className="w-full bg-transparent border-b border-[#1c1b1b] focus:border-[#e03a2f] py-4 outline-none transition-colors min-h-[150px] resize-none"></textarea>
          </div>
          <button type="submit" className="bg-[#f5f5f5] text-[#0f0f0f] px-12 py-6 text-[10px] font-bold uppercase tracking-widest hover:bg-[#e03a2f] hover:text-white transition-all">Submit Application</button>
        </form>
      </section>
    </div>
  );
}
