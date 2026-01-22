import React, { useState, useEffect } from 'react';
import { Language } from '../types.ts';
import { 
  Send, 
  Mail, 
  Globe, 
  Instagram, 
  Facebook, 
  Youtube, 
  ShieldCheck, 
  Loader2, 
  MapPin, 
  Phone, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Users,
  Share2
} from 'lucide-react';

interface ContactProps {
  language: Language;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Data Transmission to slisuruniroshan@gmail.com
      const response = await fetch("https://formspree.io/f/xpwzprow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _to: "slisuruniroshan@gmail.com",
          _replyto: formData.email,
          _subject: `Travel Hub Inquiry from ${formData.name}`,
          message: `Sender: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Registry transmission failed.");
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(language === 'EN' 
        ? "Registry Uplink Interrupted. Please try again or use manual link." 
        : "සම්බන්ධතාවය අසාර්ථක විය. නැවත උත්සාහ කරන්න හෝ පහත සබැඳිය භාවිතා කරන්න.");
    } finally {
      setIsSubmitting(false);
      if (isSuccess) setTimeout(() => setIsSuccess(false), 8000);
    }
  };

  const handleManualMail = () => {
    const mailto = `mailto:slisuruniroshan@gmail.com?subject=${formData.subject}&body=${encodeURIComponent(`Name: ${formData.name}\n\n${formData.message}`)}`;
    window.location.href = mailto;
  };

  const socialChannels = [
    { 
      name: 'Instagram', 
      icon: <Instagram size={48} />, 
      color: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]',
      text: 'text-[#E1306C]',
      handle: '@travelhubsl'
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={48} />, 
      color: 'hover:bg-[#1877F2]',
      text: 'text-[#1877F2]',
      handle: 'Travel Hub SL'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={48} />, 
      color: 'hover:bg-[#FF0000]',
      text: 'text-[#FF0000]',
      handle: 'Island Archives'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32 animate-in fade-in duration-700 relative overflow-hidden">
      {/* Dynamic Watermark */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] transition-transform duration-[15s] ease-linear"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(1.1) translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`
        }}
      />

      {/* Header Section */}
      <div className="relative pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
           <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[#0a0a0a] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              <div className="w-1.5 h-1.5 bg-[#E1306C] rounded-full animate-ping" />
              Global Connection Registry
           </div>
           <h1 className="text-6xl md:text-9xl font-heritage font-bold text-[#0a0a0a] tracking-tighter uppercase leading-[0.85]">
             Connect with <br/><span className="italic insta-text-gradient">The Bureau.</span>
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-xl md:text-2xl font-light italic leading-relaxed">
             {language === 'EN' 
               ? "Direct architectural archives and expert travel guidance for the discerning voyager." 
               : "විශේෂඥ සංචාරක මගපෙන්වීම සහ දත්ත සහාය ලබාගැනීම සඳහා අප හා සම්බන්ධ වන්න."}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Information Sidebar: FOLLOW US Section */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-50 space-y-12 backdrop-blur-md">
               <div className="space-y-3 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <Users size={20} className="text-[#E1306C]" />
                    <h3 className="text-2xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Follow Our Journey</h3>
                  </div>
                  <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] ml-1">Live Social Transmissions</p>
               </div>

               <div className="grid grid-cols-1 gap-6">
                 {socialChannels.map((social, idx) => (
                   <a 
                     key={idx} 
                     href="#" 
                     className={`group relative flex items-center gap-8 p-8 bg-[#fafafa] border border-gray-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:text-white overflow-hidden ${social.color}`}
                   >
                     {/* Shimmer Effect */}
                     <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                     
                     <div className="relative z-10 w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-400 shadow-sm transition-all duration-500 group-hover:rotate-12 group-hover:bg-white/20 group-hover:text-inherit">
                        {social.icon}
                     </div>
                     
                     <div className="relative z-10 space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{social.name}</p>
                        <p className="text-xl font-bold tracking-tight">{social.handle}</p>
                        <div className="pt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                           <span className="text-[9px] font-black uppercase tracking-widest">Connect</span>
                           <ArrowRight size={12} />
                        </div>
                     </div>
                   </a>
                 ))}
               </div>

               <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Digital_Pulse_Active</span>
                  </div>
                  <span className="text-[8px] font-black text-gray-200 uppercase tracking-[0.4em]">v2.4_Social_Sync</span>
               </div>
            </div>

            <div className="p-12 rounded-[3.5rem] bg-[#0a0a0a] text-white shadow-2xl relative overflow-hidden group border border-white/10">
               <div className="absolute inset-0 pattern-overlay opacity-10"></div>
               <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-2xl">
                    <ShieldCheck size={28} className="text-[#E1306C]" />
                  </div>
                  <h4 className="text-3xl font-heritage font-bold">Encrypted <br/>Correspondence.</h4>
                  <p className="text-sm font-light italic leading-relaxed opacity-60">
                    Direct access to our development node. Inquiries are audited and processed by the senior architectural bureau within 12 standard business hours.
                  </p>
               </div>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white p-10 md:p-16 rounded-[4.5rem] shadow-[0_80px_160px_rgba(0,0,0,0.12)] border border-gray-100 relative overflow-hidden backdrop-blur-sm">
               
               {isSuccess && (
                 <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col items-center justify-center text-center p-12 space-y-10 animate-in fade-in duration-500">
                    <div className="relative">
                       <div className="w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.3)] animate-bounce">
                          <CheckCircle2 size={64} />
                       </div>
                       <div className="absolute -inset-4 border-2 border-dashed border-green-500/20 rounded-full animate-spin-slow" />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-4xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Transmission Successful</h4>
                       <p className="text-gray-400 text-xl font-medium italic max-w-md mx-auto leading-relaxed">
                         Packet received at <span className="text-[#E1306C] font-bold">slisuruniroshan@gmail.com</span>. The bureau has registered your signal.
                       </p>
                    </div>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="px-12 py-5 bg-[#0a0a0a] text-white rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:scale-110 active:scale-95 transition-all shadow-xl"
                    >
                      Close Portal
                    </button>
                 </div>
               )}

               <div className="space-y-12">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-gray-50 pb-10">
                    <div className="space-y-3">
                       <h3 className="text-4xl md:text-5xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Client Inquiry</h3>
                       <div className="w-20 h-1.5 insta-gradient rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                       <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">Target Frequency</span>
                       <span className="text-[11px] font-bold text-[#E1306C] uppercase tracking-widest flex items-center gap-3">
                         <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                         slisuruniroshan@gmail.com
                       </span>
                    </div>
                  </div>

                  {error && (
                    <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center justify-between gap-6 animate-in slide-in-from-top-2">
                       <div className="flex items-center gap-4 text-red-600">
                          <AlertCircle size={24} />
                          <p className="text-sm font-bold italic">{error}</p>
                       </div>
                       <button 
                         onClick={handleManualMail}
                         className="px-6 py-3 bg-red-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 transition-colors shrink-0"
                       >
                         Manual Sync <ExternalLink size={12} />
                       </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4 group">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Identity Tag</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Ex: Alexander Pierce"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                          className="w-full px-8 py-6 bg-[#fafafa] border border-gray-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-bold text-[#0a0a0a]"
                        />
                      </div>
                      <div className="space-y-4 group">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Signal Channel (Email)</label>
                        <input 
                          required
                          type="email" 
                          placeholder="user@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                          className="w-full px-8 py-6 bg-[#fafafa] border border-gray-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-bold text-[#0a0a0a]"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Inquiry Protocol</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                        className="w-full px-8 py-6 bg-[#fafafa] border border-gray-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-bold text-[#0a0a0a] appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Itinerary Archival</option>
                        <option>Heritage Feedback</option>
                        <option>Collaboration Request</option>
                        <option>Technical Support</option>
                      </select>
                    </div>

                    <div className="space-y-4 group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Encoded Message</label>
                      <textarea 
                        required
                        rows={6}
                        placeholder="Detail your requirements for the bureau..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                        className="w-full px-8 py-6 bg-[#fafafa] border border-gray-100 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-medium italic text-[#0a0a0a] resize-none"
                      />
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-8 bg-[#0a0a0a] text-white rounded-[3rem] font-black text-sm uppercase tracking-[0.6em] flex items-center justify-center gap-6 hover:shadow-[0_40px_80px_rgba(225,48,108,0.3)] hover:-translate-y-1 active:scale-95 transition-all group overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E1306C] via-[#f09433] to-[#E1306C] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        {isSubmitting ? (
                          <div className="flex items-center gap-4">
                            <Loader2 size={24} className="animate-spin" />
                            <span className="text-[10px] animate-pulse tracking-[0.4em]">INITIATING_UPLINK...</span>
                          </div>
                        ) : (
                          <>
                            Execute Transmission
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#E1306C]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="flex flex-wrap items-center justify-center gap-10 pt-8 opacity-40">
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={14} className="text-green-500" />
                       <span className="text-[9px] font-black uppercase tracking-widest">TLS 1.3 Active</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-2">
                       <Globe size={14} className="text-blue-500" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Cloudflare Guarded</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-2">
                       <MessageSquare size={14} className="text-orange-500" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Verified Destination</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default Contact;