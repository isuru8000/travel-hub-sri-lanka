
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Radio, Volume2, Sparkles, Zap, ShieldCheck, Activity, Cpu, Loader2, AlertTriangle, Key } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Language } from '../types.ts';
import { decode, encode, decodeAudioData, createPcmBlob } from '../services/gemini.ts';

interface LiveVoiceGuideProps {
  language: Language;
}

const LiveVoiceGuide: React.FC<LiveVoiceGuideProps> = ({ language }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const sessionRef = useRef<any>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const micStreamRef = useRef<MediaStream | null>(null);

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
      sessionRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      try { inputAudioCtxRef.current.close(); } catch (e) {}
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      try { outputAudioCtxRef.current.close(); } catch (e) {}
      outputAudioCtxRef.current = null;
    }
    activeSourcesRef.current.forEach(s => { try { s.stop(); } catch (e) {} });
    activeSourcesRef.current.clear();
    
    setIsActive(false);
    setIsConnecting(false);
    setStatus('idle');
  };

  const startSession = async () => {
    try {
      setError(null);
      setIsConnecting(true);
      
      // Initialize API instance inside the interaction handler
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Request microphone access with specific constraints to help with hardware detection
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      }).catch(err => {
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          throw new Error("MICROPHONE_NOT_FOUND");
        }
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          throw new Error("PERMISSION_DENIED");
        }
        throw err;
      });

      micStreamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Ensure contexts are resumed (required by some browsers even within click handlers)
      await inputCtx.resume();
      await outputCtx.resume();
      
      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;
      nextStartTimeRef.current = 0;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            setStatus('listening');

            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (event) => {
              const inputData = event.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Support both text and audio parts if returned
            const modelTurnParts = message.serverContent?.modelTurn?.parts || [];
            for (const part of modelTurnParts) {
              const base64Audio = part.inlineData?.data;
              if (base64Audio) {
                setStatus('speaking');
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
                const source = outputCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputCtx.destination);
                source.addEventListener('ended', () => {
                  activeSourcesRef.current.delete(source);
                  if (activeSourcesRef.current.size === 0) setStatus('listening');
                });
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                activeSourcesRef.current.add(source);
              }
            }

            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => { try { s.stop(); } catch (e) {} });
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
          },
          onerror: async (e: any) => {
            console.error('Live stream error:', e);
            if (e.message?.includes("Requested entity was not found.")) {
              setError("API_KEY_ERROR");
              stopSession();
            } else {
              stopSession();
            }
          },
          onclose: () => {
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `You are "Lanka Guide Live", a charismatic expert from Travel Hub Sri Lanka. 
          Respond in ${language === 'SI' ? 'Sinhala' : 'English'}. Welcome with Ayubowan. Be poetic yet helpful.`
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error('Failed to start voice link:', err);
      setIsConnecting(false);
      
      if (err.message === "MICROPHONE_NOT_FOUND") {
        setError(language === 'EN' ? "Microphone not detected. Please check your hardware." : "මයික්‍රොෆෝනය හඳුනාගත නොහැක. කරුණාකර ඔබගේ උපකරණ පරීක්ෂා කරන්න.");
      } else if (err.message === "PERMISSION_DENIED") {
        setError(language === 'EN' ? "Microphone permission denied. Please allow access in browser settings." : "මයික්‍රොෆෝනය භාවිතා කිරීමට අවසර නොමැත.");
      } else if (err.message?.includes("Requested entity was not found.")) {
        setError("API_KEY_ERROR");
      } else {
        setError(language === 'EN' ? "Voice link failed. Please try again." : "සම්බන්ධතාවය අසාර්ථක විය. නැවත උත්සාහ කරන්න.");
      }
      
      stopSession();
    }
  };

  const handleKeySelection = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setError(null);
      startSession();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[60] group/live">
        <div className={`absolute inset-0 bg-[#E1306C] rounded-full animate-ping opacity-20 scale-150 transition-opacity ${isActive ? 'opacity-40' : 'group-hover/live:opacity-0'}`}></div>
        <button 
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`relative p-6 rounded-full shadow-[0_30px_70px_rgba(225,48,108,0.3)] transition-all duration-700 flex items-center gap-4 overflow-hidden border border-white/20 ${isActive ? 'bg-[#E1306C] text-white scale-110' : 'bg-[#0a0a0a] text-white hover:scale-110 active:scale-95'}`}
        >
          <div className="relative z-10 flex items-center gap-4">
             {isConnecting ? (
               <Loader2 size={28} className="animate-spin text-white" />
             ) : (
               <Mic size={28} className={`${isActive ? 'animate-pulse' : 'text-[#E1306C]'}`} />
             )}
             <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700 whitespace-nowrap font-black text-[10px] tracking-[0.4em] uppercase">
                {isActive ? 'SYNC ACTIVE' : (isConnecting ? 'LINKING...' : 'INITIATE VOICE LINK')}
             </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        {/* Inline Error Toast */}
        {error && !isActive && (
          <div className="absolute bottom-full left-0 mb-6 w-80 animate-in slide-in-from-bottom-2 duration-300">
             <div className="bg-white/90 backdrop-blur-xl border border-red-100 p-6 rounded-[2rem] shadow-2xl space-y-4">
                <div className="flex items-center gap-3 text-red-500">
                   <AlertTriangle size={18} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Protocol Error</span>
                </div>
                <p className="text-xs font-bold text-gray-600 leading-relaxed italic">
                  {error === "API_KEY_ERROR" 
                    ? (language === 'EN' ? "Paid API Key required for advanced voice synthesis. Click below to select." : "මෙම පහසුකම සඳහා ගෙවන ලද API යතුරක් අවශ්‍ය වේ.") 
                    : error}
                </p>
                {error === "API_KEY_ERROR" ? (
                  <button 
                    onClick={handleKeySelection}
                    className="w-full py-3 bg-[#0a0a0a] text-white rounded-xl text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#E1306C] transition-colors"
                  >
                    <Key size={14} />
                    Select Project Key
                  </button>
                ) : (
                  <button onClick={() => setError(null)} className="text-[8px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0a0a0a] transition-colors underline decoration-dotted underline-offset-4">Dismiss Warning</button>
                )}
             </div>
          </div>
        )}
      </div>

      {isActive && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">
           <div className="absolute inset-0 pattern-overlay opacity-10 pointer-events-none"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,48,108,0.15)_0%,transparent_70%)] animate-pulse"></div>

           <button 
             onClick={stopSession}
             className="absolute top-12 right-12 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90 z-20"
           >
             <X size={32} />
           </button>

           <div className="relative z-10 w-full max-w-4xl text-center space-y-24">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.5em] mx-auto backdrop-blur-xl">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-ping shadow-[0_0_10px_#22c55e]"></div>
                   Lanka_Guide_Live_Protocol
                </div>
                <h2 className="text-5xl md:text-8xl font-heritage font-bold text-white tracking-tighter uppercase leading-[0.85]">
                  Voice <br/><span className="italic insta-text-gradient">Synthesis.</span>
                </h2>
              </div>

              <div className="relative h-64 flex items-center justify-center">
                 {[1,2,3].map(i => (
                   <div 
                     key={i}
                     className={`absolute rounded-full border-2 border-[#E1306C]/30 transition-all duration-700 ${status === 'speaking' ? 'animate-talking-ring' : status === 'listening' ? 'animate-listening-ring' : ''}`}
                     style={{ 
                       width: `${200 + i * 80}px`, 
                       height: `${200 + i * 80}px`,
                       animationDelay: `${i * 0.2}s`
                     }}
                   ></div>
                 ))}

                 <div className="relative w-32 h-32 story-ring p-[2px] rounded-full shadow-[0_0_80px_rgba(225,48,108,0.4)]">
                    <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center overflow-hidden">
                       {status === 'speaking' ? (
                         <Volume2 size={48} className="text-white animate-bounce-slow" />
                       ) : (
                         <Mic size={48} className="text-[#E1306C] animate-pulse" />
                       )}
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                       {[1,2,3].map(i => (
                         <div key={i} className={`w-1.5 h-1.5 rounded-full ${status === 'speaking' ? 'bg-[#E1306C] animate-bounce' : 'bg-white/20'}`} style={{ animationDelay: `${i * 0.1}s` }} />
                       ))}
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <p className="text-gray-400 font-medium text-xl italic max-w-lg mx-auto leading-relaxed">
                   {status === 'listening' 
                     ? (language === 'EN' ? "Speak freely. I am listening to your journey's needs." : "නිදහසේ කතා කරන්න. මම ඔබට සවන් දී සිටිමි.")
                     : (language === 'EN' ? "Transmitting travel intelligence..." : "සංචාරක තොරතුරු සම්ප්‍රේෂණය වේ...")}
                 </p>
                 <div className="flex items-center justify-center gap-6 pt-8">
                    <div className="flex items-center gap-3">
                       <Activity size={16} className="text-[#E1306C] animate-pulse" />
                       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">latency_optimized</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-3">
                       <ShieldCheck size={16} className="text-green-500/60" />
                       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">secure_uplink</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end pointer-events-none opacity-40">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                    <Cpu size={24} className="animate-spin-slow" />
                 </div>
                 <div className="text-left space-y-1">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Neural_Core_v2.5</p>
                    <p className="text-xs font-bold text-white/60 tracking-[0.3em]">SYNCHRONIZED</p>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                 <div className="h-1 w-48 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E1306C] animate-pulse" style={{ width: status === 'speaking' ? '80%' : '15%' }} />
                 </div>
                 <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Native_Audio_Stream_Active</p>
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes talking-ring {
          0% { transform: scale(1); opacity: 0.3; border-color: #E1306C; }
          50% { transform: scale(1.1); opacity: 0.6; border-color: #f09433; }
          100% { transform: scale(1); opacity: 0.3; border-color: #E1306C; }
        }
        @keyframes listening-ring {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        .animate-talking-ring { animation: talking-ring 1s ease-in-out infinite; }
        .animate-listening-ring { animation: listening-ring 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}} />
    </>
  );
};

export default LiveVoiceGuide;
