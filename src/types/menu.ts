export type BranchId = 'imara-daima' | 'cbd' | 'karen' | 'haile' | 'delamere';

export interface Branch {
  id: BranchId;
  name: string;
  menuSource: string;
  heroImage: string;
  verification: string;
}

export interface Category {
  id: string;
  name: string;
  eyebrow: string;
  mediaSource: string;
  image: string;
}

export interface Product {
  id: string;
  category: string;
  name: string;
  prices: Partial<Record<BranchId, number>>;
  note?: string;
  pricePending?: boolean;
  image: string;
  fallbackImage: string;
}

export interface FeedbackDraft {
  branch: BranchId;
  ratings: Record<string, number>;
  guestName: string;
  waiterName: string;
  comment: string;
}
