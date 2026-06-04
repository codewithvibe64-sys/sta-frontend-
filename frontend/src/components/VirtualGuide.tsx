import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ChevronRight, Compass } from "lucide-react";

export default function VirtualGuide() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show a gentle helper tooltip 3 seconds after mounting
  useEffect(() => {
    // Only schedule if we are NOT on the Home page
    if (location.pathname === "/") return;

    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, location]);

  const handleNavigateToLogin = () => {
    setIsOpen(false);
    navigate("/login");
  };

  const handleNavigateToContact = () => {
    setIsOpen(false);
    navigate("/contact");
  };

  const isAlreadyOnLogin = location.pathname === "/login" || location.pathname === "/register";

  // Comply with React Rules of Hooks: Place early returns right before JSX return statement
  if (location.pathname === "/") return null;

  return (
    <div className="fixed bottom-6 right-4 xs:right-6 md:bottom-8 md:right-8 z-[100] font-sans">
      <AnimatePresence>
        {/* Helper Tooltip Bubble */}
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2 w-48 bg-[#131313] border border-[#1c1b1b] p-3 shadow-xl rounded-xl text-center select-none pointer-events-none"
          >
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e03a2f] mb-1">
              Tactile Guide
            </div>
            <p className="text-[10px] text-[#888888] leading-tight font-medium">
              {isAlreadyOnLogin ? "Book a Consultation?" : "Enter the Client Portal"}
            </p>
            {/* Arrow */}
            <div className="absolute right-6 bottom-[-5px] w-2.5 h-2.5 bg-[#131313] border-r border-b border-[#1c1b1b] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Expanded Guide Dialog */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-32px)] max-w-[300px] sm:max-w-none sm:w-[340px] bg-[#131313] border border-[#1c1b1b] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#1c1b1b] flex justify-between items-center bg-[#0f0f0f]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#e03a2f]/10 flex items-center justify-center border border-[#e03a2f]/20">
                  <Compass size={14} className="text-[#e03a2f]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f5]">
                  Spatial Guide
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-[#1c1b1b] rounded-full transition-colors text-[#888888] hover:text-[#f5f5f5]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Animated Avatar Guide Banner */}
            <div className="py-6 bg-[#0f0f0f] border-b border-[#1c1b1b] flex flex-col items-center justify-center relative overflow-hidden select-none">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#e03a2f]/5 pointer-events-none" />
              <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Glowing Concentric Radar Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#e03a2f]/20 z-0"
                  animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 3.0, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-2.5 rounded-full border border-[#e03a2f]/45 z-0"
                  animate={{ scale: [1, 1.30, 1], opacity: [0.8, 0.2, 0.8] }}
                  transition={{ repeat: Infinity, duration: 3.0, ease: "easeInOut", delay: 0.6 }}
                />
                {/* Glowing Core Floating Mesh Sphere */}
                <motion.div
                  className="relative w-11 h-11 bg-[#e03a2f] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(224,58,47,0.5)] z-10"
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 8, -8, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut"
                  }}
                >
                  <Compass size={18} className="text-white" />
                </motion.div>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#e03a2f] mt-3 animate-pulse">
                Tactile Assistant Active
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wide text-[#f5f5f5]">
                  {isAlreadyOnLogin ? "Request Consultation" : "Looking for the Client Portal?"}
                </h4>
                <p className="text-xs text-[#888888] leading-relaxed font-medium">
                  {isAlreadyOnLogin
                    ? "Interested in space planning, interior drafting, or a luxury architectural consultation? Connect with our team directly to discuss your design scope, zoning, and project feasibility."
                    : "I can guide you to our secure client login page. This is where you can access your active spatial plans, view ongoing design boards, and coordinate directly with the architect."}
                </p>
              </div>

              {/* Dynamic Guide Action Button */}
              <div className="pt-2">
                {isAlreadyOnLogin ? (
                  <button
                    onClick={handleNavigateToContact}
                    className="w-full bg-[#e03a2f] hover:bg-white hover:text-black text-[#f5f5f5] py-3.5 px-6 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-400 group shadow-lg shadow-[#e03a2f]/10"
                  >
                    Request Consultation
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={handleNavigateToLogin}
                    className="w-full bg-[#e03a2f] hover:bg-white hover:text-black text-white py-3.5 px-6 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-400 group shadow-lg shadow-[#e03a2f]/10"
                  >
                    Travel to Login Page
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform text-white group-hover:text-black" />
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#0f0f0f] border-t border-[#1c1b1b] text-center">
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#444444]">
                Studio Tactile navigation helper
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Guide Avatar Trigger */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(224,58,47,0.3)] transition-all duration-500 border border-[#e03a2f]/20 ${
          isOpen ? "bg-[#1c1b1b] text-[#f5f5f5] rotate-90" : "bg-[#0f0f0f] text-[#f5f5f5]"
        }`}
        whileHover={{ scale: 1.08, borderColor: "#e03a2f" }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X size={20} className="text-[#888888] hover:text-[#f5f5f5]" />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Spinning background rings */}
            <motion.div
              className="absolute inset-1.5 rounded-full border border-dashed border-[#e03a2f]/30"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            />
            {/* Gentle floating avatar sphere */}
            <motion.div
              className="relative w-7 h-7 bg-[#e03a2f] rounded-full flex items-center justify-center shadow-lg"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <Compass size={14} className="text-white" />
            </motion.div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
