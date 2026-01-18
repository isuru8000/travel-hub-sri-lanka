
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative">
        {/* Pulsing rings */}
        <div className="absolute inset-0 story-ring rounded-[30px] animate-ping opacity-20 scale-150"></div>
        <div className="absolute inset-0 story-ring rounded-[30px] animate-pulse opacity-40 scale-125"></div>
        
        {/* Central Logo Container */}
        <div className="relative w-24 h-24 story-ring rounded-[30px] p-1 shadow-2xl">
          <div className="bg-white w-full h-full rounded-[25px] flex items-center justify-center">
            <span className="insta-text-gradient font-heritage font-bold text-4xl animate-bounce">L</span>
          </div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-12 text-center space-y-2">
        <h2 className="text-xl font-heritage font-bold text-[#262626] tracking-widest uppercase">
          Travel Hub
        </h2>
        <div className="flex items-center justify-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full story-ring animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 rounded-full story-ring animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 rounded-full story-ring animate-bounce"></div>
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] pt-4">
          Sri Lanka
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
