import {createReducer} from '@reduxjs/toolkit';
import {DEFAULT_CITY} from '../const.ts';
import {City} from '../types/city.ts';
import {OfferPreview} from '../types/offers-preview.ts';
import {changeCity} from './action.ts';
import {fetchOffersAction} from './api-actions.ts';

export type OffersState = {
  city: City;
  offers: OfferPreview[];
  isOffersLoading: boolean;
};

export const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: true,
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
    });
});
