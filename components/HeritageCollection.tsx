
import React from 'react';
import { Language } from '../types.ts';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Gem } from 'lucide-react';

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
    <section className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#E1306C] font-black text-[10px] uppercase tracking-[0.5em]">
              <Gem size={14} />
              {language === 'EN' ? 'The Private Collection' : 'පෞද්ගලික එකතුව'}
            </div>
            <h2 className="text-5xl md:text-7xl font-heritage font-bold text-[#262626] leading-tight">
              Hidden <span className="italic insta-text-gradient">Gems.</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 font-light text-lg italic leading-relaxed md:pb-2">
            {language === 'EN' 
              ? "Access the island's most exclusive locations, far from the common trail." 
              : "පොදු මාවතෙන් ඔබ්බට ගිය, දිවයිනේ වඩාත් සුවිශේෂී ස්ථාන කරා පිවිසෙන්න."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {HIDDEN_GEMS.map((gem, idx) => (
            <div key={gem.id} className="group relative">
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
                <img src={gem.image} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" alt={gem.name[language]} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute top-8 left-8">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={10} className="text-yellow-400" />
                    Bespoke Access
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 space-y-3">
                  <p className="text-[#E1306C] font-black text-[8px] uppercase tracking-[0.4em] drop-shadow-md">{gem.tag[language]}</p>
                  <h3 className="text-3xl font-heritage font-bold text-white leading-tight">{gem.name[language]}</h3>
                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Archive Ref: #00{idx + 7}</span>
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#E1306C] transition-colors duration-500">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeritageCollection;
