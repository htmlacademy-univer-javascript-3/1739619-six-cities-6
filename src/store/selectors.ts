import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state';

export const selectCity = (state: State) => state.city;
export const selectOffers = (state: State) => state.offers;
export const selectOffersLoading = (state: State) => state.isOffersLoading;

export const selectCurrentOffer = (state: State) => state.currentOffer;
export const selectCurrentOfferLoading = (state: State) => state.isCurrentOfferLoading;

export const selectNearbyOffers = (state: State) => state.nearbyOffers;

export const selectOfferReviews = (state: State) => state.offerReviews;
export const selectAuthorizationStatus = (state: State) => state.authorizationStatus;

export const selectIsReviewPosting = (state: State) => state.isReviewPosting;

export const selectUserData = (state: State) => state.userData;

export const selectError = (state: State) => state.error;

export const selectOffersByCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);
