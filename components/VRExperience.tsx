
import React, { useState } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS } from '../constants.tsx';
import { Box, Compass, History, ArrowLeft, Globe, Search, Scan, Aperture, Target, X } from 'lucide-react';

interface VRExperienceProps {
  language: Language;
  setView: (view: any) => void;
}

const VRExperience: React.FC<VRExperienceProps> = ({ language, setView }) => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDestinations = DESTINATIONS.filter(d => 
    d.name.EN.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.name.SI.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center relative overflow-x-hidden px-4 sm:px-6 py-20 sm:py-32">
      {/* Fixed Immersive Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30 mix-blend-overlay animate-pulse-slow scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${selectedDest ? selectedDest.image : 'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2000&auto=format&fit=crop'})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      <div className="fixed inset-0 pattern-overlay opacity-5 pointer-events-none" />

      {/* Modern Mobile-Optimized "COMING SOON" Indicator */}
      <div className="fixed top-24 left-0 right-0 flex justify-center z-40 pointer-events-none">
        <div className="bg-[#E1306C]/10 backdrop-blur-md text-[#E1306C] border border-[#E1306C]/30 px-6 py-1.5 rounded-full shadow-2xl">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Platform Beta: Coming Soon</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full text-center space-y-12 sm:space-y-16">
        {/* VR Badge - Optimized for Mobile Vision */}
        <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 mx-auto">
           <div className="w-8 h-8 story-ring p-[1px] rounded-lg flex items-center justify-center">
             <div className="bg-black w-full h-full rounded-[7px] flex items-center justify-center">
                <Box size={16} className="text-[#E1306C] animate-spin-slow" />
             </div>
           </div>
           <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Mobile Vision Core</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 sm:space-y-6 animate-in fade-in zoom-in duration-1000 delay-300">
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-heritage font-bold text-white leading-tight tracking-tight">
            3D <br/>
            <span className="insta-text-gradient italic">{selectedDest ? selectedDest.name[language] : (language === 'EN' ? 'Destinations.' : 'ගමනාන්ත.')}</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-400 text-lg sm:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed px-4">
              {selectedDest 
                ? (language === 'EN' 
                    ? `Mapping ${selectedDest.name.EN} for immersive mobile exploration. High-fidelity textures currently in production.`
                    : `${selectedDest.name.SI} හි ත්‍රිමාණ සිතියම්කරණය සිදුවෙමින් පවතී.`)
                : (language === 'EN' 
                    ? "Step into the virtual twin of Lanka. Choose your gateway." 
                    : "ලංකාවේ අතථ්‍ය ලෝකයට පිවිසෙන්න. ඔබේ පිවිසුම තෝරාගන්න.")
              }
            </p>
          </div>
        </div>

        {!selectedDest ? (
          /* Mobile Vision Selection Grid */
          <div className="space-y-10 sm:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            {/* Compact Vision Search Bar */}
            <div className="max-w-md mx-auto relative group px-4">
              <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E1306C] transition-colors pointer-events-none">
                <Search size={16} />
              </div>
              <input 
                type="text"
                placeholder={language === 'EN' ? "Identify portal..." : "පිවිසුමක් හඳුනාගන්න..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 text-white rounded-full focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 backdrop-blur-2xl font-medium text-sm transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-2 sm:px-0">
              {featuredDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDest(dest)}
                  className="group relative aspect-[3/4] sm:h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-[#E1306C]/50 transition-all duration-500 shadow-2xl"
                >
                  <img src={dest.image} alt={dest.name[language]} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  {/* Target Corners */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-[#E1306C] transition-colors"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 group-hover:border-[#E1306C] transition-colors"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 group-hover:border-[#E1306C] transition-colors"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-[#E1306C] transition-colors"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-[7px] font-black text-[#E1306C] uppercase tracking-[0.2em]">{dest.location}</p>
                    <h4 className="text-[10px] sm:text-sm font-bold text-white uppercase tracking-widest truncate">{dest.name[language]}</h4>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Scan size={18} className="text-white" />
                     </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Mobile Vision Interface for Selected Destination */
          <div className="max-w-2xl mx-auto space-y-10 sm:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 px-4">
             <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 insta-gradient opacity-0 group-hover:opacity-5 transition-opacity"></div>
                
                {/* Viewfinder Decorative Corners */}
                <div className="absolute top-8 left-8 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 border-white/20 group-hover:border-[#E1306C] transition-all"></div>
                <div className="absolute top-8 right-8 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-r-2 border-white/20 group-hover:border-[#E1306C] transition-all"></div>
                <div className="absolute bottom-8 left-8 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-l-2 border-white/20 group-hover:border-[#E1306C] transition-all"></div>
                <div className="absolute bottom-8 right-8 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 border-white/20 group-hover:border-[#E1306C] transition-all"></div>

                {/* Scanning Laser Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E1306C] to-transparent shadow-[0_0_15px_#E1306C] animate-scan z-20"></div>

                <div className="space-y-8 sm:space-y-10 relative z-10">
                  <div className="flex items-center gap-4 sm:gap-6 border-b border-white/10 pb-8 sm:pb-10">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[2.5rem] overflow-hidden story-ring p-[1px] shrink-0">
                       <img src={selectedDest.image} className="w-full h-full object-cover rounded-[1rem] sm:rounded-[2.4rem] opacity-80" />
                    </div>
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <Aperture size={12} className="text-[#E1306C] animate-spin-slow" />
                        <p className="text-[8px] sm:text-[10px] font-black text-[#E1306C] uppercase tracking-widest">Active Scan</p>
                      </div>
                      <h4 className="text-2xl sm:text-4xl font-heritage font-bold text-white">{selectedDest.name[language]}</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{selectedDest.location}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1 text-left">
                        <span className="block text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Neural Processing</span>
                        <span className="block text-[10px] sm:text-[11px] font-bold text-white/60 italic">Constructing world mesh...</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl sm:text-5xl font-heritage font-bold text-white">84%</span>
                      </div>
                    </div>
                    
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                      <div className="h-full rounded-full insta-gradient w-[84%] relative">
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
                      <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Target size={14} className="mx-auto text-green-500 mb-2" />
                        <p className="text-[7px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Geodata</p>
                        <p className="text-[9px] sm:text-xs font-bold text-white">Locked</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10">
                        <Aperture size={14} className="mx-auto text-orange-500 mb-2" />
                        <p className="text-[7px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Textures</p>
                        <p className="text-[9px] sm:text-xs font-bold text-white">Baking</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10 opacity-40">
                        <Box size={14} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-[7px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Reality</p>
                        <p className="text-[9px] sm:text-xs font-bold text-white">Idle</p>
                      </div>
                    </div>
                  </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <button 
                  onClick={() => setSelectedDest(null)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#262626] font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-[0.2em] text-[10px]"
                >
                  <ArrowLeft size={16} />
                  New Location
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-[10px]">
                  <Globe size={16} className="text-[#E1306C]" />
                  Secure Beta Access
                </button>
             </div>
          </div>
        )}
      </div>

      {/* Floating Status Bar - Mobile Exclusive Feel */}
      <div className="fixed bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-50">
         <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[8px] font-black text-white uppercase tracking-widest">Network Secure</span>
         </div>
         <div className="hidden sm:flex bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl items-center gap-4">
            <div className="text-right">
              <p className="text-[7px] text-gray-500 font-bold uppercase leading-none mb-1">Reality Engine</p>
              <p className="text-[9px] text-white font-bold uppercase">v2.4.0-alpha</p>
            </div>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1.1); }
          50% { opacity: 0.4; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}} />
    </div>
  );
};

export default VRExperience;
