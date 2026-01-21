
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';
import { ArrowRight, History } from 'lucide-react';

interface StorySectionProps {
  language: Language;
  setView: (view: any) => void;
}

const StorySection: React.FC<StorySectionProps> = ({ language, setView }) => {
  const stories = [
    {
      EN: "Centuries ago, kings walked these lands... today, you can too.",
      SI: "ශතවර්ෂ ගණනාවකට පෙර, රජවරුන් මෙම දේශයේ ඇවිද ගියහ... අද, ඔබටත් පුළුවන."
    },
    {
      EN: "Our soil holds the echoes of ancient civilizations that built monuments beyond time.",
      SI: "කාලය අභිබවා ගිය ස්මාරක ඉදිකළ පැරණි ශිෂ්ටාචාරවල හඬ අපේ පසෙහි රැඳී තිබේ."
    },
    {
      EN: "Travel isn't just about the place, it's about connecting with the memories of our ancestors.",
      SI: "සංචාරය යනු ස්ථානයක් ගැන පමණක් නොවේ, එය අපගේ මුතුන් මිත්තන්ගේ මතකයන් සමඟ සම්බන්ධ වීමයි."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-4xl font-heritage font-bold text-[#262626]">
              {UI_STRINGS.travelMemories[language]}
            </h2>
            <div className="space-y-6">
              {stories.map((s, i) => (
                <p key={i} className="text-lg md:text-xl font-light leading-relaxed italic border-l-4 border-[#E1306C] pl-6 py-2 text-gray-600">
                  "{s[language]}"
                </p>
              ))}
            </div>
            
            {/* Redesigned Story CTA Button */}
            <button 
              onClick={() => setView('destinations')}
              className="group relative flex items-center gap-6 px-10 py-5 bg-white rounded-3xl border-2 border-gray-100 shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 hover:border-[#E1306C]/30"
            >
              <div className="w-12 h-12 rounded-2xl story-ring flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-12">
                 <History size={24} />
              </div>
              <div className="flex flex-col items-start leading-none">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Legacy Records</span>
                 <span className="text-sm font-bold text-[#262626] uppercase tracking-[0.1em]">
                    {language === 'EN' ? 'Discover Our Heritage' : 'අපගේ උරුමය සොයා යන්න'}
                 </span>
              </div>
              <ArrowRight size={20} className="text-[#E1306C] group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Temple" />
              </div>
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1578503117502-3162799f9392?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Statue" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Culture" />
              </div>
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1580221376840-a151b5c2d3a3?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Nature" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
