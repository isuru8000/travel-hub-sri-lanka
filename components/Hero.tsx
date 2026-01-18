
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  language: Language;
  setView: (view: 'home' | 'destinations' | 'about' | 'foods') => void;
}

const Hero: React.FC<HeroProps> = ({ language, setView }) => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background with multiple layers for a heritage feel */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110 opacity-70" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 pattern-overlay" />

      <div className="relative max-w-4xl mx-auto text-center px-6 space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heritage font-bold text-white leading-tight drop-shadow-2xl">
          {UI_STRINGS.heroTitle[language]}
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-lg">
          {language === 'EN' 
            ? "Journey through time, from sacred ruins to sun-drenched shores." 
            : "ශුද්ධ වූ නටබුන් වල සිට හිරු රශ්මියෙන් නැහැවුණු වෙරළ තීරයන් දක්වා කාලය හරහා ගමනක්."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => setView('destinations')}
            className="w-full sm:w-auto px-8 py-4 story-ring text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl"
          >
            {UI_STRINGS.exploreDestinations[language]}
            <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => setView('destinations')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-[#262626] font-bold rounded-xl border border-white hover:bg-gray-100 transition-all shadow-lg"
          >
            {UI_STRINGS.planYourTrip[language]}
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;