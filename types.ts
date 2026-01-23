
export type Language = 'EN' | 'SI';

export interface User {
  name: string;
  email: string;
  photo: string;
}

export interface Destination {
  id: string;
  name: { EN: string; SI: string };
  category: 'ancient' | 'beach' | 'wildlife' | 'mountains';
  image: string;
  gallery: string[];
  videoUrl?: string;
  history: { EN: string; SI: string };
  shortStory: { EN: string; SI: string };
  bestTime: { EN: string; SI: string };
  tips: { EN: string; SI: string }[];
  location: string;
}

export interface Food {
  id: string;
  name: { EN: string; SI: string };
  description: { EN: string; SI: string };
  image: string;
  spiciness: 1 | 2 | 3 | 4 | 5;
  ingredients: { EN: string; SI: string }[];
  tasteProfile: { EN: string; SI: string };
}

export interface Memory {
  id: string;
  userName: string;
  location: string;
  title: string;
  story: string;
  image: string;
  likes: number;
  date: string;
  rating: number;
  tags: string[];
}

export interface HeritageMusic {
  id: string;
  type: 'instrument' | 'song';
  name: { EN: string; SI: string };
  description: { EN: string; SI: string };
  image: string;
  origin: { EN: string; SI: string };
  significance: { EN: string; SI: string };
  sampleLyrics?: { EN: string; SI: string };
}

export interface TraditionalMedicine {
  id: string;
  type: 'herb' | 'treatment';
  name: { EN: string; SI: string };
  description: { EN: string; SI: string };
  image: string;
  benefits: { EN: string; SI: string };
  usage: { EN: string; SI: string };
}

export interface TeaExperience {
  id: string;
  name: { EN: string; SI: string };
  description: { EN: string; SI: string };
  image: string;
  type: 'variety' | 'process' | 'location';
  fact: { EN: string; SI: string };
}

export interface HikingSpot {
  id: string;
  name: { EN: string; SI: string };
  location: { EN: string; SI: string };
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Hard';
  duration: { EN: string; SI: string };
  description: { EN: string; SI: string };
  image: string;
  elevation: string;
}

export interface Phrase {
  id: string;
  english: string;
  sinhala: string;
  transliteration: string;
  category: 'greeting' | 'dining' | 'emergency' | 'shopping';
}

export interface TravelEssential {
  id: string;
  title: { EN: string; SI: string };
  description: { EN: string; SI: string };
  icon: string;
  tips: { EN: string; SI: string }[];
}

export interface Festival {
  id: string;
  name: { EN: string; SI: string };
  date: { EN: string; SI: string };
  description: { EN: string; SI: string };
  image: string;
  significance: { EN: string; SI: string };
}

export interface Translation {
  [key: string]: { EN: string; SI: string };
}

export interface QuizQuestion {
  id: string;
  question: { EN: string; SI: string };
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: { EN: string; SI: string };
  image: string;
  profileScore: 'ancient' | 'mountains' | 'beach' | 'wildlife';
}

export interface ExplorerProfile {
  id: string;
  name: { EN: string; SI: string };
  description: { EN: string; SI: string };
  image: string;
  recommendations: string[]; // Destination IDs
}