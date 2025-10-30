import {OfferPreview} from './offers-preview.ts';
import {User} from './user.ts';

export type Offer = OfferPreview & {
  description: string;
  images: string[];
  host: User;
  bedrooms: number;
  maxAdults: number;
};
