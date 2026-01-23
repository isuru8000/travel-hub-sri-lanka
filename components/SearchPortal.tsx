
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
  Brain,
  Key,
  Lock,
  RefreshCw,
  Orbit,
  ZapOff
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
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [isError, setIsError] = useState(false);
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
    setIsError(false);
    setShowSuggestions(false);
    setResult(null);
    setNeedsApiKey(false);
    setStatus(language === 'EN' ? 'Initializing Neural Uplink...' : 'සම්බන්ධතාවය ස්ථාපිත කරමින්...');

    const statuses = isDeepMode 
      ? (language === 'EN' 
          ? ['Engaging Reasoning Engine...', 'Analyzing Contextual Patterns...', 'Synthesizing Strategic Response...', 'Finalizing Logic Path...']
          : ['තර්කන එන්ජිම පණගන්වමින්...', 'පසුබිම් රටා විශ්ලේෂණය කරමින්...', 'ප්‍රතිචාරය සකසමින්...', 'අවසාන තොරතුරු එක් කරමින්...'])
      : (language === 'EN' 
          ? ['Syncing with Global News Mesh...', 'Verifying Local Registries...', 'Synthesizing Live Data...']
          : ['තර්ථක තොරතුරු ජාලය පිරික්සමින්...', 'මූලාශ්‍ර තහවුරු කරමින්...', 'පුවත් සකසමින්...']);

    let sIdx = 0;
    const sInterval = setInterval(() => {
      if (sIdx < statuses.length) {
        setStatus(statuses[sIdx]);
        sIdx++;
      }
    }, isDeepMode ? 2000 : 1200);

    try {
      const data = await searchGrounding(searchQuery, language, isDeepMode);
      clearInterval(sInterval);
      
      if (data.error === "API_KEY_REQUIRED") {
        setNeedsApiKey(true);
      } else if (data.text.includes("Critical Error") || data.text.includes("Error syncing")) {
        setIsError(true);
      } else {
        setResult(data);
      }
    } catch (e) {
      clearInterval(sInterval);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setStatus('');
    }
  };

  const handleKeySelection = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setNeedsApiKey(false);
      handleSearch();
    }
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
    <div className="min-h-screen bg-[#fafafa] text-[#262626] pt-24 pb-20 md:pb-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] md:h-[600px] bg-gradient-to-b from-blue-50/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-8 md:space-y-12">
        
        {/* Header Dashboard Style */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-8 border-b border-gray-100 pb-8 md:pb-12">
          <div className="space-y-4 md:space-y-6 text-left w-full">
            <div className="inline-flex items-center gap-3 md:gap-4 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-gray-400 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              Live_Island_Pulse_Registry
            </div>
            <h1 className="text-4xl md:text-7xl font-heritage font-bold tracking-tighter uppercase text-[#0a0a0a]">
              Island <span className="italic insta-text-gradient">Live Feed.</span>
            </h1>
            <p className="max-w-xl text-gray-500 text-base md:text-lg font-light italic leading-relaxed">
              {language === 'EN' 
                ? "Real-time verification of events, weather, and logistics across the pearl."
                : "දිවයින පුරා සිදුවන සිදුවීම්, කාලගුණය සහ තොරතුරු සජීවීව තහවුරු කරගන්න."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 md:gap-6 w-full lg:w-auto">
            <button 
              onClick={() => setIsDeepMode(!isDeepMode)}
              className={`flex items-center gap-4 px-5 py-3 rounded-2xl border transition-all shadow-sm w-full sm:w-auto ${isDeepMode ? 'bg-[#0a0a0a] border-transparent text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-[#E1306C]/40'}`}
            >
              <Brain size={18} className={isDeepMode ? 'text-[#E1306C] animate-pulse' : ''} />
              <div className="text-left">
                <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest leading-none mb-1">Neural_Depth</p>
                <p className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase">{isDeepMode ? 'Thinking_Mode_ON' : 'Thinking_Mode_OFF'}</p>
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

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* Left Column: Categories */}
          <div className="xl:col-span-3 space-y-4">
             <h3 className="px-4 text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2 md:mb-4">News_Sectors</h3>
             <div className="flex flex-row xl:flex-col gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 xl:mx-0 xl:px-0">
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
                      className={`flex items-center gap-3 md:gap-4 px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all whitespace-nowrap border shrink-0 ${
                        isActive 
                          ? 'bg-[#0a0a0a] text-white border-transparent shadow-lg scale-105 z-10' 
                          : 'bg-white text-gray-400 border-gray-100 hover:border-[#E1306C]/40 hover:text-[#0a0a0a]'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-[#E1306C]' : ''} />
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">{language === 'EN' ? cat.EN : cat.SI}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />}
                    </button>
                  );
                })}
             </div>
          </div>

          {/* Main Column: Content */}
          <div className="xl:col-span-9 space-y-8 md:space-y-10">
            
            {/* COMING SOON Banner */}
            <div className="relative overflow-hidden bg-[#0a0a0a] rounded-[3rem] p-8 md:p-14 border border-white/10 group animate-in slide-in-from-top-4 duration-1000">
              {/* Animated Background Mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,48,108,0.15)_0%,transparent_70%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[3000ms]" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-6 text-center md:text-left">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#E1306C]/10 border border-[#E1306C]/30 text-[#E1306C] rounded-full text-[9px] font-black uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(225,48,108,0.2)]">
                    <Zap size={12} fill="currentColor" className="animate-pulse" />
                    Archive_Next_Protocol
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white uppercase tracking-tighter leading-none">
                      COMING <span className="insta-text-gradient italic">SOON.</span>
                    </h2>
                    <div className="w-20 h-1 bg-[#E1306C] rounded-full mx-auto md:mx-0 shadow-[0_0_10px_#E1306C]" />
                  </div>
                  <p className="text-gray-400 text-sm md:text-lg font-medium italic opacity-80 leading-relaxed max-w-xl">
                    {language === 'EN' 
                      ? "The 'Island Pulse' neural feed is undergoing deep calibration. Expect volumetric real-time data streams and predictive travel alerts in the next cycle."
                      : "අයිලන්ඩ් පල්ස් සජීවී පුවත් ජාලය දැනට ක්‍රමානුකූලව යාවත්කාලීන වෙමින් පවතී. මීළඟ අදියරේදී සජීවී දත්ත සහ තොරතුරු ඔබ වෙත සමීප වනු ඇත."}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-8 md:gap-12">
                  <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                  <div className="text-center md:text-right space-y-2">
                    <div className="flex items-center justify-center md:justify-end gap-3 text-white/20">
                      <Orbit size={14} className="animate-spin-slow" />
                      <p className="text-[8px] font-black uppercase tracking-[0.5em]">Target_Registry</p>
                    </div>
                    <p className="text-2xl md:text-4xl font-heritage font-bold text-white tracking-[0.2em] md:tracking-[0.3em] uppercase">v2026.08</p>
                    <div className="flex justify-center md:justify-end gap-1">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E1306C]/40 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar with Suggestions */}
            <div className="relative group" ref={suggestionRef}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E1306C]/20 to-blue-500/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className="relative rounded-2xl md:rounded-3xl bg-white border border-gray-100 flex items-center shadow-sm overflow-hidden z-20"
              >
                <div className="pl-4 md:pl-8 text-gray-400">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => query.trim().length > 1 && setShowSuggestions(suggestions.length > 0)}
                  placeholder={language === 'EN' ? "Query events..." : "තොරතුරු විමසන්න..."}
                  className="flex-grow bg-transparent border-none outline-none px-3 md:px-6 py-4 md:py-6 text-sm md:text-base font-bold text-[#0a0a0a] placeholder:text-gray-300"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-6 md:px-10 py-4 md:py-6 bg-[#0a0a0a] text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-[#E1306C] transition-all disabled:opacity-20 flex items-center gap-2 md:gap-3"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : (
                    <>
                      <span className="hidden sm:inline">Execute_Sync</span>
                      <span className="sm:hidden">Sync</span>
                    </>
                  )}
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-[calc(100%-0.5rem)] left-0 right-0 bg-white border border-gray-100 rounded-b-2xl md:rounded-b-3xl shadow-2xl pt-4 pb-3 z-10 animate-in slide-in-from-top-2 duration-300">
                  <div className="px-4 pb-2 mb-1 border-b border-gray-50">
                    <p className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-widest">Recommended Nodes</p>
                  </div>
                  <div className="max-h-60 overflow-y-auto no-scrollbar">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => selectSuggestion(s)}
                        className="w-full text-left px-6 md:px-8 py-2 md:py-3 hover:bg-gray-50 flex items-center gap-3 md:gap-4 group/item transition-colors"
                      >
                        <MapPin size={12} className="text-gray-300 group-hover/item:text-[#E1306C] transition-colors" />
                        <span className="text-xs md:text-sm font-bold text-gray-600 group-hover/item:text-[#0a0a0a] transition-colors line-clamp-1">{s}</span>
                        <ChevronRight size={12} className="ml-auto text-gray-200 opacity-0 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Area */}
            {isLoading ? (
              <div className="py-20 md:py-32 flex flex-col items-center gap-6 md:gap-8 animate-in fade-in duration-500">
                 <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-gray-200 animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       {/* Fix: Replaced invalid Tailwind classes with standard responsive width and height classes */}
                       {isDeepMode ? <Brain className="w-7 h-7 md:w-8 md:h-8 text-[#E1306C] animate-pulse" /> : <Cpu className="w-7 h-7 md:w-8 md:h-8 text-[#E1306C] animate-pulse" />}
                    </div>
                 </div>
                 <div className="text-center space-y-3 md:space-y-4 px-6">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-gray-300">{status}</p>
                    {isDeepMode && (
                      <div className="px-5 py-1.5 bg-black text-white text-[7px] md:text-[8px] font-black rounded-full tracking-[0.3em] md:tracking-[0.4em] uppercase shadow-lg border border-white/10 mx-auto w-fit">
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
            ) : needsApiKey ? (
              <div className="py-20 md:py-32 flex flex-col items-center gap-10 animate-in fade-in duration-700">
                 <div className="w-24 h-24 bg-white/50 backdrop-blur-xl border border-gray-100 rounded-full flex items-center justify-center shadow-2xl relative group">
                    <div className="absolute inset-0 bg-[#E1306C]/10 rounded-full animate-ping opacity-20" />
                    <Lock size={40} className="text-[#E1306C] group-hover:scale-110 transition-transform" />
                 </div>
                 <div className="text-center space-y-4 max-w-lg px-6">
                    <h3 className="text-3xl font-heritage font-bold text-[#0a0a0a]">Permission Required</h3>
                    <p className="text-gray-500 font-medium italic leading-relaxed">
                      {language === 'EN' 
                        ? "Real-time search grounding requires a verified Project Key. Please select your key to synchronize the live registry." 
                        : "තත්‍ය කාලීන තොරතුරු පිරික්සීම සඳහා තහවුරු කළ ව්‍යාපෘති යතුරක් අවශ්‍ය වේ. කරුණාකර ඔබගේ යතුර තෝරාගන්න."}
                    </p>
                    <div className="pt-6">
                       <button 
                         onClick={handleKeySelection}
                         className="group relative px-12 py-5 bg-[#0a0a0a] text-white font-black text-xs uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all hover:scale-110 hover:shadow-2xl active:scale-95 flex items-center gap-4 mx-auto"
                       >
                         <div className="absolute inset-0 bg-gradient-to-r from-[#E1306C] to-[#f09433] opacity-0 group-hover:opacity-100 transition-opacity" />
                         <Key size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
                         <span className="relative z-10">Select Project Key</span>
                       </button>
                       <p className="mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                         Required for: <span className="text-[#E1306C]">Google Search Tool</span>
                       </p>
                    </div>
                 </div>
              </div>
            ) : isError ? (
              <div className="py-20 md:py-32 flex flex-col items-center gap-10 animate-in fade-in duration-700">
                 <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-400">
                    <AlertCircle size={40} />
                 </div>
                 <div className="text-center space-y-4 px-6">
                    <h3 className="text-2xl font-heritage font-bold text-[#0a0a0a]">Registry Sync Failed</h3>
                    <p className="text-gray-400 font-medium italic">We're having trouble reaching the live web registry. This might be due to regional restrictions or API limits.</p>
                    <div className="pt-6">
                       <button 
                         onClick={() => handleSearch()}
                         className="px-10 py-4 bg-[#0a0a0a] text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 mx-auto hover:scale-105 transition-transform"
                       >
                         <RefreshCw size={16} />
                         Retry Sync
                       </button>
                    </div>
                 </div>
              </div>
            ) : result ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 animate-in slide-in-from-bottom-6 duration-700">
                 
                 {/* Main Content Block */}
                 <div className="lg:col-span-8 space-y-6 md:space-y-8">
                    <div className="bg-white border border-gray-100 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-[0.01] text-[#0a0a0a] group-hover:rotate-6 transition-transform hidden sm:block">
                          <Newspaper size={160} />
                       </div>
                       
                       <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10 text-[#E1306C]">
                          {/* Fix: Replaced invalid Tailwind classes with standard responsive width and height classes */}
                          {isDeepMode ? <Brain className="w-4 h-4 md:w-[18px] md:h-[18px] animate-pulse" /> : <Sparkles className="w-4 h-4 md:w-[18px] md:h-[18px]" />}
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">{isDeepMode ? 'Deep_Neural_Synthesis' : 'Integrated_Synthesis'}</span>
                          <div className="ml-auto flex items-center gap-1.5 md:gap-2 text-gray-300">
                             <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                             <span className="text-[8px] md:text-[9px] font-bold uppercase">JUST NOW</span>
                          </div>
                       </div>

                       <div className="prose prose-sm md:prose-lg max-w-none prose-headings:font-heritage prose-headings:text-[#0a0a0a] prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-[#0a0a0a] prose-a:text-[#E1306C] whitespace-pre-line relative z-10 font-medium">
                          {result.text}
                       </div>

                       <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-50 flex flex-wrap gap-4 md:gap-6 items-center">
                          <div className="flex items-center gap-2">
                             <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500" />
                             <span className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">Grounding_Verified</span>
                          </div>
                          {isDeepMode && (
                            <div className="flex items-center gap-2">
                               <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-500" />
                               <span className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">Analytical_Depth: Max</span>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* Sidebar: Sources */}
                 <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm space-y-6 md:space-y-8">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                             <Signal size={16} />
                          </div>
                          <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Primary_Sources</h3>
                       </div>
                       
                       <div className="space-y-2 md:space-y-3">
                          {result.links.length > 0 ? result.links.map((link, i) => (
                            <a 
                              key={i}
                              href={link.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex flex-col gap-1 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#E1306C]/40 hover:bg-white hover:shadow-lg transition-all"
                            >
                               <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-[7px] md:text-[8px] font-black text-[#E1306C] uppercase tracking-widest">Node_Ref: {i+1}</span>
                                  <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-300 group-hover:text-[#0a0a0a] transition-colors" />
                               </div>
                               <span className="text-[10px] md:text-xs font-bold text-gray-500 group-hover:text-[#0a0a0a] leading-snug line-clamp-1">{link.title}</span>
                            </a>
                          )) : (
                            <div className="py-8 md:py-12 text-center space-y-3 md:space-y-4">
                               <Database className="w-5 h-5 md:w-6 md:h-6 mx-auto text-gray-100" />
                               <p className="text-[9px] md:text-[10px] font-bold text-gray-300 italic tracking-widest uppercase">Internal Cache Only</p>
                            </div>
                          )}
                       </div>
                    </div>

                    <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#E1306C]/5 border border-[#E1306C]/10 space-y-4">
                       <div className="flex items-center gap-3 text-[#E1306C]">
                          <Zap size={14} />
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Quick Actions</span>
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => { setQuery('Colombo Traffic'); handleSearch('Current traffic status in Colombo city'); }}
                            className="p-2.5 md:p-3 bg-white rounded-xl text-[7px] md:text-[8px] font-black uppercase tracking-widest border border-gray-100 hover:border-[#E1306C]/30 transition-all flex items-center justify-center gap-1.5 md:gap-2 group"
                          >
                             Traffic <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button 
                            onClick={() => { setQuery('Kandy Train'); handleSearch('Current Kandy to Colombo train schedule and delays'); }}
                            className="p-2.5 md:p-3 bg-white rounded-xl text-[7px] md:text-[8px] font-black uppercase tracking-widest border border-gray-100 hover:border-[#E1306C]/30 transition-all flex items-center justify-center gap-1.5 md:gap-2 group"
                          >
                             Trains <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="py-24 md:py-40 text-center space-y-6 md:space-y-8 animate-in fade-in duration-1000">
                 <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-100 shadow-inner">
                    <Signal className="w-7 h-7 md:w-8 md:h-8" />
                 </div>
                 <p className="text-gray-300 font-heritage text-lg md:text-xl italic uppercase tracking-[0.2em] md:tracking-widest px-4 leading-relaxed">Awaiting Command Node Sync...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Status HUD (Mobile Hidden) */}
      <div className="hidden md:flex fixed bottom-8 right-8 flex-col items-end gap-4 pointer-events-none opacity-40">
         <div className="flex items-center gap-4">
            <div className="text-right">
               <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Registry_Status</p>
               <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">UP_TIME_99.9%</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-300 shadow-sm">
               <Database size={16} />
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
