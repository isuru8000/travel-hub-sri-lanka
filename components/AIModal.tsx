
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Compass, Loader2, Map, Utensils, History, Info, Square, MessageCircle, Zap, Globe, Bot } from 'lucide-react';
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
      icon: <History size={16} />, 
      EN: "Tell me about Sigiriya's history", 
      SI: "සීගිරියේ ඉතිහාසය පවසන්න",
      label: { EN: "Ancient Secrets", SI: "ඉතිහාසය" }
    },
    { 
      id: 'food', 
      icon: <Utensils size={16} />, 
      EN: "Recommend some spicy local food", 
      SI: "දේශීය සැර ආහාර නිර්දේශ කරන්න",
      label: { EN: "Spice Guide", SI: "දේශීය ආහාර" }
    },
    { 
      id: 'temple', 
      icon: <Info size={16} />, 
      EN: "What is the dress code for temples?", 
      SI: "පන්සල් යාමට සුදුසු ඇඳුම් මොනවාද?",
      label: { EN: "Etiquette", SI: "සිරිත් විරිත්" }
    },
    { 
      id: 'beaches', 
      icon: <Map size={16} />, 
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

  const typeMessage = async (fullText: string) => {
    if (!fullText) return;
    setIsTyping(true);
    stopTypingRef.current = false;
    
    setMessages(prev => [...prev, { role: 'bot', text: '' }]);

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
            text: accumulated 
          };
        }
        return newMessages;
      });

      const isWhitespace = /\s/.test(chars[i]);
      const delay = isWhitespace ? 30 : (fullText.length > 200 ? 5 : 15);
      await new Promise(resolve => setTimeout(resolve, delay + Math.random() * 5));
    }
    
    setIsTyping(false);
  };

  useEffect(() => {
    if (isOpen && !hasGreeted.current && messages.length === 0) {
      hasGreeted.current = true;
      const initialText = language === 'EN' 
        ? "Ayubowan! I'm your Lanka Guide AI. 🌟 I'm here to illuminate your journey through our paradise. How can I assist your Sri Lankan adventure today?" 
        : "ආයුබෝවන්! මම ඔබේ ලංකා ගයිඩ් AI. 🌟 අපේ පාරාදීසය හරහා ඔබේ ගමන ආලෝකවත් කිරීමට මම මෙහි සිටිමි. අද මම ඔබට උදව් කරන්නේ කෙසේද?";
      
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

    const botResponse = await getLankaGuideResponse(textToSend, language);
    
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
      <div className="fixed bottom-6 right-6 z-[60] group/ai">
        <div className="absolute inset-0 bg-[#E1306C] rounded-full animate-ping opacity-20 scale-125 group-hover/ai:opacity-0 transition-opacity"></div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative p-5 bg-[#0a0a0a] text-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center gap-3 group overflow-hidden border border-white/10"
        >
          <div className="relative z-10 flex items-center gap-3">
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black text-[10px] tracking-[0.4em] uppercase pl-1">
              {UI_STRINGS.lankaGuideTitle[language]}
            </span>
            <div className="relative">
              <Bot size={26} className="text-[#E1306C] group-hover:animate-bounce-short transition-all" />
              <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[750px] sm:max-h-[90vh] bg-[#fafafa] shadow-[0_40px_120px_rgba(0,0,0,0.3)] rounded-t-[3rem] sm:rounded-[3rem] z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 duration-500 border border-white">
          
          {/* Header */}
          <div className="relative shrink-0 p-8 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E1306C]/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className="relative">
                   <div className="w-14 h-14 story-ring p-[2px] rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-12">
                      <div className="bg-[#0a0a0a] w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden">
                         <Bot 
                           size={28} 
                           className={`text-white transition-all duration-500 ${
                             (isLoading || isTyping) ? 'animate-talking-bot' : 'animate-floating-bot'
                           }`} 
                         />
                      </div>
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0a0a0a] rounded-full shadow-lg"></div>
                </div>
                <div>
                  <h3 className="font-heritage font-black text-2xl tracking-tighter uppercase leading-none">
                    {UI_STRINGS.lankaGuideTitle[language]}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
                      {(isLoading || isTyping) ? (language === 'EN' ? 'RETRACING HISTORY' : 'පුරාවෘත්ත පිරික්සයි') : (language === 'EN' ? 'SYNCHRONIZED' : 'සම්බන්ධ වී ඇත')}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef} 
            className="flex-grow p-8 overflow-y-auto space-y-8 bg-white scroll-smooth no-scrollbar relative"
          >
            {/* Background Branding Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
               <Compass size={400} className="rotate-12" />
            </div>

            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-1000">
                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200">
                   <Zap size={40} />
                </div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.6em]">Awaiting Transmission</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col animate-in slide-in-from-bottom-4 duration-500 fill-mode-forwards ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.role === 'bot' && (
                  <div className="flex items-center gap-2 mb-2 ml-1">
                    <div className="w-1 h-1 bg-[#E1306C] rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
                      AI ARCHIVE
                    </span>
                  </div>
                )}
                <div className={`relative max-w-[90%] p-6 rounded-[2rem] shadow-sm transition-all ${
                  m.role === 'user' 
                    ? 'bg-[#0a0a0a] text-white rounded-tr-none border border-white/10' 
                    : 'bg-gray-50 text-[#0a0a0a] rounded-tl-none border border-gray-100'
                }`}>
                  <p className="text-base leading-relaxed font-medium">
                    {m.text}
                    {isTyping && i === messages.length - 1 && m.role === 'bot' && (
                      <span className="inline-block w-1.5 h-4 ml-1.5 bg-[#E1306C] animate-pulse align-middle rounded-full"></span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <Loader2 size={10} className="text-[#E1306C] animate-spin" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">
                    CONSULTING NODES
                  </span>
                </div>
                <div className="bg-gray-50 p-6 rounded-[2rem] rounded-tl-none border border-gray-100 flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions & Input Area */}
          <div className="shrink-0 bg-white p-8 pt-2 border-t border-gray-100 space-y-6">
            {!isLoading && !isTyping && messages.length < 8 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSend(s[language])}
                    className="shrink-0 group flex flex-col items-start gap-3 p-5 bg-[#fafafa] border border-gray-100 rounded-3xl transition-all hover:border-[#E1306C]/40 hover:bg-white hover:shadow-xl hover:-translate-y-1 w-40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#E1306C] transition-colors border border-gray-50">
                      {s.icon}
                    </div>
                    <span className="text-[10px] font-black text-[#0a0a0a] uppercase tracking-widest text-left leading-tight">
                      {s.label[language]}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-4 items-center">
              <div className="flex-grow flex items-center bg-gray-50 rounded-[2rem] px-6 py-1.5 border border-gray-100 focus-within:ring-4 focus-within:ring-[#E1306C]/5 focus-within:bg-white focus-within:border-[#E1306C]/20 transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isLoading || isTyping}
                  placeholder={language === 'EN' ? "Journey through Lanka..." : "ලංකා සංචාරය අරඹන්න..."}
                  className="flex-grow py-4 bg-transparent focus:outline-none text-sm font-bold text-[#0a0a0a] placeholder:text-gray-400 disabled:opacity-50"
                />
                <Sparkles size={18} className={`${(isLoading || isTyping) ? 'animate-pulse text-[#E1306C]' : 'text-gray-300'}`} />
              </div>
              
              {isLoading || isTyping ? (
                <button 
                  onClick={stopAI}
                  className="w-14 h-14 shrink-0 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:bg-red-600 active:scale-95 transition-all shadow-lg"
                >
                  <Square size={20} fill="currentColor" />
                </button>
              ) : (
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-14 h-14 shrink-0 bg-[#0a0a0a] text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100 shadow-xl border border-white/10"
                >
                  <Send size={20} />
                </button>
              )}
            </div>

            <div className="flex justify-center items-center gap-4 text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">
               <div className="h-px w-8 bg-gray-100"></div>
               <span>Powered by Travel Hub</span>
               <div className="h-px w-8 bg-gray-100"></div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floating-bot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes talking-bot {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.15); filter: brightness(1.3); }
          25%, 75% { transform: rotate(5deg); }
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-floating-bot {
          animation: floating-bot 3s ease-in-out infinite;
        }
        .animate-talking-bot {
          animation: talking-bot 0.6s ease-in-out infinite;
        }
        .animate-bounce-short {
          animation: bounce-short 0.5s ease-in-out infinite;
        }
      `}} />
    </>
  );
};

export default AIModal;
