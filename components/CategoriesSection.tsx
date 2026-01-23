
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS, CATEGORIES_DATA } from '../constants';
import * as Icons from 'lucide-react';

interface CategoriesSectionProps {
  language: Language;
  setView: (view: any) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ language, setView }) => {
  const extendedCategories = [
    ...CATEGORIES_DATA,
    {
      id: "quiz",
      icon: "Compass",
      title: { EN: "Travel Quiz", SI: "සංචාරක ප්‍රශ්න විචාරාත්මක" },
      description: { EN: "Identify your true island explorer archetype.", SI: "ඔබේ සැබෑ ගවේෂක ආත්මය හඳුනා ගන්න." }
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-y border-gray-50 overflow-hidden" style={{ perspective: '3000px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-8 md:space-y-12 mb-12 md:mb-24 transform translateZ(50px) md:translateZ(100px)">
          <div className="inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-2 md:py-3 rounded-full bg-black/5 border border-black/10 text-[#0a0a0a] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6">
             {language === 'EN' ? 'THE REGISTRY' : 'සංරක්ෂණාගාරය'}
          </div>
          <h2 className="text-3xl md:text-[7rem] font-heritage font-bold text-[#262626] leading-tight md:leading-[0.8] tracking-tighter uppercase">
            Choose Your <br/><span className="italic insta-text-gradient">Heritage.</span>
          </h2>
          <p className="text-gray-400 max-w-4xl mx-auto text-lg md:text-2xl font-light italic leading-relaxed">
            {language === 'EN' 
              ? "Access high-fidelity archival categories curated for the modern voyager." 
              : "නූතන ගවේෂකයා වෙනුවෙන්ම සැකසූ සුවිශේෂී ප්‍රවර්ග වෙත පිවිසෙන්න."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {extendedCategories.map((cat, idx) => {
            // @ts-ignore
            const IconComponent = Icons[cat.icon];
            return (
              <div 
                key={cat.id} 
                onClick={() => {
                   if (cat.id === 'foods') setView('foods');
                   else if (cat.id === 'music') setView('music');
                   else if (cat.id === 'medicine') setView('medicine');
                   else if (cat.id === 'tea') setView('tea');
                   else if (cat.id === 'phrases') setView('phrases');
                   else if (cat.id === 'essentials') setView('essentials');
                   else if (cat.id === 'festivals') setView('festivals');
                   else if (cat.id === 'quiz') setView('quiz');
                   else if (cat.id === 'hiking') setView('hiking');
                   else setView('destinations');
                }}
                className="group relative p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] bg-white border border-gray-100 shadow-sm transition-all duration-700 cursor-pointer flex flex-col items-center text-center overflow-hidden lg:hover:shadow-[0_80px_150px_rgba(0,0,0,0.12)] lg:hover:-translate-y-8 active:scale-95 md:active:scale-100"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Depth Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/5 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                
                {/* Refractive glint */}
                <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-white/20 via-transparent to-transparent -translate-y-full lg:group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />

                <div className="relative mb-8 md:mb-12" style={{ transform: 'translateZ(40px) md:translateZ(60px)' }}>
                  {/* Glowing Aura */}
                  <div className="absolute -inset-6 md:-inset-10 rounded-full bg-gradient-to-tr from-[#E1306C]/20 to-[#f09433]/20 blur-2xl md:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                  
                  {/* Icon Slab */}
                  <div className="w-24 h-24 md:w-36 md:h-36 story-ring rounded-[1.5rem] md:rounded-[2.5rem] p-[3px] md:p-[4px] shadow-lg md:shadow-[0_30px_80px_rgba(0,0,0,0.15)] transition-all duration-700 group-hover:rotate-y-12 group-hover:scale-110">
                    <div className="bg-white w-full h-full rounded-[1.3rem] md:rounded-[2.3rem] flex items-center justify-center text-[#262626] group-hover:bg-[#0a0a0a] group-hover:text-white transition-all duration-500">
                        {IconComponent && <IconComponent size={window.innerWidth < 768 ? 32 : 56} strokeWidth={1} className="relative z-10" />}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6 relative z-10" style={{ transform: 'translateZ(20px) md:translateZ(40px)' }}>
                  <h3 className="text-2xl md:text-4xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all duration-500 uppercase tracking-tighter">
                    {cat.title[language]}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light italic">
                    {cat.description[language]}
                  </p>
                </div>
                
                {/* 3D Data Tag */}
                <div className="mt-8 md:mt-10 px-5 py-2 md:px-8 md:py-3 bg-gray-50 rounded-full border border-gray-100 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-400 group-hover:bg-[#E1306C]/10 group-hover:text-[#E1306C] transition-all transform translateZ(10px) md:translateZ(20px)">
                  Protocol 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;