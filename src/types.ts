export interface HeritageSite {
  id: string;
  name: string;
  tamilName?: string;
  category: 'temple' | 'museum' | 'fort' | 'palace' | 'beach' | 'nature' | 'monument';
  district: string;
  city: string;
  dynasty?: string;
  constructionYear?: string;
  architecture?: string;
  unescoStatus: boolean;
  timings: string;
  entryFees: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  history: string;
  visitorTips: string[];
  festivals: string[];
  dressCode?: string;
  image: string;
  audioGuideUrl?: string;
  gallery: string[];
  videoUrl?: string;
  rating: number;
}

export interface Business {
  id: string;
  name: string;
  category: 'restaurant' | 'hotel' | 'tea_shop' | 'handicrafts' | 'souvenirs' | 'taxi' | 'guide' | 'medical';
  description: string;
  rating: number;
  reviewsCount: number;
  contact: string;
  distance: string; // e.g. "450m"
  isOpen: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  image: string;
  heritageSiteId: string; // Associated heritage site
}

export interface Review {
  id: string;
  siteId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  images?: string[];
  reply?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  locationName: string;
  fees: string;
  category?: 'temple' | 'dining' | 'sightseeing' | 'shopping' | 'travel' | 'relax' | string;
  insiderTip?: string;
  completed?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: ItineraryActivity[];
}

export interface CostBreakdown {
  accommodation: string;
  food: string;
  activities: string;
  transport: string;
  total: string;
}

export interface Itinerary {
  title: string;
  duration: number;
  budget: string;
  theme: string;
  pace?: string;
  dietary?: string;
  estimatedCost?: CostBreakdown;
  days: ItineraryDay[];
  tips: string[];
}
