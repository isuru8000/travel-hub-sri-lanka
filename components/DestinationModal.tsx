
import React, { useState, useEffect, useRef } from 'react';
import { Destination, Language } from '../types.ts';
import { UI_STRINGS } from '../constants.tsx';
import { X, MapPin, Info, Clock, PlayCircle, Image as ImageIcon, Lightbulb, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

// Fix: Define YouTube IFrame API types on window object to resolve TypeScript errors
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

// Fix: Define the missing props interface for DestinationModal component
interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  language: Language;
}

const CustomVideoPlayer: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeId = `yt-player-${url.split('/').pop()}`;

  useEffect(() => {
    // Fix: Safely check for YT global from YouTube IFrame API
    // Load YouTube IFrame API if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let interval: number;

    const onPlayerReady = (event: any) => {
      setIsReady(true);
      playerRef.current = event.target;
      
      // Update progress every second
      interval = window.setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          if (duration > 0) {
            setProgress((currentTime / duration) * 100);
          }
        }
      }, 500);
    };

    const onPlayerStateChange = (event: any) => {
      // YT.PlayerState.PLAYING = 1, PAUSED = 2
      setIsPlaying(event.data === 1);
    };

    const createPlayer = () => {
      new window.YT.Player(iframeId, {
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // Fix: Accessing YT and onYouTubeIframeAPIReady via the extended Window interface to resolve TS errors
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [url]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setVolume(val);
    if (playerRef.current) {
      playerRef.current.setVolume(val);
      if (val > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      playerRef.current.setVolume(volume || 50);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setProgress(seekTo);
    if (playerRef.current) {
      const duration = playerRef.current.getDuration();
      playerRef.current.seekTo((seekTo / 100) * duration, true);
    }
  };

  return (
    <div ref={containerRef} className="group relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black">
      {/* Actual IFrame */}
      <iframe
        id={iframeId}
        src={`${url}?enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
        title={title}
        className="absolute inset-0 w-full h-full pointer-events-none"
        allow="autoplay; encrypted-media"
      ></iframe>

      {/* Custom Controls Overlay */}
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        {/* Play Overlay Button */}
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 story-ring p-1 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
              <Play size={32} className="text-[#E1306C] fill-[#E1306C] ml-1" />
            </div>
          </button>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent space-y-4">
          {/* Progress Bar */}
          <div className="relative h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer">
            <input 
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full opacity-0 z-10 cursor-pointer"
            />
            <div 
              className="absolute top-0 left-0 h-full insta-gradient"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-[#E1306C] transition-colors">
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
              
              <div className="flex items-center gap-2 group/volume">
                <button onClick={toggleMute} className="text-white hover:text-[#E1306C] transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-0 group-hover/volume:w-20 transition-all duration-300 accent-white h-1 cursor-pointer"
                />
              </div>
            </div>

            <button className="text-white/60 hover:text-white transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose, language }) => {
  if (!destination) return null;

  const getWeatherTip = (timeRange: string, lang: Language) => {
    const range = timeRange.toLowerCase();
    if (range.includes('december') || range.includes('april') || range.includes('january')) {
      return lang === 'EN' 
        ? "Expect bright sunny days, dry weather, and calm turquoise seas. Ideal for sightseeing and vibrant photography." 
        : "දීප්තිමත් හිරු රශ්මිය, වියළි කාලගුණය සහ සන්සුන් නිල් පැහැති මුහුදක් අපේක්ෂා කරන්න. සංචාරයට සහ ඡායාරූපකරණයට ඉතා සුදුසුයි.";
    }
    if (range.includes('may') || range.includes('september') || range.includes('october')) {
      return lang === 'EN' 
        ? "A warm tropical climate with occasional refreshing monsoon showers. Perfect for witnessing lush, emerald green landscapes." 
        : "උණුසුම් නිවර්තන කාලගුණය සමඟ විටින් විට මෝසම් වැසි ඇති විය හැක. හරිත පැහැයෙන් පිරි පරිසරය නැරඹීමට හොඳම කාලයයි.";
    }
    if (range.includes('pilgrimage') || range.includes('mountain')) {
      return lang === 'EN' 
        ? "Refreshing cooler temperatures at night with crisp, clear morning skies. Be prepared for occasional mist in the highlands." 
        : "රාත්‍රියේදී ප්‍රබෝධමත් සිසිල් කාලගුණය සහ උදෑසන පැහැදිලි අහසක් පවතී. කඳුකරයේ මීදුම සහිත තත්ත්වයන්ට සූදානම් වන්න.";
    }
    return lang === 'EN' 
      ? "Stable tropical weather with moderate humidity. Generally pleasant for long outdoor explorations and coastal walks." 
      : "ස්ථාවර නිවර්තන කාලගුණයක් සහ මධ්‍යස්ථ ආර්ද්‍රතාවයක් පවතී. එළිමහන් සංචාර සහ වෙරළ තීරයේ ඇවිදීමට සුදුසුයි.";
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header/Close */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all"
        >
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="relative h-64 md:h-96 shrink-0">
          <img 
            src={destination.image} 
            alt={destination.name[language]} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 space-y-2">
            <div className="flex items-center gap-2 text-[#E1306C] font-bold text-xs uppercase tracking-widest">
              <MapPin size={16} />
              {destination.location}
            </div>
            <h2 className="text-3xl md:text-5xl font-heritage font-bold text-white">
              {destination.name[language]}
            </h2>
            <p className="text-white/80 italic font-heritage text-lg md:text-xl">
              {destination.shortStory[language]}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-12">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-[0.2em] text-sm">
                <Info size={18} className="text-[#E1306C]" />
                {UI_STRINGS.historyLabel[language]}
              </h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                {destination.history[language]}
              </p>
              
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Best Time Block with Tooltip */}
                <div className="relative group bg-[#fafafa] p-6 rounded-3xl border border-gray-100 flex items-center gap-4 cursor-help transition-colors hover:bg-white hover:shadow-lg">
                  <Clock size={24} className="text-[#E1306C]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{UI_STRINGS.bestTimeLabel[language]}</p>
                    <p className="font-bold text-[#262626]">{destination.bestTime[language]}</p>
                  </div>
                  
                  {/* Custom Styled Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-1 bg-gradient-to-br from-[#f09433] to-[#bc1888] rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-[14px] p-4 text-left">
                      <p className="text-[10px] font-bold insta-text-gradient uppercase tracking-widest mb-2 border-b border-gray-100 pb-1">
                        {language === 'EN' ? 'Weather Forecast' : 'කාලගුණ අනාවැකිය'}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed italic font-medium">
                        {getWeatherTip(destination.bestTime.EN, language)}
                      </p>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#bc1888] rotate-45 -mt-1.5 shadow-lg"></div>
                  </div>
                </div>

                <div className="bg-[#fafafa] p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <MapPin size={24} className="text-[#E1306C]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Region</p>
                    <p className="font-bold text-[#262626]">{destination.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Tips */}
            <div className="space-y-6">
              <div className="bg-[#E1306C]/5 p-8 rounded-[35px] border border-[#E1306C]/10 space-y-6">
                <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-wider text-sm">
                  <Lightbulb size={18} />
                  {UI_STRINGS.tipsLabel[language]}
                </h4>
                <ul className="space-y-4">
                  {destination.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 italic">
                      <span className="text-[#E1306C] font-bold mt-1">✦</span>
                      {tip[language]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Multimedia Section */}
          <div className="space-y-8 pt-8 border-t border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                    <ImageIcon size={16} className="text-[#E1306C]" />
                    {language === 'EN' ? 'Photo Gallery' : 'ඡායාරූප ගැලරිය'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {destination.gallery.map((img, i) => (
                      <div key={i} className="story-ring p-[2px] rounded-2xl overflow-hidden group aspect-video">
                        <img 
                          src={img} 
                          alt={`${destination.name[language]} gallery ${i}`} 
                          className="w-full h-full object-cover rounded-[14px] transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {destination.videoUrl && (
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                      <PlayCircle size={16} className="text-[#E1306C]" />
                      {language === 'EN' ? 'Cinematic Experience' : 'සිනමා අත්දැකීම'}
                    </h4>
                    <CustomVideoPlayer url={destination.videoUrl} title={destination.name[language]} />
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;
