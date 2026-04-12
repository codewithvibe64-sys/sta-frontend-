import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ email: data.message || "Login failed" });
      } else {
        localStorage.setItem('token', data.token);
        window.location.href = '/'; 
      }
    } catch (error) {
      setErrors({ email: "Server error, please try again later" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <main className="pt-40 pb-32 selection:bg-[#e03a2f] selection:text-white">
      <div className="grid grid-cols-12 gap-x-12 px-6 md:px-12">
        <div className="col-span-12 lg:col-span-5 mb-24 lg:mb-0 flex flex-col justify-center">
          <div>
            <span className="text-[#e03a2f] font-bold uppercase tracking-[0.4em] text-[10px] block mb-8">Access</span>
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-tighter text-[#f5f5f5] mb-12 uppercase">
              Enter the <span className="text-[#e03a2f]">Portal.</span>
            </h1>
            <p className="text-[#888888] text-xl leading-relaxed max-w-md font-medium mb-12">
              Authentication required to access studio resources, proprietary designs, and project documentation.
            </p>
            <div className="space-y-4">
               <span className="text-[#444444] font-bold uppercase tracking-[0.4em] text-[10px] block">New here?</span>
               <Link to="/register" className="text-2xl font-bold text-[#e03a2f] hover:text-[#f5f5f5] transition-colors duration-300 tracking-tighter block">
                 Create an Account
               </Link>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-start-7 lg:col-span-5 bg-[#131313] border border-[#1c1b1b] p-8 md:p-16 lg:p-24 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubmitting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-[#131313]/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-12 h-12 border-2 border-[#e03a2f] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#f5f5f5]">Authenticating...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-12" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-[#444444]">Email Address</label>
              <div className="relative">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-0 border-b ${errors.email ? 'border-[#e03a2f]' : 'border-[#1c1b1b]'} focus:ring-0 focus:border-[#e03a2f] focus:outline-none text-[#f5f5f5] py-4 px-0 placeholder:text-[#222222] transition-all text-lg font-medium`}
                  placeholder="contact@example.com"
                  type="email"
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[#e03a2f] text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                    <AlertCircle size={10} /> {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block font-bold uppercase tracking-[0.4em] text-[10px] text-[#444444]">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-0 border-b ${errors.password ? 'border-[#e03a2f]' : 'border-[#1c1b1b]'} focus:ring-0 focus:border-[#e03a2f] focus:outline-none text-[#f5f5f5] py-4 px-0 placeholder:text-[#222222] transition-all text-lg font-medium`}
                  placeholder="••••••••"
                  type="password"
                />
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[#e03a2f] text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                    <AlertCircle size={10} /> {errors.password}
                  </motion.p>
                )}
              </div>
              <div className="flex justify-end pt-2">
                <Link to="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] hover:text-[#e03a2f] transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="pt-8">
              <button
                className="w-full bg-[#e03a2f] text-white py-8 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#f5f5f5] hover:text-[#0f0f0f] transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] shadow-lg shadow-[#e03a2f]/10"
                type="submit"
              >
                Sign In
              </button>
            </div>
            
            <p className="text-[9px] text-[#444444] uppercase tracking-[0.3em] text-center pt-8 leading-relaxed">
              Protected by Enterprise-grade encryption.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
