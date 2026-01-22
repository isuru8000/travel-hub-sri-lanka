
import React, { useState, useRef, useEffect } from 'react';
/* Added ChevronRight to imports to fix "Cannot find name 'ChevronRight'" error */
import { Sparkles, X, Send, Compass, Loader2, History, Info, Square, Zap, Cpu, ShieldCheck, MapPin, ExternalLink, Brain, Bot, BotMessageSquare, ChevronRight } from 'lucide-react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { getLankaGuideResponse, GroundingLink } from '../services/gemini.ts';

interface Message {
  role: 'user' | 'bot';
  text: string;
  links?: GroundingLink[];
  isThinking?: boolean;
}

interface AIModalProps {
  language: Language;
}

const AIModal: React.FC<AIModalProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeepMode, setIsDeepMode] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);
  const stopTypingRef = useRef(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        (err) => console.debug("Location access denied", err)
      );
    }
  }, []);

  const suggestions = [
    { 
      id: 'nearby', 
      icon: <MapPin size={16} />, 
      EN: "How should I travel from Colombo to Ella? (Train vs Bus)", 
      SI: "කොළඹ සිට ඇල්ලට යාමට හොඳම ක්‍රමය කුමක්ද? (දුම්රිය ද බස් රථය ද?)",
      label: { EN: "Transport Info", SI: "ප්‍රවාහන තොරතුරු" }
    },
    { 
      id: 'history', 
      icon: <History size={16} />, 
      EN: "What are the fair rates for Tuk-Tuks and how to use PickMe?", 
      SI: "ත්‍රිරෝද රථ සඳහා සාධාරණ ගාස්තු සහ PickMe භාවිතා කරන්නේ කෙසේද?",
      label: { EN: "Local Commute", SI: "දේශීය ගමන්" }
    },
    { 
      id: 'itinerary', 
      icon: <Brain size={16} />, 
      EN: "Plan a 3-day route using the best local transport", 
      SI: "හොඳම දේශීය ප්‍රවාහන සේවා භාවිතයෙන් තෙදින සංචාරයක් සැලසුම් කරන්න",
      label: { EN: "Smart Routing", SI: "ස්මාර්ට් සැලසුම්" }
    }
  ];

  const stopAI = () => {
    stopTypingRef.current = true;
    setIsLoading(false);
    setIsTyping(false);
  };

  const typeMessage = async (fullText: string, links?: GroundingLink[], wasThinking: boolean = false) => {
    if (!fullText) return;
    setIsTyping(true);
    stopTypingRef.current = false;
    
    setMessages(prev => [...prev, { role: 'bot', text: '', links, isThinking: wasThinking }]);

    const chars = Array.from(fullText);
    let accumulated = "";

    for (let i = 0; i < chars.length; i++) {
      if (stopTypingRef.current) break;
      accumulated += chars[i];
      
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0) {
          newMessages[newMessages.length - 1] = { 
            role: 'bot', 
            text: accumulated,
            links,
            isThinking: wasThinking
          };
        }
        return newMessages;
      });

      const isWhitespace = /\s/.test(chars[i]);
      const delay = isWhitespace ? 15 : (fullText.length > 300 ? 1 : 5);
      await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 2));
    }
    
    setIsTyping(false);
  };

  useEffect(() => {
    if (isOpen && !hasGreeted.current && messages.length === 0) {
      hasGreeted.current = true;
      const initialText = language === 'EN' 
        ? "Ayubowan! I am the Lanka Intelligence Core. 🤖 My archives are synchronized with island logistics and transport networks. Whether you need a scenic train or a fair-price Tuk-Tuk, I am here to assist. What can I verify for you?" 
        : "ආයුබෝවන්! මම ලංකා බුද්ධි ඒකකයයි. 🤖 දිවයිනේ ප්‍රවාහන සහ සියලුම සංචාරක තොරතුරු මා සතුව ඇත. අද අපි ගවේෂණය කරන්නේ කුමක්ද?";
      
      const timer = setTimeout(() => {
        typeMessage(initialText);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: isTyping ? 'auto' : 'smooth'
      });
    }
  }, [messages, isLoading, isTyping]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading || isTyping) return;

    setInput('');
    stopTypingRef.current = false;
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    const result = await getLankaGuideResponse(textToSend, language, userLocation, isDeepMode);
    
    if (stopTypingRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    if (typeof result === 'string') {
      await typeMessage(result, undefined, isDeepMode);
    } else if (result) {
      await typeMessage(result.text, result.links, isDeepMode);
    }
  };

  return (
    <>
      {/* Updated Chat Trigger Button Look */}
      <div className="fixed bottom-6 right-6 z-[60] group/ai">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C] to-[#f09433] rounded-full animate-ping opacity-25 scale-150 group-hover/ai:opacity-0 transition-all duration-700"></div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative p-6 bg-[#0a0a0a] text-white rounded-full shadow-[0_40px_100px_rgba(225,48,108,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center gap-4 group overflow-hidden border border-white/20"
        >
          <div className="relative z-10 flex items-center gap-4">
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700 whitespace-nowrap font-black text-[11px] tracking-[0.5em] uppercase pl-1">
              NEURAL CORE v4.0
            </span>
            <div className="relative">
              <div className="absolute inset-0 bg-[#E1306C]/60 blur-xl rounded-full scale-150 group-hover:bg-[#f09433]/60 transition-colors"></div>
              <Bot size={28} className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-500 animate-pulse" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/40 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[480px] sm:h-[800px] sm:max-h-[92vh] bg-white shadow-[0_60px_150px_rgba(0,0,0,0.4)] rounded-t-[4rem] sm:rounded-[4rem] z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-20 duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-gray-100">
          
          <div className="relative shrink-0 p-10 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="absolute inset-0 pattern-overlay opacity-10 pointer-events-none"></div>
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#E1306C]/40 to-blue-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="relative">
                   <div className="w-16 h-16 story-ring p-[2.5px] rounded-full shadow-3xl overflow-hidden bg-white/5 backdrop-blur-md">
                      <div className="bg-[#0a0a0a] w-full h-full rounded-full flex items-center justify-center overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/20 to-blue-500/10 animate-pulse"></div>
                         <BotMessageSquare 
                           size={32} 
                           className={`text-white transition-all duration-1000 relative z-10 ${
                             (isLoading || isTyping) ? 'animate-talking-bot scale-110' : 'animate-floating-bot'
                           }`} 
                         />
                      </div>
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#0a0a0a] rounded-full shadow-2xl animate-pulse"></div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                     <h3 className="font-heritage font-black text-3xl tracking-tighter uppercase leading-none">
                       Lanka Core
                     </h3>
                     <div className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-[8px] font-black uppercase tracking-widest border border-white/10">
                        LIVE_LOGISTICS
                     </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <ShieldCheck size={12} className="text-[#E1306C]" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
                      {(isLoading || isTyping) ? 'ANALYZING_MESH...' : 'SYSTEMS_STABLE'}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef} 
            className="flex-grow p-10 overflow-y-auto space-y-10 bg-white scroll-smooth no-scrollbar relative"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col animate-in slide-in-from-bottom-8 duration-700 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.role === 'bot' && (
                  <div className="flex items-center gap-3 mb-3 ml-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-ping ${m.isThinking ? 'bg-blue-500' : 'bg-[#E1306C]'}`}></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                      {m.isThinking ? 'REASONING_ENGINE' : 'LANKA_CORE'}
                    </span>
                  </div>
                )}
                <div className={`relative max-w-[92%] p-8 rounded-[2.5rem] shadow-sm transition-all leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#0a0a0a] text-white rounded-tr-none border border-white/10 shadow-2xl' 
                    : 'bg-[#fafafa] text-[#0a0a0a] rounded-tl-none border border-gray-100'
                }`}>
                  <div className="text-base sm:text-lg whitespace-pre-line prose prose-sm max-w-none prose-headings:font-heritage prose-headings:text-[#0a0a0a]">
                    {m.text}
                    {isTyping && i === messages.length - 1 && m.role === 'bot' && (
                      <span className={`inline-block w-2 h-5 ml-2 animate-pulse align-middle rounded-full ${m.isThinking ? 'bg-blue-500' : 'bg-[#E1306C]'}`}></span>
                    )}
                  </div>
                  
                  {m.links && m.links.length > 0 && (
                    <div className="mt-8 space-y-3 pt-6 border-t border-gray-200/50">
                      <p className="text-[10px] font-black text-[#E1306C] uppercase tracking-widest mb-4">Registry References</p>
                      {m.links.map((link, lIdx) => (
                        <a 
                          key={lIdx}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-between gap-4 p-4 rounded-full transition-all border ${
                            m.role === 'user' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-gray-100 text-[#0a0a0a] hover:border-[#E1306C]/30 hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.isThinking ? 'bg-blue-500/10 text-blue-500' : 'bg-[#E1306C]/10 text-[#E1306C]'}`}>
                               <ExternalLink size={14} />
                             </div>
                             <span className="text-xs font-bold truncate tracking-tight">{link.title}</span>
                          </div>
                          {/* Fixed: ChevronRight is now correctly imported from lucide-react */}
                          <ChevronRight size={14} className="opacity-40 shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3 mb-3 ml-2">
                  <Loader2 size={12} className="text-[#E1306C] animate-spin" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                    CALCULATING_ITINERARY...
                  </span>
                </div>
                <div className="bg-[#fafafa] p-8 rounded-[2.5rem] rounded-tl-none border border-gray-100 flex items-center gap-5">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E1306C] animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#E1306C] animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#E1306C] animate-bounce"></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Syncing with PickMe & Train Registries...</span>
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 bg-white p-10 pt-4 border-t border-gray-50 space-y-8">
            {!isLoading && !isTyping && messages.length < 5 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSend(s[language])}
                    className="shrink-0 group flex flex-col items-start gap-4 p-6 bg-[#fafafa] border border-gray-100 rounded-[2rem] transition-all hover:border-[#E1306C]/40 hover:bg-white hover:shadow-2xl hover:-translate-y-2 w-48"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#E1306C] transition-all border border-gray-50 group-hover:rotate-12">
                      {s.icon}
                    </div>
                    <span className="text-[11px] font-black text-[#0a0a0a] uppercase tracking-widest text-left leading-tight group-hover:insta-text-gradient transition-all">
                      {s.label[language]}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-5 items-center">
              <div className="flex-grow flex items-center bg-[#fafafa] rounded-[2.5rem] px-8 py-2 border border-gray-100 focus-within:ring-[6px] focus-within:ring-[#E1306C]/5 focus-within:bg-white focus-within:border-[#E1306C]/30 transition-all shadow-inner">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isLoading || isTyping}
                  placeholder={language === 'EN' ? "Query travel mesh..." : "තොරතුරු විමසන්න..."}
                  className="flex-grow py-5 bg-transparent focus:outline-none text-base font-bold text-[#0a0a0a] placeholder:text-gray-300 placeholder:italic disabled:opacity-50"
                />
                <div className="relative">
                   <Sparkles size={22} className={`${(isLoading || isTyping) ? 'animate-pulse text-[#E1306C]' : 'text-gray-200'}`} />
                </div>
              </div>
              
              {isLoading || isTyping ? (
                <button 
                  onClick={stopAI}
                  className="w-16 h-16 shrink-0 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 active:scale-90 transition-all shadow-2xl group"
                >
                  <Square size={24} fill="currentColor" />
                </button>
              ) : (
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-16 h-16 shrink-0 bg-[#0a0a0a] text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C] to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Send size={24} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              )}
            </div>

            <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                   <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">LOGISTICS_NODE_STABLE</span>
                </div>
                <div className="flex items-center gap-3">
                   <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">GEMINI NEURAL ENGINE v3</span>
                </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floating-bot {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes talking-bot {
          0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
          25% { transform: scale(1.1) rotate(-5deg); filter: brightness(1.2); }
          75% { transform: scale(1.1) rotate(5deg); filter: brightness(1.2); }
        }
        .animate-floating-bot {
          animation: floating-bot 4s ease-in-out infinite;
        }
        .animate-talking-bot {
          animation: talking-bot 0.4s ease-in-out infinite;
        }
      `}} />
    </>
  );
};

export default AIModal;
