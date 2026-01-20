
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types.ts';
import { Layers, Box, Sparkles, Target, Radio, ArrowLeft, Gem, Wind, Zap } from 'lucide-react';

interface VRShowcaseProps {
  language: Language;
  setView: (view: any) => void;
}

const VRShowcase: React.FC<VRShowcaseProps> = ({ language, setView }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${Math.random() * 10}s`,
      size: `${Math.random() * 3 + 1}px`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xRot = (window.innerHeight / 2 - e.pageY) / 35;
      const yRot = (window.innerWidth / 2 - e.pageX) / 35;
      setRotation({ x: xRot, y: yRot });
      
      setMousePos({
        x: (e.pageX / window.innerWidth) * 100,
        y: (e.pageY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden pt-20 px-6 select-none">
      
      {/* Background Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} 
      />

      {/* Dynamic Background Grid with Mouse Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: 'perspective(1200px) rotateX(65deg) translateY(-150px)',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
        }} 
      />
      
      {/* Volumetric Light Rays */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] bg-gradient-to-br from-[#E1306C]/5 via-transparent to-blue-500/5 rotate-12 blur-[100px] animate-pulse" />
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-purple-500/[0.03] to-transparent skew-x-[-20deg] blur-3xl" />
      </div>

      {/* Floating Particles (Ambient Dust) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white blur-[1px] pointer-events-none animate-float-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Floating 3D Showcase Container */}
      <div 
        className="relative z-10 transition-transform duration-300 ease-out"
        style={{ 
          transform: `perspective(1500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Shadow Plane */}
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 w-[80%] h-20 bg-black/60 blur-[60px] rounded-full transition-transform duration-300"
          style={{ transform: `translateZ(-100px) scale(${1 - Math.abs(rotation.x) / 100})` }}
        />

        <div className="relative p-[2px] bg-gradient-to-br from-[#E1306C]/80 via-purple-500/50 to-blue-500/80 rounded-[4.2rem] shadow-[0_0_80px_rgba(225,48,108,0.15)]">
          <div className="bg-[#080808]/95 backdrop-blur-[40px] rounded-[4rem] p-12 md:p-24 space-y-12 text-center max-w-4xl border border-white/5 relative overflow-hidden">
             
             {/* Neural Scan Line */}
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent shadow-[0_0_15px_#E1306C] animate-scan-fast z-20 opacity-60"></div>

             {/* Internal Lighting Effects */}
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#E1306C]/10 blur-[80px] rounded-full pointer-events-none" />
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

             <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white shadow-2xl mx-auto backdrop-blur-md">
                   <div className="w-8 h-8 story-ring p-[1px] rounded-lg flex items-center justify-center">
                     <div className="bg-black w-full h-full rounded-[7px] flex items-center justify-center">
                        <Target size={16} className="text-[#E1306C] animate-pulse" />
                     </div>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Reality Engine v5.0</span>
                </div>

                <h2 className="text-6xl md:text-8xl lg:text-9xl font-heritage font-bold text-white tracking-tighter leading-[0.9]">
                  IMMERSIVE <br/>
                  <span className="insta-text-gradient italic">3D SPACES.</span>
                </h2>
                
                <div className="flex items-center justify-center gap-6 py-4">
                   <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/10"></div>
                   <div className="flex items-center gap-3 text-[#E1306C]">
                      <Sparkles size={20} className="animate-pulse" />
                      <span className="text-[11px] font-black uppercase tracking-[0.6em]">Future Unfolding</span>
                   </div>
                   <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white/10"></div>
                </div>

                <p className="max-w-md mx-auto text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed opacity-60">
                  {language === 'EN' 
                    ? "Access ultra-high-fidelity spatial archives. Our 3D neural reconstructions of sacred sites are currently being rendered for your arrival." 
                    : "අතිනවීන ත්‍රිමාණ තාක්ෂණය ඔස්සේ අපගේ උරුමය අත්විඳින්න. ඔබ වෙනුවෙන්ම සැකසෙන මෙම අතථ්‍ය අවකාශය ඉතා ඉක්මනින් විවෘත වනු ඇත."}
                </p>
             </div>

             {/* Upcoming Features Grid with refined lighting */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 relative z-10">
                <div className="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 hover:border-[#E1306C]/30 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Box size={28} className="text-gray-500 mb-5 group-hover:text-[#E1306C] transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12" />
                   <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2">1:1 Geometry</h4>
                   <p className="text-[10px] text-gray-500 italic leading-snug">Millimeter-accurate lidar architectural scanning.</p>
                </div>
                <div className="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 hover:border-[#E1306C]/30 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Radio size={28} className="text-gray-500 mb-5 group-hover:text-[#E1306C] transition-all duration-500 transform group-hover:scale-110" />
                   <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2">Spatial Audio</h4>
                   <p className="text-[10px] text-gray-500 italic leading-snug">Binaural echoes of the ancient winds.</p>
                </div>
                <div className="p-8 bg-white/[0.02] rounded-[2.5rem] border border-white/5 hover:border-[#E1306C]/30 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Zap size={28} className="text-gray-500 mb-5 group-hover:text-[#E1306C] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12" />
                   <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2">Neural PBR</h4>
                   <p className="text-[10px] text-gray-500 italic leading-snug">Physically accurate materials and lighting.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-20 flex flex-col items-center gap-10 relative z-20">
         <button 
           onClick={() => setView('home')}
           className="flex items-center gap-4 text-white/30 hover:text-white transition-all uppercase tracking-[0.5em] text-[11px] font-black group px-8 py-3 rounded-full hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10"
         >
           <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
           Physical Reality
         </button>
         
         <div className="flex items-center gap-6 text-gray-800">
            <Wind size={20} className="animate-pulse" />
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <Gem size={22} className="text-[#E1306C]/40" />
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <Layers size={20} />
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-fast {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-fast { animation: scan-fast 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(20px) translateX(-20px); }
        }
        .animate-float-particle { animation: float-particle linear infinite; }
        
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default VRShowcase;
