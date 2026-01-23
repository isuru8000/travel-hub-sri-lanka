import React, { useState, useEffect, useMemo } from 'react';
import { Language, User } from '../types.ts';
import { 
  Zap, 
  Wallet, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Gift, 
  History, 
  Target, 
  Gem, 
  Camera, 
  Scan, 
  Share2, 
  Lock, 
  Crown, 
  Cpu, 
  Activity,
  Award,
  Database,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  CircleDollarSign,
  Loader2,
  CheckCircle2,
  X,
  RefreshCw,
  Trophy,
  Hexagon,
  Orbit,
  Signal,
  Hammer,
  AlertTriangle,
  Users
} from 'lucide-react';

interface NexusRewardsProps {
  language: Language;
  user: User | null;
  onLogin: () => void;
  // Prop to enable navigation back to the home registry
  setView: (view: any) => void;
}

const NexusRewards: React.FC<NexusRewardsProps> = ({ language, user, onLogin, setView }) => {
  const [balance, setBalance] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'earn' | 'vault'>('earn');
  const [notif, setNotif] = useState<{ type: 'earn' | 'spend'; amount: number; title: string } | null>(null);
  const [redemptionCode, setRedemptionCode] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5)
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('th_nexus_essence');
    if (saved) setBalance(parseInt(saved));
    else if (user) {
      setBalance(250);
      localStorage.setItem('th_nexus_essence', '250');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('th_nexus_essence', balance.toString());
  }, [balance]);

  const handleEarn = async (q: any) => {
    // Disabled due to "Coming Soon" state
    return;
  };

  const handleRedeem = async (v: any) => {
    // Disabled due to "Coming Soon" state
    return;
  };

  const quests = [
    { id: 'q1', icon: <Camera size={32} />, title: { EN: 'Archive a Memory', SI: 'මතකයක් එක් කරන්න' }, reward: 50, desc: { EN: 'Share a personal travel story in the public journal.', SI: 'ඔබේ සංචාරක අත්දැකීමක් පොදු සටහන් පොතට එක් කරන්න.' }, color: '#E1306C' },
    { id: 'q2', icon: <Scan size={32} />, title: { EN: 'Complete VR Sync', SI: 'ත්‍රිමාණ ගවේෂණය නිම කරන්න' }, reward: 100, desc: { EN: 'Visit 5 unique 3D spatial registries in the VR showcase.', SI: 'ත්‍රිමාණ ගවේෂණාගාරයේ ස්ථාන 5ක් නරඹන්න.' }, color: '#3B82F6' },
    { id: 'q3', icon: <Award size={32} />, title: { EN: 'Site Verification', SI: 'ස්ථාන තහවුරු කිරීම' }, reward: 25, desc: { EN: 'Review a destination with verified registry data.', SI: 'යම් ගමනාන්තයක් පිළිබඳ සවිස්තරාත්මක විවරණයක් එක් කරන්න.' }, color: '#F59E0B' },
    { id: 'q4', icon: <Share2 size={32} />, title: { EN: 'Expand the Network', SI: 'ජාලය පුළුල් කරන්න' }, reward: 250, desc: { EN: 'Invite a fellow voyager to join the Travel Hub registry.', SI: 'තවත් සංචාරකයෙකු අපගේ ජාලය සමඟ සම්බන්ධ කරන්න.' }, color: '#10B981' }
  ];

  const vaultItems = [
    { id: 'v1', icon: <Boxes size={32} />, title: { EN: '10% Registry Discount', SI: '10% වෙන්කිරීමේ වට්ටමක්' }, cost: 500, type: 'BOOKING_UPGRADE' },
    { id: 'v2', icon: <Crown size={32} />, title: { EN: 'VIP Lounge Access', SI: 'VIP විවේකාගාර පහසුකම්' }, cost: 1200, type: 'AIRPORT_PRIVILEGE' },
    { id: 'v3', icon: <Cpu size={32} />, title: { EN: 'High-Fidelity Archive Unlock', SI: 'සුවිශේෂී ත්‍රිමාණ දර්ශන' }, cost: 800, type: 'DIGITAL_ACCESS' }
  ];

  return (
    <div className="min-h-screen bg-[#010101] text-white pt-32 pb-40 relative overflow-hidden">
      {/* --- CYBERPUNK ATMOSPHERE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ perspective: '2000px' }}>
         <div 
           className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} 
         />
         <div 
           className="absolute inset-0 opacity-[0.1] transition-transform duration-1000 ease-out" 
           style={{ 
             backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`, 
             backgroundSize: '100px 100px', 
             transform: `rotateX(75deg) translateY(200px) scale(3) rotateZ(${mousePos.x * 5}deg)`,
             maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)'
           }} 
         />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,48,108,0.1)_0%,transparent_70%)] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        {/* Hub Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 border-b border-white/5 pb-20">
          <div className="space-y-10">
            <div className="flex flex-col items-start gap-6">
               <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/30 text-[#E1306C] text-[10px] font-black uppercase tracking-[0.5em] shadow-3xl animate-pulse">
                  <Users size={14} fill="currentColor" /> Lanka_Community_Protocol_v2
               </div>
               <div className="h-16 w-[1px] bg-gradient-to-b from-[#E1306C] to-transparent"></div>
            </div>
            
            <h1 className="text-6xl md:text-[10rem] font-heritage font-bold tracking-tighter leading-[0.8] uppercase">
              COMMUNITY <br/><span className="italic insta-text-gradient">HUB.</span>
            </h1>
            
            <p className="text-gray-500 max-w-xl text-xl md:text-2xl font-light italic leading-relaxed border-l-4 border-[#E1306C]/20 pl-8">
              "Every archival engagement mints Essence. Synchronize your journey to unlock future manifolds."
            </p>
          </div>

          <div className="relative group w-full lg:w-auto min-w-[380px]">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#E1306C] via-purple-500 to-blue-600 rounded-[4rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-1000" />
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-[100px] border border-white/10 p-12 rounded-[4rem] space-y-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               <div className="flex justify-between items-center">
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em]">Identity_Essence</p>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                     <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Calibration Mode</span>
                  </div>
               </div>
               
               <div className="flex items-end gap-5">
                  <span className="text-7xl md:text-9xl font-heritage font-bold leading-none tracking-tighter transition-all duration-1000 opacity-20">
                    000
                  </span>
                  <div className="flex flex-col items-center gap-2 mb-2">
                     <Gem size={32} className="text-gray-600 animate-float" />
                     <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Locked</span>
                  </div>
               </div>
               
               <div className="pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4 text-gray-500 italic text-sm">
                    <Loader2 size={16} className="animate-spin" />
                    Neural handshake pending expansion...
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls (Disabled Visuals) */}
        <div className="flex flex-col sm:flex-row gap-6 opacity-40 grayscale pointer-events-none">
           <button className="px-12 py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.6em] border bg-white/5 text-white/40 border-white/10">
              <span className="flex items-center gap-4"><Zap size={16} /> Earn Essence</span>
           </button>
           <button className="px-12 py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.6em] border bg-white/5 text-white/40 border-white/10">
              <span className="flex items-center gap-4"><Lock size={16} /> Vault Access</span>
           </button>
        </div>

        {/* --- GLOBAL COMING SOON OVERLAY --- */}
        <div className="relative">
          <div className="absolute inset-x-0 -top-20 -bottom-20 z-[60] bg-black/40 backdrop-blur-[4px] rounded-[5rem] border border-white/5 flex flex-col items-center justify-center text-center p-12 group/global">
              <div className="relative mb-12">
                <div className="w-32 h-32 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center text-[#E1306C] shadow-[0_0_80px_rgba(225,48,108,0.2)] group-hover/global:rotate-12 transition-transform duration-700">
                  <Hammer size={56} />
                </div>
                <div className="absolute -inset-4 border border-[#E1306C]/20 rounded-[3.5rem] animate-spin-slow pointer-events-none" />
              </div>

              <div className="space-y-6 max-w-2xl animate-in zoom-in duration-1000">
                  <div className="px-8 py-2 bg-[#E1306C] text-white rounded-full text-[10px] font-black uppercase tracking-[0.6em] mx-auto w-fit shadow-2xl mb-6">Community Infrastructure Update</div>
                  <h2 className="text-5xl md:text-8xl font-heritage font-bold text-white uppercase tracking-tighter leading-tight">
                    SYNC <span className="insta-text-gradient italic">PENDING.</span>
                  </h2>
                  <p className="text-gray-400 text-lg md:text-2xl font-medium italic leading-relaxed">
                    "The essence economy and rewards manifold are currently being synthesized. The Community Network will go live in the next regional archival cycle."
                  </p>
                  
                  <div className="pt-12 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-6 px-10 py-4 bg-white/5 rounded-2xl border border-white/10">
                       <Activity size={20} className="text-[#E1306C] animate-pulse" />
                       <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Calibration_Status</p>
                          <p className="text-sm font-bold text-white tracking-widest">ARCHITECTING_MANIFOLD_94%</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setView('home')}
                      className="group flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] hover:text-white transition-all"
                    >
                      Return to Main Registry
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
              </div>
          </div>

          {/* Background Content (Blurred) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-10 grayscale blur-[10px] pointer-events-none">
            {quests.map((q, idx) => (
              <div key={q.id} className="p-12 rounded-[4.5rem] bg-white/[0.02] border border-white/5">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Global Hub Status HUD */}
        <div className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-20">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                 <AlertTriangle size={24} className="text-yellow-500" />
                 <div className="text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white">Under_Construction</p>
                    <p className="text-[10px] font-bold text-white/60">Development Phase 04</p>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-8">
              <div className="text-right">
                 <p className="text-[9px] font-black uppercase tracking-widest text-white">Target_Sync</p>
                 <p className="text-[10px] font-bold text-white/60">Q3 2026 RELEASE</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 shadow-inner">
                 <Signal size={28} />
              </div>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan { animation: scan 3s linear infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .shadow-3xl {
          box-shadow: 0 0 50px rgba(225,48,108,0.3);
        }
      `}} />
    </div>
  );
};

export default NexusRewards;