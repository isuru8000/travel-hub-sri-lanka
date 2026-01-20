
import React, { useState, useEffect, useRef } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS } from '../constants.tsx';
import { 
  Box, 
  Compass, 
  ArrowLeft, 
  Globe, 
  Search, 
  Target, 
  X, 
  Move, 
  Maximize2, 
  Zap,
  Radio,
  MapPin,
  Info,
  RotateCw
} from 'lucide-react';

interface VRExperienceProps {
  language: Language;
  setView: (view: any) => void;
}

interface POI {
  id: string;
  name: { EN: string; SI: string };
  x: number; // -100 to 100
  y: number; // -100 to 100
  description: { EN: string; SI: string };
}

const VRExperience: React.FC<VRExperienceProps> = ({ language, setView }) => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [isImmersive, setIsImmersive] = useState(false);
  const [movement, setMovement] = useState({ x: 0, z: 0 }); // Movement in space
  const [lookRotation, setLookRotation] = useState({ x: 0, y: 0 }); // Drag rotation
  const [activePOI, setActivePOI] = useState<POI | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const featuredDestinations = DESTINATIONS.filter(d => 
    d.name.EN.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.name.SI.includes(searchQuery)
  );

  // Mock POIs for the immersive experience
  const pointsOfInterest: POI[] = [
    { 
      id: 'gate', 
      name: { EN: 'Main Portal', SI: 'ප්‍රධාන ද්වාරය' }, 
      x: -40, y: 20, 
      description: { EN: 'Ancient stone entrance dating back 1500 years.', SI: 'වසර 1500 ක් පැරණි පුරාණ ගල් ද්වාරය.' } 
    },
    { 
      id: 'shrine', 
      name: { EN: 'Sacred Shrine', SI: 'පූජනීය සිද්ධස්ථානය' }, 
      x: 60, y: -30, 
      description: { EN: 'A place of quiet meditation and spiritual energy.', SI: 'සන්සුන් භාවනාව සහ ආධ්‍යාත්මික ශක්තිය සඳහා වූ ස්ථානයක්.' } 
    }
  ];

  useEffect(() => {
    if (selectedDest && !isImmersive) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsImmersive(true), 1000);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [selectedDest, isImmersive]);

  const handleJoystick = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (touch.clientX - centerX) / (rect.width / 2);
    const y = (touch.clientY - centerY) / (rect.height / 2);
    
    // Simulate velocity
    setMovement(prev => ({
      x: prev.x + (x * 2),
      z: prev.z - (y * 2)
    }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isImmersive) return;
    lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isImmersive || !lastTouchRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastTouchRef.current.x;
    const deltaY = touch.clientY - lastTouchRef.current.y;
    
    setLookRotation(prev => ({
      x: prev.x - deltaY * 0.2,
      y: prev.y + deltaX * 0.2
    }));
    
    lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    lastTouchRef.current = null;
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#050505] flex flex-col items-center relative overflow-hidden select-none touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Immersive Environment Container */}
      <div 
        className={`fixed inset-0 transition-opacity duration-1000 ${isImmersive ? 'opacity-100' : 'opacity-0'}`}
        style={{ perspective: '1200px' }}
      >
        <div 
          className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateX(${lookRotation.x}deg) rotateY(${lookRotation.y}deg) translateZ(${movement.z}px) translateX(${movement.x}px)`
          }}
        >
          {/* Main Panorama Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${selectedDest?.image})`,
              transform: 'translateZ(-1000px) scale(4)',
              opacity: 0.6
            }}
          />

          {/* Points of Interest in 3D Space */}
          {isImmersive && pointsOfInterest.map((poi) => (
            <div 
              key={poi.id}
              className="absolute group cursor-pointer"
              style={{ 
                transform: `translateX(${poi.x * 10}px) translateY(${poi.y * 5}px) translateZ(-500px)`,
                transformStyle: 'preserve-3d'
              }}
              onClick={(e) => { e.stopPropagation(); setActivePOI(poi); }}
            >
              <div className="flex flex-col items-center animate-bounce-slow">
                 <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-125 transition-transform">
                    <MapPin size={24} className="text-[#E1306C]" />
                 </div>
                 <div className="mt-4 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {poi.name[language]}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Background (Fallback/Scan mode) */}
      {!isImmersive && (
        <>
          <div 
            className="fixed inset-0 bg-cover bg-center transition-all duration-[3000ms] opacity-20 scale-125 blur-sm pointer-events-none"
            style={{ 
              backgroundImage: `url(${selectedDest ? selectedDest.image : 'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2400&auto=format&fit=crop'})`
            }}
          />
          <div className="fixed inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
        </>
      )}

      {/* VR HUD UI */}
      {isImmersive && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-1000">
          {/* Top HUD */}
          <div className="flex justify-between items-start">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 story-ring p-[1px] rounded-xl flex items-center justify-center">
                <div className="bg-black w-full h-full rounded-[9px] flex items-center justify-center">
                   <Target size={18} className="text-[#E1306C] animate-pulse" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Reality Stream</p>
                <p className="text-sm font-bold text-white uppercase tracking-widest">{selectedDest?.name[language]}</p>
              </div>
            </div>

            {/* Radar Mini-Map */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center group overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(225,48,108,0.1)_100%)] animate-pulse" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-white/5" />
                  <div className="h-full w-[1px] bg-white/5" />
               </div>
               {/* Radar Sweep */}
               <div className="absolute inset-0 origin-center animate-spin-slow opacity-20">
                  <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-tr from-[#E1306C]/40 to-transparent rounded-tr-full" />
               </div>
               
               {/* Radar POI dots */}
               {pointsOfInterest.map(poi => (
                 <div 
                   key={poi.id}
                   className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_4px_white]"
                   style={{ 
                     transform: `translate(${(poi.x - (movement.x / 10)) * 0.4}px, ${(poi.y + (movement.z / 10)) * 0.4}px)` 
                   }}
                 />
               ))}

               {/* User Pointer (Center of Radar) */}
               <div className="relative z-10 w-2 h-2 bg-[#E1306C] rounded-full shadow-[0_0_10px_#E1306C] animate-pulse">
                  <div className="absolute inset-[-4px] border border-[#E1306C]/30 rounded-full animate-ping" />
               </div>
               <Compass size={10} className="absolute top-2 left-1/2 -translate-x-1/2 text-white/40" />
            </div>
          </div>

          {/* Active POI Information Glass */}
          {activePOI && (
            <div className="max-w-xs mx-auto mb-auto mt-4 pointer-events-auto bg-black/40 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] text-white space-y-3 animate-in slide-in-from-top-4 duration-500">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-[#E1306C]" />
                    <h4 className="text-xs font-bold uppercase tracking-widest">{activePOI.name[language]}</h4>
                  </div>
                  <button onClick={() => setActivePOI(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X size={14} />
                  </button>
               </div>
               <p className="text-[10px] text-gray-300 italic leading-relaxed">{activePOI.description[language]}</p>
            </div>
          )}

          {/* Control Hints */}
          <div className="flex justify-center mb-8">
             <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.5em] flex items-center gap-2">
                Drag on screen to look around • Use joystick to traverse
             </p>
          </div>

          {/* Bottom HUD - Controls */}
          <div className="flex justify-between items-end pointer-events-auto">
            {/* Traverse Joystick */}
            <div 
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center touch-none relative"
              onTouchMove={handleJoystick}
            >
              <div className="absolute inset-4 rounded-full border border-white/5 flex items-center justify-center">
                 <Move size={16} className="text-white/10" />
              </div>
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-2xl flex items-center justify-center transition-transform duration-75"
              >
                <div className="w-1 h-1 bg-[#E1306C] rounded-full shadow-[0_0_10px_#E1306C]" />
              </div>
            </div>

            {/* View/Action Buttons */}
            <div className="flex flex-col gap-4">
               <button 
                 onClick={() => { setIsImmersive(false); setSelectedDest(null); setScanProgress(0); setMovement({x:0,z:0}); setLookRotation({x:0,y:0}); }}
                 className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-red-500/20 transition-all active:scale-90"
               >
                 <X size={24} />
               </button>
               <button 
                 onClick={() => setLookRotation({x: 0, y: 0})}
                 className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E1306C]/80 backdrop-blur-md text-white rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-all"
               >
                 <RotateCw size={24} />
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Selection / Scanning Interface (When not immersive) */}
      {!isImmersive && (
        <div className="relative z-10 max-w-6xl w-full text-center space-y-12 sm:space-y-16 transition-all duration-1000">
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 mx-auto">
             <div className="w-8 h-8 story-ring p-[1px] rounded-lg flex items-center justify-center">
               <div className="bg-black w-full h-full rounded-[7px] flex items-center justify-center">
                  <Box size={16} className="text-[#E1306C] animate-spin-slow" />
               </div>
             </div>
             <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Mobile Vision Core v3.2</span>
          </div>

          <div className="space-y-4 sm:space-y-6 animate-in fade-in zoom-in duration-1000 delay-300">
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-heritage font-bold text-white leading-tight tracking-tight">
              IMMERSE <br/>
              <span className="insta-text-gradient italic">{selectedDest ? selectedDest.name[language] : (language === 'EN' ? 'Reality.' : 'යථාර්ථය.')}</span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed px-4">
              {selectedDest 
                ? (language === 'EN' 
                    ? "Neural handshake initiated. Touch to navigate and traverse through the high-fidelity reconstruction."
                    : "නාභිගත කිරීම ආරම්භ විය. ප්‍රතිනිර්මාණය හරහා ගමන් කිරීමට ස්පර්ශ කරන්න.")
                : (language === 'EN' 
                    ? "Step inside our living history. Drag to look around and use the controls to traverse the environment." 
                    : "අපගේ සජීවී ඉතිහාසයට පිවිසෙන්න. අවට බැලීමට ඇදගෙන යන්න සහ පරිසරය ගවේෂණය කිරීමට පාලක භාවිතා කරන්න.")
              }
            </p>
          </div>

          {!selectedDest ? (
            <div className="space-y-10 sm:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <div className="max-w-md mx-auto relative group px-4 touch-auto">
                <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E1306C] transition-colors pointer-events-none">
                  <Search size={16} />
                </div>
                <input 
                  type="text"
                  placeholder={language === 'EN' ? "Search Reality Portals..." : "යථාර්ථ පිවිසුම් සොයන්න..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 text-white rounded-full focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 backdrop-blur-2xl font-medium text-sm transition-all pointer-events-auto"
                />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 overflow-y-auto max-h-[40vh] no-scrollbar px-2 pointer-events-auto">
                {featuredDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => { setSelectedDest(dest); setScanProgress(0); }}
                    className="group relative aspect-[3/4] sm:h-64 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#E1306C]/50 transition-all duration-500 shadow-2xl"
                  >
                    <img src={dest.image} alt={dest.name[language]} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <p className="text-[7px] font-black text-[#E1306C] uppercase tracking-[0.4em] mb-1">{dest.location}</p>
                      <h4 className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest truncate">{dest.name[language]}</h4>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                       <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <Maximize2 size={24} className="text-white" />
                       </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 px-4">
               <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 sm:p-16 rounded-[4rem] shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent shadow-[0_0_20px_#E1306C] animate-scan z-20"></div>

                  <div className="space-y-12 relative z-10 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-32 h-32 rounded-[3rem] overflow-hidden story-ring p-[1px]">
                         <img src={selectedDest.image} className="w-full h-full object-cover rounded-[2.9rem]" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Radio size={14} className="text-[#E1306C] animate-pulse" />
                          <p className="text-[10px] font-black text-[#E1306C] uppercase tracking-widest">Constructing Neural Mesh</p>
                        </div>
                        <h4 className="text-3xl sm:text-5xl font-heritage font-bold text-white tracking-tight">{selectedDest.name[language]}</h4>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between items-end px-2">
                        <div className="text-left">
                          <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Reality Buffer</span>
                          <span className="block text-xs font-bold text-white/40 italic">Syncing local archetypes...</span>
                        </div>
                        <div className="text-right">
                          <span className="text-4xl sm:text-6xl font-heritage font-bold text-white">{scanProgress}%</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                        <div className="h-full rounded-full insta-gradient transition-all duration-500" style={{ width: `${scanProgress}%` }} />
                      </div>
                    </div>
                  </div>
               </div>
               <button onClick={() => setSelectedDest(null)} className="flex items-center gap-4 text-gray-500 hover:text-white transition-all uppercase tracking-[0.3em] text-[10px] font-bold mx-auto pointer-events-auto">
                 <ArrowLeft size={16} /> Abort Synchronization
               </button>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0.2; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.2; }
        }
        .animate-scan { animation: scan 6s linear infinite; }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .animate-bounce-slow { animation: bounce 4s infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}} />
    </div>
  );
};

export default VRExperience;
