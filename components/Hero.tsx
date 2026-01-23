
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { Navigation, Target, Activity, ShieldCheck, ChevronDown } from 'lucide-react';

interface HeroProps {
  language: Language;
  setView: (view: any) => void;
}

const Hero: React.FC<HeroProps> = ({ language, setView }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5)
      });
    };
    
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Generate unique spatial nodes for the 3D background
  const spatialNodes = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 800 - 400,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#02040a]">
      
      {/* --- BACKGROUND ANIMATION ENGINE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1500px' }}>
        
        {/* Layer 1: The Mountain Plate (Base) */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-out brightness-[0.35] contrast-[1.3] saturate-[0.8]" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2400&auto=format&fit=crop')`,
            transform: `scale(${1.1 + scrollPos / 3000}) translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, -100px)`,
          }}
        >
          {/* Layer 2: Volumetric Fog/Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a] opacity-90" />
          <div 
            className="absolute inset-0 opacity-40 transition-opacity duration-1000"
            style={{ 
              background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, #2ecc7122 0%, transparent 60%)` 
            }} 
          />
        </div>

        {/* Layer 3: Neural Mesh Protocol (Moving Grid) */}
        <div 
          className="absolute inset-0 opacity-[0.07] transition-transform duration-500 ease-out" 
          style={{ 
            backgroundImage: `linear-gradient(#2ecc71 1px, transparent 1px), linear-gradient(90deg, #2ecc71 1px, transparent 1px)`, 
            backgroundSize: '120px 120px', 
            transform: `rotateX(65deg) translateY(${scrollPos * 0.1}px) translateZ(-200px) scale(2.5)`,
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
          }} 
        />

        {/* Layer 4: Vertical Scanline HUD Animation */}
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#2ecc71]/40 to-transparent shadow-[0_0_30px_#2ecc71] animate-scan-hud z-10" />

        {/* Layer 5: Data Nodes (Particles) */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0)` }}
        >
          {spatialNodes.map((node) => (
            <div 
              key={node.id}
              className="absolute bg-white rounded-full animate-pulse-slow shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                opacity: node.opacity,
                transform: `translateZ(${node.z}px)`,
                animation: `float-node ${node.duration}s linear infinite`,
                animationDelay: `${node.delay}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* --- CONTENT OVERLAY --- */}
      <div className="relative z-30 max-w-6xl w-full px-8 flex flex-col items-center text-center">
        
        {/* Protocol Metadata (Top Badge) */}
        <div className="flex flex-col items-center gap-4 mb-14 animate-in fade-in slide-in-from-top-8 duration-1000">
           <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-green-400 text-[9px] font-black uppercase tracking-[0.5em] shadow-[0_0_40px_rgba(46,204,113,0.2)]">
             <Activity size={14} className="animate-pulse" />
             ARCHIVE_SYNC_V3.1 ACTIVE
           </div>
           <div className="h-10 w-px bg-gradient-to-b from-green-500/50 to-transparent"></div>
        </div>
        
        {/* Main Heading Group */}
        <div className="space-y-0 mb-12 animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <h1 
            className="text-4xl sm:text-6xl md:text-[6.5rem] font-heritage font-bold leading-[0.8] tracking-tight text-white uppercase"
            style={{ textShadow: '0 15px 45px rgba(0,0,0,0.8)' }}
          >
            {language === 'EN' ? (
              <>
                <span className="block opacity-90 mb-4 tracking-[0.05em]">Discover the</span>
                <span className="block font-script text-6xl sm:text-8xl md:text-[9.5rem] text-[#2ecc71] lowercase normal-case tracking-normal -mt-3 sm:-mt-6 md:-mt-8 drop-shadow-glow">Sri Lanka</span>
              </>
            ) : (
              <>
                <span className="block opacity-90 mb-3 tracking-[0.05em]">ලංකා ආත්මය</span>
                <span className="block font-script text-6xl sm:text-8xl md:text-[9.5rem] text-[#2ecc71] -mt-3 sm:-mt-6 md:-mt-8 drop-shadow-glow">සොයා යන්න.</span>
              </>
            )}
          </h1>
        </div>
        
        {/* Subtitle / Descriptive Text */}
        <p className="text-base md:text-xl text-white/50 font-light max-w-2xl leading-relaxed mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 italic">
          {language === 'EN' 
            ? "Access the ultimate digital gateway to ancient heritages, sapphire waters, and the futuristic luxury of our island protocol." 
            : "පුරාණ උරුමයන්, නිල්වන් සාගරය සහ දිවයිනේ අනාගත සුඛෝපභෝගී අත්දැකීම් වෙත පිවිසෙන පරම ඩිජිටල් ද්වාරය."}
        </p>

        {/* Action Controls - Glassmorphism Style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
          <button 
            onClick={() => setView('destinations')}
            className="group relative px-14 py-5 bg-white text-[#0a0a0a] rounded-full font-black text-[11px] uppercase tracking-[0.5em] transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_25px_60px_rgba(255,255,255,0.2)] animate-radiant-pulse"
          >
            <span className="relative z-10">{language === 'EN' ? 'Explore Destinations' : 'ගමනාන්ත ගවේෂණය'}</span>
          </button>

          <button 
            onClick={() => setView('vr-showcase')}
            className="group relative px-14 py-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full font-black text-[11px] text-white uppercase tracking-[0.5em] transition-all duration-500 hover:bg-white/15 hover:border-white/30 active:scale-95 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 flex items-center gap-4">
              3D Registry
              <ShieldCheck size={16} className="text-green-500 opacity-60" />
            </span>
          </button>
        </div>
      </div>

      {/* Atmospheric Bottom Decoration */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 transition-all duration-1000 z-40 ${scrollPos > 100 ? 'opacity-0' : 'opacity-30'}`}>
        <span className="text-[8px] font-black text-white uppercase tracking-[1em] ml-1 animate-pulse">Sync_Scroll</span>
        <div className="relative h-16 w-px overflow-hidden">
           <div className="absolute inset-0 bg-white/20"></div>
           <div className="absolute top-0 left-0 w-full h-1/2 bg-green-500 animate-scroll-indicator"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-node {
          0% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-30px) translateZ(100px); }
          100% { transform: translateY(0) translateZ(0); }
        }
        @keyframes scan-hud {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes radiant-pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { box-shadow: 0 0 0 25px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .animate-scan-hud {
          animation: scan-hud 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
        .animate-radiant-pulse {
          animation: radiant-pulse 2s infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 15px rgba(46,204,113,0.6));
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />
    </div>
  );
};

export default Hero;
