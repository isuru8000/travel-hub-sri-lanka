import React, { useState, useMemo } from 'react';
import { Language } from '../types.ts';
import { 
  ShoppingCart, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Box, 
  Compass, 
  Gem, 
  Star, 
  Filter, 
  Activity, 
  ArrowUpRight, 
  Cpu,
  ShoppingBag,
  Camera,
  Backpack,
  Sun,
  Wind
} from 'lucide-react';

interface GearItem {
  id: string;
  name: { EN: string; SI: string };
  price: number;
  image: string;
  category: 'expedition' | 'lifestyle' | 'tech';
  tag: string;
  specs: { EN: string[]; SI: string[] };
}

const STORE_ITEMS: GearItem[] = [
  {
    id: 'g1',
    name: { EN: 'Lanka Nomad Rucksack', SI: 'ලංකා සංචාරක බෑගය' },
    price: 145,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    category: 'expedition',
    tag: 'ULTRA-DURABLE',
    specs: {
      EN: ['Waterproof Ripstop', '45L Capacity', 'Solar Panel Sync Ready'],
      SI: ['ජලයට ඔරොත්තු දෙන', 'ලීටර් 45 ධාරිතාව', 'සූර්ය බලශක්ති සබඳතාවය']
    }
  },
  {
    id: 'g2',
    name: { EN: 'Zenith 4K Travel Lens', SI: 'සෙනිත් 4K සංචාරක කාචය' },
    price: 320,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    category: 'tech',
    tag: 'HIGH-FIDELITY',
    specs: {
      EN: ['F1.8 Wide Angle', 'Nano-Coated Glass', 'Universal Mount'],
      SI: ['F1.8 පුළුල් කෝණය', 'නැනෝ ආලේපිත වීදුරු', 'විශ්වීය සවිකිරීම']
    }
  },
  {
    id: 'g3',
    name: { EN: 'Misty Peaks Windbreaker', SI: 'කඳුකර සුළං කබාය' },
    price: 85,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    category: 'lifestyle',
    tag: 'THERMAL-TECH',
    specs: {
      EN: ['High-Altitude Mesh', 'Lightweight', 'Anti-Static'],
      SI: ['ඉහළ උසට සුදුසු', 'සැහැල්ලු නිමාව', 'ස්ථිතික විදුලි නාශක']
    }
  },
  {
    id: 'g4',
    name: { EN: 'Heritage Field Watch', SI: 'පාරම්පරික අත් ඔරලෝසුව' },
    price: 195,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    category: 'lifestyle',
    tag: 'LIMITED EDITION',
    specs: {
      EN: ['Sapphire Glass', '200m Waterproof', 'Engraved Archive Logo'],
      SI: ['සැෆයර් වීදුරු', 'මීටර් 200 ජල ආරක්ෂිත', 'ලාංඡනය කැටයම් කළ']
    }
  }
];

