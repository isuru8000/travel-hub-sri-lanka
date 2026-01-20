
import React from 'react';
import { Language, TraditionalMedicine as TraditionalMedicineType } from '../types.ts';
import { MEDICINE_DATA } from '../constants.tsx';
import { Leaf, History, Activity, Sparkles, HeartPulse, Info } from 'lucide-react';

interface TraditionalMedicineProps {
  language: Language;
}

const MedicineCard: React.FC<{ item: TraditionalMedicineType; language: Language }> = ({ item, language }) => (
  <div 
    className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col group hover:-translate-y-4 transition-all duration-500"
  >
    <div className="relative h-72 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.name[language]} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
        {item.type === 'herb' ? <Leaf size={12} className="text-green-600" /> : <Activity size={12} className="text-[#E1306C]" />}
        <span className="text-[10px] font-bold text-[#262626] uppercase tracking-widest">
          {item.type === 'herb' ? (language === 'EN' ? 'Medicinal Herb' : 'ඖෂධීය ශාකය') : (language === 'EN' ? 'Healing Therapy' : 'සුව කිරීමේ ප්‍රතිකාරය')}
        </span>
      </div>
    </div>

    <div className="p-10 flex-grow space-y-6 flex flex-col">
      <div className="space-y-1">
        <h3 className="text-3xl font-heritage font-bold text-[#262626] group-hover:insta-text-gradient transition-all">
          {item.name[language]}
        </h3>
        <div className="flex items-center gap-2 text-[11px] font-bold text-[#E1306C] uppercase tracking-[0.2em]">
          <Sparkles size={14} fill="currentColor" />
          {language === 'EN' ? "Ancient Wisdom" : "පැරණි ප්‍රඥාව"}
        </div>
      </div>

      <p className="text-base text-gray-500 leading-relaxed font-light">
        {item.description[language]}
      </p>

      <div className="bg-[#f0fff4] p-6 rounded-[2rem] border border-[#c6f6d5] relative">
        <HeartPulse size={20} className="text-green-600 opacity-20 absolute top-4 right-4" />
        <p className="text-[10px] font-bold uppercase text-green-600 tracking-[0.2em] mb-3">
          {language === 'EN' ? 'Health Benefits' : 'සෞඛ්‍ය ප්‍රතිලාභ'}
        </p>
        <p className="text-sm text-gray-700 italic leading-relaxed font-medium">
          {item.benefits[language]}
        </p>
      </div>

      <div className="pt-6 border-t border-gray-100 mt-auto space-y-4">
        <div className="flex items-start gap-4 bg-[#fafafa] p-4 rounded-2xl border border-gray-100">
          <Info size={18} className="text-[#E1306C] mt-1 shrink-0" />
          <div>
            <span className="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">
              {language === 'EN' ? 'How to Use' : 'භාවිතා කරන ආකාරය'}
            </span>
            <p className="text-sm text-[#262626] italic leading-tight">
              {item.usage[language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TraditionalMedicine: React.FC<TraditionalMedicineProps> = ({ language }) => {
  const herbs = MEDICINE_DATA.filter(m => m.type === 'herb');
  const treatments = MEDICINE_DATA.filter(m => m.type === 'treatment');

  return (
    <section className="min-h-screen bg-[#fafafa] pb-32">
      {/* Medicine Header */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-60 transition-transform duration-10000 hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-green-900/20 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative text-center space-y-4 px-4">
          <div className="w-20 h-20 story-ring rounded-full mx-auto p-1 mb-6 animate-pulse">
            <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
              <Leaf size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-heritage font-bold text-white drop-shadow-2xl">
            {language === 'EN' ? "Ancient Healing" : "හෙළ වෙදකම"}
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light drop-shadow-lg italic">
            {language === 'EN' 
              ? "Rejuvenate your soul with the 5,000-year-old wisdom of Sri Lankan Hela Wedakama & Ayurveda." 
              : "වසර 5,000 ක ඉතිහාසයක් ඇති ශ්‍රී ලාංකීය හෙළ වෙදකම සහ ආයුර්වේදයේ ප්‍රඥාවෙන් ඔබේ ආත්මය සුවපත් කරගන්න."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10 space-y-32">
        {/* Herbs Section */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <h3 className="text-3xl font-heritage font-bold text-[#262626] bg-white px-8 py-3 rounded-full shadow-lg border border-gray-100">
              {language === 'EN' ? "Nature's Pharmacy (Herbs)" : "ස්වභාවධර්මයේ ඔසුසල (ඖෂධ පැලෑටි)"}
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {herbs.map((item) => (
              <MedicineCard key={item.id} item={item} language={language} />
            ))}
          </div>
        </div>

        {/* Treatments Section */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <h3 className="text-3xl font-heritage font-bold text-[#262626] bg-white px-8 py-3 rounded-full shadow-lg border border-gray-100">
              {language === 'EN' ? "Healing Rituals & Therapies" : "සුව කිරීමේ චාරිත්‍ර සහ ප්‍රතිකාර"}
            </h3>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {treatments.map((item) => (
              <MedicineCard key={item.id} item={item} language={language} />
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto mt-48 px-6 text-center space-y-8">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent mx-auto" />
        <p className="text-2xl md:text-3xl font-heritage font-medium text-gray-600 italic">
          {language === 'EN' 
            ? "\"The earth provides all we need to heal, we only need the wisdom to listen to its pulse.\""
            : "\"සුවපත් වීමට අවශ්‍ය සියල්ල සොබාදහම අපට ලබා දෙයි, අප කළ යුත්තේ එහි ස්පන්දනයට සවන් දීමට තරම් ප්‍රඥාවන්ත වීම පමණි.\""}
        </p>
      </div>
    </section>
  );
};

export default TraditionalMedicine;
