import {describe, expect, it} from 'vitest';
import {getFavoriteOffers, getFavoriteOffersCount, getFavoritesLoadingStatus} from './selectors';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOfferPreview, makeFakeStore} from '../../utils/mocks';
import {State} from '../../types/state';

describe('Favorites selectors', () => {
  it('should return favorite offers, count, and loading status', () => {
    const favorites = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
    const state = makeFakeStore(AuthorizationStatus.NoAuth, {
      [NameSpace.Favorites]: {
        items: favorites,
        isLoading: false,
      },
    }) as State;

    expect(getFavoriteOffers(state)).toEqual(favorites);
    expect(getFavoriteOffersCount(state)).toBe(2);
    expect(getFavoritesLoadingStatus(state)).toBe(false);
  });
});
