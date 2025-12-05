import {AuthorizationStatus} from '../const.ts';
import {City} from './city.ts';
import {OfferPreview} from './offers-preview.ts';
import {Offer} from './offer.ts';
import {Review} from './review.ts';
import {UserData} from './user-data.ts';

export type OffersCollectionState = {
  items: OfferPreview[];
  isLoading: boolean;
};

export type OfferDetailsState = {
  data: Offer | null;
  isLoading: boolean;
  nearby: OfferPreview[];
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

export type OffersState = {
  city: City;
  offers: OffersCollectionState;
  offerDetails: OfferDetailsState;
  reviews: ReviewsState;
  auth: AuthState;
};
