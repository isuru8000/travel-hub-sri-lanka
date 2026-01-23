import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Language } from '../types.ts';
import { 
  Gem, 
  Zap, 
  Crown, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Star,
  Coffee,
  BedDouble,
  Waves,
  Sparkles,
  Calendar,
  Users,
  Loader2,
  CheckCircle2,
  Lock,
  CreditCard,
  ChevronRight,
  ShieldAlert,
  Info,
  Utensils,
  Wind,
  Car,
  Minus,
  Plus,
  ChevronDown,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  CircleX,
  Target,
  ChevronUp,
  Radio,
  FastForward,
  Plane,
  ShieldHalf,
  Bot,
  Hammer,
  Download,
  Printer,
  ExternalLink,
  QrCode
} from 'lucide-react';
import HotelModal from './HotelModal.tsx';

declare global {
  interface Window {
    paypal: any;
  }
}

interface MarketplaceProps {
  language: Language;
}

const PREMIUM_PACKAGES = [
  {
    id: 'p1',
    title: { EN: 'Ancient Majesty Tour', SI: 'පුරාණ රාජකීය සංචාරය' },
    price: 1299,
    duration: '7 Days',
    type: 'ALL-INCLUSIVE',
    image: 'https://plus.unsplash.com/premium_photo-1661954483883-edd65eac3577?q=80&w=1170&auto=format&fit=crop',
    features: { EN: ['Private Chauffeur', '5-Star Heritage Stays', 'VIP Temple Access'], SI: ['පෞද්ගලික රියදුරු', 'තරු 5 හෝටල්', 'විශේෂ දළදා වන්දනා'] }
  },
  {
    id: 'p2',
    title: { EN: 'Highland Tea Retreat', SI: 'කඳුකර තේ අත්දැකීම' },
    price: 850,
    duration: '4 Days',
    type: 'WELLNESS',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    features: { EN: ['Tea Factory Stay', 'Ayurvedic Spa', 'Scenic Train VIP'], SI: ['තේ වතු හෝටල්', 'ආයුර්වේද ප්‍රතිකාර', 'දුම්රිය විශේෂ පහසුකම්'] }
  }
];

const LUXURY_HOTELS = [
  {
    id: 'h1',
    name: { EN: 'Cinnamon Grand Colombo', SI: 'සිනමන් ග්‍රෑන්ඩ් කොළඹ' },
    location: 'Colombo',
    price: 180,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    tag: 'ULTRA-PREMIUM',
    rating: 5,
    description: {
      EN: "The benchmark of luxury in the capital. Cinnamon Grand offers an unparalleled urban sanctuary with world-class dining and colonial elegance.",
      SI: "අගනුවර සුඛෝපභෝගීත්වයේ සලකුණ. සිනමන් ග්‍රෑන්ඩ් ලෝක මට්ටමේ ආහාර සහ යටත් විජිත අලංකාරය සමඟ අසමසම නාගරික අත්දැකීමක් ලබා දෙයි."
    },
    amenities: [
      { icon: <Utensils size={18} />, label: { EN: "14 Award-winning Restaurants", SI: "සම්මානලාභී අවන්හල් 14" } },
      { icon: <Waves size={18} />, label: { EN: "Two Outdoor Pools", SI: "පිහිනුම් තටාක දෙකක්" } },
      { icon: <Wind size={18} />, label: { EN: "Angsana Spa", SI: "අංසනා ස්පා" } },
      { icon: <Car size={18} />, label: { EN: "VIP Chauffeur Service", SI: "විශේෂ රියදුරු සේවාව" } }
    ],
    reviews: [
      { user: "Sarah M.", rating: 5, date: "MAR 2026", comment: { EN: "The buffet is legendary. Best service in Colombo.", SI: "ආහාර වේල ඉතා විශිෂ්ටයි. කොළඹ හොඳම සේවාව." } },
      { user: "James K.", rating: 5, date: "FEB 2026", comment: { EN: "True 5-star experience in the heart of the city.", SI: "නගර මධ්‍යයේ සැබෑ තරු 5 අත්දැකීමක්." } }
    ]
  },
  {
    id: 'h2',
    name: { EN: 'Galadari Hotel Colombo', SI: 'ගලදාරී හෝටලය කොළඹ' },
    location: 'Colombo Fort',
    price: 120,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    tag: 'HERITAGE VIEW',
    rating: 4,
    description: {
      EN: "Strategically located overlooking the Indian Ocean and the Presidential Secretariat, Galadari offers classic comfort with the best views of Colombo's changing skyline.",
      SI: "ඉන්දියන් සාගරයට මුහුණලා කොළඹ කොටුවේ පිහිටි ගලදාරී හෝටලය, කොළඹ නගරයේ අලංකාර දර්ශන සමඟ සාම්ප්‍රදායික සුවපහසුව ලබා දෙයි."
    },
    amenities: [
      { icon: <Waves size={18} />, label: { EN: "Ocean-view Pool", SI: "සාගරයට මුහුණලා ඇති තටාකය" } },
      { icon: <Coffee size={18} />, label: { EN: "24h Coffee Shop", SI: "පැය 24 කෝපි ශාලාව" } },
      { icon: <ShieldCheck size={18} />, label: { EN: "Secure Fort Location", SI: "ආරක්ෂිත කොටුව ප්‍රදේශය" } },
      { icon: <Zap size={18} />, label: { EN: "Business Hub", SI: "ව්‍යාපාරික මධ්‍යස්ථානය" } }
    ],
    reviews: [
      { user: "Anita P.", rating: 4, date: "JAN 2026", comment: { EN: "The sunset views from the terrace are breathtaking.", SI: "හිරු බැස යන දසුන ඉතාමත් අලංකාරයි." } },
      { user: "David R.", rating: 4, date: "DEC 2025", comment: { EN: "Great location for exploring Colombo Fort.", SI: "කොළඹ කොටුව ගවේෂණය කිරීමට ඉතා සුදුසු ස්ථානයකි." } }
    ]
  }
];

