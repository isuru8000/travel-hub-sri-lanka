
import React from 'react';
import { Language } from '../types.ts';
import { FESTIVALS_DATA } from '../constants.tsx';
import { Calendar, Sparkles, MapPin } from 'lucide-react';

interface FestivalsProps {
  language: Language;
}

const Festivals: React.FC<FestivalsProps> = ({ language }) => {
  return (
    <section className="min-h-screen bg-[#fafafa] pb-32">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-60 transition-transform duration-10000 hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603515865223-9993309a4d8c?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 insta-gradient opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative text-center space-y-4 px-4">
          <div className="w-20 h-20 story-ring rounded-full mx-auto p-1 mb-6">
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
              <Sparkles size={32} className="text-[#E1306C]" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-heritage font-bold text-white drop-shadow-2xl">
            {language === 'EN' ? "Cultural Spirits" : "සංස්කෘතික උත්සව"}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light italic">
            {language === 'EN' 
              ? "Join the celebration of faith, harvest, and history across the island." 
              : "දිවයින පුරා පවත්වන ඇදහිලි, අස්වනු සහ ඉතිහාසයේ සැමරුම් සමඟ එක්වන්න."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {FESTIVALS_DATA.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group hover:-translate-y-4 transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name[language]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Calendar size={14} className="text-[#E1306C]" />
                  <span className="text-[10px] font-bold text-[#262626] uppercase tracking-widest">
                    {item.date[language]}
                  </span>
                </div>
              </div>

              <div className="p-10 space-y-6 flex flex-col flex-grow">
                <h3 className="text-3xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all">
                  {item.name[language]}
                </h3>
                
                <p className="text-base text-gray-500 leading-relaxed font-light">
                  {item.description[language]}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <div className="bg-[#fafafa] p-6 rounded-3xl border border-gray-100 relative overflow-hidden">
                    <Sparkles size={40} className="absolute -bottom-2 -right-2 text-[#E1306C] opacity-[0.05]" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Significance</p>
                    <p className="text-sm text-gray-700 font-medium italic">
                      {item.significance[language]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-48 px-6 text-center space-y-8">
        <div className="w-16 h-1 story-ring mx-auto rounded-full" />
        <p className="text-2xl md:text-3xl font-heritage font-medium text-gray-600 italic">
          {language === 'EN' 
            ? "\"A nation's culture resides in the hearts and in the soul of its people.\""
            : "\"ජාතියක සංස්කෘතිය පවතින්නේ එහි ජනතාවගේ හදවත් තුළ සහ ආත්මය තුළය.\""}
        </p>
      </div>
    </section>
  );
};

export default Festivals;
