import {OfferPreview} from './offers-preview.ts';

export type ReviewData = {
  comment: string;
  rating: number;
  offerId: OfferPreview['id'];
};
