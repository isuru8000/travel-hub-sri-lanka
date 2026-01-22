
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Menu, X, Globe, LogIn, LogOut, ChevronRight, Sparkles, Compass, Search, Mail } from 'lucide-react';
import { User } from '../App.tsx';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setView: (view: any) => void;
  currentView: string;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  setLanguage, 
  setView, 
  currentView,
  user,
  onLogin,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: any) => {
    setLastClicked(view);
    // Remove the animation class after it plays
    setTimeout(() => setLastClicked(null), 500);
    
    setView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: language === 'EN' ? 'Home' : 'මුල් පිටුව' },
    { id: 'destinations', label: language === 'EN' ? 'destinations' : 'පිවිසුම්' },
    { id: 'search', label: language === 'EN' ? 'Live News' : 'සජීවී පුවත්', highlight: true },
    { id: 'vr-showcase', label: language === 'EN' ? '3D Spaces' : 'ත්‍රිමාණ', vipsOnly: true },
    { id: 'contact', label: language === 'EN' ? 'contact' : 'සම්බන්ධ වන්න' },
  ];

  return (
    <div className={`fixed left-0 right-0 z-[70] transition-all duration-1000 flex justify-center pointer-events-none ${scrolled ? 'top-4' : 'top-6'}`}>
      <nav className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex items-center justify-between px-6 md:px-12 w-[98%] max-w-[1800px] py-4 bg-white/90 backdrop-blur-[40px] rounded-2rem border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)] pointer-events-auto ${
        scrolled ? 'scale-100' : 'scale-[1.005]'
      }`}>
        
        {/* Left: Brand Cluster */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNav('home')}
            className={`flex items-center gap-3 group transition-transform ${lastClicked === 'home' ? 'animate-nav-bounce' : ''}`}
          >
            <div className="relative w-11 h-11 story-ring rounded-full p-[2px] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <div className="bg-white w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/travel-hub-logo.png" 
                  alt="Travel Hub Logo" 
                  className="w-full h-full object-cover p-0.5"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const span = document.createElement('span');
                      span.className = "insta-text-gradient font-heritage font-black text-2xl leading-none";
                      span.innerText = "L";
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none gap-1">
              <span className="font-heritage font-black text-[14px] uppercase tracking-[0.2em] text-[#000000]">Travel Hub</span>
              <span className="font-black text-[9px] uppercase tracking-[0.4em] text-gray-500">Sri Lanka</span>
            </div>
          </button>
        </div>

        {/* Center: Main Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-14">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNav(link.id)} 
              className={`group relative py-2 transition-transform duration-300 ${
                lastClicked === link.id ? 'animate-nav-bounce' : 'active:scale-95'
              }`}
            >
              <span className={`text-[13px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center gap-2 ${
                currentView === link.id ? 'text-[#000000]' : 'text-[#000000]/60 hover:text-[#000000]'
              }`}>
                {link.highlight && <Search size={12} className="text-[#E1306C]" />}
                {link.label}
              </span>
              <div className={`absolute -bottom-1 left-0 h-[3px] transition-all duration-700 ${
                currentView === link.id ? 'w-full bg-[#000000]' : 'w-0 bg-transparent'
              }`} />
              {link.vipsOnly && (
                <div className="absolute -top-3 -right-4">
                   <Sparkles size={12} className="text-[#E1306C] animate-pulse" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right: Interface Controls */}
        <div className="flex items-center gap-3 md:gap-8">
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[12px] font-black uppercase tracking-widest hover:bg-black/5 text-[#000000] active:scale-90"
          >
            <Globe size={16} className="text-[#000000]" />
            {language}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1.5 pr-5 rounded-full bg-black/5 border border-white hover:border-gray-200 transition-all active:scale-95"
              >
                <div className="w-9 h-9 rounded-full border border-white shadow-sm overflow-hidden">
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="hidden sm:inline text-[11px] font-black uppercase tracking-widest text-[#000000]">
                  {user.name.split(' ')[0]}
                </span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-[1.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-300 z-[80]">
                  <div className="px-6 py-4 border-b border-gray-50 mb-1">
                    <p className="text-[12px] font-black text-[#000000] uppercase tracking-wider">{user.name}</p>
                    <p className="text-[9px] text-gray-500 font-bold tracking-tight truncate uppercase">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-6 py-4 text-[11px] font-black text-red-600 hover:bg-red-50 transition-all uppercase tracking-widest"
                  >
                    <LogOut size={16} />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="group relative flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all active:scale-90 bg-[#000000] text-white hover:shadow-2xl shadow-xl"
            >
              Portal
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-black/5 text-[#000000] hover:bg-black/10 transition-colors active:scale-90"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-[30px] z-[60] flex flex-col p-10 pt-32 animate-in fade-in slide-in-from-right-10 duration-500 pointer-events-auto">
          <div className="flex flex-col gap-10">
            {navLinks.map((link, i) => (
              <button 
                key={link.id}
                onClick={() => handleNav(link.id)} 
                className={`group flex flex-col items-start gap-2 animate-in slide-in-from-left-8 duration-700 transition-transform ${
                  lastClicked === link.id ? 'animate-nav-bounce' : ''
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className={`text-4xl font-heritage font-black transition-all flex items-center gap-4 ${
                  currentView === link.id ? 'text-[#000000]' : 'text-gray-300'
                }`}>
                  {link.highlight && <Search size={28} className="text-[#E1306C]" />}
                  {link.label}
                </span>
                <div className={`h-1.5 bg-[#000000] transition-all ${currentView === link.id ? 'w-24' : 'w-0'}`} />
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-4 pb-12">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
              className="w-full py-6 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] text-[#000000] border-2 border-black/10 flex items-center justify-center gap-4 bg-white shadow-xl active:scale-95 transition-transform"
            >
              <Globe size={20} className="text-[#E1306C]" />
              {language === 'EN' ? 'Switch Language' : 'භාෂාව වෙනස් කරන්න'}
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nav-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.9); }
        }
        .animate-nav-bounce {
          animation: nav-bounce 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}} />
    </div>
  );
};

export default Navbar;
