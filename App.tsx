
import React, { useState, useEffect, useMemo } from 'react';
import { Language, User } from './types.ts';
import Layout from './components/Layout.tsx';
import Hero from './components/Hero.tsx';
import PopularHighlights from './components/PopularHighlights.tsx';
import Destinations from './components/Destinations.tsx';
import Foods from './components/Foods.tsx';
import HeritageMusic from './components/HeritageMusic.tsx';
import TraditionalMedicine from './components/TraditionalMedicine.tsx';
import TeaCulture from './components/TeaCulture.tsx';
import Hiking from './components/Hiking.tsx';
import Phrasebook from './components/Phrasebook.tsx';
import TravelEssentials from './components/TravelEssentials.tsx';
import Festivals from './components/Festivals.tsx';
import CategoriesSection from './components/CategoriesSection.tsx';
import HeritageHub from './components/HeritageHub.tsx';
import StorySection from './components/StorySection.tsx';
import AIModal from './components/AIModal.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import TravelMemories from './components/TravelMemories.tsx';
import Quiz from './components/Quiz.tsx';
import VRExperience from './components/VRExperience.tsx';
import VRShowcase from './components/VRShowcase.tsx';
import HeritageCollection from './components/HeritageCollection.tsx';
import SearchPortal from './components/SearchPortal.tsx';
import LoginModal from './components/LoginModal.tsx';
import Contact from './components/Contact.tsx';
import Marketplace from './components/Marketplace.tsx';
import NexusRewards from './components/NexusRewards.tsx';
import ScrollControls from './components/ScrollControls.tsx';
import TravelStore from './components/TravelStore.tsx';
import { supabase } from './lib/supabase.ts';
import { Sparkles, Compass, ShieldCheck, Star, MapPin, ArrowRight, Database, Box, Layers, Zap } from 'lucide-react';

