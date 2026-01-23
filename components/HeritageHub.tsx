
import React, { useState, useRef } from 'react';
import { Language } from '../types.ts';
// Added missing Layers and Target icon imports to resolve compilation errors
import { Mountain, Utensils, Music, Activity, ArrowRight, Sparkles, Database, Box, Layers, Target } from 'lucide-react';

interface HeritageHubProps {
  language: Language;
  setView: (view: any) => void;
}

const HeritageCard: React.FC<{ 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  image: string; 
  color: string; 
  refId: string;
  onClick: () => void;
}> = ({ title, subtitle, icon, image, color, refId, onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: y * -15 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      className="group relative h-[500px] rounded-[3.5rem] bg-black overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 ease-out"
      style={{ 
        perspective: '1500px',
        transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${tilt.x === 0 ? 1 : 1.02})`,
        transformStyle: 'preserve-3d'
      }}
    >
      <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 grayscale group-hover:grayscale-0" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      {/* Bioluminescent Aura */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      />

      <div className="absolute inset-0 p-10 flex flex-col justify-between" style={{ transform: 'translateZ(60px)' }}>
         <div className="flex justify-between items-start">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: `${color}44` }}
            >
               {icon}
            </div>
            <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] transform -rotate-90 origin-right translate-y-8">
              Archive_Node_{refId}
            </div>
         </div>

         <div className="space-y-6">
            <div className="space-y-2">
               <p className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color }}>Neural_Registry_Active</p>
               <h4 className="text-3xl md:text-4xl font-heritage font-bold text-white uppercase leading-tight tracking-tight">
                 {title}
               </h4>
            </div>
            <p className="text-gray-400 text-sm font-medium italic opacity-80 leading-relaxed max-w-[240px]">
               "{subtitle}"
            </p>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Protocol_Sync</span>
               </div>
               <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight size={18} />
               </div>
            </div>
         </div>
      </div>
      
      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-[0_0_20px_white] animate-scan-slow opacity-0 group-hover:opacity-100" />
    </div>
  );
};

const HeritageHub: React.FC<HeritageHubProps> = ({ language, setView }) => {
  const data = [
    {
      id: 'hiking',
      title: language === 'EN' ? 'Heritage Hiking' : 'උරුම කඳු තරණය',
      subtitle: language === 'EN' ? 'Scale the cloud forests where kings once meditated.' : 'රජවරුන් භාවනා කළ මීදුමෙන් වැසුණු කඳු මුදුන් කරා.',
      icon: <Mountain size={28} />,
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
      color: '#2ecc71',
      refId: 'H01'
    },
    {
      id: 'foods',
      title: language === 'EN' ? 'Food Heritage' : 'ආහාර උරුමය',
      subtitle: language === 'EN' ? 'Taste the ancient spices of an island civilization.' : 'දිවයිනේ පැරණි කුළුබඩු රසයෙන් පිරි ආහාර සංස්කෘතිය.',
      icon: <Utensils size={28} />,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      color: '#f39c12',
      refId: 'F01'
    },
    {
      id: 'music',
      title: language === 'EN' ? 'Ancient Music' : 'පැරණි සංගීතය',
      subtitle: language === 'EN' ? 'Listen to the rhythmic heartbeat of a nation.' : 'ජාතියක හදගැස්ම බඳු වූ පාරම්පරික රිද්මයන්.',
      icon: <Music size={28} />,
      image: 'https://images.unsplash.com/photo-1514525253361-b83f85df0f5c?auto=format&fit=crop&w=800&q=80',
      color: '#3498db',
      refId: 'M01'
    },
    {
      id: 'medicine',
      title: language === 'EN' ? 'Hela Wedakama' : 'හෙළ වෙදකම',
      subtitle: language === 'EN' ? '5000 years of indigenous neural healing.' : 'වසර 5000 ක් පැරණි දේශීය සුව කිරීමේ ප්‍රඥාව.',
      icon: <Activity size={28} />,
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
      color: '#1abc9c',
      refId: 'W01'
    }
  ];

  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 p-48 opacity-[0.02] text-white rotate-12 pointer-events-none">
         <Database size={500} />
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Hub Header */}
        <div className="flex flex-col items-center text-center space-y-10">
           <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] shadow-3xl">
              <Sparkles size={16} className="text-[#E1306C] animate-pulse" />
              Primary_Archive_Core
           </div>
           
           <h2 className="text-6xl md:text-9xl font-heritage font-bold text-white tracking-tighter uppercase leading-[0.8] drop-shadow-glow">
             CORE <br/><span className="italic insta-text-gradient">HERITAGE.</span>
           </h2>
           
           <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-2xl font-light italic leading-relaxed">
             {language === 'EN' 
               ? "Deep-sync with the fundamental pillars of the island's archival memory." 
               : "දිවයිනේ සංරක්ෂිත මතකයන්ගේ මූලික කුළුණු සමඟ සෘජුව සම්බන්ධ වන්න."}
           </p>
        </div>

        {/* The Manifold Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {data.map((item) => (
            <HeritageCard 
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              image={item.image}
              color={item.color}
              refId={item.refId}
              onClick={() => setView(item.id as any)}
            />
          ))}
        </div>

        {/* Global Hub Footer */}
        <div className="pt-20 flex flex-col items-center gap-10">
           <div className="h-20 w-[1px] bg-gradient-to-b from-white/10 to-transparent"></div>
           <div className="flex items-center gap-10 opacity-20">
              <Box size={24} className="text-white" />
              {/* Fix: Standardized icon usage and ensured imports are present */}
              <Layers size={24} className="text-white" />
              <Target size={24} className="text-white" />
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-slow {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        .animate-scan-slow {
          animation: scan-slow 6s linear infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 20px rgba(225,48,108,0.2));
        }
      `}} />
    </section>
  );
};

export default HeritageHub;
