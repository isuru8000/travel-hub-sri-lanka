
import React from 'react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { Compass, Database, Hash } from 'lucide-react';

interface HeroProps {
  language: Language;
  setView: (view: any) => void;
}

const Hero: React.FC<HeroProps> = ({ language, setView }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      {/* Background with higher definition and deeper contrast */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70 md:opacity-90 transition-opacity duration-1000 pointer-events-none" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1488215545351-57e673dc3789?q=80&w=2400&auto=format&fit=crop')`
        }}
      />
      
      {/* Absolute Dark Gradients for Maximum Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[#020202]/40 backdrop-blur-[1px] pointer-events-none" />
      
      {/* Archive Meta-Data Overlays */}
      <div className="absolute top-40 left-12 hidden lg:flex flex-col gap-4 opacity-30">
        <div className="flex items-center gap-3 text-white text-[9px] font-black uppercase tracking-[0.5em]">
          <Database size={14} />
          SL-REF: 001/HERITAGE
        </div>
        <div className="h-px w-32 bg-white/20" />
      </div>

      <div className="absolute top-40 right-12 hidden lg:flex flex-col items-end gap-4 opacity-30">
        <div className="flex items-center gap-3 text-white text-[9px] font-black uppercase tracking-[0.5em]">
          CLASSIFICATION: ANCIENT
          <Hash size={14} />
        </div>
        <div className="h-px w-32 bg-white/20" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto text-center px-8 space-y-16">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="inline-flex items-center gap-5 px-8 py-3 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.6em] mb-6 shadow-2xl">
            <span className="w-2.5 h-2.5 bg-[#E1306C] rounded-full animate-pulse shadow-[0_0_15px_#E1306C]"></span>
            {language === 'EN' ? 'The Heritage Archive' : 'සංරක්ෂණාගාරය'}
          </div>
          
          <h1 className="text-7xl md:text-[11rem] font-heritage font-black leading-[0.85] tracking-tighter animate-gradient-text-slow drop-shadow-[0_15px_50px_rgba(0,0,0,0.9)]">
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
          
          <p className="text-2xl md:text-4xl text-white font-black max-w-4xl mx-auto italic leading-relaxed opacity-100 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            {language === 'EN' 
              ? "Cataloguing the sacred memories of a 2,500-year-old civilization." 
              : "වසර 2,500 ක ශිෂ්ටාචාරයක පූජනීය මතකයන් පෙළගැස්ම."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-12 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <button 
            onClick={() => setView('destinations')}
            className="group relative flex items-center gap-12 px-20 py-10 insta-gradient rounded-[3.5rem] shadow-[0_30px_100px_rgba(225,48,108,0.6)] transition-all duration-700 hover:scale-110 active:scale-95 hover:shadow-[0_50px_120px_rgba(225,48,108,0.8)]"
          >
            {/* Ultra High-Def Border */}
            <div className="absolute inset-0 rounded-[3.5rem] border-[3px] border-white/40 group-hover:border-white/80 transition-colors"></div>
            
            <div className="flex flex-col items-start text-left leading-none">
              <span className="text-[12px] font-black text-white/80 uppercase tracking-[0.5em] mb-2">Sync Reality</span>
              <span className="text-2xl font-black text-white uppercase tracking-[0.1em] drop-shadow-lg">
                {UI_STRINGS.exploreDestinations[language]}
              </span>
            </div>
            
            <div className="w-20 h-20 rounded-[1.5rem] bg-white flex items-center justify-center text-[#E1306C] transition-all duration-1000 group-hover:rotate-[360deg] shadow-2xl">
              <Compass size={40} className="text-[#E1306C]" />
            </div>
          </button>
        </div>
      </div>

      {/* Cinematic Archive Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[11px] font-black text-white uppercase tracking-[0.8em] drop-shadow-md">Scan Archives</span>
        <div className="w-[3px] h-24 bg-gradient-to-b from-[#E1306C] via-white/50 to-transparent rounded-full shadow-[0_0_15px_rgba(225,48,108,0.3)]" />
      </div>

      {/* Grounding Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
