import { Link, useLocation } from "react-router-dom";
import { ReactNode, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import GeminiChat from "./GeminiChat";
import VirtualGuide from "./VirtualGuide";
import PageTransitionLoader from "./PageTransitionLoader";


interface LayoutProps {
  children: ReactNode;
  isIntroActive?: boolean;
}

export default function Layout({ children, isIntroActive = false }: LayoutProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

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
    setIsMobileServicesOpen(false);
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
    { name: "Services", path: "#", isDropdown: true },
    { name: "Studio", path: "/studio" },
    { name: "Journal", path: "/journal" },
    { name: "Contact", path: "/contact" },
    { name: "Portal", path: "/login" },
  ];

  const servicesMenu = [
    { name: "Residential Architecture", path: "/services/residential-architecture" },
    { name: "Luxury Villa Design", path: "/services/luxury-villa-design" },
    { name: "Commercial Architecture", path: "/services/commercial-architecture" },
    { name: "Interior Design", path: "/services/interior-design" },
    { name: "Landscape Design", path: "/services/landscape-design" },
    { name: "Renovation & Remodeling", path: "/services/renovation-remodeling" },
    { name: "Turnkey Construction", path: "/services/turnkey-construction" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* React 19 Local Business JSON-LD Schema Hoisting */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ArchitecturalOffice",
          "name": "Studio Tactile",
          "image": "https://sta-website-tactile.vercel.app/images/hero1.jpg",
          "@id": "https://sta-website-tactile.vercel.app/#organization",
          "url": "https://sta-website-tactile.vercel.app/",
          "telephone": "+919600221902",
          "priceRange": "$$$$",
          "address": [
            {
              "@type": "PostalAddress",
              "streetAddress": "Kumbakonam Office",
              "addressLocality": "Kumbakonam",
              "addressRegion": "Tamil Nadu",
              "postalCode": "612001",
              "addressCountry": "IN"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "Thousand Lights",
              "addressLocality": "Chennai",
              "addressRegion": "Tamil Nadu",
              "postalCode": "600006",
              "addressCountry": "IN"
            }
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          },
          "sameAs": [
            "https://instagram.com/studiotactile",
            "https://www.linkedin.com/company/studio-tactile-architects"
          ]
        })}
      </script>

      <PageTransitionLoader 
        isIntroActive={isIntroActive} 
        onStart={() => setIsLoaderActive(true)}
        onComplete={() => setIsLoaderActive(false)}
      />
      <div className="grain"></div>
      
      {/* TopNavBar */}
      <header 
        className={`fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md flex justify-between items-center px-6 md:px-12 py-6 md:py-8 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link to="/" className="text-xl font-bold tracking-tighter text-[#f5f5f5]">STUDIO TACTILE</Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div key={link.name} className="relative group py-2">
                  <button
                    className={`font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-400 ease-out cursor-pointer active:opacity-80 flex items-center gap-1 ${
                      location.pathname.startsWith("/services/")
                        ? "text-[#f5f5f5]"
                        : "text-[#888888] hover:text-[#f5f5f5]"
                    }`}
                  >
                    {link.name}
                    <svg className="w-2.5 h-2.5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </svg>
                  </button>
                  {/* Dropdown Menu Wrapper (transparent bridge to preserve hover state) */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-[#0f0f0f]/95 border border-[#1c1b1b] backdrop-blur-md p-6 flex flex-col gap-4 min-w-[260px] shadow-2xl">
                      {servicesMenu.map((subLink) => (
                        <Link
                          key={subLink.path}
                          to={subLink.path}
                          className={`text-[9px] font-bold uppercase tracking-widest transition-colors hover:text-accent ${
                            location.pathname === subLink.path ? "text-accent" : "text-[#888888]"
                          }`}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
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
            );
          })}
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
      <div className={`fixed inset-0 z-40 bg-[#0f0f0f] transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} overflow-y-auto pt-24`}>
        <div className="flex flex-col min-h-[80vh] justify-center px-12 py-12 space-y-6">
          {navLinks.map((link, i) => {
            if (link.isDropdown) {
              return (
                <div key={link.name} className="flex flex-col">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className={`text-4xl font-bold uppercase tracking-tighter text-left transition-all duration-500 flex items-center justify-between ${
                      location.pathname.startsWith("/services/") ? 'text-[#e03a2f]' : 'text-[#f5f5f5]'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span>{link.name}</span>
                    <svg className={`w-6 h-6 transform transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  
                  {/* Collapsable Submenu */}
                  <div className={`flex flex-col gap-4 pl-4 overflow-hidden transition-all duration-500 ${isMobileServicesOpen ? 'max-h-[400px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {servicesMenu.map((subLink) => (
                      <Link
                        key={subLink.path}
                        to={subLink.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-sm font-bold uppercase tracking-wider ${
                          location.pathname === subLink.path ? "text-[#e03a2f]" : "text-[#888888] hover:text-[#f5f5f5]"
                        }`}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-4xl font-bold uppercase tracking-tighter transition-all duration-500 ${
                  location.pathname === link.path ? 'text-[#e03a2f]' : 'text-[#f5f5f5]'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      <main className={`flex-grow transition-opacity duration-500 ease-in-out ${
        isLoaderActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {children}
      </main>

      {/* Floating Spatial Guide Avatar (Travels through all pages except Home) */}
      <VirtualGuide />

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
            <a href="https://www.linkedin.com/company/studio-tactile-architects" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#f5f5f5] transition-colors text-[10px] font-bold tracking-widest">LINKEDIN</a>
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
