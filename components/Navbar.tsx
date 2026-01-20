
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Menu, X, Globe, LogIn, LogOut, ChevronRight, Sparkles } from 'lucide-react';
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
    { id: 'home', label: language === 'EN' ? 'Archive' : 'පෙළගැස්ම' },
    { id: 'destinations', label: language === 'EN' ? 'Portals' : 'පිවිසුම්' },
    { id: 'vr-showcase', label: language === 'EN' ? '3D Spaces' : 'ත්‍රිමාණ', vipsOnly: true },
    { id: 'memories', label: language === 'EN' ? 'Journal' : 'සටහන්' },
  ];

  return (
    <div className={`fixed left-0 right-0 z-[70] transition-all duration-1000 flex justify-center ${scrolled ? 'top-4' : 'top-0'}`}>
      <nav className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex items-center justify-between px-6 md:px-10 ${
        scrolled 
          ? 'w-[95%] md:w-[85%] max-w-7xl py-3.5 bg-white/95 backdrop-blur-[40px] rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.18)] border border-gray-100' 
          : 'w-full py-10 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
      }`}>
        
        {/* Branding - Left Anchor */}
        <button 
          onClick={() => handleNav('home')}
          className="flex items-center gap-4 group relative z-10"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-[#E1306C]/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className={`relative w-11 h-11 story-ring rounded-[14px] p-[2.5px] transition-transform duration-500 group-hover:scale-110 ${scrolled ? 'shadow-lg' : 'shadow-2xl'}`}>
              <div className="bg-white w-full h-full rounded-[12px] flex items-center justify-center">
                <span className="insta-text-gradient font-heritage font-black text-2xl">L</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
            <span className={`font-heritage font-black text-[14px] uppercase tracking-[0.25em] transition-colors duration-500 ${
              scrolled ? 'text-[#050505]' : 'text-white drop-shadow-lg'
            }`}>
              Travel Hub
            </span>
            <span className={`font-black text-[8px] uppercase tracking-[0.6em] transition-colors duration-500 ${
              scrolled ? 'text-gray-400' : 'text-white/70'
            }`}>
              Sri Lanka
            </span>
          </div>
        </button>

        {/* Navigation Spine - ABSOLUTE CENTER (High Visibility) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 lg:gap-16">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNav(link.id)} 
              className="group relative py-2"
            >
              <span className={`text-[11px] font-black uppercase tracking-[0.55em] transition-all duration-500 ${
                currentView === link.id 
                  ? (scrolled ? 'text-[#050505]' : 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]') 
                  : (scrolled ? 'text-gray-400 hover:text-[#050505]' : 'text-white/40 hover:text-white')
              }`}>
                {link.label}
              </span>
              
              <div className={`absolute -bottom-1.5 left-0 h-[3px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                currentView === link.id 
                  ? 'w-full bg-[#E1306C] shadow-[0_0_15px_#E1306C]' 
                  : 'w-0 bg-transparent'
              }`} />

              {link.vipsOnly && (
                <div className="absolute -top-4 -right-5">
                   <Sparkles size={12} className="text-[#E1306C] animate-pulse" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Interface Cluster - Right Anchor */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 relative z-10">
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest ${
              scrolled 
                ? 'hover:bg-black/5 text-[#050505]' 
                : 'hover:bg-white/10 text-white drop-shadow-md'
            }`}
          >
            <Globe size={15} className="opacity-70" />
            {language}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full transition-all shadow-md ${
                  scrolled ? 'bg-black/5 border border-gray-100' : 'bg-white/10 border border-white/20'
                }`}
              >
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden">
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  scrolled ? 'text-[#050505]' : 'text-white'
                }`}>
                  {user.name.split(' ')[0]}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-5 w-60 bg-white rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.18)] border border-gray-100 py-4 animate-in fade-in slide-in-from-top-4 duration-500 z-[80]">
                  <div className="px-8 py-3 border-b border-gray-50 mb-2">
                    <p className="text-[11px] font-black text-[#050505] uppercase tracking-wider">{user.name}</p>
                    <p className="text-[9px] text-gray-400 font-bold tracking-tight truncate uppercase">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-4 px-8 py-4 text-[10px] font-black text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className={`group relative flex items-center gap-3 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.45em] transition-all active:scale-95 overflow-hidden shadow-2xl ${
                scrolled 
                  ? 'bg-[#050505] text-white' 
                  : 'bg-white text-[#050505]'
              }`}
            >
              Portal
              <ChevronRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 shadow-xl ${
            scrolled ? 'bg-[#050505] text-white' : 'bg-white text-[#050505]'
          }`}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Full-Screen Mobile Archive Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#050505]/98 backdrop-blur-[60px] z-[60] flex flex-col items-center justify-between p-12 pt-40 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col items-center gap-14 w-full">
            {navLinks.map((link, i) => (
              <button 
                key={link.id}
                onClick={() => handleNav(link.id)} 
                className="group flex flex-col items-center gap-4 animate-in slide-in-from-bottom-16 duration-700 fill-mode-forwards"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className={`text-6xl font-heritage font-black transition-all duration-500 ${
                  currentView === link.id ? 'insta-text-gradient scale-110' : 'text-white/20 hover:text-white'
                }`}>
                  {link.label}
                </span>
                <div className={`h-2 w-2 rounded-full bg-[#E1306C] transition-all duration-500 shadow-[0_0_20px_#E1306C] ${
                  currentView === link.id ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
                }`} />
              </button>
            ))}
          </div>

          <div className="w-full max-w-sm space-y-6 pb-10">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
              className="w-full py-5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] text-white flex items-center justify-center gap-4"
            >
              <Globe size={18} className="text-[#E1306C]" />
              {language === 'EN' ? 'Archive Region' : 'ප්‍රාදේශීයකරණය'}
            </button>
            
            <button 
              onClick={onLogin}
              className="w-full py-7 bg-white text-[#050505] rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl"
            >
              {user ? user.name.split(' ')[0] : 'Open Portal'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
