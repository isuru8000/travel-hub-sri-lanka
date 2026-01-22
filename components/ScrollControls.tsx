import React, { useState, useEffect } from 'react';
import { ChevronUp, MousePointer2 } from 'lucide-react';

const ScrollControls: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progressPercent = (currentScroll / totalHeight) * 100;
      setProgress(progressPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`fixed bottom-28 right-6 z-[60] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Progress SVG Ring */}
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-black/5"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={175.9}
            strokeDashoffset={175.9 - (progress / 100) * 175.9}
            className="text-[#E1306C] transition-all duration-150"
            strokeLinecap="round"
          />
        </svg>

        {/* Action Button */}
        <button
          onClick={scrollToTop}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a0a0a] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/10 hover:scale-110 active:scale-95 transition-all group/btn overflow-hidden"
          title="Return to Registry Top"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/40 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          <ChevronUp 
            size={24} 
            className="relative z-10 transition-transform group-hover/btn:-translate-y-1" 
          />
        </button>

        {/* Tooltip Label */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl text-[8px] font-black text-white uppercase tracking-[0.3em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 border border-white/5 pointer-events-none">
          Ascend to Archive Top
        </div>
      </div>
    </div>
  );
};

export default ScrollControls;