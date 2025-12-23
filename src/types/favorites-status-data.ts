import {OfferPreview} from './offers-preview.ts';
import {FavoriteStatus} from '../const.ts';

export type FavoritesStatusData = {
  offerId: OfferPreview['id'];
  status: FavoriteStatus;
};
