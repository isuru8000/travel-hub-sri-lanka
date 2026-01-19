
import React, { useState } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS, UI_STRINGS } from '../constants.tsx';
import { MapPin, Lightbulb, History, ArrowRight } from 'lucide-react';
import DestinationModal from './DestinationModal.tsx';

interface PopularHighlightsProps {
  language: Language;
  setView: (view: 'home' | 'destinations' | 'about' | 'foods') => void;
}

const PopularHighlights: React.FC<PopularHighlightsProps> = ({ language, setView }) => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const popularIds = ['sigiriya', 'kandy-temple', 'ella'];
  const highlights = DESTINATIONS.filter(d => popularIds.includes(d.id));

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-32 space-y-6">
          <h2 className="text-5xl md:text-6xl font-heritage font-bold text-[#262626]">
            {UI_STRINGS.popularHighlightsTitle[language]}
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto">
            {UI_STRINGS.popularHighlightsSubtitle[language]}
          </p>
          <div className="w-24 h-1 story-ring mx-auto rounded-full" />
        </div>

        <div className="space-y-48">
          {highlights.map((dest, index) => (
            <div 
              key={dest.id}
              className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div 
                onClick={() => setSelectedDest(dest)}
                className="w-full lg:w-1/2 group relative cursor-pointer"
              >
                <div className="story-ring rounded-[45px] p-[5px] shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                   <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-[40px] overflow-hidden bg-white">
                    <img 
                      src={dest.image} 
                      alt={dest.name[language]} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 right-0 w-24 h-24 story-ring rounded-tl-[60px] flex items-center justify-center opacity-95">
                      <div className="text-white font-heritage font-bold text-2xl">0{index + 1}</div>
                    </div>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-[#262626] px-10 py-4 rounded-full text-xs font-bold shadow-2xl tracking-widest uppercase">
                         {language === 'EN' ? 'View Details' : 'විස්තර බලන්න'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-1/2 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#E1306C] font-bold text-base tracking-[0.3em] uppercase">
                    <MapPin size={18} />
                    {dest.location}
                  </div>
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-heritage font-bold text-[#262626]">
                    {dest.name[language]}
                  </h3>
                  <p className="insta-text-gradient font-heritage italic text-lg md:text-xl leading-relaxed">
                    {dest.shortStory[language]}
                  </p>
                </div>

                <div className="space-y-8 bg-[#fafafa] p-10 md:p-14 rounded-[50px] shadow-inner border border-gray-100">
                  <div className="space-y-6">
                    <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-[0.3em] text-xs">
                      <History size={18} className="text-[#E1306C]" />
                      {UI_STRINGS.historyLabel[language]}
                    </h4>
                    <p className="text-gray-600 leading-relaxed font-light text-xl line-clamp-4">
                      {dest.history[language]}
                    </p>
                  </div>

                  <button 
                    onClick={() => setSelectedDest(dest)}
                    className="flex items-center gap-4 font-heritage font-bold text-2xl md:text-3xl uppercase tracking-wider group/btn hover:scale-105 transition-transform origin-left"
                  >
                    <span className="insta-text-gradient">
                      {language === 'EN' ? 'Explore' : 'බලන්න'}
                    </span>
                    <div className="w-14 h-14 rounded-full story-ring p-[2px] shadow-lg group-hover/btn:rotate-45 transition-all">
                       <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
                          <ArrowRight size={24} className="text-[#E1306C]" />
                       </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-48 text-center p-16 story-ring rounded-[60px] text-white space-y-8 shadow-2xl">
           <h3 className="text-4xl font-heritage font-bold">{language === 'EN' ? 'Ready to see them all?' : 'මේ සියල්ල දැකගන්න ඔබ සූදානම්ද?'}</h3>
           <p className="text-white/90 max-w-2xl mx-auto text-xl font-light">{language === 'EN' ? 'Explore our full list of hidden gems and historical wonders across the island.' : 'දිවයින පුරා විහිදුණු සැඟවුණු සුන්දරත්වය සහ ඓතිහාසික අසිරිය ගවේෂණය කරන්න.'}</p>
           <button 
             onClick={() => setView('destinations')}
             className="px-12 py-4 bg-white text-[#262626] rounded-full hover:bg-gray-100 transition-all font-bold shadow-lg text-lg uppercase tracking-widest"
           >
             {UI_STRINGS.exploreDestinations[language]}
           </button>
        </div>
      </div>

      <DestinationModal 
        destination={selectedDest}
        onClose={() => setSelectedDest(null)}
        onSelect={setSelectedDest}
        language={language}
      />
    </section>
  );
};

export default PopularHighlights;
