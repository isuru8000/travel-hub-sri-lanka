import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Language, Destination } from '../types.ts';
import { DESTINATIONS, UI_STRINGS } from '../constants.tsx';
import { 
  Search, 
  MapPin, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ArrowRight, 
  X, 
  Sparkles, 
  RotateCcw,
  Landmark,
  Waves,
  PawPrint,
  Mountain,
  LayoutGrid,
  Compass,
  Loader2,
  TrendingUp,
  History
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', EN: 'All', SI: 'සියල්ල', icon: LayoutGrid },
    { id: 'ancient', EN: 'Ancient', SI: 'පුරාණ', icon: Landmark },
    { id: 'beach', EN: 'Beaches', SI: 'වෙරළ', icon: Waves },
    { id: 'wildlife', EN: 'Wildlife', SI: 'වනජීවී', icon: PawPrint },
    { id: 'mountains', EN: 'Hills', SI: 'කඳුකරය', icon: Mountain },
  ];

  const popularSearches = [
    { EN: "Sigiriya", SI: "සීගිරිය" },
    { EN: "Ella", SI: "ඇල්ල" },
    { EN: "Temple of the Tooth", SI: "දළදා මාළිගාව" },
    { EN: "Galle Fort", SI: "ගාල්ල කොටුව" }
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

  const dynamicSuggestions = useMemo(() => {
    if (search.length < 2) return [];
    return DESTINATIONS
      .filter(d => 
        d.name.EN.toLowerCase().includes(search.toLowerCase()) || 
        d.name.SI.includes(search)
      )
      .slice(0, 5);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
    if (search) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 500);
      return () => clearTimeout(timer);
    }
  }, [categoryFilter, locationFilter, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedDestinations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDestinations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDestinations, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setCategoryFilter('all');
    setLocationFilter('all');
    setSearch('');
    setCurrentPage(1);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (name: string) => {
    setSearch(name);
    setShowSuggestions(false);
  };

  return (
    <section id="destinations" className="min-h-screen pb-32 bg-white">
      {/* Radiant Destinations Header */}
      <div className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-[10s] scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 pattern-overlay opacity-5"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-10">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <h2 className="text-5xl md:text-8xl font-heritage font-black text-[#0a0a0a] tracking-tight uppercase leading-none">
              {UI_STRINGS.exploreDestinations[language]}
            </h2>
            <p className="text-[#E1306C] font-black text-[11px] md:text-[13px] uppercase tracking-[0.6em] drop-shadow-sm">
              {language === 'EN' ? "SEARCH FOR A PORTAL TO ANCIENT LANKA" : "පැරණි ලංකාවට පිවිසුමක් සොයන්න"}
            </p>
          </div>

          {/* Enhanced Search Bar Area with Suggestions */}
          <div className="max-w-3xl mx-auto relative animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300" ref={searchWrapperRef}>
            {/* Outer Decorative Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#E1306C]/20 via-[#f09433]/20 to-[#E1306C]/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            
            <div className="relative group overflow-hidden rounded-[2.8rem] bg-white border border-gray-100 shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.12)] focus-within:scale-[1.01] focus-within:ring-1 focus-within:ring-[#E1306C]/30 z-30">
              
              {/* Internal Shimmer Sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-search-glint"></div>
              </div>

              <div className="absolute inset-y-0 left-8 flex items-center text-gray-400 group-focus-within:text-[#E1306C] transition-colors duration-300">
                {isSearching ? (
                  <Loader2 size={24} className="animate-spin text-[#E1306C]" />
                ) : (
                  <Search size={24} className="group-hover:scale-110 transition-transform" />
                )}
              </div>

              <input 
                type="text" 
                placeholder={UI_STRINGS.searchPlaceholder[language]}
                value={search}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full pl-20 pr-16 py-7 md:py-8 bg-transparent text-lg md:text-xl font-medium focus:outline-none placeholder:text-gray-300 placeholder:italic tracking-tight"
              />

              {search && (
                <button 
                  onClick={() => { setSearch(''); setShowSuggestions(false); }}
                  className="absolute inset-y-0 right-8 flex items-center text-gray-300 hover:text-red-500 transition-all hover:scale-125"
                >
                  <X size={20} />
                </button>
              )}

              {/* Bottom Interactive Border */}
              <div className={`absolute bottom-0 left-0 h-[3px] insta-gradient transition-all duration-700 ${search ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
            </div>

            {/* Auto-Suggestions Dropdown */}
            {showSuggestions && (search.length > 0 || popularSearches.length > 0) && (
              <div className="absolute top-[calc(100%-1rem)] left-0 right-0 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-b-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.15)] pt-8 pb-4 z-20 animate-in slide-in-from-top-2 duration-300">
                <div className="max-h-[400px] overflow-y-auto no-scrollbar px-2">
                  
                  {/* Dynamic Results from Archive */}
                  {dynamicSuggestions.length > 0 && (
                    <div className="mb-4">
                      <div className="px-6 py-2 flex items-center gap-2 text-gray-400">
                        <TrendingUp size={12} className="text-[#E1306C]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Matched in Archive</span>
                      </div>
                      {dynamicSuggestions.map((dest) => (
                        <button
                          key={dest.id}
                          onClick={() => handleSuggestionClick(dest.name[language])}
                          className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center justify-between group/item transition-colors rounded-2xl"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                              <img src={dest.image} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#0a0a0a] group-hover/item:text-[#E1306C] transition-colors">{dest.name[language]}</p>
                              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{dest.location}</p>
                            </div>
                          </div>
                          <ArrowRight size={14} className="text-gray-200 group-hover/item:text-[#E1306C] group-hover/item:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Popular Suggestions */}
                  <div>
                    <div className="px-6 py-2 flex items-center gap-2 text-gray-400">
                      <Sparkles size={12} className="text-[#E1306C]" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Global Favorites</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      {popularSearches.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(s[language])}
                          className="text-left px-4 py-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 group/pop transition-colors border border-transparent hover:border-gray-100"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover/pop:text-[#E1306C] group-hover/pop:bg-white transition-all">
                            <History size={14} />
                          </div>
                          <span className="text-xs font-bold text-gray-500 group-hover/pop:text-[#0a0a0a] transition-colors">{s[language]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Static Visual Tags (Visible when no dropdown) */}
            {!showSuggestions && (
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-1000">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trending Hubs:</span>
                 {popularSearches.slice(0,3).map((s, i) => (
                   <button 
                     key={i}
                     onClick={() => setSearch(s[language])}
                     className="px-4 py-1.5 bg-black/5 hover:bg-[#E1306C] hover:text-white transition-all rounded-full text-[9px] font-black uppercase tracking-widest border border-black/5"
                   >
                     {s[language]}
                   </button>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 space-y-12">
        {/* Category Controls */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/90 backdrop-blur-xl p-2.5 rounded-[3rem] shadow-xl border border-white/50">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`flex items-center gap-2.5 px-7 py-3.5 rounded-full transition-all text-[10px] font-black uppercase tracking-widest ${
                    isActive 
                      ? 'bg-[#0a0a0a] text-white shadow-2xl scale-105' 
                      : 'text-gray-400 hover:bg-gray-50 hover:text-[#0a0a0a]'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'animate-pulse' : ''} />
                  <span>{language === 'EN' ? cat.EN : cat.SI}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-grow flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow group">
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full appearance-none px-8 py-5 bg-white border border-gray-100 rounded-3xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-[#E1306C]/10 outline-none cursor-pointer shadow-lg transition-all hover:border-[#E1306C]/30 text-[#0a0a0a]"
              >
                <option value="all">{UI_STRINGS.allRegions[language]}</option>
                {locations.filter(l => l !== 'all').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-hover:text-[#E1306C] transition-colors" />
            </div>

            {(categoryFilter !== 'all' || locationFilter !== 'all' || search) && (
              <button 
                onClick={resetFilters}
                className="p-5 bg-white border border-gray-100 rounded-3xl text-[#E1306C] shadow-lg hover:bg-red-50 transition-all active:scale-90"
                title="Reset Filters"
              >
                <RotateCcw size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Portals Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
            {paginatedDestinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className="group cursor-pointer bg-white rounded-[4rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:-translate-y-4 hover:shadow-[0_50px_100px_rgba(0,0,0,0.1)] transition-all duration-1000"
              >
                <div className="relative h-80 md:h-[400px] overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name[language]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                  />
                  <div className="absolute top-10 left-10 px-6 py-2.5 bg-white/95 backdrop-blur-md text-[#0a0a0a] text-[9px] font-black uppercase tracking-widest rounded-full border border-white shadow-2xl">
                    {dest.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-700">
                      <Compass size={40} className="group-hover:rotate-45 transition-transform duration-1000" />
                    </div>
                  </div>
                </div>

                <div className="p-12 space-y-6">
                  <div className="space-y-2">
                    <p className="text-[11px] font-black text-[#E1306C] uppercase tracking-[0.5em]">{dest.location}</p>
                    <h3 className="text-4xl font-heritage font-bold text-[#0a0a0a] group-hover:insta-text-gradient transition-all uppercase leading-tight tracking-tight">
                      {dest.name[language]}
                    </h3>
                  </div>
                  <p className="text-[12px] text-gray-400 leading-relaxed font-black uppercase tracking-[0.2em] italic opacity-80 line-clamp-2">
                    {dest.shortStory[language]}
                  </p>
                  <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.6em]">RESONANCE ACTIVE</span>
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-all duration-500">
                       <ArrowRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-48 text-center space-y-8 bg-[#fafafa] rounded-[5rem] border border-dashed border-gray-200">
            <div className="relative w-32 h-32 mx-auto">
               <div className="absolute inset-0 bg-[#E1306C]/10 rounded-full animate-ping" />
               <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center text-gray-200 shadow-inner">
                  <Compass size={56} className="animate-spin-slow" />
               </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tight">Portal Disconnected</h3>
              <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.4em] max-w-md mx-auto leading-loose">
                Your current query node "{search}" returned no matching archetypes. Try clearing your filters or refining your search parameters.
              </p>
              <button 
                onClick={resetFilters}
                className="mt-8 px-12 py-5 bg-[#0a0a0a] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-110 active:scale-95 transition-all"
              >
                Reset Search Grid
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-8 pt-20">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-16 h-16 rounded-2xl border border-gray-100 bg-white text-gray-300 hover:text-[#E1306C] disabled:opacity-10 transition-all shadow-xl flex items-center justify-center hover:-translate-x-2 active:scale-90"
            >
              <ChevronLeft size={28} />
            </button>
            <div className="flex gap-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-16 h-16 rounded-2xl text-xs font-black transition-all shadow-lg ${
                    currentPage === i + 1 
                      ? 'bg-[#0a0a0a] text-white scale-125 shadow-2xl z-10' 
                      : 'bg-white border border-gray-50 text-gray-400 hover:border-[#E1306C] hover:text-[#E1306C]'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-16 h-16 rounded-2xl border border-gray-100 bg-white text-gray-300 hover:text-[#E1306C] disabled:opacity-10 transition-all shadow-xl flex items-center justify-center hover:translate-x-2 active:scale-90"
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

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes search-glint {
          0% { left: -100%; opacity: 0; }
          20% { opacity: 0.5; }
          40% { opacity: 0; }
          100% { left: 200%; opacity: 0; }
        }
        .animate-search-glint {
          animation: search-glint 5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
};

export default Destinations;