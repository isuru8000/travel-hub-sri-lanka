
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
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Waterfall Background - Set to show fully (High Opacity) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-1000 pointer-events-none" 
        style={{ 
          backgroundImage: `url('https://media.istockphoto.com/id/822563612/photo/waterfall.webp?a=1&b=1&s=612x612&w=0&k=20&c=hBcdOefGG4mpu6iWZaxcob0h9p_b1Rl8muZqHE9bd-w=')`
        }}
      />
      
      {/* Minimal Overlay for Text Legibility only */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      
      {/* Archive Meta-Data (Charcoal Theme) - Standard Casing Labels */}
      <div className="absolute top-48 left-12 hidden lg:flex flex-col gap-4 opacity-40">
        <div className="flex items-center gap-3 text-[#0a0a0a] text-[9px] font-black uppercase tracking-[0.6em]">
          <Database size={14} />
          SL-REF: 001/HERITAGE
        </div>
        <div className="h-px w-32 bg-black/20" />
      </div>

      <div className="absolute top-48 right-12 hidden lg:flex flex-col items-end gap-4 opacity-40">
        <div className="flex items-center gap-3 text-[#0a0a0a] text-[9px] font-black uppercase tracking-[0.6em]">
          CLASSIFICATION: ANCIENT
          <Hash size={14} />
        </div>
        <div className="h-px w-32 bg-black/20" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto text-center px-8 space-y-16">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="inline-flex items-center gap-5 px-8 py-3 rounded-2xl bg-white/60 backdrop-blur-3xl border border-black/10 text-[#0a0a0a] text-[10px] font-black uppercase tracking-[0.6em] mb-6 shadow-xl">
            <span className="w-2 h-2 bg-[#E1306C] rounded-full animate-pulse shadow-[0_0_15px_#E1306C]"></span>
            {language === 'EN' ? 'The Heritage Archive' : 'සංරක්ෂණාගාරය'}
          </div>
          
          <h1 className="text-6xl md:text-[10rem] font-heritage font-black leading-[0.9] tracking-tighter text-[#0a0a0a] drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)]">
            {language === 'EN' ? (
              <>
                <span className="block">Discover True Beauty</span>
                <span className="block italic insta-text-gradient">of Sri Lanka</span>
              </>
            ) : (
              <>
                <span className="block">ශ්‍රී ලංකාවේ සැබෑ</span>
                <span className="block italic insta-text-gradient">සුන්දරත්වය සොයා ගන්න</span>
              </>
            )}
          </h1>
          
          <p className="text-xl md:text-3xl text-[#1a1a1a] font-bold max-w-4xl mx-auto leading-relaxed opacity-100 tracking-tight italic drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
            {language === 'EN' 
              ? "Cataloguing the sacred memories of a 2,500-year-old civilization." 
              : "වසර 2,500 ක ශිෂ්ටාචාරයක පූජනීය මතකයන් පෙළගැස්ම."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-12 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <button 
            onClick={() => setView('destinations')}
            className="group relative flex items-center gap-12 px-20 py-10 bg-[#0a0a0a] rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-110 active:scale-95 hover:shadow-[0_50px_120px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col items-start text-left leading-none">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.6em] mb-2">SYNC REALITY</span>
              <span className="text-2xl font-black text-white uppercase tracking-[0.1em]">
                {UI_STRINGS.exploreDestinations[language]}
              </span>
            </div>
            
            <div className="w-20 h-20 rounded-[1.5rem] bg-white flex items-center justify-center text-[#E1306C] transition-all duration-1000 group-hover:rotate-[360deg] shadow-2xl">
              <Compass size={40} className="text-[#E1306C]" />
            </div>
          </button>
        </div>
      </div>

      {/* Radiant Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-80 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-[1em] drop-shadow-md">SCAN ARCHIVES</span>
        <div className="w-[2px] h-24 bg-gradient-to-b from-[#E1306C] via-gray-400 to-transparent rounded-full shadow-lg" />
      </div>

      {/* Pure White Grounding Mask (Fades the image into the white page) */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
