
import React, { useState, useEffect } from 'react';
import { Language, User } from '../types.ts';
import { 
  Menu, 
  X, 
  Globe, 
  LogIn, 
  LogOut, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  BedDouble, 
  Map, 
  Zap, 
  Database, 
  Signal, 
  Activity, 
  Wallet, 
  Mountain, 
  Utensils, 
  Music, 
  Target, 
  ShoppingCart, 
  Users,
  Sprout,
  PartyPopper,
  MessageSquare,
  PawPrint,
  Backpack,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setView: (view: any) => void;
  currentView: string;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const TravelHubLogo = ({ size = 48, className = "" }) => (
  <div className={`relative group/logo-svg ${className}`}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_30px_rgba(40,90,235,0.6)] transition-all duration-700 group-hover/logo-svg:scale-110">
      {/* Outer Tech Rings - Expanded */}
      <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.5" className="text-gray-200/10" />
      <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="4 12" className="animate-spin-slow" />
      
      {/* Expanded Network Neural Mesh Connections */}
      <g className="opacity-80">
        {/* Core to Edge Connections */}
        <line x1="50" y1="50" x2="50" y2="15" stroke="white" strokeWidth="1" className="animate-pulse" />
        <line x1="50" y1="50" x2="15" y2="45" stroke="white" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
        <line x1="50" y1="50" x2="85" y2="45" stroke="white" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
        <line x1="50" y1="50" x2="30" y2="80" stroke="white" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
        <line x1="50" y1="50" x2="70" y2="80" stroke="white" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.6s' }} />
        
        {/* Perimeter Mesh */}
        <line x1="50" y1="15" x2="15" y2="45" stroke="white" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="15" y1="45" x2="30" y2="80" stroke="white" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="30" y1="80" x2="70" y2="80" stroke="white" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="70" y1="80" x2="85" y2="45" stroke="white" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="85" y1="45" x2="50" y2="15" stroke="white" strokeWidth="0.6" strokeDasharray="2 2" />
      </g>

      {/* Enlarged Network Nodes */}
      <circle cx="50" cy="15" r="4" fill="white" className="animate-pulse shadow-glow-white" />
      <circle cx="15" cy="45" r="3.5" fill="white" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
      <circle cx="85" cy="45" r="3.5" fill="white" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
      <circle cx="30" cy="80" r="4" fill="white" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
      <circle cx="70" cy="80" r="4" fill="white" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
      
      {/* Massive Core Hub Node */}
      <circle cx="50" cy="50" r="8" fill="url(#hub_core_grad)" className="animate-pulse shadow-glow-blue" />
      <circle cx="50" cy="50" r="5" fill="white" className="animate-ping opacity-60" />

      {/* Bold Blue Line Sweep - Max Visibility */}
      <circle 
        cx="50" cy="50" r="44" 
        stroke="#285AEB" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeDasharray="60 220"
        className="animate-blue-line-sweep"
        filter="url(#blue_glow)"
      />
      
      {/* Inner Rapid Pulse Orbit */}
      <circle 
        cx="50" cy="50" r="32" 
        stroke="#E1306C" 
        strokeWidth="1" 
        strokeDasharray="5 150"
        className="animate-blue-line-sweep-reverse opacity-80"
      />

      <defs>
        <filter id="blue_glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="hub_core_grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#285AEB" />
          <stop offset="70%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
    </svg>
    
    <div className="absolute -inset-6 bg-blue-500/10 blur-[40px] rounded-full opacity-0 group-hover/logo-svg:opacity-100 transition-opacity duration-1000" />
    
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes blue-line-sweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes blue-line-sweep-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      .animate-blue-line-sweep {
        transform-origin: center;
        animation: blue-line-sweep 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      .animate-blue-line-sweep-reverse {
        transform-origin: center;
        animation: blue-line-sweep-reverse 1.5s linear infinite;
      }
      .animate-spin-slow {
        animation: spin 15s linear infinite;
      }
      .shadow-glow-blue {
        filter: drop-shadow(0 0 12px #285AEB);
      }
      .shadow-glow-white {
        filter: drop-shadow(0 0 8px rgba(255,255,255,1));
      }
    `}} />
  </div>
);

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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: any, anchor?: string) => {
    setLastClicked(view);
    setTimeout(() => setLastClicked(null), 500);
    
    setView(view);
    setIsOpen(false);
    setActiveDropdown(null);

    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    } else if (view === currentView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: language === 'EN' ? 'Home' : 'මුල් පිටුව' },
    { id: 'destinations', label: language === 'EN' ? 'Reality' : 'යථාර්ථය' },
    { 
      id: 'heritage', 
      label: language === 'EN' ? 'HERITAGE' : 'උරුමය', 
      hasDropdown: true,
      anchor: 'heritage-hub',
      items: [
        { id: 'destinations', label: language === 'EN' ? 'Wildlife' : 'වනජීවී', icon: <PawPrint size={14} /> },
        { id: 'hiking', label: language === 'EN' ? 'Heritage Hiking' : 'උරුම කඳු තරණය', icon: <Mountain size={14} /> },
        { id: 'foods', label: language === 'EN' ? 'Food Heritage' : 'ආහාර උරුමය', icon: <Utensils size={14} /> },
        { id: 'music', label: language === 'EN' ? 'Ancient Music' : 'පැරණි සංගීතය', icon: <Music size={14} /> },
        { id: 'medicine', label: language === 'EN' ? 'Hela Wedakama' : 'හෙළ වෙදකම', icon: <Activity size={14} /> },
        { id: 'tea', label: language === 'EN' ? 'Tea Trails' : 'තේ සංස්කෘතිය', icon: <Sprout size={14} /> },
        { id: 'festivals', label: language === 'EN' ? 'Festivals' : 'සංස්කෘතික උත්සව', icon: <PartyPopper size={14} /> },
        { id: 'phrases', label: language === 'EN' ? 'Local Language' : 'දේශීය භාෂාව', icon: <MessageSquare size={14} /> },
        { id: 'essentials', label: language === 'EN' ? 'Travel Guide' : 'සංචාරක උපදෙස්', icon: <Backpack size={14} /> },
        { id: 'quiz', label: language === 'EN' ? 'Travel Quiz' : 'සංචාරක ප්‍රශ්න විචාරාත්මක', icon: <HelpCircle size={14} /> },
      ]
    },
    { 
      id: 'marketplace', 
      label: language === 'EN' ? 'BOOKING' : 'වෙන්කිරීම්', 
      premium: true,
      hasDropdown: true,
      items: [
        { id: 'marketplace', label: language === 'EN' ? 'Portal Dashboard' : 'ප්‍රධාන පුවරුව', icon: <Target size={14} /> },
        { id: 'marketplace', label: language === 'EN' ? 'Heritage Stays' : 'පෞරාණික ලැගුම්හල්', anchor: 'heritage-stays', icon: <BedDouble size={14} /> },
        { id: 'marketplace', label: language === 'EN' ? 'Expeditions' : 'වික්‍රමාන්විත චාරිකා', anchor: 'luxury-expeditions', icon: <Map size={14} /> }
      ]
    },
    { id: 'shop', label: language === 'EN' ? 'STORE' : 'වෙළඳසැල', icon: <ShoppingCart size={11} /> },
    { id: 'community', label: language === 'EN' ? 'COMMUNITY' : 'සමූහය', highlight: true, icon: <Users size={11} /> }
  ];

  return (
    <div className={`fixed left-0 right-0 z-[70] transition-all duration-1000 flex justify-center pointer-events-none ${scrolled ? 'top-2' : 'top-6'}`}>
      <nav className={`transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex items-center justify-between px-4 md:px-8 w-[96%] max-w-[1700px] py-3 bg-black/70 backdrop-blur-[60px] rounded-full border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] pointer-events-auto group/nav ${
        scrolled ? 'scale-100 py-2.5 bg-black/85' : 'scale-[1.01] py-4'
      }`}>
        <div className="absolute inset-0 rounded-full border-t border-white/25 pointer-events-none" />
        <div className="absolute inset-0 rounded-full border-b border-black/40 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity duration-1000 animate-nav-scan" />

        <div className="flex items-center gap-5">
          <button 
            onClick={() => handleNav('home')}
            className={`flex items-center gap-4 group/logo transition-transform ${lastClicked === 'home' ? 'animate-nav-bounce' : ''}`}
          >
            <TravelHubLogo />
            
            <div className="hidden sm:flex flex-col items-start leading-none gap-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              <span className="font-heritage font-black text-[14px] md:text-[18px] uppercase tracking-[0.3em] text-white brightness-125">Travel Hub</span>
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-[#E1306C] rounded-full animate-ping shadow-[0_0_8px_#E1306C]" />
                 <span className="font-black text-[8px] uppercase tracking-[0.6em] text-white/50">Sri Lanka • v4.5</span>
              </div>
            </div>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 shadow-inner backdrop-blur-2xl">
          {navLinks.map((link) => (
            <div 
              key={link.id} 
              className="relative"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleNav(link.anchor ? 'home' : link.id, link.anchor)} 
                className={`px-6 py-2.5 rounded-full flex items-center gap-3 transition-all duration-500 relative group/link ${
                  currentView === link.id ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {currentView === link.id && (
                  <div className="absolute inset-0 bg-white/15 border border-white/20 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] animate-in fade-in zoom-in duration-500" />
                )}
                
                <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] transition-all relative z-10 flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  currentView === link.id ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'group-hover/link:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                }`}>
                  {link.premium && <Zap size={11} className={`${currentView === link.id ? 'text-yellow-400 drop-shadow-[0_0_10px_#facc15]' : 'text-yellow-400/50 group-hover:text-yellow-400'}`} />}
                  {link.highlight && <Signal size={11} className={`${currentView === link.id ? 'text-[#E1306C] drop-shadow-[0_0_10px_#E1306C]' : 'text-[#E1306C]/50 group-hover:text-[#E1306C]'}`} />}
                  {link.icon && <span className="text-[#E1306C]">{link.icon}</span>}
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={14} className={`transition-transform duration-500 ${activeDropdown === link.id ? 'rotate-180 text-white' : 'opacity-40'} group-hover:opacity-100`} />
                  )}
                </span>
              </button>

              {link.hasDropdown && activeDropdown === link.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 w-80 animate-in fade-in slide-in-from-top-3 duration-500">
                  <div className="bg-black/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_50px_120px_rgba(0,0,0,0.9)] border border-white/20 overflow-hidden p-4 max-h-[80vh] overflow-y-auto no-scrollbar">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/15 via-transparent to-blue-500/15 pointer-events-none" />
                    {link.items?.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id, item.anchor)}
                        className="w-full flex items-center gap-6 px-6 py-5 hover:bg-white/10 rounded-3xl transition-all group/item text-left border border-transparent hover:border-white/10"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 group-hover/item:bg-[#E1306C] group-hover/item:text-white transition-all shadow-inner border border-white/10 group-hover/item:shadow-[0_0_20px_rgba(225,48,108,0.4)]">
                          {item.icon}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 group-hover/item:text-white group-hover/item:translate-x-2 transition-all drop-shadow-lg">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className="hidden sm:flex items-center gap-3 px-6 py-3 rounded-2xl transition-all text-[11px] font-black uppercase tracking-[0.4em] bg-white/10 hover:bg-white/25 text-white border border-white/20 active:scale-90 shadow-xl drop-shadow-xl"
          >
            <Globe size={16} className="text-[#E1306C] drop-shadow-[0_0_8px_#E1306C]" />
            <span className="drop-shadow-md brightness-150">{language}</span>
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-4 p-2 pr-8 rounded-full bg-white/15 border border-white/30 hover:border-white/50 hover:bg-white/20 transition-all active:scale-95 group/user shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full border border-[#E1306C] shadow-[0_0_20px_rgba(225,48,108,0.5)] overflow-hidden group-hover/user:scale-110 transition-transform">
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:flex flex-col items-start drop-shadow-lg">
                   <span className="text-[10px] font-black uppercase tracking-widest text-white brightness-125">{user.name.split(' ')[0]}</span>
                   <span className="text-[7px] font-bold text-green-400 uppercase tracking-[0.3em] animate-pulse">Uplink_Live</span>
                </div>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-5 w-80 bg-black/95 backdrop-blur-3xl rounded-[3rem] shadow-[0_60px_150px_rgba(0,0,0,1)] border border-white/20 py-8 animate-in fade-in slide-in-from-top-4 duration-500 z-[80]">
                  <div className="px-10 py-5 border-b border-white/10 mb-3">
                    <p className="text-[14px] font-black text-white uppercase tracking-widest drop-shadow-lg">{user.name}</p>
                    <p className="text-[10px] text-white/50 font-bold tracking-tight truncate uppercase mt-1">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-5 px-10 py-6 text-[12px] font-black text-red-400 hover:bg-red-500/15 transition-all uppercase tracking-[0.5em] drop-shadow-lg"
                  >
                    <LogOut size={18} />
                    Terminate_Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLogin}
              title={language === 'EN' ? "Portal Login" : "පිවිසුමට"}
              className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white text-black rounded-full transition-all duration-700 hover:scale-115 active:scale-90 shadow-[0_0_50px_rgba(255,255,255,0.5)] group/login overflow-hidden border border-white/60"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C] via-purple-500 to-blue-500 opacity-0 group-hover/login:opacity-30 transition-opacity duration-1000" />
              <LogIn size={24} className="relative z-10 transition-transform group-hover/login:translate-x-1 group-hover:-translate-y-1 md:w-7 md:h-7 drop-shadow-md" />
            </button>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-white/15 border border-white/30 text-white transition-all active:scale-90 hover:bg-white/25 shadow-xl"
          >
            {isOpen ? <X size={28} className="drop-shadow-xl" /> : (
              <div className="space-y-1.5 drop-shadow-xl">
                <div className="w-7 h-0.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                <div className="w-5 h-0.5 bg-[#E1306C] rounded-full shadow-[0_0_8px_#E1306C]"></div>
              </div>
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-[80px] z-[60] flex flex-col p-10 pt-40 animate-in fade-in slide-in-from-top-10 duration-700 pointer-events-auto">
          <div className="absolute top-0 right-0 p-40 opacity-[0.05] text-white pointer-events-none">
            <Database size={500} />
          </div>
          
          <div className="flex flex-col gap-12 overflow-y-auto no-scrollbar pb-16 relative z-10">
            {navLinks.map((link, i) => (
              <div key={link.id} className="space-y-8">
                <button 
                  onClick={() => !link.hasDropdown ? handleNav(link.id) : setActiveDropdown(activeDropdown === link.id ? null : link.id)} 
                  className={`group flex items-center justify-between w-full transition-all duration-700 ${
                    currentView === link.id ? 'translate-x-6' : ''
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className={`text-4xl sm:text-7xl font-heritage font-bold transition-all flex items-center gap-8 drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${
                    currentView === link.id ? 'text-white brightness-150' : 'text-white/30 hover:text-white/50'
                  }`}>
                    {link.premium && <Zap size={32} className="text-yellow-400 animate-pulse shadow-yellow-400" />}
                    {link.label}
                  </span>
                  {link.hasDropdown && <ChevronDown size={32} className={`text-white/30 transition-transform duration-500 ${activeDropdown === link.id ? 'rotate-180 text-[#E1306C]' : ''}`} />}
                </button>
                
                {link.hasDropdown && activeDropdown === link.id && (
                  <div className="flex flex-col gap-10 pl-10 animate-in fade-in slide-in-from-left-8 duration-700">
                    {link.items?.map((item) => (
                      <button 
                        key={item.id} 
                        onClick={() => handleNav(item.id, item.anchor)}
                        className="flex items-center gap-8 text-3xl font-bold text-white/50 hover:text-white transition-all group/item"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E1306C] shadow-[0_0_20px_#E1306C] group-hover/item:scale-200 transition-transform" />
                        <span className="uppercase tracking-[0.3em] drop-shadow-2xl">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-8 pb-12 relative z-10">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
              className="w-full py-10 rounded-[3rem] text-[13px] font-black uppercase tracking-[0.7em] text-white border border-white/20 flex items-center justify-center gap-8 bg-white/5 active:scale-95 transition-all shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
            >
              <Globe size={32} className="text-[#E1306C] animate-spin-slow drop-shadow-[0_0_15px_#E1306C]" />
              <span className="drop-shadow-xl brightness-150">{language === 'EN' ? 'RECODE LANGUAGE' : 'භාෂාව වෙනස් කරන්න'}</span>
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nav-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.95); }
        }
        .animate-nav-bounce {
          animation: nav-bounce 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes nav-scan {
          0% { transform: translateX(-150%) scaleX(0.4); opacity: 0; }
          50% { opacity: 0.9; }
          100% { transform: translateX(100%) scaleX(0.4); opacity: 0; }
        }
        .animate-nav-scan {
          animation: nav-scan 6s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Navbar;
