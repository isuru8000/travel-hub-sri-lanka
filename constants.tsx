
import { Destination, Food, HeritageMusic, TraditionalMedicine, TeaExperience, Phrase, TravelEssential, Festival, Translation, HikingSpot } from './types.ts';

export const SUPABASE_KEY = 'sb_publishable_c8wPY71QFNsFJKcAEuD86w_pcqen0nv';

export const UI_STRINGS: Translation = {
  heroTitle: {
    EN: "Discover True Beauty of Sri Lanka",
    SI: "ශ්‍රී ලංකාවේ සැබෑ සුන්දරත්වය සොයා ගන්න"
  },
  exploreDestinations: {
    EN: "Explore Destinations",
    SI: "ගමනාන්ත ගවේෂණය කරන්න"
  },
  popularHighlightsTitle: {
    EN: "The Crown Jewels of Lanka",
    SI: "ලංකාවේ අභිමානවත් ස්ථාන"
  },
  popularHighlightsSubtitle: {
    EN: "Journey through the three most iconic landmarks that define our island's spirit.",
    SI: "අපගේ දිවයිනේ ජීවය නිරූපණය කරන සුවිශේෂී ස්ථාන තුනක් හරහා සංචාරය කරන්න."
  },
  planYourTrip: {
    EN: "Plan Your Trip",
    SI: "සංචාරය සැලසුම් කරන්න"
  },
  ancientHighlights: {
    EN: "Ancient Sri Lanka Highlights",
    SI: "පැරණි ශ්‍රී ලංකාවේ විශේෂිත ස්ථාන"
  },
  natureAdventure: {
    EN: "Nature & Adventure",
    SI: "සොබාදහම සහ වික්‍රමය"
  },
  travelMemories: {
    EN: "Travel Memories",
    SI: "සංචාරක මතකයන්"
  },
  lankaGuideTitle: {
    EN: "Lanka Guide AI",
    SI: "ලංකා ගයිඩ් AI"
  },
  searchPlaceholder: {
    EN: "Search destinations...",
    SI: "ගමනාන්ත සොයන්න..."
  },
  filterRegionLabel: {
    EN: "Filter by Region",
    SI: "කලාපය අනුව පෙරන්න"
  },
  allRegions: {
    EN: "All Regions",
    SI: "සියලුම කලාප"
  },
  historyLabel: {
    EN: "The Legend & History",
    SI: "පුරාවෘත්තය සහ ඉතිහාසය"
  },
  bestTimeLabel: {
    EN: "Best Time to Visit",
    SI: "සංචාරය කිරීමට හොඳම කාලය"
  },
  tipsLabel: {
    EN: "Traveler's Wisdom",
    SI: "සංචාරක උපදෙස්"
  },
  close: {
    EN: "Close",
    SI: "වසා දමන්න"
  },
  exploreInterests: {
    EN: "Explore Your Interests",
    SI: "ඔබේ රුචිකත්වයන් ගවේෂණය කරන්න"
  }
};

export const CATEGORIES_DATA = [
  {
    id: "wildlife",
    icon: "PawPrint",
    title: { EN: "Wildlife", SI: "වනජීවී" },
    description: { EN: "Encounter majestic elephants and elusive leopards.", SI: "ගාම්භීර අලි ඇතුන් සහ දුර්ලභ දිවියන් දැකගන්න." }
  },
  {
    id: "hiking",
    icon: "Mountain",
    title: { EN: "Hiking", SI: "කඳු තරණය" },
    description: { EN: "Scale misty peaks and trek through lush green trails.", SI: "මීදුමෙන් වැසුණු කඳු මුදුන් සහ හරිත මාවත් ඔස්සේ ඇවිද යන්න." }
  },
  {
    id: "foods",
    icon: "Utensils",
    title: { EN: "Food Heritage", SI: "ආහාර උරුමය" },
    description: { EN: "Taste the history of Lanka through its ancient spices.", SI: "පැරණි කුළුබඩු රසයෙන් ලංකාවේ ඉතිහාසය අත්විඳින්න." }
  },
  {
    id: "essentials",
    icon: "Backpack",
    title: { EN: "Travel Guide", SI: "සංචාරක උපදෙස්" },
    description: { EN: "Practical info on Visa, Currency, and getting around.", SI: "වීසා, මුදල් සහ ගමනාගමනය පිළිබඳ ප්‍රායෝගික තොරතුරු." }
  },
  {
    id: "festivals",
    icon: "PartyPopper",
    title: { EN: "Festivals", SI: "සංස්කෘතික උත්සව" },
    description: { EN: "Experience the vibrant Peraheras and traditions.", SI: "විචිත්‍රවත් පෙරහැර සහ සම්ප්‍රදායන් අත්විඳින්න." }
  },
  {
    id: "tea",
    icon: "Sprout",
    title: { EN: "Tea Trails", SI: "තේ සංස්කෘතිය" },
    description: { EN: "Explore the journey from leaf to cup in the misty hills.", SI: "මීදුමෙන් වැසුණු කඳුකරයේ තේ දල්ලේ සිට කෝප්පය දක්වා ගමන." }
  },
  {
    id: "phrases",
    icon: "MessageSquare",
    title: { EN: "Local Language", SI: "දේශීය භාෂාව" },
    description: { EN: "Learn basic Sinhala to connect with the locals.", SI: "දේශීය ජනතාව සමඟ සන්නිවේදනය කිරීමට සිංහල භාෂාව ඉගෙන ගන්න." }
  }
];

export const HIKING_DATA: HikingSpot[] = [
  {
    id: "h-1",
    name: { EN: "Adam’s Peak (Sri Pada)", SI: "ශ්‍රී පාදය" },
    location: { EN: "Ratnapura", SI: "රත්නපුර" },
    difficulty: "Hard",
    duration: { EN: "5-7 Hours", SI: "පැය 5-7" },
    elevation: "2,243m",
    description: { EN: "A sacred pilgrimage site with 5,000+ steps, famous for the sunrise and the 'Ira Sewaya'.", SI: "පඩිපෙළ 5,000 කට වඩා වැඩි ප්‍රමාණයක් සහිත පූජනීය කඳු මුදුනකි. මෙහි හිරු උදාව ඉතා ප්‍රසිද්ධය." },
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-2",
    name: { EN: "Ella Rock", SI: "ඇල්ල රොක්" },
    location: { EN: "Ella", SI: "ඇල්ල" },
    difficulty: "Moderate",
    duration: { EN: "3-4 Hours", SI: "පැය 3-4" },
    elevation: "1,350m",
    description: { EN: "A popular trek through rail tracks and tea estates offering panoramic views of Ella Gap.", SI: "දුම්රිය මාර්ග සහ තේ වතු හරහා දිවෙන, ඇල්ල කපොල්ලේ අලංකාර දසුන් නැරඹිය හැකි සංචාරයකි." },
    image: "https://images.unsplash.com/photo-1578519050142-afb511e518de?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-3",
    name: { EN: "Knuckles Range", SI: "නකල්ස් කඳු පන්තිය" },
    location: { EN: "Matale/Kandy", SI: "මාතලේ/මහනුවර" },
    difficulty: "Hard",
    duration: { EN: "1-3 Days", SI: "දින 1-3" },
    elevation: "1,863m",
    description: { EN: "A UNESCO World Heritage site with diverse climates and hidden waterfalls.", SI: "යුනෙස්කෝ ලෝක උරුමයක් වන මෙම කඳු පන්තිය ජෛව විවිධත්වයෙන් සහ සැඟවුණු දිය ඇලිවලින් පිරි ඉසව්වකි." },
    image: "https://images.unsplash.com/photo-1580635849305-4399d586ac5c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-4",
    name: { EN: "Horton Plains (World’s End)", SI: "හෝර්ටන් තැන්න (ලෝකාන්තය)" },
    location: { EN: "Nuwara Eliya", SI: "නුවරඑළිය" },
    difficulty: "Easy",
    duration: { EN: "3-4 Hours", SI: "පැය 3-4" },
    elevation: "2,100m",
    description: { EN: "A high-altitude plateau trek ending at a 880m vertical drop known as World's End.", SI: "ලෝකාන්තය ලෙස හැඳින්වෙන අඩි 2,800 ක ප්‍රපාතයකින් අවසන් වන සානුමය ගමන් පථයකි." },
    image: "https://images.unsplash.com/photo-1671432751719-d1a032c1a369?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-5",
    name: { EN: "Little Adam’s Peak", SI: "පුංචි ශ්‍රී පාදය" },
    location: { EN: "Ella", SI: "ඇල්ල" },
    difficulty: "Easy",
    duration: { EN: "1-2 Hours", SI: "පැය 1-2" },
    elevation: "1,141m",
    description: { EN: "A family-friendly hike with stunning views of the surrounding mountains and Nine Arch Bridge.", SI: "පවුලේ සැමට යා හැකි, අවට කඳු පන්තිවල අලංකාර දසුන් සහිත පහසු සංචාරයකි." },
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-6",
    name: { EN: "Pidurangala Rock", SI: "පිදුරංගල ගල" },
    location: { EN: "Sigiriya", SI: "සීගිරිය" },
    difficulty: "Moderate",
    duration: { EN: "1-2 Hours", SI: "පැය 1-2" },
    elevation: "200m (Base to Top)",
    description: { EN: "Offers the most iconic view of Sigiriya Lion Rock, best climbed for sunrise or sunset.", SI: "සීගිරි පර්වතයේ අලංකාර දසුනක් නැරඹීමට හොඳම ස්ථානය මෙයයි. හිරු උදාව නැරඹීමට ඉතා සුදුසුයි." },
    image: "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-7",
    name: { EN: "Bible Rock (Bathalegala)", SI: "බතලේගල (බයිබල් රොක්)" },
    location: { EN: "Kegalle", SI: "කෑගල්ල" },
    difficulty: "Moderate",
    duration: { EN: "2-3 Hours", SI: "පැය 2-3" },
    elevation: "797m",
    description: { EN: "A rock shaped like an open book, offering a 360-degree view of the central highlands.", SI: "විවෘත කළ පොතක හැඩය ඇති මෙම ගල මුදුනේ සිට මුළු කඳුකරයම අංශක 360 කින් නැරඹිය හැකිය." },
    image: "https://images.unsplash.com/photo-1514483127413-f72f273478c3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-8",
    name: { EN: "Hanthana Mountain Range", SI: "හන්තාන කඳු පන්තිය" },
    location: { EN: "Kandy", SI: "මහනුවර" },
    difficulty: "Moderate",
    duration: { EN: "4-5 Hours", SI: "පැය 4-5" },
    elevation: "1,150m",
    description: { EN: "A range consisting of seven peaks, popular among students and nature lovers near Kandy.", SI: "කඳු මුදුන් හතකින් සමන්විත මෙම පන්තිය මහනුවර ආශ්‍රිතව පිහිටි ඉතා ජනප්‍රිය ගමන් මගකි." },
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-9",
    name: { EN: "Riverston (The Mini World's End)", SI: "රිවර්ස්ටන් (පුංචි ලෝකාන්තය)" },
    location: { EN: "Matale", SI: "මාතලේ" },
    difficulty: "Moderate",
    duration: { EN: "2-3 Hours", SI: "පැය 2-3" },
    elevation: "1,400m",
    description: { EN: "Misty mountains and high winds characterize this trek, leading to a breathtaking cliff edge.", SI: "මීදුමෙන් වැසුණු කඳු සහ තද සුළඟක් පවතින මෙම ගමන අවසානයේ මනරම් ප්‍රපාතයක් හමුවේ." },
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "h-10",
    name: { EN: "Rose Quartz Mountain", SI: "නකල්ස් රෝස තිරුවානා කන්ද" },
    location: { EN: "Dambulla", SI: "දඹුල්ල" },
    difficulty: "Easy",
    duration: { EN: "1-2 Hours", SI: "පැය 1-2" },
    elevation: "180m",
    description: { EN: "The largest rose quartz mountain in South Asia, part of the Jathika Namal Uyana.", SI: "දකුණු ආසියාවේ විශාලතම රෝස තිරුවානා කන්ද වන මෙය ජාතික නාමල් උයනේ කොටසකි." },
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80"
  }
];

