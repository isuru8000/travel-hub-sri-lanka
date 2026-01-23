import React, { useState, useRef, useEffect } from 'react';
import { Language, Memory, User } from '../types.ts';
import { 
  Camera, 
  MapPin, 
  Heart, 
  Share2, 
  Upload, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Star, 
  X,
  Wind,
  Image as ImageIcon,
  Quote,
  Trash2,
  Plus,
  Lock,
  AlertCircle,
  Wand2,
  Loader2
} from 'lucide-react';
import { refineTravelStory } from '../services/gemini.ts';

interface TravelMemoriesProps {
  language: Language;
  user: User | null;
  onLogin: () => void;
}

const INITIAL_MEMORIES: Memory[] = [
  {
    id: '1',
    userName: 'Elena R.',
    location: 'Sigiriya',
    title: 'Waking up the Jungle',
    story: 'The air was crisp and smelled of damp earth. Watching the first light hit the rock was a spiritual experience that transcended any map coordinates.',
    image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80',
    likes: 342,
    date: '2025-10-12',
    rating: 5,
    tags: ['first-light', 'ancient']
  },
  {
    id: '2',
    userName: 'Marco S.',
    location: 'Ella',
    title: 'Rainy Day Tea House',
    story: 'The sound of the rain on the tin roof mixed with the steam of the ginger tea. Nowhere else I would rather be.',
    image: 'https://images.unsplash.com/photo-1578519050142-afb511e518de?auto=format&fit=crop&w=800&q=80',
    likes: 189,
    date: '2025-11-05',
    rating: 4,
    tags: ['monsoon', 'tea-magic']
  },
  {
    id: '3',
    userName: 'Saito K.',
    location: 'Galle',
    title: 'Old Town Lullaby',
    story: 'Cobblestone streets echoing with the distant sound of the Indian Ocean. The history here isnt in the books, it is in the breeze.',
    image: 'https://images.unsplash.com/photo-1654561773591-57b9413c45c0?auto=format&fit=crop&w=800&q=80',
    likes: 256,
    date: '2025-11-20',
    rating: 5,
    tags: ['heritage', 'midnight']
  },
  {
    id: '4',
    userName: 'Anita B.',
    location: 'Yala',
    title: 'Eyes in the Bush',
    story: 'We stopped the engine. Total silence. Then, a branch snapped. That heartbeat moment is why we travel.',
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80',
    likes: 512,
    date: '2025-12-02',
    rating: 5,
    tags: ['nature', 'raw']
  },
  {
    id: '5',
    userName: 'Jin L.',
    location: 'Kandy',
    title: 'Rhythm and Spice',
    story: 'The market was a sensory overload in the best possible way. The colors, the shouting, the smell of roasted curry powder.',
    image: 'https://images.unsplash.com/photo-1616070152767-3eb99cf10509?auto=format&fit=crop&w=800&q=80',
    likes: 124,
    date: '2025-12-15',
    rating: 4,
    tags: ['local', 'spice']
  }
];

