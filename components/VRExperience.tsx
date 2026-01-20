
import React, { useState } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS } from '../constants.tsx';
import { Box, Sparkles, Compass, History, ArrowLeft, Globe, Search, Timer } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center relative overflow-x-hidden px-6 py-32">
      {/* Fixed Immersive Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20 mix-blend-overlay animate-pulse-slow scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${selectedDest ? selectedDest.image : 'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2000&auto=format&fit=crop'})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />
      <div className="fixed inset-0 pattern-overlay opacity-10 pointer-events-none" />

      {/* Prominent Global "COMING SOON" Badge */}
      <div className="fixed top-24 right-[-50px] rotate-45 z-50 pointer-events-none">
        <div className="bg-[#E1306C] text-white px-20 py-2 shadow-2xl border-y border-white/20">
          <span className="text-[12px] font-black uppercase tracking-[0.6em] whitespace-nowrap">Coming Soon</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full text-center space-y-16">
        {/* VR Badge */}
        <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 mx-auto">
           <div className="w-10 h-10 story-ring p-[1px] rounded-xl flex items-center justify-center">
             <div className="bg-black w-full h-full rounded-[9px] flex items-center justify-center">
                <Box size={20} className="text-[#E1306C] animate-spin-slow" />
             </div>
           </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.5em]">3D Reality Portal</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6 animate-in fade-in zoom-in duration-1000 delay-300">
          <h2 className="text-6xl md:text-9xl font-heritage font-bold text-white leading-tight tracking-tight">
            3D <br/>
            <span className="insta-text-gradient italic">{selectedDest ? selectedDest.name[language] : (language === 'EN' ? 'Destinations.' : 'ගමනාන්ත.')}</span>
          </h2>
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-400 text-xl md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed">
              {selectedDest 
                ? (language === 'EN' 
                    ? `We are currently scanning the sacred geometry of ${selectedDest.name.EN}. Soon, you will be able to walk these grounds from anywhere in the world.`
                    : `${selectedDest.name.SI} හි පූජනීය නිර්මාණ අපි මේ වන විට ඩිජිටල්කරණය කරමින් සිටිමු.`)
                : (language === 'EN' 
                    ? "Select a destination to view its virtual twin rendering status." 
                    : "ගමනාන්තයක් තෝරා එහි ඩිජිටල් නිවුන් දර්ශනයේ ප්‍රගතිය නරඹන්න.")
              }
            </p>
            {/* Explicit Coming Soon Label */}
            <div className="flex items-center gap-3 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
              <Timer size={16} className="text-red-500 animate-pulse" />
              <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Development Phase: Coming Soon</span>
            </div>
          </div>
        </div>

        {!selectedDest ? (
          /* Destination Selector */
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="max-w-md mx-auto relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E1306C] transition-colors" size={20} />
              <input 
                type="text"
                placeholder={language === 'EN' ? "Search for a location..." : "ස්ථානයක් සොයන්න..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 text-white rounded-3xl focus:outline-none focus:ring-4 focus:ring-[#E1306C]/20 backdrop-blur-xl font-semibold text-lg"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDest(dest)}
                  className="group relative h-64 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#E1306C]/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                >
                  <img src={dest.image} alt={dest.name[language]} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-left space-y-1">
                    <p className="text-[8px] font-bold text-[#E1306C] uppercase tracking-[0.3em]">{dest.location}</p>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest">{dest.name[language]}</h4>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black text-white/60 uppercase">Pending</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                     <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Box size={20} className="text-white" />
                     </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Status Section for Selected Destination */
          <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 insta-gradient opacity-0 group-hover:opacity-5 transition-opacity"></div>
                
                {/* Big Coming Soon Badge in Modal */}
                <div className="absolute -top-6 -left-6 rotate-[-15deg] z-20">
                   <div className="bg-[#E1306C] text-white px-8 py-3 rounded-2xl shadow-2xl border border-white/20 font-black uppercase text-[10px] tracking-[0.3em]">
                      Coming 2026
                   </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 border-b border-white/10 pb-8">
                    <div className="w-20 h-20 rounded-[2.5rem] overflow-hidden story-ring p-[1px] shrink-0">
                       <img src={selectedDest.image} className="w-full h-full object-cover rounded-[2.4rem]" />
                    </div>
                    <div className="text-left space-y-1">
                      <p className="text-[10px] font-black text-[#E1306C] uppercase tracking-widest">Reality Capture Lab</p>
                      <h4 className="text-3xl font-heritage font-bold text-white">{selectedDest.name[language]}</h4>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end mb-2">
                      <div className="space-y-1 text-left">
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Progress</span>
                        <span className="block text-[11px] font-bold text-white/60 italic">Optimization in progress...</span>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-heritage font-bold text-white">84%</span>
                      </div>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1">
                      <div className="h-full rounded-full insta-gradient w-[84%] animate-pulse relative">
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-8 pt-4">
                      <div className="text-center">
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Scanning</p>
                        <p className="text-xs font-bold text-green-500">Complete</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Texturing</p>
                        <p className="text-xs font-bold text-orange-500">Processing</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">VR Support</p>
                        <p className="text-xs font-bold text-gray-600">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => setSelectedDest(null)}
                  className="flex items-center gap-3 px-10 py-5 bg-white text-[#262626] font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-[0.2em] text-[10px]"
                >
                  <ArrowLeft size={16} />
                  Change Location
                </button>
                <button className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-[10px]">
                  <Globe size={16} className="text-[#E1306C]" />
                  Join Waitlist
                </button>
             </div>
          </div>
        )}
      </div>

      {/* Multimedia Hint */}
      <div className="fixed bottom-10 left-10 hidden md:flex items-center gap-6 animate-in fade-in duration-1000 delay-1000">
         <div className="w-16 h-16 rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all">
            <img src={selectedDest ? selectedDest.image : "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=100&q=80"} alt="Preview" className="w-full h-full object-cover" />
         </div>
         <div className="text-left">
           <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Coming Soon</p>
           <p className="text-xs font-bold text-white uppercase tracking-widest">{selectedDest ? selectedDest.location : 'Island Wide Expansion'}</p>
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
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}} />
    </div>
  );
};

export default VRExperience;
