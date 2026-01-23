
import React from 'react';
import Navbar from './Navbar.tsx';
import { Language, User } from '../types.ts';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, ShieldCheck, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  language: Language;
  setLanguage: (lang: Language) => void;
  setView: (view: any) => void;
  currentView: string;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const HeritageBadge = () => (
  <div className="relative group/badge">
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#0a0a0a" stroke="url(#badge_grad)" strokeWidth="2" />
      <path d="M50 20C40 20 30 30 30 50C30 70 40 80 50 80C60 80 70 70 70 50C70 30 60 20 50 20Z" stroke="#E1306C" strokeWidth="1" strokeDasharray="4 2" />
      <text x="50" y="55" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold" fontFamily="serif">S</text>
      <path d="M40 85L50 75L60 85" stroke="#f09433" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="badge_grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E1306C" />
          <stop offset="1" stopColor="#f09433" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute -inset-1 border border-white/10 rounded-full animate-ping opacity-20" />
  </div>
);

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  language, 
  setLanguage, 
  setView, 
  currentView,
  user,
  onLogin,
  onLogout
}) => {
  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        setView={setView} 
        currentView={currentView}
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 text-[#0a0a0a] pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-6">
              <HeritageBadge />
              <div className="flex flex-col items-start leading-none">
                <h2 className="text-3xl font-heritage font-black insta-text-gradient tracking-tight">Travel Hub</h2>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mt-2 pl-0.5">official heritage registry</span>
              </div>
            </div>
            <p className="text-lg text-gray-500 leading-relaxed font-medium italic max-w-md">
              Where ancient memories meet modern journeys. We promote the heritage and beauty of our pearl in the Indian Ocean through high-fidelity archival technology.
            </p>
            <div className="flex items-center gap-3 py-4 px-6 bg-gray-50 rounded-2xl border border-gray-100 w-fit">
              <ShieldCheck size={18} className="text-green-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Verified Destination Partner 2026</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h3 className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-[0.4em] border-b border-gray-50 pb-4">Archives</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest">
              <li><button onClick={() => setView('home')} className="hover:text-[#E1306C] transition-colors text-left w-full flex items-center gap-2"><Sparkles size={12} /> Home Archive</button></li>
              <li><button onClick={() => setView('destinations')} className="hover:text-[#E1306C] transition-colors text-left w-full flex items-center gap-2"><Sparkles size={12} /> Reality Portals</button></li>
              <li><button onClick={() => setView('vr-showcase')} className="hover:text-[#E1306C] transition-colors text-left w-full flex items-center gap-2"><Sparkles size={12} /> 3D Spatial Hub</button></li>
              <li><button onClick={() => setView('memories')} className="hover:text-[#E1306C] transition-colors text-left w-full flex items-center gap-2"><Sparkles size={12} /> Public Journal</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-8">
            <h3 className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-[0.4em] border-b border-gray-50 pb-4">Transmission</h3>
            <div className="flex gap-5">
              <a 
                href="#" 
                className="w-14 h-14 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#fdf497] hover:via-[#d6249f] hover:to-[#285AEB] hover:text-white hover:border-transparent transition-all text-gray-400 shadow-sm" 
                title="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                className="w-14 h-14 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all text-gray-400 shadow-sm" 
                title="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.youtube.com/@TravelHublk-123" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-14 h-14 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-[#FF0000] hover:text-white hover:border-transparent transition-all text-gray-400 shadow-sm" 
                title="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] leading-relaxed">
              SIGNAL STRENGTH: OPTIMAL <br/>
              LOCATION: COLOMBO NODE
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black text-gray-200 uppercase tracking-[0.6em]">Travel Hub Sri Lanka • Heritage Archive Protocol v2.4 • 2026</p>
          <div className="flex gap-8 opacity-20">
             <div className="w-1 h-1 rounded-full bg-black"></div>
             <div className="w-1 h-1 rounded-full bg-black"></div>
             <div className="w-1 h-1 rounded-full bg-black"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
