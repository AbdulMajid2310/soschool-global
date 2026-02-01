"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import ThemeToggle from "../button/ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi scroll untuk efek glassmorphism yang dinamis
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWithOffset = (targetId: string, offset = 80) => {
    const element = document.getElementById(targetId);
    if (!element) return;
    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string): void => {
    e.preventDefault();
    scrollToWithOffset(targetId);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "features", label: "Fitur" },
    { id: "solutions", label: "Solusi" },
    { id: "testimonials", label: "Testimoni" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Kontak" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-blue-500/5 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo Area */}
          <div 
            className="flex items-center group cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="relative h-12 w-12 transition-transform duration-500 group-hover:rotate-12">
              <img src="/images/logo.png" alt="SoSchool" className="h-full w-full object-contain" />
            </div>
            <div className="ml-3">
              <span className="text-2xl font-black italic tracking-tighter uppercase bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SoSchool
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 leading-none">
                Education Revolution
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
              >
                Masuk
              </button>
              <button
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-95"
              >
                Registrasi
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Pure Tailwind Transition) */}
        <div className={`
          lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden
          ${isMobileMenuOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 py-0"}
        `}>
          <div className="container mx-auto px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className="text-lg font-black uppercase italic text-gray-800 dark:text-white"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-gray-100 dark:border-gray-800" />
            <div className="flex gap-3">
              <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-900 rounded-xl text-gray-900 dark:text-white">
                Masuk
              </button>
              <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-blue-600 rounded-xl text-white">
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}