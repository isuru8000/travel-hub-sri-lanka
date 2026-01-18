import React, { useState, useEffect } from 'react';
import { Language } from './types.ts';
import Layout from './components/Layout.tsx';
import Hero from './components/Hero.tsx';
import PopularHighlights from './components/PopularHighlights.tsx';
import Destinations from './components/Destinations.tsx';
import Foods from './components/Foods.tsx';
import CategoriesSection from './components/CategoriesSection.tsx';
import StorySection from './components/StorySection.tsx';
import AIModal from './components/AIModal.tsx';

type View = 'home' | 'destinations' | 'about' | 'foods';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('EN');
  const [view, setView] = useState<View>('home');

  useEffect(() => {
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
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, [view]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

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
                      <div className="w-16 h-16 bg-[#E1306C]/5 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">🏛️</span>
                      </div>
                      <h3 className="text-xl font-heritage font-bold">2500+ Years</h3>
                      <p className="text-sm text-gray-500">{language === 'EN' ? 'Recorded History' : 'වාර්තාගත ඉතිහාසය'}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-[#E1306C]/5 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">🏖️</span>
                      </div>
                      <h3 className="text-xl font-heritage font-bold">1300+ KM</h3>
                      <p className="text-sm text-gray-500">{language === 'EN' ? 'Coastline' : 'වෙරළ තීරය'}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-[#E1306C]/5 rounded-full flex items-center justify-center mx-auto">
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
    >
      {renderContent()}
      <AIModal language={language} />
    </Layout>
  );
};

export default App;