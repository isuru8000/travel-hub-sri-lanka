
import React, { useState, useRef, useEffect } from 'react';
import { Language, Memory } from '../types.ts';
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
  AlertCircle
} from 'lucide-react';
import { User } from '../App.tsx';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    userName: user?.name || '',
    title: '',
    story: '',
    image: '',
    location: '',
    rating: 5,
    tags: ''
  });

  const [validation, setValidation] = useState({
    title: { error: '', touched: false },
    story: { error: '', touched: false }
  });

  // Validation rules
  const validate = (name: string, value: string) => {
    let error = '';
    if (name === 'title') {
      if (value.length < 5) error = language === 'EN' ? 'Title must be at least 5 characters' : 'මාතෘකාව අවම වශයෙන් අකුරු 5ක් විය යුතුය';
      if (value.length > 50) error = language === 'EN' ? 'Title is too long (max 50)' : 'මාතෘකාව වැඩි වැඩිය (උපරිම 50)';
    }
    if (name === 'story') {
      if (value.length < 20) error = language === 'EN' ? 'Story must be at least 20 characters' : 'කතාව අවම වශයෙන් අකුරු 20ක් විය යුතුය';
      if (value.length > 600) error = language === 'EN' ? 'Story is too long (max 600)' : 'කතාව වැඩි වැඩිය (උපරිම 600)';
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Only show real-time error if already touched or long enough to potentially trigger one
    const error = validate(name, value);
    setValidation(prev => ({
      ...prev,
      [name]: { ...prev[name as keyof typeof prev], error }
    }));
  };

  const handleBlur = (name: string) => {
    setValidation(prev => ({
      ...prev,
      [name as keyof typeof prev]: { ...prev[name as keyof typeof prev], touched: true }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImageFromForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteMemory = (id: string) => {
    if (confirm(language === 'EN' ? "Are you sure you want to remove this memory from the mosaic?" : "මෙම මතකය ඉවත් කිරීමට ඔබට විශ්වාසද?")) {
      setMemories(prev => prev.filter(m => m.id !== id));
    }
  };

  const isFormValid = !validation.title.error && !validation.story.error && formData.title && formData.story && formData.location && formData.image;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isFormValid) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newMemory: Memory = {
        id: Date.now().toString(),
        userName: user.name,
        location: formData.location || 'Unknown',
        title: formData.title,
        story: formData.story,
        image: formData.image || 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80',
        likes: 0,
        date: new Date().toLocaleDateString(),
        rating: formData.rating,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
      };
      
      setMemories([newMemory, ...memories]);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setShowForm(false);
        setFormData({ userName: user.name, title: '', story: '', image: '', location: '', rating: 5, tags: '' });
        setValidation({
          title: { error: '', touched: false },
          story: { error: '', touched: false }
        });
      }, 1500);
    }, 1200);
  };

  return (
    <section className="min-h-screen bg-[#fafafa] pb-32">
      {/* Immersive Visual Header */}
      <div className="relative pt-32 pb-48 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 pattern-overlay opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#E1306C]/5 border border-[#E1306C]/10 text-[#E1306C] text-[11px] font-bold uppercase tracking-[0.5em] animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles size={14} className="animate-pulse" />
            {language === 'EN' ? 'Island Soul Captured' : 'දිවයිනේ ආත්මය'}
          </div>
          
          <h2 className="text-6xl md:text-9xl font-heritage font-bold text-[#262626] leading-[0.85] tracking-tight">
            The Living <br/>
            <span className="insta-text-gradient italic">Mosaic</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-xl md:text-2xl italic leading-relaxed">
            {language === 'EN' 
              ? "Share your story. Upload a piece of your journey and join our community of travelers." 
              : "ඔබේ කතාව බෙදාගන්න. ඔබේ සංචාරයේ මතකයක් එක් කර අපගේ සංචාරක ප්‍රජාව සමඟ එක්වන්න."}
          </p>

          <div className="pt-6">
            {user ? (
              <button 
                onClick={() => setShowForm(!showForm)}
                className="group relative px-16 py-6 bg-[#262626] text-white font-bold rounded-full hover:scale-105 transition-all shadow-2xl flex items-center gap-4 mx-auto overflow-hidden"
              >
                <div className="absolute inset-0 insta-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Camera size={22} className="relative z-10" />
                <span className="relative z-10 uppercase tracking-[0.2em] text-xs">Post a Moment</span>
              </button>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={onLogin}
                  className="group relative px-16 py-6 bg-white text-[#262626] border-2 border-gray-100 font-bold rounded-full hover:border-[#E1306C] hover:text-[#E1306C] transition-all shadow-xl flex items-center gap-4 mx-auto"
                >
                  <Lock size={20} className="text-gray-400 group-hover:text-[#E1306C]" />
                  <span className="uppercase tracking-[0.2em] text-xs">Sign in to Share</span>
                </button>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Only signed in explorers can contribute</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        
        {/* The Mosaic Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10 pb-40">
          {memories.map((m) => (
            <div 
              key={m.id}
              className="break-inside-avoid relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-gray-100 group transition-all duration-700 hover:shadow-[0_40px_120px_rgba(0,0,0,0.12)] hover:-translate-y-3 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img src={m.image} alt={m.title} className="w-full h-auto object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Rating Badge */}
                <div className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center gap-2">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold text-[#262626]">{m.rating}.0</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                  <div className="space-y-4">
                     <h3 className="text-3xl font-heritage font-bold text-white leading-tight">{m.title}</h3>
                     <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">
                        <MapPin size={14} className="text-[#E1306C]" />
                        {m.location}
                     </div>
                  </div>
                </div>
              </div>

              {/* Journal Details */}
              <div className="p-10 space-y-6 bg-white">
                <div className="space-y-4">
                  <Quote size={24} className="text-gray-100" />
                  <p className="text-base text-gray-500 italic font-light leading-relaxed border-l-2 border-gray-100 pl-6">
                    "{m.story}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl story-ring p-[2px] shadow-sm">
                      <div className="bg-white w-full h-full rounded-[9px] flex items-center justify-center font-bold text-[#262626] text-xs">
                        {m.userName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-[#262626] uppercase tracking-[0.2em]">Shared by {m.userName}</p>
                      <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{m.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 group/heart text-[#262626] hover:text-[#E1306C] transition-colors">
                      <Heart size={18} className="transition-all group-hover/heart:fill-[#E1306C]" />
                      <span className="text-xs font-bold">{m.likes}</span>
                    </button>
                    {user && m.userName === user.name && (
                      <button 
                        onClick={() => handleDeleteMemory(m.id)}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        title={language === 'EN' ? "Remove Memory" : "මතකය ඉවත් කරන්න"}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simplified Journal Submission Modal */}
      {showForm && user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-400 max-h-[90vh] overflow-y-auto no-scrollbar">
            <button onClick={() => setShowForm(false)} className="absolute top-10 right-10 p-3 hover:bg-gray-100 rounded-full text-gray-400 transition-all z-10">
              <X size={28} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Intro */}
              <div className="bg-[#262626] p-12 lg:p-20 text-white space-y-12 relative overflow-hidden">
                <div className="absolute inset-0 pattern-overlay opacity-10"></div>
                <div className="relative z-10 space-y-6">
                   <div className="w-16 h-1 bg-[#E1306C] rounded-full"></div>
                   <h3 className="text-4xl md:text-5xl font-heritage font-bold">Island <br/>Chronicles.</h3>
                   <p className="text-gray-400 text-lg font-light leading-relaxed italic">
                     Welcome, {user.name.split(' ')[0]}! Your story is a thread in the rich tapestry of Sri Lankan heritage.
                   </p>
                </div>

                <div className="relative z-10 space-y-8 pt-10">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E1306C]">
                         <ImageIcon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest">Visual Memories</h4>
                        <p className="text-xs text-gray-500">Directly upload a photo of your moment.</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E1306C]">
                         <Star size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest">Rate the Journey</h4>
                        <p className="text-xs text-gray-500">Let others know how it felt.</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Submission Form Content */}
              <div className="p-10 lg:p-20 space-y-10">
                {isSuccess ? (
                  <div className="py-20 text-center space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto text-green-500">
                      <CheckCircle2 size={56} />
                    </div>
                    <h4 className="text-3xl font-heritage font-bold text-[#262626]">Memory Shared.</h4>
                    <p className="text-gray-400 italic">Your journey is now part of the island mosaic.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">Logged in as</label>
                          <div className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                             <img src={user.photo} className="w-6 h-6 rounded-full" alt="" />
                             <span className="text-sm font-bold text-[#262626]">{user.name}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">Location</label>
                          <input required name="location" placeholder="E.g. Sigiriya" value={formData.location} onChange={handleInputChange} className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E1306C]/20" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">Memory Title</label>
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${formData.title.length > 50 ? 'text-red-500' : 'text-gray-300'}`}>{formData.title.length}/50</span>
                        </div>
                        <input 
                          required 
                          name="title"
                          placeholder="Something catchy..." 
                          value={formData.title} 
                          onChange={handleInputChange} 
                          onBlur={() => handleBlur('title')}
                          className={`w-full px-6 py-4 bg-[#fafafa] rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#E1306C]/20 ${validation.title.touched && validation.title.error ? 'border-red-300 bg-red-50/10' : 'border-gray-100'}`} 
                        />
                        {validation.title.touched && validation.title.error && (
                          <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest ml-2 animate-in slide-in-from-top-1 duration-300">
                             <AlertCircle size={12} />
                             {validation.title.error}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">The Story</label>
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${formData.story.length > 600 ? 'text-red-500' : 'text-gray-300'}`}>{formData.story.length}/600</span>
                        </div>
                        <textarea 
                          required 
                          name="story"
                          rows={4} 
                          placeholder="Tell us about your experience..." 
                          value={formData.story} 
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('story')}
                          className={`w-full px-6 py-4 bg-[#fafafa] rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#E1306C]/20 resize-none ${validation.story.touched && validation.story.error ? 'border-red-300 bg-red-50/10' : 'border-gray-100'}`} 
                        />
                        {validation.story.touched && validation.story.error && (
                          <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest ml-2 animate-in slide-in-from-top-1 duration-300">
                             <AlertCircle size={12} />
                             {validation.story.error}
                          </div>
                        )}
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
                          <div 
                            className={`h-full transition-all duration-300 ${formData.story.length < 20 ? 'bg-orange-400' : formData.story.length > 600 ? 'bg-red-500' : 'bg-green-500'}`} 
                            style={{ width: `${Math.min((formData.story.length / 600) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Explicit Image Upload Feature */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">Photo Memory (Direct Upload)</label>
                        <div className="relative group">
                          <div 
                            className={`w-full aspect-video rounded-[2.5rem] bg-[#fafafa] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${!formData.image ? 'hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5' : ''}`}
                          >
                            {formData.image ? (
                              <div className="relative w-full h-full animate-in fade-in zoom-in duration-500">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                  <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-4 bg-white text-[#262626] rounded-full hover:scale-110 transition-transform shadow-xl"
                                    title="Change Photo"
                                  >
                                    <Plus size={24} />
                                  </button>
                                  <button 
                                    type="button" 
                                    onClick={removeImageFromForm}
                                    className="p-4 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl"
                                    title="Remove Photo"
                                  >
                                    <Trash2 size={24} />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-4 py-8">
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-gray-300 group-hover:text-[#E1306C] transition-all group-hover:scale-110 group-hover:rotate-3">
                                  <Upload size={32} />
                                </div>
                                <div className="text-center space-y-1">
                                  <p className="text-xs font-bold text-[#262626] uppercase tracking-widest">No photo selected</p>
                                  <p className="text-[10px] text-gray-400">Click the button below to browse</p>
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-8 py-3 bg-[#262626] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all shadow-lg active:scale-95"
                                >
                                  Select Photo
                                </button>
                              </div>
                            )}
                          </div>
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange}
                            className="hidden" 
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">Experience Rating</label>
                        <div className="flex items-center gap-4 px-8 py-5 bg-[#fafafa] rounded-2xl border border-gray-100">
                          {[1,2,3,4,5].map(star => (
                            <Star 
                              key={star} 
                              size={28} 
                              onClick={() => setFormData({...formData, rating: star})}
                              className={`cursor-pointer transition-all ${formData.rating >= star ? 'text-yellow-500 fill-yellow-500 scale-110 drop-shadow-md' : 'text-gray-200 hover:text-gray-300'}`} 
                            />
                          ))}
                          <span className="ml-auto text-xs font-bold text-gray-400 uppercase tracking-widest">{formData.rating}/5 Stars</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      disabled={isSubmitting || !isFormValid} 
                      type="submit" 
                      className="w-full py-6 bg-[#262626] text-white font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition-all hover:bg-black active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Send size={20} />}
                      <span className="uppercase tracking-[0.3em] text-xs">
                        {!isFormValid && !isSubmitting ? (language === 'EN' ? 'Complete Form' : 'කරුණාකර සම්පූර්ණ කරන්න') : (language === 'EN' ? 'Publish to Mosaic' : 'ප්‍රසිද්ධ කරන්න')}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aesthetic Footer Reflection */}
      <div className="max-w-4xl mx-auto mt-64 px-6 text-center space-y-12">
        <h4 className="text-5xl md:text-7xl font-heritage font-bold text-[#262626] leading-tight">
          Every Journey is a <br/>
          New <span className="insta-text-gradient italic">Story.</span>
        </h4>
        <div className="flex items-center justify-center gap-4 text-gray-300">
           <Wind size={20} className="animate-pulse" />
           <div className="w-20 h-px bg-gray-200"></div>
           <Sparkles size={20} />
           <div className="w-20 h-px bg-gray-200"></div>
           <Quote size={20} />
        </div>
      </div>
    </section>
  );
};

export default TravelMemories;
