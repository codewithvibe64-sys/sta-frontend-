import { Link, useLocation } from "react-router-dom";
import { ReactNode, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import GeminiChat from "./GeminiChat";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Auto-hide header on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
        // Also close menu if someone scrolls down while it's open
        if (isMenuOpen) setIsMenuOpen(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Studio", path: "/studio" },
    { name: "Journal", path: "/journal" },
    { name: "Contact", path: "/contact" },
    { name: "Portal", path: "/login" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grain"></div>
      
      {/* TopNavBar */}
      <header 
        className={`fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md flex justify-between items-center px-6 md:px-12 py-6 md:py-8 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link to="/" className="text-xl font-bold tracking-tighter text-[#f5f5f5]">STUDIO TACTILE</Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-400 ease-out cursor-pointer active:opacity-80 ${
                location.pathname === link.path
                  ? "text-[#f5f5f5]"
                  : "text-[#888888] hover:text-[#f5f5f5]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#f5f5f5] hover:text-[#e03a2f] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#0f0f0f] transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full justify-center px-12 space-y-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-4xl font-bold uppercase tracking-tighter transition-all duration-500 ${
                location.pathname === link.path ? 'text-[#e03a2f]' : 'text-[#f5f5f5]'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#1c1b1b] bg-[#0f0f0f] px-12 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <div className="text-[#f5f5f5] font-bold text-lg tracking-tighter mb-4">STUDIO TACTILE</div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#444444]">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED.
            </p>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link to="/legal#about-us" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888] hover:text-[#e03a2f] transition-colors duration-400">About Us</Link>
            <Link to="/legal#privacy-policy" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888] hover:text-[#e03a2f] transition-colors duration-400">Privacy Policy</Link>
            <Link to="/legal#terms-conditions" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#888888] hover:text-[#e03a2f] transition-colors duration-400">Terms & Conditions</Link>
          </div>

          <div className="md:col-span-4 flex md:justify-end gap-8 items-center">
            <a href="https://instagram.com/studiotactile" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#f5f5f5] transition-colors text-[10px] font-bold tracking-widest">INSTAGRAM</a>
            <a href="https://linkedin.com/company/studiotactile" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#f5f5f5] transition-colors text-[10px] font-bold tracking-widest">LINKEDIN</a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-4 w-10 h-10 border border-[#1c1b1b] flex items-center justify-center text-[#888888] hover:text-[#e03a2f] hover:border-[#e03a2f] transition-all duration-400"
              aria-label="Back to top"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
