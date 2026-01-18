
import React from 'react';
import { Language } from '../types';
import { FOODS_DATA } from '../constants';
import { Flame, UtensilsCrossed, Leaf } from 'lucide-react';

interface FoodsProps {
  language: Language;
}

const Foods: React.FC<FoodsProps> = ({ language }) => {
  return (
    <section className="min-h-screen bg-white pb-32">
      {/* Food Header */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-70 transition-transform duration-10000 hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 story-ring opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative text-center space-y-4 px-4">
          <h2 className="text-5xl md:text-7xl font-heritage font-bold text-white drop-shadow-2xl">
            {language === 'EN' ? "Taste of Lanka" : "ලංකා රසය"}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-lg">
            {language === 'EN' 
              ? "A journey through the vibrant spices and rich textures of authentic Sri Lankan cuisine." 
              : "ශ්‍රී ලංකාවේ සුවිශේෂී කුළුබඩු සහ සැබෑ දේශීය ආහාරවල රසය අත්විඳින්න."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {FOODS_DATA.map((food) => (
            <div 
              key={food.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name[language]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 flex gap-1.5 bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Flame 
                      key={i} 
                      size={16} 
                      className={i < food.spiciness ? 'text-[#E1306C] fill-[#E1306C]' : 'text-gray-300'} 
                    />
                  ))}
                </div>
              </div>

              <div className="p-10 flex-grow space-y-6 flex flex-col">
                <div className="space-y-1">
                  <h3 className="text-3xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all">
                    {food.name[language]}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#E1306C] uppercase tracking-[0.2em]">
                    <UtensilsCrossed size={14} />
                    {food.tasteProfile[language]}
                  </div>
                </div>

                <p className="text-base text-gray-500 leading-relaxed italic font-light">
                  "{food.description[language]}"
                </p>

                <div className="pt-6 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf size={16} className="text-[#E1306C]" />
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-widest">Key Ingredients</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {food.ingredients.map((ing, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-1.5 bg-[#fafafa] text-[#262626] text-[10px] font-bold rounded-full border border-gray-200 uppercase tracking-widest"
                      >
                        {ing[language]}
                      </span>
                    ))}
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

export default Foods;
