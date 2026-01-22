
import React, { useEffect, useRef } from 'react';
import { X, Sparkles, ShieldCheck, Globe, LogIn } from 'lucide-react';
import { Language } from '../types.ts';

// Fix: Define the google property on the window interface to prevent TypeScript from reporting it as missing.
declare global {
  interface Window {
    google: any;
  }
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onGoogleSuccess: (response: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, language, onGoogleSuccess }) => {
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fix: Access the google object from window, which is now recognized due to the global declaration.
    if (isOpen && window.google) {
      // Small delay to ensure the container is rendered
      const timer = setTimeout(() => {
        window.google.accounts.id.initialize({
          client_id: "873836173004-9v4s989u6v7j4m3e8p5d5d8o8j6r5q9a.apps.googleusercontent.com", // Replace with your real Client ID
          callback: onGoogleSuccess,
        });

        if (googleBtnRef.current) {
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: googleBtnRef.current.offsetWidth,
            text: language === 'EN' ? "signin_with" : "continue_with",
            shape: "pill",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, language, onGoogleSuccess]);

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
            <div ref={googleBtnRef} className="w-full min-h-[44px]" />
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <span className="relative px-4 bg-white text-[10px] font-black text-gray-300 uppercase tracking-widest">Secure Handshake</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <ShieldCheck size={20} className="text-green-500" />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-[#0a0a0a]">Verified Protocol</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">SSL Encryption Active</p>
                </div>
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
