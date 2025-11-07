import {OfferPreview} from './offers-preview.ts';
import {User} from './user.ts';

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
  offerId: OfferPreview['id'];
};
