
import React, { useState, useEffect } from 'react';
import { Language } from '../types.ts';
import { Layers, Box, Sparkles, Target, Radio, ArrowLeft, Gem, Wind, Zap } from 'lucide-react';

interface VRShowcaseProps {
  language: Language;
  setView: (view: any) => void;
}

const VRShowcase: React.FC<VRShowcaseProps> = ({ language, setView }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerHeight / 2 - e.pageY) / 25;
      const y = (window.innerWidth / 2 - e.pageX) / 25;
      setRotation({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden pt-20 px-6 select-none">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }} 
      />

      {/* Floating 3D Showcase Container */}
      <div 
        className="relative z-10 transition-transform duration-200 ease-out"
        style={{ 
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative p-1 bg-gradient-to-br from-[#E1306C] via-purple-500 to-blue-500 rounded-[4rem] shadow-[0_0_100px_rgba(225,48,108,0.2)]">
          <div className="bg-black/90 backdrop-blur-3xl rounded-[3.8rem] p-12 md:p-24 space-y-12 text-center max-w-4xl border border-white/10 relative overflow-hidden">
             
             {/* Scanning Line Effect */}
             <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E1306C] shadow-[0_0_20px_#E1306C] animate-scan-fast z-20 opacity-40"></div>

             <div className="space-y-6">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white shadow-2xl mx-auto">
                   <div className="w-8 h-8 story-ring p-[1px] rounded-lg flex items-center justify-center">
                     <div className="bg-black w-full h-full rounded-[7px] flex items-center justify-center">
                        <Target size={16} className="text-[#E1306C] animate-pulse" />
                     </div>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Reality Engine v4.0</span>
                </div>

                <h2 className="text-6xl md:text-8xl font-heritage font-bold text-white tracking-tighter leading-none">
                  IMMERSIVE <br/>
                  <span className="insta-text-gradient italic">3D SPACES.</span>
                </h2>
                
                <div className="flex items-center justify-center gap-6 py-4">
                   <div className="h-px w-12 bg-white/10"></div>
                   <div className="flex items-center gap-2 text-[#E1306C]">
                      <Sparkles size={18} className="animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-[0.5em]">Coming Soon</span>
                   </div>
                   <div className="h-px w-12 bg-white/10"></div>
                </div>

                <p className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed italic">
                  {language === 'EN' 
                    ? "We are constructing high-fidelity digital twins of Sri Lanka's most sacred sites. Prepare to traverse the whispers of history in full 3D spatial reality." 
                    : "අපි ශ්‍රී ලංකාවේ වඩාත් පූජනීය ස්ථානවල ඩිජිටල් අනුරූ නිර්මාණය කරමින් සිටිමු. ඉතිහාසයේ රහස් ත්‍රිමාණ යථාර්ථයක් ලෙස අත්විඳීමට සූදානම් වන්න."}
                </p>
             </div>

             {/* Upcoming Features Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-[#E1306C]/30 transition-colors group">
                   <Box size={24} className="text-gray-500 mb-4 group-hover:text-[#E1306C] transition-colors" />
                   <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">1:1 Scale</h4>
                   <p className="text-[9px] text-gray-500 italic">Absolute geometric accuracy.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-[#E1306C]/30 transition-colors group">
                   <Radio size={24} className="text-gray-500 mb-4 group-hover:text-[#E1306C] transition-colors" />
                   <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Spatial Audio</h4>
                   <p className="text-[9px] text-gray-500 italic">Hear the echo of the winds.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-[#E1306C]/30 transition-colors group">
                   <Zap size={24} className="text-gray-500 mb-4 group-hover:text-[#E1306C] transition-colors" />
                   <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Lidar Scan</h4>
                   <p className="text-[9px] text-gray-500 italic">Millimeter precision textures.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-20 flex flex-col items-center gap-8 relative z-20">
         <button 
           onClick={() => setView('home')}
           className="flex items-center gap-4 text-white/40 hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] font-bold group"
         >
           <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
           Return to Physical Reality
         </button>
         
         <div className="flex items-center gap-4 text-gray-700">
            <Wind size={20} className="animate-pulse" />
            <div className="w-16 h-px bg-white/5"></div>
            <Gem size={20} className="text-[#E1306C]/50" />
            <div className="w-16 h-px bg-white/5"></div>
            <Layers size={20} />
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-fast {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan-fast { animation: scan-fast 3s linear infinite; }
      `}} />
    </div>
  );
};

export default VRShowcase;