export const TRAVEL_ESSENTIALS_DATA: TravelEssential[] = [
  {
    id: "visa",
    title: { EN: "Visa & Entry", SI: "වීසා සහ ඇතුළුවීම" },
    icon: "Passport",
    description: { EN: "Most travelers need an ETA (Electronic Travel Authorization) before arriving in Sri Lanka.", SI: "බොහෝ සංචාරකයින් ශ්‍රී ලංකාවට පැමිණීමට පෙර ETA (ඉලෙක්ට්‍රොනික සංචාරක අවසරය) ලබාගත යුතුය." },
    tips: [
      { EN: "Apply online at eta.gov.lk before you fly.", SI: "පියාසර කිරීමට පෙර eta.gov.lk හරහා අන්තර්ජාලයෙන් අයදුම් කරන්න." },
      { EN: "Keep a printed copy of your ETA and return flight.", SI: "ඔබේ ETA සහ ආපසු පියාසර කිරීමේ ටිකට් පතේ මුද්‍රිත පිටපතක් ළඟ තබා ගන්න." }
    ]
  },
  {
    id: "currency",
    title: { EN: "Money & Currency", SI: "මුදල් සහ විනිමය" },
    icon: "Wallet",
    description: { EN: "The official currency is the Sri Lankan Rupee (LKR). Cash is king in rural areas.", SI: "නිල මුදල් ඒකකය ශ්‍රී ලංකා රුපියල (LKR) වේ. ගම්බද ප්‍රදේශවල මුදල් භාවිතය වඩාත් සුදුසුය." },
    tips: [
      { EN: "Use ATMs at the airport or in major cities.", SI: "ගුවන් තොටුපලේ හෝ ප්‍රධාන නගරවල ඇති ATM යන්ත්‍ර භාවිතා කරන්න." },
      { EN: "Notify your bank before travel to avoid card blocks.", SI: "කාඩ්පත් අවහිර වීම වළක්වා ගැනීමට සංචාරයට පෙර ඔබේ බැංකුව දැනුවත් කරන්න." }
    ]
  },
  {
    id: "transport",
    title: { EN: "Getting Around", SI: "ගමනාගමනය" },
    icon: "Train",
    description: { EN: "From scenic trains to nimble Tuk-Tuks, transport is an adventure itself.", SI: "අලංකාර දුම්රිය සංචාරවල සිට කුඩා ත්‍රිරෝද රථ දක්වා, ගමනාගමනය ද එක්තරා වික්‍රමයකි." },
    tips: [
      { EN: "Book train tickets in advance, especially for Kandy-Ella.", SI: "විශේෂයෙන්ම මහනුවර-ඇල්ල දුම්රිය ප්‍රවේශ පත්‍ර කලින් වෙන් කරවා ගන්න." },
      { EN: "Use 'PickMe' or 'Uber' for fair Tuk-Tuk prices in cities.", SI: "නගරවල සාධාරණ ත්‍රිරෝද රථ මිල ගණන් සඳහා 'PickMe' හෝ 'Uber' භාවිතා කරන්න." }
    ]
  },
  {
    id: "connectivity",
    title: { EN: "Connectivity", SI: "සන්නිවේදනය" },
    icon: "Wifi",
    description: { EN: "Mobile data is affordable and coverage is generally good across the island.", SI: "ජංගම දත්ත මිල අඩු මෙන්ම දිවයින පුරා ආවරණය සාමාන්‍යයෙන් යහපත් මවතී." },
    tips: [
      { EN: "Buy a Dialog or Mobitel SIM card at the airport arrival lounge.", SI: "ගුවන් තොටුපලේ පැමිණීමේ පර්යන්තයෙන් Dialog හෝ Mobitel SIM පතක් මිලදී ගන්න." },
      { EN: "Download offline Google Maps for remote mountain areas.", SI: "ඈත කඳුකර ප්‍රදේශ සඳහා offline Google Maps බාගත කර තබා ගන්න." }
    ]
  }
];

export const FESTIVALS_DATA: Festival[] = [
  {
    id: "perahera",
    name: { EN: "Kandy Esala Perahera", SI: "මහනුවර ඇසළ පෙරහැර" },
    date: { EN: "July / August", SI: "ජූලි / අගෝස්තු" },
    description: { EN: "The most grand festival in Sri Lanka featuring decorated elephants and traditional dancers.", SI: "සැරසූ අලි ඇතුන් සහ පාරම්පරික නර්තන ශිල්පීන්ගෙන් සමන්විත ශ්‍රී ලංකාවේ උත්කර්ෂවත්ම උත්සවයයි." },
    image: "https://images.unsplash.com/photo-1603515865223-9993309a4d8c?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Held to pay homage to the Sacred Tooth Relic of Lord Buddha.", SI: "බුදුරජාණන් වහන්සේගේ ශ්‍රී දන්ත ධාතූන් වහන්සේට ගෞරව දැක්වීම සඳහා පවත්වනු ලැබේ." }
  },
  {
    id: "vesak",
    name: { EN: "Vesak Festival", SI: "වෙසක් උත්සවය" },
    date: { EN: "May (Full Moon Day)", SI: "මැයි (පසළොස්වක පොහොය දින)" },
    description: { EN: "The island lights up with beautiful lanterns and 'Pandols' celebrating Buddha's life.", SI: "බුදුරජාණන් වහන්සේගේ ජීවිතය සමරමින් දිවයින පුරා අලංකාර වෙසක් කූඩු සහ තොරණවලින් ආලෝකමත් වේ." },
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Commemorates the birth, enlightenment, and passing of Lord Buddha.", SI: "බුදුරජාණන් වහන්සේගේ ඉපදීම, බුදුවීම සහ පිරිනිවන් පෑම සිහිපත් කරයි." }
  },
  {
    id: "newyear",
    name: { EN: "Sinhala & Tamil New Year", SI: "සිංහල සහ දෙමළ අලුත් අවුරුද්ද" },
    date: { EN: "April 13th & 14th", SI: "අප්‍රේල් 13 සහ 14" },
    description: { EN: "A harvest festival marked by traditional games, sweets (Kevum, Kokis), and family gatherings.", SI: "පාරම්පරික ක්‍රීඩා, කැවිලි පෙවිලි සහ පවුලේ එකමුතුවෙන් සැමරෙන අස්වනු නෙලීමේ උත්සවයකි." },
    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Celebrates the transition of the Sun to Aries and the end of the harvest.", SI: "සූර්යයා මීන රාශියෙන් මේෂ රාශියට සංක්‍රමණය වීම සහ අස්වනු නෙලීමේ අවසානය සමරයි." }
  },
  {
    id: "thaipongal",
    name: { EN: "Thai Pongal", SI: "තෛපොංගල්" },
    date: { EN: "January", SI: "ජනවාරි" },
    description: { EN: "A Tamil harvest festival dedicated to the Sun God, Surya. Families cook 'Pongal' rice in new clay pots.", SI: "සූර්ය දිව්‍ය රාජයා උදෙසා පවත්වනු ලබන දෙමළ අස්වනු නෙලීමේ උත්සවයකි. පවුල් එකතු වී අලුත් මැටි වළඳක 'පොංගල්' බත් පිසීම මෙහි සිරිතයි." },
    image: "https://images.unsplash.com/photo-1563811809228-3e4e6f9877b0?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Expressing gratitude to nature and the sun for a bountiful harvest.", SI: "සාර්ථක අස්වැන්නක් ලබා දීම වෙනුවෙන් සොබාදහමට සහ හිරුට කෘතඥතාව පළ කිරීම." }
  },
  {
    id: "deepavali",
    name: { EN: "Deepavali", SI: "දීපාවලි" },
    date: { EN: "October / November", SI: "ඔක්තෝබර් / නොවැම්බර්" },
    description: { EN: "The Hindu Festival of Lights, where homes are adorned with xlamps and colorful Kolam floor art.", SI: "හින්දු භක්තිකයන්ගේ ආලෝකයේ උත්සවයයි. නිවෙස් පහන්වලින් සහ අලංකාර කෝලම් රටාවලින් හැඩගන්වනු ලැබේ." },
    image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Symbolizes the spiritual victory of light over darkness and good over evil.", SI: "අඳුර පරදා ආලෝකයත්, අයහපත පරදා යහපතත් ජය ගැනීම මෙයින් සංකේතවත් වේ." }
  },
  {
    id: "poson",
    name: { EN: "Poson Poya", SI: "පොසොන් පොහොය" },
    date: { EN: "June", SI: "ජූනි" },
    description: { EN: "Celebrated centered around Mihintale, commemorating the introduction of Buddhism to Sri Lanka by Arahat Mahinda.", SI: "මහින්දාගමනය සිහිපත් කරමින් මිහින්තලය කේන්ද්‍ර කරගෙන පවත්වනු ලබන ඉතා වැදගත් ආගමික උත්සවයකි." },
    image: "https://images.unsplash.com/photo-1578503117502-3162799f9392?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Marks the arrival of Buddhism and the transformation of Sri Lankan culture.", SI: "ශ්‍රී ලංකාවට බුදුදහම ලැබීම සහ ලාංකීය සංස්කෘතියේ නව පෙරළියක් ඇති වීම සිහිපත් කරයි." }
  },
  {
    id: "nallur",
    name: { EN: "Nallur Festival", SI: "නල්ලූර් මංගල්‍යය" },
    date: { EN: "August / September", SI: "අගෝස්තු / සැප්තැම්බර්" },
    description: { EN: "A 25-day grand festival at the Nallur Kandaswamy Kovil in Jaffna, showcasing incredible Tamil heritage.", SI: "යාපනයේ නල්ලූර් කන්දසාමි කෝවිලේ පැවැත්වෙන දින 25ක උත්කර්ෂවත් උත්සවයකි. දෙමළ සංස්කෘතියේ අභිමානය මෙහිදී විදහා දැක්වේ." },
    image: "https://plus.unsplash.com/premium_photo-1680883415362-238794b19dde?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "The longest festival in Sri Lanka, honoring Lord Murugan with discipline and devotion.", SI: "මුරුගන් දෙවිඳුන්ට ගෞරවය දැක්වීම සඳහා පවත්වනු ලබන ශ්‍රී ලංකාවේ දීර්ඝතම උත්සවයයි." }
  },
  {
    id: "kataragama",
    name: { EN: "Kataragama Esala Festival", SI: "කතරගම ඇසළ මංගල්‍යය" },
    date: { EN: "July / August", SI: "ජූලි / අගෝස්තු" },
    description: { EN: "A unique multicultural festival where Buddhists, Hindus, and Muslims gather for fire-walking and water-cutting ceremonies.", SI: "බෞද්ධ, හින්දු සහ මුස්ලිම් බැතිමතුන් එක්ව පවත්වනු ලබන, ගිනි පෑගීම සහ දිය කැපීමේ චාරිත්‍රවලින් සමන්විත සුවිශේෂී උත්සවයකි." },
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Honors the God Kataragama (Skanda-Murugan) and celebrates spiritual harmony.", SI: "කතරගම දෙවියන්ට උපහාර දැක්වීම සහ ආගමික සහජීවනය මෙයින් නිරූපණය වේ." }
  },
  {
    id: "christmas",
    name: { EN: "Christmas in Negombo", SI: "මීගමුවේ නත්තල් උත්සවය" },
    date: { EN: "December", SI: "දෙසැම්බර්" },
    description: { EN: "Negombo, known as 'Little Rome', celebrates Christmas with grand church masses, street carols, and coastal fireworks.", SI: "නත්තල් සමයේදී 'පුංචි රෝමය' ලෙස හැඳින්වෙන මීගමුව අලංකාර දේවස්ථාන සැරසිලි සහ විචිත්‍රවත් වීදි සංදර්ශනවලින් පිරී යයි." },
    image: "https://images.unsplash.com/photo-1544161515-4af6b1d8e1c3?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "A time of peace, joy, and the vibrant display of Sri Lanka's Christian heritage.", SI: "සාමය සහ ප්‍රීතිය බෙදා හදා ගනිමින් ලාංකීය කිතුනු උරුමය විදහා දක්වන කාලයකි." }
  },
  {
    id: "mahashivratri",
    name: { EN: "Mahashivratri", SI: "මහා ශිවරාත්‍රී" },
    date: { EN: "February / March", SI: "පෙබරවාරි / මාර්තු" },
    description: { EN: "The 'Great Night of Shiva' is celebrated with overnight vigils, fasting, and prayers at ancient Hindu Kovils.", SI: "ශිව දෙවියන් උදෙසා පවත්වනු ලබන රාත්‍රී කාලය පුරා පැවැත්වෙන විශේෂ වන්දනා සහ පූජා කර්මයන්ගෙන් සමන්විත උත්සවයකි." },
    image: "https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "Symbolizes the overcoming of darkness and ignorance in life and the world.", SI: "ජීවිතයේ සහ ලෝකයේ පවතින නොදැනුවත්කම සහ අඳුර දුරු කිරීම මෙයින් සංකේතවත් වේ." }
  },
  {
    id: "madhu",
    name: { EN: "Madhu Church Festival", SI: "මඩු මංගල්‍යය" },
    date: { EN: "August", SI: "අගෝස්තු" },
    description: { EN: "One of the most sacred Catholic shrines in the northern region, attracting thousands of pilgrims to the deep jungles of Mannar.", SI: "මන්නාරමේ ඝන වනාන්තරය මැද පිහිටි ඉතාමත් පූජනීය මඩු පල්ලියට වන්දනාකරුවන් දහස් ගණනක් පැමිණෙන උත්සවයකි." },
    image: "https://images.unsplash.com/photo-1610486745145-6a56b77c3a0b?auto=format&fit=crop&w=800&q=80",
    significance: { EN: "A symbol of protection and unity, bringing together various ethnic groups through faith.", SI: "ආරක්ෂාවේ සහ එකමුතුකමේ සංකේතයක් වන අතර, ඇදහිල්ල තුළින් විවිධ ජනකොටස් එක් කරයි." }
  }
];

