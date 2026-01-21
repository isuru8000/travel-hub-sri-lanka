
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Language } from '../types.ts';
import { Layers, Box, Sparkles, Target, Radio, ArrowLeft, Gem, Wind, Zap, Lock, Loader2, Cpu, Scan, Hexagon, Binary, Shield, ZapOff, Signal, FastForward, Move, Compass, RotateCw, Activity, Cpu as CpuIcon, Database, HardDrive, Sun, ArrowDown } from 'lucide-react';

interface VRShowcaseProps {
  language: Language;
  setView: (view: any) => void;
}

// Phase 01 - High progress
const REGISTRY_01 = [
  {
    id: 'sigiriya',
    name: { EN: 'Sigiriya Lion Rock', SI: 'සීගිරිය සිංහගිරිය' },
    status: '92% SCANNED',
    image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80',
    type: 'FORTRESS',
    progress: 92
  },
  {
    id: 'kandy',
    name: { EN: 'Temple of the Tooth', SI: 'ශ්‍රී දළදා මාළිගාව' },
    status: '65% PROCESSING',
    image: 'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?auto=format&fit=crop&w=800&q=80',
    type: 'SACRED',
    progress: 65
  },
  {
    id: 'ella',
    name: { EN: 'Nine Arch Bridge', SI: 'ආරුක්කු නවය පාලම' },
    status: '40% RENDERING',
    image: 'https://images.unsplash.com/photo-1578519050142-afb511e518de?auto=format&fit=crop&w=800&q=80',
    type: 'HERITAGE',
    progress: 40
  },
  {
    id: 'galle',
    name: { EN: 'Galle Dutch Fort', SI: 'ගාල්ල ලන්දේසි කොටුව' },
    status: '15% INITIALIZING',
    image: 'https://images.unsplash.com/photo-1654561773591-57b9413c45c0?auto=format&fit=crop&w=800&q=80',
    type: 'COASTAL',
    progress: 15
  }
];

