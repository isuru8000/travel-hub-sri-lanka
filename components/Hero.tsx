
import React, { useState, useEffect } from 'react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { Compass, Database, Box, Layers, ArrowRight, Sparkles, Globe } from 'lucide-react';

interface HeroProps {
  language: Language;
  setView: (view: any) => void;
}

const Hero: React.FC<HeroProps> = ({ language, setView }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      
      {/* 1. High-Impact Background Image (Waterfall) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105 brightness-[0.6] contrast-[1.1]" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1562089432-b9faf2227db9?q=80&w=2400&auto=format&fit=crop')`,
          transform: `translate3d(${mousePos.x * -0.1}px, ${mousePos.y * -0.1}px, 0) scale(${1.05 + window.scrollY / 5000})`,
        }}
      >
        {/* Clean atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
      </div>

      {/* 2. Subtile Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />

      {/* 3. Hero Content Container - Now Centered */}
      <div className="relative z-30 max-w-5xl w-full px-6 flex flex-col items-center text-center">
        
        {/* Top Label */}
        <div className="flex flex-col items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.8em] drop-shadow-sm">
            {language === 'EN' ? 'ESTABLISHED HERITAGE' : 'ස්ථාපිත උරුමය'}
          </span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-[#E1306C] to-transparent"></div>
        </div>
        
        {/* The Beautiful Two-Line Title */}
        <div className="space-y-4 mb-10 animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] font-heritage font-black leading-[1.1] tracking-tight text-white uppercase">
            {language === 'EN' ? (
              <>
                <span className="block opacity-90">Discover the beauty</span>
                <span className="block italic insta-text-gradient font-medium lowercase md:mt-2">of Sri Lanka</span>
              </>
            ) : (
              <>
                <span className="block opacity-90">ශ්‍රී ලංකාවේ</span>
                <span className="block italic insta-text-gradient md:mt-2">අසිරිමත් සුන්දරත්වය.</span>
              </>
            )}
          </h1>
        </div>
        
        {/* Centered Description */}
        <p className="text-base md:text-xl text-white/60 font-light max-w-2xl leading-relaxed italic mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          {language === 'EN' 
            ? "Journey through high-fidelity archives of an ancient civilization. A synchronized portal to the soul of the Indian Ocean." 
            : "ශ්‍රී ලංකාවේ උරුමය පිළිබඳ උසස් තත්ත්වයේ ලේඛනාගාරයට පිවිසෙන්න. ඉන්දියන් සාගරයේ ආත්මයට විවෘත වූ ද්වාරයකි."}
        </p>

        {/* Centered Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
          <button 
            onClick={() => setView('destinations')}
            className="group relative flex items-center gap-6 px-10 py-5 bg-white rounded-full transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            {/* Animated Ripple Effects */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-portal-ripple pointer-events-none"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-portal-ripple delay-700 pointer-events-none"></div>
            
            {/* Shimmer Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

            <span className="relative z-10 text-[10px] font-black text-[#0a0a0a] uppercase tracking-[0.4em]">Launch Portal</span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white transition-transform group-hover:rotate-45">
              <ArrowRight size={16} />
            </div>
          </button>

          <button 
            onClick={() => setView('vr-showcase')}
            className="group relative flex items-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-500 hover:bg-white/10 active:scale-95"
          >
            <Globe size={16} className="text-[#E1306C] group-hover:rotate-180 transition-transform duration-1000" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">3D Registry</span>
          </button>
        </div>
      </div>

      {/* Floating Info Nodes - Repositioned for center layout */}
      <div className="absolute bottom-12 right-12 hidden xl:flex flex-col items-end gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 delay-1000 opacity-40 hover:opacity-100 transition-opacity">
         <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-right space-y-2 max-w-[200px]">
            <p className="text-[8px] font-bold text-white/60 uppercase tracking-[0.2em] leading-tight">
              SYNCING ARCHIVES...
            </p>
            <div className="flex items-center justify-end gap-2 text-[7px] font-black text-white/30">
               <Database size={10} />
               <span className="tracking-[0.2em]">HUB_01</span>
            </div>
         </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-1000 z-40 ${scrolled ? 'opacity-0 translate-y-10' : 'opacity-100'}`}>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"></div>
        <span className="text-[7px] font-black text-white/30 uppercase tracking-[1.5em] ml-[1.5em]">DESCEND</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        
        @keyframes portal-ripple {
          0% { transform: scale(1); opacity: 0.8; border-width: 2px; }
          100% { transform: scale(1.6); opacity: 0; border-width: 1px; }
        }

        .animate-portal-ripple {
          animation: portal-ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}} />
    </div>
  );
};

export default Hero;