export const TEA_DATA: TeaExperience[] = [
  {
    id: "black-tea",
    name: { EN: "Ceylon Black Tea", SI: "ලංකා කළු තේ" },
    description: { EN: "The world-famous full-bodied tea known for its crisp, citrusy aroma.", SI: "මුළු ලොවම දන්නා ලාංකීය අනන්‍යතාවය විදහා දක්වන කළු තේ." },
    image: "https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&w=800&q=80",
    type: 'variety',
    fact: { EN: "Sri Lanka is the world's 4th largest tea producer.", SI: "ශ්‍රී ලංකාව ලොව සිව්වන විශාලතම තේ නිෂ්පාදකයා වේ." }
  },
  {
    id: "silver-tips",
    name: { EN: "Silver Tips (White Tea)", SI: "රිදී බිසෝ (සුදු තේ)" },
    description: { EN: "The most expensive variety, hand-picked and sun-dried for a delicate, subtle flavor.", SI: "ඉතාමත් සියුම් රසයකින් යුත්, අතින් නෙලා හිරු රශ්මියෙන් වේලා ගන්නා වටිනා තේ වර්ගයකි." },
    image: "https://images.unsplash.com/photo-1594631252845-29fc45865157?auto=format&fit=crop&w=800&q=80",
    type: 'variety',
    fact: { EN: "Contains high levels of antioxidants.", SI: "ප්‍රතිඔක්සිකාරක ඉතා ඉහළ මට්ටමක පවතී." }
  },
  {
    id: "withering",
    name: { EN: "The Withering Process", SI: "තේ දලු මැලවීම" },
    description: { EN: "Freshly plucked leaves are spread on troughs to reduce moisture content.", SI: "නැවුම් ලෙස නෙලාගත් තේ දලු ජල ප්‍රමාණය අඩු කිරීම සඳහා මැලවීමට ඉඩ හරිනු ලැබේ." },
    image: "https://images.unsplash.com/photo-1580221376840-a151b5c2d3a3?auto=format&fit=crop&w=800&q=80",
    type: 'process',
    fact: { EN: "Moisture is reduced by 50-60%.", SI: "ජල ප්‍රමාණය 50-60% දක්වා අඩු කරයි." }
  },
  {
    id: "nuwara-eliya",
    name: { EN: "Nuwara Eliya Estates", SI: "නුවරඑළිය තේ වතු" },
    description: { EN: "The 'Champagne of Teas' comes from this high-altitude region.", SI: "උසින් වැඩිම kලාපයේ නිපදවන 'තේ වල ෂැම්පේන්' ලෙස හැඳින්වෙන තේ මෙහි නිපදවේ." },
    image: "https://images.unsplash.com/photo-1558446791-ac5fec3caddf?auto=format&fit=crop&w=800&q=80",
    type: 'location',
    fact: { EN: "Altitude: Above 6,000 feet.", SI: "මුහුදු මට්ටමේ සිට අඩි 6,000 කට වඩා වැඩිය." }
  },
  {
    id: "dimbula",
    name: { EN: "Dimbula Region", SI: "දිඹුල කලාපය" },
    description: { EN: "Produced during the first quarter of the year, offering a refreshing, clean taste.", SI: "වසරේ පළමු මාස හතර තුළ නිපදවන පිරිසිදු රසයකින් යුත් තේ වර්ගයකි." },
    image: "https://images.unsplash.com/photo-1566893298691-bfd8e0e62e10?auto=format&fit=crop&w=800&q=80",
    type: 'location',
    fact: { EN: "Known for its golden hue.", SI: "රන්වන් පැහැය සඳහා ප්‍රසිද්ධය." }
  },
  {
    id: "uva",
    name: { EN: "Uva Highlands", SI: "ඌව උස්බිම්" },
    description: { EN: "Unique climate during the 'Cachar' season creates a distinct, pungent flavor.", SI: "විශේෂිත දේශගුණික තත්ත්වයන් යටතේ නිපදවන සුවිශේෂී තද රසයකින් යුත් තේ වර්ගයකි." },
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    type: 'location',
    fact: { EN: "Loved by European markets.", SI: "යුරෝපීය වෙළඳපොලේ වැඩි ඉල්ලුමක් පවතී." }
  },
  {
    id: "fermentation",
    name: { EN: "Oxidation (Fermentation)", SI: "ඔක්සිකරණය" },
    description: { EN: "The step that defines whether a tea will be black, green, or oolong.", SI: "තේ කොළය කළු, කොළ හෝ ඌලොන්ග් වන්නේදැයි තීරණ කරන පියවරයි." },
    image: "https://images.unsplash.com/photo-1594631252845-29fc45865157?auto=format&fit=crop&w=800&q=80",
    type: 'process',
    fact: { EN: "Temperature control is critical here.", SI: "මෙහිදී උෂ්ණත්වය පාලනය කිරීම ඉතා වැදගත් වේ." }
  },
  {
    id: "rolling",
    name: { EN: "Rolling the Leaf", SI: "දලු පෙරලීම" },
    description: { EN: "Breaking the cells to release natural juices for oxidation.", SI: "ඔක්සිකරණය සඳහා ස්වභාවික යුෂ මුදා හැරීමට සෛල බිඳ දැමීම." },
    image: "https://images.unsplash.com/photo-1514483127413-f72f273478c3?auto=format&fit=crop&w=800&q=80",
    type: 'process',
    fact: { EN: "Done using heavy machinery or hand.", SI: "යන්ත්‍ර සූත්‍ර හෝ අතින් සිදු කරනු ලැබේ." }
  },
  {
    id: "green-tea",
    name: { EN: "Ceylon Green Tea", SI: "ලංකා කොළ තේ" },
    description: { EN: "Processed to prevent oxidation, retaining a nutty, malty profile.", SI: "ඔක්සිකරණය වැලැක්වීම සඳහා සකස් කරන ලද ගුණදායක තේ වර්ගයකි." },
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80",
    type: 'variety',
    fact: { EN: "Rich in vitamins.", SI: "විටමින් බහුල වේ." }
  },
  {
    id: "low-grown",
    name: { EN: "Low-Grown Varieties", SI: "පහතරට තේ" },
    description: { EN: "Grown in warmer regions, producing a strong, dark xinfusion used for blends.", SI: "උණුසුම් ප්‍රදේශවල වැවෙන, තද වර්ණයෙන් යුත් ප්‍රබල තේ වර්ගයකි." },
    image: "https://images.unsplash.com/photo-1627662168280-456073809214?auto=format&fit=crop&w=800&q=80",
    type: 'location',
    fact: { EN: "Mainly exported to the Middle East.", SI: "ප්‍රධාන වශයෙන් මැද පෙරදිගට අපනයනය කරයි." }
  }
];

export const PHRASEBOOK_DATA: Phrase[] = [
  { id: '1', english: "Hello / May you live long", sinhala: "ආයුබෝවන්", transliteration: "Ayubowan", category: 'greeting' },
  { id: '2', english: "Thank you", sinhala: "ස්තූතියි", transliteration: "Stutiyi", category: 'greeting' },
  { id: '3', english: "Yes", sinhala: "ඔව්", transliteration: "Ow", category: 'greeting' },
  { id: '4', english: "No", sinhala: "නැත", transliteration: "Nætha", category: 'greeting' },
  { id: '5', english: "How are you?", sinhala: "කොහොමද සැප දුක්?", transliteration: "Kohomadha sæpa dhuka?", category: 'greeting' },
  { id: '6', english: "Water", sinhala: "වතුර", transliteration: "Vathura", category: 'dining' },
  { id: '7', english: "Food", sinhala: "කෑම", transliteration: "Kǣma", category: 'dining' },
  { id: '8', english: "Very tasty", sinhala: "හරිම රසයි", transliteration: "Harima rasayi", category: 'dining' },
  { id: '9', english: "Not spicy please", sinhala: "සැර නැතුව දෙන්න", transliteration: "Særa næthuva dhenna", category: 'dining' },
  { id: '10', english: "The bill, please", sinhala: "බිල දෙන්න", transliteration: "Bila dhenna", category: 'dining' },
  { id: '11', english: "Where is the bathroom?", sinhala: "වැසිකිළිය කොහේද?", transliteration: "Væsikiliya kohēdha?", category: 'emergency' },
  { id: '12', english: "Help!", sinhala: "උදව් කරන්න!", transliteration: "Udhavu karanna!", category: 'emergency' },
  { id: '13', english: "Call a doctor", sinhala: "දොස්තර කෙනෙක්ට කතා කරන්න", transliteration: "Dosthara kenekta kathā karanna", category: 'emergency' },
  { id: '14', english: "How much is this?", sinhala: "මේක කීයද?", transliteration: "Mēka kīyadha?", category: 'shopping' },
  { id: '15', english: "Too expensive", sinhala: "ගොඩක් ගණන්", transliteration: "Godak ganan", category: 'shopping' },
];

