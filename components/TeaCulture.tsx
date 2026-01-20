
import React from 'react';
import { Language, TeaExperience } from '../types.ts';
import { TEA_DATA } from '../constants.tsx';
import { Sprout, Mountain, Map, Sparkles, Coffee, Info } from 'lucide-react';

interface TeaCultureProps {
  language: Language;
}

const TeaCard: React.FC<{ item: TeaExperience; language: Language }> = ({ item, language }) => (
  <div 
    className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group hover:-translate-y-4 transition-all duration-500"
  >
    <div className="relative h-72 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.name[language]} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
        {item.type === 'variety' ? <Coffee size={12} className="text-[#E1306C]" /> : item.type === 'process' ? <Sparkles size={12} className="text-[#E1306C]" /> : <Mountain size={12} className="text-[#E1306C]" />}
        <span className="text-[10px] font-bold text-[#262626] uppercase tracking-widest">
          {item.type === 'variety' ? (language === 'EN' ? 'Tea Variety' : 'තේ වර්ගය') : item.type === 'process' ? (language === 'EN' ? 'The Craft' : 'නිෂ්පාදන ක්‍රියාවලිය') : (language === 'EN' ? 'Historic Region' : 'ඓතිහාසික කලාපය')}
        </span>
      </div>
    </div>

    <div className="p-10 flex-grow space-y-6 flex flex-col">
      <div className="space-y-1">
        <h3 className="text-3xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all">
          {item.name[language]}
        </h3>
      </div>

      <p className="text-base text-gray-500 leading-relaxed font-light italic">
        "{item.description[language]}"
      </p>

      <div className="bg-[#f0f9ff] p-6 rounded-[2rem] border border-[#bae6fd] relative">
        <Info size={20} className="text-blue-600 opacity-20 absolute top-4 right-4" />
        <p className="text-[10px] font-bold uppercase text-blue-600 tracking-[0.2em] mb-3">
          {language === 'EN' ? 'Heritage Fact' : 'සුවිශේෂී කරුණක්'}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed font-medium">
          {item.fact[language]}
        </p>
      </div>
    </div>
  </div>
);

const TeaCulture: React.FC<TeaCultureProps> = ({ language }) => {
  return (
    <section className="min-h-screen bg-[#fafafa] pb-32">
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-60 transition-transform duration-10000 hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-green-900/20 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative text-center space-y-4 px-4">
          <div className="w-20 h-20 story-ring rounded-full mx-auto p-1 mb-6 animate-pulse">
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
              <Sprout size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-heritage font-bold text-white drop-shadow-2xl">
            {language === 'EN' ? "Ceylon Tea Trails" : "තේ සංස්කෘතිය"}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-lg italic">
            {language === 'EN' 
              ? "Follow the journey of the leaf that made Sri Lanka world-famous, from the misty highlands to your morning cup." 
              : "මීදුමෙන් වැසුණු කඳුකරයේ සිට ඔබේ තේ කෝප්පය දක්වා ශ්‍රී ලංකාව ලොව පුරා ප්‍රසිද්ධ කළ තේ දල්ලේ ගමන අත්විඳින්න."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {TEA_DATA.map((item) => (
            <TeaCard key={item.id} item={item} language={language} />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-48 px-6 text-center space-y-8">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent mx-auto" />
        <p className="text-2xl md:text-3xl font-heritage font-medium text-gray-600 italic leading-relaxed">
          {language === 'EN' 
            ? "\"A cup of Ceylon Tea is more than a beverage; it is a blend of monsoon rains, mountain mist, and the legacy of our hills.\""
            : "\"ලංකා තේ කෝප්පයක් යනු හුදු පානයක් පමණක් නොවේ; එය මෝසම් වැසි, කඳුකර මීදුම සහ අපගේ උරුමයේ අපූර්ව මිශ්‍රණයකි.\""}
        </p>
      </div>
    </section>
  );
};

export default TeaCulture;
