
import React, { useState, useEffect } from 'react';
import { TravelHubLogo } from './Navbar.tsx';
import { ShieldCheck, Activity, Zap, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onEnter: () => void;
  language: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onEnter, language }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(language === 'EN' ? 'Initializing Neural Uplink...' : 'සම්බන්ධතාවය ස්ථාපිත කරමින්...');

  const statuses = language === 'EN' ? [
    'Scanning Heritage Terrain...',
    'Syncing Ancient Metadata...',
    'Calibrating Volumetric Mesh...',
    'Optimizing Reality Buffer...',
    'Ready for Integration.'
  ] : [
    'භූමි දත්ත පිරික්සමින්...',
    'පැරණි දත්ත සම්බන්ධ කරමින්...',
    'ත්‍රිමාණ ජාලය සකසමින්...',
    'යථාර්ථය සුමට කරමින්...',
    'පද්ධතිය සූදානම්.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Automatic transition after a brief pause for cinematic stability
          setTimeout(() => {
            onEnter();
          }, 1000);
          return 100;
        }
        const step = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + step, 100);
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onEnter]);

  useEffect(() => {
    const statusIndex = Math.min(Math.floor(progress / 20), statuses.length - 1);
    setStatus(statuses[statusIndex]);
  }, [progress, language]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 overflow-hidden animate-out fade-out duration-1000">
      <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none"></div>
      
      <div className="relative mb-20">
        {/* Pulsing rings */}
        <div className="absolute inset-0 story-ring rounded-full animate-ping opacity-10 scale-[2.5]"></div>
        <div className="absolute inset-0 story-ring rounded-full animate-pulse opacity-20 scale-150"></div>
        
        {/* Central Logo Container */}
        <div className="relative">
          <TravelHubLogo size={120} className="animate-float" />
        </div>
      </div>
      
      {/* Loading Progress & HUD */}
      <div className="w-full max-w-sm space-y-12 text-center relative z-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-heritage font-bold text-[#0a0a0a] tracking-[0.4em] uppercase leading-none">
            Travel Hub
          </h2>
          <div className="flex items-center justify-center gap-4 text-[#E1306C] opacity-60">
             <Activity size={14} className="animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em]">System_Sync_V4.5</span>
          </div>
        </div>

        <div className="space-y-6">
           <div className="flex justify-between items-end px-2">
              <div className="text-left">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">{language === 'EN' ? 'Registry Node' : 'දත්ත පද්ධතිය'}</p>
                <p className="text-[11px] font-bold text-gray-500 italic animate-pulse">{status}</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-heritage font-black text-[#0a0a0a] leading-none">{progress}%</span>
              </div>
           </div>
           
           <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden p-[1px] border border-gray-50 shadow-inner">
             <div 
               className={`h-full rounded-full transition-all duration-500 ease-out ${progress === 100 ? 'bg-green-500' : 'insta-gradient'}`}
               style={{ 
                 width: `${progress}%`,
                 boxShadow: progress === 100 ? '0 0 20px rgba(34,197,94,0.5)' : '0 0 20px rgba(225,48,108,0.5)'
               }}
             ></div>
           </div>
        </div>

        <div className="min-h-[60px] flex flex-col items-center justify-center pt-8">
             <div className={`flex items-center gap-4 transition-all duration-500 ${progress === 100 ? 'text-green-500' : 'text-gray-300'}`}>
                {progress === 100 ? (
                  <CheckCircle2 size={20} className="animate-in zoom-in duration-300" />
                ) : (
                  <Loader2 size={16} className="animate-spin text-[#E1306C]" />
                )}
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">
                  {progress === 100 
                    ? (language === 'EN' ? 'SYNCHRONIZED' : 'සම්බන්ධතාවය ස්ථාපිතයි') 
                    : (language === 'EN' ? 'SYNCHRONIZING...' : 'සම්බන්ධ වෙමින්...')}
                </span>
             </div>
        </div>
      </div>
      
      {/* Decorative Bottom HUD Elements */}
      <div className="absolute bottom-12 left-12 flex items-center gap-8 opacity-20 hidden md:flex">
         <div className="flex items-center gap-3">
            <ShieldCheck size={20} />
            <span className="text-[9px] font-black uppercase tracking-widest">Secure_Layer</span>
         </div>
         <div className="w-1 h-1 rounded-full bg-gray-400" />
         <div className="flex items-center gap-3">
            <Zap size={20} />
            <span className="text-[9px] font-black uppercase tracking-widest">Fast_Uplink</span>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes zoom-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

// Added missing import for CheckCircle2
import { CheckCircle2 as CheckIcon } from 'lucide-react';
const CheckCircle2 = CheckIcon;

export default LoadingScreen;
