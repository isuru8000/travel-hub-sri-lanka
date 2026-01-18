
import React, { useState, useMemo } from 'react';
import { Language, Destination } from '../types';
import { DESTINATIONS, UI_STRINGS } from '../constants';
import { Search, MapPin, Info, Filter, Clock, Lightbulb } from 'lucide-react';

interface DestinationsProps {
  language: Language;
}

const Destinations: React.FC<DestinationsProps> = ({ language }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', EN: 'All Categories', SI: 'සියලුම වර්ග' },
    { id: 'ancient', EN: 'Ancient Places', SI: 'පුරාණ ස්ථාන' },
    { id: 'beach', EN: 'Beaches', SI: 'වෙරළ' },
    { id: 'wildlife', EN: 'Wildlife', SI: 'වනජීවී' },
    { id: 'mountains', EN: 'Hill Country', SI: 'කඳුකරය' },
  ];

  const locations = useMemo(() => {
    const unique = Array.from(new Set(DESTINATIONS.map(d => d.location)));
    return ['all', ...unique];
  }, []);

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter(d => {
      const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter;
      const matchesLocation = locationFilter === 'all' || d.location === locationFilter;
      const matchesSearch = d.name.EN.toLowerCase().includes(search.toLowerCase()) || 
                            d.name.SI.includes(search);
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [categoryFilter, locationFilter, search]);

  return (
    <section id="destinations" className="min-h-screen pb-20 bg-white">
      {/* Header & Search Bar */}
      <div className="story-ring text-white py-24 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white drop-shadow-lg">
              {UI_STRINGS.exploreDestinations[language]}
            </h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full" />
            <p className="max-w-2xl mx-auto text-white/90 font-light text-lg">
              {language === 'EN' 
                ? "Dive deep into the stories of our ancient island, one destination at a time." 
                : "අපගේ අතීත දූපතේ කථාන්දර එකින් එක ගවේෂණය කරන්න."}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder={UI_STRINGS.searchPlaceholder[language]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-5 bg-white text-[#262626] rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 shadow-2xl font-semibold"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                    categoryFilter === cat.id 
                      ? 'bg-white text-[#E1306C] border-white' 
                      : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                  }`}
                >
                  {language === 'EN' ? cat.EN : cat.SI}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 py-6 mb-12 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm font-bold text-[#262626]">
            <Filter size={16} className="text-[#E1306C]" />
            {UI_STRINGS.filterRegionLabel[language]}:
          </div>
          <select 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#E1306C] cursor-pointer"
          >
            <option value="all">{UI_STRINGS.allRegions[language]}</option>
            {locations.filter(l => l !== 'all').map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="space-y-24">
          {filteredDestinations.map((dest, index) => (
            <div 
              key={dest.id}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="story-ring p-1 rounded-[35px] shadow-xl overflow-hidden group">
                   <div className="relative overflow-hidden rounded-[30px] aspect-[4/3] bg-white">
                    <img 
                      src={dest.image} 
                      alt={dest.name[language]} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 story-ring text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      {dest.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-4xl font-heritage font-bold text-[#262626]">
                    {dest.name[language]}
                  </h3>
                  <p className="insta-text-gradient font-heritage italic text-xl">
                    {dest.shortStory[language]}
                  </p>
                </div>

                <div className="space-y-4 bg-[#fafafa] p-8 rounded-[35px] border-t-4 border-[#E1306C] shadow-sm">
                  <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-wider text-sm">
                    <Info size={16} className="text-[#E1306C]" />
                    {UI_STRINGS.historyLabel[language]}
                  </h4>
                  <p className="text-gray-600 leading-relaxed font-light text-lg">
                    {dest.history[language]}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                      <Clock size={18} className="text-[#E1306C]" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Best Time</p>
                        <p className="text-xs font-bold text-[#262626]">{dest.bestTime[language]}</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                      <MapPin size={18} className="text-[#E1306C]" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Region</p>
                        <p className="text-xs font-bold text-[#262626]">{dest.location}</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;