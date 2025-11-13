import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';

export const changeCity = createAction<City>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');
