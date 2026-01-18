
import React from 'react';
import { Language } from '../types';
import { DESTINATIONS, UI_STRINGS } from '../constants';
import { ArrowRight, MapPin, Clock, Lightbulb, History } from 'lucide-react';

interface PopularHighlightsProps {
  language: Language;
  setView: (view: 'home' | 'destinations' | 'about' | 'foods') => void;
}

const PopularHighlights: React.FC<PopularHighlightsProps> = ({ language, setView }) => {
  const popularIds = ['sigiriya', 'kandy-temple', 'ella'];
  const highlights = DESTINATIONS.filter(d => popularIds.includes(d.id));

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-5xl md:text-6xl font-heritage font-bold text-[#262626]">
            {UI_STRINGS.popularHighlightsTitle[language]}
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto">
            {UI_STRINGS.popularHighlightsSubtitle[language]}
          </p>
          <div className="w-24 h-1 story-ring mx-auto rounded-full" />
        </div>

        <div className="space-y-32">
          {highlights.map((dest, index) => (
            <div 
              key={dest.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className="w-full lg:w-1/2 group relative">
                <div className="story-ring rounded-[45px] p-[4px] shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                   <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-[40px] overflow-hidden bg-white">
                    <img 
                      src={dest.image} 
                      alt={dest.name[language]} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 right-0 w-24 h-24 story-ring rounded-tl-[60px] flex items-center justify-center opacity-95">
                      <div className="text-white font-heritage font-bold text-2xl">0{index + 1}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#E1306C] font-bold text-sm tracking-widest uppercase">
                    <MapPin size={16} />
                    {dest.location}
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-heritage font-bold text-[#262626]">
                    {dest.name[language]}
                  </h3>
                  <p className="insta-text-gradient font-heritage italic text-2xl leading-snug">
                    {dest.shortStory[language]}
                  </p>
                </div>

                <div className="space-y-6 bg-[#fafafa] p-8 md:p-10 rounded-[40px] shadow-inner border border-gray-100">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-wider text-xs">
                      <History size={16} className="text-[#E1306C]" />
                      {UI_STRINGS.historyLabel[language]}
                    </h4>
                    <p className="text-gray-600 leading-relaxed font-light text-lg">
                      {dest.history[language]}
                    </p>
                  </div>

                  <div className="pt-6 space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-wider text-xs">
                      <Lightbulb size={16} className="text-[#E1306C]" />
                      {UI_STRINGS.tipsLabel[language]}
                    </h4>
                    <ul className="space-y-3">
                      {dest.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-500 italic">
                          <span className="text-[#E1306C] font-bold mt-1">✦</span>
                          {tip[language]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                   <button 
                    onClick={() => setView('destinations')}
                    className="inline-flex items-center gap-3 px-10 py-4 story-ring text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl"
                  >
                    {language === 'EN' ? 'Plan a Visit' : 'සංචාරයක් සැලසුම් කරන්න'}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-32 text-center p-12 story-ring rounded-[50px] text-white space-y-6 shadow-2xl">
           <h3 className="text-3xl font-heritage font-bold">{language === 'EN' ? 'Ready to see them all?' : 'මේ සියල්ල දැකගන්න ඔබ සූදානම්ද?'}</h3>
           <p className="text-white/90 max-w-xl mx-auto">{language === 'EN' ? 'Explore our full list of hidden gems and historical wonders across the island.' : 'දිවයින පුරා විහිදුණු සැඟවුණු සුන්දරත්වය සහ ඓතිහාසික අසිරිය ගවේෂණය කරන්න.'}</p>
           <button 
             onClick={() => setView('destinations')}
             className="px-8 py-3 bg-white text-[#262626] rounded-full hover:bg-gray-100 transition-all font-bold shadow-lg"
           >
             {UI_STRINGS.exploreDestinations[language]}
           </button>
        </div>
      </div>
    </section>
  );
};

export default PopularHighlights;