const TravelMemories: React.FC<TravelMemoriesProps> = ({ language, user, onLogin }) => {
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  
  const [newMemory, setNewMemory] = useState<Partial<Memory>>({
    title: '',
    location: '',
    story: '',
    rating: 5,
    tags: [],
    image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80'
  });

  const handleRefine = async () => {
    if (!newMemory.story || isRefining) return;
    setIsRefining(true);
    const refined = await refineTravelStory(newMemory.story, language);
    setNewMemory(prev => ({ ...prev, story: refined }));
    setIsRefining(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onLogin();
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const memory: Memory = {
        id: Date.now().toString(),
        userName: user.name,
        location: newMemory.location || 'Unknown',
        title: newMemory.title || 'Untitled Memory',
        story: newMemory.story || '',
        image: newMemory.image || 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80',
        likes: 0,
        date: new Date().toISOString().split('T')[0],
        rating: newMemory.rating || 5,
        tags: newMemory.tags || []
      };

      setMemories([memory, ...memories]);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setShowForm(false);
        setNewMemory({
          title: '',
          location: '',
          story: '',
          rating: 5,
          tags: [],
          image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80'
        });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent" />
        <div className="relative text-center space-y-6 px-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.5em] mb-4">
             <Sparkles size={16} className="text-[#E1306C]" />
             Public Archives
          </div>
          <h2 className="text-5xl md:text-8xl font-heritage font-bold text-white tracking-tighter uppercase leading-[0.85]">
            Travel <br/><span className="italic insta-text-gradient">Memories.</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-2xl font-light italic leading-relaxed">
            {language === 'EN' 
              ? "A collection of footprints left by wanderers in the sands of time." 
              : "කාලයේ වැලි තලාවේ සංචාරකයින් විසින් තබන ලද පා සලකුණු එකතුවකි."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
           <div className="space-y-2 text-center md:text-left">
              <h3 className="text-3xl font-heritage font-bold text-[#262626]">
                {language === 'EN' ? 'Share Your Journey' : 'ඔබේ සංචාරය බෙදාගන්න'}
              </h3>
              <p className="text-gray-400 text-sm font-medium italic">Join our archival registry of Sri Lankan adventures.</p>
           </div>
           <button 
             onClick={() => user ? setShowForm(true) : onLogin()}
             className="px-10 py-5 bg-[#0a0a0a] text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-110 active:scale-95 transition-all shadow-2xl"
           >
             {user ? (
               <>
                 <Plus size={18} />
                 Initialize Upload
               </>
             ) : (
               <>
                 <Lock size={18} />
                 Login to Access
               </>
             )}
           </button>
        </div>

        {showForm && (
          <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
            {isSuccess && (
              <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col items-center justify-center text-center p-12 space-y-12 animate-in fade-in duration-700">
                <div className="relative">
                   <div className="w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(34,197,94,0.4)] animate-bounce">
                      <CheckCircle2 size={64} />
                   </div>
                   <div className="absolute -inset-6 border-2 border-dashed border-green-500/20 rounded-full animate-spin-slow" />
                </div>
                <div className="space-y-6">
                  <h4 className="text-3xl font-heritage font-bold text-[#0a0a0a]">Memory Archived</h4>
                  <p className="text-gray-400 font-medium italic">Synchronization with public registry complete.</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-12">
               <h4 className="text-3xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">New Registry Entry</h4>
               <button onClick={() => setShowForm(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination Name</label>
                    <input 
                      required
                      type="text" 
                      value={newMemory.location}
                      onChange={(e) => setNewMemory(prev => ({...prev, location: e.target.value}))}
                      placeholder="e.g. Sigiriya Rock"
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 focus:border-[#E1306C]/30 transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Archive Title</label>
                    <input 
                      required
                      type="text" 
                      value={newMemory.title}
                      onChange={(e) => setNewMemory(prev => ({...prev, title: e.target.value}))}
                      placeholder="A short poetic title..."
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 focus:border-[#E1306C]/30 transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">The Narrative</label>
                      <button 
                        type="button"
                        onClick={handleRefine}
                        disabled={!newMemory.story || isRefining}
                        className="flex items-center gap-2 text-[9px] font-black text-[#E1306C] uppercase tracking-widest bg-[#E1306C]/5 px-4 py-1.5 rounded-full hover:bg-[#E1306C]/10 transition-all disabled:opacity-30"
                      >
                        {isRefining ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                        Refine with AI
                      </button>
                    </div>
                    <textarea 
                      required
                      rows={6}
                      value={newMemory.story}
                      onChange={(e) => setNewMemory(prev => ({...prev, story: e.target.value}))}
                      placeholder="Share your experience here..."
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 focus:border-[#E1306C]/30 transition-all font-medium italic"
                    />
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Visual Evidence (URL)</label>
                    <div className="relative group">
                      <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#E1306C] transition-colors" size={20} />
                      <input 
                        type="url" 
                        value={newMemory.image}
                        onChange={(e) => setNewMemory(prev => ({...prev, image: e.target.value}))}
                        placeholder="Image URL..."
                        className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#E1306C]/10 focus:border-[#E1306C]/30 transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Resonance Level</label>
                    <div className="flex gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                       {[1,2,3,4,5].map(star => (
                         <button 
                           key={star}
                           type="button"
                           onClick={() => setNewMemory(prev => ({...prev, rating: star as any}))}
                           className={`transition-all ${star <= (newMemory.rating || 0) ? 'text-yellow-400 scale-125' : 'text-gray-200 hover:text-yellow-200'}`}
                         >
                           <Star size={24} fill="currentColor" />
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="pt-10">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 bg-[#0a0a0a] text-white rounded-3xl font-black text-sm uppercase tracking-[0.5em] flex items-center justify-center gap-6 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 transition-all group"
                    >
                      {isSubmitting ? (
                        <Loader2 size={24} className="animate-spin" />
                      ) : (
                        <>
                          Commit to Archive
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
               </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {memories.map((memory) => (
            <div 
              key={memory.id}
              className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-4 hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] transition-all duration-700"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={memory.image} 
                  alt={memory.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4000ms]"
                />
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center gap-2">
                   <div className="flex gap-0.5">
                     {[1,2,3,4,5].map(s => (
                       <Star key={s} size={10} className={s <= memory.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} />
                     ))}
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full border-2 border-white shadow-xl overflow-hidden bg-gray-200">
                      <img src={`https://ui-avatars.com/api/?name=${memory.userName}&background=E1306C&color=fff`} className="w-full h-full object-cover" alt={memory.userName} />
                   </div>
                   <div className="text-white drop-shadow-lg">
                      <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{memory.userName}</p>
                      <p className="text-[8px] font-bold opacity-70 tracking-tight">{memory.date}</p>
                   </div>
                </div>
              </div>

              <div className="p-10 space-y-6 flex-grow flex flex-col">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#E1306C]">
                    <MapPin size={12} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{memory.location}</span>
                  </div>
                  <h3 className="text-2xl font-heritage font-bold text-[#0a0a0a] group-hover:insta-text-gradient transition-all uppercase tracking-tight">
                    {memory.title}
                  </h3>
                </div>

                <div className="relative">
                  <Quote size={24} className="text-[#E1306C]/10 absolute -top-4 -left-4" />
                  <p className="text-gray-500 leading-relaxed italic font-light line-clamp-4 relative z-10">
                    "{memory.story}"
                  </p>
                </div>

                <div className="pt-8 mt-auto border-t border-gray-50 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-[#E1306C] transition-colors">
                    <Heart size={18} />
                    <span className="text-xs font-black">{memory.likes}</span>
                  </button>
                  <button className="text-gray-200 hover:text-[#0a0a0a] transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelMemories;