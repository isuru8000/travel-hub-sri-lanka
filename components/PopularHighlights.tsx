
import React, { useState } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS, UI_STRINGS } from '../constants.tsx';
import { MapPin, History, ArrowRight, Sparkles, Compass } from 'lucide-react';
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
    <section className="py-32 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-40 space-y-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-[0.03]">
             <Compass size={200} />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] text-[10px] font-bold uppercase tracking-[0.4em] mb-2">
            <Sparkles size={12} />
            {language === 'EN' ? 'Signature Experiences' : 'සුවිශේෂී අත්දැකීම්'}
          </div>
          <h2 className="text-5xl md:text-7xl font-heritage font-bold text-[#262626] tracking-tight">
            {UI_STRINGS.popularHighlightsTitle[language]}
          </h2>
          <p className="text-gray-500 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed italic">
            {UI_STRINGS.popularHighlightsSubtitle[language]}
          </p>
          <div className="w-32 h-1.5 insta-gradient mx-auto rounded-full shadow-lg" />
        </div>

        {/* Content List */}
        <div className="space-y-64">
          {highlights.map((dest, index) => (
            <div 
              key={dest.id}
              className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Container with Editorial Styling */}
              <div 
                onClick={() => setSelectedDest(dest)}
                className="w-full lg:w-3/5 group relative cursor-pointer"
              >
                {/* Background Shadow Element */}
                <div className={`absolute -inset-4 rounded-[60px] bg-white opacity-50 shadow-2xl transition-transform duration-700 group-hover:scale-105 ${index % 2 === 1 ? '-rotate-1' : 'rotate-1'}`}></div>
                
                <div className="relative story-ring rounded-[55px] p-[6px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-700 hover:shadow-[0_60px_120px_rgba(0,0,0,0.2)]">
                   <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[1.2/1] rounded-[50px] overflow-hidden bg-gray-100">
                    <img 
                      src={dest.image} 
                      alt={dest.name[language]} 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    
                    {/* Floating Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Heritage Numeral */}
                    <div className="absolute top-0 right-0 w-32 h-32 story-ring rounded-bl-[80px] flex items-center justify-center opacity-95 group-hover:w-36 group-hover:h-36 transition-all duration-500">
                      <div className="text-white font-heritage font-bold text-4xl mb-4 ml-4">0{index + 1}</div>
                    </div>

                    {/* View Details Label */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                      <span className="bg-white/90 backdrop-blur-xl text-[#262626] px-12 py-5 rounded-full text-sm font-bold shadow-2xl tracking-[0.2em] uppercase border border-white/50">
                         {language === 'EN' ? 'Dive Into Story' : 'කතාව බලන්න'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Pattern behind image */}
                <div className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-48 h-48 pattern-overlay opacity-10 pointer-events-none`}></div>
              </div>

              {/* Content Description */}
              <div className="w-full lg:w-2/5 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#E1306C] font-bold text-sm tracking-[0.4em] uppercase">
                    <MapPin size={20} className="animate-bounce" />
                    {dest.location}
                  </div>
                  <h3 className="text-6xl md:text-8xl font-heritage font-bold text-[#262626] leading-[0.9] tracking-tight group-hover:insta-text-gradient transition-colors">
                    {dest.name[language].split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h3>
                  <div className="w-20 h-0.5 bg-gray-200"></div>
                  <p className="insta-text-gradient font-heritage italic text-2xl md:text-3xl leading-relaxed max-w-sm">
                    {dest.shortStory[language]}
                  </p>
                </div>

                <div className="space-y-10 relative">
                  {/* Decorative Heritage Mark */}
                  <div className="absolute -top-10 -right-4 opacity-[0.05] pointer-events-none rotate-12">
                     <History size={150} />
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <h4 className="flex items-center gap-3 font-bold text-gray-400 uppercase tracking-[0.4em] text-[10px]">
                      {UI_STRINGS.historyLabel[language]}
                    </h4>
                    <p className="text-gray-500 leading-relaxed font-light text-xl md:text-2xl line-clamp-5">
                      {dest.history[language]}
                    </p>
                  </div>

                  <button 
                    onClick={() => setSelectedDest(dest)}
                    className="flex items-center gap-6 font-heritage font-bold text-3xl uppercase tracking-wider group/btn hover:scale-105 transition-all origin-left group"
                  >
                    <span className="insta-text-gradient group-hover:tracking-widest transition-all duration-500">
                      {language === 'EN' ? 'Explore' : 'බලන්න'}
                    </span>
                    <div className="w-16 h-16 rounded-full story-ring p-[2px] shadow-2xl group-hover:rotate-[360deg] transition-all duration-1000">
                       <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
                          <ArrowRight size={28} className="text-[#E1306C]" />
                       </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modern Call to action */}
        <div className="mt-64 relative">
           <div className="absolute inset-0 story-ring rounded-[80px] blur-3xl opacity-20 animate-pulse"></div>
           <div className="relative p-20 md:p-32 bg-white rounded-[80px] text-center space-y-12 shadow-2xl border border-gray-100 overflow-hidden group">
              <div className="absolute inset-0 pattern-overlay opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="space-y-6 relative z-10">
                <h3 className="text-5xl md:text-7xl font-heritage font-bold text-[#262626] leading-tight">
                  {language === 'EN' ? 'Your Journey Awaits' : 'ඔබේ සංචාරය ඇරඹීමට සූදානම්'}
                </h3>
                <p className="text-gray-500 max-w-2xl mx-auto text-xl md:text-2xl font-light italic">
                  {language === 'EN' ? 'Our full collection of ancient wonders and tropical paradises is just a click away.' : 'පැරණි පුදුමයන් සහ නිවර්තන පාරාදීසයන්ගේ අපගේ සම්පූර්ණ එකතුව එක් ක්ලික් කිරීමකින් ලබා ගත හැකිය.'}
                </p>
              </div>
              <button 
                onClick={() => setView('destinations')}
                className="relative z-10 px-16 py-6 story-ring text-white rounded-full hover:scale-110 transition-all font-bold shadow-[0_20px_50px_rgba(225,48,108,0.3)] text-lg uppercase tracking-[0.3em]"
              >
                {UI_STRINGS.exploreDestinations[language]}
              </button>
           </div>
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
