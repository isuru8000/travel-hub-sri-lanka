
import React from 'react';
import { Language } from '../types.ts';
import { TRAVEL_ESSENTIALS_DATA } from '../constants.tsx';
import * as Icons from 'lucide-react';

interface TravelEssentialsProps {
  language: Language;
}

const TravelEssentials: React.FC<TravelEssentialsProps> = ({ language }) => {
  return (
    <section className="min-h-screen bg-[#fafafa] pb-32">
      <div className="story-ring text-white py-24 px-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white">
            {language === 'EN' ? "Practical Guide" : "ප්‍රායෝගික මගපෙන්වීම"}
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
            {language === 'EN' 
              ? "Everything you need to know for a smooth journey across our island paradise." 
              : "අපේ දූපත් පාරාදීසය හරහා සුමට ගමනක් සඳහා ඔබ දැනගත යුතු සියල්ල මෙන්න."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TRAVEL_ESSENTIALS_DATA.map((item) => {
            // @ts-ignore
            const IconComponent = Icons[item.icon];
            return (
              <div 
                key={item.id}
                className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 space-y-8 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 story-ring rounded-3xl p-1 flex items-center justify-center transition-transform group-hover:rotate-6">
                    <div className="bg-white w-full h-full rounded-[20px] flex items-center justify-center text-[#E1306C]">
                      {IconComponent && <IconComponent size={32} />}
                    </div>
                  </div>
                  <h3 className="text-3xl font-heritage font-bold text-[#262626]">
                    {item.title[language]}
                  </h3>
                </div>

                <p className="text-gray-500 text-lg leading-relaxed font-light italic">
                  "{item.description[language]}"
                </p>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  {item.tips.map((tip, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full story-ring mt-2.5 shrink-0" />
                      <p className="text-gray-700 font-medium">{tip[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-12 rounded-[4rem] border-4 border-dashed border-gray-100 text-center space-y-6">
          <Icons.PhoneCall size={48} className="mx-auto text-red-500 animate-pulse" />
          <h4 className="text-2xl font-heritage font-bold text-[#262626]">
            {language === 'EN' ? "Emergency Contact" : "හදිසි ඇමතුම්"}
          </h4>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tourist Police</p>
              <p className="text-3xl font-heritage font-bold text-[#E1306C]">1912</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Emergency Services</p>
              <p className="text-3xl font-heritage font-bold text-[#E1306C]">119</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ambulance</p>
              <p className="text-3xl font-heritage font-bold text-[#E1306C]">1990</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelEssentials;
