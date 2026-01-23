import React from 'react';
import { Language } from '../types.ts';
import { HIKING_DATA } from '../constants.tsx';
import { Mountain, MapPin, Clock, ArrowUp, Star, Sparkles, TrendingUp, ShieldCheck, ArrowRight, Activity, Compass, Utensils } from 'lucide-react';

interface HikingProps {
  language: Language;
  setView: (view: any) => void;
}

const Hiking: React.FC<HikingProps> = ({ language, setView }) => {
  return (
    <section className="min-h-screen bg-white pb-32">
      {/* Hiking Header - Cinematic Depth */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-60 transition-transform duration-[20000ms] animate-slow-zoom" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/90 to-white" />
        
        {/* Spatial Grid Layer */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`, backgroundSize: '120px 120px' }} />

        <div className="relative text-center space-y-10 px-6 max-w-5xl animate-in fade-in zoom-in duration-1000">
          <div className="flex flex-col items-center gap-6">
             <div className="flex flex-wrap justify-center gap-4">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl">
                    <Mountain size={16} className="text-[#E1306C] animate-pulse" />
                    Heritage_Expedition_Registry
                </div>
                <button 
                  onClick={() => setView('foods')}
                  className="group inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 backdrop-blur-3xl text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-[#E1306C] transition-all"
                >
                    <Utensils size={16} className="group-hover:rotate-12 transition-transform" />
                    Food_Heritage_Link
                </button>
             </div>
             <div className="h-12 w-[1px] bg-gradient-to-b from-[#E1306C] to-transparent"></div>
          </div>
          
          <h2 className="text-6xl md:text-[11rem] font-heritage font-bold text-white tracking-tighter uppercase leading-[0.8] drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            PEAK <br/><span className="italic insta-text-gradient">MAJESTY.</span>
          </h2>
          
          <p className="text-white/40 text-lg md:text-2xl font-light italic leading-relaxed tracking-wide max-w-2xl mx-auto border-l-4 border-[#E1306C]/30 pl-8">
            {language === 'EN' 
              ? "Venture through the high-altitude cloud forests. Discover the ten most iconic summits where nature meets the divine." 
              : "උස් කඳුකරයේ මීදුමෙන් වැසුණු වනාන්තර අතරින් පියමං කරන්න. සොබාදහම සහ දේවත්වය හමුවන ප්‍රධාන කඳු මුදුන් දහය ගවේෂණය කරන්න."}
          </p>
        </div>

        {/* Scroll HUD Component */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20">
           <span className="text-[8px] font-black uppercase tracking-[1em] ml-1">Descend_Node</span>
           <Activity size={20} className="animate-bounce" />
        </div>
      </div>

      {/* Main Exploration Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10 space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {HIKING_DATA.map((spot, idx) => (
            <div 
              key={spot.id}
              className="group relative bg-white rounded-[4rem] overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-1000 hover:shadow-[0_80px_150px_rgba(0,0,0,0.12)] hover:-translate-y-6"
            >
              <div className="relative h-[500px] overflow-hidden">
                <img 
                  src={spot.image} 
                  className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110" 
                  alt={spot.name[language]} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-10 left-10 flex flex-col gap-4 transform translateZ(50px)">
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/20 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                     <TrendingUp size={14} className="text-[#E1306C]" />
                     Ref: #H00{idx + 1}
                  </div>
                  <div className={`px-6 py-3 rounded-2xl border border-white/20 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl backdrop-blur-3xl ${spot.difficulty === 'Hard' ? 'bg-red-500/30' : spot.difficulty === 'Moderate' ? 'bg-orange-500/30' : 'bg-green-500/30'}`}>
                     <Star size={14} className="text-yellow-400 fill-current" />
                     {spot.difficulty}
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 space-y-4">
                   <div className="flex items-center gap-3 text-[#E1306C] drop-shadow-lg">
                      <MapPin size={18} />
                      <span className="text-[11px] font-black uppercase tracking-[0.4em]">{spot.location[language]}</span>
                   </div>
                   <h3 className="text-4xl md:text-6xl font-heritage font-bold text-white uppercase tracking-tight group-hover:insta-text-gradient transition-all leading-none">
                      {spot.name[language]}
                   </h3>
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#E1306C] text-white flex items-center justify-center font-heritage font-bold text-5xl rounded-tl-[3rem] shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="p-14 space-y-12">
                <p className="text-2xl text-gray-500 font-light italic leading-relaxed border-l-4 border-gray-50 pl-8">
                   "{spot.description[language]}"
                </p>

                <div className="grid grid-cols-2 gap-12 border-y border-gray-50 py-12">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-[#E1306C] shadow-inner group-hover:bg-[#E1306C] group-hover:text-white transition-all duration-500">
                         <Clock size={24} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Duration</p>
                         <p className="text-lg font-bold text-[#0a0a0a]">{spot.duration[language]}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-[#E1306C] shadow-inner group-hover:bg-[#E1306C] group-hover:text-white transition-all duration-500">
                         <ArrowUp size={24} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Summit</p>
                         <p className="text-lg font-bold text-[#0a0a0a]">{spot.elevation}</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                   <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping shadow-[0_0_10px_#22c55e]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-widest leading-none">Registry_Secure</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Public_Access_Verified</span>
                      </div>
                   </div>
                   <button className="flex items-center gap-5 px-8 py-4 bg-[#0a0a0a] text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] transition-all hover:bg-[#E1306C] hover:shadow-[0_20px_40px_rgba(225,48,108,0.3)] active:scale-95 group/btn">
                      Begin Expedition
                      <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto pt-32 pb-12 text-center space-y-16 border-t border-gray-100">
          <div className="flex items-center justify-center gap-10 opacity-30">
             <ShieldCheck size={40} className="hover:text-[#E1306C] transition-colors" />
             <div className="w-px h-12 bg-gray-200"></div>
             <Sparkles size={40} className="hover:text-[#E1306C] transition-colors" />
             <div className="w-px h-12 bg-gray-200"></div>
             <Compass size={40} className="hover:text-[#E1306C] transition-colors" />
          </div>
          
          <div className="space-y-10 relative">
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#E1306C] opacity-5">
               <Mountain size={200} />
             </div>
             <p className="text-3xl md:text-6xl font-heritage font-medium text-gray-400 italic leading-[1.1] relative z-10 max-w-4xl mx-auto">
               {language === 'EN' 
                 ? "\"In every walk with nature, one receives far more than he seeks on the peaks of Lanka.\""
                 : "\"සොබාදහම සමඟ යන සෑම ගමනකදීම, කෙනෙකු සොයනවාට වඩා බොහෝ දේ ලංකාවේ කඳු මුදුන් මතදී ඔහුට හිමිවේ.\""}
             </p>
             <div className="w-32 h-1.5 insta-gradient mx-auto rounded-full shadow-2xl animate-pulse" />
          </div>

          <div className="flex flex-col items-center gap-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.8em]">
             <p>End_Of_Registry_Data</p>
             <p>Session_v2.4_Stable</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 0 50px rgba(225,48,108,0.2);
        }
      `}} />
    </section>
  );
};

export default Hiking;