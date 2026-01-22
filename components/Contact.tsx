import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Users,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';

interface ContactProps {
  language: Language;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Suggestion',
    message: ''
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5)
      });
    };
    const handleScroll = () => setScrollPos(window.scrollY);
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Generate unique background elements
  const spatialNodes = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 1000 - 500,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
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
        setFormData({ name: '', email: '', subject: 'Suggestion', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Registry transmission failed.");
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(language === 'EN' 
        ? "Registry Uplink Interrupted. Please check your signal and try again." 
        : "සම්බන්ධතාවය අසාර්ථක විය. නැවත උත්සාහ කරන්න.");
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
      color: 'hover:bg-gradient-to-tr hover:from-[#fdf497] hover:via-[#d6249f] hover:to-[#285AEB]',
      text: 'text-[#E1306C]',
      handle: '@travelhubsl',
      url: '#'
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={48} />, 
      color: 'hover:bg-[#1877F2]',
      text: 'text-[#1877F2]',
      handle: 'Travel Hub SL',
      url: '#'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={48} />, 
      color: 'hover:bg-[#FF0000]',
      text: 'text-[#FF0000]',
      handle: '@TravelHublk-123',
      url: 'https://www.youtube.com/@TravelHublk-123'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] pb-32 animate-in fade-in duration-700 relative overflow-hidden">
      
      {/* --- FULLY ANIMATED BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ perspective: '1500px' }}>
        
        {/* A. Atmospheric Gradient Depth */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, rgba(225,48,108,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* B. Moving Neural Grid */}
        <div 
          className="absolute inset-0 opacity-[0.05] transition-transform duration-700 ease-out"
          style={{ 
            backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`, 
            backgroundSize: '100px 100px',
            transform: `rotateX(60deg) translateY(${scrollPos * 0.2}px) translateZ(-300px) scale(3) rotateZ(${mousePos.x * 5}deg)`,
            maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)'
          }}
        />

        {/* C. Floating Neural Nodes (Particles) */}
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, 0)` }}
        >
          {spatialNodes.map((node) => (
            <div 
              key={node.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                opacity: node.opacity,
                transform: `translateZ(${node.z}px)`,
                boxShadow: `0 0 15px rgba(225,48,108,${node.opacity + 0.2})`,
                animation: `float-node ${node.duration}s linear infinite`,
                animationDelay: `${node.delay}s`
              }}
            />
          ))}
        </div>

        {/* D. Volumetric Scanlines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E1306C]/30 to-transparent animate-scan-line z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan-line-reverse z-10" />

        {/* E. Large Cinematic Shapes */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] opacity-[0.02] mix-blend-screen pointer-events-none animate-spin-extremely-slow"
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}
        />
      </div>

      {/* Header Content */}
      <div className="relative z-10 pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
           <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-2xl animate-in slide-in-from-bottom-4 duration-1000">
              <div className="w-2 h-2 bg-[#E1306C] rounded-full animate-ping shadow-[0_0_10px_#E1306C]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Direct_Handshake_Active</span>
           </div>
           
           <h1 className="text-6xl md:text-[9rem] font-heritage font-bold text-white tracking-tighter uppercase leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
             SYNC WITH <br/><span className="italic insta-text-gradient">THE HUB.</span>
           </h1>
           
           <p className="text-gray-400 max-w-2xl mx-auto text-xl md:text-2xl font-light italic leading-relaxed opacity-80">
             {language === 'EN' 
               ? "Initializing high-fidelity correspondence protocols. Your signal is our priority." 
               : "දත්ත හුවමාරු පද්ධතිය සක්‍රියයි. ඔබගේ පණිවිඩය අපගේ ප්‍රමුඛතාවයයි."}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* FOLLOW US Section */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <div className="bg-black/40 backdrop-blur-3xl p-12 rounded-[4rem] shadow-2xl border border-white/10 space-y-12 group">
               <div className="space-y-3 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <Users size={24} className="text-[#E1306C] animate-pulse" />
                    <h3 className="text-3xl font-heritage font-bold text-white uppercase tracking-tighter">Island Network</h3>
                  </div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] ml-1">Live Social Transmissions</p>
               </div>

               <div className="grid grid-cols-1 gap-6">
                 {socialChannels.map((social, idx) => (
                   <a 
                     key={idx} 
                     href={social.url}
                     target={social.url !== '#' ? "_blank" : undefined}
                     rel={social.url !== '#' ? "noopener noreferrer" : undefined}
                     className={`group relative flex items-center gap-8 p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] transition-all duration-700 hover:shadow-[0_40px_100px_rgba(225,48,108,0.2)] hover:-translate-y-2 hover:text-white overflow-hidden ${social.color}`}
                   >
                     <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                     
                     <div className="relative z-10 w-20 h-20 bg-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center text-gray-400 border border-white/10 transition-all duration-700 group-hover:rotate-12 group-hover:bg-white/20 group-hover:text-inherit shadow-2xl">
                        {social.icon}
                     </div>
                     
                     <div className="relative z-10 space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">{social.name}</p>
                        <p className="text-xl font-bold tracking-tight text-white/90">{social.handle}</p>
                        <div className="pt-2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                           <span className="text-[9px] font-black uppercase tracking-widest">Connect</span>
                           <ArrowRight size={14} />
                        </div>
                     </div>
                   </a>
                 ))}
               </div>

               <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping shadow-[0_0_10px_#22c55e]" />
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Registry_Stable</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Activity size={12} className="text-blue-500" />
                     <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Node_v4.1</span>
                  </div>
               </div>
            </div>

            <div className="p-12 rounded-[4rem] bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white shadow-2xl relative overflow-hidden group border border-white/10">
               <div className="absolute inset-0 pattern-overlay opacity-10 group-hover:opacity-20 transition-opacity"></div>
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-2xl">
                    <ShieldCheck size={32} className="text-[#E1306C]" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-4xl font-heritage font-bold tracking-tighter uppercase">Encrypted <br/>Archives.</h4>
                    <p className="text-sm font-light italic leading-relaxed text-gray-400">
                      Your inquiry is prioritized by our senior architectural bureau. Direct synchronization ensures 100% packet integrity for all correspondence.
                    </p>
                  </div>
               </div>
               {/* 3D Wireframe decoration */}
               <div className="absolute -bottom-10 -right-10 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                  <Cpu size={200} className="animate-spin-slow" />
               </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white/95 backdrop-blur-3xl p-10 md:p-16 rounded-[5rem] shadow-[0_100px_200px_rgba(0,0,0,0.4)] border border-white/20 relative overflow-hidden">
               
               {isSuccess && (
                 <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col items-center justify-center text-center p-12 space-y-12 animate-in fade-in duration-700">
                    <div className="relative">
                       <div className="w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(34,197,94,0.4)] animate-bounce">
                          <CheckCircle2 size={64} />
                       </div>
                       <div className="absolute -inset-6 border-2 border-dashed border-green-500/20 rounded-full animate-spin-slow" />
                    </div>
                    <div className="space-y-6">
                       <h4 className="text-5xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Entry Committed</h4>
                       <p className="text-gray-500 text-xl font-medium italic max-w-md mx-auto leading-relaxed">
                         Packet received at <span className="text-[#E1306C] font-bold">slisuruniroshan@gmail.com</span>. Our intelligence unit will process your request shortly.
                       </p>
                    </div>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="px-16 py-6 bg-[#0a0a0a] text-white rounded-full text-[11px] font-black uppercase tracking-[0.5em] hover:scale-110 active:scale-95 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
                    >
                      Sync Next Entry
                    </button>
                 </div>
               )}

               <div className="space-y-16">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 border-b border-gray-100 pb-12">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-[#E1306C]">
                         <MessageSquare size={20} className="animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-[0.4em]">Correspondence_Portal</span>
                       </div>
                       <h3 className="text-4xl md:text-6xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Suggestion & Feedback</h3>
                       <div className="w-32 h-1.5 insta-gradient rounded-full shadow-lg"></div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2">
                       <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em]">Command_Center_v3</span>
                       <span className="text-[12px] font-bold text-[#0a0a0a] uppercase tracking-widest flex items-center gap-3">
                         <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e] animate-pulse" />
                         slisuruniroshan@gmail.com
                       </span>
                    </div>
                  </div>

                  {error && (
                    <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-8 animate-in slide-in-from-top-2 shadow-xl">
                       <div className="flex items-center gap-5 text-red-600">
                          <div className="p-4 bg-red-100 rounded-2xl"><AlertCircle size={28} /></div>
                          <p className="text-base font-bold italic">{error}</p>
                       </div>
                       <button 
                         onClick={handleManualMail}
                         className="w-full sm:w-auto px-10 py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-red-700 transition-all hover:scale-105 shadow-lg"
                       >
                         Manual Sync <ExternalLink size={16} />
                       </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-5 group">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Identity Tag</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Ex: Alexander Pierce"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                          className="w-full px-8 py-7 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-bold text-[#0a0a0a] text-lg shadow-inner placeholder:text-gray-200"
                        />
                      </div>
                      <div className="space-y-5 group">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Signal Channel (Email)</label>
                        <input 
                          required
                          type="email" 
                          placeholder="user@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                          className="w-full px-8 py-7 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-bold text-[#0a0a0a] text-lg shadow-inner placeholder:text-gray-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-5 group">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Inquiry Protocol</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                          className="w-full px-8 py-7 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-bold text-[#0a0a0a] text-lg appearance-none cursor-pointer shadow-inner"
                        >
                          <option>Suggestion</option>
                          <option>Feedback</option>
                          <option>Itinerary Archival</option>
                          <option>Collaboration Request</option>
                          <option>Technical Support</option>
                        </select>
                        <ArrowRight size={24} className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 text-gray-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-5 group">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2 transition-colors group-focus-within:text-[#E1306C]">Encoded Message</label>
                      <textarea 
                        required
                        rows={6}
                        placeholder="Detail your requirements for the bureau..."
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                        className="w-full px-8 py-8 bg-gray-50 border border-gray-100 rounded-[3.5rem] focus:outline-none focus:ring-8 focus:ring-[#E1306C]/5 focus:border-[#E1306C]/30 focus:bg-white transition-all font-medium italic text-[#0a0a0a] text-lg resize-none shadow-inner placeholder:text-gray-200"
                      />
                    </div>

                    <div className="pt-8">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-10 bg-[#0a0a0a] text-white rounded-[4rem] font-black text-base md:text-lg uppercase tracking-[0.6em] flex items-center justify-center gap-8 hover:shadow-[0_50px_100px_rgba(225,48,108,0.4)] hover:-translate-y-2 active:scale-95 transition-all group overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E1306C] via-[#f09433] to-[#E1306C] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        {isSubmitting ? (
                          <div className="flex flex-col items-center gap-4">
                            <Loader2 size={32} className="animate-spin text-[#E1306C]" />
                            <span className="text-[11px] animate-pulse tracking-[0.5em] text-[#E1306C]">INITIATING_UPLINK...</span>
                          </div>
                        ) : (
                          <>
                            Commit to Archive
                            <div className="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center group-hover:bg-[#E1306C] group-hover:rotate-12 transition-all shadow-2xl">
                               <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="flex flex-wrap items-center justify-center gap-12 pt-8 opacity-30">
                    <div className="flex items-center gap-3">
                       <ShieldCheck size={18} className="text-green-500" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em]">TLS 1.3 Secure</span>
                    </div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-3">
                       <Globe size={18} className="text-blue-500" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em]">Cloud_Routing</span>
                    </div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-3">
                       <Zap size={18} className="text-yellow-500" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em]">Instant_Registry</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-node {
          0% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-30px) translateZ(80px); }
          100% { transform: translateY(0) translateZ(0); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scan-line-reverse {
          0% { bottom: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { bottom: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-scan-line-reverse {
          animation: scan-line-reverse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 4s;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-spin-extremely-slow {
          animation: spin 120s linear infinite;
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