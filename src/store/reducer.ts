import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, DEFAULT_CITY} from '../const.ts';
import {City} from '../types/city.ts';
import {OfferPreview} from '../types/offers-preview.ts';
import {changeCity, requireAuthorization, setError} from './action.ts';
import {checkAuthAction, fetchOffersAction, loginAction, logoutAction} from './api-actions.ts';
import {UserData} from '../types/user-data.ts';

export type OffersState = {
  city: City;
  offers: OfferPreview[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userData: UserData | null;
};

export const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: null,
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
