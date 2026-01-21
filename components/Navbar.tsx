
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Menu, X, Globe, LogIn, LogOut, ChevronRight, Sparkles, Compass } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: any) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: language === 'EN' ? 'Home' : 'මුල් පිටුව' },
    { id: 'destinations', label: language === 'EN' ? 'Portals' : 'පිවිසුම්' },
    { id: 'vr-showcase', label: language === 'EN' ? '3D Spaces' : 'ත්‍රිමාණ', vipsOnly: true },
    { id: 'memories', label: language === 'EN' ? 'memories' : 'මතකයන්' },
  ];

  return (
    <div className={`fixed left-0 right-0 z-[70] transition-all duration-1000 flex justify-center pointer-events-none ${scrolled ? 'top-4' : 'top-6'}`}>
      <nav className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex items-center justify-between px-6 md:px-12 w-[98%] max-w-[1800px] py-3 bg-white/80 backdrop-blur-[40px] rounded-[2rem] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] pointer-events-auto ${
        scrolled ? 'scale-100' : 'scale-[1.005]'
      }`}>
        
        {/* Left: Brand Cluster */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-9 h-9 story-ring rounded-[12px] p-[2px] shadow-lg transition-transform duration-500 group-hover:rotate-12">
              <div className="bg-white w-full h-full rounded-[10px] flex items-center justify-center">
                <span className="insta-text-gradient font-heritage font-black text-xl leading-none">L</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
              <span className="font-heritage font-black text-[12px] uppercase tracking-[0.2em] text-[#0a0a0a]">Travel Hub</span>
              <span className="font-black text-[7px] uppercase tracking-[0.4em] text-gray-400">Sri Lanka</span>
            </div>
          </button>
        </div>

        {/* Center: Main Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-16">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNav(link.id)} 
              className="group relative py-2"
            >
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${
                currentView === link.id ? 'text-[#0a0a0a]' : 'text-gray-400 hover:text-[#0a0a0a]'
              }`}>
                {link.label}
              </span>
              <div className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-700 ${
                currentView === link.id ? 'w-full bg-[#E1306C]' : 'w-0 bg-transparent'
              }`} />
              {link.vipsOnly && (
                <div className="absolute -top-3 -right-4">
                   <Sparkles size={10} className="text-[#E1306C] animate-pulse" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right: Interface Controls */}
        <div className="flex items-center gap-3 md:gap-8">
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest hover:bg-black/5 text-[#0a0a0a]"
          >
            <Globe size={14} className="opacity-40" />
            {language}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1.5 pr-4 rounded-full bg-black/5 border border-white hover:border-gray-200 transition-all"
              >
                <div className="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden">
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest text-[#0a0a0a]">
                  {user.name.split(' ')[0]}
                </span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-[1.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-300 z-[80]">
                  <div className="px-6 py-4 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-wider">{user.name}</p>
                    <p className="text-[8px] text-gray-400 font-bold tracking-tight truncate uppercase">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-6 py-4 text-[9px] font-black text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest"
                  >
                    <LogOut size={14} />
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="group relative flex items-center gap-2 px-8 md:px-12 py-3 md:py-4 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 bg-[#0a0a0a] text-white hover:shadow-xl"
            >
              Portal
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-black/5 text-[#0a0a0a] hover:bg-black/10 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (High-End White UI) */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-[30px] z-[60] flex flex-col p-10 pt-32 animate-in fade-in slide-in-from-right-10 duration-500 pointer-events-auto">
          <div className="flex flex-col gap-10">
            {navLinks.map((link, i) => (
              <button 
                key={link.id}
                onClick={() => handleNav(link.id)} 
                className="group flex flex-col items-start gap-2 animate-in slide-in-from-left-8 duration-700"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className={`text-4xl font-heritage font-black transition-all ${
                  currentView === link.id ? 'insta-text-gradient' : 'text-gray-300'
                }`}>
                  {link.label}
                </span>
                <div className={`h-1 bg-[#E1306C] transition-all ${currentView === link.id ? 'w-20' : 'w-0'}`} />
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-4 pb-12">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
              className="w-full py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-[#0a0a0a] border border-gray-100 flex items-center justify-center gap-4 bg-white"
            >
              <Globe size={16} className="text-[#E1306C]" />
              {language === 'EN' ? 'Switch Language' : 'භාෂාව වෙනස් කරන්න'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
