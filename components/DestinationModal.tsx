
import React from 'react';
import { Destination, Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { X, MapPin, Info, Clock, PlayCircle, Image as ImageIcon, Lightbulb } from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  language: Language;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose, language }) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header/Close */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all"
        >
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="relative h-64 md:h-96 shrink-0">
          <img 
            src={destination.image} 
            alt={destination.name[language]} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 space-y-2">
            <div className="flex items-center gap-2 text-[#E1306C] font-bold text-xs uppercase tracking-widest">
              <MapPin size={16} />
              {destination.location}
            </div>
            <h2 className="text-3xl md:text-5xl font-heritage font-bold text-white">
              {destination.name[language]}
            </h2>
            <p className="text-white/80 italic font-heritage text-lg md:text-xl">
              {destination.shortStory[language]}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-12">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-[0.2em] text-sm">
                <Info size={18} className="text-[#E1306C]" />
                {UI_STRINGS.historyLabel[language]}
              </h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                {destination.history[language]}
              </p>
              
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#fafafa] p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <Clock size={24} className="text-[#E1306C]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Best Time</p>
                    <p className="font-bold text-[#262626]">{destination.bestTime[language]}</p>
                  </div>
                </div>
                <div className="bg-[#fafafa] p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <MapPin size={24} className="text-[#E1306C]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Region</p>
                    <p className="font-bold text-[#262626]">{destination.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Tips */}
            <div className="space-y-6">
              <div className="bg-[#E1306C]/5 p-8 rounded-[35px] border border-[#E1306C]/10 space-y-6">
                <h4 className="flex items-center gap-2 font-bold text-[#E1306C] uppercase tracking-wider text-sm">
                  <Lightbulb size={18} />
                  {UI_STRINGS.tipsLabel[language]}
                </h4>
                <ul className="space-y-4">
                  {destination.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 italic">
                      <span className="text-[#E1306C] font-bold mt-1">✦</span>
                      {tip[language]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Multimedia Section */}
          <div className="space-y-8 pt-8 border-t border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                    <ImageIcon size={16} className="text-[#E1306C]" />
                    {language === 'EN' ? 'Photo Gallery' : 'ඡායාරූප ගැලරිය'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {destination.gallery.map((img, i) => (
                      <div key={i} className="story-ring p-[2px] rounded-2xl overflow-hidden group aspect-video">
                        <img 
                          src={img} 
                          alt={`${destination.name[language]} gallery ${i}`} 
                          className="w-full h-full object-cover rounded-[14px] transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {destination.videoUrl && (
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                      <PlayCircle size={16} className="text-[#E1306C]" />
                      {language === 'EN' ? 'Cinematic Experience' : 'සිනමා අත්දැකීම'}
                    </h4>
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                      <iframe 
                        src={destination.videoUrl}
                        title={destination.name[language]}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;
