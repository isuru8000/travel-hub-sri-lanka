
import { Destination, Food, HeritageMusic, Translation } from './types.ts';

export const UI_STRINGS: Translation = {
  heroTitle: {
    EN: "Discover the True Beauty of Sri Lanka",
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
    title: { EN: "Hiking", SI: "කඳු නැගීම" },
    description: { EN: "Trek through misty peaks and lush green tea trails.", SI: "මීදුමෙන් වැසුණු කඳු මුදුන් සහ හරිත තේ වතු හරහා සංචාරය කරන්න." }
  },
  {
    id: "medicine",
    icon: "Leaf",
    title: { EN: "Traditional Medicine", SI: "දේශීය වෛද්‍ය විද්‍යාව" },
    description: { EN: "Heal your soul with ancient Hela Wedakama & Ayurveda.", SI: "පැරණි හෙළ වෙදකම සහ ආයුර්වේදයෙන් සුවපත් වන්න." }
  },
  {
    id: "foods",
    icon: "Utensils",
    title: { EN: "Traditional Foods", SI: "දේශීය ආහාර" },
    description: { EN: "Savor the spices of authentic Sri Lankan cuisine.", SI: "සැබෑ ශ්‍රී ලාංකීය ආහාර වේලක රසය විඳගන්න." }
  },
  {
    id: "music",
    icon: "Music",
    title: { EN: "Heritage Music", SI: "සංගීතය සහ නර්තනය" },
    description: { EN: "Experience the rhythmic beats of traditional drums.", SI: "පාරම්පරික බෙර වාදනයේ රිද්මය අත්විඳින්න." }
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
    description: { EN: "The main drum of the Sabaragamuwa region. Played with a stick (Kaduppuwa) on one side and the hand on the other.", SI: "සබරගමුව පළාතට ආවේණික බෙරයයි. මෙය එක් පැත්තකින් කඩුප්පුව නම් කූරෙන්ද, අනෙක් පැත්තෙන් අතින්ද වාදනය කරයි." },
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
      SI: "දුම්බර කන්දේ බඹරුන් බැඳි වාරේ\nපැණි නෙලන්නට එන්නමු අපි පාරේ\nදෙවියන් බුදුන්ගේ පිහිටයි හැම වාරේ\nබඹරුන් නොකෝප වී ඉන්න අපේ වාරේ"
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
    origin: { EN: "Kandyan Royal Courts", SI: "උඩරට රාජ සභාව" },
    significance: { EN: "A bridge between classical poetry, music, and physical performance.", SI: "ශාස්ත්‍රීය කවිය, සංගීතය සහ නර්තනය අතර පවතින සබඳතාවය මෙයින් විදහා දක්වයි." },
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
    videoUrl: "https://www.youtube.com/embed/2X8pWp9E80I",
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
    image: "https://images.unsplash.com/photo-1596483572314-87612669e46a?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1558446791-ac5fec3caddf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586906232537-8e685931046e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544921603-91185f0962b1?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/5HlR9eS1X2M",
    history: {
      EN: "Trincomalee boasts the world's fifth-largest natural harbor. Its history is tied to the Koneswaram Temple, which was destroyed by the Portuguese in 1622 and later rebuilt. The area served as a critical strategic point for the British Royal Navy during World War II.",
      SI: "ත්‍රිකුණාමලය එහි ලොව පස්වන විශාලතම ස්වභාවික වරාය සහ පෞරාණික කෝණේශ්වරම් කෝවිල සඳහා ප්‍රසිද්ධය. දෙවන ලෝක යුද්ධ සමයේදී මෙය බ්‍රිතාන්‍ය නාවික හමුදාවට ඉතා වැදගත් මධ්‍යස්ථානයක් විය."
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
  }
];
