import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';
import {OfferPreview} from '../../types/offers-preview.ts';
import {getCity} from '../city-process/selectors.ts';

export const getOffers = (state: State): OfferPreview[] => state[NameSpace.Offers].items;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isLoading;

export const getOffersByCity = createSelector(
  [getOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name),
);
