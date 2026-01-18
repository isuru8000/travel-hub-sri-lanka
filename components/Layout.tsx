import React from 'react';
import Navbar from './Navbar.tsx';
import { Language } from '../types.ts';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  language: Language;
  setLanguage: (lang: Language) => void;
  setView: (view: 'home' | 'destinations' | 'about' | 'foods') => void;
  currentView: string;
}

const Layout: React.FC<LayoutProps> = ({ children, language, setLanguage, setView, currentView }) => {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#fafafa]">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        setView={setView} 
        currentView={currentView}
      />
      
      <main className="flex-grow pt-16">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 text-[#262626] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex flex-col items-start leading-none mb-4">
              <h2 className="text-2xl font-heritage font-bold insta-text-gradient">Travel Hub</h2>
              <span className="text-sm font-heritage font-medium text-gray-400 lowercase tracking-widest mt-1">sri lanka</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Where ancient memories meet modern journeys. We promote the heritage and beauty of our pearl in the Indian Ocean.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-heritage font-bold text-[#262626] border-b border-gray-100 pb-2 uppercase tracking-widest text-xs">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-semibold">
              <li><button onClick={() => setView('about')} className="hover:text-[#E1306C] transition-colors text-left w-full">About Lanka</button></li>
              <li><button onClick={() => setView('destinations')} className="hover:text-[#E1306C] transition-colors text-left w-full">Destinations</button></li>
              <li><button onClick={() => setView('home')} className="hover:text-[#E1306C] transition-colors text-left w-full">Home</button></li>
              <li><a href="#" className="hover:text-[#E1306C] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-heritage font-bold text-[#262626] border-b border-gray-100 pb-2 uppercase tracking-widest text-xs">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-semibold">
              <li className="flex items-center gap-2"><MapPin size={16} className="text-[#E1306C]" /> Colombo 07, Sri Lanka</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-[#E1306C]" /> +94 11 234 5678</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-[#E1306C]" /> info@travelhubsl.com</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-heritage font-bold text-[#262626] border-b border-gray-100 pb-2 uppercase tracking-widest text-xs">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-gray-200 rounded-full hover:story-ring hover:text-white transition-all text-[#262626]" title="Instagram"><Instagram size={20} /></a>
              <a href="#" className="p-2 border border-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition-all text-[#262626]" title="Facebook"><Facebook size={20} /></a>
              <a href="https://youtube.com/@travelhubsl" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-200 rounded-full hover:bg-red-600 hover:text-white transition-all text-[#262626]" title="YouTube"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <p>Travel Hub Sri Lanka © 2026. Ancient Soul, Modern Style.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;