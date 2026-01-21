
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Language } from '../types.ts';
import { Layers, Box, Sparkles, Target, Radio, ArrowLeft, Gem, Wind, Zap, Lock, Loader2, Cpu, Scan } from 'lucide-react';

interface VRShowcaseProps {
  language: Language;
  setView: (view: any) => void;
}

const UPCOMING_SPACES = [
  {
    id: 'sigiriya',
    name: { EN: 'Sigiriya Lion Rock', SI: 'සීගිරිය සිංහගිරිය' },
    status: '92% SCANNED',
    image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80',
    type: 'FORTRESS'
  },
  {
    id: 'kandy',
    name: { EN: 'Temple of the Tooth', SI: 'ශ්‍රී දළදා මාළිගාව' },
    status: '65% PROCESSING',
    image: 'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?auto=format&fit=crop&w=800&q=80',
    type: 'SACRED'
  },
  {
    id: 'ella',
    name: { EN: 'Nine Arch Bridge', SI: 'ආරුක්කු නවය පාලම' },
    status: '40% RENDERING',
    image: 'https://images.unsplash.com/photo-1578519050142-afb511e518de?auto=format&fit=crop&w=800&q=80',
    type: 'HERITAGE'
  },
  {
    id: 'galle',
    name: { EN: 'Galle Dutch Fort', SI: 'ගාල්ල ලන්දේසි කොටුව' },
    status: '15% INITIALIZING',
    image: 'https://images.unsplash.com/photo-1654561773591-57b9413c45c0?auto=format&fit=crop&w=800&q=80',
    type: 'COASTAL'
  }
];

