
import React, { useState } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS, UI_STRINGS } from '../constants.tsx';
import { MapPin, History, Sparkles, Compass, ArrowRight } from 'lucide-react';
import DestinationModal from './DestinationModal.tsx';

interface PopularHighlightsProps {
  language: Language;
  setView: (view: any) => void;
}

const PopularHighlights: React.FC<PopularHighlightsProps> = ({ language, setView }) => {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const popularIds = ['sigiriya', 'kandy-temple', 'ella'];
  const highlights = DESTINATIONS.filter(d => popularIds.includes(d.id));

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-40 space-y-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-[0.03] text-black">
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
              {/* Image Container */}
              <div 
                onClick={() => setSelectedDest(dest)}
                className="w-full lg:w-3/5 group relative cursor-pointer"
              >
                <div className={`absolute -inset-4 rounded-[60px] bg-white opacity-50 shadow-2xl transition-transform duration-700 group-hover:scale-105 ${index % 2 === 1 ? '-rotate-1' : 'rotate-1'}`}></div>
                
                <div className="relative story-ring rounded-[55px] p-[6px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-700 hover:shadow-[0_60px_120px_rgba(0,0,0,0.15)]">
                   <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[1.2/1] rounded-[50px] overflow-hidden bg-gray-100">
                    <img 
                      src={dest.image} 
                      alt={dest.name[language]} 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="absolute top-0 right-0 w-32 h-32 story-ring rounded-bl-[80px] flex items-center justify-center opacity-95 group-hover:w-36 group-hover:h-36 transition-all duration-500">
                      <div className="text-white font-heritage font-bold text-4xl mb-4 ml-4">0{index + 1}</div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                      <span className="bg-white/90 backdrop-blur-xl text-[#262626] px-12 py-5 rounded-full text-sm font-bold shadow-2xl tracking-[0.2em] uppercase border border-white/50">
                         {language === 'EN' ? 'Dive Into Story' : 'කතාව බලන්න'}
                      </span>
                    </div>
                  </div>
                </div>
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
                  <div className="absolute -top-10 -right-4 opacity-[0.05] pointer-events-none rotate-12 text-black">
                     <History size={150} />
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <h4 className="flex items-center gap-3 font-bold text-gray-400 uppercase tracking-[0.4em] text-[10px]">
                      {UI_STRINGS.historyLabel[language]}
                    </h4>
                    <p className="text-gray-500 leading-relaxed font-light text-xl md:text-2xl line-clamp-5 italic">
                      {dest.history[language]}
                    </p>
                  </div>

                  {/* Redesigned High-Visibility Highlight Button */}
                  <button 
                    onClick={() => setView('destinations')}
                    className="group relative flex items-center gap-4 px-8 py-4 insta-gradient rounded-2xl shadow-xl transition-all duration-500 hover:scale-110 active:scale-95 hover:shadow-[0_20px_40px_rgba(225,48,108,0.4)]"
                  >
                    <div className="flex flex-col items-start text-left leading-none">
                       <span className="text-[8px] font-black text-white/70 uppercase tracking-[0.3em] mb-1">Archive Entry</span>
                       <span className="text-sm font-black text-white uppercase tracking-[0.1em]">
                          {language === 'EN' ? 'Explore Portal' : 'පිවිසුම බලන්න'}
                       </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#E1306C] shadow-lg group-hover:rotate-12 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
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
                className="relative z-10 px-16 py-6 insta-gradient text-white rounded-full hover:scale-110 transition-all font-black shadow-[0_20px_60px_rgba(225,48,108,0.4)] text-lg uppercase tracking-[0.3em] group border-2 border-white/20"
              >
                <span className="flex items-center gap-4">
                  {UI_STRINGS.exploreDestinations[language]}
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
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
