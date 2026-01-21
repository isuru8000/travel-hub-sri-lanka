
import React from 'react';
import { Language } from '../types.ts';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Gem, Box } from 'lucide-react';

const HIDDEN_GEMS = [
  {
    id: 'ritigala',
    name: { EN: 'Ritigala Monastery', SI: 'රිටිගල ආරණ්‍යය' },
    tag: { EN: 'Mystic Forest', SI: 'අද්භූත වනාන්තරය' },
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop',
    rating: '4.9'
  },
  {
    id: 'yapahuwa',
    name: { EN: 'Yapahuwa Rock Fortress', SI: 'යාපහුව බලකොටුව' },
    tag: { EN: 'Architectural Marvel', SI: 'නිර්මාණාත්මක ආශ්චර්යය' },
    image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=1200&auto=format&fit=crop',
    rating: '4.8'
  },
  {
    id: 'kalpitiya',
    name: { EN: 'Kalpitiya Peninsula', SI: 'කල්පිටිය අර්ධද්වීපය' },
    tag: { EN: 'Oceanic Serenity', SI: 'සාගර නිශ්ශබ්දතාවය' },
    image: 'https://images.unsplash.com/photo-1558446791-ac5fec3caddf?q=80&w=1200&auto=format&fit=crop',
    rating: '5.0'
  }
];

const HeritageCollection: React.FC<{ language: Language }> = ({ language }) => {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden" style={{ perspective: '3000px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-12 mb-12 md:mb-20 transform translateZ(50px) md:translateZ(100px)">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 md:gap-4 text-[#E1306C] font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em]">
              <Gem size={14} className="md:w-5 md:h-5 animate-bounce" />
              {language === 'EN' ? 'The Private Registry' : 'පෞද්ගලික එකතුව'}
            </div>
            <h2 className="text-3xl md:text-7xl font-heritage font-bold text-[#0a0a0a] leading-tight md:leading-[0.8] tracking-tighter">
              Hidden <span className="italic insta-text-gradient">Gems.</span>
            </h2>
          </div>
          <p className="max-w-lg text-gray-400 font-light text-lg md:text-2xl italic leading-relaxed md:pb-4 border-l-4 border-gray-50 pl-6 md:pl-10">
            {language === 'EN' 
              ? "Elite archival locations, curated for the high-fidelity explorer." 
              : "ගවේෂකයින් සඳහාම වෙන්වූ, දිවයිනේ සුවිශේෂී රහස් ස්ථාන කරා පිවිසෙන්න."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {HIDDEN_GEMS.map((gem, idx) => (
            <div key={gem.id} className="group relative" style={{ transformStyle: 'preserve-3d' }}>
              <div 
                className="relative aspect-[4/5] md:aspect-[4/6] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-all duration-1000 lg:group-hover:-translate-y-8 lg:group-hover:rotate-y-12 group-hover:shadow-[0_60px_140px_rgba(0,0,0,0.2)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src={gem.image} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" alt={gem.name[language]} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-6 left-6 md:top-10 md:left-10 transform translateZ(30px) md:translateZ(40px)">
                  <div className="px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/20 text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] flex items-center gap-2 md:gap-3">
                    <Sparkles size={10} className="md:w-3 md:h-3 text-yellow-400 animate-pulse" />
                    Ref: #00{idx + 7}
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 space-y-4 md:space-y-6 transform translateZ(40px) md:translateZ(60px)">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-[#E1306C] font-black text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] drop-shadow-md">{gem.tag[language]}</p>
                    <h3 className="text-2xl md:text-4xl font-heritage font-bold text-white leading-tight uppercase tracking-tighter">{gem.name[language]}</h3>
                  </div>
                  <div className="pt-4 md:pt-6 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                        <span className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Entry Online</span>
                    </div>
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#E1306C] transition-all duration-500 group-hover:scale-110 shadow-2xl">
                      <ArrowRight size={20} className="md:w-7 md:h-7" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dynamic Bottom Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-6 md:h-10 bg-black/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeritageCollection;
