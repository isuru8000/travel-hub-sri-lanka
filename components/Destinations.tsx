
import React, { useState, useMemo, useEffect } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS, UI_STRINGS } from '../constants.tsx';
import { 
  Search, 
  MapPin, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Sparkles, 
  RotateCcw,
  Landmark,
  Waves,
  PawPrint,
  Mountain,
  LayoutGrid,
  Info
} from 'lucide-react';
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
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: 'all', EN: 'All Categories', SI: 'සියලුම වර්ග', icon: LayoutGrid },
    { id: 'ancient', EN: 'Ancient Places', SI: 'පුරාණ ස්ථාන', icon: Landmark },
    { id: 'beach', EN: 'Beaches', SI: 'වෙරළ', icon: Waves },
    { id: 'wildlife', EN: 'Wildlife', SI: 'වනජීවී', icon: PawPrint },
    { id: 'mountains', EN: 'Hill Country', SI: 'කඳුකරය', icon: Mountain },
  ];

  const popularSearches = [
    { EN: "Sigiriya", SI: "සීගිරිය" },
    { EN: "Ella", SI: "ඇල්ල" },
    { EN: "Temple", SI: "මාළිගාව" },
    { EN: "Safari", SI: "සෆාරි" }
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
    if (search) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
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

  const resetFilters = () => {
    setCategoryFilter('all');
    setLocationFilter('all');
    setSearch('');
    setCurrentPage(1);
  };

  return (
    <section id="destinations" className="min-h-screen pb-32 bg-[#fafafa]">
      {/* Header & Search Bar */}
      <div className="story-ring text-white py-24 px-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white drop-shadow-lg">
              {UI_STRINGS.exploreDestinations[language]}
            </h2>
            <div className="w-24 h-1 bg-white/40 mx-auto rounded-full" />
            <p className="max-w-2xl mx-auto text-white/90 font-light text-lg italic">
              {language === 'EN' 
                ? "Dive deep into the stories of our ancient island, one destination at a time." 
                : "අපගේ අතීත දූපතේ කථාන්දර එකින් එක ගවේෂණය කරන්න."}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="relative group">
              <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${search ? 'text-[#E1306C]' : 'text-gray-400'}`} size={22} />
              <input 
                type="text" 
                placeholder={UI_STRINGS.searchPlaceholder[language]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-14 py-6 bg-white text-[#262626] rounded-3xl focus:outline-none focus:ring-8 focus:ring-white/20 shadow-2xl font-semibold text-lg transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#E1306C] transition-all"
                >
                  {isSearching ? <div className="w-5 h-5 border-2 border-[#E1306C] border-t-transparent rounded-full animate-spin"></div> : <X size={20} />}
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mr-2 flex items-center gap-2">
                <Sparkles size={12} />
                {language === 'EN' ? 'Popular' : 'ජනප්‍රිය'}:
              </span>
              {popularSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearch(s[language])}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors"
                >
                  {s[language]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        {/* Category & Location Filters */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(cat => {
              const count = DESTINATIONS.filter(d => cat.id === 'all' || d.category === cat.id).length;
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="relative group">
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 translate-y-2 group-hover:translate-y-0">
                    <div className="bg-[#262626] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap border border-white/10">
                      {language === 'EN' ? cat.EN : cat.SI} ({count})
                    </div>
                    <div className="w-2 h-2 bg-[#262626] rotate-45 mx-auto -mt-1 shadow-sm"></div>
                  </div>

                  <button
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`p-4 rounded-2xl transition-all border flex items-center justify-center gap-3 shadow-sm relative ${
                      categoryFilter === cat.id 
                        ? 'story-ring text-white border-transparent' 
                        : 'bg-white text-gray-500 border-gray-100 hover:border-[#E1306C] hover:text-[#E1306C]'
                    }`}
                  >
                    <Icon size={22} />
                    <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest">{language === 'EN' ? cat.EN : cat.SI}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${categoryFilter === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
                      {count}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-y border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#262626]">
                <Filter size={16} className="text-[#E1306C]" />
                {UI_STRINGS.filterRegionLabel[language]}:
              </div>
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-[#E1306C]/10 outline-none cursor-pointer transition-all hover:border-[#E1306C]/30"
              >
                <option value="all">{UI_STRINGS.allRegions[language]}</option>
                {locations.filter(l => l !== 'all').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isSearching ? 'bg-orange-400 animate-ping' : 'bg-green-500 animate-pulse'}`}></div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {filteredDestinations.length} {language === 'EN' ? 'Destinations Found' : 'ගමනාන්ත හමු විය'}
              </div>
            </div>
          </div>
        </div>

        {filteredDestinations.length > 0 ? (
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
          <div className="py-24 text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300 relative">
               <Search size={48} />
               <X size={20} className="absolute top-2 right-2 text-red-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-heritage font-bold text-[#262626]">
                {language === 'EN' ? 'No destinations found' : 'ගමනාන්ත හමු නොවීය'}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto font-light">
                {language === 'EN' 
                  ? `We couldn't find anything matching "${search}". Try adjusting your filters or search terms.` 
                  : `"${search}" සඳහා කිසිවක් හමු නොවීය. කරුණාකර වෙනත් වචනයක් භාවිතා කරන්න.`}
              </p>
            </div>
            <button 
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#E1306C]/10 text-[#E1306C] rounded-full font-bold text-sm hover:bg-[#E1306C] hover:text-white transition-all shadow-sm"
            >
              <RotateCcw size={16} />
              {language === 'EN' ? 'Reset All Filters' : 'සියලුම පෙරහන් ඉවත් කරන්න'}
            </button>
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
        onSelect={setSelectedDestination}
        language={language}
      />
    </section>
  );
};

export default Destinations;