export const MEDICINE_DATA: TraditionalMedicine[] = [
  {
    id: "kohomba",
    type: 'herb',
    name: { EN: "Kohomba (Neem)", SI: "කොහොඹ" },
    description: { EN: "Known as the 'Village Pharmacy', Neem is revered for its potent antibacterial and antifungal properties.", SI: "මෙය දේශීය වෛද්‍ය විද්‍යාවේදී විෂබීජ නාශකයක් ලෙස ඉතාමත් වැදගත් ශාකයකි." },
    image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Treats skin conditions and detoxifies the blood.", SI: "චර්ම රෝග සමනය කරන අතර රුධිරය පිරිසිදු කරයි." },
    usage: { EN: "Oil, leaf paste, or decoctions.", SI: "තෙල්, කොළ මැල්ලුම හෝ කසාය ලෙස." }
  },
  {
    id: "gotukola",
    type: 'herb',
    name: { EN: "Gotu Kola (Pennywort)", SI: "ගොටුකොළ" },
    description: { EN: "The 'Herb of Longevity', widely consumed in Sri Lanka for its brain-boosting and rejuvenating qualities.", SI: "මතක ශක්තිය වර්ධනය කිරීමට සහ සිරුර ප්‍රබෝධමත් කිරීමට උපකාරී වන ඖෂධීය පලා වර්ගයකි." },
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Enhances memory, reduces anxiety, and aids skin healing.", SI: "මතක ශක්තිය වැඩිකරන අතර මානසික ආතතිය අඩු කරයි." },
    usage: { EN: "Daily salad (Sambol) or herbal tea.", SI: "සම්බෝලයක් ලෙස හෝ ඖෂධීය පානයක් ලෙස." }
  },
  {
    id: "kurundu",
    type: 'herb',
    name: { EN: "Kurundu (Cinnamon)", SI: "කුරුඳු" },
    description: { EN: "True Ceylon Cinnamon is not just a spice but a powerful medicine used for centuries to balance metabolism.", SI: "නියම ලංකා කුරුඳු යනු කුළුබඩුවක් පමණක් නොව ශරීරයේ පරිවෘත්තීය ක්‍රියා පාලනය කරන ඖෂධයකි." },
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Lowers blood sugar and has anti-inflammatory properties.", SI: "රුධිරයේ සීනි මට්ටම පාලනය කරන අතර ප්‍රදාහය සමනය කරයි." },
    usage: { EN: "Brewed in tea or used as an essential oil.", SI: "තේ සමඟ හෝ අත්‍යවශ්‍ය තෙල් වර්ගයක් ලෙස." }
  },
  {
    id: "inguru",
    type: 'herb',
    name: { EN: "Inguru (Ginger)", SI: "ඉඟුරු" },
    description: { EN: "A staple in Hela Wedakama, used to ignite the 'Agni' (digestive fire) and combat respiratory issues.", SI: "ජීරණ පද්ධතියේ ක්‍රියාකාරිත්වය සහ ශ්වසන රෝග සඳහා භාවිතා වන අත්‍යවශ්‍ය ඖෂධයකි." },
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Relieves nausea, indigestion, and common colds.", SI: "අජීර්ණය, වමනය සහ සෙම්ප්‍රතිශ්‍යාව සුව කරයි." },
    usage: { EN: "Fresh juice mixed with honey or dried powder.", SI: "මීපැණි සමඟ මිශ්‍ර කළ යුෂ හෝ වියළි කුඩු ලෙස." }
  },
  {
    id: "kaha",
    type: 'herb',
    name: { EN: "Kaha (Turmeric)", SI: "කහ" },
    description: { EN: "The golden healer, essential for its anti-septic and immune-boosting capabilities in ancient Lanka.", SI: "විෂබීජ නාශකයක් ලෙස සහ ප්‍රතිශක්තිකරණය වර්ධනය කිරීමට පැරණි ලංකාවේ සිට භාවිතා වේ." },
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Powerful anti-inflammatory and natural antiseptic.", SI: "ප්‍රබල ප්‍රතිප්‍රදාහ නාශකයක් සහ ස්වභාවික විෂබීජ නාශකයකි." },
    usage: { EN: "Mixed with warm milk or applied as a paste.", SI: "උණුසුම් කිරි සමඟ හෝ ආලේපනයක් ලෙස." }
  },
  {
    id: "shirodhara",
    type: 'treatment',
    name: { EN: "Shirodhara", SI: "ශිරෝධාරා" },
    description: { EN: "A divine treatment where warm herbal oil is poured in a continuous stream over the 'third eye' on the forehead.", SI: "නළල මැදට ඖෂධීය තෙල් ධාරාවක් වත් කරමින් සිදුකරන ඉතාමත් සන්සුන් ප්‍රතිකාරයකි." },
    image: "https://images.unsplash.com/photo-1544161515-4af6b1d8e1c3?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Relieves stress, insomnia, and migraines.", SI: "මානසික ආතතිය, නින්ද නොයාම සහ ඉරුවාරදය සුව කරයි." },
    usage: { EN: "A specialized therapy session lasting 45-60 minutes.", SI: "විනාඩි 45-60 දක්වා පවත්වන විශේෂිත ප්‍රතිකාරයකි." }
  },
  {
    id: "pinda-sweda",
    type: 'treatment',
    name: { EN: "Pinda Sweda", SI: "පිණ්ඩ ස්වේද" },
    description: { EN: "A dynamic therapy using warm boluses filled with herbal rice or powders to massage the body.", SI: "ඖෂධීය බත් හෝ කුඩු පුරවන ලද පොට්ටනි මගින් සිරුර තැවීම සහ පිරිමැදීම සිදුකරන ප්‍රතිකාරයකි." },
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Eases joint pain, muscle stiffness, and improves circulation.", SI: "සන්ධි වේදනා, මාංශ පේශි තද ගතිය අඩු කරන අතර රුධිර ගමනාගමනය වැඩි කරයි." },
    usage: { EN: "Full body massage with herbal fomentation.", SI: "සිරුර පුරා සිදුකරන ඖෂධීය තැවීම් ප්‍රතිකාරයකි." }
  },
  {
    id: "hela-wedakama",
    type: 'treatment',
    name: { EN: "Hela Wedakama", SI: "හෙළ වෙදකම" },
    description: { EN: "The indigenous medical system of Sri Lanka, predating Ayurveda, focusing on spiritual and physical harmony.", SI: "ආයුර්වේදයටත් පෙර ලංකාවේ පැවති, ආධ්‍යාත්මික සහ ශාරීරික සමතුලිතතාවය පදනම් කරගත් වෛද්‍ය ක්‍රමයකි." },
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Holistic healing of deep-rooted ailments.", SI: "දීර්ඝකාලීන රෝග මූලිකවම සුව කිරීම සිදුකරයි." },
    usage: { EN: "Individualized lifestyle and herbal prescriptions.", SI: "පුද්ගලයාට සරිලන ජීවන රටා සහ ඖෂධ ලබා දේ." }
  },
  {
    id: "vashpa-kuti",
    type: 'treatment',
    name: { EN: "Vashpa Kuti (Steam Bath)", SI: "වාෂ්ප කුටි" },
    description: { EN: "An ancient herbal steam bath where the patient sits in a wooden chamber filled with medicinal vapors.", SI: "ඖෂධීය වාෂ්පයෙන් පිරුණු ලී කුටියක් තුළ හිඳිමින් සිදුකරන ස්වභාවික ප්‍රතිකාරයකි." },
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Opens pores, detoxifies the skin, and relieves respiratory congestion.", SI: "සිරුරේ විෂ ඉවත් කරන අතර ශ්වසන අපහසුතා මගහරවයි." },
    usage: { EN: "15-20 minute steam therapy session.", SI: "විනාඩි 15-20 ක කාලයක් පවත්වන වාෂ්ප ප්‍රතිකාරයකි." }
  },
  {
    id: "abhyanga",
    type: 'treatment',
    name: { EN: "Abhyanga Massage", SI: "අභ්‍යංග සම්බාහනය" },
    description: { EN: "A synchronized whole-body massage with specific medicated oils tailored to the body type.", SI: "සිරුරේ ස්වභාවයට අනුව තෝරාගත් ඖෂධීය තෙල් මගින් සිදුකරන සම්පූර්ණ සිරුරේ සම්බාහනයකි." },
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    benefits: { EN: "Improves skin health, reduces fatigue, and calms the nervous system.", SI: "සමේ සෞඛ්‍යය වර්ධනය කරන අතර ස්නායු පද්ධතිය සන්සුන් කරයි." },
    usage: { EN: "Daily or weekly oil application ritual.", SI: "දිනපතා හෝ සතිපතා සිදුකරන තෙල් ආලේපන චාරිත්‍රයකි." }
  }
];

export const FOODS_DATA: Food[] = [
  {
    id: "hoppers",
    name: { EN: "Hoppers (Appa)", SI: "ආප්ප" },
    description: { EN: "Bowl-shaped pancakes made from fermented rice flour and coconut milk, often served with a whole egg in the middle.", SI: "හාල් පිටි සහ පොල් කිරි වලින් සාදන ලද බඳුනක හැඩැති මෘදු ආහාරයකි." },
    image: "https://images.unsplash.com/photo-1627662168280-456073809214?auto=format&fit=crop&w=800&q=80",
    spiciness: 1,
    tasteProfile: { EN: "Crispy edges with a soft, creamy center.", SI: "දාරයේ කරකුටු ගතිය සහ මැද මෘදු බව." },
    ingredients: [{ EN: "Rice flour", SI: "හාල් පිටි" }, { EN: "Coconut milk", SI: "පොල් කිරි" }, { EN: "Toddy (for fermentation)", SI: "රා" }]
  },
  {
    id: "kottu",
    name: { EN: "Kottu Roti", SI: "කොත්තු රොටි" },
    description: { EN: "The ultimate street food: chopped Godamba roti mixed with vegetables, egg, spices, and your choice of meat.", SI: "ගෝදම්බ රොටි කැබලි වලට කපා එළවළු, බිත්තර සහ කුළුබඩු සමඟ මිශ්‍ර කර සාදන ජනප්‍රිය ආහාරයකි." },
    image: "https://images.unsplash.com/photo-1616070152767-3eb99cf10509?auto=format&fit=crop&w=800&q=80",
    spiciness: 4,
    tasteProfile: { EN: "Hearty, spicy, and full of aromatic textures.", SI: "කුළුබඩු සුවඳ රැඳුණු තෘප්තිමත් ආහාරයකි." },
    ingredients: [{ EN: "Godamba Roti", SI: "රොටි" }, { EN: "Curry", SI: "හොදි" }, { EN: "Ginger/Garlic", SI: "ඉඟුරු/සුදුළුණු" }]
  },
  {
    id: "pol-sambol",
    name: { EN: "Pol Sambol", SI: "පොල් සම්බෝල" },
    description: { EN: "A fiery relish made of freshly grated coconut, chilies, onion, xlime juice, and Maldive fish.", SI: "පොල්, මිරිස්, ලූණු සහ දෙහි යුෂ මිශ්‍ර කර සාදන ලද රසවත් සම්බෝලයකි." },
    image: "https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&w=800&q=80",
    spiciness: 5,
    tasteProfile: { EN: "Zesty, spicy, and tropical.", SI: "දැවෙන මිරිස් රස සහ දෙහි ඇඹුල් රසය." },
    ingredients: [{ EN: "Fresh Coconut", SI: "නැවුම් පොල්" }, { EN: "Red Chili", SI: "රතු මිරිස්" }, { EN: "Lime", SI: "දෙහි" }]
  },
  {
    id: "kiribath",
    name: { EN: "Kiribath (Milk Rice)", SI: "කිරි බත්" },
    description: { EN: "Rice cooked with thick coconut milk, a ceremonial dish served at every auspicious moment in Sri Lanka.", SI: "පොල් කිරි යොදා පිසින ලද බත්, ලාංකීය සංස්කෘතික උත්සව වලදී නැතිවම බැරි ආහාරයකි." },
    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80",
    spiciness: 1,
    tasteProfile: { EN: "Creamy, mild, and comforting.", SI: "පොල් කිරි රසයෙන් පිරි මෘදු ආහාරයකි." },
    ingredients: [{ EN: "White Rice", SI: "සුදු හාල්" }, { EN: "Thick Coconut Milk", SI: "උකු පොල් කිරි" }, { EN: "Salt", SI: "ලුණු" }]
  },
  {
    id: "ambul-thiyal",
    name: { EN: "Fish Ambul Thiyal", SI: "මාළු ඇඹුල් තියල්" },
    description: { EN: "A unique sour fish curry made with firm fish, heavily spiced with black pepper and dried Goraka for its signature tangy flavor.", SI: "ගම්මිරිස් සහ ගොරකා යොදා සාදන ලද ලාංකීය අනන්‍යතාවය විදහා දක්වන මාළු ව්‍යංජනයකි." },
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    spiciness: 4,
    tasteProfile: { EN: "Sour, spicy, and peppery.", SI: "ඇඹුල් සහ ගම්මිරිස් රස මුසු වූ විශේෂිත රසය." },
    ingredients: [{ EN: "Tuna or Bonito", SI: "කෙලවල්ලා හෝ බලයා" }, { EN: "Goraka", SI: "ගොරකා" }, { EN: "Black Pepper", SI: "ගම්මිරිස්" }]
  }
];

