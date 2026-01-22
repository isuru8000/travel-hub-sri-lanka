
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { Compass, Database, Box, Layers, ArrowRight, Sparkles, Globe, Cpu } from 'lucide-react';

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
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 1000 - 500,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      
      {/* 1. Deep Perspective Wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1200px' }}>
        
        {/* A. Atmospheric Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out brightness-[0.4] contrast-[1.2]" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1562089432-b9faf2227db9?q=80&w=2400&auto=format&fit=crop')`,
            transform: `scale(${1.1 + scrollPos / 5000}) translateZ(-200px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
        </div>

        {/* B. 3D Spatial Grid Floor */}
        <div 
          className="absolute inset-0 opacity-[0.1] transition-transform duration-500 ease-out"
          style={{ 
            backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`, 
            backgroundSize: '80px 80px',
            transform: `rotateX(75deg) translateY(${100 + scrollPos * 0.5}px) translateZ(-400px) scale(4) rotateZ(${mousePos.x * 2}deg)`,
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
          }}
        />

        {/* C. Floating Neural Nodes (Particles) */}
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0)` }}
        >
          {spatialNodes.map((node) => (
            <div 
              key={node.id}
              className="absolute bg-white rounded-full animate-pulse-slow"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                opacity: node.opacity,
                transform: `translateZ(${node.z}px)`,
                boxShadow: `0 0 10px rgba(255,255,255,${node.opacity})`,
                animation: `float-node ${node.duration}s linear infinite`,
                animationDelay: `${node.delay}s`
              }}
            />
          ))}
        </div>

        {/* D. Moving Light Beams / Volumetric Gradients */}
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, #E1306C15 0%, transparent 40%)`,
          }}
        />
        
        {/* E. Holographic Scan Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E1306C]/30 to-transparent animate-scan-line z-10" />
      </div>

      {/* 2. Content Overlay */}
      <div className="relative z-30 max-w-5xl w-full px-6 flex flex-col items-center text-center">
        
        {/* Top Floating Badge */}
        <div className="flex flex-col items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-3">
             <div className="w-2 h-2 bg-[#E1306C] rounded-full animate-ping" />
             <span className="white/80 font-black text-[9px] uppercase tracking-[0.5em]">
               {language === 'EN' ? 'LIVE NEURAL LINK' : 'සජීවී සබඳතාවය'}
             </span>
          </div>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#E1306C] via-[#E1306C]/40 to-transparent"></div>
        </div>
        
        {/* Title with 3D Text Shadow Effect */}
        <div className="space-y-4 mb-10 animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <h1 
            className="text-5xl sm:text-7xl md:text-[6.5rem] font-heritage font-black leading-[1] tracking-tighter text-white uppercase transition-transform duration-300"
            style={{ 
              transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
              textShadow: `${mousePos.x * -10}px ${mousePos.y * -10}px 30px rgba(0,0,0,0.5)`
            }}
          >
            {language === 'EN' ? (
              <>
                <span className="block opacity-95">Discover the</span>
                <span className="block italic insta-text-gradient font-medium lowercase -mt-2">soul of Lanka</span>
              </>
            ) : (
              <>
                <span className="block opacity-95">ලංකා ආත්මය</span>
                <span className="block italic insta-text-gradient -mt-2">සොයා යන්න.</span>
              </>
            )}
          </h1>
        </div>
        
        <p className="text-base md:text-xl text-white/50 font-light max-w-2xl leading-relaxed italic mb-14 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          {language === 'EN' 
            ? "Sync your consciousness with 2,500 years of historical architecture. The registry is ready for your arrival." 
            : "වසර 2,500ක ඉතිහාසය සමඟ ඔබේ විඥානය සම්බන්ධ කරන්න. සංරක්ෂණාගාරය ඔබ වෙනුවෙන් සූදානම්."}
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
          <button 
            onClick={() => setView('destinations')}
            className="group relative flex items-center gap-6 px-12 py-6 bg-white rounded-full transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_30px_80px_rgba(255,255,255,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            <span className="relative z-10 text-[10px] font-black text-[#0a0a0a] uppercase tracking-[0.4em]">Initialize Portal</span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white transition-all group-hover:rotate-45 group-hover:bg-[#E1306C]">
              <ArrowRight size={16} />
            </div>
          </button>

          <button 
            onClick={() => setView('vr-showcase')}
            className="group relative flex items-center gap-5 px-12 py-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full transition-all duration-500 hover:bg-white/10 active:scale-95 shadow-2xl"
          >
            <div className="relative">
              <Globe size={18} className="text-[#E1306C] group-hover:rotate-180 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-[#E1306C]/40 blur-md rounded-full animate-ping group-hover:opacity-100 opacity-0" />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">3D Registry</span>
          </button>
        </div>
      </div>

      {/* Dynamic HUD Details */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end pointer-events-none opacity-40 animate-in fade-in duration-1000 delay-1000">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
               <Cpu size={20} className="animate-pulse" />
            </div>
            <div className="text-left space-y-1">
               <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Core_Processing</p>
               <p className="text-[10px] font-bold text-white/60 tracking-[0.2em]">STABLE_LINK_98%</p>
            </div>
         </div>

         <div className="flex flex-col items-end gap-3">
            <div className="h-0.5 w-32 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-[#E1306C] animate-loading-bar" />
            </div>
            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Streaming Reality Portals...</p>
         </div>
      </div>

      {/* Descend Anchor */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-1000 z-40 ${scrollPos > 50 ? 'opacity-0 translate-y-10' : 'opacity-100'}`}>
        <div className="w-px h-12 bg-gradient-to-b from-[#E1306C] via-[#E1306C]/20 to-transparent animate-bounce-slow"></div>
        <span className="text-[8px] font-black text-white/20 uppercase tracking-[1.5em] ml-[1.5em]">DESCEND</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-node {
          0% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-20px) translateZ(50px); }
          100% { transform: translateY(0) translateZ(0); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(10px); opacity: 1; }
        }
        .animate-scan-line {
          animation: scan-line 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-loading-bar {
          animation: loading-bar 3s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Hero;
