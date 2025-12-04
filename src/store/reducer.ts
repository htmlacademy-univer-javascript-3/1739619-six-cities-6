import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, DEFAULT_CITY} from '../const.ts';
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
import {OffersState} from '../types/offers-state.ts';

export const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: {
    items: [],
    isLoading: true,
  },
  offerDetails: {
    data: null,
    isLoading: true,
    nearby: [],
  },
  reviews: {
    items: [],
    isPosting: false,
  },
  auth: {
    status: AuthorizationStatus.Unknown,
    user: null,
    error: null,
  },
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.offers.isLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers.items = action.payload;
      state.offers.isLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offers.isLoading = false;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.offerDetails.isLoading = true;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offerDetails.data = action.payload;
      state.offerDetails.isLoading = false;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.offerDetails.isLoading = false;
      state.offerDetails.data = null;
    })
    .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
      state.offerDetails.nearby = action.payload;
    })
    .addCase(fetchNearbyOffersAction.rejected, (state) => {
      state.offerDetails.nearby = [];
    })
    .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
      state.reviews.items = action.payload;
    })
    .addCase(fetchOfferReviewsAction.rejected, (state) => {
      state.reviews.items = [];
    })
    .addCase(postOfferReviewAction.pending, (state) => {
      state.reviews.isPosting = true;
    })
    .addCase(postOfferReviewAction.fulfilled, (state, action) => {
      state.reviews.items = action.payload.length === 1
        ? [action.payload[0], ...state.reviews.items]
        : action.payload;
      state.reviews.isPosting = false;
    })
    .addCase(postOfferReviewAction.rejected, (state) => {
      state.reviews.isPosting = false;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.auth.status = action.payload;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.auth.status = AuthorizationStatus.Auth;
      state.auth.user = action.payload;
    })
    .addCase(loginAction.pending, (state) => {
      state.auth.status = AuthorizationStatus.Unknown;
    })
    .addCase(loginAction.rejected, (state) => {
      state.auth.status = AuthorizationStatus.NoAuth;
      state.auth.user = null;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.auth.status = AuthorizationStatus.Auth;
      state.auth.user = action.payload;
    })
    .addCase(checkAuthAction.pending, (state) => {
      state.auth.status = AuthorizationStatus.Unknown;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.auth.user = null;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.auth.status = AuthorizationStatus.NoAuth;
      state.auth.user = null;
    })
    .addCase(setError, (state, action) => {
      state.auth.error = action.payload;
    });
});
