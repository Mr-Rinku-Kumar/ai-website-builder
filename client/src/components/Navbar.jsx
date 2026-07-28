// client/src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { 
  FiCode, 
  FiGithub, 
  FiMenu, 
  FiX, 
  FiHome,
  FiClock,
  FiMail,
  FiZap
} from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

const Navbar = ({ onHistoryClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // ✅ Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ✅ Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiCode className="text-white text-lg md:text-xl" />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm md:text-lg">
                  AI WebBuilder
                </h1>
                <p className="text-gray-400 text-[10px] md:text-xs flex items-center gap-1">
                  <FiZap className="text-purple-400 text-[8px] md:text-[10px]" />
                  Powered by Gemini AI
                </p>
              </div>
            </a>

            {/* ✅ Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {/* History Button */}
              <button
                onClick={onHistoryClick}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm hover:bg-white/5 px-3 py-2 rounded-lg"
              >
                <FiClock className="text-lg" />
                History
              </button>

              {/* Email */}
              <a
                href="mailto:@Rinku"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm hover:bg-white/5 px-3 py-2 rounded-lg"
              >
                <FiMail className="text-lg" />
                @Rinku
              </a>

              {/* GitHub */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover:bg-white/5 p-2 rounded-lg"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>

            {/* ✅ Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '64px' }}
      >
        <div className="container-custom py-6 space-y-4">
          <button
            onClick={() => {
              onHistoryClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <FiClock className="text-xl text-purple-400" />
            <span>History</span>
          </button>

          <a
            href="mailto:@Rinku"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <FiMail className="text-xl text-pink-400" />
            <span>@Rinku</span>
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <FaGithub className="text-xl text-gray-400" />
            <span>GitHub</span>
          </a>

          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              AI Website Builder v1.0
            </p>
            <p className="text-xs text-gray-600 text-center mt-1">
              Built with ❤️
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;