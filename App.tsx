
import React, { useState, useEffect } from 'react';
import { Language } from './types.ts';
import Layout from './components/Layout.tsx';
import Hero from './components/Hero.tsx';
import PopularHighlights from './components/PopularHighlights.tsx';
import Destinations from './components/Destinations.tsx';
import Foods from './components/Foods.tsx';
import HeritageMusic from './components/HeritageMusic.tsx';
import TraditionalMedicine from './components/TraditionalMedicine.tsx';
import TeaCulture from './components/TeaCulture.tsx';
import Phrasebook from './components/Phrasebook.tsx';
import TravelEssentials from './components/TravelEssentials.tsx';
import Festivals from './components/Festivals.tsx';
import CategoriesSection from './components/CategoriesSection.tsx';
import StorySection from './components/StorySection.tsx';
import AIModal from './components/AIModal.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import TravelMemories from './components/TravelMemories.tsx';
import Quiz from './components/Quiz.tsx';
import VRExperience from './components/VRExperience.tsx';
import VRShowcase from './components/VRShowcase.tsx';
import { Sparkles, Compass, ShieldCheck, Star, Users, MapPin, ArrowRight } from 'lucide-react';

export interface User {
  name: string;
  email: string;
  photo: string;
}

type View = 'home' | 'destinations' | 'about' | 'foods' | 'music' | 'interests' | 'medicine' | 'tea' | 'phrases' | 'essentials' | 'festivals' | 'memories' | 'quiz' | 'vr-experience' | 'vr-showcase';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('EN');
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });

    return () => {
      clearTimeout(timer);
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, [view]);

  useEffect(() => {
    if (!isInitialLoading) {
      window.scrollTo(0, 0);
    }
  }, [view, isInitialLoading]);

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  const handleLogin = () => {
    setUser({
      name: "Saman Kumara",
      email: "saman.k@gmail.com",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderContent = () => {
    switch (view) {
      case 'destinations':
        return <div className="pt-8"><Destinations language={language} /></div>;
      case 'foods':
        return <div className="pt-8"><Foods language={language} /></div>;
      case 'music':
        return <div className="pt-8"><HeritageMusic language={language} /></div>;
      case 'medicine':
        return <div className="pt-8"><TraditionalMedicine language={language} /></div>;
      case 'tea':
        return <div className="pt-8"><TeaCulture language={language} /></div>;
      case 'phrases':
        return <div className="pt-8"><Phrasebook language={language} /></div>;
      case 'essentials':
        return <div className="pt-8"><TravelEssentials language={language} /></div>;
      case 'festivals':
        return <div className="pt-8"><Festivals language={language} /></div>;
      case 'memories':
        return <div className="pt-8"><TravelMemories language={language} user={user} onLogin={handleLogin} /></div>;
      case 'interests':
        return <div className="pt-8"><CategoriesSection language={language} setView={setView} /></div>;
      case 'quiz':
        return <div className="pt-8"><Quiz language={language} setView={setView} /></div>;
      case 'vr-experience':
        return <div className="pt-8"><VRExperience language={language} setView={setView} /></div>;
      case 'vr-showcase':
        return <VRShowcase language={language} setView={setView} />;
      case 'about':
        return (
          <div className="pt-8">
            <StorySection language={language} setView={setView} />
            <section className="py-20 px-4 bg-white">
              <div className="max-w-7xl mx-auto text-center space-y-8">
                <h2 className="text-3xl font-heritage font-bold text-[#262626]">
                  {language === 'EN' ? "Our Vision" : "අපගේ දැක්ම"}
                </h2>
                <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed italic">
                  "Travel Hub Sri Lanka was founded to bridge the gap between our island's glorious past and its vibrant future."
                </p>
              </div>
            </section>
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero language={language} setView={setView} />
            
            {/* Trust Banner - Premium Logo Strip (Light) */}
            <div className="py-12 bg-white border-b border-gray-100 overflow-hidden">
               <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-30 grayscale contrast-125">
                  <span className="text-lg font-heritage font-black italic tracking-tighter uppercase text-[#262626]">Condé Nast Traveler</span>
                  <span className="text-lg font-heritage font-black italic tracking-tighter uppercase text-[#262626]">National Geographic</span>
                  <span className="text-lg font-heritage font-black italic tracking-tighter uppercase text-[#262626]">The New York Times</span>
                  <span className="text-lg font-heritage font-black italic tracking-tighter uppercase text-[#262626]">Lonely Planet</span>
               </div>
            </div>

            <PopularHighlights language={language} setView={setView} />

            {/* Premium Quiz CTA (Light High Contrast) */}
            <div className="bg-[#fafafa] py-40 px-4 relative overflow-hidden group border-y border-gray-100">
              <div className="absolute inset-0 pattern-overlay opacity-5"></div>
              <div 
                className="absolute right-0 top-0 w-full md:w-3/4 h-full bg-cover bg-center opacity-[0.03] transition-transform duration-[15000ms] group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512100353917-7027ee1b277c?q=80&w=2000&auto=format&fit=crop')` }}
              />
              <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-20">
                 <div className="w-full md:w-1/2 space-y-10 text-center md:text-left">
                   <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/5 border border-black/10 text-[#262626] text-[10px] font-black uppercase tracking-[0.5em]">
                     <Sparkles size={14} className="text-[#E1306C]" />
                     Bespoke Curation
                   </div>
                   <h2 className="text-5xl md:text-8xl font-heritage font-bold text-[#262626] leading-[0.9] tracking-tight">
                      Find Your <br/>
                      <span className="insta-text-gradient italic">Island Soul.</span>
                   </h2>
                   <p className="text-gray-400 text-xl font-light leading-relaxed max-w-lg italic">
                      "Our 1-minute visual archetype engine reveals the journey you were destined to take."
                   </p>
                   <button 
                     onClick={() => setView('quiz')}
                     className="px-14 py-7 bg-[#262626] text-white font-bold rounded-[2.5rem] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-4 mx-auto md:mx-0 group/btn overflow-hidden relative"
                   >
                     <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                     <Compass size={24} className="text-[#E1306C] group-hover/btn:rotate-180 transition-transform duration-1000" />
                     <span className="uppercase tracking-[0.3em] text-[10px]">Begin Archetype Test</span>
                   </button>
                 </div>
                 <div className="hidden lg:block w-1/2 relative">
                    <div className="absolute -inset-10 story-ring rounded-[5rem] blur-[100px] opacity-10 animate-pulse"></div>
                    <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-gray-100 rotate-2 group-hover:rotate-0 transition-transform duration-700">
                       <img src="https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=1200&q=80" className="w-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Quiz" />
                    </div>
                 </div>
              </div>
            </div>

            {/* Travel Designer / Concierge Section (Light) */}
            <section className="py-40 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="bg-[#fafafa] rounded-[4rem] p-12 md:p-24 shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none rotate-12 text-[#262626]">
                     <Users size={300} />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="space-y-10">
                      <div className="flex items-center gap-3 text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">
                        <ShieldCheck size={16} className="text-green-600" />
                        Concierge Level Service
                      </div>
                      <h3 className="text-5xl md:text-6xl font-heritage font-bold text-[#262626] leading-tight">
                        Your Personal <br/><span className="insta-text-gradient italic">Travel Designer.</span>
                      </h3>
                      <p className="text-gray-500 text-xl font-light leading-relaxed italic border-l-2 border-gray-100 pl-8">
                        {language === 'EN' 
                          ? "Beyond a website, we are your gateway to the island's elite experiences. Our AI and local experts craft journeys that linger in memory forever." 
                          : "අප යනු හුදු වෙබ් අඩවියක් පමණක් නොවේ, දිවයිනේ ප්‍රභූ අත්දැකීම් සඳහා ඔබේ දොරටුවයි. අපගේ AI සහ දේශීය විශේෂඥයින් සදාකාලික මතකයක් එක් කරන සංචාරයන් නිර්මාණය කරයි."}
                      </p>
                      <button 
                         onClick={() => setView('destinations')}
                         className="flex items-center gap-4 text-[#262626] font-bold uppercase tracking-[0.3em] text-[10px] hover:text-[#E1306C] transition-colors group"
                      >
                         View All Destinations
                         <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#E1306C] transition-colors">
                            <ArrowRight size={16} />
                         </div>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-6">
                          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-50 space-y-4">
                             <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500"><MapPin size={20} /></div>
                             <p className="text-xs font-black uppercase tracking-widest text-[#262626]">Site Mapping</p>
                             <p className="text-[10px] text-gray-400 leading-relaxed font-bold">250+ Surveyed Locations</p>
                          </div>
                          <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-50 space-y-4">
                             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Star size={20} /></div>
                             <p className="text-xs font-black uppercase tracking-widest text-[#262626]">Quality Score</p>
                             <p className="text-[10px] text-gray-400 leading-relaxed font-bold">4.9/5 Guest Average</p>
                          </div>
                       </div>
                       <div className="pt-12 space-y-6">
                          <div className="p-8 bg-[#262626] text-white rounded-3xl shadow-2xl space-y-4">
                             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white"><ShieldCheck size={20} /></div>
                             <p className="text-xs font-black uppercase tracking-widest">Verified</p>
                             <p className="text-[10px] text-white/40 leading-relaxed font-bold">Lanka Tourism Board Certified</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <CategoriesSection language={language} setView={setView} />
            
            <StorySection language={language} setView={setView} />
            
            <section className="py-40 px-4 bg-[#fafafa]">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                  <div className="text-center space-y-6 group">
                    <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto text-4xl border border-gray-50 group-hover:scale-110 transition-transform">🏛️</div>
                    <h3 className="text-3xl font-heritage font-bold text-[#262626]">2500+ Years</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{language === 'EN' ? 'Recorded History' : 'වාර්තාගත ඉතිහාසය'}</p>
                  </div>
                  <div className="text-center space-y-6 group">
                    <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto text-4xl border border-gray-50 group-hover:scale-110 transition-transform">🏖️</div>
                    <h3 className="text-3xl font-heritage font-bold text-[#262626]">1300+ KM</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{language === 'EN' ? 'Coastline' : 'වෙරළ තීරය'}</p>
                  </div>
                  <div className="text-center space-y-6 group">
                    <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto text-4xl border border-gray-50 group-hover:scale-110 transition-transform">🐆</div>
                    <h3 className="text-3xl font-heritage font-bold text-[#262626]">8 UNESCO</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{language === 'EN' ? 'World Heritage Sites' : 'ලෝක උරුම ස්ථාන'}</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <Layout language={language} setLanguage={setLanguage} setView={(v: any) => setView(v)} currentView={view} user={user} onLogin={handleLogin} onLogout={handleLogout}>
      {renderContent()}
      <AIModal language={language} />
    </Layout>
  );
};

export default App;
