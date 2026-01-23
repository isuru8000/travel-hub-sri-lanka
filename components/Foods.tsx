
import React from 'react';
import { Language } from '../types';
import { FOODS_DATA } from '../constants';
import { Flame, UtensilsCrossed, Leaf, Sparkles, History, Compass } from 'lucide-react';

interface FoodsProps {
  language: Language;
}

const Foods: React.FC<FoodsProps> = ({ language }) => {
  return (
    <section className="min-h-screen bg-white pb-32">
      {/* Food Heritage Header */}
      <div className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-70 transition-transform duration-[20000ms] animate-slow-zoom" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 story-ring opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/40 to-transparent" />
        
        <div className="relative text-center space-y-8 px-6 max-w-5xl animate-in fade-in zoom-in duration-1000">
          <div className="flex flex-col items-center gap-6">
             <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl">
                <History size={16} className="text-[#E1306C] animate-pulse" />
                Ancestral_Flavor_Registry
             </div>
             <div className="h-12 w-[1px] bg-gradient-to-b from-[#E1306C] to-transparent"></div>
          </div>
          
          <h2 className="text-6xl md:text-[10rem] font-heritage font-bold text-white tracking-tighter uppercase leading-[0.8] drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            FOOD <br/><span className="italic insta-text-gradient">HERITAGE.</span>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-2xl font-light italic leading-relaxed drop-shadow-lg">
            {language === 'EN' 
              ? "A culinary pilgrimage through the vibrant spices and rich textures of an island civilization." 
              : "දිවයිනේ විචිත්‍රවත් කුළුබඩු සහ පොහොසත් ආහාර සංස්කෘතිය හරහා යන රසවත් වන්දනාවක්."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {FOODS_DATA.map((food, idx) => (
            <div 
              key={food.id}
              className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group hover:-translate-y-4 transition-all duration-700"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name[language]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                
                <div className="absolute top-8 right-8 flex gap-1.5 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-2xl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Flame 
                      key={i} 
                      size={14} 
                      className={i < food.spiciness ? 'text-[#E1306C] fill-[#E1306C]' : 'text-gray-200'} 
                    />
                  ))}
                </div>
                
                <div className="absolute bottom-6 left-8">
                   <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.4em] drop-shadow-md">Archive_Node #F0{idx+1}</span>
                </div>
              </div>

              <div className="p-12 flex-grow space-y-8 flex flex-col">
                <div className="space-y-3">
                  <h3 className="text-4xl font-heritage font-bold text-[#0a0a0a] group-hover:insta-text-gradient transition-all leading-tight">
                    {food.name[language]}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-black text-[#E1306C] uppercase tracking-[0.3em]">
                    <UtensilsCrossed size={14} />
                    {food.tasteProfile[language]}
                  </div>
                </div>

                <p className="text-lg text-gray-500 leading-relaxed italic font-light border-l-4 border-gray-50 pl-6">
                  "{food.description[language]}"
                </p>

                <div className="pt-8 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Leaf size={16} className="text-green-500" />
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Heritage Components</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {food.ingredients.map((ing, i) => (
                      <span 
                        key={i} 
                        className="px-5 py-2 bg-gray-50 text-[#0a0a0a] text-[10px] font-black rounded-xl border border-gray-100 uppercase tracking-widest group-hover:bg-white group-hover:border-[#E1306C]/20 transition-all"
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

        {/* Taste Wisdom Section */}
        <div className="max-w-4xl mx-auto pt-20 text-center space-y-12">
          <div className="flex justify-center gap-8 opacity-20">
             <Compass size={40} />
             <Sparkles size={40} />
             <UtensilsCrossed size={40} />
          </div>
          <p className="text-2xl md:text-5xl font-heritage font-medium text-gray-400 italic leading-tight">
            {language === 'EN' 
              ? "\"To taste our food is to hear the stories of our farmers, our soil, and the ancient currents of the Indian Ocean.\""
              : "\"අපගේ ආහාර රස විඳීම යනු අපේ ගොවියන්ගේ, අපේ පසෙහි සහ ඉන්දියන් සාගරයේ පැරණි රළවල කතාවට සවන් දීමයි.\""}
          </p>
          <div className="w-32 h-1.5 insta-gradient mx-auto rounded-full shadow-3xl animate-pulse" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s linear infinite;
        }
      `}} />
    </section>
  );
};

export default Foods;