const FUTURE_MODULES = [
  { id: 'f1', icon: <Plane size={24} />, title: { EN: 'Flight Deck Sync', SI: 'ගුවන් ගමන් සම්බන්ධතාවය' }, desc: { EN: 'Direct neural link with island aviation hubs.', SI: 'දේශීය ගුවන් සේවා සමඟ සෘජු සම්බන්ධතාවය.' } },
  { id: 'f2', icon: <ShieldHalf size={24} />, title: { EN: 'Global Insurance', SI: 'ගෝලීය රක්ෂණය' }, desc: { EN: 'Automated protection nodes for every journey.', SI: 'සෑම සංචාරයක් සඳහාම ස්වයංක්‍රීය ආරක්ෂාව.' } },
  { id: 'f3', icon: <Bot size={24} />, title: { EN: 'AI Trip Architect', SI: 'AI චාරිකා සැලසුම්කරු' }, desc: { EN: 'Predictive logistics for high-fidelity travel.', SI: 'ඔබේ සංචාරය සඳහා බුද්ධිමත් දත්ත විශ්ලේෂණය.' } }
];

const Marketplace: React.FC<MarketplaceProps> = ({ language }) => {
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  const [paymentProtocol, setPaymentProtocol] = useState<'stripe' | 'paypal' | 'bank'>('stripe');
  const [showBankInstructions, setShowBankInstructions] = useState(false);
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const todayDateStr = new Date().toISOString().split('T')[0];

  const [bookingState, setBookingState] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    isProcessingPayment: false,
    isSuccess: false,
    error: null as string | null
  });

  const filteredHotels = useMemo(() => {
    return LUXURY_HOTELS.filter(h => h.price <= maxPrice);
  }, [maxPrice]);

  const selectedItem = useMemo(() => {
    const hotel = LUXURY_HOTELS.find(h => bookingState.destination.includes(h.name.EN));
    if (hotel) return { ...hotel, priceType: 'nightly' };
    const pkg = PREMIUM_PACKAGES.find(p => p.title.EN === bookingState.destination);
    if (pkg) return { ...pkg, name: pkg.title, priceType: 'total' };
    return null;
  }, [bookingState.destination]);

  const bookingSummary = useMemo(() => {
    const base = selectedItem ? selectedItem.price : 0;
    const taxes = Math.round(base * 0.15);
    const total = base + taxes;
    return { base, taxes, total };
  }, [selectedItem]);

  useEffect(() => {
    if (paymentProtocol === 'paypal' && window.paypal && paypalButtonRef.current) {
      paypalButtonRef.current.innerHTML = "";
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: bookingSummary.total.toString() },
              description: `Booking for ${bookingState.destination}`
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then(() => handlePaymentSuccess('paypal'));
        },
        onError: () => {
          setBookingState(prev => ({ ...prev, error: "PayPal synchronization failed." }));
        }
      }).render(paypalButtonRef.current);
    }
  }, [paymentProtocol, bookingSummary.total, bookingState.destination]);

  const validateBooking = () => {
    const { destination, checkIn, checkOut, guests } = bookingState;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cin = new Date(checkIn);
    const cout = new Date(checkOut);

    if (!destination) return language === 'EN' ? "Select a Target Destination" : "ගමනාන්තය තෝරා නොමැත.";
    if (!checkIn || !checkOut) return language === 'EN' ? "Arrival/Departure Window Missing" : "කාල පරාසය වැරදියි.";
    if (cin < today) return language === 'EN' ? "Back-dating is not permitted" : "පැමිණීමේ දිනය අතීතයේ විය නොහැක.";
    if (cout <= cin) return language === 'EN' ? "Departure must follow arrival" : "පිටවීමේ දිනය පැමිණීමේ දිනයට පසුව විය යුතුය.";
    if (guests < 1) return language === 'EN' ? "Minimum 1 explorer required" : "අවම වශයෙන් එක් ගවේෂකයෙකු අවශ්‍ය වේ.";
    return null;
  };

  const handlePaymentSuccess = async (protocol: string) => {
    setBookingState(prev => ({ ...prev, isProcessingPayment: true }));
    try {
      // Formspree logging for backend tracking
      await fetch("https://formspree.io/f/xpwzprow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          protocol: protocol.toUpperCase(),
          destination: bookingState.destination,
          checkIn: bookingState.checkIn,
          checkOut: bookingState.checkOut,
          guests: bookingState.guests,
          total: `$${bookingSummary.total}`
        }),
      });
      setBookingState(prev => ({ ...prev, isSuccess: true, isProcessingPayment: false }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setBookingState(prev => ({ ...prev, error: "Registry logging failed.", isProcessingPayment: false }));
    }
  };

  const handleBookingTrigger = async (e?: React.FormEvent, customDest?: string) => {
    if (e) e.preventDefault();
    if (customDest) setBookingState(prev => ({ ...prev, destination: customDest, error: null }));

    const errorMsg = validateBooking();
    if (errorMsg) {
      setBookingState(prev => ({ ...prev, error: errorMsg }));
      return;
    }

    if (paymentProtocol === 'bank') {
      setShowBankInstructions(true);
      return;
    }

    if (paymentProtocol === 'stripe') {
      setBookingState(prev => ({ ...prev, isProcessingPayment: true, error: null }));
      await new Promise(resolve => setTimeout(resolve, 2500));
      handlePaymentSuccess('stripe');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Cinematic Overlays (Bank Instructions) */}
      {showBankInstructions && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-6 animate-in fade-in duration-500">
           <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md" onClick={() => setShowBankInstructions(false)} />
           <div className="relative bg-white rounded-[4rem] max-w-xl w-full p-12 md:p-16 space-y-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-gray-100">
              <div className="absolute inset-0 pattern-overlay opacity-[0.03] pointer-events-none" />
              <div className="flex justify-between items-start border-b border-gray-100 pb-8">
                 <div className="space-y-2">
                    <div className="flex items-center gap-3 text-green-600">
                       <Building2 size={20} />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em]">Direct_Bank_Sync</span>
                    </div>
                    <h3 className="text-3xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter">Transfer Details</h3>
                 </div>
                 <button onClick={() => setShowBankInstructions(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                    <CircleX size={24} className="text-gray-300" />
                 </button>
              </div>

              <div className="space-y-6">
                 <div className="p-8 bg-gray-50 rounded-[2.5rem] space-y-6 border border-gray-100 shadow-inner">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Bank Name</p>
                       <p className="text-lg font-bold text-[#0a0a0a]">Bank of Ceylon (BOC)</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Account Name</p>
                       <p className="text-lg font-bold text-[#0a0a0a]">Travel Hub Sri Lanka (Pvt) Ltd</p>
                    </div>
                    <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Account Number</p>
                          <p className="text-2xl font-mono font-bold text-[#0a0a0a]">1234 5678 90</p>
                       </div>
                       <button className="p-4 bg-white border border-gray-200 rounded-2xl text-[#E1306C] hover:shadow-lg transition-all active:scale-95 shadow-sm">
                          <ClipboardCheck size={20} />
                       </button>
                    </div>
                 </div>
                 <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"><Info size={20} className="text-blue-600" /></div>
                    <p className="text-xs font-medium text-blue-800 leading-relaxed">
                      Reference your name in the transfer. Forward proof of deposit to <span className="font-bold underline">slisuruniroshan@gmail.com</span> to finalize the registry node.
                    </p>
                 </div>
              </div>
              <button 
                onClick={() => { setShowBankInstructions(false); handlePaymentSuccess('bank'); }}
                className="w-full py-7 bg-[#0a0a0a] text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.6em] hover:bg-[#E1306C] transition-all shadow-[0_20px_50px_rgba(225,48,108,0.2)] active:scale-95"
              >
                Commit Transfer Node
              </button>
           </div>
        </div>
      )}

      {/* --- ENHANCED SUCCESS / CONFIRMATION DASHBOARD --- */}
      {bookingState.isSuccess && (
        <div className="fixed inset-0 z-[300] bg-[#020202] text-white overflow-y-auto animate-in fade-in duration-700">
          {/* Animated Starfield Background */}
          <div className="fixed inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(225,48,108,0.15)_0%,transparent_70%)] animate-pulse" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center">
            
            {/* Header Success Status */}
            <div className="flex flex-col items-center text-center space-y-8 mb-20">
              <div className="relative">
                <div className="w-40 h-40 bg-green-500/10 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(34,197,94,0.3)] animate-in zoom-in duration-1000">
                   <div className="w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                      <CheckCircle2 size={72} strokeWidth={2.5} />
                   </div>
                </div>
                <div className="absolute -inset-4 border border-green-500/20 rounded-full animate-spin-slow pointer-events-none" />
              </div>
              
              <div className="space-y-4">
                 <div className="px-6 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-[10px] font-black uppercase tracking-[0.6em] mx-auto w-fit shadow-2xl">
                    Registry Synchronized Successfully
                 </div>
                 <h2 className="text-6xl md:text-8xl font-heritage font-bold tracking-tighter uppercase leading-none">
                    TRAVEL <span className="insta-text-gradient italic">COMMITTED.</span>
                 </h2>
                 <p className="text-gray-400 text-lg md:text-xl font-medium italic opacity-70">
                    "Your journey node has been encoded into the island's eternal archives."
                 </p>
              </div>
            </div>

            {/* Confirmation Details Card */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10">
               
               {/* Left: Summary Data */}
               <div className="md:col-span-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 md:p-16 space-y-12 shadow-2xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-8 border-b border-white/5 pb-12">
                     <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                           <img src={selectedItem?.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-[#E1306C] uppercase tracking-widest opacity-60">Target Node</p>
                           <h3 className="text-3xl font-heritage font-bold uppercase">{bookingState.destination}</h3>
                        </div>
                     </div>
                     <div className="text-left sm:text-right space-y-1">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest opacity-60">Registry Node ID</p>
                        <p className="text-xl font-mono font-bold tracking-tighter text-white">THSL-772-{Math.floor(Math.random()*10000)}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3 text-gray-500">
                           <Calendar size={14} />
                           <span className="text-[9px] font-black uppercase tracking-widest">Arrival</span>
                        </div>
                        <p className="text-xl font-bold">{new Date(bookingState.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-3 text-gray-500">
                           <Calendar size={14} />
                           <span className="text-[9px] font-black uppercase tracking-widest">Departure</span>
                        </div>
                        <p className="text-xl font-bold">{new Date(bookingState.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-3 text-gray-500">
                           <Users size={14} />
                           <span className="text-[9px] font-black uppercase tracking-widest">Voyagers</span>
                        </div>
                        <p className="text-xl font-bold">{bookingState.guests} Explorers</p>
                     </div>
                  </div>

                  <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-green-500 border border-white/10">
                           <ShieldCheck size={28} />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Security Protocol</p>
                           <p className="text-sm font-bold uppercase tracking-widest">FULLY_ENCRYPTED_SYNC</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all shadow-xl border border-white/10"><Printer size={20} /></button>
                        <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all shadow-xl border border-white/10"><Download size={20} /></button>
                     </div>
                  </div>
               </div>

               {/* Right: Settlement Pod */}
               <div className="md:col-span-4 space-y-8">
                  <div className="bg-[#E1306C] p-10 rounded-[4rem] text-white space-y-8 shadow-[0_40px_100px_rgba(225,48,108,0.3)]">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Settlement Total</p>
                        <p className="text-6xl font-heritage font-bold tracking-tighter">${bookingSummary.total}</p>
                     </div>
                     <div className="space-y-4 pt-6 border-t border-white/20">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                           <span>Base Rate</span>
                           <span>${bookingSummary.base}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                           <span>Archive Fees (15%)</span>
                           <span>${bookingSummary.taxes}</span>
                        </div>
                     </div>
                     <div className="pt-4 flex items-center gap-3">
                        <div className="px-3 py-1 bg-white/20 rounded-lg text-[8px] font-black uppercase tracking-widest">
                           Paid via {paymentProtocol.toUpperCase()}
                        </div>
                     </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 space-y-6 text-center">
                     <QrCode size={48} className="mx-auto text-white/20 mb-4" />
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed px-4">
                        Scanned at Colombo Hub for immediate priority access.
                     </p>
                  </div>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-20 flex flex-col md:flex-row items-center gap-8">
               <button 
                onClick={() => setBookingState(prev => ({ ...prev, isSuccess: false }))}
                className="group flex items-center gap-6 px-16 py-8 bg-white text-black rounded-full text-xs font-black uppercase tracking-[0.6em] hover:scale-105 active:scale-95 transition-all shadow-[0_30px_80px_rgba(255,255,255,0.2)]"
              >
                Return to Main Registry
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button 
                className="group flex items-center gap-4 text-gray-500 hover:text-[#E1306C] transition-all text-[11px] font-black uppercase tracking-[0.3em]"
              >
                Inquire via Lanka AI <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN PORTAL --- */}
      <div className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#E1306C 1px, transparent 1px), linear-gradient(90deg, #E1306C 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-white" />
        
        <div className="relative text-center space-y-10 px-6 max-w-5xl animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl text-white text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl">
             <Crown size={16} className="text-yellow-500 animate-pulse" />
             Premium Registry Access
          </div>
          <h2 className="text-6xl md:text-[10rem] font-heritage font-bold text-white tracking-tighter uppercase leading-[0.8] drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            BOOKING <br/><span className="italic insta-text-gradient">PORTAL.</span>
          </h2>
          <p className="text-white/40 text-lg md:text-2xl font-light italic leading-relaxed tracking-wide">
            "Seamless synchronization with the island's elite heritage stays and expeditions."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10 space-y-40">
        
        {/* --- BOOKING MANIFOLD - NOW FULLY ACTIVE --- */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#E1306C] via-purple-500 to-[#285AEB] rounded-[5rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className="relative bg-white/95 backdrop-blur-[60px] p-8 md:p-20 rounded-[5rem] shadow-[0_80px_180px_rgba(0,0,0,0.08)] border border-gray-50 space-y-20 overflow-hidden">
            <div className="absolute top-0 right-0 p-32 opacity-[0.02] pointer-events-none text-gray-400 rotate-12"><Target size={400} /></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-gray-50 pb-16">
              <div className="space-y-6">
                <div className="flex items-center gap-5 text-[#E1306C]">
                  <div className="w-14 h-14 rounded-2xl bg-[#E1306C]/5 flex items-center justify-center shadow-inner border border-[#E1306C]/10">
                    <ShieldCheck size={26} className="animate-pulse" />
                  </div>
                  <span className="text-[12px] font-black uppercase tracking-[0.6em]">Registry_Uplink_Channel</span>
                </div>
                <h3 className="text-4xl md:text-7xl font-heritage font-bold text-[#0a0a0a] tracking-tighter uppercase">
                   Sync <span className="italic insta-text-gradient">Configuration.</span>
                </h3>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 px-6 py-4 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                 <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Latency_Monitor</span>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    <span className="text-xs font-bold text-[#0a0a0a] tracking-tight">STABLE_CONNECT_99%</span>
                 </div>
              </div>
            </div>

            <form onSubmit={handleBookingTrigger} className="grid grid-cols-1 xl:grid-cols-6 gap-10 relative z-10">
              
              {/* Field 01: Destination */}
              <div className="xl:col-span-3 space-y-5">
                <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4">
                  <MapPin size={16} className="text-[#E1306C]" /> Primary Node
                </label>
                <div className="relative group/select">
                  <select 
                    required
                    value={bookingState.destination}
                    onChange={(e) => setBookingState(prev => ({...prev, destination: e.target.value}))}
                    className="w-full pl-10 pr-16 py-8 bg-gray-50 border-2 border-transparent rounded-[3rem] focus:bg-white focus:border-[#E1306C]/20 outline-none transition-all font-bold text-xl appearance-none cursor-pointer shadow-inner text-[#0a0a0a]"
                  >
                    <option value="">Choose Registry Archive...</option>
                    <optgroup label="Heritage Boutiques">
                      {LUXURY_HOTELS.map(h => <option key={h.id} value={h.name.EN}>{h.name[language]} — ${h.price}/nt</option>)}
                    </optgroup>
                    <optgroup label="Active Expeditions">
                      {PREMIUM_PACKAGES.map(p => <option key={p.id} value={p.title.EN}>{p.title[language]} — ${p.price}</option>)}
                    </optgroup>
                  </select>
                  <ChevronDown size={28} className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none group-hover/select:text-[#E1306C] transition-colors" />
                </div>
              </div>

              {/* Field 02: Dates */}
              <div className="xl:col-span-2 grid grid-cols-2 gap-8">
                <div className="space-y-5">
                  <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4">
                    <ChevronDown size={14} /> Arrival
                  </label>
                  <div className="relative group/date">
                    <input 
                      required
                      type="date"
                      min={todayDateStr}
                      value={bookingState.checkIn}
                      onChange={(e) => setBookingState(prev => ({...prev, checkIn: e.target.value}))}
                      className="w-full px-8 py-8 bg-gray-50 border-2 border-transparent rounded-[3rem] focus:bg-white focus:border-[#E1306C]/20 outline-none transition-all font-bold text-base shadow-inner text-[#0a0a0a]"
                    />
                    <Calendar size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-5">
                  <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4">
                    <ChevronUp size={14} /> Departure
                  </label>
                  <div className="relative group/date">
                    <input 
                      required
                      type="date"
                      min={bookingState.checkIn || todayDateStr}
                      value={bookingState.checkOut}
                      onChange={(e) => setBookingState(prev => ({...prev, checkOut: e.target.value}))}
                      className="w-full px-8 py-8 bg-gray-50 border-2 border-transparent rounded-[3rem] focus:bg-white focus:border-[#E1306C]/20 outline-none transition-all font-bold text-base shadow-inner text-[#0a0a0a]"
                    />
                    <Calendar size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Field 03: Guests */}
              <div className="xl:col-span-1 space-y-5">
                <label className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4">
                  <Users size={16} /> Manifest
                </label>
                <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-[3rem] border-2 border-transparent shadow-inner">
                  <button 
                    type="button" 
                    onClick={() => setBookingState(prev => ({...prev, guests: Math.max(1, prev.guests - 1)}))}
                    className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-lg transition-all active:scale-90"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-black text-2xl text-[#0a0a0a] tabular-nums">{bookingState.guests}</span>
                  <button 
                    type="button" 
                    onClick={() => setBookingState(prev => ({...prev, guests: Math.min(10, prev.guests + 1)}))}
                    className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-green-500 hover:shadow-lg transition-all active:scale-90"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="xl:col-span-6 space-y-12 pt-16 border-t border-gray-50">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <button 
                      type="button"
                      onClick={() => setPaymentProtocol('stripe')}
                      className={`flex flex-col items-center gap-6 p-10 rounded-[3.5rem] border-2 transition-all group relative overflow-hidden ${paymentProtocol === 'stripe' ? 'bg-[#0a0a0a] text-white border-transparent shadow-[0_40px_100px_rgba(0,0,0,0.25)] scale-[1.03]' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-white hover:border-[#E1306C]/20'}`}
                    >
                       <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/10 to-transparent opacity-0 group-hover:opacity-100" />
                       <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 ${paymentProtocol === 'stripe' ? 'bg-[#E1306C] text-white shadow-[0_0_30px_#E1306C]' : 'bg-white text-gray-300 group-hover:text-[#E1306C]'}`}>
                          <CreditCard size={36} />
                       </div>
                       <div className="text-center space-y-2 relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Payment_Core_01</p>
                          <p className="text-xl font-heritage font-bold">Credit/Debit Card</p>
                       </div>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setPaymentProtocol('paypal')}
                      className={`flex flex-col items-center gap-6 p-10 rounded-[3.5rem] border-2 transition-all group relative overflow-hidden ${paymentProtocol === 'paypal' ? 'bg-[#0a0a0a] text-white border-transparent shadow-[0_40px_100px_rgba(0,0,0,0.25)] scale-[1.03]' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-white hover:border-blue-500/20'}`}
                    >
                       <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100" />
                       <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 ${paymentProtocol === 'paypal' ? 'bg-blue-600 text-white shadow-[0_0_30px_#2563eb]' : 'bg-white text-gray-300 group-hover:text-blue-500'}`}>
                          <CircleDollarSign size={36} />
                       </div>
                       <div className="text-center space-y-2 relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Payment_Core_02</p>
                          <p className="text-xl font-heritage font-bold">PayPal Hub</p>
                       </div>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setPaymentProtocol('bank')}
                      className={`flex flex-col items-center gap-6 p-10 rounded-[3.5rem] border-2 transition-all group relative overflow-hidden ${paymentProtocol === 'bank' ? 'bg-[#0a0a0a] text-white border-transparent shadow-[0_40px_100px_rgba(0,0,0,0.25)] scale-[1.03]' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-white hover:border-green-500/20'}`}
                    >
                       <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-0 group-hover:opacity-100" />
                       <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 ${paymentProtocol === 'bank' ? 'bg-green-600 text-white shadow-[0_0_30px_#16a34a]' : 'bg-white text-gray-300 group-hover:text-green-500'}`}>
                          <Building2 size={36} />
                       </div>
                       <div className="text-center space-y-2 relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Payment_Core_03</p>
                          <p className="text-xl font-heritage font-bold">Bank Transfer</p>
                       </div>
                    </button>
                 </div>

                 {bookingState.error && (
                   <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] flex items-center gap-6 text-red-600 animate-in slide-in-from-top-4 shadow-xl">
                     <ShieldAlert size={32} className="animate-pulse" />
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Validation_Interrupt</p>
                        <p className="text-lg font-bold italic">{bookingState.error}</p>
                     </div>
                   </div>
                 )}

                 <div className="min-h-[160px] flex items-center justify-center">
                    {paymentProtocol === 'paypal' ? (
                       <div className="w-full max-w-lg space-y-10 animate-in fade-in zoom-in duration-500">
                          <div className="text-center space-y-4">
                             <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100">
                                <Lock size={12} /> Secure Smart Redirect
                             </div>
                             <h4 className="text-2xl font-heritage font-bold text-[#0a0a0a]">Complete with PayPal</h4>
                          </div>
                          <div ref={paypalButtonRef} className="z-10 relative"></div>
                       </div>
                    ) : (
                       <button 
                        type="submit"
                        disabled={bookingState.isProcessingPayment}
                        className="w-full h-32 bg-[#0a0a0a] text-white rounded-[4rem] font-black text-2xl uppercase tracking-[0.8em] flex items-center justify-center gap-12 hover:bg-[#E1306C] transition-all hover:scale-[1.01] shadow-[0_50px_120px_rgba(225,48,108,0.3)] active:scale-95 group/btn relative overflow-hidden disabled:opacity-50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10">{bookingState.isProcessingPayment ? 'Initiating Uplink...' : 'EXECUTE BOOKING'}</span>
                        <div className="relative z-10 w-20 h-20 rounded-[2.2rem] bg-white/10 flex items-center justify-center transition-all duration-700 group-hover/btn:rotate-[360deg] group-hover/btn:bg-[#0a0a0a] group-hover/btn:shadow-2xl">
                          {bookingState.isProcessingPayment ? <Loader2 size={40} className="animate-spin" /> : <Target size={40} />}
                        </div>
                      </button>
                    )}
                 </div>
              </div>
            </form>
          </div>
        </div>

        {/* --- LUXURY SELECTION --- */}
        <div className="space-y-24" id="heritage-stays">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-black/5 border border-black/10 text-[#0a0a0a] text-[10px] font-black uppercase tracking-[0.5em]">
               <Gem size={16} className="text-[#E1306C]" />
               Curated Registry 01
            </div>
            <h3 className="text-5xl md:text-8xl font-heritage font-bold text-[#0a0a0a] tracking-tighter uppercase text-center">Elite <span className="italic insta-text-gradient">Registry.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="group relative bg-white rounded-[4rem] overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-1000 hover:shadow-[0_80px_150px_rgba(0,0,0,0.1)] hover:-translate-y-4">
                <div className="relative h-[480px] overflow-hidden">
                  <img src={hotel.image} className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110" alt={hotel.name[language]} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-10 left-10 p-1.5 bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl transition-all duration-700 group-hover:rotate-6">
                    <div className="px-8 py-4 bg-white/80 rounded-[1.8rem] text-[#0a0a0a] text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                       <Radio size={14} className="text-[#E1306C] animate-pulse" />
                       High_Res Archive
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 bg-[#0a0a0a] text-white px-12 py-8 rounded-tl-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
                     <p className="text-[11px] font-black text-[#E1306C] uppercase tracking-[0.4em] mb-1">Nightly_Manifest</p>
                     <p className="text-4xl font-heritage font-bold">$ {hotel.price}</p>
                  </div>
                </div>
                
                <div className="p-16 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-400">
                       <MapPin size={14} className="text-[#E1306C]" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em]">{hotel.location}</span>
                    </div>
                    <h4 className="text-4xl md:text-5xl font-heritage font-bold text-[#0a0a0a] transition-all group-hover:insta-text-gradient">{hotel.name[language]}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 border-y border-gray-50 py-10">
                     <div className="flex items-center gap-4 text-gray-500">
                        <Waves size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Infinity Pool</span>
                     </div>
                     <div className="flex items-center gap-4 text-gray-500">
                        <Wind size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Spa Center</span>
                     </div>
                  </div>

                  <div className="flex gap-6 pt-4">
                    <button 
                      onClick={() => setSelectedHotel(hotel)}
                      className="flex-grow py-6 bg-gray-50 text-[#0a0a0a] rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] border border-gray-100 hover:bg-[#0a0a0a] hover:text-white transition-all shadow-sm hover:shadow-2xl"
                    >
                      Archive Specs
                    </button>
                    <button 
                      onClick={() => { 
                         setBookingState(prev => ({...prev, destination: hotel.name.EN}));
                         window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="w-20 h-20 bg-[#0a0a0a] text-white rounded-[2rem] flex items-center justify-center hover:bg-[#E1306C] transition-all shadow-2xl active:scale-90"
                    >
                      <FastForward size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- FUTURE MODULES / COMING SOON --- */}
        <div className="space-y-20 py-20 border-t border-gray-50 relative overflow-hidden" id="luxury-expeditions">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-40 bg-blue-600/[0.03] blur-[150px] -rotate-6 pointer-events-none" />

           <div className="flex flex-col items-center text-center space-y-10 relative z-10">
              <div className="px-8 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] flex items-center gap-4 shadow-2xl backdrop-blur-md">
                 <Loader2 size={18} className="animate-spin" />
                 Expansion Registry 02 & 03
              </div>
              <h3 className="text-4xl md:text-8xl font-heritage font-bold text-[#0a0a0a] uppercase tracking-tighter leading-none">
                 COMING <span className="insta-text-gradient italic">SOON.</span>
              </h3>
              <p className="text-gray-400 text-base md:text-xl font-light italic max-w-2xl mx-auto border-l-4 border-blue-100 pl-8 text-center">
                 "Our architectural bureau is currently calibrating the next wave of high-fidelity travel modules. Prepare for full integration."
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {FUTURE_MODULES.map((mod, idx) => (
                <div 
                  key={mod.id} 
                  className="group relative h-[380px] rounded-[4rem] bg-[#0a0a0a] border border-white/5 transition-all duration-1000 overflow-hidden shadow-2xl hover:border-[#E1306C]/20"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,48,108,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-between items-center text-center">
                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#E1306C] group-hover:border-[#E1306C]/30 transition-all duration-700 shadow-inner group-hover:scale-110">
                       {mod.icon}
                    </div>
                    
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-[#E1306C] uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-opacity">Module_Pending_Sync</p>
                       <h4 className="text-3xl font-heritage font-bold text-white uppercase tracking-tight">{mod.title[language]}</h4>
                       <p className="text-xs text-white/30 italic font-medium leading-relaxed px-4">{mod.desc[language]}</p>
                    </div>

                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-[#E1306C] animate-pulse w-1/4" />
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 p-1.5 bg-white/5 rounded-xl border border-white/10 opacity-40">
                     <Lock size={14} className="text-white" />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <HotelModal 
        hotel={selectedHotel} 
        onClose={() => setSelectedHotel(null)} 
        onBook={(name) => {
           setBookingState(prev => ({...prev, destination: name}));
           setSelectedHotel(null);
           window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        bookingState={bookingState}
        setBookingState={setBookingState}
        language={language} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
        .animate-loading-bar { animation: loading-bar 3s linear infinite; }
        .tabular-nums { font-variant-numeric: tabular-nums; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}} />
    </div>
  );
};

export default Marketplace;