import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state';

export const selectCity = (state: State) => state.city;
export const selectOffers = (state: State) => state.offers.items;
export const selectOffersLoading = (state: State) => state.offers.isLoading;

export const selectCurrentOffer = (state: State) => state.offerDetails.data;
export const selectCurrentOfferLoading = (state: State) => state.offerDetails.isLoading;

export const selectNearbyOffers = (state: State) => state.offerDetails.nearby;

export const selectOfferReviews = (state: State) => state.reviews.items;
export const selectAuthorizationStatus = (state: State) => state.auth.status;

export const selectIsReviewPosting = (state: State) => state.reviews.isPosting;

export const selectUserData = (state: State) => state.auth.user;

export const selectError = (state: State) => state.auth.error;

export const selectOffersByCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);
