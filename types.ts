
export type Language = 'EN' | 'SI';

export interface Destination {
  id: string;
  name: { EN: string; SI: string };
  category: 'ancient' | 'beach' | 'wildlife' | 'mountains';
  image: string;
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

export interface Translation {
  [key: string]: { EN: string; SI: string };
}
