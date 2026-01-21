
import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  Sparkles, 
  ExternalLink, 
  Loader2, 
  Cpu, 
  Signal, 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  Newspaper, 
  Zap, 
  CloudSun, 
  Coins, 
  AlertCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  MapPin,
  Brain
} from 'lucide-react';
import { Language } from '../types.ts';
import { searchGrounding, AIResponse } from '../services/gemini.ts';

interface SearchPortalProps {
  language: Language;
}

const POPULAR_SUGGESTIONS = [
  "Sigiriya Lion Rock",
  "Kandy Temple of the Tooth",
  "Ella Nine Arch Bridge",
  "Colombo Weather today",
  "Current LKR Exchange Rate",
  "Galle Dutch Fort",
  "Yala National Park Safari",
  "Trincomalee Whales",
  "Jaffna Library history",
  "Bentota Water Sports",
  "Train schedule Colombo to Badulla",
  "Best time to visit Sri Lanka",
  "Visa requirements for tourists",
  "Adam's Peak sunrise",
  "Horton Plains World's End"
];

const SearchPortal: React.FC<SearchPortalProps> = ({ language }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState('general');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDeepMode, setIsDeepMode] = useState(true);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'general', EN: 'Top Stories', SI: 'ප්‍රධාන පුවත්', icon: Newspaper, prompt: "Latest major news in Sri Lanka right now" },
    { id: 'weather', EN: 'Island Weather', SI: 'කාලගුණය', icon: CloudSun, prompt: "Current weather report and forecasts for major Sri Lankan cities" },
    { id: 'economy', EN: 'Market Pulse', SI: 'ආර්ථිකය', icon: Coins, prompt: "Current USD to LKR exchange rate and major economic updates in Sri Lanka" },
    { id: 'travel', EN: 'Travel Alerts', SI: 'සංචාරක පුවත්', icon: AlertCircle, prompt: "Current travel advisories, train delays, and tourist news for Sri Lanka" },
  ];

  const handleSearch = async (customQuery?: string) => {
    const searchQuery = customQuery || query;
    if (!searchQuery.trim() || isLoading) return;

    setIsLoading(true);
    setShowSuggestions(false);
    setResult(null);
    setStatus(language === 'EN' ? 'Initializing Neural Uplink...' : 'සම්බන්ධතාවය ස්ථාපිත කරමින්...');

    const statuses = isDeepMode 
      ? (language === 'EN' 
          ? ['Engaging Reasoning Engine...', 'Analyzing Contextual Patterns...', 'Synthesizing Strategic Response...', 'Finalizing Logic Path...']
          : ['තර්කන එන්ජිම පණගන්වමින්...', 'පසුබිම් රටා විශ්ලේෂණය කරමින්...', 'ප්‍රතිචාරය සකසමින්...', 'අවසාන තොරතුරු එක් කරමින්...'])
      : (language === 'EN' 
          ? ['Syncing with Global News Mesh...', 'Verifying Local Registries...', 'Synthesizing Live Data...']
          : ['තොරතුරු ජාලය පිරික්සමින්...', 'මූලාශ්‍ර තහවුරු කරමින්...', 'පුවත් සකසමින්...']);

    let sIdx = 0;
    const sInterval = setInterval(() => {
      if (sIdx < statuses.length) {
        setStatus(statuses[sIdx]);
        sIdx++;
      }
    }, isDeepMode ? 2000 : 1200);

    const data = await searchGrounding(searchQuery, language, isDeepMode);
    
    clearInterval(sInterval);
    setResult(data);
    setIsLoading(false);
    setStatus('');
  };

  useEffect(() => {
    handleSearch(categories[0].prompt);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 1) {
      const filtered = POPULAR_SUGGESTIONS.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (s: string) => {
    setQuery(s);
    setShowSuggestions(false);
    handleSearch(s);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#262626] pt-24 pb-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-gray-100 pb-12">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-4 px-5 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-gray-400 text-[9px] font-black uppercase tracking-[0.4em]">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              Live_Island_Pulse_Registry
            </div>
            <h1 className="text-5xl md:text-7xl font-heritage font-bold tracking-tighter uppercase text-[#0a0a0a]">
              Island <span className="italic insta-text-gradient">Live Feed.</span>
            </h1>
            <p className="max-w-xl text-gray-500 text-lg font-light italic leading-relaxed">
              {language === 'EN' 
                ? "Real-time verification of events, weather, and logistics across the pearl."
                : "දිවයින පුරා සිදුවන සිදුවීම්, කාලගුණය සහ තොරතුරු සජීවීව තහවුරු කරගන්න."}
            </p>
          </div>

          <div className="flex flex-col items-end gap-6">
            <button 
              onClick={() => setIsDeepMode(!isDeepMode)}
              className={`flex items-center gap-4 px-6 py-3 rounded-2xl border transition-all shadow-sm ${isDeepMode ? 'bg-[#0a0a0a] border-transparent text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-[#E1306C]/40'}`}
            >
              <Brain size={18} className={isDeepMode ? 'text-[#E1306C] animate-pulse' : ''} />
              <div className="text-left">
                <p className="text-[8px] font-black uppercase tracking-widest leading-none mb-1">Neural_Depth</p>
                <p className="text-[10px] font-bold tracking-widest uppercase">{isDeepMode ? 'Thinking_Mode_ON' : 'Thinking_Mode_OFF'}</p>
              </div>
            </button>
            <div className="hidden lg:flex items-center gap-8">
              <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-2 w-48">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Model_Type</p>
                <p className="text-xl font-heritage font-bold text-blue-500">{isDeepMode ? 'Gemini 3 Pro' : 'Gemini 3 Flash'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-3 space-y-4">
             <h3 className="px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4">News_Sectors</h3>
             <div className="flex flex-row xl:flex-col gap-3 overflow-x-auto no-scrollbar pb-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveTab(cat.id);
                        handleSearch(cat.prompt);
                      }}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all whitespace-nowrap border shrink-0 ${
                        isActive 
                          ? 'bg-[#0a0a0a] text-white border-transparent shadow-xl scale-105 z-10' 
                          : 'bg-white text-gray-400 border-gray-100 hover:border-[#E1306C]/40 hover:text-[#0a0a0a]'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-[#E1306C]' : ''} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{language === 'EN' ? cat.EN : cat.SI}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />}
                    </button>
                  );
                })}
             </div>
          </div>

          <div className="xl:col-span-9 space-y-10">
            <div className="relative group" ref={suggestionRef}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E1306C]/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className="relative rounded-3xl bg-white border border-gray-100 flex items-center shadow-sm overflow-hidden z-20"
              >
                <div className="pl-8 text-gray-400">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => query.trim().length > 1 && setShowSuggestions(suggestions.length > 0)}
                  placeholder={language === 'EN' ? "Query specific events or locations..." : "තොරතුරු විමසන්න..."}
                  className="flex-grow bg-transparent border-none outline-none px-6 py-6 text-base font-bold text-[#0a0a0a] placeholder:text-gray-300"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-10 py-6 bg-[#0a0a0a] text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#E1306C] transition-all disabled:opacity-20 flex items-center gap-3"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Execute_Sync'}
                </button>
              </form>

              {showSuggestions && (
                <div className="absolute top-[calc(100%-1rem)] left-0 right-0 bg-white border border-gray-100 rounded-b-3xl shadow-2xl pt-6 pb-4 z-10 animate-in slide-in-from-top-2 duration-300">
                  <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Recommended Nodes</p>
                  </div>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => selectSuggestion(s)}
                      className="w-full text-left px-8 py-3 hover:bg-gray-50 flex items-center gap-4 group/item transition-colors"
                    >
                      <MapPin size={14} className="text-gray-300 group-hover/item:text-[#E1306C] transition-colors" />
                      <span className="text-sm font-bold text-gray-600 group-hover/item:text-[#0a0a0a] transition-colors">{s}</span>
                      <ChevronRight size={14} className="ml-auto text-gray-200 opacity-0 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="py-32 flex flex-col items-center gap-8 animate-in fade-in duration-500">
                 <div className="relative">
                    <div className="w-24 h-24 rounded-3xl border-2 border-dashed border-gray-200 animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       {isDeepMode ? <Brain size={32} className="text-[#E1306C] animate-pulse" /> : <Cpu size={32} className="text-[#E1306C] animate-pulse" />}
                    </div>
                 </div>
                 <div className="text-center space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">{status}</p>
                    {isDeepMode && (
                      <div className="px-6 py-2 bg-black text-white text-[8px] font-black rounded-full tracking-[0.4em] uppercase shadow-lg border border-white/10 mx-auto w-fit">
                         Deep_Reasoning_Protocol_Active
                      </div>
                    )}
                    <div className="flex justify-center gap-1.5">
                       <div className="w-1 h-1 rounded-full bg-[#E1306C] animate-bounce" style={{ animationDelay: '0ms' }} />
                       <div className="w-1 h-1 rounded-full bg-[#E1306C] animate-bounce" style={{ animationDelay: '150ms' }} />
                       <div className="w-1 h-1 rounded-full bg-[#E1306C] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                 </div>
              </div>
            ) : result ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-6 duration-700">
                 <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-[#0a0a0a] group-hover:rotate-6 transition-transform">
                          <Newspaper size={160} />
                       </div>
                       
                       <div className="flex items-center gap-4 mb-10 text-[#E1306C]">
                          {isDeepMode ? <Brain size={18} className="animate-pulse" /> : <Sparkles size={18} />}
                          <span className="text-[10px] font-black uppercase tracking-[0.4em]">{isDeepMode ? 'Deep_Neural_Synthesis' : 'Integrated_Synthesis'}</span>
                          <div className="ml-auto flex items-center gap-2 text-gray-300">
                             <Clock size={12} />
                             <span className="text-[9px] font-bold">JUST NOW</span>
                          </div>
                       </div>

                       <div className="prose prose-lg max-w-none prose-headings:font-heritage prose-headings:text-[#0a0a0a] prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-[#0a0a0a] prose-a:text-[#E1306C] whitespace-pre-line relative z-10 font-medium">
                          {result.text}
                       </div>

                       <div className="mt-12 pt-8 border-t border-gray-50 flex flex-wrap gap-6 items-center">
                          <div className="flex items-center gap-2">
                             <ShieldCheck size={14} className="text-green-500" />
                             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Grounding_Verified</span>
                          </div>
                          {isDeepMode && (
                            <div className="flex items-center gap-2">
                               <TrendingUp size={14} className="text-blue-500" />
                               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Analytical_Depth: Maximum</span>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>

                 <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm space-y-8">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                             <Signal size={16} />
                          </div>
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Primary_Sources</h3>
                       </div>
                       
                       <div className="space-y-3">
                          {result.links.length > 0 ? result.links.map((link, i) => (
                            <a 
                              key={i}
                              href={link.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex flex-col gap-1 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#E1306C]/40 hover:bg-white hover:shadow-xl transition-all"
                            >
                               <div className="flex items-center justify-between mb-1">
                                  <span className="text-[8px] font-black text-[#E1306C] uppercase tracking-widest">Node_Ref: {i+1}</span>
                                  <ExternalLink size={12} className="text-gray-300 group-hover:text-[#0a0a0a] transition-colors" />
                               </div>
                               <span className="text-xs font-bold text-gray-500 group-hover:text-[#0a0a0a] leading-snug line-clamp-2">{link.title}</span>
                            </a>
                          )) : (
                            <div className="py-12 text-center space-y-4">
                               <Database size={24} className="mx-auto text-gray-100" />
                               <p className="text-[10px] font-bold text-gray-300 italic tracking-widest uppercase">Internal Cache Only</p>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="py-40 text-center space-y-8 animate-in fade-in duration-1000">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-100">
                    <Signal size={32} />
                 </div>
                 <p className="text-gray-400 font-heritage text-xl italic uppercase tracking-widest">Awaiting Command Node...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}} />
    </div>
  );
};

export default SearchPortal;
