
import React, { useState } from 'react';
import { Language } from '../types';
import { Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setView: (view: 'home' | 'destinations' | 'about' | 'foods') => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (view: 'home' | 'destinations' | 'about' | 'foods') => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 story-ring rounded-xl flex items-center justify-center shrink-0">
            <div className="bg-white w-full h-full rounded-[10px] flex items-center justify-center">
               <div className="insta-text-gradient font-heritage font-bold text-xl">L</div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none">
            <span className="font-heritage font-bold text-lg text-[#262626]">Travel Hub</span>
            <span className="font-heritage font-medium text-xs text-gray-500 lowercase tracking-wider mt-0.5">sri lanka</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNav('home')} 
            className={`text-sm font-semibold transition-colors ${currentView === 'home' ? 'insta-text-gradient' : 'text-[#262626] hover:text-[#E1306C]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNav('destinations')} 
            className={`text-sm font-semibold transition-colors ${currentView === 'destinations' ? 'insta-text-gradient' : 'text-[#262626] hover:text-[#E1306C]'}`}
          >
            Destinations
          </button>
          <button 
            onClick={() => handleNav('about')} 
            className={`text-sm font-semibold transition-colors ${currentView === 'about' ? 'insta-text-gradient' : 'text-[#262626] hover:text-[#E1306C]'}`}
          >
            About
          </button>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className="flex items-center gap-2 text-sm font-bold text-[#E1306C] hover:opacity-80 transition-opacity"
          >
            <Globe size={16} />
            {language === 'EN' ? 'SI' : 'EN'}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className="text-xs font-bold text-[#E1306C]"
          >
            {language}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#262626]">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4">
          <button onClick={() => handleNav('home')} className="block w-full text-left py-2 text-sm font-bold">Home</button>
          <button onClick={() => handleNav('destinations')} className="block w-full text-left py-2 text-sm font-bold">Destinations</button>
          <button onClick={() => handleNav('about')} className="block w-full text-left py-2 text-sm font-bold">About</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
