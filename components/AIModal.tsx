
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Compass, Loader2, Map, Utensils, History, Info, Square } from 'lucide-react';
import { Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { getLankaGuideResponse } from '../services/gemini.ts';

interface Message {
  role: 'user' | 'bot';
  text: string;
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);
  const stopTypingRef = useRef(false);

  const suggestions = [
    { 
      id: 'history', 
      icon: <History size={14} />, 
      EN: "Tell me about Sigiriya's history", 
      SI: "සීගිරියේ ඉතිහාසය පවසන්න",
      label: { EN: "Ancient History", SI: "ඉතිහාසය" }
    },
    { 
      id: 'food', 
      icon: <Utensils size={14} />, 
      EN: "Recommend some spicy local food", 
      SI: "දේශීය සැර ආහාර නිර්දේශ කරන්න",
      label: { EN: "Food Guide", SI: "දේශීය ආහාර" }
    },
    { 
      id: 'temple', 
      icon: <Info size={14} />, 
      EN: "What is the dress code for temples?", 
      SI: "පන්සල් යාමට සුදුසු ඇඳුම් මොනවාද?",
      label: { EN: "Etiquette", SI: "සිරිත් විරිත්" }
    },
    { 
      id: 'beaches', 
      icon: <Map size={14} />, 
      EN: "Which are the best beaches for surfing?", 
      SI: "සර්ෆින් සඳහා හොඳම වෙරළ මොනවාද?",
      label: { EN: "Surf Spots", SI: "වෙරළ" }
    }
  ];

  const stopAI = () => {
    stopTypingRef.current = true;
    setIsLoading(false);
    setIsTyping(false);
  };

  // Robust typing animation engine
  const typeMessage = async (fullText: string) => {
    if (!fullText) return;
    setIsTyping(true);
    stopTypingRef.current = false;
    
    // Initialize an empty bot message
    setMessages(prev => [...prev, { role: 'bot', text: '' }]);

    const chars = Array.from(fullText);
    let accumulated = "";

    for (let i = 0; i < chars.length; i++) {
      // Check for stop signal
      if (stopTypingRef.current) break;

      accumulated += chars[i];
      
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0) {
          newMessages[newMessages.length - 1] = { 
            role: 'bot', 
            text: accumulated 
          };
        }
        return newMessages;
      });

      // Variable speed for natural feel
      const isWhitespace = /\s/.test(chars[i]);
      const delay = isWhitespace ? 40 : (fullText.length > 200 ? 10 : 25);
      await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 10));
    }
    
    setIsTyping(false);
  };

  // Trigger initial greeting when modal opens
  useEffect(() => {
    if (isOpen && !hasGreeted.current && messages.length === 0) {
      hasGreeted.current = true;
      const initialText = language === 'EN' 
        ? "Ayubowan! I'm your Lanka Guide AI. 🌟 I'm here to illuminate your journey through our paradise. I can help you discover ancient ruins, recommend authentic spices, or even help with cultural etiquette. How can I assist your Sri Lankan adventure today?" 
        : "ආයුබෝවන්! මම ඔබේ ලංකා ගයිඩ් AI. 🌟 අපේ පාරාදීසය හරහා ඔබේ ගමන ආලෝකවත් කිරීමට මම මෙහි සිටිමි. පුරාණ නටබුන් සොයා ගැනීමට, දේශීය ආහාර නිර්දේශ කිරීමට හෝ සංස්කෘතික සිරිත් විරිත් පිළිබඳව ඔබට උපකාර කිරීමට මට හැකිය. අද මම ඔබට උදව් කරන්නේ කෙසේද?";
      
      const timer = setTimeout(() => {
        typeMessage(initialText);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, language, messages.length]);

  // Handle auto-scrolling
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

    const botResponse = await getLankaGuideResponse(textToSend, language);
    
    // Check if user stopped while waiting for API
    if (stopTypingRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    
    if (botResponse) {
      await typeMessage(botResponse);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 group/ai">
        {/* Radar/Ping visibility pulse */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 scale-125 group-hover/ai:opacity-0 transition-opacity"></div>
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-10 scale-150 delay-700 group-hover/ai:opacity-0 transition-opacity"></div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative p-5 bg-green-600 text-white rounded-full shadow-[0_15px_45px_rgba(22,163,74,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 animate-float hover:animate-none group overflow-hidden border-2 border-white/20"
        >
          <div className="relative z-10 flex items-center gap-3">
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm tracking-widest uppercase pl-1">
              {UI_STRINGS.lankaGuideTitle[language]}
            </span>
            <div className="relative">
              <Sparkles size={26} className="animate-[spin_8s_linear_infinite] group-hover:animate-none" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-green-600 rounded-full animate-pulse flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[650px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] rounded-t-[40px] sm:rounded-[40px] z-[70] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          
          {/* Header */}
          <div className="relative shrink-0 p-6 bg-gradient-to-br from-green-600 to-green-800 text-white shadow-xl">
            <div className="absolute inset-0 pattern-overlay opacity-10"></div>
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-inner group">
                  <Compass size={28} className={`text-white transition-all duration-500 ${(isLoading || isTyping) ? 'animate-[spin_3s_linear_infinite] scale-110' : 'group-hover:rotate-45'}`} />
                </div>
                <div>
                  <h3 className="font-heritage font-bold text-xl tracking-tight leading-tight">
                    {UI_STRINGS.lankaGuideTitle[language]}
                  </h3>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <span className={`w-2 h-2 rounded-full ${(isLoading || isTyping) ? 'bg-orange-400 animate-pulse' : 'bg-green-400'}`}></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {(isLoading || isTyping) ? (language === 'EN' ? 'Consulting Legend...' : 'පුරාවෘත්ත පිරික්සමින්...') : (language === 'EN' ? 'Ready to Guide' : 'මග පෙන්වීමට සූදානම්')}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef} 
            className="flex-grow p-6 overflow-y-auto space-y-6 bg-[#fafafa] scroll-smooth no-scrollbar"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col animate-in slide-in-from-bottom-2 duration-300 fill-mode-forwards ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.role === 'bot' && (
                  <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                    <Sparkles size={10} className="text-green-600" />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      Lanka Guide AI
                    </span>
                  </div>
                )}
                <div className={`relative group max-w-[88%] p-5 rounded-[2rem] text-sm md:text-base leading-relaxed ${
                  m.role === 'user' 
                    ? 'story-ring text-white rounded-br-none shadow-lg' 
                    : 'bg-white text-[#262626] border border-gray-100 rounded-bl-none shadow-md'
                }`}>
                  <div className="font-medium whitespace-pre-line inline">
                    {m.text}
                    {isTyping && i === messages.length - 1 && m.role === 'bot' && (
                      <span className="inline-block w-2.5 h-4 ml-1.5 bg-green-600 animate-pulse align-middle rounded-full shadow-[0_0_10px_rgba(22,163,74,0.4)]"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                  <Compass size={10} className="text-green-600 animate-spin" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    AI Exploring
                  </span>
                </div>
                <div className="bg-white p-5 rounded-[2rem] rounded-bl-none shadow-md border border-gray-100 flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce"></div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    {language === 'EN' ? 'Navigating History...' : 'ඉතිහාසය ගවේෂණය කරමින්...'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="shrink-0 bg-white p-6 pt-2 border-t border-gray-100 space-y-4">
            {!isLoading && !isTyping && messages.length < 8 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSend(s[language])}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 bg-[#fafafa] border border-gray-200 rounded-full text-[11px] font-bold text-[#262626] hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-all whitespace-nowrap"
                  >
                    <span className="text-green-600">{s.icon}</span>
                    {s.label[language]}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3 items-center">
              <div className="flex-grow flex items-center bg-[#f0f2f5] rounded-3xl px-5 py-1.5 focus-within:ring-2 focus-within:ring-green-600/20 transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isLoading || isTyping}
                  placeholder={language === 'EN' ? "Journey through Lanka..." : "ලංකා සංචාරය අරඹන්න..."}
                  className="flex-grow py-3 bg-transparent focus:outline-none text-sm font-semibold text-[#262626] placeholder:text-gray-400 disabled:opacity-50"
                />
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-px h-6 bg-gray-300"></div>
                  <Sparkles size={18} className={`${(isLoading || isTyping) ? 'animate-pulse text-green-600' : 'text-gray-400'}`} />
                </div>
              </div>
              
              {isLoading || isTyping ? (
                <button 
                  onClick={stopAI}
                  className="w-12 h-12 shrink-0 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-lg"
                  title={language === 'EN' ? "Stop Generating" : "නතර කරන්න"}
                >
                  <Square size={20} fill="currentColor" />
                </button>
              ) : (
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-12 h-12 shrink-0 bg-green-600 text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100 shadow-lg"
                >
                  <Send size={20} />
                </button>
              )}
            </div>

            <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest">
              Powered by Travel Hub AI • Ancient Soul
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIModal;
