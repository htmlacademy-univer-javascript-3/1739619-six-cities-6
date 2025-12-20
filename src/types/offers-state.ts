import {AuthorizationStatus} from '../const.ts';
import {OfferPreview} from './offers-preview.ts';
import {Offer} from './offer.ts';
import {Review} from './review.ts';
import {UserData} from './user-data.ts';

export type OffersCollectionState = {
  items: OfferPreview[];
  isLoading: boolean;
};

export type FavoritesState = {
  items: OfferPreview[];
  isLoading: boolean;
};

export type OfferDetailsState = {
  data: Offer | null;
  isLoading: boolean;
  nearbyOffers: OfferPreview[];
};

export type ReviewsState = {
  items: Review[];
  isPosting: boolean;
};

export type AuthState = {
  status: AuthorizationStatus;
  user: UserData | null;
  error: string | null;
};
