import React, { useState } from 'react';
import { X, Globe, Chrome, ShieldCheck } from 'lucide-react';
import { Language } from '../types.ts';
import { supabase, GOOGLE_CLIENT_ID } from '../lib/supabase.ts';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, language }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      /**
       * Supabase OAuth flow handles the redirect to Google and back to your site.
       * redirectTo ensures the user is sent back to the travel hub after auth.
       * Note: Ensure GOOGLE_CLIENT_ID is configured in your Supabase Dashboard
       * under Auth > Providers > Google.
       */
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error("Authentication error:", error.message);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute inset-0 pattern-overlay opacity-[0.03] pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="p-12 space-y-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 story-ring p-1 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
              <div className="bg-white w-full h-full rounded-[14px] flex items-center justify-center">
                <Globe size={28} className="text-[#E1306C]" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">
                {language === 'EN' ? "Access Registry" : "පිවිසුම අරඹන්න"}
              </h2>
              <p className="text-gray-400 text-sm font-medium italic">
                {language === 'EN' 
                  ? "Synchronize your identity with the island archives." 
                  : "ඔබේ අනන්‍යතාවය දිවයිනේ සංරක්ෂණාගාරය සමඟ සම්බන්ධ කරන්න."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-4 py-5 px-6 bg-[#0a0a0a] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_20px_40px_rgba(225,48,108,0.3)] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Chrome size={20} className="text-white group-hover:rotate-12 transition-transform" />
              )}
              {language === 'EN' ? "Continue with Google" : "ගූගල් සමඟ සම්බන්ධ වන්න"}
            </button>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <span className="relative px-4 bg-white text-[10px] font-black text-gray-300 uppercase tracking-widest">Secure Handshake</span>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <ShieldCheck size={20} className="text-green-500" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-[#0a0a0a]">Verified Protocol</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">Supabase Auth Integrated</p>
              </div>
            </div>
          </div>

          <p className="text-[9px] text-center text-gray-300 font-bold uppercase tracking-widest leading-relaxed">
            By connecting, you agree to the <br/> 
            <span className="text-gray-400 hover:text-black cursor-pointer transition-colors">Heritage Archive Terms</span> & <span className="text-gray-400 hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
