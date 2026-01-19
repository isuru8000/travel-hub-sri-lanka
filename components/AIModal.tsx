
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Compass, Loader2, Map, Utensils, History, Info } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialText = language === 'EN' 
        ? "Ayubowan! I'm your Lanka Guide AI. I'm here to illuminate your journey through our paradise. How can I assist you today?" 
        : "ආයුබෝවන්! මම ඔබේ ලංකා ගයිඩ් AI. අපේ පාරාදීසය හරහා ඔබේ ගමන ආලෝකවත් කිරීමට මම මෙහි සිටිමි. මම ඔබට අද උදව් කරන්නේ කෙසේද?";
      
      setMessages([{ role: 'bot', text: initialText }]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading, isTyping]);

  const typeMessage = async (fullText: string) => {
    setIsTyping(true);
    let displayedText = "";
    const characters = Array.from(fullText);
    
    setMessages(prev => [...prev, { role: 'bot', text: '' }]);

    for (let i = 0; i < characters.length; i++) {
      displayedText += characters[i];
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'bot', text: displayedText };
        return updated;
      });
      
      const speed = fullText.length > 250 ? 30 : 45;
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    setIsTyping(false);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    const botResponse = await getLankaGuideResponse(textToSend, language);
    setIsLoading(false);
    
    if (botResponse) {
      await typeMessage(botResponse);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 story-ring text-white rounded-full shadow-[0_15px_45px_rgba(225,48,108,0.5)] z-40 hover:scale-110 active:scale-95 transition-all flex items-center gap-3 group overflow-hidden"
      >
        <div className="relative z-10 flex items-center gap-3">
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm tracking-widest uppercase pl-1">
            {UI_STRINGS.lankaGuideTitle[language]}
          </span>
          <div className="relative">
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white border-2 border-[#E1306C] rounded-full animate-pulse flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#E1306C] rounded-full"></span>
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[650px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] rounded-t-[40px] sm:rounded-[40px] z-[70] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          
          {/* Header */}
          <div className="relative shrink-0 p-6 insta-gradient text-white shadow-xl">
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
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.role === 'bot' && (
                  <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                    <Sparkles size={10} className="text-[#E1306C]" />
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
                  <p className="font-medium whitespace-pre-line">
                    {m.text}
                    {isTyping && i === messages.length - 1 && m.role === 'bot' && (
                      <span className="inline-block w-1.5 h-4 ml-1.5 bg-[#E1306C] animate-pulse align-middle rounded-full"></span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start animate-in fade-in slide-in-from-left-2">
                <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                  <Compass size={10} className="text-[#E1306C] animate-spin" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    AI Exploring
                  </span>
                </div>
                <div className="bg-white p-5 rounded-[2rem] rounded-bl-none shadow-md border border-gray-100 flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full story-ring animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full story-ring animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full story-ring animate-bounce"></div>
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
            {!isLoading && !isTyping && messages.length < 5 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSend(s[language])}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 bg-[#fafafa] border border-gray-200 rounded-full text-[11px] font-bold text-[#262626] hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/5 transition-all whitespace-nowrap"
                  >
                    <span className="text-[#E1306C]">{s.icon}</span>
                    {s.label[language]}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3 items-center">
              <div className="flex-grow flex items-center bg-[#f0f2f5] rounded-3xl px-5 py-1.5 focus-within:ring-2 focus-within:ring-[#E1306C]/20 transition-all">
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
                  <Sparkles size={18} className={`${(isLoading || isTyping) ? 'animate-pulse text-[#E1306C]' : 'text-gray-400'}`} />
                </div>
              </div>
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading || isTyping}
                className="w-12 h-12 shrink-0 story-ring text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100 shadow-lg"
              >
                {isLoading || isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
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
