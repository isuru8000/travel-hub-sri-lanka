
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

interface StorySectionProps {
  language: Language;
}

const StorySection: React.FC<StorySectionProps> = ({ language }) => {
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
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-heritage font-bold text-[#262626]">
              {UI_STRINGS.travelMemories[language]}
            </h2>
            <div className="space-y-6">
              {stories.map((s, i) => (
                <p key={i} className="text-lg md:text-xl font-light leading-relaxed italic border-l-4 border-[#E1306C] pl-6 py-2 text-gray-600">
                  "{s[language]}"
                </p>
              ))}
            </div>
            <button className="px-10 py-4 story-ring text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl">
              {language === 'EN' ? 'Discover Our Heritage' : 'අපගේ උරුමය සොයා යන්න'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full" alt="Temple" />
              </div>
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1578503117502-3162799f9392?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full" alt="Statue" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full" alt="Culture" />
              </div>
              <div className="story-ring p-1 rounded-3xl shadow-xl">
                 <img src="https://images.unsplash.com/photo-1580221376840-a151b5c2d3a3?auto=format&fit=crop&w=400&q=80" className="rounded-[22px] w-full" alt="Nature" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;