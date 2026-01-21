
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative">
        {/* Pulsing rings */}
        <div className="absolute inset-0 story-ring rounded-full animate-ping opacity-20 scale-150"></div>
        <div className="absolute inset-0 story-ring rounded-full animate-pulse opacity-40 scale-125"></div>
        
        {/* Central Logo Container */}
        <div className="relative w-24 h-24 story-ring rounded-full p-1 shadow-2xl">
          <div className="bg-white w-full h-full rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/travel-hub-logo.png" 
              alt="Travel Hub Logo" 
              className="w-full h-full object-cover p-1 animate-bounce"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = "insta-text-gradient font-heritage font-bold text-4xl animate-bounce";
                  span.innerText = "L";
                  parent.appendChild(span);
                }
              }}
            />
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
