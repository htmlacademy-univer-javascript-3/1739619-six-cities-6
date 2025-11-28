import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {AuthorizationStatus} from '../const';

export const changeCity = createAction<City>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('game/setError');
