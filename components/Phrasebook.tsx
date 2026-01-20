
import React, { useState } from 'react';
import { Language, Phrase } from '../types.ts';
import { PHRASEBOOK_DATA } from '../constants.tsx';
import { MessageSquare, Volume2, Search, Heart, Utensils, AlertCircle, ShoppingBag, Globe } from 'lucide-react';

interface PhrasebookProps {
  language: Language;
}

const Phrasebook: React.FC<PhrasebookProps> = ({ language }) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredPhrases = PHRASEBOOK_DATA.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.english.toLowerCase().includes(search.toLowerCase()) || 
                          p.sinhala.includes(search) || 
                          p.transliteration.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', icon: <Globe size={14} />, label: { EN: "All", SI: "සියල්ල" } },
    { id: 'greeting', icon: <Heart size={14} />, label: { EN: "Greetings", SI: "ආචාර කිරීම්" } },
    { id: 'dining', icon: <Utensils size={14} />, label: { EN: "Dining", SI: "කෑම බීම" } },
    { id: 'shopping', icon: <ShoppingBag size={14} />, label: { EN: "Shopping", SI: "සාප්පු සවාරි" } },
    { id: 'emergency', icon: <AlertCircle size={14} />, label: { EN: "Emergency", SI: "හදිසි" } },
  ];

  return (
    <section className="min-h-screen bg-[#fafafa] pb-32">
      <div className="story-ring text-white py-24 px-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white">
              {language === 'EN' ? "Local Language Guide" : "දේශීය භාෂා මාර්ගෝපදේශය"}
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
              {language === 'EN' 
                ? "Connecting with the locals is the best part of travel. Learn some basic Sinhala to brighten your journey." 
                : "දේශීය ජනතාව සමඟ සන්නිවේදනය කිරීම සංචාරයේ හොඳම කොටසයි. ඔබේ ගමන අලංකාර කිරීමට මූලික සිංහල වචන කිහිපයක් ඉගෙන ගන්න."}
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E1306C] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder={language === 'EN' ? "Search for a phrase..." : "වචනයක් සොයන්න..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-white text-[#262626] rounded-3xl focus:outline-none focus:ring-4 focus:ring-white/20 shadow-2xl font-semibold text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-3 px-8 py-3 rounded-full text-sm font-bold transition-all border shadow-sm ${
                filter === cat.id 
                  ? 'story-ring text-white border-transparent' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-[#E1306C] hover:text-[#E1306C]'
              }`}
            >
              {cat.icon}
              {cat.label[language]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhrases.map((p) => (
            <div 
              key={p.id}
              className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                  {p.category}
                </span>
                <button className="text-gray-300 group-hover:text-[#E1306C] transition-colors">
                  <Volume2 size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">English</p>
                  <p className="text-xl font-heritage font-bold text-[#262626]">{p.english}</p>
                </div>
                
                <div className="w-12 h-0.5 bg-gray-100 group-hover:w-full transition-all duration-500"></div>

                <div>
                  <p className="text-sm font-bold text-[#E1306C] uppercase tracking-widest mb-1">Sinhala</p>
                  <p className="text-3xl font-heritage font-bold text-[#262626] leading-tight">{p.sinhala}</p>
                </div>

                <div className="pt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pronunciation</p>
                  <p className="text-lg font-medium text-gray-600 italic">"{p.transliteration}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="text-center py-20 space-y-4">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
                <MessageSquare size={40} />
             </div>
             <p className="text-gray-400 font-heritage text-xl">
               {language === 'EN' ? 'No phrases found...' : 'වචන කිසිවක් හමු නොවීය...'}
             </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Phrasebook;
