
import React, { useState, useEffect } from 'react';
import { Language, QuizQuestion, ExplorerProfile } from '../types.ts';
import { DESTINATIONS } from '../constants.tsx';
import { 
  Compass, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  History, 
  Waves, 
  Mountain, 
  PawPrint,
  ChevronLeft,
  ArrowUpRight
} from 'lucide-react';

interface QuizProps {
  language: Language;
  setView: (view: any) => void;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'view',
    question: { 
      EN: "What's your ideal morning view?", 
      SI: "ඔබ වඩාත්ම ප්‍රිය කරන උදෑසන දර්ශනය කුමක්ද?" 
    },
    options: [
      { id: 'ruins', text: { EN: 'Sacred Ancient Ruins', SI: 'පූජනීය පුරාණ නටබුන්' }, image: 'https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?auto=format&fit=crop&w=400&q=80', profileScore: 'ancient' },
      { id: 'mist', text: { EN: 'Misty Mountains', SI: 'මීදුමෙන් වැසුණු කඳු' }, image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80', profileScore: 'mountains' },
      { id: 'waves', text: { EN: 'Turquoise Ocean Waves', SI: 'නිල්වන් සාගර රළ' }, image: 'https://images.unsplash.com/photo-1558446791-ac5fec3caddf?auto=format&fit=crop&w=400&q=80', profileScore: 'beach' },
      { id: 'jungle', text: { EN: 'Wild Jungle Canopy', SI: 'වනගත තුරු වියන' }, image: 'https://images.unsplash.com/photo-1671432751719-d1a032c1a369?auto=format&fit=crop&w=400&q=80', profileScore: 'wildlife' },
    ]
  },
  {
    id: 'flavor',
    question: { 
      EN: "Which flavor sparks your curiosity?", 
      SI: "ඔබේ කුතුහලය අවදි කරන රසය කුමක්ද?" 
    },
    options: [
      { id: 'spicy', text: { EN: 'Fiery Black Pepper Curries', SI: 'සැර ගම්මිරිස් ව්‍යංජන' }, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80', profileScore: 'ancient' },
      { id: 'tea', text: { EN: 'Fragrant Highland Tea', SI: 'සුවඳවත් කඳුකර තේ' }, image: 'https://images.unsplash.com/photo-1594631252845-29fc45865157?auto=format&fit=crop&w=400&q=80', profileScore: 'mountains' },
      { id: 'coconut', text: { EN: 'Sweet Fresh Coconut', SI: 'පැණිරස නැවුම් කුරුම්බා' }, image: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&w=400&q=80', profileScore: 'beach' },
      { id: 'wild', text: { EN: 'Zesty Tropical Fruits', SI: 'නැවුම් නිවර්තන පළතුරු' }, image: 'https://images.unsplash.com/photo-1563811809228-3e4e6f9877b0?auto=format&fit=crop&w=400&q=80', profileScore: 'wildlife' },
    ]
  },
  {
    id: 'activity',
    question: { 
      EN: "What sparks your sense of adventure?", 
      SI: "ඔබේ වික්‍රමාන්විත හැඟීම අවදි කරන්නේ කුමක්ද?" 
    },
    options: [
      { id: 'climb', text: { EN: 'Climbing Sacred Peaks', SI: 'පූජනීය කඳු තරණය' }, image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=400&q=80', profileScore: 'ancient' },
      { id: 'trek', text: { EN: 'Trekking Through Clouds', SI: 'වලාකුළු අතරින් ඇවිදීම' }, image: 'https://images.unsplash.com/photo-1578519050142-afb511e518de?auto=format&fit=crop&w=400&q=80', profileScore: 'mountains' },
      { id: 'surf', text: { EN: 'Surfing Endless Waves', SI: 'රළ මත ක්‍රීඩා කිරීම' }, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80', profileScore: 'beach' },
      { id: 'safari', text: { EN: 'Tracking Elusive Leopards', SI: 'දිවියන් සොයා යෑම' }, image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=400&q=80', profileScore: 'wildlife' },
    ]
  },
  {
    id: 'souvenir',
    question: { 
      EN: "What would you bring home?", 
      SI: "ඔබ ආපසු ගෙදර රැගෙන යන්නේ කුමක්ද?" 
    },
    options: [
      { id: 'mask', text: { EN: 'Hand-carved Heritage Mask', SI: 'අතින් කැටයම් කළ වෙස් මුහුණක්' }, image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=400&q=80', profileScore: 'ancient' },
      { id: 'leaf', text: { EN: 'Estate-fresh Tea Leaves', SI: 'වතුයායෙන් නෙලූ නැවුම් තේ' }, image: 'https://images.unsplash.com/photo-1558446791-ac5fec3caddf?auto=format&fit=crop&w=400&q=80', profileScore: 'mountains' },
      { id: 'shell', text: { EN: 'Seashells & Ocean Memories', SI: 'මුහුදු බෙල්ලන් සහ මතකයන්' }, image: 'https://images.unsplash.com/photo-1578405827843-dba01140f07c?auto=format&fit=crop&w=400&q=80', profileScore: 'beach' },
      { id: 'spice', text: { EN: 'Aromatic Pure Spices', SI: 'සුවඳවත් පිරිසිදු කුළුබඩු' }, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80', profileScore: 'wildlife' },
    ]
  }
];

const EXPLORER_PROFILES: Record<string, ExplorerProfile> = {
  ancient: {
    id: 'ancient',
    name: { EN: "The Heritage Guardian", SI: "උරුමයේ ආරක්ෂකයා" },
    description: { 
      EN: "You are drawn to the whispers of history. Your soul finds peace among ancient stones and sacred ruins where kings once walked.", 
      SI: "ඔබ ඉතිහාසයේ හඬට ඇදී යයි. රජවරුන් ඇවිද ගිය පැරණි ගල් පර්වත සහ පූජනීය නටබුන් අතර ඔබේ ආත්මයට සාමය ලැබේ." 
    },
    image: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80',
    recommendations: ['sigiriya', 'polonnaruwa', 'dambulla']
  },
  mountains: {
    id: 'mountains',
    name: { EN: "The Mountain Mystic", SI: "කඳුකර අබිරහස් ගවේෂකයා" },
    description: { 
      EN: "You seek the heights and the mist. Your spirit soars in the cool mountain air, where tea estates blanket the hills like emerald velvet.", 
      SI: "ඔබ මීදුම සහ කඳු මුදුන් සොයන්නෙකි. හරිත පැහැ තේ වතුවලින් වැසුණු කඳුකරයේ සිසිල් සුළඟ ඔබේ ජවයයි." 
    },
    image: 'https://images.unsplash.com/photo-1578519050142-afb511e518de?auto=format&fit=crop&w=800&q=80',
    recommendations: ['ella', 'adams-peak', 'knuckles']
  },
  beach: {
    id: 'beach',
    name: { EN: "The Ocean Voyager", SI: "සාගර සංචාරකයා" },
    description: { 
      EN: "The rhythm of the tide is your heartbeat. You find joy on golden shores and in the turquoise depths of the Indian Ocean.", 
      SI: "සාගර රළේ රිද්මය ඔබේ හදගැස්මයි. රන්වන් වෙරළ තීරයන් සහ ඉන්දියන් සාගරයේ නිල්වන් ගැඹුර ඔබව සතුටු කරයි." 
    },
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    recommendations: ['galle-fort', 'trincomalee', 'hikkaduwa']
  },
  wildlife: {
    id: 'wildlife',
    name: { EN: "The Jungle Spirit", SI: "වනගත ආත්මය" },
    description: { 
      EN: "You are one with nature. Your adventure lies in the deep bush, where wild elephants roam and the leopard's eyes gleam in the shadows.", 
      SI: "ඔබ සොබාදහම සමඟ බැඳී සිටින්නෙකි. වන අලි සැරිසරන සහ දිවියන්ගේ දෑස් දිලිසෙන ඝන වනාන්තරය ඔබේ වික්‍රමයයි." 
    },
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80',
    recommendations: ['horton-plains', 'knuckles', 'sigiriya']
  }
};

const Quiz: React.FC<QuizProps> = ({ language, setView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [profile, setProfile] = useState<ExplorerProfile | null>(null);

  const handleOptionSelect = (profileScore: string) => {
    const newAnswers = [...answers, profileScore];
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateProfile(newAnswers);
    }
  };

  const calculateProfile = (finalAnswers: string[]) => {
    const counts: Record<string, number> = { ancient: 0, mountains: 0, beach: 0, wildlife: 0 };
    finalAnswers.forEach(ans => counts[ans]++);
    
    let maxCount = 0;
    let winningProfile = 'ancient';
    
    for (const [key, value] of Object.entries(counts)) {
      if (value > maxCount) {
        maxCount = value;
        winningProfile = key;
      }
    }
    
    setProfile(EXPLORER_PROFILES[winningProfile]);
    setIsFinished(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsFinished(false);
    setProfile(null);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  if (isFinished && profile) {
    const recommendedDestinations = DESTINATIONS.filter(d => profile.recommendations.includes(d.id));

    return (
      <div className="min-h-screen bg-[#fafafa] pt-24 pb-32 px-4 animate-in fade-in duration-700">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Result Card */}
          <div className="relative overflow-hidden bg-white rounded-[4rem] shadow-2xl border border-gray-100 group">
            <div className="absolute inset-0 pattern-overlay opacity-5"></div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-80 md:h-full">
                <img src={profile.image} alt={profile.name[language]} className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute bottom-10 left-10 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                    <Sparkles size={14} className="text-yellow-400" />
                    Explorer Profile
                  </div>
                </div>
              </div>
              <div className="p-12 md:p-16 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl font-heritage font-bold insta-text-gradient leading-tight">
                    {profile.name[language]}
                  </h2>
                  <div className="w-16 h-1 bg-[#E1306C] rounded-full"></div>
                </div>
                <p className="text-xl text-gray-500 font-light italic leading-relaxed">
                  "{profile.description[language]}"
                </p>
                <button 
                  onClick={resetQuiz}
                  className="flex items-center gap-3 text-[10px] font-bold text-gray-400 hover:text-[#E1306C] uppercase tracking-widest transition-colors"
                >
                  <RotateCcw size={14} />
                  Retake Journey
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-heritage font-bold text-[#262626]">
                {language === 'EN' ? 'Tailored for You' : 'ඔබ සඳහාම සකස් කළ'}
              </h3>
              <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Recommended Destinations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedDestinations.map((dest) => (
                <div 
                  key={dest.id}
                  onClick={() => setView('destinations')}
                  className="group relative h-80 rounded-[3rem] overflow-hidden cursor-pointer shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img src={dest.image} alt={dest.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[10px] font-bold text-[#E1306C] uppercase tracking-widest mb-1">{dest.location}</p>
                    <h4 className="text-xl font-heritage font-bold text-white leading-tight">{dest.name[language]}</h4>
                    <div className="flex items-center gap-2 text-white/60 text-[8px] font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      See Details <ArrowUpRight size={10} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8">
             <button 
               onClick={() => setView('home')}
               className="px-12 py-5 bg-[#262626] text-white rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-[0.3em]"
             >
               Explore More of Lanka
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-32 px-4 flex flex-col items-center overflow-hidden">
      {/* Quiz UI */}
      <div className="max-w-5xl w-full space-y-16 animate-in slide-in-from-bottom-8 duration-700">
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
            <span>Progress</span>
            <span>Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full insta-gradient transition-all duration-700 shadow-[0_0_15px_rgba(225,48,108,0.3)]"
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div className="w-20 h-20 story-ring rounded-full mx-auto p-1 animate-pulse">
              <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
                <Compass size={32} className="text-[#E1306C]" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-heritage font-bold text-[#262626] leading-tight max-w-2xl mx-auto">
              {currentQuestion.question[language]}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt.profileScore)}
                className="group relative flex flex-col items-center bg-white rounded-[3rem] p-4 shadow-xl border border-gray-100 hover:border-[#E1306C]/30 hover:-translate-y-3 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden mb-6">
                  <img src={opt.image} alt={opt.text[language]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                       <ArrowRight size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#E1306C] transition-colors pb-4 px-2">
                  {opt.text[language]}
                </span>
                
                {/* Floating Selection Indicator */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 story-ring p-[1px] rounded-2xl opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 shadow-2xl scale-50 group-hover:scale-100">
                  <div className="bg-white w-full h-full rounded-[15px] flex items-center justify-center">
                    <Sparkles size={16} className="text-[#E1306C]" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Back Button */}
        {currentStep > 0 && (
          <div className="flex justify-center">
             <button 
               onClick={() => setCurrentStep(currentStep - 1)}
               className="flex items-center gap-2 text-[10px] font-bold text-gray-300 hover:text-gray-500 uppercase tracking-widest transition-all"
             >
               <ChevronLeft size={16} />
               Go Back
             </button>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="fixed -bottom-20 -left-20 w-80 h-80 opacity-[0.03] pointer-events-none rotate-12">
        <History size={300} />
      </div>
      <div className="fixed -top-20 -right-20 w-80 h-80 opacity-[0.03] pointer-events-none -rotate-12">
        <Compass size={300} />
      </div>
    </div>
  );
};

export default Quiz;
