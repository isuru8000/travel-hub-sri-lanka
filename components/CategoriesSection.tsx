
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
    <section className="py-32 bg-[#fafafa] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-6 mb-24">
          <h2 className="text-4xl md:text-5xl font-heritage font-bold text-[#262626]">
            {UI_STRINGS.exploreInterests[language]}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            {language === 'EN' 
              ? "Discover the soul of our nation through unique experiences tailored to your spirit." 
              : "ඔබේ රුචිකත්වයට සරිලන පරිදි සකස් කරන ලද සුවිශේෂී අත්දැකීම් තුළින් අපේ ජාතියේ ආත්මය හඳුනා ගන්න."}
          </p>
          <div className="w-24 h-1 story-ring mx-auto rounded-full" />
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
                className="group p-10 rounded-[40px] bg-white border border-gray-100 hover:shadow-2xl transition-all text-center cursor-pointer flex flex-col items-center h-full"
              >
                <div className="relative flex flex-col items-center">
                  {/* Heritage Tooltip */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100">
                    <div className="story-ring p-[1px] rounded-full shadow-[0_10px_30px_rgba(225,48,108,0.2)]">
                      <div className="bg-white px-5 py-2 rounded-full whitespace-nowrap">
                        <span className="insta-text-gradient font-heritage font-bold text-[10px] uppercase tracking-[0.2em]">
                          {cat.title[language]}
                        </span>
                      </div>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45 mx-auto -mt-1.5 shadow-sm"></div>
                  </div>

                  <div className="w-24 h-24 story-ring rounded-full p-[4px] mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <div className="bg-white w-full h-full rounded-full flex items-center justify-center text-[#262626] group-hover:insta-gradient group-hover:text-white transition-all duration-300">
                        {IconComponent && <IconComponent size={40} />}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-heritage font-bold text-[#262626] mb-4 group-hover:insta-text-gradient transition-all duration-300">
                  {cat.title[language]}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {cat.description[language]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
