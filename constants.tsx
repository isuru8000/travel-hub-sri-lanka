
import { Destination, Food, Translation } from './types.ts';

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
    image: "https://images.unsplash.com/photo-1631935700000-000000000000?auto=format&fit=crop&w=800&q=80",
    spiciness: 4,
    tasteProfile: { EN: "Hearty, spicy, and full of aromatic textures.", SI: "කුළුබඩු සුවඳ රැඳුණු තෘප්තිමත් ආහාරයකි." },
    ingredients: [{ EN: "Godamba Roti", SI: "රොටි" }, { EN: "Curry", SI: "හොදි" }, { EN: "Ginger/Garlic", SI: "ඉඟුරු/සුදුළුණු" }]
  },
  {
    id: "pol-sambol",
    name: { EN: "Pol Sambol", SI: "පොල් සම්බෝල" },
    description: { EN: "A fiery relish made of freshly grated coconut, chilies, onion, lime juice, and Maldive fish.", SI: "පොල්, මිරිස්, ලූණු සහ දෙහි යුෂ මිශ්‍ර කර සාදන ලද රසවත් සම්බෝලයකි." },
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
  },
  {
    id: "string-hoppers",
    name: { EN: "String Hoppers (Idiyappam)", SI: "ඉඳිආප්ප" },
    description: { EN: "Steamed nests of rice flour noodles, typically served for breakfast or dinner with dhal and coconut sambol.", SI: "හාල් පිටිවලින් සාදන ලද හුමාලයෙන් තම්බා ගත් නූල් වැනි ආහාරයකි." },
    image: "https://images.unsplash.com/photo-1627662236973-4fda8358fd20?auto=format&fit=crop&w=800&q=80",
    spiciness: 1,
    tasteProfile: { EN: "Light, soft, and neutral.", SI: "සැහැල්ලු සහ මෘදු ගතිය." },
    ingredients: [{ EN: "Rice Flour", SI: "හාල් පිටි" }, { EN: "Water", SI: "වතුර" }, { EN: "Salt", SI: "ලුණු" }]
  },
  {
    id: "lamprais",
    name: { EN: "Lamprais", SI: "ලම්ප්‍රයිස්" },
    description: { EN: "Dutch-Burgher influenced dish featuring rice, meat curry, and frikkadels, wrapped and steamed in a banana leaf.", SI: "කෙසෙල් කොළයක ඔතා හුමාලයෙන් තම්බා ගත් ලන්දේසි ආභාෂය සහිත බත් විශේෂයකි." },
    image: "https://images.unsplash.com/photo-1616070152767-3eb99cf10509?auto=format&fit=crop&w=800&q=80",
    spiciness: 3,
    tasteProfile: { EN: "Fragrant and multi-layered.", SI: "කෙසෙල් කොළ සුවඳ මිශ්‍ර වූ විශේෂිත රසය." },
    ingredients: [{ EN: "Short Grain Rice", SI: "කෙටි හාල්" }, { EN: "Mixed Meat Curry", SI: "මස් ව්‍යංජන" }, { EN: "Banana Leaf", SI: "කෙසෙල් කොළ" }]
  },
  {
    id: "pol-roti",
    name: { EN: "Pol Roti", SI: "පොල් රොටි" },
    description: { EN: "Flatbread made from wheat flour mixed with shredded coconut and onions.", SI: "තිරිඟු පිටි සහ පොල් මිශ්‍ර කර සාදන ලද තැටි රොටි වර්ගයකි." },
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    spiciness: 2,
    tasteProfile: { EN: "Densely chewy and toasted.", SI: "හපන විට දැනෙන පොල් රස සහ තැටි රොටි රසය." },
    ingredients: [{ EN: "Flour", SI: "පිටි" }, { EN: "Scraped Coconut", SI: "ගාගත් පොල්" }, { EN: "Onions", SI: "ලූණු" }]
  },
  {
    id: "rice-curry",
    name: { EN: "Rice and Curry", SI: "බත් සහ ව්‍යංජන" },
    description: { EN: "The staple diet: a mountain of rice accompanied by 5-6 different vegetable and meat curries.", SI: "ශ්‍රී ලංකාවේ ප්‍රධාන ආහාරය; බත් සමඟ ව්‍යංජන පහ හයක එකතුවකි." },
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    spiciness: 4,
    tasteProfile: { EN: "The complete spectrum of Lankan flavors.", SI: "ලංකා කුළුබඩු වල සියලුම රසයන්ගේ සංකලනයකි." },
    ingredients: [{ EN: "Red/White Rice", SI: "හාල්" }, { EN: "Assorted Vegetables", SI: "විවිධ එළවළු" }, { EN: "Spices", SI: "කුළුබඩු" }]
  },
  {
    id: "curd-treacle",
    name: { EN: "Curd and Treacle", SI: "මීකිරි සහ පැණි" },
    description: { EN: "Creamy buffalo curd topped with golden Kithul palm treacle.", SI: "මීකිරි සමඟ කිතුල් පැණි එක් කර සාදන ලද සාම්ප්‍රදායික අතුරුපසකි." },
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    spiciness: 1,
    tasteProfile: { EN: "Tart curd balanced by smoky-sweet syrup.", SI: "මීකිරි වල මඳ ඇඹුල් ගතිය සහ පැණි වල මිහිරියාව." },
    ingredients: [{ EN: "Buffalo Milk", SI: "මී කිරි" }, { EN: "Kithul Treacle", SI: "කිතුල් පැණි" }]
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "sigiriya",
    name: { EN: "Sigiriya Lion Rock", SI: "සීගිරිය සිංහගිරිය" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1580794749460-76f97b7180d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lnaXJpeWElMjByb2NrfGVufDB8fDB8fHww auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620668165561-12f719468e27?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/2X8pWp9E80I",
    history: {
      EN: "Sigiriya, the 'Lion Rock', is a UNESCO World Heritage site and one of the best-preserved examples of ancient urban planning. King Kashyapa (477-495 AD) selected this 200m tall rock for his royal residence.",
      SI: "සීගිරිය හෙවත් 'සිංහගිරිය' යනු යුනෙස්කෝ ලෝක උරුම අඩවියක් වන අතර පැරණි නගර නිර්මාණකරණයේ විශිෂ්ටතම නිදසුනකි. කාශ්‍යප රජු (ක්‍රි.ව. 477-495) තම රාජකීය වාසස්ථානය ලෙස මෙය තෝරා ගත්තේය."
    },
    shortStory: {
      EN: "The 8th Wonder of the World – A fortress in the sky surrounded by water gardens.",
      SI: "ලොව අටවන පුදුමය - ජල උද්‍යානවලින් වට වූ අහස උසට විහිදුණු බලකොටුවකි."
    },
    bestTime: { EN: "December to April", SI: "දෙසැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Climb early morning to witness the sunrise.", SI: "හිරු උදාව නැරඹීමට උදෑසනින්ම යන්න." }
    ],
    location: "Matale District"
  },
  {
    id: "polonnaruwa",
    name: { EN: "Ancient City of Polonnaruwa", SI: "පොළොන්නරුව පුරාණ නගරය" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1721992499083-637b6ee0c7ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvbG9ubmFydXdhfGVufDB8fDB8fHww auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596483572314-87612669e46a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/SOf-pP3oD5k",
    history: {
      EN: "Polonnaruwa was the second capital of Sri Lanka after the destruction of Anuradhapura in 993. It comprises, besides the Brahmanic monuments built by the Cholas, the monumental ruins of the fabulous garden-city created by Parakramabahu I in the 12th century.",
      SI: "පොළොන්නරුව ශ්‍රී ලංකාවේ දෙවන අගනුවරයි. පළමුවන පරාක්‍රමබාහු රජුගේ කාලයේදී මෙය ඉතා දියුණු මට්ටමක පැවතිණි. මෙහි ඇති ගල් විහාරය සහ පරාක්‍රම සමුද්‍රය ඉතා සුවිශේෂී නිර්මාණ වේ."
    },
    shortStory: {
      EN: "A medieval capital where stone giants guard the history of kings.",
      SI: "රජවරුන්ගේ ඉතිහාසය රකින ගල් පිළිමවලින් පිරි මධ්‍යකාලීන අගනුවරයි."
    },
    bestTime: { EN: "May to September", SI: "මැයි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Rent a bicycle to explore the vast archaeological complex.", SI: "විශාල පුරාවිද්‍යා පරිශ්‍රය ගවේෂණය කිරීමට බයිසිකලයක් කුලියට ගන්න." }
    ],
    location: "Polonnaruwa District"
  },
  {
    id: "galle-fort",
    name: { EN: "Galle Dutch Fort", SI: "ගාල්ල ලන්දේසි කොටුව" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1654561773591-57b9413c45c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FsbGUlMjBmb3J0fGVufDB8fDB8fHww auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588590928226-c95822a21219?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/RkG7E_kY7Ew",
    history: {
      EN: "The Galle Fort is a UNESCO World Heritage site, originally built by the Portuguese in 1588 and then extensively fortified by the Dutch during the 17th century. It is the best example of a fortified city built by Europeans in South and South-East Asia.",
      SI: "ගාල්ල කොටුව යුනෙස්කෝ ලෝක උරුම අඩවියකි. 1588 දී පෘතුගීසීන් විසින් ඉදිකර පසුව ලන්දේසීන් විසින් වැඩිදියුණු කරන ලදී. මෙය දකුණු ආසියාවේ යුරෝපීයයන් විසින් ඉදිකරන ලද හොඳම ආරක්ෂිත නගරයයි."
    },
    shortStory: {
      EN: "Where colonial history meets the turquoise Indian Ocean.",
      SI: "යුරෝපීය ඉතිහාසය සහ ඉන්දියන් සාගරය හමුවන ඉසව්වකි."
    },
    bestTime: { EN: "December to April", SI: "දෙසැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Walk along the ramparts at sunset for spectacular ocean views.", SI: "හිරු බැස යන වේලාවේ කොටු බැම්ම මත ඇවිද යමින් සාගර දසුන් නරඹන්න." }
    ],
    location: "Galle District"
  },
  {
    id: "adams-peak",
    name: { EN: "Adam’s Peak (Sri Padaya)", SI: "ශ්‍රී පාදය" },
    category: "mountains",
    image: "https://images.unsplash.com/photo-1566893298691-bfd8e0e62e10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFkYW1zLXBlYWt8ZW58MHx8MHx8fDA%3D auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/p17YwE5S6pA",
    history: {
      EN: "Adam's Peak is a 2,243 m tall conical mountain located in central Sri Lanka. It is well known for the Sri Pada, i.e., 'sacred footprint', a 1.8 m rock formation near the summit. It is a major pilgrimage site for Buddhists, Hindus, Christians, and Muslims.",
      SI: "ශ්‍රී පාදය යනු මධ්‍යම කඳුකරයේ පිහිටි පූජනීය කන්දකි. මෙහි මුදුනේ ඇති 'ශ්‍රී පාද ලාංඡනය' සියලුම ආගමිකයන්ගේ ගෞරවයට පාත්‍ර වේ. වසරේ මාස කිහිපයක් වන්දනාකරුවන් දහස් ගණනින් මෙහි පැමිණෙති."
    },
    shortStory: {
      EN: "The holy mountain of butterflies and the sacred sunrise.",
      SI: "සමනලුන්ගේ පාරාදීසය සහ පූජනීය හිරු උදාව නරඹන කඳු මුදුනයි."
    },
    bestTime: { EN: "December to May (Pilgrimage Season)", SI: "දෙසැම්බර් සිට මැයි දක්වා (වන්දනා වාරය)" },
    tips: [
      { EN: "Start the climb around midnight to reach the summit by sunrise.", SI: "හිරු උදාව නැරඹීමට මධ්‍යම රාත්‍රියේ පමණ නැගීම ආරම්භ කරන්න." }
    ],
    location: "Ratnapura/Nuwara Eliya"
  },
  {
    id: "trincomalee",
    name: { EN: "Trincomalee", SI: "ත්‍රිකුණාමලය" },
    category: "beach",
    image: "https://images.unsplash.com/photo-1558446791-ac5fec3caddf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJpbmNvbWFsZWV8ZW58MHx8MHx8fDA%3D auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586906232537-8e685931046e?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/5HlR9eS1X2M",
    history: {
      EN: "Trincomalee is home to the famous Koneswaram Temple and one of the world's finest natural deep-water harbors. It has been a major maritime hub for centuries.",
      SI: "ත්‍රිකුණාමලය එහි ස්වභාවික වරාය සහ පෞරාණික කෝණේශ්වරම් කෝවිල සඳහා ලොව පුරා ප්‍රසිද්ධය. ශතවර්ෂ ගණනාවක් පුරා මෙය වැදගත් නාවික මධ්‍යස්ථානයක් විය."
    },
    shortStory: {
      EN: "Deep blue harbors and ancient spiritual echoes.",
      SI: "ගැඹුරු නිල් සාගරය සහ පෞරාණික ආධ්‍යාත්මික හඬ රැඳුණු නගරයයි."
    },
    bestTime: { EN: "May to October", SI: "මැයි සිට ඔක්තෝබර් දක්වා" },
    tips: [
      { EN: "Visit Nilaveli Beach for the best snorkeling experience at Pigeon Island.", SI: "පරෙවි දූපතේ ස්නෝකලිං අත්දැකීමක් ලබා ගැනීමට නිලාවේලි වෙරළට යන්න." }
    ],
    location: "Trincomalee District"
  },
  {
    id: "jaffna",
    name: { EN: "Jaffna", SI: "යාපනය" },
    category: "ancient",
    image: "https://plus.unsplash.com/premium_photo-1680883415362-238794b19dde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFmZm5hfGVufDB8fDB8fHww auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610486745145-6a56b77c3a0b?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/SOf-pP3oD5k",
    history: {
      EN: "Jaffna is the cultural heart of the Tamil people in Sri Lanka. It features the Nallur Kandaswamy Kovil, the Jaffna Fort, and a unique cuisine influenced by South Indian flavors.",
      SI: "යාපනය ශ්‍රී ලාංකීය දෙමළ සංස්කෘතියේ කේන්ද්‍රස්ථානයයි. නල්ලුර් කෝවිල සහ යාපනය කොටුව මෙහි ඇති සුවිශේෂී ස්ථාන වේ."
    },
    shortStory: {
      EN: "A resilient city of vibrant colors, temples, and palmyra palms.",
      SI: "විචිත්‍රවත් වර්ණ, කෝවිල් සහ තල් ගස්වලින් පිරි සුන්දර නගරයකි."
    },
    bestTime: { EN: "January to September", SI: "ජනවාරි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Try the famous Jaffna Crab Curry for an authentic taste of the north.", SI: "යාපනයේ නියම රසය විඳීමට ප්‍රසිද්ධ කකුළු ව්‍යංජනය අත්විඳින්න." }
    ],
    location: "Jaffna District"
  },
  {
    id: "dambulla",
    name: { EN: "Dambulla Cave Temple", SI: "දඹුල්ල රන් විහාරය" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1656497107500-a2bc32cbe7d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFtYnVsbGF8ZW58MHx8MHx8fDA%3D auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631522851143-698e360f727c?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/xN7yK-B8z8M",
    history: {
      EN: "The Dambulla Cave Temple is the largest and best-preserved cave temple complex in Sri Lanka. It contains five main caves filled with 153 Buddha statues and mural paintings covering 2,100 square meters.",
      SI: "දඹුල්ල ලෙන් විහාරය ශ්‍රී ලංකාවේ විශාලතම ලෙන් විහාරයයි. මෙහි බුදු පිළිම 153ක් සහ අලංකාර බිතුසිතුවම් රාශියක් දැකගත හැකිය."
    },
    shortStory: {
      EN: "A golden sanctuary hidden within dark mountain caves.",
      SI: "කඳු ගුහා තුළ සැඟවුණු රන්වන් ආලෝකය සහිත පුදබිමකි."
    },
    bestTime: { EN: "All year round", SI: "වසරේ ඕනෑම කාලයක" },
    tips: [
      { EN: "The caves are uphill; wear comfortable walking shoes.", SI: "ලෙන් පිහිටා ඇත්තේ කඳු මුදුනේ බැවින් ඇවිදීමට පහසු පාවහන් පළඳින්න." }
    ],
    location: "Matale District"
  },
  {
    id: "knuckles",
    name: { EN: "Knuckles Mountain Range", SI: "නකල්ස් කඳු පන්තිය" },
    category: "mountains",
    image: "https://images.unsplash.com/photo-1580635849305-4399d586ac5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vdW50YWluJTIwc3JpJTIwbGFua2F8ZW58MHx8MHx8fDA%3D auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    videoUrl: "https://www.youtube.com/embed/j_8Z9w0G6rI",
    history: {
      EN: "The Knuckles range, so named due to its resemblance to a clenched fist, is a UNESCO World Heritage site known for its extreme biodiversity and misty cloud forests.",
      SI: "නකල්ස් කඳු පන්තිය හෙවත් 'දුම්බර කඳු වැටිය' එහි ඇති සුවිශේෂී ජෛව විවිධත්වය නිසා ලෝක උරුමයක් ලෙස නම් කර ඇත."
    },
    shortStory: {
      EN: "The misty peaks where the earth meets the heavens.",
      SI: "මිහිතලය සහ අහස හමුවන මීදුමෙන් වැසුණු කඳු මුදුන් පෙළකි."
    },
    bestTime: { EN: "June to September", SI: "ජූනි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Always hire a local guide for trekking as the weather changes rapidly.", SI: "කාලගුණය නිතර වෙනස් වන බැවින් කඳු නැගීමේදී මගපෙන්වන්නෙකු ලබා ගන්න." }
    ],
    location: "Kandy/Matale"
  },
  {
    id: "horton-plains",
    name: { EN: "Horton Plains", SI: "හෝර්ටන් තැන්න" },
    category: "wildlife",
    image: "https://images.unsplash.com/photo-1671432751719-d1a032c1a369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9ydG9uLXBsYWluc3xlbnwwfHwwfHx8MA%3D%3D auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    videoUrl: "https://www.youtube.com/embed/hO-qSgX8T0M",
    history: {
      EN: "Horton Plains is a highland plateau featuring montane grasslands and cloud forests. It is home to 'World's End', a sheer cliff with a drop of about 1,200 meters.",
      SI: "හෝර්ටන් තැන්න යනු මධ්‍යම කඳුකරයේ පිහිටි තැනිතලා භූමියකි. මෙහි ඇති 'ලෝකාන්තය' නැරඹීමට බොහෝ සංචාරකයන් පැමිණෙති."
    },
    shortStory: {
      EN: "Where the plateau ends and the world falls away.",
      SI: "ලෝකාන්තය හමුවන සොබාදහමේ අපූර්ව නිර්මාණයකි."
    },
    bestTime: { EN: "January to March", SI: "ජනවාරි සිට මාර්තු දක්වා" },
    tips: [
      { EN: "Leave early to see the view from World's End before the mist covers it.", SI: "මීදුමෙන් වැසීමට පෙර ලෝකාන්තය නැරඹීමට උදෑසනින්ම යන්න." }
    ],
    location: "Nuwara Eliya"
  },
  {
    id: "hikkaduwa",
    name: { EN: "Hikkaduwa", SI: "හික්කඩුව" },
    category: "beach",
    image: "https://images.unsplash.com/photo-1578405827843-dba01140f07c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhpa2thZHV3YXxlbnwwfHwwfHx8MA%3D%3D auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    videoUrl: "https://www.youtube.com/embed/V9qO4k9w_XU",
    history: {
      EN: "Hikkaduwa is famous for its coral sanctuary, surfing, and vibrant nightlife. It was one of the first tourist destinations to be developed in Sri Lanka.",
      SI: "හික්කඩුව එහි පරාල උද්‍යානය සහ වෙරළ ක්‍රීඩා සඳහා ප්‍රසිද්ධය. මෙය ලංකාවේ මුල්ම සංචාරක නගරවලින් එකකි."
    },
    shortStory: {
      EN: "Corals, surfing, and sunsets by the shore.",
      SI: "කොරල්පර, සර්ෆින් සහ අලංකාර හිරු බැසයාම්වලින් පිරි වෙරළකි."
    },
    bestTime: { EN: "November to April", SI: "නොවැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Take a glass-bottom boat tour to see the colorful coral reefs.", SI: "කොරල්පර නැරඹීම සඳහා පතුල වීදුරු සහිත බෝට්ටු සංචාරයක් යන්න." }
    ],
    location: "Galle District"
  },
  {
    id: "arugam-bay",
    name: { EN: "Arugam Bay", SI: "ආරුගම් බොක්ක" },
    category: "beach",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    videoUrl: "https://www.youtube.com/embed/v9qO4k9w_XU",
    history: {
      EN: "Arugam Bay is a world-renowned surfing destination on the east coast of Sri Lanka. It retains a laid-back, rustic vibe that travelers love.",
      SI: "ආරුගම් බොක්ක ලොව ප්‍රමුඛතම සර්ෆින් ක්‍රීඩා ස්ථානයකි. මෙහි ඇති සැහැල්ලු බව බොහෝ සංචාරකයන්ගේ ආකර්ෂණයට ලක් වේ."
    },
    shortStory: {
      EN: "A surfer’s paradise with endless waves and golden sun.",
      SI: "සර්ෆින් ක්‍රීඩකයන්ගේ පාරාදීසය සහ රන්වන් හිරු රැස් රැඳුණු වෙරළයි."
    },
    bestTime: { EN: "May to September", SI: "මැයි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Rent a surfboard locally and catch the morning waves at Main Point.", SI: "සර්ෆින් බෝඩ් එකක් කුලියට ගෙන උදෑසන රළ සමඟ ක්‍රීඩා කරන්න." }
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
      EN: "Located in the heart of the royal capital Kandy, the Sri Dalada Maligawa houses the sacred tooth relic of Lord Buddha.",
      SI: "මහනුවර රාජකීය අගනුවර මධ්‍යයේ පිිහිටි ශ්‍රී දළදා මාළිගාව බුදුරජාණන් වහන්සේගේ වාම දන්ත ධාතූන් වහන්සේ වැඩසිටින ස්ථානයයි."
    },
    shortStory: {
      EN: "The ultimate spiritual sanctuary and the last royal capital of the Sinhalese Kings.",
      SI: "සිංහල රජවරුන්ගේ අවසාන රාජකීය අගනුවර සහ උතුම්ම ආධ්‍යාත්මික පූජා භූමියයි."
    },
    bestTime: { EN: "July/August for the Perahera", SI: "පෙරහැර නැරඹීමට ජූලි හෝ අගෝස්තු කාලය" },
    tips: [
      { EN: "Ensure your attire covers shoulders and knees completely.", SI: "උරහිස් සහ දණහිස් වැසෙන පරිදි ඇඳුම් අඳින්න." }
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
      EN: "Ella is a high-altitude sanctuary famous for its breathtaking views and colonial-era engineering.",
      SI: "ඇල්ල යනු මීදුමෙන් වැසුණු කඳු සහ බ්‍රිතාන්‍ය යුගයේ ඉංජිනේරු විද්‍යාවේ ආශ්චර්යයන් සඳහා ප්‍රසිද්ධ කඳුකර නගරයකි."
    },
    shortStory: {
      EN: "Where the clouds touch the tea estates and history is written in stone and brick.",
      SI: "වලාකුළු තේ වතු සිපගන්නා, ගල් සහ ගඩොලින් ඉතිහාසය ලියැවුණු සොඳුරු ඉසව්වකි."
    },
    bestTime: { EN: "January to March", SI: "ජනවාරි සිට මාර්තු දක්වා" },
    tips: [
      { EN: "Check the train schedule locally to time your visit with the blue train.", SI: "නිල් දුම්රිය එන වේලාව දැනගැනීමට දුම්රිය කාලසටහන පරීක්ෂා කරන්න." }
    ],
    location: "Badulla District"
  }
];