// Phase 02 - Expansion
const PHASE_02_SPACES = [
  {
    id: 'anuradhapura',
    name: { EN: 'Sacred Ruwanwelisaya', SI: 'රුවන්වැලිසෑය' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?auto=format&fit=crop&w=800&q=80',
    type: 'ANCIENT',
    progress: 5
  },
  {
    id: 'polonnaruwa',
    name: { EN: 'Gal Vihara Sculptures', SI: 'ගල් විහාරය' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1656339952847-a360aee9273b?auto=format&fit=crop&w=800&q=80',
    type: 'KINGDOM',
    progress: 5
  },
  {
    id: 'yala',
    name: { EN: 'Yala Leopard Zone', SI: 'යාල අභයභූමිය' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80',
    type: 'WILDLIFE',
    progress: 5
  },
  {
    id: 'trinco',
    name: { EN: 'Koneswaram Cliff', SI: 'කෝණේශ්වරම්' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1700315303907-5b222bb8bb47?auto=format&fit=crop&w=800&q=80',
    type: 'COASTAL',
    progress: 5
  }
];

// Phase 03 - Experimental
const PHASE_03_SPACES = [
  {
    id: 'pidurangala',
    name: { EN: 'Pidurangala Peak', SI: 'පිදුරංගල කඳු මුදුන' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=800&q=80',
    type: 'FORTRESS',
    progress: 2
  },
  {
    id: 'horton',
    name: { EN: 'Worlds End Abyss', SI: 'ලෝකාන්තය' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1671432751719-d1a032c1a369?auto=format&fit=crop&w=800&q=80',
    type: 'NATURE',
    progress: 2
  },
  {
    id: 'adam-peak',
    name: { EN: 'Adam\'s Peak Summit', SI: 'ශ්‍රී පාද මළුව' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1705730312722-095ca8123d48?auto=format&fit=crop&w=800&q=80',
    type: 'SACRED',
    progress: 2
  },
  {
    id: 'bentota',
    name: { EN: 'Bentota Mangroves', SI: 'බෙන්තොට කඩොලාන' },
    status: 'COMING SOON',
    image: 'https://images.unsplash.com/photo-1558446791-ac5fec3caddf?auto=format&fit=crop&w=800&q=80',
    type: 'BIOME',
    progress: 2
  }
];

// Phase 05 - Eternal Registry
const PHASE_05_SPACES = [
  {
    id: 'mihintale-peak',
    name: { EN: 'Mihintale Solar Peak', SI: 'මිහින්තලේ රන් පියස' },
    status: 'AWAITING LIGHT LOCK',
    image: 'https://images.unsplash.com/photo-1578503117502-3162799f9392?auto=format&fit=crop&w=800&q=80',
    type: 'SACRED',
    progress: 0
  },
  {
    id: 'buduruwagala-monolith',
    name: { EN: 'Buduruwagala Monolith', SI: 'බුදුරුවගල සලකුණ' },
    status: 'SYNCING VIBRATION',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
    type: 'KINGDOM',
    progress: 0
  },
  {
    id: 'dunhinda-liquid',
    name: { EN: 'Dunhinda Liquid Reality', SI: 'දුන්හිඳ දිය දහම' },
    status: 'FLOW CALIBRATION',
    image: 'https://images.unsplash.com/photo-1514483127413-f72f273478c3?auto=format&fit=crop&w=800&q=80',
    type: 'CASCADE',
    progress: 0
  },
  {
    id: 'nilaveli-abyss',
    name: { EN: 'Nilaveli Blue Node', SI: 'නිලාවේලි නිල් මැණික' },
    status: 'DEPTH HANDSHAKE',
    image: 'https://images.unsplash.com/photo-1544921603-91185f0962b1?auto=format&fit=crop&w=800&q=80',
    type: 'ABYSS',
    progress: 0
  }
];

const VRCard: React.FC<{ space: any, language: Language, idx: number, isLocked?: boolean, themeColor?: string }> = ({ space, language, idx, isLocked, themeColor = '#E1306C' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: y * -20 });
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
      className={`group relative h-[560px] rounded-[4rem] bg-black/60 backdrop-blur-2xl border border-white/10 transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) cursor-pointer overflow-hidden ${isLocked ? 'opacity-80 hover:opacity-100' : ''}`}
      style={{ 
        perspective: '1500px',
        transformStyle: 'preserve-3d',
        transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.04)' : 'scale(1)'}`,
        boxShadow: isHovered ? `0 60px 140px -20px ${themeColor}66` : 'none'
      }}
    >
      <img 
        src={space.image} 
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000" 
        alt={space.name[language]} 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-black/40 to-transparent" />
      
      <div className="absolute inset-0 p-12 flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
        <div className="flex justify-between items-start" style={{ transform: 'translateZ(50px)' }}>
           <div className={`px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${isLocked ? 'bg-white/5 border-white/10 text-white/60' : 'bg-black/80 border-white/10 text-white'}`}>
              {space.type}
           </div>
           <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-500 ${isLocked ? 'bg-white/5 border-white/10 group-hover:border-white/30' : `bg-[${themeColor}]/20 border-[${themeColor}]/40`}`}>
              {isLocked ? <Lock size={24} className="text-white/40 group-hover:text-white transition-colors animate-pulse" /> : <Scan size={24} className={`text-[${themeColor}] animate-pulse`} />}
           </div>
        </div>

        <div className="space-y-10" style={{ transform: 'translateZ(90px)' }}>
           <div className="space-y-4">
              <p className={`text-[11px] font-black uppercase tracking-[0.5em] drop-shadow-md ${isLocked ? 'text-white/30' : `text-[${themeColor}]`}`}>
                {isLocked ? 'FUTURE_MANIFOLD_LOCKED' : 'NEURAL_MESH_ACTIVE'}
              </p>
              <h4 className="text-4xl md:text-5xl font-heritage font-bold text-white leading-tight uppercase tracking-tight group-hover:insta-text-gradient transition-all duration-500">
                {space.name[language]}
              </h4>
           </div>

           <div className="space-y-5 pt-10 border-t border-white/10">
              <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-widest">
                 <span>{isLocked ? 'UPLINK_STATUS' : 'SYNERGY_SYNC'}</span>
                 <span className={isLocked ? 'text-white/60' : `text-[${themeColor}]`}>{space.status}</span>
              </div>
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-[1.5px]">
                 <div 
                   className={`h-full rounded-full transition-all duration-2000 ${isLocked ? 'bg-white/10 group-hover:bg-white/30' : `bg-gradient-to-r from-[${themeColor}] via-[#fd5949] to-[#f09433]`}`} 
                   style={{ width: `${space.progress || 5}%` }}
                 ></div>
              </div>
           </div>
        </div>
      </div>

      {/* Floating Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className={`absolute top-0 left-0 w-full h-[3px] shadow-[0_0_20px_currentColor] animate-scan-slow opacity-60 ${isLocked ? 'text-white/10' : `text-[${themeColor}]`}`} 
          style={{ animationDelay: `${idx * 2}s` }}
        ></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </div>
  );
};

const VRShowcase: React.FC<VRShowcaseProps> = ({ language, setView }) => {
  // Inertia Engine State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, z: 0 });
  const [velocity, setVelocity] = useState({ x: 0, z: 0 });
  
  const lastTouchRef = useRef<{ x: number, y: number } | null>(null);
  const requestRef = useRef<number>(null);

  // Physics Update Loop
  const animate = () => {
    setRotation(prev => ({
      x: prev.x + (targetRotation.x - prev.x) * 0.08,
      y: prev.y + (targetRotation.y - prev.y) * 0.08
    }));

    setPosition(prev => ({
      x: prev.x + velocity.x,
      z: prev.z + velocity.z
    }));
    
    setVelocity(prev => ({
      x: prev.x * 0.92,
      z: prev.z * 0.92
    }));

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetRotation, velocity]);

  // Global Interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xRot = (window.innerHeight / 2 - e.pageY) / 60;
      const yRot = (window.innerWidth / 2 - e.pageX) / 60;
      setTargetRotation({ x: xRot, y: yRot });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (lastTouchRef.current) {
      const dx = touch.clientX - lastTouchRef.current.x;
      const dy = touch.clientY - lastTouchRef.current.y;
      
      // Only rotate if horizontal movement is dominant, otherwise let vertical scroll happen
      if (Math.abs(dx) > Math.abs(dy)) {
        setTargetRotation(prev => ({
          x: prev.x - dy * 0.05,
          y: prev.y + dx * 0.05
        }));
      }
    }
    lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    e.stopPropagation(); // CRITICAL: Stop propagation to allow joystick use without scrolling
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (touch.clientX - centerX) / (rect.width / 2);
    const y = (touch.clientY - centerY) / (rect.height / 2);
    setVelocity({ x: x * 6, z: -y * 6 });
  };

  const particles = useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: '110%', 
      duration: `${12 + Math.random() * 18}s`,
      delay: `${Math.random() * -30}s`,
      size: `${Math.random() * 2.5 + 0.5}px`,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.8 ? '#E1306C' : 'white',
      driftX: `${(Math.random() - 0.5) * 180}px`
    }));
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#010101] flex flex-col items-center relative overflow-x-hidden pt-32 pb-40 px-4 md:px-6 touch-auto no-scrollbar"
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { lastTouchRef.current = null; }}
    >
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />
      
      <div 
        className="fixed inset-0 opacity-[0.12] pointer-events-none transition-transform duration-1000 ease-out" 
        style={{ 
          backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`, 
          backgroundSize: '120px 120px', 
          transform: `perspective(1200px) rotateX(75deg) translateY(${position.z}px) translateX(${position.x + rotation.y * 12}px)`, 
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)' 
        }} 
      />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
            className="absolute -top-[10%] -left-[5%] w-[100%] h-[120%] bg-gradient-to-br from-[#E1306C]/10 via-transparent to-blue-600/5 rotate-6 blur-[180px]"
            style={{ transform: `translate(${rotation.y * -6}px, ${rotation.x * -6}px)` }}
        />
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div 
            key={p.id} 
            className="absolute rounded-full pointer-events-none animate-descent-particle" 
            style={{ 
              left: p.left, 
              top: p.top,
              width: p.size, 
              height: p.size, 
              opacity: p.opacity, 
              backgroundColor: p.color, 
              animationDuration: p.duration, 
              animationDelay: p.delay,
              // @ts-ignore
              '--drift-x': p.driftX
            }} 
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl space-y-40">
        
        {/* Navigation Interface HUD */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-4 animate-in fade-in duration-1000">
           <div className="relative w-44 h-44 rounded-full border-2 border-white/5 bg-black/40 backdrop-blur-3xl flex items-center justify-center overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(225,48,108,0.05)_100%)]" />
              <div className="absolute inset-0 animate-radar-pulse opacity-20">
                 <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-tr from-[#E1306C]/60 to-transparent rounded-tr-full origin-bottom-left animate-spin-slow" />
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                 <Compass size={28} className="text-[#E1306C] group-hover:rotate-45 transition-transform duration-700" />
                 <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Node_Sync</span>
                 <div className="text-[11px] font-bold text-white tracking-[0.2em]">{Math.round(position.x)}, {Math.round(position.z)}</div>
              </div>
              <div 
                className="absolute w-2 h-2 bg-[#E1306C] rounded-full shadow-[0_0_10px_#E1306C] transition-all duration-150"
                style={{ transform: `translate(${velocity.x * 3}px, ${-velocity.z * 3}px)` }}
              />
           </div>

           <div className="text-center space-y-4 max-w-sm">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-[0.4em]">
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                 System_Nominal
              </div>
              <p className="text-sm text-gray-500 font-medium italic leading-relaxed">
                "Registry synchronization active. Use the controller to explore the ancient manifold archives."
              </p>
           </div>

           <div 
             className="w-44 h-44 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center relative group active:scale-95 transition-all shadow-inner touch-none"
             onTouchMove={handleJoystickMove}
           >
              <div className="absolute inset-4 rounded-full border border-white/5 flex items-center justify-center opacity-40">
                 <Move size={24} className="text-white/20" />
              </div>
              <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center justify-center group-active:translate-y-1">
                  <div className="w-2.5 h-2.5 bg-[#E1306C] rounded-full shadow-[0_0_20px_#E1306C] animate-pulse" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/30 uppercase tracking-[0.5em] whitespace-nowrap">Traverse_Controller</div>
           </div>
        </div>
        
        {/* Main Hero Showcase */}
        <div 
          className="w-full flex justify-center animate-in zoom-in duration-1000"
          style={{ 
            transform: `perspective(2000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, 
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          <div className="relative p-[1px] bg-gradient-to-br from-[#E1306C] via-purple-500/40 to-blue-600 rounded-[3rem] md:rounded-[5rem] shadow-[0_0_150px_rgba(225,48,108,0.2)] w-full max-w-5xl">
            <div className="bg-black/90 backdrop-blur-[120px] rounded-[2.9rem] md:rounded-[4.9rem] p-12 md:p-32 space-y-12 text-center border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent shadow-[0_0_40px_#E1306C] animate-scan-fast z-20 opacity-80"></div>
               
               <div className="relative z-10 flex flex-col items-center gap-10" style={{ transform: 'translateZ(120px)' }}>
                  <div className="inline-flex items-center gap-5 px-8 py-4 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/40 text-[#E1306C] shadow-[0_0_60px_rgba(225,48,108,0.3)] animate-pulse">
                     <Target size={20} className="text-[#E1306C]" />
                     <span className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.6em]">Protocol_A8_Active</span>
                  </div>
                  
                  <h2 className="text-6xl sm:text-7xl md:text-[9rem] font-heritage font-bold text-white tracking-tighter leading-[0.85] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] uppercase">
                    REWRITE <br/>
                    <span className="insta-text-gradient italic">3D SPACE.</span>
                  </h2>

                  <div className="w-full max-w-lg space-y-6">
                     <div className="flex justify-between items-end text-[10px] md:text-[12px] font-black text-white/60 uppercase tracking-[0.3em] px-2">
                        <div className="flex items-center gap-4">
                          <Activity size={14} className="text-[#E1306C] animate-pulse" />
                          <span>SYNTHESIS_STAGE_04</span>
                        </div>
                        <span className="text-white">92.4%</span>
                     </div>
                     <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5 shadow-inner">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#fdf497] via-[#fd5949] to-[#E1306C] shadow-[0_0_40px_rgba(225,48,108,1)]" style={{ width: '92.4%' }}></div>
                     </div>
                  </div>

                  <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-xl font-medium uppercase tracking-[0.2em] leading-loose opacity-70 italic">
                    Finalizing volumetric reconstruction for the sacred highlands node. Calibration complete.
                  </p>
               </div>
            </div>
            
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-[#E1306C]/15 blur-[100px] -z-10" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-6 text-white/20 animate-bounce">
           <span className="text-[9px] font-black uppercase tracking-[1em] ml-[1em]">Scroll for Hidden Nodes</span>
           <ArrowDown size={24} />
        </div>

        {/* Phase 01: Active Registry */}
        <div className="space-y-24">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="flex items-center gap-6 text-[#E1306C] opacity-80">
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-[#E1306C]"></div>
              <CpuIcon size={28} className="animate-spin-slow" />
              <span className="text-[12px] font-black uppercase tracking-[0.8em]">Neural_Archives_01</span>
              <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-[#E1306C]"></div>
            </div>
            <h3 className="text-5xl md:text-8xl font-heritage font-bold text-white tracking-tighter uppercase">Projected <span className="insta-text-gradient italic">Dimensions.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {REGISTRY_01.map((space, idx) => (
              <VRCard key={space.id} space={space} language={language} idx={idx} />
            ))}
          </div>
        </div>

        {/* Phase 02 & 03: Combined Expansion */}
        <div className="space-y-32 py-40 border-t border-white/5 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-40 bg-blue-600/5 blur-[150px] -rotate-6 pointer-events-none" />

           <div className="flex flex-col items-center text-center space-y-10 relative z-10">
              <div className="px-8 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] flex items-center gap-4 shadow-2xl backdrop-blur-md">
                 <Binary size={18} className="animate-pulse" />
                 Expansion Registry 02 & 03
              </div>
              <h3 className="text-4xl md:text-9xl font-heritage font-bold text-white uppercase tracking-tighter leading-none">
                 COMING <span className="text-blue-500 italic">SOON.</span>
              </h3>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {PHASE_02_SPACES.map((space, idx) => (
                <VRCard key={space.id} space={space} language={language} idx={idx + 4} isLocked={true} themeColor="#3B82F6" />
              ))}
              {PHASE_03_SPACES.map((space, idx) => (
                <VRCard key={space.id} space={space} language={language} idx={idx + 8} isLocked={true} themeColor="#3B82F6" />
              ))}
           </div>
        </div>

        {/* Phase 05: Eternal Registry */}
        <div className="space-y-32 py-40 border-t border-white/5 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-60 bg-amber-600/10 blur-[180px] rotate-12 pointer-events-none" />

           <div className="flex flex-col items-center text-center space-y-10 relative z-10">
              <div className="px-8 py-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] flex items-center gap-4 shadow-2xl backdrop-blur-md">
                 <Sun size={18} className="animate-pulse" />
                 Eternal Registry 05
              </div>
              <h3 className="text-4xl md:text-9xl font-heritage font-bold text-white uppercase tracking-tighter leading-none">
                 THE <span className="text-amber-500 italic">FRONTIER.</span>
              </h3>
              <p className="text-gray-500 text-sm md:text-base font-black uppercase tracking-[0.4em] max-w-2xl leading-relaxed opacity-60 italic">
                Scanning the peak of eternity and the depths of the blue abyss. Final registry nodes pending neural sync.
              </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {PHASE_05_SPACES.map((space, idx) => (
                <VRCard key={space.id} space={space} language={language} idx={idx + 12} isLocked={true} themeColor="#F59E0B" />
              ))}
           </div>
           
           <div className="pt-20 flex justify-center">
              <div className="flex items-center gap-5 px-16 py-8 rounded-full bg-white/[0.02] border border-white/10 text-white/20 text-[11px] font-black uppercase tracking-[0.6em] animate-pulse">
                <FastForward size={20} />
                Deep Registry Nodes Processing
              </div>
           </div>
        </div>

        {/* Navigation / Return */}
        <div className="flex flex-col items-center gap-20">
           <button 
             onClick={() => setView('home')}
             className="relative flex items-center gap-8 text-white/50 hover:text-white transition-all uppercase tracking-[0.6em] text-[12px] font-black group px-20 py-8 rounded-full border border-white/10 hover:border-[#E1306C]/40 active:scale-95 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-2xl"
           >
             <div className="absolute inset-0 bg-[#E1306C]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <ArrowLeft size={22} className="group-hover:-translate-x-2 transition-transform relative z-10" />
             <span className="relative z-10">Return to Home Registry</span>
           </button>
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
        @keyframes descent-particle {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translateY(-135vh) translateX(var(--drift-x)) scale(0.4); opacity: 0; }
        }
        .animate-descent-particle {
          animation: descent-particle linear infinite;
        }
        .animate-scan-fast { animation: scan-fast 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-scan-slow { animation: scan-slow 8s linear infinite; }
        .animate-spin-slow { animation: spin 24s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotate-y-180 { transform: rotateY(180deg); }

        @keyframes radar-pulse {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        .animate-radar-pulse { animation: radar-pulse 3s ease-in-out infinite; }
      `}} />
    </div>
  );
};

export default VRShowcase;
