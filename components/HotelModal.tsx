import React, { useEffect, useRef } from 'react';
import { Language } from '../types.ts';
import { 
  X, 
  Star, 
  MapPin, 
  Wifi, 
  Coffee, 
  Waves, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  User,
  Quote,
  Zap,
  Car,
  Wind,
  Calendar,
  UserPlus,
  Minus,
  Plus,
  AlertCircle,
  Radio,
  ChevronDown,
  Target,
  MessageSquare,
  CheckCircle2,
  Trophy
} from 'lucide-react';

interface Review {
  user: string;
  rating: number;
  comment: { EN: string; SI: string };
  date: string;
}

interface Amenity {
  icon: React.ReactNode;
  label: { EN: string; SI: string };
}

interface Hotel {
  id: string;
  name: { EN: string; SI: string };
  location: string;
  price: number;
  image: string;
  gallery: string[];
  tag: string;
  rating: number;
  description: { EN: string; SI: string };
  amenities: Amenity[];
  reviews: Review[];
}

interface BookingState {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  isProcessingPayment: boolean;
  isSuccess: boolean;
  error: string | null;
}

interface HotelModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  onBook: (hotelName: string) => void;
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  language: Language;
}

const HotelModal: React.FC<HotelModalProps> = ({ hotel, onClose, onBook, bookingState, setBookingState, language }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayDateStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (hotel && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 });
    }
  }, [hotel]);

  if (!hotel) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl" onClick={onClose} />
      
      <div 
        ref={scrollRef}
        className="relative bg-white w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[3.5rem] shadow-[0_60px_150px_rgba(0,0,0,0.5)] no-scrollbar animate-in zoom-in-95 duration-500 border border-white/10"
      >
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:rotate-90 shadow-2xl"
        >
          <X size={28} />
        </button>

        {/* Hero Banner Area */}
        <div className="relative h-[45vh] md:h-[65vh] shrink-0 overflow-hidden">
          <img src={hotel.image} className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110" alt={hotel.name[language]} />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-black/30 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="px-6 py-2 bg-black/80 backdrop-blur-md rounded-full text-white text-[10px] font-black tracking-[0.3em] uppercase border border-white/10">
                {hotel.tag}
              </div>
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: hotel.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" className="drop-shadow-lg" />)}
              </div>
            </div>
            <h2 className="text-4xl md:text-8xl font-heritage font-bold text-white tracking-tighter uppercase drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)] leading-[0.9]">
              {hotel.name[language]}
            </h2>
            <div className="flex items-center gap-3 text-white/90 font-black uppercase tracking-[0.5em] text-xs md:text-sm bg-white/5 backdrop-blur-xl w-fit px-6 py-2 rounded-full border border-white/20">
              <MapPin size={20} className="text-[#E1306C]" />
              {hotel.location}, Sri Lanka
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-20 bg-white">
          <div className="lg:col-span-7 space-y-24">
            
            {/* Description Archive */}
            <div className="space-y-10">
              <div className="flex items-center gap-4 text-[#E1306C]">
                <Sparkles size={24} className="animate-pulse" />
                <span className="text-[12px] font-black uppercase tracking-[0.6em]">Registry_Deep_Profile</span>
              </div>
              <p className="text-2xl md:text-4xl text-gray-500 font-light leading-[1.3] italic border-l-8 border-[#E1306C]/10 pl-12">
                "{hotel.description[language]}"
              </p>
            </div>

            {/* Spatial Archive (Gallery) */}
            <div className="space-y-12">
              <div className="flex justify-between items-end border-b border-gray-50 pb-8">
                <h3 className="text-3xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Spatial Archive</h3>
                <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">{hotel.gallery.length} Verified Nodes</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {hotel.gallery.map((img, i) => (
                  <div key={i} className="group relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 transition-transform duration-700 hover:-translate-y-2">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-12">
               <div className="flex justify-between items-end border-b border-gray-50 pb-8">
                  <h3 className="text-3xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Verified Amenities</h3>
                  <span className="text-[11px] font-black text-[#E1306C] uppercase tracking-widest">Protocol_Standard_Elite</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {hotel.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#E1306C] shadow-sm group-hover:rotate-6 transition-transform">
                          {amenity.icon}
                       </div>
                       <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">{amenity.label[language]}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* User Testimonials Section */}
            <div className="space-y-12 pb-12">
               <div className="flex justify-between items-end border-b border-gray-50 pb-8">
                  <h3 className="text-3xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Neural Testimonials</h3>
                  <div className="flex items-center gap-2">
                     <Trophy size={14} className="text-yellow-500" />
                     <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Global Feedback Loop</span>
                  </div>
               </div>
               <div className="space-y-8">
                  {hotel.reviews.map((review, i) => (
                    <div key={i} className="bg-[#fafafa] p-10 rounded-[3.5rem] border border-gray-100 space-y-6 relative group overflow-hidden transition-all hover:bg-white hover:shadow-2xl">
                       <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#0a0a0a] group-hover:opacity-10 transition-opacity">
                          <MessageSquare size={100} />
                       </div>
                       <div className="flex justify-between items-start relative z-10">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#E1306C] shadow-sm">
                                <User size={24} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-[#0a0a0a] uppercase tracking-widest">{review.user}</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                             </div>
                          </div>
                          <div className="flex gap-1 text-yellow-400">
                             {Array.from({ length: review.rating }).map((_, rIdx) => <Star key={rIdx} size={14} fill="currentColor" />)}
                          </div>
                       </div>
                       <div className="relative z-10">
                          <Quote size={24} className="text-[#E1306C]/10 absolute -top-2 -left-2" />
                          <p className="text-lg text-gray-500 font-light italic leading-relaxed pl-6">
                             {review.comment[language]}
                          </p>
                       </div>
                       <div className="flex items-center gap-3 pt-4 opacity-30">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-[8px] font-black uppercase tracking-widest">Identity_Verified_Node</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 space-y-10">
              <div className="bg-gray-50 p-10 md:p-14 rounded-[4rem] border border-gray-100 space-y-12 shadow-inner group/form relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.02] text-gray-400 rotate-45 pointer-events-none"><Target size={200} /></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3 text-gray-400">
                     <Radio size={16} className="text-[#E1306C] animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em]">Sync_Protocol_V6</span>
                  </div>
                  <h4 className="text-3xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Stay Configuration</h4>
                  <div className="w-16 h-1.5 insta-gradient rounded-full shadow-lg" />
                </div>

                <div className="space-y-10 relative z-10">
                   <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-4 group/field">
                        <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4 transition-colors group-focus-within/field:text-[#E1306C]">
                           <Calendar size={16} /> Arrival Node
                        </label>
                        <div className="relative">
                          <input 
                            type="date"
                            min={todayDateStr}
                            value={bookingState.checkIn}
                            onChange={(e) => setBookingState(prev => ({...prev, checkIn: e.target.value, error: null}))}
                            className="w-full px-8 py-6 bg-white border-2 border-transparent rounded-[2.5rem] focus:outline-none focus:border-[#E1306C]/20 transition-all font-bold text-base shadow-sm"
                          />
                          <ChevronDown size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-4 group/field">
                        <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4 transition-colors group-focus-within/field:text-[#E1306C]">
                           <Calendar size={16} /> Departure Node
                        </label>
                        <div className="relative">
                          <input 
                            type="date"
                            min={bookingState.checkIn || todayDateStr}
                            value={bookingState.checkOut}
                            onChange={(e) => setBookingState(prev => ({...prev, checkOut: e.target.value, error: null}))}
                            className="w-full px-8 py-6 bg-white border-2 border-transparent rounded-[2.5rem] focus:outline-none focus:border-[#E1306C]/20 transition-all font-bold text-base shadow-sm"
                          />
                          <ChevronDown size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-4 group/field">
                      <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4 transition-colors group-focus-within/field:text-[#E1306C]">
                         <UserPlus size={16} /> Manifest Size
                      </label>
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-[2.5rem] border-2 border-transparent shadow-sm">
                        <button 
                          onClick={() => setBookingState(prev => ({...prev, guests: Math.max(1, prev.guests - 1), error: null}))}
                          className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-lg transition-all active:scale-90"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="font-black text-xl text-[#0a0a0a] tabular-nums">{bookingState.guests}</span>
                        <button 
                          onClick={() => setBookingState(prev => ({...prev, guests: Math.min(10, prev.guests + 1), error: null}))}
                          className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-white hover:shadow-lg transition-all active:scale-90"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                   </div>

                   {bookingState.error && (
                     <div className="p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-start gap-5 text-red-600 animate-in slide-in-from-top-2">
                        <AlertCircle size={24} className="mt-0.5 shrink-0 animate-pulse" />
                        <div className="space-y-1">
                           <p className="text-[9px] font-black uppercase tracking-widest">Protocol_Abort</p>
                           <p className="text-xs font-bold italic leading-relaxed">{bookingState.error}</p>
                        </div>
                     </div>
                   )}
                </div>
              </div>

              <div className="bg-[#0a0a0a] p-12 rounded-[5rem] text-white space-y-10 shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative z-10 space-y-10">
                  <div className="space-y-2">
                    <p className="text-[11px] font-black text-[#E1306C] uppercase tracking-[0.6em]">Settlement_Rate</p>
                    <div className="flex items-end gap-3">
                       <p className="text-7xl font-heritage font-bold leading-none tracking-tighter">${hotel.price}</p>
                       <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-2">/ Cycle</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onBook(hotel.name.EN)}
                    disabled={bookingState.isProcessingPayment}
                    className="w-full py-8 bg-white text-[#0a0a0a] rounded-[2.5rem] font-black text-sm uppercase tracking-[0.6em] flex items-center justify-center gap-6 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                  >
                    Authorize Node
                    <ArrowRight size={22} className="animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelModal;