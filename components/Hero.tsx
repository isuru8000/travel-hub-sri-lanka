
import React from 'react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { Compass, ArrowRight } from 'lucide-react';

interface HeroProps {
  language: Language;
  setView: (view: any) => void;
}

const Hero: React.FC<HeroProps> = ({ language, setView }) => {
  return (
    <div className="relative h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background with responsive layout */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70 md:opacity-85 transition-opacity duration-1000 pointer-events-none" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1488215545351-57e673dc3789?q=80&w=2400&auto=format&fit=crop')`
        }}
      />
      
      {/* Deep Overlay Gradients - Now with pointer-events-none to prevent blocking clicks */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent opacity-100 pointer-events-none" />
      
      {/* Heritage Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none" />

      <div className="relative z-20 max-w-5xl mx-auto text-center px-6 space-y-10 md:space-y-12">
        <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <span className="w-1.5 h-1.5 bg-[#E1306C] rounded-full animate-pulse"></span>
            {language === 'EN' ? 'Island Heritage' : 'දිවයිනේ උරුමය'}
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heritage font-bold leading-[1.1] drop-shadow-2xl tracking-tight animate-gradient-text-slow">
            {language === 'EN' ? (
              <>
                <span className="block">Discover True Beauty</span>
                <span className="block italic">of Sri Lanka</span>
              </>
            ) : (
              <>
                <span className="block">ශ්‍රී ලංකාවේ සැබෑ</span>
                <span className="block italic">සුන්දරත්වය සොයා ගන්න</span>
              </>
            )}
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-xl italic leading-relaxed">
            {language === 'EN' 
              ? "Journey through time, from sacred ruins to sun-drenched shores." 
              : "ශුද්ධ වූ නටබුන් වල සිට හිරු රශ්මියෙන් නැහැවුණු වෙරළ තීරයන් දක්වා කාලය හරහා ගමනක්."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          {/* Enhanced High-Visibility "Vibrant Pulse" Button */}
          <button 
            onClick={() => setView('destinations')}
            className="group relative flex items-center gap-6 px-14 py-7 insta-gradient rounded-[2.5rem] shadow-[0_20px_60px_rgba(225,48,108,0.4)] transition-all duration-500 hover:scale-110 active:scale-95 hover:shadow-[0_30px_80px_rgba(225,48,108,0.6)]"
          >
            {/* White Border Overlay for Extra Definition */}
            <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/30 group-hover:border-white/50 transition-colors"></div>
            
            <div className="flex flex-col items-start text-left leading-none">
              <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">Begin Journey</span>
              <span className="text-base font-black text-white uppercase tracking-[0.15em] drop-shadow-sm">
                {UI_STRINGS.exploreDestinations[language]}
              </span>
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#E1306C] transition-transform duration-700 group-hover:rotate-[360deg] shadow-2xl">
              <Compass size={28} className="text-[#E1306C]" />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* Enhanced Bottom Mask - pointer-events-none is crucial here */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
