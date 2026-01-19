
import React, { useState, useMemo, useEffect } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS, UI_STRINGS } from '../constants.tsx';
import { Search, MapPin, Filter, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import DestinationModal from './DestinationModal.tsx';

interface DestinationsProps {
  language: Language;
}

const ITEMS_PER_PAGE = 6;

const Destinations: React.FC<DestinationsProps> = ({ language }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, locationFilter, search]);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedDestinations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDestinations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDestinations, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <section id="destinations" className="min-h-screen pb-32 bg-[#fafafa]">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 mb-16 border-b border-gray-100">
          <div className="flex items-center gap-4">
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
          
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {filteredDestinations.length} {language === 'EN' ? 'Destinations Found' : 'ගමනාන්ත හමු විය'}
          </div>
        </div>

        {paginatedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-16">
            {paginatedDestinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:-translate-y-4 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name[language]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 story-ring text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {dest.category}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#262626] px-8 py-3 rounded-full text-xs font-bold shadow-2xl tracking-widest uppercase">
                       {language === 'EN' ? 'View Details' : 'විස්තර බලන්න'}
                    </span>
                  </div>
                </div>

                <div className="p-10 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#E1306C] font-bold text-[11px] uppercase tracking-[0.2em]">
                      <MapPin size={14} />
                      {dest.location}
                    </div>
                    <h3 className="text-3xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all">
                      {dest.name[language]}
                    </h3>
                  </div>

                  <p className="text-base text-gray-500 leading-relaxed font-light line-clamp-3 italic">
                    {dest.shortStory[language]}
                  </p>

                  <div className="pt-8 flex items-center justify-between border-t border-gray-100 mt-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-[0.2em] mb-1">
                         {language === 'EN' ? 'Discovery' : 'සොයා ගැනීම'}
                      </span>
                      <span className="text-xl md:text-2xl font-heritage font-bold uppercase tracking-wider insta-text-gradient group-hover:translate-x-2 transition-transform origin-left">
                         {language === 'EN' ? 'Explore' : 'බලන්න'}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-full story-ring p-[2px] group-hover:rotate-45 group-hover:scale-110 transition-all duration-500 shadow-xl">
                       <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
                          <ArrowRight size={24} className="text-[#E1306C]" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
               <Search size={40} />
            </div>
            <h3 className="text-xl font-heritage font-bold text-gray-400">
              {language === 'EN' ? 'No destinations found matching your criteria.' : 'ඔබ සෙවූ නිර්ණායක වලට ගැලපෙන ගමනාන්ත හමු නොවීය.'}
            </h3>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-32 flex items-center justify-center gap-4">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-4 rounded-full border border-gray-200 text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C] disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-200 transition-all shadow-sm"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 rounded-full text-sm font-bold transition-all shadow-sm ${
                    currentPage === i + 1 
                      ? 'story-ring text-white' 
                      : 'bg-white border border-gray-200 text-gray-400 hover:border-[#E1306C] hover:text-[#E1306C]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-4 rounded-full border border-gray-200 text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C] disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-200 transition-all shadow-sm"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </div>

      <DestinationModal 
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        language={language}
      />
    </section>
  );
};

export default Destinations;
