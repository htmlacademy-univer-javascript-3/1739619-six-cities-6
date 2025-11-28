import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, DEFAULT_CITY} from '../const.ts';
import {City} from '../types/city.ts';
import {OfferPreview} from '../types/offers-preview.ts';
import {changeCity, requireAuthorization, setError} from './action.ts';
import {
  checkAuthAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchOfferReviewsAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
  postOfferReviewAction
} from './api-actions.ts';
import {UserData} from '../types/user-data.ts';
import {Offer} from '../types/offer.ts';
import {Review} from '../types/review.ts';

export type OffersState = {
  city: City;
  offers: OfferPreview[];
  isOffersLoading: boolean;
  isCurrentOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userData: UserData | null;
  currentOffer: Offer | null;
  nearbyOffers: OfferPreview[];
  offerReviews: Review[];
  isReviewPosting: boolean;
};

export const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: true,
  isCurrentOfferLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: null,
  currentOffer: null,
  nearbyOffers: [],
  offerReviews: [],
  isReviewPosting: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.isCurrentOfferLoading = true;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isCurrentOfferLoading = false;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.isCurrentOfferLoading = false;
      state.currentOffer = null;
    })
    .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchNearbyOffersAction.rejected, (state) => {
      state.nearbyOffers = [];
    })
    .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(fetchOfferReviewsAction.rejected, (state) => {
      state.offerReviews = [];
    })
    .addCase(postOfferReviewAction.pending, (state) => {
      state.isReviewPosting = true;
    })
    .addCase(postOfferReviewAction.fulfilled, (state, action) => {
      state.offerReviews = action.payload.length === 1
        ? [action.payload[0], ...state.offerReviews]
        : action.payload;
      state.isReviewPosting = false;
    })
    .addCase(postOfferReviewAction.rejected, (state) => {
      state.isReviewPosting = false;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    })
    .addCase(loginAction.pending, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    })
    .addCase(checkAuthAction.pending, (state) => {
      state.authorizationStatus = AuthorizationStatus.Unknown;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.userData = null;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
