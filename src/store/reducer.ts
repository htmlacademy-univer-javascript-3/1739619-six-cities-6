import {createReducer} from '@reduxjs/toolkit';
import {DEFAULT_CITY} from '../const.ts';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {changeCity, loadOffers} from './action.ts';

export type OffersState = {
  city: City;
  offers: Offer[];
};

export const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
