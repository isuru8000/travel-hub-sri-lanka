
import React from 'react';
import Navbar from './Navbar.tsx';
import { Language } from '../types.ts';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import { User } from '../App.tsx';

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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          <div className="space-y-6">
            <div className="flex flex-col items-start leading-none">
              <h2 className="text-3xl font-heritage font-black insta-text-gradient tracking-tight">Travel Hub</h2>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] mt-2 pl-0.5">sri lanka</span>
            </div>
            <p className="text-base text-gray-500 leading-relaxed font-medium italic">
              Where ancient memories meet modern journeys. We promote the heritage and beauty of our pearl in the Indian Ocean.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-[0.4em] border-b border-gray-50 pb-4">Archives</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase tracking-widest">
              <li><button onClick={() => setView('home')} className="hover:text-[#E1306C] transition-colors text-left w-full">Home Archive</button></li>
              <li><button onClick={() => setView('destinations')} className="hover:text-[#E1306C] transition-colors text-left w-full">Reality Portals</button></li>
              <li><button onClick={() => setView('vr-showcase')} className="hover:text-[#E1306C] transition-colors text-left w-full">3D Spatial Hub</button></li>
              <li><button onClick={() => setView('memories')} className="hover:text-[#E1306C] transition-colors text-left w-full">Public Journal</button></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-[0.4em] border-b border-gray-50 pb-4">Transmission</h3>
            <div className="flex gap-5">
              <a 
                href="#" 
                className="w-12 h-12 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent transition-all text-gray-400" 
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all text-gray-400" 
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://youtube.com/@travelhublk-123" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-[#FF0000] hover:text-white hover:border-transparent transition-all text-gray-400" 
                title="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-gray-50 text-center text-[9px] font-black text-gray-200 uppercase tracking-[0.6em]">
          <p>Travel Hub Sri Lanka • Heritage Archive Protocol v2.4 • 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
