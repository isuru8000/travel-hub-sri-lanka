
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
    { id: 'all', EN: 'All', SI: 'සියල්ල', icon: LayoutGrid },
    { id: 'ancient', EN: 'Ancient', SI: 'පුරාණ', icon: Landmark },
    { id: 'beach', EN: 'Beaches', SI: 'වෙරළ', icon: Waves },
    { id: 'wildlife', EN: 'Wildlife', SI: 'වනජීවී', icon: PawPrint },
    { id: 'mountains', EN: 'Hills', SI: 'කඳුකරය', icon: Mountain },
  ];

  const popularSearches = [
    { EN: "Sigiriya", SI: "සීගිරිය" },
    { EN: "Ella", SI: "ඇල්ල" },
    { EN: "Temple", SI: "මාළිගාව" }
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
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setCategoryFilter('all');
    setLocationFilter('all');
    setSearch('');
    setCurrentPage(1);
  };

  return (
    <section id="destinations" className="min-h-screen pb-32 bg-[#fafafa]">
      {/* Refined More Compact Header Section */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 pattern-overlay opacity-10"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
          <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
            <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white tracking-tight">
              {UI_STRINGS.exploreDestinations[language]}
            </h2>
            <p className="text-white/70 font-light text-base md:text-lg italic">
              {language === 'EN' ? "Search for a portal to ancient Lanka" : "පැරණි ලංකාවට පිවිසුමක් සොයන්න"}
            </p>
          </div>

          {/* Compact Small Search Bar */}
          <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-[#E1306C] transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={UI_STRINGS.searchPlaceholder[language]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-14 py-4 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 text-base font-medium transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-6 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {popularSearches.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearch(s[language])}
                  className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-white/10 hover:bg-[#E1306C] border border-white/20 rounded-full transition-all text-white backdrop-blur-md"
                >
                  {s[language]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 space-y-8">
        {/* Compact Category Bar */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/80 backdrop-blur-xl p-2 rounded-[2rem] shadow-xl border border-white/40">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all text-[11px] font-black uppercase tracking-widest ${
                    isActive 
                      ? 'bg-[#262626] text-white shadow-lg scale-105' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  <span>{language === 'EN' ? cat.EN : cat.SI}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-grow flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full appearance-none px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-[#E1306C]/10 outline-none cursor-pointer shadow-md transition-all hover:border-[#E1306C]/30 text-[#262626]"
              >
                <option value="all">{UI_STRINGS.allRegions[language]}</option>
                {locations.filter(l => l !== 'all').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-300 pointer-events-none" />
            </div>

            {(categoryFilter !== 'all' || locationFilter !== 'all' || search) && (
              <button 
                onClick={resetFilters}
                className="p-3.5 bg-white border border-gray-100 rounded-2xl text-[#E1306C] shadow-md hover:bg-red-50 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/40 rounded-2xl border border-white/20">
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                {filteredDestinations.length} Portals Found
              </p>
           </div>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
             Archive Map System v1.2
           </p>
        </div>

        {/* Grid Display */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedDestinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name[language]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/40 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/20">
                    {dest.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                      <Compass size={24} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-[#E1306C] uppercase tracking-widest">{dest.location}</p>
                    <h3 className="text-2xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all">
                      {dest.name[language]}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-2 italic">
                    "{dest.shortStory[language]}"
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Digital Twin Active</span>
                    <ArrowRight size={18} className="text-[#E1306C] group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-6 bg-white rounded-[3rem] shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Search size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-heritage font-bold text-[#262626]">No records found</h3>
              <p className="text-gray-400 text-sm italic max-w-xs mx-auto">Perhaps try a different keyword or check your spelling?</p>
            </div>
          </div>
        )}

        {/* Compact Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-12">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-gray-100 bg-white text-gray-300 hover:text-[#E1306C] disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all shadow-sm ${
                    currentPage === i + 1 
                      ? 'bg-[#262626] text-white' 
                      : 'bg-white border border-gray-100 text-gray-400 hover:border-[#E1306C]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-gray-100 bg-white text-gray-300 hover:text-[#E1306C] disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
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