const TravelStore: React.FC<{ language: Language }> = ({ language }) => {
  const [filter, setFilter] = useState<string>('all');
  const [cartCount, setCartCount] = useState(0);

  const filteredItems = useMemo(() => {
    return filter === 'all' ? STORE_ITEMS : STORE_ITEMS.filter(i => i.category === filter);
  }, [filter]);

  const categories = [
    { id: 'all', EN: 'All Gear', SI: 'සියල්ල', icon: <Box size={14} /> },
    { id: 'expedition', EN: 'Expedition', SI: 'වික්‍රමාන්විත', icon: <Backpack size={14} /> },
    { id: 'lifestyle', EN: 'Lifestyle', SI: 'ජීවන රටා', icon: <Sun size={14} /> },
    { id: 'tech', EN: 'Tech Hub', SI: 'තාක්ෂණික', icon: <Camera size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Header */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40 transition-transform duration-[15000ms] hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-white" />
        
        <div className="relative text-center space-y-8 px-6 max-w-5xl animate-in fade-in zoom-in duration-1000">
           <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl">
              <ShoppingBag size={16} className="text-[#E1306C] animate-pulse" />
              Global_Supply_Registry
           </div>
           <h2 className="text-6xl md:text-[10rem] font-heritage font-bold text-white tracking-tighter uppercase leading-[0.8] drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
             TRAVEL <br/><span className="italic insta-text-gradient">GEAR.</span>
           </h2>
           <p className="text-white/40 text-lg md:text-2xl font-light italic leading-relaxed tracking-wide">
             "Equipping the modern voyager with the tools of an island civilization."
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10 space-y-24">
        
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/90 backdrop-blur-xl p-4 rounded-[3rem] shadow-xl border border-gray-100">
           <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === cat.id 
                      ? 'bg-[#0a0a0a] text-white shadow-2xl scale-105' 
                      : 'text-gray-400 hover:bg-gray-50 hover:text-[#0a0a0a]'
                  }`}
                >
                  {cat.icon}
                  {language === 'EN' ? cat.EN : cat.SI}
                </button>
              ))}
           </div>

           <div className="flex items-center gap-8 px-8 py-3 border-l border-gray-100 hidden md:flex">
              <div className="text-right space-y-1">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Cart_Payload</p>
                 <p className="text-sm font-bold text-[#0a0a0a] tracking-tight">{cartCount} ACTIVE NODES</p>
              </div>
              <div className="relative">
                 <ShoppingCart size={24} className="text-[#E1306C]" />
                 {cartCount > 0 && (
                   <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#E1306C] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in">
                     {cartCount}
                   </span>
                 )}
              </div>
           </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id}
              className="group relative bg-white rounded-[3.5rem] overflow-hidden border border-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-1000 hover:shadow-[0_80px_150px_rgba(0,0,0,0.1)] hover:-translate-y-4"
              style={{ perspective: '1500px' }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" alt={item.name[language]} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute top-8 left-8 transform translateZ(50px)">
                  <div className="px-5 py-2 bg-white/10 backdrop-blur-3xl rounded-xl border border-white/20 text-white text-[8px] font-black uppercase tracking-widest shadow-2xl">
                     {item.tag}
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 bg-[#0a0a0a] text-white px-8 py-5 rounded-tl-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.4)] transform translateZ(60px)">
                   <p className="text-[9px] font-black text-[#E1306C] uppercase tracking-[0.4em] mb-1">MSRP_UPLINK</p>
                   <p className="text-3xl font-heritage font-bold">${item.price}</p>
                </div>
              </div>

              <div className="p-10 space-y-8">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Protocol_Item #00{idx+1}</p>
                    <h4 className="text-2xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter leading-tight group-hover:insta-text-gradient transition-all duration-500">
                      {item.name[language]}
                    </h4>
                 </div>

                 <div className="space-y-4 pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-gray-400">
                       <Activity size={14} className="text-[#E1306C]" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Archive_Specs</span>
                    </div>
                    <ul className="space-y-2">
                       {item.specs[language].map((spec, sIdx) => (
                         <li key={sIdx} className="text-[11px] font-medium text-gray-500 italic flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#E1306C]/30" />
                            {spec}
                         </li>
                       ))}
                    </ul>
                 </div>

                 <button 
                  onClick={() => setCartCount(prev => prev + 1)}
                  className="w-full py-5 bg-gray-50 text-[#0a0a0a] rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] border border-gray-100 hover:bg-[#0a0a0a] hover:text-white transition-all shadow-sm group/btn overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E1306C] to-[#f09433] opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                  <span className="relative z-10 flex items-center justify-center gap-4">
                     Commit to Manifest
                     <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Store Footer HUD */}
        <div className="pt-24 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                 <ShieldCheck size={28} className="text-green-500" />
                 <div className="text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#0a0a0a]">Logistics_Secure</p>
                    <p className="text-[10px] font-bold text-gray-500">Verified Global Transit</p>
                 </div>
              </div>
              <div className="w-px h-12 bg-gray-100" />
              <div className="flex items-center gap-4">
                 <Cpu size={28} className="text-blue-500" />
                 <div className="text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#0a0a0a]">Inventory_Sync</p>
                    <p className="text-[10px] font-bold text-gray-500">Real-time Node Update</p>
                 </div>
              </div>
           </div>

           <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-300">End_Of_Registry_Catalogue</p>
              <div className="flex gap-1">
                 {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-100" />)}
              </div>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom { animation: slow-zoom 30s linear infinite; }
      `}} />
    </div>
  );
};

export default TravelStore;