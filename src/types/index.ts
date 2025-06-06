export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: 'whatsapp' | 'paytm' | 'google-maps' | 'general';
}

export interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
  category: 'whatsapp' | 'paytm' | 'google-maps' | 'general';
}