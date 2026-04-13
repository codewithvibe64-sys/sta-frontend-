import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface FormState {
  name: string;
  phone: string;
  location: string;
  service: string;
  budget: string;
  requirement: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  location?: string;
  service?: string;
  budget?: string;
  requirement?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    location: "",
    service: "",
    budget: "",
    requirement: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Legal name is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (!/^\+?[\d\s-]{7,20}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!form.location.trim()) newErrors.location = "Site location is required";
    if (!form.service || form.service === "Select service") newErrors.service = "Please select a service";
    if (!form.requirement.trim()) {
      newErrors.requirement = "Structural requirement is required";
    } else if (form.requirement.trim().length < 20) {
      newErrors.requirement = "Please provide a bit more detail (min 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent, type: 'project' | 'consultation') => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <main className="pt-40 pb-32 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-background border border-border p-12 md:p-20 text-center space-y-8"
        >
          <div className="flex justify-center">
            <CheckCircle2 size={64} className="text-accent" />
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground">Submission Received</h2>
          <p className="text-muted text-lg leading-relaxed font-medium">
            Our senior partners have received your inquiry. A preliminary feasibility review is now underway. We will contact you within 48 hours.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] hover:text-foreground transition-colors"
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-40 pb-32 selection:bg-accent selection:text-background">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-x-12 px-6 md:px-12">
        {/* Left Column: Identity & Direct Contacts */}
        <div className="lg:col-span-5 mb-16 lg:mb-0">
          <div className="mb-24">
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] block mb-8">Inquiry</span>
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-tighter text-foreground mb-12 uppercase">
              Start your project with <span className="text-accent">Clarity.</span>
            </h1>
            <p className="text-muted text-xl leading-relaxed max-w-md font-medium">
              We translate architectural vision into tactile reality. Every grand design begins with a single focused conversation.
            </p>
          </div>
          <div className="space-y-20">
            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
              <div>
                <span className="text-muted/60 font-bold uppercase tracking-[0.4em] text-[10px] block mb-6">Voice</span>
                <div className="space-y-3">
                  <a href="tel:+919600221902" className="block text-2xl font-bold text-foreground tracking-tighter hover:text-accent transition-colors">+91 9600 22 1902</a>
                  <a href="tel:+919600221026" className="block text-2xl font-bold text-foreground tracking-tighter hover:text-accent transition-colors">+91 9600 22 1026</a>
                </div>
              </div>
              <div>
                <span className="text-muted/60 font-bold uppercase tracking-[0.4em] text-[10px] block mb-6">Direct Correspondence</span>
                <a href="mailto:info@studiotactile.in" className="block text-2xl font-bold text-accent hover:text-foreground transition-colors duration-300 tracking-tighter">info@studiotactile.in</a>
              </div>
            </div>
            {/* Map/Location Signal */}
            <div className="space-y-8">
              <div className="w-full h-80 bg-background relative group overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-out border border-border">
                <img
                  alt="Minimalist dark monochromatic street map of Kumbakonam"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ4H911O3RzfCjz-kiG30OJSNgjNXdSZBfSV5vLVJcnj7MN4bfYZq-RQ5STDNdwQHcpcPE-Ld2Jz3j3ju0iMql9kmKYypNReLc5A8QS2iGl2fzzI1-cy9FxC8tAb3zoffYA2KR5loG3PUySv8EcPq3sgaf3o-3owYRkjmzo0oGatXYbUuMvnjtl1SL-Z-p2sqjtze4CccsVIkH0lbLdiFtTvgfACxQtaWJI3udelOO16l97gmW4M-Lz5fly7X1VU7BQ8hsTc2LadE"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-3 h-3 bg-accent animate-pulse"></div>
                    <span className="font-bold uppercase tracking-[0.4em] text-[10px] text-foreground">KUMBAKONAM — MAIN OFFICE</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted leading-relaxed max-w-sm">
                  Our studio operates from Kumbakonam, with a growing presence in Chennai and Bangalore, delivering design services across India and beyond.
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60">
                  Collaborating with teams and consultants internationally, including the Middle East.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Project Engagement Form */}
        <div className="lg:col-start-7 lg:col-span-6 bg-background border border-border p-8 md:p-16 lg:p-24 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubmitting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground">Processing Inquiry...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60">Legal Name</label>
                <div className="relative">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-0 border-b ${errors.name ? 'border-accent' : 'border-border'} focus:ring-0 focus:border-accent text-foreground py-4 px-0 placeholder:text-muted/30 transition-all text-lg font-medium`}
                    placeholder="John Doe"
                    type="text"
                  />
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                      <AlertCircle size={10} /> {errors.name}
                    </motion.p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60">Contact Number</label>
                <div className="relative">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-0 border-b ${errors.phone ? 'border-accent' : 'border-border'} focus:ring-0 focus:border-accent text-foreground py-4 px-0 placeholder:text-muted/30 transition-all text-lg font-medium`}
                    placeholder="+91 0000 00 0000"
                    type="tel"
                  />
                  {errors.phone && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                      <AlertCircle size={10} /> {errors.phone}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60">Site Location</label>
                <div className="relative">
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-0 border-b ${errors.location ? 'border-accent' : 'border-border'} focus:ring-0 focus:border-accent text-foreground py-4 px-0 placeholder:text-muted/30 transition-all text-lg font-medium`}
                    placeholder="City, Country"
                    type="text"
                  />
                  {errors.location && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                      <AlertCircle size={10} /> {errors.location}
                    </motion.p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60">Select Service</label>
                <div className="relative">
                  <select 
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-0 border-b ${errors.service ? 'border-accent' : 'border-border'} focus:ring-0 focus:border-accent text-foreground py-4 px-0 transition-all cursor-pointer text-lg font-medium appearance-none`}
                  >
                    <option className="bg-background" value="">Select service</option>
                    <option className="bg-background">Architectural Design</option>
                    <option className="bg-background">Interior Design</option>
                    <option className="bg-background">Construction / Execution</option>
                    <option className="bg-background">Renovation</option>
                    <option className="bg-background">Consultation</option>
                    <option className="bg-background">Home Decor</option>
                    <option className="bg-background">Vendor / Collaboration</option>
                    <option className="bg-background">Land / Real Estate</option>
                  </select>
                  {errors.service && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                      <AlertCircle size={10} /> {errors.service}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60">Project Budget (Optional)</label>
                <span className="text-[9px] text-muted/40 uppercase tracking-widest">Select approximate budget (any currency)</span>
              </div>
              <div className="relative">
                <select 
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-accent text-foreground py-4 px-0 transition-all cursor-pointer text-lg font-medium appearance-none"
                >
                  <option className="bg-background" value="">Select scale</option>
                  <option className="bg-background">Below ₹5 Lakhs</option>
                  <option className="bg-background">₹5L – ₹15L</option>
                  <option className="bg-background">₹15L – ₹50L</option>
                  <option className="bg-background">₹50L – ₹1Cr</option>
                  <option className="bg-background">₹1Cr+</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-muted/60">Structural Requirement</label>
              <div className="relative">
                <textarea
                  name="requirement"
                  value={form.requirement}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-0 border-b ${errors.requirement ? 'border-accent' : 'border-border'} focus:ring-0 focus:border-accent text-foreground py-4 px-0 placeholder:text-muted/30 transition-all resize-none text-lg font-medium`}
                  placeholder="Briefly describe your vision..."
                  rows={3}
                ></textarea>
                {errors.requirement && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                    <AlertCircle size={10} /> {errors.requirement}
                  </motion.p>
                )}
              </div>
            </div>
            <div className="pt-12 flex flex-col sm:flex-row gap-6">
              <button
                onClick={(e) => handleSubmit(e, 'project')}
                className="flex-[1.5] bg-accent text-background py-8 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-foreground hover:text-background transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] shadow-lg shadow-accent/10"
                type="submit"
              >
                Start Your Project
              </button>
              <button
                onClick={(e) => handleSubmit(e, 'consultation')}
                className="flex-1 border border-border text-muted py-8 font-bold uppercase tracking-[0.4em] text-[10px] hover:border-foreground hover:text-foreground transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
                type="button"
              >
                Get Consultation
              </button>
            </div>
            <p className="text-[9px] text-muted/60 uppercase tracking-[0.3em] text-center pt-8 leading-relaxed">
              Submitting this form initiates a preliminary feasibility review by our senior partners.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
