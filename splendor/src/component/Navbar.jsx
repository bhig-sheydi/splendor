import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-gradient-to-b from-[#0a192fb3] to-[#0a192fe6] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="flex flex-col items-center">
          <h1
            className="text-3xl font-bold text-yellow-400"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Austin
          </h1>
          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1" />
        </div>

        <nav className="hidden md:flex gap-8 text-white font-medium text-lg items-center">
          <a href="#home" className="hover:text-yellow-400 transition">Home</a>
          <a href="#about" className="hover:text-yellow-400 transition">About</a>
          <a href="#experience" className="hover:text-yellow-400 transition">Experience</a>
          <a href="#services" className="hover:text-yellow-400 transition">Services</a>
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-400 focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden bg-black/80 backdrop-blur-md text-white fixed top-16 left-0 w-full z-40 flex flex-col items-center ${
          isOpen ? 'max-h-96 py-6' : 'max-h-0 py-0'
        }`}
      >
        <a href="#home" className="hover:text-yellow-400 transition py-2">Home</a>
        <a href="#about" className="hover:text-yellow-400 transition py-2">About</a>
        <a href="#experience" className="hover:text-yellow-400 transition py-2">Experience</a>
        <a href="#services" className="hover:text-yellow-400 transition py-2">Services</a>
        <a href="#contact" className="hover:text-yellow-400 transition py-2">Contact</a>
      </div>
    </>
  );
};

export default Navbar;