type View = 'home' | 'destinations' | 'about' | 'foods' | 'music' | 'interests' | 'medicine' | 'tea' | 'hiking' | 'phrases' | 'essentials' | 'festivals' | 'memories' | 'quiz' | 'vr-experience' | 'vr-showcase' | 'search' | 'contact' | 'marketplace' | 'community' | 'shop';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('EN');
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isSiteEntered, setIsSiteEntered] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  // Global scroll-to-top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Simulate background sync check + user auth
    const initTimer = setTimeout(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            setUser({
              name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Explorer',
              email: session.user.email || '',
              photo: session.user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${session.user.email}`
            });
          }
          setIsDataReady(true);
        });
    }, 3000); // Minimum 3s for cinematic effect

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Explorer',
          email: session.user.email || '',
          photo: session.user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${session.user.email}`
        });
        setIsLoginModalOpen(false);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initTimer);
    };
  }, []);

  const archiveNodes = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 8000}px`,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.15 + 0.05,
      z: Math.random() * 200 - 100
    }));
  }, []);

  const spatialArtifacts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${1000 + i * 800 + Math.random() * 300}px`,
      size: 40 + Math.random() * 60,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * -20,
      opacity: 0.05 + Math.random() * 0.1,
      z: Math.random() * 300 - 150,
      rotateDir: Math.random() > 0.5 ? 1 : -1
    }));
  }, []);

  const floatingSpheres = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${(i % 2 === 0 ? 10 : 70) + (Math.random() * 20)}%`,
      top: `${1200 + (i * 1200) + (Math.random() * 400)}px`,
      size: 300 + Math.random() * 400,
      duration: 30 + Math.random() * 30,
      delay: Math.random() * -40,
      opacity: 0.04 + Math.random() * 0.04,
      color: i % 3 === 0 ? '#E1306C' : (i % 3 === 1 ? '#3B82F6' : '#F59E0B')
    }));
  }, []);

  const handleEnterSite = () => {
    setIsSiteEntered(true);
  };

  if (!isSiteEntered) {
    return <LoadingScreen onEnter={handleEnterSite} language={language} />;
  }

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const renderContent = () => {
    switch (view) {
      case 'community':
        return <NexusRewards language={language} user={user} onLogin={handleLogin} setView={setView} />;
      case 'marketplace':
        return <div className="pt-24"><Marketplace language={language} /></div>;
      case 'shop':
        return <div className="pt-24"><TravelStore language={language} /></div>;
      case 'destinations':
        return <div className="pt-24"><Destinations language={language} /></div>;
      case 'foods':
        return <div className="pt-24"><Foods language={language} /></div>;
      case 'music':
        return <div className="pt-24"><HeritageMusic language={language} /></div>;
      case 'medicine':
        return <div className="pt-24"><TraditionalMedicine language={language} /></div>;
      case 'tea':
        return <div className="pt-24"><TeaCulture language={language} /></div>;
      case 'hiking':
        return <div className="pt-24"><Hiking language={language} setView={setView} /></div>;
      case 'phrases':
        return <div className="pt-24"><Phrasebook language={language} /></div>;
      case 'essentials':
        return <div className="pt-24"><TravelEssentials language={language} /></div>;
      case 'festivals':
        return <div className="pt-24"><Festivals language={language} /></div>;
      case 'memories':
        return <div className="pt-24"><TravelMemories language={language} user={user} onLogin={handleLogin} /></div>;
      case 'interests':
        return <div className="pt-24"><CategoriesSection language={language} setView={setView} /></div>;
      case 'quiz':
        return <div className="pt-24"><Quiz language={language} setView={setView} /></div>;
      case 'vr-experience':
        return <div className="pt-24"><VRExperience language={language} setView={setView} /></div>;
      case 'vr-showcase':
        return <VRShowcase language={language} setView={setView} />;
      case 'search':
        return <SearchPortal language={language} />;
      case 'contact':
        return <div className="pt-24"><Contact language={language} /></div>;
      case 'home':
      default:
        return (
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ perspective: '2000px' }}>
              <div 
                className="absolute inset-0 opacity-[0.02]" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(225,48,108,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(225,48,108,0.2) 1px, transparent 1px)`, 
                  backgroundSize: '120px 120px',
                  transform: `translateY(${scrollPos * -0.05}px) rotateX(20deg)`,
                  transformOrigin: 'top'
                }} 
              />
              {spatialArtifacts.map(art => (
                <div 
                  key={art.id}
                  className="absolute"
                  style={{
                    left: art.left,
                    top: art.top,
                    width: `${art.size}px`,
                    height: `${art.size}px`,
                    opacity: art.opacity,
                    transform: `translateZ(${art.z}px) translateY(${scrollPos * -0.1}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div 
                    className="w-full h-full border border-gray-400/30 shadow-[0_0_15px_rgba(0,0,0,0.05)]" 
                    style={{ 
                      animation: `artifact-spin ${art.duration}s linear infinite`,
                      animationDirection: art.rotateDir > 0 ? 'normal' : 'reverse',
                      animationDelay: `${art.delay}s`
                    }}
                  >
                    <div className="absolute inset-0 border border-white/40" style={{ transform: 'rotateY(90deg)' }} />
                    <div className="absolute inset-0 border border-gray-400/20" style={{ transform: 'rotateX(90deg)' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#E1306C] rounded-full blur-[2px]" />
                  </div>
                </div>
              ))}
              {floatingSpheres.map(sphere => (
                <div 
                  key={sphere.id}
                  className="absolute rounded-full animate-slow-drift"
                  style={{
                    left: sphere.left,
                    top: sphere.top,
                    width: `${sphere.size}px`,
                    height: `${sphere.size}px`,
                    opacity: sphere.opacity,
                    background: `radial-gradient(circle at 30% 30%, white, ${sphere.color})`,
                    filter: 'blur(60px)',
                    boxShadow: `inset -20px -20px 60px rgba(0,0,0,0.1), 0 0 100px ${sphere.color}22`,
                    animationDuration: `${sphere.duration}s`,
                    animationDelay: `${sphere.delay}s`,
                    transform: `translateZ(-200px) translateY(${scrollPos * -0.15}px)`
                  }}
                />
              ))}
              {archiveNodes.map(node => (
                <div 
                  key={node.id}
                  className="absolute bg-[#E1306C] rounded-full animate-pulse shadow-2xl"
                  style={{
                    left: node.left,
                    top: node.top,
                    width: `${node.size}px`,
                    height: `${node.size}px`,
                    opacity: node.opacity,
                    transform: `translateZ(${node.z}px) translateY(${scrollPos * (node.z / 500)}px)`,
                    filter: 'blur(1px)'
                  }}
                />
              ))}
            </div>
            <Hero language={language} setView={setView} />
            <div className="relative z-10">
              <div className="py-8 md:py-16 bg-white/60 backdrop-blur-xl border-y border-gray-50 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
                 <div className="max-w-full flex whitespace-nowrap animate-marquee">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12 opacity-30 grayscale contrast-125">
                        <span className="text-xl md:text-3xl font-heritage font-black italic tracking-tighter uppercase text-[#0a0a0a] hover:insta-text-gradient transition-all cursor-default">Condé Nast Traveler</span>
                        <span className="text-xl md:text-3xl font-heritage font-black italic tracking-tighter uppercase text-[#0a0a0a] hover:insta-text-gradient transition-all cursor-default">National Geographic</span>
                        <span className="text-xl md:text-3xl font-heritage font-black italic tracking-tighter uppercase text-[#0a0a0a] hover:insta-text-gradient transition-all cursor-default">The New York Times</span>
                        <span className="text-xl md:text-3xl font-heritage font-black italic tracking-tighter uppercase text-[#0a0a0a] hover:insta-text-gradient transition-all cursor-default">Lonely Planet</span>
                      </div>
                    ))}
                 </div>
              </div>
              <PopularHighlights language={language} setView={setView} />
              <div id="heritage-hub">
                <HeritageHub language={language} setView={setView} />
              </div>
              <HeritageCollection language={language} />
              <div className="py-20 md:py-32 px-4 relative overflow-hidden group border-y border-gray-50 bg-transparent" style={{ perspective: '3000px' }}>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">
                   <div className="w-full md:w-1/2 space-y-8 md:space-y-12 text-center md:text-left transform md:translateZ(100px)">
                     <div className="inline-flex items-center gap-3 md:gap-5 px-6 md:px-8 py-2 md:py-3 rounded-full bg-[#E1306C]/5 border border-[#E1306C]/10 text-[#E1306C] text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] shadow-sm bg-white/40 backdrop-blur-md">
                       <Sparkles size={16} className="animate-pulse md:w-[18px] md:h-[18px]" />
                       Archetype Handshake
                     </div>
                     <h2 className="text-4xl md:text-[7rem] font-heritage font-bold text-[#0a0a0a] leading-tight md:leading-[0.8] tracking-tighter uppercase">
                        Sync Your <br/>
                        <span className="insta-text-gradient italic">Identity.</span>
                     </h2>
                     <p className="text-gray-400 text-xl md:text-3xl font-light leading-relaxed max-w-xl italic">
                        "Our 1-minute neural engine identifies the journey your soul was destined to take."
                     </p>
                     <button 
                       onClick={() => setView('quiz')}
                       className="group relative px-10 py-6 md:px-20 md:py-10 bg-[#0a0a0a] text-white font-black rounded-[2.5rem] md:rounded-[4rem] hover:scale-110 active:scale-95 transition-all shadow-[0_40px_100px_rgba(225,48,108,0.4)] flex items-center gap-6 md:gap-8 mx-auto md:mx-0 overflow-hidden"
                     >
                       <div className="absolute inset-0 bg-gradient-to-r from-[#E1306C] to-[#f09433] opacity-0 group-hover:opacity-100 transition-opacity" />
                       <Compass size={24} className="relative z-10 text-[#E1306C] group-hover:rotate-180 transition-transform duration-1000 md:w-8 md:h-8" />
                       <span className="relative z-10 uppercase tracking-[0.3em] md:tracking-[0.6em] text-[10px] md:text-[12px]">Begin Integration</span>
                     </button>
                   </div>
                   <div className="hidden lg:block w-1/2 relative" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="absolute -inset-40 bg-[#E1306C]/5 rounded-full blur-[2000px] animate-pulse"></div>
                      <div className="relative rounded-[4rem] overflow-hidden shadow-[0_120px_220px_rgba(0,0,0,0.25)] border-4 border-white transform rotate-y-[-15deg] group-hover:rotate-y-0 transition-all duration-1000 group-hover:scale-105">
                         <img src="https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=1200&q=80" className="w-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Quiz" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      </div>
                   </div>
                </div>
              </div>
              <section className="py-20 md:py-32 bg-transparent" style={{ perspective: '3000px' }}>
                <div className="max-w-7xl mx-auto px-6">
                  <div className="bg-white/60 backdrop-blur-3xl rounded-[3rem] md:rounded-[8rem] p-8 md:p-24 shadow-[0_60px_120px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden group transition-transform duration-1000 lg:hover:translateZ(50px)">
                    <div className="absolute top-0 right-0 p-48 opacity-[0.01] pointer-events-none rotate-12 text-[#0a0a0a] hidden md:block">
                       <Database size={500} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
                      <div className="space-y-8 md:space-y-12">
                        <div className="flex items-center gap-3 md:gap-5 text-gray-400 font-black text-[9px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.7em]">
                          <ShieldCheck size={18} className="text-green-500 animate-pulse md:w-6 md:h-6" />
                          Concierge Level Access
                        </div>
                        <h3 className="text-4xl md:text-[7rem] font-heritage font-bold text-[#0a0a0a] leading-tight md:leading-[0.8] tracking-tighter uppercase">
                          Private <br/><span className="insta-text-gradient italic">Curations.</span>
                        </h3>
                        <p className="text-xl md:text-3xl font-light leading-relaxed italic border-l-4 md:border-l-8 border-[#E1306C]/20 pl-6 md:pl-12 py-2 md:py-3 text-gray-500">
                          {language === 'EN' 
                            ? "Access elite experiences. Journeys that exist beyond the digital map." 
                            : "ප්‍රභූ අත්දැකීම් සඳහා පිවිසෙන්න. ඩිජිටල් සිතියමෙන් ඔබ්බට ගිය සංචාරයන්."}
                        </p>
                        <button 
                           onClick={() => setView('destinations')}
                           className="flex items-center gap-6 md:gap-8 text-[#0a0a0a] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-[12px] hover:text-[#E1306C] transition-all group"
                        >
                           VIEW ALL REGISTRIES
                           <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-2xl border border-gray-200 flex items-center justify-center group-hover:border-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-all shadow-xl group-hover:rotate-12 bg-white">
                              <ArrowRight size={20} className="md:w-6 md:h-6" />
                           </div>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10" style={{ transformStyle: 'preserve-3d' }}>
                         <div className="space-y-8 md:space-y-10">
                            <div className="p-8 md:p-10 bg-white/80 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white space-y-6 md:space-y-8 transition-all lg:hover:-translate-y-6 lg:hover:rotate-y-12 lg:hover:shadow-[0_80px_150px_rgba(0,0,0,0.15)] group/card">
                               <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-inner group-hover/card:bg-orange-500 group-hover/card:text-white transition-colors duration-500"><MapPin size={24} className="md:w-8 md:h-8" /></div>
                               <p className="text-base md:text-lg font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#0a0a0a]">Site Mapping</p>
                               <p className="text-[9px] md:text-xs text-gray-400 font-bold tracking-[0.2em] uppercase">250+ Surveyed Nodes</p>
                            </div>
                            <div className="p-8 md:p-10 bg-white/80 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white space-y-6 md:space-y-8 transition-all lg:hover:-translate-y-6 lg:hover:rotate-y-12 lg:hover:shadow-[0_80px_150px_rgba(0,0,0,0.15)] group/card">
                               <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner group-hover/card:bg-blue-500 group-hover/card:text-white transition-colors duration-500"><Star size={24} className="md:w-8 md:h-8" /></div>
                               <p className="text-base md:text-lg font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#0a0a0a]">Elite Score</p>
                               <p className="text-[9px] md:text-xs text-gray-400 font-bold tracking-[0.2em] uppercase">4.9/5 Average</p>
                            </div>
                         </div>
                         <div className="sm:pt-24 space-y-8 md:space-y-10">
                            <div className="p-8 md:p-10 bg-[#0a0a0a] text-white rounded-[2rem] md:rounded-[3rem] shadow-[0_60px_120px_rgba(0,0,0,0.4)] space-y-6 md:space-y-8 transition-all lg:hover:-translate-y-6 lg:hover:rotate-y-[-12deg] group/vip">
                               <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#E1306C] shadow-2xl group-hover/vip:scale-110 transition-transform"><ShieldCheck size={24} className="md:w-8 md:h-8" /></div>
                               <p className="text-base md:text-lg font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Verified</p>
                               <p className="text-[9px] md:text-xs text-white/30 font-bold tracking-[0.2em] uppercase leading-relaxed">Registry Certified <br/>v2026.04</p>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <CategoriesSection language={language} setView={setView} />
              <StorySection language={language} setView={setView} />
              <section className="py-20 md:py-32 px-4 bg-transparent relative overflow-hidden" style={{ perspective: '2000px' }}>
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-32">
                    <div className="text-center space-y-6 md:space-y-8 group" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="w-32 h-32 md:w-44 md:h-44 bg-white/80 backdrop-blur-md shadow-2xl rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center mx-auto text-5xl md:text-7xl border border-white transition-all duration-1000 group-hover:rotate-y-180 lg:group-hover:translate-z-40 group-hover:shadow-[0_100px_180px_rgba(0,0,0,0.15)] relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/5 to-transparent rounded-[2.5rem] md:rounded-[3.5rem]" />
                          🏛️
                      </div>
                      <h3 className="text-3xl md:text-5xl font-heritage font-bold text-[#0a0a0a] tracking-tighter uppercase">2500+ Years</h3>
                      <p className="text-[10px] md:text-[12px] font-black text-gray-400 uppercase tracking-[0.5em] md:tracking-[0.8em]">{language === 'EN' ? 'Recorded History' : 'වාර්තාගත ඉතිහාසය'}</p>
                    </div>
                    <div className="text-center space-y-6 md:space-y-8 group" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="w-32 h-32 md:w-44 md:h-44 bg-white/80 backdrop-blur-md shadow-2xl rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center mx-auto text-5xl md:text-7xl border border-white transition-all duration-1000 group-hover:rotate-y-180 lg:group-hover:translate-z-40 group-hover:shadow-[0_100px_180px_rgba(0,0,0,0.15)] relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-[2.5rem] md:rounded-[3.5rem]" />
                          🏖️
                      </div>
                      <h3 className="text-3xl md:text-5xl font-heritage font-bold text-[#0a0a0a] tracking-tighter uppercase">1300+ KM</h3>
                      <p className="text-[10px] md:text-[12px] font-black text-gray-400 uppercase tracking-[0.5em] md:tracking-[0.8em]">{language === 'EN' ? 'Coastline' : 'වෙරළ තීරය'}</p>
                    </div>
                    <div className="text-center space-y-6 md:space-y-8 group" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="w-32 h-32 md:w-44 md:h-44 bg-white/80 backdrop-blur-md shadow-2xl rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center mx-auto text-5xl md:text-7xl border border-white transition-all duration-1000 group-hover:rotate-y-180 lg:group-hover:translate-z-40 group-hover:shadow-[0_100px_180px_rgba(0,0,0,0.15)] relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-[2.5rem] md:rounded-[3.5rem]" />
                           🐆
                      </div>
                      <h3 className="text-3xl md:text-5xl font-heritage font-bold text-[#0a0a0a] tracking-tighter uppercase">8 UNESCO</h3>
                      <p className="text-[10px] md:text-[12px] font-black text-gray-400 uppercase tracking-[0.5em] md:tracking-[0.8em]">{language === 'EN' ? 'World Heritage Sites' : 'ලෝක උරුම ස්ථාන'}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout language={language} setLanguage={setLanguage} setView={(v: any) => setView(v)} currentView={view} user={user} onLogin={handleLogin} onLogout={handleLogout}>
      <div className={`overflow-x-hidden transition-all duration-[2000ms] ${isSiteEntered ? 'scale-100 blur-0 opacity-100' : 'scale-[0.98] blur-lg opacity-0'}`}>
        {renderContent()}
      </div>
      {!isSiteEntered && <LoadingScreen onEnter={handleEnterSite} language={language} />}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        language={language}
      />
      <AIModal language={language} />
      <ScrollControls />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes slow-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 50px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-slow-drift {
          animation: slow-drift linear infinite;
        }
        @keyframes artifact-spin {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        .rotate-y-12 { transform: rotateY(12deg); }
        .rotate-y-[-15deg] { transform: rotateY(-15deg); }
        .translate-z-40 { transform: translateZ(40px); }
        .translate-z-100 { transform: translateZ(100px); }
        .translate-z-150 { transform: translateZ(150px); }
      `}} />
    </Layout>
  );
};

export default App;
