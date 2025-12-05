import {OfferPreview} from './offers-preview.ts';

export type FavoritesStatusData = {
  offerId: OfferPreview['id'];
  status: 0 | 1;
};
