
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS, CATEGORIES_DATA } from '../constants';
import * as Icons from 'lucide-react';

interface CategoriesSectionProps {
  language: Language;
  setView: (view: any) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ language, setView }) => {
  // Add Quiz to categories locally or could be in constants
  const extendedCategories = [
    ...CATEGORIES_DATA,
    {
      id: "quiz",
      icon: "Compass",
      title: { EN: "Travel Quiz", SI: "සංචාරක ප්‍රශ්න විචාරාත්මක" },
      description: { EN: "Discover your true island explorer soul.", SI: "ඔබේ සැබෑ දූපත් ගවේෂක ආත්මය හඳුනා ගන්න." }
    }
  ];

  return (
    <section className="py-32 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-6 mb-24">
          <h2 className="text-4xl md:text-5xl font-heritage font-bold text-[#262626]">
            {UI_STRINGS.exploreInterests[language]}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed italic">
            {language === 'EN' 
              ? "Discover the soul of our nation through unique experiences tailored to your spirit." 
              : "ඔබේ රුචිකත්වයට සරිලන පරිදි සකස් කරන ලද සුවිශේෂී අත්දැකීම් තුළින් අපේ ජාතියේ ආත්මය හඳුනා ගන්න."}
          </p>
          <div className="w-24 h-1 story-ring mx-auto rounded-full shadow-[0_0_15px_rgba(225,48,108,0.1)]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-7 gap-12">
          {extendedCategories.map((cat) => {
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
                   else setView('destinations');
                }}
                className="group p-10 rounded-[40px] bg-white border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all text-center cursor-pointer flex flex-col items-center h-full"
              >
                <div className="relative flex flex-col items-center">
                  {/* Premium Heritage Tooltip */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-30 translate-y-2 group-hover:translate-y-0 scale-95 group-hover:scale-100">
                    <div className="relative">
                      <div className="story-ring p-[1.5px] rounded-2xl shadow-[0_20px_40px_rgba(225,48,108,0.2)]">
                        <div className="bg-white px-6 py-2.5 rounded-[14px] whitespace-nowrap border border-white/50">
                          <span className="insta-text-gradient font-heritage font-bold text-[11px] uppercase tracking-[0.25em]">
                            {cat.title[language]}
                          </span>
                        </div>
                      </div>
                      {/* Tooltip Arrow */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 z-10"></div>
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className="w-24 h-24 story-ring rounded-full p-[4px] mb-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_15px_30px_rgba(225,48,108,0.2)]">
                    <div className="bg-white w-full h-full rounded-full flex items-center justify-center text-[#262626] group-hover:insta-gradient group-hover:text-white transition-all duration-500 overflow-hidden relative shadow-inner">
                        {IconComponent && <IconComponent size={40} strokeWidth={1.5} className="relative z-10" />}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-heritage font-bold text-[#262626] mb-4 group-hover:insta-text-gradient transition-all duration-500">
                  {cat.title[language]}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light line-clamp-3 italic">
                  {cat.description[language]}
                </p>
                
                {/* Visual Accent */}
                <div className="mt-6 w-0 group-hover:w-12 h-0.5 insta-gradient rounded-full transition-all duration-700 ease-out"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
