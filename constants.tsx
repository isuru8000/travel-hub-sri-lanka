
import { Destination, Food, Translation } from './types.ts';

export const UI_STRINGS: Translation = {
  heroTitle: {
    EN: "Discover Sri Lanka – Where Ancient Memories Meet Modern Journeys",
    SI: "ශ්‍රී ලංකාව සොයා ගන්න - පැරණි මතකයන් නවීන ගමන් මග සමඟ හමුවන තැන"
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
    image: "https://pixabay.com/images/download/x-6319357_1920.jpg",
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
    image: "https://plus.unsplash.com/premium_photo-1730145749791-28fc538d7203?auto=format&fit=crop&w=1200&q=80",
    history: {
      EN: "Sigiriya, the 'Lion Rock', is a UNESCO World Heritage site and one of the best-preserved examples of ancient urban planning. King Kashyapa (477-495 AD) selected this 200m tall rock for his royal residence to protect himself from his brother. The summit features the ruins of an upper palace, while mid-way up the rock, on a small plateau, he built a gateway in the form of an enormous lion. The path is flanked by the Mirror Wall, covered in ancient graffiti, and the famous Sigiriya Frescoes—portraits of celestial maidens that remain vivid after 1,500 years.",
      SI: "සීගිරිය හෙවත් 'සිංහගිරිය' යනු යුනෙස්කෝ ලෝක උරුම අඩවියක් වන අතර පැරණි නගර නිර්මාණකරණයේ විශිෂ්ටතම නිදසුනකි. කාශ්‍යප රජු (ක්‍රි.ව. 477-495) තම සොහොයුරාගෙන් ආරක්ෂා වීම සඳහා තම රාජකීය වාසස්ථානය ලෙස අඩි 660ක් උසැති මෙම පර්වතය තෝරා ගත්තේය. පර්වතය මැද විශාල සිංහයෙකුගේ ස්වරූපයෙන් යුත් ද්වාරයක් ඉදිකර ඇති අතර, ලෝක ප්‍රකට සීගිරි බිතුසිතුවම් සහ කුරුටු ගී සහිත කැඩපත් පවුර මෙහි ඇති සුවිශේෂී අංගයන් වේ."
    },
    shortStory: {
      EN: "The 8th Wonder of the World – A fortress in the sky surrounded by water gardens.",
      SI: "ලොව අටවන පුදුමය - ජල උද්‍යානවලින් වට වූ අහස උසට විහිදුණු බලකොටුවකි."
    },
    bestTime: { EN: "December to April", SI: "දෙසැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Climb during early morning (7 AM) to witness the sunrise and avoid the midday sun.", SI: "හිරු උදාව නැරඹීමට සහ මධ්‍යහ්න රශ්මිය මඟහරවා ගැනීමට උදෑසන 7 ට පමණ නැගීම ආරම්භ කරන්න." },
      { EN: "Do not take flash photography of the frescoes to preserve the ancient pigments.", SI: "පැරණි වර්ණ සංරක්ෂණය කිරීම සඳහා බිතුසිතුවම්වල ඡායාරූප ගැනීමේදී ෆ්ලෑෂ් භාවිතා නොකරන්න." }
    ],
    location: "Matale District"
  },
  {
    id: "kandy-temple",
    name: { EN: "Sacred Temple of the Tooth", SI: "ශ්‍රී දළදා මාළිගාව" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    history: {
      EN: "Located in the heart of the royal capital Kandy, the Sri Dalada Maligawa houses the sacred tooth relic of Lord Buddha. Since ancient times, the relic has played an important role in local politics because it is believed that whoever holds the relic holds the governance of the country. The temple complex is a masterpiece of Kandyan architecture, featuring white stone walls with 'Valakulu Bamma' (cloud walls), intricate wood carvings, and a golden canopy built over the inner sanctum. Every year, the Esala Perahera festival fills the streets with over 100 elephants and thousands of dancers to honor the relic.",
      SI: "මහනුවර රාජකීය අගනුවර මධ්‍යයේ පිිහිටි ශ්‍රී දළදා මාළිගාව බුදුරජාණන් වහන්සේගේ වාම දන්ත ධාතූන් වහන්සේ වැඩසිටින ස්ථානයයි. දන්ත ධාතූන් වහන්සේගේ භාරකාරත්වය දරන්නාට රටේ පාලන බලය හිමිවන බවට අතීතයේ සිටම විශ්වාසයක් පැවතිණි. උඩරට වාස්තු විද්‍යාවේ විශිෂ්ටත්වය විදහා දක්වන මෙහි වළාකුළු බැම්ම, කැටයම් කළ දැව සහ රන් වියන සුවිශේෂී වේ. සෑම වසරකම පැවැත්වෙන ඇසළ පෙරහැර මංගල්‍යය දන්ත ධාතූන් වහන්සේට ගෞරව කිරීම සඳහා පවත්වනු ලබයි."
    },
    shortStory: {
      EN: "The ultimate spiritual sanctuary and the last royal capital of the Sinhalese Kings.",
      SI: "සිංහල රජවරුන්ගේ අවසාන රාජකීය අගනුවර සහ උතුම්ම ආධ්‍යාත්මික පූජා භූමියයි."
    },
    bestTime: { EN: "July/August for the Perahera", SI: "පෙරහැර නැරඹීමට ජූලි හෝ අගෝස්තු කාලය" },
    tips: [
      { EN: "Visit during the 'Tewava' (prayer) hours (5:30am, 9:30am, 6:30pm) to hear the traditional drums.", SI: "පාරම්පරික බෙර වාදනය ඇසීමට පූජා පවත්වන වේලාවන්හිදී (පෙ.ව. 5:30, පෙ.ව. 9:30, ප.ව. 6:30) පැමිණෙන්න." },
      { EN: "Ensure your attire covers shoulders and knees completely.", SI: "ඔබේ ඇඳුම උරහිස් සහ දණහිස් සම්පූර්ණයෙන්ම වැසෙන පරිදි ඇති බවට වග බලා ගන්න." }
    ],
    location: "Kandy District"
  },
  {
    id: "ella",
    name: { EN: "Ella & Nine Arch Bridge", SI: "ඇල්ල සහ ආරුක්කු නවය පාළම" },
    category: "mountains",
    image: "https://images.unsplash.com/photo-1578519050142-afb511e518de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxsYXxlbnwwfHwwfHx8MA%3D%3Dauto=format&fit=crop&w=1200&q=80",
    history: {
      EN: "Ella is a high-altitude sanctuary famous for its breathtaking views and colonial-era engineering. The Nine Arch Bridge, also called the 'Bridge in the Sky', was built during the British colonial period entirely out of rocks, bricks, and cement without a single piece of steel. Legend says that when the Great War broke out, the steel assigned for the bridge was diverted to Britain's war effort, leading locals to build it using traditional materials. Surrounding the bridge are lush tea plantations and the famous 'Little Adam’s Peak', which offers a 360-degree panoramic view of the misty Uva mountains.",
      SI: "ඇල්ල යනු මීදුමෙන් වැසුණු කඳු සහ බ්‍රිතාන්‍ය යුගයේ ඉංජිනේරු විද්‍යාවේ ආශ්චර්යයන් සඳහා ප්‍රසිද්ධ කඳුකර නගරයකි. 'අහස් පාලම' ලෙසද හැඳින්වෙන ආරුක්කු නවය පාළම, කිසිදු වානේ කැබැල්ලක් භාවිතා නොකර කළුගල්, ගඩොල් සහ සිමෙන්ති පමණක් භාවිතා කර නිමවා ඇත. පළමු ලෝක යුද්ධය හේතුවෙන් වානේ හිඟ වූ බැවින් මෙය දේශීය ද්‍රව්‍ය වලින් නිම කළ බව පැවසේ. ඇල්ල අවට සශ්‍රීක තේ වතු සහ පුංචි සිරිපාදය පිහිටා ඇති අතර එතැන් සිට ඌව කඳුකරයේ අලංකාර දසුන් දැගත හැකිය."
    },
    shortStory: {
      EN: "Where the clouds touch the tea estates and history is written in stone and brick.",
      SI: "වලාකුළු තේ වතු සිපගන්නා, ගල් සහ ගඩොලින් ඉතිහාසය ලියැවුණු සොඳුරු ඉසව්වකි."
    },
    bestTime: { EN: "January to March", SI: "ජනවාරි සිට මාර්තු දක්වා" },
    tips: [
      { EN: "Check the train schedule locally to time your visit when the blue train passes over the bridge.", SI: "නිල් පැහැති දුම්රිය පාළම මතින් යන දසුන දැකගැනීමට ප්‍රාදේශීය දුම්රිය කාලසටහන පරීක්ෂා කරන්න." },
      { EN: "The hike to the bridge from Ella town takes about 30 minutes through jungle paths.", SI: "ඇල්ල නගරයේ සිට කැලෑ පාරවල් හරහා පාළම වෙත යාමට විනාඩි 30ක පමණ කාලයක් ගතවේ." }
    ],
    location: "Badulla District"
  },
  {
    id: "anuradhapura",
    name: { EN: "Anuradhapura", SI: "අනුරාධපුරය" },
    category: "ancient",
    image: "https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?auto=format&fit=crop&w=800&q=80",
    history: {
      EN: "Anuradhapura was the first capital of Sri Lanka and a major center of Theravada Buddhism for centuries.",
      SI: "අනුරාධපුරය ශ්‍රී ලංකාවේ ප්‍රථම අගනුවර වූ අතර ශතවර්ෂ ගණනාවක් පුරා ථෙරවාදී බුදුදහමේ ප්‍රධාන මධ්‍යස්ථානයක් විය."
    },
    shortStory: {
      EN: "Walk through the sacred city where kings ruled for over a millennium.",
      SI: "සහස්‍රයකට වැඩි කාලයක් රජවරුන් පාලනය කළ පූජනීය නගරය හරහා ගමන් කරන්න."
    },
    bestTime: { EN: "June to September", SI: "ජූනි සිට සැප්තැම්බර් දක්වා" },
    tips: [
      { EN: "Respect religious sites by covering shoulders.", SI: "උරහිස් වැසෙන සේ ඇඳුම් ඇඳීමෙන් ආගමික ස්ථාන වලට ගරු කරන්න." },
      { EN: "Rent a bicycle to explore.", SI: "ගවේෂණය කිරීමට බයිසිකලයක් කුලියට ගන්න." }
    ],
    location: "North Central Province"
  },
  {
    id: "mirissa",
    name: { EN: "Mirissa", SI: "මිරිස්ස" },
    category: "beach",
    image: "https://images.unsplash.com/photo-1649923113200-732d6fefbb6a?auto=format&fit=crop&w=800&q=80",
    history: {
      EN: "Mirissa is famous for its beautiful crescent-shaped beach and is a top spot for whale watching.",
      SI: "මිරිස්ස එහි ලස්සන අඩ සඳ හැඩැති වෙරළ තීරය සඳහා ප්‍රසිද්ධ වන අතර තල්මසුන් නැරඹීම සඳහා හොඳම ස්ථානයකි."
    },
    shortStory: {
      EN: "The ocean's whisper and golden sands await.",
      SI: "සාගරයේ මුමුණන හඬ සහ රන්වන් වැලි ඔබ එනතුරු බලා සිටී."
    },
    bestTime: { EN: "November to April", SI: "නොවැම්බර් සිට අප්‍රේල් දක්වා" },
    tips: [
      { EN: "Book whale watching in advance.", SI: "තල්මසුන් නැරඹීම කල්තියා වෙන්කරවා ගන්න." },
      { EN: "Visit Coconut Tree Hill for the view.", SI: "දසුන් නැරඹීමට කොකනට් ට්‍රී හිල් වෙත යන්න." }
    ],
    location: "Matara District"
  },
  {
    id: "yala",
    name: { EN: "Yala National Park", SI: "යාල ජාතික උද්‍යානය" },
    category: "wildlife",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    history: {
      EN: "Yala is the most visited and second largest national park in Sri Lanka, bordering the Indian Ocean.",
      SI: "යාල යනු ශ්‍රී ලංකාවේ වැඩිම පිරිසක් පැමිණෙන සහ දෙවන විශාලතම ජාතික උද්‍යානයයි."
    },
    shortStory: {
      EN: "Home to leopards, elephants, and crocodiles.",
      SI: "දිවියන්, අලි ඇතුන් සහ කිඹුලන්ගේ නිවහන."
    },
    bestTime: { EN: "February to June", SI: "පෙබරවාරි සිට ජූනි දක්වා" },
    tips: [
      { EN: "Bring binoculars.", SI: "දුරදක්න රැගෙන එන්න." },
      { EN: "Keep noise to a minimum.", SI: "ශබ්දය අවම මට්ටමක තබා ගන්න." }
    ],
    location: "Uva/Southern Province"
  }
];