export const HERITAGE_MUSIC_DATA: HeritageMusic[] = [
  // INSTRUMENTS
  {
    id: "geta-beraya",
    type: 'instrument',
    name: { EN: "Geta Beraya", SI: "ගැට බෙරය" },
    description: { EN: "The primary drum of the Kandyan hill country, named for its 'knotted' shape. It is carved from Kohomba or Jak wood and traditionally used in religious festivals.", SI: "කඳුකර උඩරට ප්‍රධාන බෙරයයි. මෙහි ගැට සහිත හැඩය නිසා මෙය ගැට බෙරය නම් වේ." },
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Kandyan Highlands", SI: "මහනුවර උඩරට" },
    significance: { EN: "Used in the Esala Perahera and other sacred rituals.", SI: "ඇසළ පෙරහැර සහ අනෙකුත් පූජනීය චාරිත්‍ර සඳහා භාවිතා වේ." }
  },
  {
    id: "yak-beraya",
    type: 'instrument',
    name: { EN: "Yak Beraya", SI: "යක් බෙරය" },
    description: { EN: "A cylindrical drum used in low-country rituals (Tovil) to drive away evil spirits. It produces a deep, haunting rhythmic beat.", SI: "පහතරට ශාන්ති කර්ම (තොවිල්) සඳහා භාවිතා කරන බෙරයයි. මෙය යකුන් පලවා හැරීමේ චාරිත්‍ර සඳහා භාවිතා වේ." },
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Southern Coastal Belt", SI: "දකුණු වෙරළ තීරය" },
    significance: { EN: "Integral to traditional healing dances and exorcisms.", SI: "පාරම්පරික සුව කිරීමේ නැටුම් සහ යැදුම් සඳහා අත්‍යවශ්‍ය වේ." }
  },
  {
    id: "dawula",
    type: 'instrument',
    name: { EN: "Dawula", SI: "දවුල" },
    description: { EN: "The main drum of the Sabaragamuwa region. Played with a stick (Kaduppuwa) on one side and the hand on the other.", SI: "සබරගමුව පළාතට ආවේණික බෙරයයි. මෙය එක් පැත්තකින් kඩුප්පුව නම් කූරෙන්ද, අනෙක් පැත්තෙන් අතින්ද වාදනය කරයි." },
    image: "https://images.unsplash.com/photo-1514483127413-f72f273478c3?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Sabaragamuwa Province", SI: "සබරගමුව" },
    significance: { EN: "Used frequently in Buddhist temple ceremonies.", SI: "බෞද්ධ විහාරස්ථාන වල පවත්වන පුදපූජා සඳහා නිතර භාවිතා වේ." }
  },
  {
    id: "thammattama",
    type: 'instrument',
    name: { EN: "Thammattama", SI: "තම්මැට්ටම" },
    description: { EN: "A pair of twin drums played with two sticks. It provides the high-pitched accompaniment in temple drumming groups.", SI: "බෙර දෙකක එකතුවකි. මෙය කූරු දෙකක් ආධාරයෙන් වාදනය කරන අතර විහාරස්ථානවල 'හේවිසි' වාදනය සඳහා යොදා ගනී." },
    image: "https://images.unsplash.com/photo-1465821508027-567b72ee199d?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Ancient Temples", SI: "පුරාණ විහාරස්ථාන" },
    significance: { EN: "Essential for 'Hevisi' or temple announcement music.", SI: "හේවිසි වාදනය සඳහා නැතිවම බැරි උපකරණයකි." }
  },
  {
    id: "udekkiya",
    type: 'instrument',
    name: { EN: "Udekkiya", SI: "උඩැක්කිය" },
    description: { EN: "An hourglass-shaped drum often used by dancers. The pitch can be modulated by squeezing the strings on the side.", SI: "වැලි ඔරලෝසුවක හැඩයෙන් යුත් කුඩා බෙරයකි. නර්තන ශිල්පීන් මෙය තාලයට අනුව වයමින් නර්තනයේ යෙදේ." },
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Kandyan Royal Courts", SI: "රාජ සභා ඇසුරෙන්" },
    significance: { EN: "One of the four traditional musical instruments of Lanka.", SI: "ලංකාවේ පාරම්පරික සංගීත භාණ්ඩ හතරෙන් එකකි." }
  },
  {
    id: "rabana",
    type: 'instrument',
    name: { EN: "Rabana", SI: "රබාන" },
    description: { EN: "A large circular drum often played by several women during the Sinhala and Tamil New Year festivals.", SI: "සිංහල සහ දෙමළ අලුත් අවුරුදු කාලයේදී කාන්තාවන් කිහිප දෙනෙකු එක්ව වාදනය කරන විශාල වටකුරු බෙරයකි." },
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Rural Villages", SI: "ගම්බද පරිසරය" },
    significance: { EN: "A symbol of community bonding and festive joy.", SI: "සමාජීය එකමුතුකම සහ උත්සව සිරිය නිරූපණය කරයි." }
  },
  {
    id: "horaneva",
    type: 'instrument',
    name: { EN: "Horaneva", SI: "හොරණෑව" },
    description: { EN: "A traditional oboe-like wind instrument that accompanies temple drums. It has a powerful, shrill sound.", SI: "බෙර වාදනයට සහය වන පිඹින සංගීත භාණ්ඩයකි. මෙහි ඉතා තියුණු හඬක් පවතී." },
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Historic Ritual Sites", SI: "ඓතිහාසික පූජා භූමි" },
    significance: { EN: "Used to signal the start of sacred rituals.", SI: "පූජනීය චාරිත්‍ර ආරම්භ කිරීමේ සලකුණ ලෙස භාවිතා වේ." }
  },
  {
    id: "bummadiya",
    type: 'instrument',
    name: { EN: "Bummadiya", SI: "බුම්මඩිය" },
    description: { EN: "A pot-shaped drum made of clay and covered with lizard or monkey skin. Used primarily in harvest songs.", SI: "මැටි කළයක හැඩය ඇති බෙරයකි. මෙය අතීතයේදී ගොයම් කපන කාලයේදී ගැයූ ජනකවි සඳහා යොදා ගැනිණි." },
    image: "https://images.unsplash.com/photo-1514483127413-f72f273478c3?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Agricultural Villages", SI: "කෘෂිකාර්මික ගම්මාන" },
    significance: { EN: "Traditional accompaniment for 'Goyam Kavi' (harvest songs).", SI: "ගොයම් කවි සහ ජන ගී සඳහා තාලය ලබා දෙයි." }
  },

  // SONGS (JANA KAVI)
  {
    id: "pel-kavi",
    type: 'song',
    name: { EN: "Pel Kavi (Watch-hut Songs)", SI: "පැල් කවි" },
    description: { EN: "Melancholic verses sung by farmers at night while guarding their crops from wild animals. These songs expressed loneliness, fear, and devotion.", SI: "ගොවීන් රාත්‍රී කාලයේදී වනසතුන්ගෙන් සිය වගා බිම් ආරක්ෂා කරගන්නා අතරතුර තනිකම සහ බිය මකාගැනීම සඳහා ගැයූ කවි වේ." },
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Ancient Rice Paddies", SI: "පැරණි කුඹුරු යායවල්" },
    significance: { EN: "A reflection of the spiritual and physical hardships of ancient agrarian life.", SI: "පැරණි ගොවි ජීවිතයේ දුක්ගැහැට සහ ආධ්‍යාත්මික බැඳීම විදහා දක්වයි." },
    sampleLyrics: {
      EN: "Deep in the dark of the silent night,\nBeneath the hut's dim flickering light,\nWith gods as witness to my plight,\nI guard the fields with all my might.",
      SI: "සතර වරම් දෙවි පිහිටෙන් පැල් රකිමී\nනපුරු සතුන්ගෙන් බෝගය බේරා ගනිමී\nනෙතට නිදිමතක් කොයි දෙසකින් පැමිණෙතී\nසඳ දෙවියන් බලා මට සැනසුම ලබා දෙමී"
    }
  },
  {
    id: "goyam-kavi",
    type: 'song',
    name: { EN: "Goyam Kavi (Harvest Songs)", SI: "ගොයම් කවි" },
    description: { EN: "Rhythmic and energetic songs sung collectively during the harvesting of paddy. They helped maintain a steady work pace and fostered community spirit.", SI: "ගොයම් කපන කාලයේදී සාමූහිකව ගයන ලද උද්‍යෝගිමත් කවි වේ. මෙයින් ගොවීන්ගේ වෙහෙස නිවී ගිය අතර වැඩ වේගවත් විය." },
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Rural Dry Zone", SI: "වියළි කලාපීය ගම්මාන" },
    significance: { EN: "Symbolizes the abundance and celebration of a successful harvest.", SI: "සාර්ථක අස්වැන්නක සතුට සහ සාමූහිකත්වය නිරූපණය කරයි." },
    sampleLyrics: {
      EN: "Behold the golden fields of grain,\nThe fruit of sweat and monsoon rain,\nWith joyful hearts and rhythmic strain,\nWe bring the harvest home again.",
      SI: "රන්වන් කරලින් බර වූ කුඹුරේ\nගොයම් කපන කල සතුටුයි සංසාරේ\nවෙහෙස නිවා ගෙන සිංදු කියන යුරේ\nසැම දෙන එක් වී අස්වැන්න නෙලන අයුරේ"
    }
  },
  {
    id: "pathal-kavi",
    type: 'song',
    name: { EN: "Pathal Kavi (Mining Songs)", SI: "පතල් කවි" },
    description: { EN: "Haunting melodies sung by gemstone miners deep within the earth. The lyrics often appeal to regional deities for safety and good luck.", SI: "මැණික් පතල්කරුවන් ගැඹුරු පතල් තුළ වැඩ කරන අතරතුර ගැයූ කවි වේ. මෙහිදී බොහෝ විට දෙවියන්ගෙන් ආරක්ෂාව අයැද සිටී." },
    image: "https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Ratnapura (City of Gems)", SI: "රත්නපුරය" },
    significance: { EN: "Highlights the dangers and spiritual beliefs of the mining community.", SI: "පතල් කර්මාන්තයේ පවතින අවදානම සහ ඇදහිලි පිළිබඳව සාක්ෂි දරයි." },
    sampleLyrics: {
      EN: "In the darkness where the jewels hide,\nWith the river's spirits as our guide,\nDeep below the mountain side,\nMay fortune with us now abide.",
      SI: "දුම්බර කන්ද පාමුල පතල් කපන්නෝ\nසමන්ත කූට දෙවි බැල්ම ලබන්නෝ\nනිල් කැට රතු කැට පොළොවෙන් නෙලන්නෝ\nදුප්පත් කමට මෙලෙසට වැඩ කරන්නෝ"
    }
  },
  {
    id: "karaththa-kavi",
    type: 'song',
    name: { EN: "Karaththa Kavi (Cart Songs)", SI: "කරත්ත කවි" },
    description: { EN: "Long, drawn-out melodies sung by bullock cart drivers on their lonely journeys through thick jungles and winding mountain paths.", SI: "අතීතයේ ගැල්කරුවන් කරත්ත පදවන අතරතුර තනිකම මකාගැනීම සඳහා ගැයූ දීර්ඝ තාලයක් සහිත කවි වේ." },
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Ancient Trade Routes", SI: "පැරණි වෙළඳ මාර්ග" },
    significance: { EN: "Captured the slow pace of life and the vastness of the natural landscape.", SI: "එකල පැවති සරල ජීවන රටාව සහ සොබාදහම සමඟ තිබූ බැඳීම විදහා දක්වයි." },
    sampleLyrics: {
      EN: "The wheels they turn on dust and stone,\nThrough forest paths where trees have grown,\nA lonely song for seeds we've sown,\nOn paths that only carts have known.",
      SI: "තණ්ඩලේ දෙන්නා දෙපොලේ දක්කා ගෙන\nගාලේ ගොන්නු ලිහාලා තණ කවමින්න\nඅපේ කරත්තය කන්දට අදිනවන්න\nඅදත් අපේ පාරේ තනිකම මකමින්න"
    }
  },
  {
    id: "paru-kavi",
    type: 'song',
    name: { EN: "Paru Kavi (Raft Songs)", SI: "පාරු කවි" },
    description: { EN: "Songs of the river people who transported goods on large wooden rafts. The rhythm matched the movement of the oars and the flow of the water.", SI: "ගංගා දිගේ බඩු ප්‍රවාහනය කළ පාරුකරුවන් තාලයට අනුව ගැයූ කවි වේ. ගංගාවේ රැළි සහ පාරුවේ චලනය සමඟ මෙම කවි බැඳී පවතී." },
    image: "https://images.unsplash.com/photo-1558446791-ac5fec3caddf?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Kelani & Mahaweli Rivers", SI: "කැළණි සහ මහවැලි ගංගා" },
    significance: { EN: "Reflects the riverine culture and the logistics of ancient trade.", SI: "නදී ආශ්‍රිත සංස්කෘතිය සහ පැරණි වෙළඳාම පිළිබඳව තොරතුරු සපයයි." },
    sampleLyrics: {
      EN: "Down the river where the waters flow,\nWith the rhythm of the oars we row,\nTo the market where the traders go,\nWith stories only the rivers know.",
      SI: "කැළණි ගඟේ පාරු පදින පාරුකරෝ\nසීතල වතුරේ දෑත් තෙමා ගත්තෝ\nපොල් සහ පුවක් කොළඹට ගෙනයන්නෝ\nනිදි නැති රැයක ගඟ මැද කවි කියන්නෝ"
    }
  },
  {
    id: "bamara-kavi",
    type: 'song',
    name: { EN: "Bamara Kavi (Honey Songs)", SI: "බඹර කවි" },
    description: { EN: "Tense yet melodic chants used by honey gatherers (Veddahs and villagers) while climbing cliffs to collect wild bee honey.", SI: "බඹර පැණි නෙලීම සඳහා කඳු මුදුන් සහ විශාල ගස් වලට නගින පිරිස් බඹරුන් සන්සුන් කිරීම සඳහා ගැයූ කවි වේ." },
    image: "https://images.unsplash.com/photo-1514483127413-f72f273478c3?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Jungle Heartland", SI: "වනගත ප්‍රදේශ" },
    significance: { EN: "Showcases the bravery and environmental knowledge of forest-dwellers.", SI: "වනවාසීන්ගේ නිර්භීතකම සහ සොබාදහම පිළිබඳ දැනුම මෙයින් පැහැදිලි වේ." },
    sampleLyrics: {
      EN: "O swarm of bees in the golden hive,\nIn peace we come to keep you alive,\nWith smoke and chant our luck we derive,\nOn cliffside heights where we arrive.",
      SI: "දුම්මල මල් වල සුවඳ විහිදෙන්නේ\nයක් බෙර රාවය හාත්පස පැතිරෙන්නේ\nරෝගී සිතට සහනය ලඟා කරන්නේ\nශාන්ති කර්මයේ ආනුභාවය පෙන්වන්නේ"
    }
  },
  {
    id: "nelum-kavi",
    type: 'song',
    name: { EN: "Nelum Kavi (Planting Songs)", SI: "නෙළුම් කවි" },
    description: { EN: "Delicate songs sung by women while transplanting paddy seedlings. The songs were often high-pitched and celebratory.", SI: "ගොයම් පැළ සිටුවීමේදී (නෙළුම් කිරීමේදී) කාන්තාවන් විසින් සාමූහිකව ගැයූ ඉතා අලංකාර කවි විශේෂයකි." },
    image: "https://images.unsplash.com/photo-1580221376840-a151b5c2d3a3?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Hill Country Terraces", SI: "කඳුකර කුඹුරු යායවල්" },
    significance: { EN: "Celebrates female empowerment and agricultural fertility.", SI: "කාන්තාවන්ගේ ශක්තිය සහ කෘෂිකාර්මික සශ්‍රීකත්වය මෙයින් සංකේතවත් වේ." },
    sampleLyrics: {
      EN: "With nimble hands and songs so sweet,\nWe plant the green in mud and heat,\nA carpet of life beneath our feet,\nTill the harvest cycle is complete.",
      SI: "ඉණ වට ඇඳුම් ඇඳගෙන සැම ලියෝ\nමඩේ බැස නෙළුම් කරනා මල් ලියෝ\nසිනා මැදින් ගී ගයනා කවි ලියෝ\nලස්සන කුඹුරේ වැඩ නිම කළ ලියෝ"
    }
  },
  {
    id: "viridu",
    type: 'song',
    name: { EN: "Viridu (Ballads)", SI: "විරිදු" },
    description: { EN: "Improvisational rhyming folk songs, traditionally sung while playing the Hand Rabana. Used for storytelling and religious instruction.", SI: "අතින් වයන කුඩා රබානක් සමඟ එසැණින් ගොතා පවසන රිද්මයානුකූල කවි විශේෂයකි. මෙය බොහෝ විට කතන්දර කීමට භාවිතා කරයි." },
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Village Festivals", SI: "ගම්බද උත්සව" },
    significance: { EN: "The most popular form of rhythmic storytelling in Sri Lanka.", SI: "ලංකාවේ වඩාත්ම ජනප්‍රිය රිද්මයානුකූල කතන්දර පැවසීමේ ක්‍රමයයි." },
    sampleLyrics: {
      EN: "With the beat of the hand on the skin so tight,\nI tell you a tale of wisdom and light,\nListen my friends in the quiet of night,\nAs truth and legend now take flight.",
      SI: "රබාන අතට ගෙන තාලෙට වයන්නම්\nපරණ කතාවක් ඔබ හට පවසන්නම්\nබුදු ගුණ වනමින් ආසිරි පතන්නම්\nවිරිදු රාවයෙන් සිත පිනවන්නම්"
    }
  },
  {
    id: "vannam",
    type: 'song',
    name: { EN: "Kavi Vannam (Descriptive Songs)", SI: "වන්නම්" },
    description: { EN: "Descriptive songs from the Kandyan dance tradition, each depicting a specific animal or legendary concept through song and motion.", SI: "උඩරට නර්තන සම්ප්‍රදායට අයත්, සතුන් හෝ වෙනත් විශේෂිත සංකල්ප වර්ණනා කරමින් ගැයෙන ගීතමය කවි වේ." },
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Kandyan Royal Courts", SI: "රාජ සභා ඇසුරෙන්" },
    significance: { EN: "A bridge between classical poetry, music, and physical performance.", SI: "ශාරීලික කවිය, සංගීතය සහ නර්තනය අතර පවතින සබඳතාවය මෙයින් විදහා දක්වයි." },
    sampleLyrics: {
      EN: "Behold the elephant, majestic and slow,\nWith a rhythm that only the ancient ones know,\nThrough jungle paths where the wild rivers flow,\nA dance of the gods in the temple's glow.",
      SI: "ගජගා වන්නම තාලෙට වයමින්\nඅලි ඇතුන්ගේ ගමන පෙන්වමින්\nපාරම්පරික රිද්මය රකිමින්\nඋඩරට නර්තන අසිරිය පතුරමින්"
    }
  },
  {
    id: "tovil-kavi",
    type: 'song',
    name: { EN: "Tovil Kavi (Ritual Chants)", SI: "තොවිල් කවි" },
    description: { EN: "Powerful and rhythmic chants used in healing rituals and exorcisms. These verses are often sung to the beat of the Yak Beraya.", SI: "ශාන්ති කර්ම සහ තොවිල් වලදී භාවිතා වන බලවත් සහ රිද්මයානුකූල මන්ත්‍ර හා කවි වේ. මෙය රෝග සුව කිරීම සඳහා භාවිතා වේ." },
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    origin: { EN: "Southern Coastal Plains", SI: "දකුණු වෙරළබඩ තැන්න" },
    significance: { EN: "A blend of mysticism, psychology, and performance art.", SI: "අද්භූත විද්‍යාව, මනෝවිද්‍යාව සහ රංග කලාවේ අපූර්ව මිශ්‍රණයකි." },
    sampleLyrics: {
      EN: "With the smoke of the resin and drums in the air,\nWe call to the spirits to end all despair,\nA prayer for the sick, a rhythmic prayer,\nIn the light of the fire's flickering flare.",
      SI: "දුම්මල මල් වල සුවඳ විහිදෙන්නේ\nයක් බෙර රාවය හාත්පස පැතිරෙන්නේ\nරෝගී සිතට සහනය ලඟා කරන්නේ\nශාන්ති කර්මයේ ආනුභාවය පෙන්වන්නේ"
    }
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "sigiriya",
    name: { EN: "Sigiriya Lion Rock", SI: "සීගිරිය සිංහගිරිය" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620668165561-12f719468e27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576707833213-9804e107d667?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/shorts/j4ln2UNOnZk",
    history: {
      EN: "Sigiriya, the 'Lion Rock', is a UNESCO World Heritage site and one of the best-preserved examples of ancient urban planning. King Kashyapa (477-495 AD) selected this 200m tall rock for his royal residence to protect himself from his brother Moggallana. The site features advanced hydraulic systems, world-famous frescoes, and the Mirror Wall.",
      SI: "සීගිරිය හෙවත් 'සිංහගිරිය' යනු යුනෙස්කෝ ලෝක උරුම අඩවියක් වන අතර පැරණි නගර නිර්මාණකරණයේ විශිෂ්ටතම නිදසුනකි. කාශ්‍යප රජු (ක්‍රි.ව. 477-495) තම සොහොයුරු මුගලන්ගෙන් ආරක්ෂා වීම සඳහා තම රාජකීය වාසස්ථානය ලෙස මෙය තෝරා ගත්තේය. මෙහි ඇති ජල උද්‍යාන සහ බිතුසිතුවම් ලොව පුරා ප්‍රසිද්ධය."
    },
    shortStory: {
      EN: "The 8th Wonder of the World – A fortress in the sky surrounded by emerald water gardens.",
      SI: "ලොව අටවන පුදුමය - හරිත ජල උද්‍යානවලින් වට වූ අහස උසට විහිදුණු බලකොටුවකි."
    },
    bestTime: { EN: "December to April", SI: "දෙසැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Climb early morning (around 7 AM) to avoid the heat and crowds.", SI: "රස්නය සහ සෙනඟ මග හැරීමට උදෑසන 7 ට පමණ නැගීම ආරම්භ කරන්න." },
      { EN: "Wear comfortable walking shoes and bring plenty of water.", SI: "ඇවිදීමට පහසු පාවහන් පළඳින්න සහ ප්‍රමාණවත් තරම් ජලය රැගෙන යන්න." }
    ],
    location: "Matale District"
  },
  {
    id: "polonnaruwa",
    name: { EN: "Ancient City of Polonnaruwa", SI: "පොළොන්නරුව පුරාණ නගරය" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1656339952847-a360aee9273b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvbG9ubmFydXdhfGVufDB8fDB8fHww auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1721992499083-637b6ee0c7ba?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/SOf-pP3oD5k",
    history: {
      EN: "Polonnaruwa became the second capital of Sri Lanka after the destruction of Anuradhapura in 993 AD. It reached its zenith under King Parakramabahu I, who built the massive Parakrama Samudra reservoir. The city is famous for its stone sculptures at Gal Vihara and its sophisticated irrigation systems.",
      SI: "පොළොන්නරුව ශ්‍රී ලංකාවේ දෙවන අගනුවරයි. ක්‍රි.ව. 993 දී අනුරාධපුරය විනාශ වීමෙන් පසු මෙය අගනුවර බවට පත් විය. පළමුවන පරාක්‍රමබාහු රජුගේ කාලයේදී මෙය ඉතා දියුණු මට්ටමක පැවතිණි. මෙහි ඇති ගල් විහාරය සහ පරාක්‍රම සමුද්‍රය ඉතා සුවිශේෂී නිර්මාණ වේ."
    },
    shortStory: {
      EN: "A medieval capital where stone giants guard the sacred history of Buddhist kings.",
      SI: "බෞද්ධ රජවරුන්ගේ පූජනීය ඉතිහාසය රකින ගල් පිළිමවලින් පිරි මධ්‍යකාලීන අගනුවරයි."
    },
    bestTime: { EN: "May to September", SI: "මැයි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Rent a bicycle at the entrance to explore the vast ruins easily.", SI: "විශාල නටබුන් පරිශ්‍රය පහසුවෙන් ගවේෂණය කිරීමට බයිසිකලයක් කුලියට ගන්න." },
      { EN: "Modest clothing is required to enter the sacred sites.", SI: "පූජනීය ස්ථාන වලට ඇතුළු වීමට උචිත ඇඳුමින් සැරසී සිටිය යුතුය." }
    ],
    location: "Polonnaruwa District"
  },
  {
    id: "galle-fort",
    name: { EN: "Galle Dutch Fort", SI: "ගාල්ල ලන්දේසි කොටුව" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1654561773591-57b9413c45c0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588590928226-c95822a21219?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/RkG7E_kY7Ew",
    history: {
      EN: "Galle Fort was first built by the Portuguese in 1588, then extensively fortified by the Dutch from 1649 onwards. It is a living UNESCO World Heritage site where hundreds of families still reside within its massive granite walls. The fort survived the 2004 Tsunami with minimal damage due to its original solid engineering.",
      SI: "ගාල්ල කොටුව 1588 දී පෘතුගීසීන් විසින් ඉදිකර පසුව ලන්දේසීන් විසින් වැඩිදියුණු කරන ලදී. මෙය අදටත් මිනිසුන් වාසය කරන යුනෙස්කෝ ලෝක උරුම අඩවියකි. 2004 සුනාමි ව්‍යසනයෙන් පවා මෙයට අවම හානියක් සිදු වූයේ එහි ශක්තිමත් නිර්මාණය නිසාය."
    },
    shortStory: {
      EN: "Where colonial history meets the turquoise Indian Ocean in a maze of cobblestone streets.",
      SI: "යුරෝපීය ඉතිහාසය සහ ඉන්දියන් සාගරය හමුවන ගල් පදවන ලද වීදිවලින් පිරි ඉසව්වකි."
    },
    bestTime: { EN: "December to April", SI: "දෙසැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Visit the lighthouse and walk the ramparts at sunset.", SI: "ප්‍රදීපාගාරය නරඹා හිරු බැස යන වේලාවේ කොටු බැම්ම මත ඇවිද යන්න." },
      { EN: "Explore the boutique shops and cafes in the narrow alleys.", SI: "පටු වීදිවල ඇති කුඩා වෙළඳසැල් සහ කැෆේ ගවේෂණය කරන්න." }
    ],
    location: "Galle District"
  },
  {
    id: "adams-peak",
    name: { EN: "Adam’s Peak (Sri Padaya)", SI: "ශ්‍රී පාදය" },
    category: "mountains",
    image: "https://images.unsplash.com/photo-1705730312722-095ca8123d48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvcmVzdCUyMHNyaSUyMGxhbmthfGVufDB8fDB8fHww auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566893298691-bfd8e0e62e10?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/p17YwE5S6pA",
    history: {
      EN: "Standing at 2,243m, Adam's Peak is sacred to all major religions. Buddhists believe it contains the footprint of the Buddha, Hindus believe it's Shiva's, and Christians/Muslims associate it with Adam. The climb involves over 5,000 steps and is a spiritual journey for thousands of pilgrims every year.",
      SI: "ශ්‍රී පාදය යනු මධ්‍යම කඳුකරයේ පිහිටි පූජනීය කන්දකි. මෙහි මුදුනේ ඇති 'ශ්‍රී පාද ලාංඡනය' සියලුම ආගමිකයන්ගේ ගෞරවයට පාත්‍ර වේ. පඩිපෙළ 5,000 කට වඩා වැඩි ප්‍රමාණයක් නැගීම වන්දනාකරුවන්ට මහත් ආධ්‍යාත්මික අත්දැකීමකි."
    },
    shortStory: {
      EN: "The holy mountain of butterflies and the sacred sunrise above the clouds.",
      SI: "සමනලුන්ගේ පාරාදීසය සහ වලාකුළු වලට ඉහළින් පූජනීය හිරු උදාව නරඹන කඳු මුදුනයි."
    },
    bestTime: { EN: "December to May", SI: "දෙසැම්බර් සිට මැයි දක්වා" },
    tips: [
      { EN: "Start your climb at midnight to catch the 'Ira Sewaya' (sunrise) at the peak.", SI: "මුදුනේදී හිරු උදාව නැරඹීමට මධ්‍යම රාත්‍රියේ පමණ නැගීම ආරම්භ කරන්න." },
      { EN: "Bring warm clothing for the summit, as it gets very cold at night.", SI: "මුදුනේදී රාත්‍රියේ අධික සීතලක් පවතින බැවින් උණුසුම් ඇඳුම් රැගෙන යන්න." }
    ],
    location: "Ratnapura/Nuwara Eliya"
  },
  {
    id: "trincomalee",
    name: { EN: "Trincomalee", SI: "ත්‍රිකුණාමලය" },
    category: "beach",
    image: "https://images.unsplash.com/photo-1700315303907-5b222bb8bb47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VHJpbmNvbWFsZWV8ZW58MHx8MHx8fDA%3D auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586906232537-8e685931046e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544921603-91185f0962b1?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/5HlR9eS1X2M",
    history: {
      EN: "Trincomalee boasts the world's fifth-largest natural harbor. Its history is tied to the Koneswaram Temple, which was destroyed by the Portuguese in 1622 and later rebuilt. The area served as a critical strategic point for the British Royal Navy during World War II.",
      SI: "ත්‍රිකුණාමලය එහි ලොව පස්වන විශාලතම ස්වරාජිත වරාය සහ පෞරාණික කෝණේශ්වරම් කෝවිල සඳහා ප්‍රසිද්ධය. දෙවන ලෝක යුද්ධ සමයේදී මෙය බ්‍රිතාන්‍ය නාවික හමුදාවට ඉතා වැදගත් මධ්‍යස්ථානයක් විය."
    },
    shortStory: {
      EN: "Deep blue harbors, golden sands, and ancient spiritual echoes from the cliffside temples.",
      SI: "ගැඹුරු නිල් සාගරය, රන්වන් වෙරළ සහ කඳු ගැට මත පිහිටි කෝවිල්වල පෞරාණික හඬ රැඳුණු නගරයයි."
    },
    bestTime: { EN: "May to October", SI: "මැයි සිට ඔක්තෝබර් දක්වා" },
    tips: [
      { EN: "Take a boat to Pigeon Island for world-class snorkeling.", SI: "ස්නෝකලිං අත්දැකීමක් ලබා ගැනීමට පරෙවි දූපතට බෝට්ටු සංචාරයක් යන්න." },
      { EN: "Visit the Koneswaram Temple for breathtaking views of the harbor.", SI: "වරායේ අලංකාර දසුන් නැරඹීමට කෝණේශ්වරම් කෝවිලට යන්න." }
    ],
    location: "Trincomalee District"
  },
  {
    id: "jaffna",
    name: { EN: "Jaffna", SI: "යාපනය" },
    category: "ancient",
    image: "https://plus.unsplash.com/premium_photo-1680883415362-238794b19dde?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610486745145-6a56b77c3a0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/SOf-pP3oD5k",
    history: {
      EN: "Jaffna is the heart of Tamil culture in Sri Lanka. From the Nallur Kandaswamy Kovil to the Jaffna Public Library, the city is a testament to resilience and heritage. The unique 'Palmyra economy' and distinct South Indian influenced cuisine make it a mandatory stop for culture seekers.",
      SI: "යාපනය ශ්‍රී ලාංකීය දෙමළ සංස්කෘතියේ කේන්ද්‍රස්ථානයයි. නල්ලුර් කෝවිල සහ යාපනය පුස්තකාලය මෙහි ඇති සුවිශේෂී ස්ථාන වේ. යාපනයටම ආවේණික වූ ආහාර සහ සංස්කෘතිය සංචාරකයන්ගේ ආකර්ෂණයට ලක් වේ."
    },
    shortStory: {
      EN: "A resilient city of vibrant colors, ancient libraries, and sun-kissed palmyra plains.",
      SI: "විචිත්‍රවත් වර්ණ, පැරණි පුස්තකාල සහ තල් ගස්වලින් පිරි සුන්දර නගරයකි."
    },
    bestTime: { EN: "January to September", SI: "ජනවාරි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Try the iconic Jaffna Crab Curry at a local restaurant.", SI: "යාපනයේ නියම රසය විඳීමට ප්‍රසිද්ධ කකුළු ව්‍යංජනය අත්විඳින්න." },
      { EN: "Visit the Casuarina Beach for calm, shallow waters perfect for swimming.", SI: "පිහිනීමට සුදුසු සන්සුන් වෙරළක් වන කැෂුවරිනා වෙරළට යන්න." }
    ],
    location: "Jaffna District"
  },
  {
    id: "dambulla",
    name: { EN: "Dambulla Cave Temple", SI: "දඹුල්ල රන් විහාරය" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1656497107500-a2bc32cbe7d4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631522851143-698e360f727c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616070152767-3eb99cf10509?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/xN7yK-B8z8M",
    history: {
      EN: "Dating back to the 1st century BC, this cave temple complex was used as a refuge by King Valagamba. It contains 153 Buddha statues and vibrant mural paintings that cover 2,100 square meters. It is the best-preserved cave temple in the country.",
      SI: "දඹුල්ල ලෙන් විහාරය ක්‍රි.පූ. 1 වන සියවසේදී වළගම්බා රජුගේ රැකවරණ ස්ථානයක් ලෙස භාවිතා විය. මෙහි බුදු පිළිම 153ක් සහ අලංකාර බිතුසිතුවම් රාශියක් දැකගත හැකිය. මෙය ලංකාවේ හොඳම තත්ත්වයේ පවතින ලෙන් විහාරයයි."
    },
    shortStory: {
      EN: "A golden sanctuary of ancient faith hidden within massive mountain caves.",
      SI: "කඳු ගුහා තුළ සැඟවුණු රන්වන් බුදු පිළිම සහ බිතුසිතුවම් සහිත පුදබිමකි."
    },
    bestTime: { EN: "All year round", SI: "වසරේ ඕනෑම කාලයක" },
    tips: [
      { EN: "Wear socks as the stone floors can get very hot under the sun.", SI: "ගල් පොළොව හිරු රශ්මියට රත් වන බැවින් මේස් පැළඳ සිටීම සුදුසුය." },
      { EN: "Buy your tickets at the bottom before climbing up.", SI: "කන්ද නැගීමට පෙර පහතින් ප්‍රවේශ පත්‍ර ලබා ගන්න." }
    ],
    location: "Matale District"
  },
  {
    id: "knuckles",
    name: { EN: "Knuckles Mountain Range", SI: "නකල්ස් කඳු පන්තිය" },
    category: "mountains",
    image: "https://images.unsplash.com/photo-1580635849305-4399d586ac5c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566893298691-bfd8e0e62e10?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/j_8Z9w0G6rI",
    history: {
      EN: "Named after its resemblance to the knuckles of a clenched fist, this range is a biodiversity hotspot. It contains diverse forest types, from montane to lowland, and is home to many endemic flora and fauna. It's a UNESCO World Heritage site for its environmental significance.",
      SI: "නකල්ස් කඳු පන්තිය හෙවත් 'දුම්බර කඳු වැටිය' එහි ඇති සුවිශේෂී ජෛව විවිධත්වය නිසා ලෝක උරුමයක් ලෙස නම් කර ඇත. මීදුමෙන් වැසුණු වනාන්තර සහ දුර්ලභ සතුන් මෙහි දැකගත හැකිය."
    },
    shortStory: {
      EN: "Misty peaks where the earth meets the heavens in a symphony of biodiversity.",
      SI: "මිහිතලය සහ අහස හමුවන ජෛව විවිධත්වයෙන් පිරි මීදුමෙන් වැසුණු කඳු මුදුන් පෙළකි."
    },
    bestTime: { EN: "June to September", SI: "ජූනි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Leech protection is essential; wear leech socks or use salt/lime.", SI: "කූඩැල්ලන්ගෙන් ආරක්ෂා වීමට ලුණු හෝ දෙහි යුෂ භාවිතා කරන්න." },
      { EN: "Hire an experienced guide to navigate the unpredictable weather and trails.", SI: "කාලගුණය නිතර වෙනස් වන බැවින් පළපුරුදු මගපෙන්වන්නෙකු ලබා ගන්න." }
    ],
    location: "Kandy/Matale"
  },
  {
    id: "horton-plains",
    name: { EN: "Horton Plains", SI: "හෝර්ටන් තැන්න" },
    category: "wildlife",
    image: "https://images.unsplash.com/photo-1671432751719-d1a032c1a369?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627662168280-456073809214?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/hO-qSgX8T0M",
    history: {
      EN: "Horton Plains is an undulating plateau at an altitude of 2,100–2,300m. It was established as a national park in 1988. The most famous landmark is World's End, where the cliff drops vertically for about 880m (2,887 ft) to the valley below.",
      SI: "හෝර්ටන් තැන්න යනු මධ්‍යම කඳුකරයේ පිහිටි තැනිතලා භූමියකි. මෙය 1988 දී ජාතික උද්‍යානයක් ලෙස නම් කරන ලදී. මෙහි ඇති 'ලෝකාන්තය' අඩි 2,800 කට වඩා වැඩි ප්‍රපාතයකින් සමන්විත වේ."
    },
    shortStory: {
      EN: "Where the high-altitude plateau ends and the world falls away into the mist.",
      SI: "මීදුම අතරින් ලෝකාන්තය හමුවන සොබාදහමේ අපූර්ව නිර්මාණයකි."
    },
    bestTime: { EN: "January to March", SI: "ජනවාරි සිට මාර්තු දක්වා" },
    tips: [
      { EN: "Plastic items are strictly prohibited inside the park.", SI: "උද්‍යානය තුළට ප්ලාස්ටික් ද්‍රව්‍ය රැගෙන යාම සපුරා තහනම් වේ." },
      { EN: "Arrive before 9 AM to see the clear view before the mist rolls in.", SI: "මීදුමෙන් වැසීමට පෙර දර්ශනය නැරඹීමට උදෑසන 9 ට පෙර යන්න." }
    ],
    location: "Nuwara Eliya"
  },
  {
    id: "hikkaduwa",
    name: { EN: "Hikkaduwa", SI: "හික්කඩුව" },
    category: "beach",
    image: "https://images.unsplash.com/photo-1578405827843-dba01140f07c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578405827843-dba01140f07c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626777552726-4a6b547b4e5c?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/V9qO4k9w_XU",
    history: {
      EN: "Hikkaduwa was one of the first beach resorts to be developed in Sri Lanka. It became a hippie haven in the 70s and is now famous for its marine national park containing coral reefs and sea turtles that frequent the shore.",
      SI: "හික්කඩුව ලංකාවේ මුල්ම සංචාරක නගරවලින් එකකි. 70 දශකයේ සිට මෙය ජනප්‍රිය වූ අතර අද එහි ඇති පරාල උද්‍යානය සහ මුහුදු කැස්බෑවන් නැරඹීමට බොහෝ දෙනෙක් පැමිණෙති."
    },
    shortStory: {
      EN: "Vibrant corals, rhythmic surfing, and golden sunsets by the bustling shore.",
      SI: "කොරල්පර, සර්ෆින් සහ අලංකාර හිරු බැසයාම්වලින් පිරි කාර්යබහුල වෙරළකි."
    },
    bestTime: { EN: "November to April", SI: "නොවැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Visit the turtle hatcheries nearby to learn about conservation.", SI: "කැස්බෑ සංරක්ෂණ මධ්‍යස්ථාන වෙත ගොස් දැනුමක් ලබා ගන්න." },
      { EN: "Do not touch or walk on the coral reefs during boat tours.", SI: "බෝට්ටු සංචාර වලදී කොරල්පර ස්පර්ශ කිරීමෙන් හෝ ඒවා මත ඇවිදීමෙන් වළකින්න." }
    ],
    location: "Galle District"
  },
  {
    id: "arugam-bay",
    name: { EN: "Arugam Bay", SI: "ආරුගම් බොක්ක" },
    category: "beach",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558446791-ac5fec3caddf?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/v9qO4k9w_XU",
    history: {
      EN: "Located on the dry zone's southeast coast, Arugam Bay is a world-class surfing destination. Despite being a major tourist hub, it has maintained its 'surf-town' charm with many eco-friendly lodges and small family-run businesses.",
      SI: "ආරුගම් බොක්ක ලොව ප්‍රමුඛතම සර්ෆින් ක්‍රීඩා ස්ථානයකි. මෙය ප්‍රධාන සංචාරක මධ්‍යස්ථානයක් වුවද එහි ඇති සරල බව සහ සොබාදහම බොහෝ සංචාරකයන් ආකර්ෂණය කරයි."
    },
    shortStory: {
      EN: "A surfer’s paradise with endless waves, golden sun, and a laid-back soul.",
      SI: "සර්ෆින් ක්‍රීඩකයන්ගේ පාරාදීසය සහ රන්වන් හිරු රැස් රැඳුණු සැහැල්ලු වෙරළයි."
    },
    bestTime: { EN: "May to September", SI: "මැයි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Rent a board locally and try the 'Main Point' if you're an experienced surfer.", SI: "ඔබ දක්ෂ ක්‍රීඩකයෙකු නම් 'ප්‍රධාන රළ' (Main Point) සමඟ ක්‍රීඩා කරන්න." },
      { EN: "Watch for wild elephants on the roads leading to the bay at dusk.", SI: "සවස් කාලයේ මාර්ගවල ගමන් කරන අලි ඇතුන් ගැන සැලකිලිමත් වන්න." }
    ],
    location: "Ampara District"
  },
  {
    id: "kandy-temple",
    name: { EN: "Sacred Temple of the Tooth", SI: "ශ්‍රී දළදා මාළිගාව" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578503117502-3162799f9392?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603515865223-9993309a4d8c?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/oX_n4W3Y4d4",
    history: {
      EN: "Housing the sacred Tooth Relic of the Buddha, this temple is the most important religious site in Sri Lanka. It was built within the royal palace complex of the former Kingdom of Kandy. The annual Esala Perahera is one of the grandest festivals in Asia.",
      SI: "බුදුරජාණන් වහන්සේගේ වාම දන්ත ධාතූන් වහන්සේ වැඩසිටින ශ්‍රී දළදා මාළිගාව ලංකාවේ උතුම්ම පුදබිමයි. වාර්ෂිකව පවත්වනු ලබන ඇසළ පෙරහැර මුළු ආසියාවේම පැවැත්වෙන විශාලතම සංස්කෘතික උළෙලකි."
    },
    shortStory: {
      EN: "The ultimate spiritual sanctuary and the heart of the last royal capital.",
      SI: "සිංහල රජවරුන්ගේ අවසාන රාජකීය අගනුවර සහ උතුම්ම ආධ්‍යාත්මික පූජා භූමියයි."
    },
    bestTime: { EN: "July/August", SI: "ජූලි හෝ අගෝස්තු" },
    tips: [
      { EN: "Respect the religious atmosphere; silence and white clothing are preferred.", SI: "ආගමික පරිසරයට ගරු කරන්න; සුදු ඇඳුමින් සැරසී සිටීම වඩාත් සුදුසුය." },
      { EN: "Check the 'Thevava' (rituals) timings to hear the traditional drums.", SI: "පාරම්පරික බෙර වාදනය ඇසීමට පූජා පවත්වන වේලාවන් පරීක්ෂා කරන්න." }
    ],
    location: "Kandy District"
  },
  {
    id: "ella",
    name: { EN: "Ella & Nine Arch Bridge", SI: "ඇල්ල සහ ආරුක්කු නවය පාළම" },
    category: "mountains",
    image: "https://images.unsplash.com/photo-1578519050142-afb511e518de?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/rV162B_M0S0",
    history: {
      EN: "Ella became a global favorite for its cool climate and the iconic Nine Arch Bridge. The bridge was built by locals using stone and brick during World War I when steel imports were blocked. It is a masterpiece of colonial-era engineering and local ingenuity.",
      SI: "ඇල්ල යනු මීදුමෙන් වැසුණු කඳු සහ බ්‍රිතාන්‍ය යුගයේ ඉංජිනේරු විද්‍යාවේ ආශ්චර්යයන් සඳහා ප්‍රසිද්ධ නගරයකි. ආරුක්කු නවය පාළම ගල් සහ ගඩොලින් පමණක් නිමවා ඇති අපූරු නිර්මාණයකි."
    },
    shortStory: {
      EN: "Where the clouds touch the tea estates and the blue train whistles through the hills.",
      SI: "වලාකුළු තේ වතු සිපගන්නා, නිල් දුම්රිය කඳු අතරින් ගමන් කරන සොඳුරු ඉසව්වකි."
    },
    bestTime: { EN: "January to March", SI: "ජනවාරි සිට මාර්තු දක්වා" },
    tips: [
      { EN: "The hike to Little Adam's Peak offers a magnificent 360-degree view.", SI: "පුංචි ශ්‍රී පාදය තරණය කිරීමෙන් මුළු ඇල්ල නගරයේම අලංකාර දසුන් නැරඹිය හැකිය." },
      { EN: "Book train tickets from Kandy to Ella well in advance for the scenic journey.", SI: "මහනුවර සිට ඇල්ල දක්වා දුම්රිය සංචාරය සඳහා කලින් ප්‍රවේශ පත්‍ර වෙන්කර ගන්න." }
    ],
    location: "Badulla District"
  },
  {
    id: "pidurangala",
    name: { EN: "Pidurangala Rock", SI: "පිදුරංගල ගල" },
    category: "mountains",
    image: "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580794749460-76f97b7180d8?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/2X8pWp9E80I",
    history: {
      EN: "Pidurangala Rock is located a few kilometers north of Sigiriya. It was a Buddhist monastery that rose to prominence during the reign of King Kashyapa. While less famous than its neighbor, it offers the best panoramic view of Sigiriya Lion Rock itself.",
      SI: "සීගිරියට උතුරින් පිහිටි පිදුරංගල කාශ්‍යප රජුගේ කාලයේදී ඉතා දියුණු බෞද්ධ ආරාමයක් ලෙස පැවතිණි. සීගිරි පර්වතයේ අලංකාර දසුනක් නැරඹීමට හොඳම ස්ථානය මෙයයි."
    },
    shortStory: {
      EN: "The ultimate hiker's alternative with a panoramic view of the Lion Rock.",
      SI: "සීගිරිය සිංහගිරියේ සම්පූර්ණ දසුනක් නැරඹිය හැකි වික්‍රමාන්විත කඳු තරණයකි."
    },
    bestTime: { EN: "December to April", SI: "දෙසැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Climb for sunrise or sunset for the most magical views.", SI: "වඩාත් අලංකාර දසුන් නැරඹීමට හිරු උදාව හෝ හිරු බැසයන වේලාවේ තරණය කරන්න." },
      { EN: "The final section involves a bit of scrambling over rocks, so wear good shoes.", SI: "අවසාන කොටස ගල් අතරින් තරණය කිරීමට ඇති බැවින් හොඳ පාවහන් පළඳින්න." }
    ],
    location: "Matale District"
  }
];
