
import React from 'react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  language: Language;
  setView: (view: 'home' | 'destinations' | 'about' | 'foods') => void;
}

const Hero: React.FC<HeroProps> = ({ language, setView }) => {
  return (
    <div className="relative h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background with responsive layout - Updated to the requested aerial Mirissa image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70 md:opacity-85" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2400&auto=format&fit=crop')`
        }}
      />
      
      {/* Deep Overlay Gradients for Readability and Seamless Transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#fafafa]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent opacity-100" />
      
      {/* Heritage Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center px-6 space-y-10 md:space-y-12">
        <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <span className="w-1.5 h-1.5 bg-[#E1306C] rounded-full animate-pulse"></span>
            {language === 'EN' ? 'Island Heritage' : 'දිවයිනේ උරුමය'}
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heritage font-bold text-white leading-[0.9] drop-shadow-2xl tracking-tight">
            {UI_STRINGS.heroTitle[language].split(' ').map((word, i) => (
              <span key={i} className={i === 2 || i === 4 ? 'block italic text-white' : 'inline'}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-xl italic leading-relaxed">
            {language === 'EN' 
              ? "Journey through time, from sacred ruins to sun-drenched shores." 
              : "ශුද්ධ වූ නටබුන් වල සිට හිරු රශ්මියෙන් නැහැවුණු වෙරළ තීරයන් දක්වා කාලය හරහා ගමනක්."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <button 
            onClick={() => setView('destinations')}
            className="group relative w-full sm:w-auto px-12 py-5 bg-white text-[#262626] font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 insta-gradient opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="relative z-10 text-[11px] uppercase tracking-[0.3em]">
              {UI_STRINGS.exploreDestinations[language]}
            </span>
            <ChevronRight size={18} className="relative z-10 text-[#E1306C] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* Enhanced Bottom Mask for perfect transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/80 to-transparent" />
    </div>
  );
};

export default Hero;
