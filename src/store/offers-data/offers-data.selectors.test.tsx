import {describe, expect, it} from 'vitest';
import {getOffers, getOffersByCity, getOffersLoadingStatus} from './selectors';
import {AuthorizationStatus, CITIES, NameSpace} from '../../const';
import {makeFakeOfferPreview, makeFakeStore, mockCity} from '../../utils/mocks';
import {State} from '../../types/state';

describe('Offers selectors', () => {
  it('should return offers, loading status, and filtered list by city', () => {
    const otherCityOffer = {
      ...makeFakeOfferPreview('2'),
      city: CITIES.Paris,
    };
    const offers = [makeFakeOfferPreview('1'), otherCityOffer];
    const state = makeFakeStore(AuthorizationStatus.NoAuth, {
      [NameSpace.City]: mockCity,
      [NameSpace.Offers]: {
        items: offers,
        isLoading: false,
      },
    }) as State;

    expect(getOffers(state)).toEqual(offers);
    expect(getOffersLoadingStatus(state)).toBe(false);
    expect(getOffersByCity(state)).toEqual([offers[0]]);
  });
});
