
import React from 'react';
import { Language, HeritageMusic as HeritageMusicType } from '../types.ts';
import { HERITAGE_MUSIC_DATA } from '../constants.tsx';
import { Music as MusicIcon, History, MapPin, Star, Quote, Mic2 } from 'lucide-react';

interface HeritageMusicProps {
  language: Language;
}

// Fixed: Moved MusicCard outside of HeritageMusic to avoid recreation on every render
// and properly typed it as a React.FC to handle React-specific props like 'key'.
const MusicCard: React.FC<{ music: HeritageMusicType; language: Language }> = ({ music, language }) => (
  <div 
    className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group hover:-translate-y-4 transition-all duration-500"
  >
    <div className="relative h-72 overflow-hidden">
      <img 
        src={music.image} 
        alt={music.name[language]} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
        {music.type === 'instrument' ? <MapPin size={12} className="text-[#E1306C]" /> : <Mic2 size={12} className="text-[#E1306C]" />}
        <span className="text-[10px] font-bold text-[#262626] uppercase tracking-widest">{music.origin[language]}</span>
      </div>
    </div>

    <div className="p-10 flex-grow space-y-6 flex flex-col">
      <div className="space-y-1">
        <h3 className="text-3xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all">
          {music.name[language]}
        </h3>
        <div className="flex items-center gap-2 text-[11px] font-bold text-[#E1306C] uppercase tracking-[0.2em]">
          <Star size={14} fill="currentColor" />
          {music.type === 'instrument' 
            ? (language === 'EN' ? "Traditional Instrument" : "පාරම්පරික සංගීත භාණ්ඩය")
            : (language === 'EN' ? "Ancient Folk Song" : "පැරණි ජන ගීතය")}
        </div>
      </div>

      <p className="text-base text-gray-500 leading-relaxed font-light">
        {music.description[language]}
      </p>

      {music.sampleLyrics && (
        <div className="bg-[#fff9e6] p-6 rounded-[2rem] border border-[#fceabb] relative">
          <Quote size={20} className="text-[#f09433] opacity-20 absolute top-4 right-4" />
          <p className="text-[10px] font-bold uppercase text-[#f09433] tracking-[0.2em] mb-3">
            {language === 'EN' ? 'Lyrics Snippet' : 'කවි පදය'}
          </p>
          <p className="text-sm text-gray-700 italic whitespace-pre-line leading-relaxed font-medium">
            {music.sampleLyrics[language]}
          </p>
        </div>
      )}

      <div className="pt-6 border-t border-gray-100 mt-auto space-y-4">
        <div className="flex items-start gap-4 bg-[#fafafa] p-4 rounded-2xl border border-gray-100">
          <History size={18} className="text-[#E1306C] mt-1 shrink-0" />
          <div>
            <span className="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">
              {language === 'EN' ? 'Significance' : 'වැදගත්කම'}
            </span>
            <p className="text-sm text-[#262626] italic leading-tight">
              {music.significance[language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HeritageMusic: React.FC<HeritageMusicProps> = ({ language }) => {
  const instruments = HERITAGE_MUSIC_DATA.filter(m => m.type === 'instrument');
  const songs = HERITAGE_MUSIC_DATA.filter(m => m.type === 'song');

  return (
    <section className="min-h-screen bg-[#fafafa] pb-32">
      {/* Music Header */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-60 transition-transform duration-10000 hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253361-b83f85df0f5c?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 insta-gradient opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative text-center space-y-4 px-4">
          <div className="w-20 h-20 story-ring rounded-full mx-auto p-1 mb-6 animate-pulse">
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
              <MusicIcon size={32} className="text-[#E1306C]" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-heritage font-bold text-white drop-shadow-2xl">
            {language === 'EN' ? "Rhythms of Lanka" : "ලංකා රිද්මය"}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-lg italic">
            {language === 'EN' 
              ? "Exploring the heartbeat of an ancient nation through its traditional drums and folk melodies." 
              : "අපගේ දේශයේ හදගැස්ම පාරම්පරික බෙර වාදනය සහ ජන ගී රිද්මයන් ඔස්සේ ගවේෂණය කරන්න."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 space-y-32">
        {/* Instruments Section */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <h3 className="text-3xl font-heritage font-bold text-[#262626] bg-white px-8 py-3 rounded-full shadow-lg border border-gray-100">
              {language === 'EN' ? "The Sacred Instruments" : "පූජනීය සංගීත භාණ්ඩ"}
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {instruments.map((music) => (
              <MusicCard key={music.id} music={music} language={language} />
            ))}
          </div>
        </div>

        {/* Songs Section */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <h3 className="text-3xl font-heritage font-bold text-[#262626] bg-white px-8 py-3 rounded-full shadow-lg border border-gray-100">
              {language === 'EN' ? "Ancient Folk Songs (Jana Kavi)" : "පැරණි ජන ගීත (ජන කවි)"}
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {songs.map((music) => (
              <MusicCard key={music.id} music={music} language={language} />
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto mt-48 px-6 text-center space-y-8">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#E1306C] to-transparent mx-auto" />
        <p className="text-2xl md:text-3xl font-heritage font-medium text-gray-600 italic">
          {language === 'EN' 
            ? "\"The songs of our ancestors are the echoes of their sweat, their faith, and their undying love for this soil.\""
            : "\"අපේ මුතුන් මිත්තන්ගේ ගීත යනු ඔවුන්ගේ දහඩිය, ඔවුන්ගේ ඇදහිල්ල සහ මේ පස කෙරෙහි ඔවුන් තුළ තිබූ නොමියෙන ආදරයේ හඬයි.\""}
        </p>
      </div>
    </section>
  );
};

export default HeritageMusic;
