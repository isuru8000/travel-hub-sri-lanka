
import React, { useState, useEffect, useRef } from 'react';
import { Destination, Language } from '../types.ts';
import { UI_STRINGS, DESTINATIONS } from '../constants.tsx';
import { X, MapPin, Info, Clock, PlayCircle, Image as ImageIcon, Lightbulb, Play, Pause, Volume2, VolumeX, Maximize, Sparkles, ArrowUpRight, Compass } from 'lucide-react';

// Define YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSelect?: (dest: Destination) => void;
  language: Language;
}

const CustomVideoPlayer: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [feedback, setFeedback] = useState<'play' | 'pause' | null>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const feedbackTimeout = useRef<number | null>(null);
  const iframeId = `yt-player-${url.split('/').pop()}`;

  useEffect(() => {
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

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (interval) clearInterval(interval);
      if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    };
  }, [url]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setFeedback('pause');
    } else {
      playerRef.current.playVideo();
      setFeedback('play');
    }

    feedbackTimeout.current = window.setTimeout(() => {
      setFeedback(null);
    }, 600);
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
      <iframe
        id={iframeId}
        src={`${url}?enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
        title={title}
        className="absolute inset-0 w-full h-full pointer-events-none"
        allow="autoplay; encrypted-media"
      ></iframe>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
        {feedback && (
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-out zoom-out-150 fade-out duration-500 fill-mode-forwards">
            {feedback === 'play' ? (
              <Play size={40} className="text-white fill-current ml-1" />
            ) : (
              <Pause size={40} className="text-white fill-current" />
            )}
          </div>
        )}
      </div>

      <div 
        className={`absolute inset-0 bg-black/20 transition-opacity duration-500 cursor-pointer ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        onClick={togglePlay}
      >
        {!isPlaying && !feedback && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 story-ring p-1.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300">
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
              <Play size={36} className="text-[#E1306C] fill-[#E1306C] ml-1.5" />
            </div>
          </div>
        )}

        <div 
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent space-y-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative group/progress h-2 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer transition-all hover:h-3">
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
              className="absolute top-0 left-0 h-full insta-gradient shadow-[0_0_15px_rgba(225,48,108,0.6)] transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <button 
                onClick={togglePlay} 
                className="text-white hover:text-[#E1306C] active:scale-90 transition-all transform duration-200"
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
              
              <div className="flex items-center gap-3 group/volume">
                <button onClick={toggleMute} className="text-white hover:text-[#E1306C] transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300 flex items-center">
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-[#E1306C] h-1.5 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button className="text-white/60 hover:text-white hover:rotate-12 transition-all">
              <Maximize size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose, onSelect, language }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [destination]);

  if (!destination) return null;

  const relatedDestinations = DESTINATIONS.filter(d => 
    d.id !== destination.id && 
    (d.category === destination.category || d.location === destination.location)
  ).slice(0, 3);

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
        className="absolute inset-0 bg-black/70 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div 
        ref={scrollContainerRef}
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl flex flex-col animate-in zoom-in-95 duration-400 no-scrollbar"
      >
        {/* Header/Close */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90 shadow-xl"
        >
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="relative h-64 md:h-[500px] shrink-0 overflow-hidden">
          <img 
            src={destination.image} 
            alt={destination.name[language]} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 space-y-4">
            <div className="flex items-center gap-2 text-[#E1306C] font-bold text-sm uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-white/20">
              <MapPin size={16} />
              {destination.location}
            </div>
            <h2 className="text-4xl md:text-6xl font-heritage font-bold text-white tracking-tight drop-shadow-2xl">
              {destination.name[language]}
            </h2>
            <p className="text-white/90 italic font-heritage text-xl md:text-2xl max-w-2xl">
              {destination.shortStory[language]}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-16 space-y-20 bg-[#fafafa]">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* History Section */}
              <div className="space-y-8 bg-white p-10 md:p-14 rounded-[4rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Compass size={120} className="rotate-12" />
                </div>
                <h3 className="flex items-center gap-3 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                  <Info size={18} className="text-[#E1306C]" />
                  {UI_STRINGS.historyLabel[language]}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light text-xl relative z-10">
                  {destination.history[language]}
                </p>
              </div>

              {/* Traveler's Wisdom Section */}
              <div className="space-y-10 bg-white p-10 md:p-14 rounded-[4rem] shadow-sm border border-gray-100">
                <h3 className="flex items-center gap-3 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                  <Lightbulb size={22} className="text-[#E1306C]" />
                  {UI_STRINGS.tipsLabel[language]}
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {destination.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-6 bg-[#fafafa] p-8 rounded-3xl border border-gray-100 hover:border-[#E1306C]/30 transition-all duration-300">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#E1306C] shadow-sm font-heritage font-bold text-xl shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-lg text-gray-700 italic leading-relaxed font-medium pt-1">
                        {tip[language]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative group bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center gap-6 cursor-help transition-all hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-14 h-14 bg-[#E1306C]/5 rounded-2xl flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-colors duration-500">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{UI_STRINGS.bestTimeLabel[language]}</p>
                    <p className="font-bold text-[#262626] text-xl">{destination.bestTime[language]}</p>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 w-80 p-1 bg-gradient-to-br from-[#f09433] to-[#bc1888] rounded-[2.5rem] shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20 translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white rounded-[2.3rem] p-8 text-left">
                      <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
                        <Sparkles size={18} className="text-[#E1306C]" />
                        <p className="text-[11px] font-bold insta-text-gradient uppercase tracking-widest">
                          {language === 'EN' ? 'Climatic Insights' : 'දේශගුණික අවබෝධය'}
                        </p>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed italic font-medium">
                        {getWeatherTip(destination.bestTime.EN, language)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center gap-6 transition-all hover:shadow-2xl hover:-translate-y-2 group">
                  <div className="w-14 h-14 bg-[#E1306C]/5 rounded-2xl flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-colors duration-500">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Regional Map</p>
                    <p className="font-bold text-[#262626] text-xl">{destination.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="sticky top-8 space-y-8">
                <div className="p-12 rounded-[4rem] story-ring text-white space-y-6 shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 pattern-overlay opacity-20 group-hover:opacity-30 transition-opacity"></div>
                   <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-2">
                     <Sparkles size={24} className="text-white" />
                   </div>
                   <h4 className="font-heritage font-bold text-3xl relative z-10">Respect the Soul</h4>
                   <p className="text-base text-white/95 leading-relaxed italic font-light relative z-10">
                     {language === 'EN' 
                      ? "Many of our sites are sacred. Please dress modestly and observe local customs to preserve the sanctity of these ancient places." 
                      : "අපගේ බොහෝ ස්ථාන පූජනීය වේ. මෙම පැරණි ස්ථානවල ගෞරවය සුරැකීමට කරුණාකර උචිත ඇඳුමින් සැරසී දේශීය සිරිත් විරිත් අනුගමනය කරන්න."}
                   </p>
                   <div className="pt-4 relative z-10 flex items-center gap-4">
                      <div className="w-16 h-1 bg-white/40 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multimedia Section */}
          <div className="space-y-16 pt-16 border-t border-gray-200">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <h4 className="flex items-center gap-3 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                      <ImageIcon size={20} className="text-[#E1306C]" />
                      {language === 'EN' ? 'Gallery View' : 'ගැලරිය'}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{destination.gallery.length} High-Res Frames</span>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {destination.gallery.map((img, i) => (
                      <div key={i} className="story-ring p-[3px] rounded-[2.5rem] overflow-hidden group aspect-[4/3] shadow-xl hover:scale-105 transition-all duration-500">
                        <img 
                          src={img} 
                          alt={`${destination.name[language]} gallery ${i}`} 
                          className="w-full h-full object-cover rounded-[2.3rem] transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {destination.videoUrl && (
                  <div className="space-y-8">
                    <h4 className="flex items-center gap-3 font-bold text-[#262626] uppercase tracking-[0.2em] text-xs">
                      <PlayCircle size={20} className="text-[#E1306C]" />
                      {language === 'EN' ? 'Cinematic Story' : 'සිනමාමය කතාව'}
                    </h4>
                    <CustomVideoPlayer url={destination.videoUrl} title={destination.name[language]} />
                  </div>
                )}
             </div>
          </div>

          {/* Enhanced You Might Also Like Section */}
          {relatedDestinations.length > 0 && (
            <div className="pt-24 border-t border-gray-200 space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-3 font-bold text-[#262626] uppercase tracking-[0.3em] text-xs">
                    <Compass size={20} className="text-[#E1306C]" />
                    {language === 'EN' ? 'Continue Your Journey' : 'ඔබේ සංචාරය තවදුරටත්'}
                  </h4>
                  <h3 className="text-3xl font-heritage font-bold text-[#262626]">
                    {language === 'EN' ? 'You Might Also Like' : 'ඔබ කැමති විය හැකි තවත් ස්ථාන'}
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {relatedDestinations.map((related) => (
                  <div 
                    key={related.id}
                    onClick={() => onSelect?.(related)}
                    className="group relative h-[320px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                  >
                    <img 
                      src={related.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={related.name[language]} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500" />
                    
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>

                    <div className="absolute top-6 left-6">
                      <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest">
                        {related.category}
                      </div>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[10px] font-bold text-[#E1306C] uppercase tracking-[0.3em] drop-shadow-md">
                        {related.location}
                      </p>
                      <p className="text-white font-heritage font-bold text-2xl leading-tight group-hover:insta-text-gradient group-hover:text-white transition-colors duration-500">
                        {related.name[language]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;
