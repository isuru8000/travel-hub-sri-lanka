
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
// Fix: Added missing icon imports from lucide-react
import { Sparkles, Compass } from 'lucide-react';

export interface User {
  name: string;
  email: string;
  photo: string;
}

type View = 'home' | 'destinations' | 'about' | 'foods' | 'music' | 'interests' | 'medicine' | 'tea' | 'phrases' | 'essentials' | 'festivals' | 'memories' | 'quiz' | 'vr-experience';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('EN');
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
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
    // Simulate Google Sign In
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
        return (
          <div className="pt-8">
            <Destinations language={language} />
          </div>
        );
      case 'foods':
        return (
          <div className="pt-8">
            <Foods language={language} />
          </div>
        );
      case 'music':
        return (
          <div className="pt-8">
            <HeritageMusic language={language} />
          </div>
        );
      case 'medicine':
        return (
          <div className="pt-8">
            <TraditionalMedicine language={language} />
          </div>
        );
      case 'tea':
        return (
          <div className="pt-8">
            <TeaCulture language={language} />
          </div>
        );
      case 'phrases':
        return (
          <div className="pt-8">
            <Phrasebook language={language} />
          </div>
        );
      case 'essentials':
        return (
          <div className="pt-8">
            <TravelEssentials language={language} />
          </div>
        );
      case 'festivals':
        return (
          <div className="pt-8">
            <Festivals language={language} />
          </div>
        );
      case 'memories':
        return (
          <div className="pt-8">
            <TravelMemories 
              language={language} 
              user={user} 
              onLogin={handleLogin}
            />
          </div>
        );
      case 'interests':
        return (
          <div className="pt-8">
            <CategoriesSection language={language} setView={setView} />
          </div>
        );
      case 'quiz':
        return (
          <div className="pt-8">
            <Quiz language={language} setView={setView} />
          </div>
        );
      case 'vr-experience':
        return (
          <div className="pt-8">
            <VRExperience language={language} setView={setView} />
          </div>
        );
      case 'about':
        return (
          <div className="pt-8">
            <StorySection language={language} />
            <section className="py-20 px-4 bg-white">
              <div className="max-w-7xl mx-auto text-center space-y-8">
                <h2 className="text-3xl font-heritage font-bold text-[#262626]">
                  {language === 'EN' ? "Our Vision" : "අපගේ දැක්ම"}
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
                  {language === 'EN' 
                    ? "Travel Hub Sri Lanka was founded with a single mission: to bridge the gap between our island's glorious past and its vibrant future. We believe that every traveler should experience the soul of Sri Lanka, not just its sights."
                    : "ට්‍රැවල් හබ් ශ්‍රී ලංකා ආරම්භ කරන ලද්දේ එකම අරමුණකිනි: අපගේ දූපතේ අභිමානවත් අතීතය සහ එහි විචිත්‍රවත් අනාගතය අතර පාලමක් තැනීමයි. සෑම සංචාරකයෙකුම ශ්‍රී ලංකාවේ දසුන් පමණක් නොව එහි ආත්මයද අත්විඳිය යුතු බව අපි විශ්වාස කරමු."}
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
            <div className="relative">
              <PopularHighlights language={language} setView={setView} />

              {/* Quiz Invitation CTA */}
              <div className="bg-[#262626] py-32 px-4 relative overflow-hidden group">
                <div className="absolute inset-0 pattern-overlay opacity-10"></div>
                {/* Updated background image: Dark, atmospheric forest/temple vibes */}
                <div 
                  className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center opacity-30 transition-transform duration-[10000ms] group-hover:scale-110"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512100353917-7027ee1b277c?q=80&w=2000&auto=format&fit=crop')` }}
                />
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
                   <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                     <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-[0.5em]">
                       {/* Fix: Added missing Sparkles icon */}
                       <Sparkles size={14} className="text-yellow-400" />
                       Interactive Experience
                     </div>
                     <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white leading-tight">
                        What Kind of <br/>
                        <span className="insta-text-gradient italic">Explorer</span> Are You?
                     </h2>
                     <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                        Take our 1-minute visual journey to discover your island soul and receive a personalized itinerary for your next adventure.
                     </p>
                     <button 
                       onClick={() => setView('quiz')}
                       className="px-12 py-6 bg-white text-[#262626] font-bold rounded-2xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4 mx-auto md:mx-0 group/btn"
                     >
                       {/* Fix: Added missing Compass icon */}
                       <Compass size={22} className="text-[#E1306C] group-hover/btn:rotate-180 transition-transform duration-700" />
                       <span className="uppercase tracking-[0.2em] text-xs">Start the Quiz</span>
                     </button>
                   </div>
                   <div className="hidden md:block w-1/2 relative">
                      <div className="absolute -inset-4 story-ring rounded-[3rem] blur-2xl opacity-20"></div>
                      <img src="https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80" className="relative rounded-[3rem] shadow-2xl border-4 border-white/10" alt="Quiz" />
                   </div>
                </div>
              </div>

              <CategoriesSection language={language} setView={setView} />
              
              <div className="bg-[#f4a261]/10 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                  <h2 className="text-2xl md:text-3xl font-heritage font-bold text-[#262626]">
                    {language === 'EN' ? "Need a Personalized Plan?" : "ඔබට අවශ්‍ය පුද්ගලික සැලසුමක්ද?"}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'EN' 
                      ? "Talk to our AI guide or browse through our collection of hand-picked itineraries." 
                      : "අපගේ AI මගපෙන්වන්නා සමඟ කතා කරන්න හෝ අපගේ තෝරාගත් ගමන් මාර්ග පිරික්සන්න."}
                  </p>
                </div>
              </div>

              <StorySection language={language} />
              
              <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-1 bg-[#E1306C]/5 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">🏛️</span>
                      </div>
                      <h3 className="text-xl font-heritage font-bold">2500+ Years</h3>
                      <p className="text-sm text-gray-500">{language === 'EN' ? 'Recorded History' : 'වාර්තාගත ඉතිහාසය'}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-16 h-1 bg-[#E1306C]/5 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">🏖️</span>
                      </div>
                      <h3 className="text-xl font-heritage font-bold">1300+ KM</h3>
                      <p className="text-sm text-gray-500">{language === 'EN' ? 'Coastline' : 'වෙරළ තීරය'}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-16 h-1 bg-[#E1306C]/5 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">🐆</span>
                      </div>
                      <h3 className="text-xl font-heritage font-bold">8 UNESCO</h3>
                      <p className="text-sm text-gray-500">{language === 'EN' ? 'World Heritage Sites' : 'ලෝක උරුම ස්ථාන'}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        );
    }
  };

  return (
    <Layout 
      language={language} 
      setLanguage={setLanguage} 
      setView={(v: any) => setView(v)} 
      currentView={view}
      user={user}
      onLogin={handleLogin}
      onLogout={handleLogout}
    >
      {renderContent()}
      <AIModal language={language} />
    </Layout>
  );
};

export default App;
