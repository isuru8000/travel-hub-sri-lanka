
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
    <section id="destinations" className="min-h-screen pb-32 bg-white">
      {/* Radiant Destinations Header */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=2000&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 pattern-overlay opacity-5"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <h2 className="text-4xl md:text-7xl font-heritage font-black text-[#0a0a0a] tracking-tight uppercase">
              {UI_STRINGS.exploreDestinations[language]}
            </h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.5em]">
              {language === 'EN' ? "SEARCH FOR A PORTAL TO ANCIENT LANKA" : "පැරණි ලංකාවට පිවිසුමක් සොයන්න"}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center text-gray-300 group-focus-within:text-[#E1306C] transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={UI_STRINGS.searchPlaceholder[language]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-14 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 text-base font-medium transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-6 flex items-center text-gray-300 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 space-y-8">
        {/* Category Controls */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/90 backdrop-blur-xl p-2 rounded-[2.5rem] shadow-lg border border-gray-50">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all text-[10px] font-black uppercase tracking-widest ${
                    isActive 
                      ? 'bg-[#0a0a0a] text-white shadow-xl scale-105' 
                      : 'text-gray-400 hover:bg-gray-50 hover:text-[#0a0a0a]'
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
                className="w-full appearance-none px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-[#E1306C]/10 outline-none cursor-pointer shadow-sm transition-all hover:border-[#E1306C]/30 text-[#0a0a0a]"
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
                className="p-4 bg-white border border-gray-100 rounded-2xl text-[#E1306C] shadow-sm hover:bg-red-50 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Portals Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {paginatedDestinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className="group cursor-pointer bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:-translate-y-3 hover:shadow-2xl transition-all duration-700"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name[language]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  />
                  <div className="absolute top-8 left-8 px-5 py-2 bg-white/90 backdrop-blur-md text-[#0a0a0a] text-[9px] font-black uppercase tracking-widest rounded-full border border-white/50 shadow-xl">
                    {dest.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/40 shadow-2xl">
                      <Compass size={32} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="p-10 space-y-5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-[#E1306C] uppercase tracking-[0.4em]">{dest.location}</p>
                    <h3 className="text-3xl font-heritage font-black text-[#0a0a0a] group-hover:insta-text-gradient transition-all uppercase leading-tight">
                      {dest.name[language]}
                    </h3>
                  </div>
                  <p className="text-base text-gray-400 leading-relaxed font-bold uppercase tracking-widest text-[11px]">
                    {dest.shortStory[language]}
                  </p>
                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] font-black text-gray-200 uppercase tracking-[0.5em]">ENTRY PORTAL ACTIVE</span>
                    <ArrowRight size={20} className="text-[#E1306C] group-hover:translate-x-3 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-6 bg-white rounded-[4rem] shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
              <Search size={40} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-heritage font-black text-[#0a0a0a] uppercase tracking-tight">Archives empty</h3>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] max-w-xs mx-auto">No records found for the current query node.</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 pt-16">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-14 h-14 rounded-2xl border border-gray-100 bg-white text-gray-300 hover:text-[#E1306C] disabled:opacity-20 transition-all shadow-sm flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-14 h-14 rounded-2xl text-[11px] font-black transition-all shadow-sm ${
                    currentPage === i + 1 
                      ? 'bg-[#0a0a0a] text-white scale-110 shadow-xl' 
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
              className="w-14 h-14 rounded-2xl border border-gray-100 bg-white text-gray-300 hover:text-[#E1306C] disabled:opacity-20 transition-all shadow-sm flex items-center justify-center"
            >
              <ChevronRight size={24} />
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
