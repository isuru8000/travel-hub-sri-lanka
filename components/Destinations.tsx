
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
  Info,
  Compass
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
      {/* Premium Dark Header Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Updated Background Image: Darker, more dramatic Sigiriya dusk shot */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=2000&auto=format&fit=crop')` }}
        />
        
        {/* Enhanced Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent" />
        <div className="absolute inset-0 pattern-overlay opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center px-4 space-y-10">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.4em] mb-4">
              <Compass size={14} className="animate-spin-slow" />
              {language === 'EN' ? 'Explore the Pearl' : 'මුතු ඇටය ගවේෂණය'}
            </div>
            <h2 className="text-5xl md:text-8xl font-heritage font-bold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-tight">
              {UI_STRINGS.exploreDestinations[language]}
            </h2>
            <p className="max-w-2xl mx-auto text-white/90 font-light text-xl md:text-2xl italic leading-relaxed drop-shadow-lg">
              {language === 'EN' 
                ? "Unveil the secrets of our ancient island heritage." 
                : "අපගේ අතීත දූපත් උරුමයේ රහස් හෙළි කරන්න."}
            </p>
          </div>

          {/* Premium Glassmorphic Search Bar */}
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-75 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-2xl transition-all overflow-hidden">
                <div className="pl-8 text-gray-400 group-focus-within:text-[#E1306C] transition-colors">
                  <Search size={26} strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  placeholder={UI_STRINGS.searchPlaceholder[language]}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-6 pr-14 py-8 bg-transparent text-[#262626] font-semibold text-xl md:text-2xl focus:outline-none placeholder:text-gray-400"
                />
                {search && (
                  <button 
                    onClick={() => setSearch('')}
                    className="absolute right-8 p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#E1306C] transition-all"
                  >
                    {isSearching ? <div className="w-6 h-6 border-3 border-[#E1306C] border-t-transparent rounded-full animate-spin"></div> : <X size={24} />}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/70 flex items-center gap-2">
                <Sparkles size={14} className="text-[#f09433]" />
                {language === 'EN' ? 'TOP SEARCHES' : 'ප්‍රධාන සෙවුම්'}:
              </span>
              {popularSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearch(s[language])}
                  className="text-[11px] font-bold uppercase tracking-widest px-6 py-2 bg-white/10 hover:bg-[#E1306C] hover:text-white border border-white/20 rounded-full transition-all duration-300 text-white backdrop-blur-md"
                >
                  {s[language]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* Category & Location Filters - Refined UI with Dark Default State */}
        <div className="space-y-12 mb-24">
          <div className="flex flex-wrap gap-6 justify-center">
            {categories.map(cat => {
              const count = DESTINATIONS.filter(d => cat.id === 'all' || d.category === cat.id).length;
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`group px-8 py-5 rounded-3xl transition-all border-2 flex items-center justify-center gap-4 shadow-xl relative overflow-hidden ${
                    isActive 
                      ? 'bg-white border-[#262626] text-[#262626] scale-105 shadow-2xl' 
                      : 'bg-[#262626] text-gray-300 border-transparent hover:border-[#E1306C]/30 hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-[#E1306C]/10 text-[#E1306C]' : 'bg-white/5 text-gray-400 group-hover:bg-[#E1306C]/10 group-hover:text-white'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                      {count} {language === 'EN' ? 'Items' : 'ස්ථාන'}
                    </p>
                    <span className="text-sm font-bold uppercase tracking-widest">
                      {language === 'EN' ? cat.EN : cat.SI}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 insta-gradient"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 px-12 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-gray-50">
            <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
              <div className="flex items-center gap-4 text-xs font-black text-[#262626] uppercase tracking-[0.3em] shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C]">
                  <Filter size={18} />
                </div>
                {UI_STRINGS.filterRegionLabel[language]}
              </div>
              <div className="w-full md:w-64 relative group">
                <select 
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full appearance-none px-8 py-4 bg-[#fafafa] border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#E1306C]/10 outline-none cursor-pointer transition-all hover:border-[#E1306C]/30 text-[#262626] pr-12"
                >
                  <option value="all">{UI_STRINGS.allRegions[language]}</option>
                  {locations.filter(l => l !== 'all').map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none group-hover:text-[#E1306C] transition-colors" />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {(categoryFilter !== 'all' || locationFilter !== 'all' || search) && (
                <button 
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-[10px] font-bold text-[#E1306C] uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  <RotateCcw size={14} />
                  Clear Filters
                </button>
              )}
              <div className="h-8 w-[1px] bg-gray-100 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-none mb-1">Results</p>
                  <p className="text-sm font-black text-[#262626] uppercase">
                    {filteredDestinations.length} {language === 'EN' ? 'Places' : 'ස්ථාන'}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${isSearching ? 'bg-orange-400 animate-ping' : 'bg-green-500 animate-pulse'}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-16">
            {paginatedDestinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className="group cursor-pointer bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:-translate-y-4 hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name[language]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute top-8 left-8 story-ring text-white px-6 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl backdrop-blur-md">
                    {dest.category}
                  </div>
                  
                  {/* Decorative Number */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 backdrop-blur-md rounded-tl-[4rem] flex items-center justify-center border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white/40 font-heritage font-bold text-3xl">#</span>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white text-[#262626] px-10 py-4 rounded-2xl text-xs font-bold shadow-2xl tracking-[0.3em] uppercase transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                       {language === 'EN' ? 'Open Journey' : 'ගමන අරඹන්න'}
                    </div>
                  </div>
                </div>

                <div className="p-12 space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[#E1306C] font-bold text-[11px] uppercase tracking-[0.4em]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse"></div>
                      {dest.location}
                    </div>
                    <h3 className="text-4xl font-heritage font-bold text-[#262626] leading-tight group-hover:insta-text-gradient transition-all duration-500">
                      {dest.name[language]}
                    </h3>
                  </div>

                  <p className="text-lg text-gray-500 leading-relaxed font-light line-clamp-3 italic opacity-80">
                    "{dest.shortStory[language]}"
                  </p>

                  <div className="pt-10 flex items-center justify-between border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.4em] mb-1">
                         Status
                      </span>
                      <span className="text-xl font-heritage font-bold text-green-600 uppercase tracking-widest flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                         {language === 'EN' ? 'Explore' : 'බලන්න'}
                      </span>
                    </div>
                    <div className="w-16 h-16 rounded-3xl story-ring p-[2px] group-hover:rotate-[360deg] transition-all duration-1000 shadow-2xl scale-90 group-hover:scale-100">
                       <div className="bg-white w-full h-full rounded-[22px] flex items-center justify-center">
                          <ArrowRight size={28} className="text-[#E1306C]" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-10 animate-in fade-in zoom-in duration-700 max-w-2xl mx-auto bg-white rounded-[4rem] shadow-2xl border border-gray-50">
            <div className="relative w-32 h-32 mx-auto">
               <div className="absolute inset-0 bg-[#E1306C]/5 rounded-full animate-ping"></div>
               <div className="relative w-full h-full bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                  <Search size={64} strokeWidth={1.5} />
                  <X size={24} className="absolute top-4 right-4 text-red-400" />
               </div>
            </div>
            <div className="space-y-4 px-12">
              <h3 className="text-4xl font-heritage font-bold text-[#262626]">
                {language === 'EN' ? 'No destinations found' : 'ගමනාන්ත හමු නොවීය'}
              </h3>
              <p className="text-gray-500 text-lg font-light leading-relaxed italic">
                {language === 'EN' 
                  ? `We couldn't find anything matching "${search}". Our island is vast, but maybe try a different word or clear your filters?` 
                  : `"${search}" සඳහා කිසිවක් හමු නොවීය. කරුණාකර වෙනත් වචනයක් භාවිතා කරන්න.`}
              </p>
            </div>
            <button 
              onClick={resetFilters}
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#262626] text-white rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-[0.3em]"
            >
              <RotateCcw size={18} />
              {language === 'EN' ? 'Reset All Filters' : 'නැවත සකසන්න'}
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-48 flex flex-col items-center gap-12">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-16 h-16 rounded-2xl border-2 border-gray-100 text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C] disabled:opacity-20 transition-all flex items-center justify-center shadow-sm"
              >
                <ChevronLeft size={32} />
              </button>

              <div className="flex items-center gap-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-14 h-14 rounded-2xl text-base font-black transition-all shadow-xl ${
                      currentPage === i + 1 
                        ? 'bg-[#262626] text-white' 
                        : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-[#E1306C] hover:text-[#E1306C]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-16 h-16 rounded-2xl border-2 border-gray-100 text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C] disabled:opacity-20 transition-all flex items-center justify-center shadow-sm"
              >
                <ChevronRight size={32} />
              </button>
            </div>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
              Page {currentPage} of {totalPages}
            </p>
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
