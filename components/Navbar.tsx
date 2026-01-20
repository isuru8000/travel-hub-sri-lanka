
import React, { useState } from 'react';
import { Language } from '../types';
import { Menu, X, Globe, Camera, LogOut, LogIn, Box } from 'lucide-react';
import { User } from '../App.tsx';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setView: (view: any) => void;
  currentView: string;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  setLanguage, 
  setView, 
  currentView,
  user,
  onLogin,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNav = (view: any) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 story-ring rounded-xl flex items-center justify-center shrink-0">
            <div className="bg-white w-full h-full rounded-[10px] flex items-center justify-center">
               <div className="insta-text-gradient font-heritage font-bold text-xl">L</div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none">
            <span className="font-heritage font-bold text-lg text-[#262626]">Travel Hub</span>
            <span className="font-heritage font-medium text-xs text-gray-500 lowercase tracking-wider mt-0.5">sri lanka</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNav('home')} 
            className={`text-sm font-semibold transition-colors ${currentView === 'home' ? 'insta-text-gradient' : 'text-[#262626] hover:text-[#E1306C]'}`}
          >
            {language === 'EN' ? 'Home' : 'මුල් පිටුව'}
          </button>
          <button 
            onClick={() => handleNav('destinations')} 
            className={`text-sm font-semibold transition-colors ${currentView === 'destinations' ? 'insta-text-gradient' : 'text-[#262626] hover:text-[#E1306C]'}`}
          >
            {language === 'EN' ? 'Destinations' : 'ගමනාන්ත'}
          </button>
          <button 
            onClick={() => handleNav('vr-experience')} 
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${currentView === 'vr-experience' ? 'insta-text-gradient' : 'text-[#262626] hover:text-[#E1306C]'}`}
          >
            <Box size={16} className={currentView === 'vr-experience' ? 'text-[#E1306C]' : ''} />
            {language === 'EN' ? 'VR Experience' : 'VR අත්දැකීම'}
          </button>
          <button 
            onClick={() => handleNav('memories')} 
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${currentView === 'memories' ? 'insta-text-gradient' : 'text-[#262626] hover:text-[#E1306C]'}`}
          >
            <Camera size={16} className={currentView === 'memories' ? 'text-[#E1306C]' : ''} />
            {language === 'EN' ? 'Memories' : 'මතකයන්'}
          </button>
          
          <div className="h-4 w-[1px] bg-gray-200"></div>
          
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className="flex items-center gap-2 text-xs font-bold text-[#E1306C] hover:opacity-80 transition-opacity uppercase tracking-widest"
          >
            <Globe size={14} />
            {language === 'EN' ? 'SI' : 'EN'}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full border-2 border-gray-100 overflow-hidden hover:border-[#E1306C] transition-all"
              >
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-4 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs font-bold text-[#262626] truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={14} />
                    {language === 'EN' ? 'Sign Out' : 'ඉවත් වන්න'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#262626] text-white rounded-full text-xs font-bold hover:bg-black transition-all shadow-md group"
            >
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center p-0.5 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
              {language === 'EN' ? 'Sign in' : 'පිවිසෙන්න'}
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'SI' : 'EN')}
            className="text-xs font-bold text-[#E1306C]"
          >
            {language}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#262626]">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4">
          <button onClick={() => handleNav('home')} className="block w-full text-left py-2 text-sm font-bold">{language === 'EN' ? 'Home' : 'මුල් පිටුව'}</button>
          <button onClick={() => handleNav('destinations')} className="block w-full text-left py-2 text-sm font-bold">{language === 'EN' ? 'Destinations' : 'ගමනාන්ත'}</button>
          <button onClick={() => handleNav('vr-experience')} className="block w-full text-left py-2 text-sm font-bold">{language === 'EN' ? 'VR Experience' : 'VR අත්දැකීම'}</button>
          <button onClick={() => handleNav('memories')} className="block w-full text-left py-2 text-sm font-bold">{language === 'EN' ? 'Memories' : 'මතකයන්'}</button>
          <button onClick={() => handleNav('about')} className="block w-full text-left py-2 text-sm font-bold">{language === 'EN' ? 'About' : 'අපි ගැන'}</button>
          {!user && (
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-[#262626] text-white rounded-xl text-xs font-bold"
            >
              <LogIn size={16} />
              {language === 'EN' ? 'Sign in with Google' : 'Google හරහා පිවිසෙන්න'}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
