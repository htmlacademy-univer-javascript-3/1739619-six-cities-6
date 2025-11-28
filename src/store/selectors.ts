import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state';

export const selectCity = (state: State) => state.city;
export const selectOffers = (state: State) => state.offers;
export const selectOffersLoading = (state: State) => state.isOffersLoading;

export const selectAuthorizationStatus = (state: State) => state.authorizationStatus;

export const selectUserData = (state: State) => state.userData;

export const selectError = (state: State) => state.error;

export const selectOffersByCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);