const VRCard: React.FC<{ space: typeof UPCOMING_SPACES[0], language: Language, idx: number }> = ({ space, language, idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[480px] rounded-[3.5rem] bg-black/60 backdrop-blur-xl border border-white/10 transition-all duration-700 ease-out cursor-pointer"
      style={{ 
        perspective: '1500px',
        transformStyle: 'preserve-3d',
        transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
        boxShadow: isHovered ? `0 40px 100px -20px rgba(225,48,108,0.25)` : 'none'
      }}
    >
      <img 
        src={space.image} 
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 rounded-[3.5rem]" 
        alt={space.name[language]} 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-black/40 to-transparent rounded-[3.5rem]" />
      
      {/* 3D Inner Content Layers */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Top Section */}
        <div className="flex justify-between items-start" style={{ transform: 'translateZ(40px)' }}>
           <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 text-[8px] font-black text-white uppercase tracking-widest">
              {space.type}
           </div>
           <div className="w-12 h-12 bg-[#E1306C]/20 backdrop-blur-md rounded-2xl border border-[#E1306C]/40 flex items-center justify-center shadow-2xl">
              <Scan size={20} className="text-[#E1306C] animate-pulse" />
           </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-6" style={{ transform: 'translateZ(60px)' }}>
           <div className="space-y-2">
              <p className="text-[9px] font-black text-[#E1306C] uppercase tracking-[0.4em] drop-shadow-md">DIMENSION_LOCKED</p>
              <h4 className="text-3xl font-heritage font-bold text-white leading-tight uppercase tracking-tight">{space.name[language]}</h4>
           </div>

           <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-[8px] font-black text-white/40 uppercase tracking-widest">
                 <span>NEURAL_HANDSHAKE</span>
                 <span className="text-[#E1306C]">{space.status}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-[#E1306C] to-[#f09433] animate-pulse" style={{ width: space.status.split('%')[0] + '%' }}></div>
              </div>
           </div>
        </div>
      </div>

      {/* Floating Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3.5rem]">
        <div 
          className="absolute top-0 left-0 w-full h-[2px] bg-[#E1306C]/60 shadow-[0_0_15px_#E1306C] animate-scan-slow opacity-40" 
          style={{ animationDelay: `${idx * 2}s` }}
        ></div>
      </div>
      
      {/* 3D Depth Shadow (Subtle projection) */}
      <div className="absolute -inset-2 bg-[#E1306C]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
    </div>
  );
};

const VRShowcase: React.FC<VRShowcaseProps> = ({ language, setView }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 20}s`,
      delay: `${Math.random() * -20}s`,
      size: `${Math.random() * 2 + 0.5}px`,
      opacity: Math.random() * 0.5 + 0.1,
      blur: `${Math.random() * 1}px`,
      color: Math.random() > 0.8 ? '#E1306C' : 'white',
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xRot = (window.innerHeight / 2 - e.pageY) / 60;
      const yRot = (window.innerWidth / 2 - e.pageX) / 60;
      setRotation({ x: xRot, y: yRot });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;
    setRotation({ x: deltaY * -0.15, y: deltaX * 0.15 });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#010101] flex flex-col items-center relative overflow-x-hidden pt-32 pb-40 px-4 md:px-6 select-none touch-none no-scrollbar"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* 1. Ambient background stardust */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />
      
      {/* 2. PERSPECTIVE GRID (Moving Upwards to simulate descent) */}
      <div 
        className="fixed inset-0 opacity-[0.12] pointer-events-none animate-grid-descent" 
        style={{ 
          backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`, 
          backgroundSize: '80px 80px', 
          transform: 'perspective(1000px) rotateX(70deg) translateY(-30%)', 
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 90%)' 
        }} 
      />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[100%] h-[120%] bg-gradient-to-br from-[#E1306C]/15 via-transparent to-blue-600/5 rotate-6 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#E1306C]/15 to-transparent blur-[120px]" />
      </div>

      {/* 3. Upward Floating Particles (Reinforces descent) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div 
            key={p.id} 
            className="absolute rounded-full pointer-events-none animate-descent-particle" 
            style={{ 
              left: p.left, 
              top: '110%', // Start below screen
              width: p.size, 
              height: p.size, 
              opacity: p.opacity, 
              filter: `blur(${p.blur})`, 
              backgroundColor: p.color, 
              boxShadow: p.opacity > 0.3 ? `0 0 10px ${p.color}` : 'none', 
              animationDuration: p.duration, 
              animationDelay: p.delay 
            }} 
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl space-y-40">
        
        {/* Top Hero Showcase */}
        <div 
          className="transition-transform duration-700 ease-out w-full flex justify-center animate-in zoom-in duration-1000"
          style={{ transform: `perspective(2000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transformStyle: 'preserve-3d' }}
        >
          <div className="relative p-[1px] bg-gradient-to-br from-[#E1306C] via-purple-500/40 to-blue-600 rounded-[3rem] md:rounded-[5rem] shadow-[0_0_120px_rgba(225,48,108,0.2)] w-full max-w-5xl">
            <div className="bg-black/90 backdrop-blur-[100px] rounded-[2.9rem] md:rounded-[4.9rem] p-10 md:p-32 space-y-12 text-center border border-white/5 relative overflow-hidden">
               {/* Kinetic Scanning Effect */}
               <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent shadow-[0_0_40px_#E1306C] animate-scan-fast z-20 opacity-80"></div>
               
               <div className="relative z-10 flex flex-col items-center gap-8" style={{ transform: 'translateZ(100px)' }}>
                  <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/40 text-[#E1306C] shadow-[0_0_50px_rgba(225,48,108,0.3)] animate-pulse">
                     <Lock size={18} className="text-[#E1306C]" />
                     <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em]">Protocol_A8_Active</span>
                  </div>
                  
                  <h2 className="text-6xl sm:text-7xl md:text-9xl font-heritage font-bold text-white tracking-tighter leading-[0.85] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] uppercase">
                    REWRITE <br/>
                    <span className="insta-text-gradient italic">3D SPACE.</span>
                  </h2>

                  <div className="w-full max-w-md space-y-5">
                     <div className="flex justify-between items-end text-[9px] md:text-[11px] font-black text-white/60 uppercase tracking-[0.3em] px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#E1306C] rounded-full animate-ping" />
                          <span>SYNTHESIS_STAGE_04</span>
                        </div>
                        <span className="text-white">92.4%</span>
                     </div>
                     <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-[1.5px] border border-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#fdf497] via-[#fd5949] to-[#E1306C] shadow-[0_0_25px_rgba(225,48,108,0.8)]" style={{ width: '92.4%' }}></div>
                     </div>
                  </div>

                  <p className="max-w-xl mx-auto text-gray-400 text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] leading-loose opacity-70 italic">
                    {language === 'EN' 
                      ? "The archive is finalizing 1:1 volumetric reconstruction for the highlands node. Calibration complete in 180 seconds. Synchronizing high-fidelity 3D neural meshes across all spectral channels and 3D Heritage archives." 
                      : "ලේඛනාගාරය උඩරට කලාපය සඳහා ත්‍රිමාණ ප්‍රතිනිර්මාණය අවසන් කරමින් පවතී. තත්පර 180 කින් අවසන් වනු ඇත. සියලුම නාලිකා හරහා ඉහළ විභේදන සහිත ත්‍රිමාණ පද්ධති සහ ත්‍රිමාණ උරුම ලේඛනාගාරය සමමුහුර්ත කරයි."}
                  </p>
               </div>
            </div>
            
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-[#E1306C]/15 blur-[100px] -z-10" />
          </div>
        </div>

        {/* Upcoming Spaces Section */}
        <div className="space-y-24">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex items-center gap-4 text-[#E1306C] opacity-80">
              <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-[#E1306C]"></div>
              <Cpu size={24} className="animate-spin-slow" />
              <span className="text-[11px] font-black uppercase tracking-[0.8em]">Neural_Archives</span>
              <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-[#E1306C]"></div>
            </div>
            <h3 className="text-4xl md:text-7xl font-heritage font-bold text-white tracking-tighter uppercase">Projected <span className="insta-text-gradient italic">Dimensions.</span></h3>
            <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em] max-w-2xl leading-relaxed">Systematic conversion of 2,500 years of historical architecture into traversable neural meshes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {UPCOMING_SPACES.map((space, idx) => (
              <VRCard key={space.id} space={space} language={language} idx={idx} />
            ))}
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-12 bg-black/60 backdrop-blur-xl rounded-[4rem] border border-white/5 hover:border-[#E1306C]/40 transition-all duration-700 group text-center space-y-8" style={{ perspective: '1000px' }}>
             <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto transition-transform duration-700 group-hover:rotate-y-180 shadow-inner">
                <Box size={36} className="text-gray-400 group-hover:text-[#E1306C] transition-all" />
             </div>
             <div className="space-y-3">
                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Volumetric_Lidar</h4>
                <p className="text-xs text-gray-500 italic leading-relaxed font-light">Millimeter-accurate geometry capture for absolute preservation.</p>
             </div>
          </div>
          <div className="p-12 bg-black/60 backdrop-blur-xl rounded-[4rem] border border-white/5 hover:border-[#E1306C]/40 transition-all duration-700 group text-center space-y-8" style={{ perspective: '1000px' }}>
             <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto transition-transform duration-700 group-hover:rotate-y-180 shadow-inner">
                <Radio size={36} className="text-gray-400 group-hover:text-[#E1306C] transition-all" />
             </div>
             <div className="space-y-3">
                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Atmospheric_Audio</h4>
                <p className="text-xs text-gray-500 italic leading-relaxed font-light">Binaural recording of sacred soundscapes and heritage winds.</p>
             </div>
          </div>
          <div className="p-12 bg-black/60 backdrop-blur-xl rounded-[4rem] border border-white/5 hover:border-[#E1306C]/40 transition-all duration-700 group text-center space-y-8" style={{ perspective: '1000px' }}>
             <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto transition-transform duration-700 group-hover:rotate-y-180 shadow-inner">
                <Zap size={36} className="text-gray-400 group-hover:text-[#E1306C] transition-all" />
             </div>
             <div className="space-y-3">
                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Neural_Radiance</h4>
                <p className="text-xs text-gray-500 italic leading-relaxed font-light">Physically accurate light transport for true-to-life immersion.</p>
             </div>
          </div>
        </div>

        {/* Navigation / Return */}
        <div className="flex flex-col items-center gap-16">
           <button 
             onClick={() => setView('home')}
             className="relative flex items-center gap-6 text-white/50 hover:text-white transition-all uppercase tracking-[0.6em] text-[11px] font-black group px-16 py-6 rounded-full border border-white/10 hover:border-[#E1306C]/40 active:scale-95 bg-black/40 backdrop-blur-xl overflow-hidden"
           >
             <div className="absolute inset-0 bg-[#E1306C]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform relative z-10" />
             <span className="relative z-10">Return to Registry_01</span>
           </button>
           
           <div className="flex items-center gap-8 text-white/5 py-8">
              <Wind size={20} className="animate-pulse" />
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <Gem size={24} />
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <Layers size={20} />
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-fast {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scan-slow {
          0% { top: -20%; opacity: 0; }
          30% { opacity: 0.6; }
          70% { opacity: 0.6; }
          100% { top: 120%; opacity: 0; }
        }
        @keyframes grid-descent {
          from { background-position-y: 0px; }
          to { background-position-y: -80px; }
        }
        @keyframes descent-particle {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }
        
        .animate-grid-descent {
          animation: grid-descent 3s linear infinite;
        }
        .animate-descent-particle {
          animation: descent-particle linear infinite;
        }
        .animate-scan-fast { animation: scan-fast 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-scan-slow { animation: scan-slow 10s linear infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
};

export default VRShowcase;
