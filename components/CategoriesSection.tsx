
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS, CATEGORIES_DATA } from '../constants';
import * as Icons from 'lucide-react';

interface CategoriesSectionProps {
  language: Language;
  setView: (view: 'home' | 'destinations' | 'about' | 'foods') => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ language, setView }) => {
  return (
    <section className="py-20 bg-[#fafafa] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-heritage font-bold text-[#262626]">
            {UI_STRINGS.exploreInterests[language]}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base font-medium">
            {language === 'EN' 
              ? "Discover the soul of our nation through unique experiences tailored to your spirit." 
              : "ඔබේ රුචිකත්වයට සරිලන පරිදි සකස් කරන ලද සුවිශේෂී අත්දැකීම් තුළින් අපේ ජාතියේ ආත්මය හඳුනා ගන්න."}
          </p>
          <div className="w-24 h-1 story-ring mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            // @ts-ignore
            const IconComponent = Icons[cat.icon];
            return (
              <div 
                key={cat.id} 
                onClick={() => {
                   if (cat.id === 'foods') setView('foods');
                   else setView('destinations');
                }}
                className="group p-8 rounded-[30px] bg-white border border-gray-100 hover:shadow-2xl transition-all text-center cursor-pointer flex flex-col items-center"
              >
                <div className="w-20 h-20 story-ring rounded-full p-[3px] mb-6">
                   <div className="bg-white w-full h-full rounded-full flex items-center justify-center text-[#262626] group-hover:insta-gradient group-hover:text-white transition-all">
                      {IconComponent && <IconComponent size={32} />}
                   </div>
                </div>
                <h3 className="text-xl font-heritage font-bold text-[#262626] mb-3 group-hover:text-[#E1306C] transition-colors">
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