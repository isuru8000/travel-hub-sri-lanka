import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
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
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: language === 'EN' 
        ? "Ayubowan! I'm Lanka Guide AI. How can I help you explore Sri Lanka today?" 
        : "ආයුබෝවන්! මම ලංකා ගයිඩ් AI. අද ඔබට ශ්‍රී ලංකාව ගවේෂණය කිරීමට මා උදව් කරන්නේ කෙසේද?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getLankaGuideResponse(userMsg, language);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse || '' }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 story-ring text-white rounded-full shadow-[0_10px_30px_rgba(225,48,108,0.4)] z-40 hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">
          {UI_STRINGS.lankaGuideTitle[language]}
        </span>
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:h-[550px] bg-white shadow-2xl rounded-t-3xl sm:rounded-3xl z-50 flex flex-col border border-gray-100 animate-in slide-in-from-bottom-4">
          <div className="p-4 story-ring text-white flex justify-between items-center rounded-t-3xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                 <Bot size={20} className="text-white" />
              </div>
              <span className="font-heritage font-bold text-lg">{UI_STRINGS.lankaGuideTitle[language]}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity p-1">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#fafafa]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm shadow-sm ${
                  m.role === 'user' 
                    ? 'story-ring text-white rounded-br-none' 
                    : 'bg-white text-[#262626] border border-gray-100 rounded-bl-none'
                }`}>
                  <p className="leading-relaxed font-medium">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-[#E1306C]" />
                  <span className="text-xs text-gray-400 font-bold">Analysing...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white rounded-b-3xl">
            <div className="flex gap-2 items-center bg-[#fafafa] border border-gray-200 rounded-full px-4 py-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'EN' ? "Type a message..." : "පණිවිඩයක් ලියන්න..."}
                className="flex-grow py-2 bg-transparent focus:outline-none text-sm font-medium text-[#262626]"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 text-[#E1306C] hover:scale-110 transition-transform disabled:opacity-30"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIModal;