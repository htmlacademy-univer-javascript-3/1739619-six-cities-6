import {describe, expect, it} from 'vitest';
import {favoritesData} from './favorites-data.ts';
import {changeFavoriteStatusAction, fetchFavoritesAction, logoutAction} from '../api-actions.ts';
import {FavoriteStatus} from '../../const.ts';
import {makeFakeOffer, makeFakeOfferPreview} from '../../utils/mocks.ts';

describe('favoritesData slice', () => {
  const mockFavoritesStatusData = {
    offerId: '1',
    status: FavoriteStatus.Favorite,
  };

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [],
      isLoading: false,
    };

    const result = favoritesData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [],
      isLoading: false,
    };

    const result = favoritesData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "fetchFavoritesAction.pending"', () => {
    const expectedState = {items: [], isLoading: true};

    const result = favoritesData.reducer(
      undefined,
      fetchFavoritesAction.pending('', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with items, "isLoading" to "false" with "fetchFavoritesAction.fulfilled', () => {
    const mockFavorites = [makeFakeOfferPreview('1', true)];
    const expectedState = {
      items: mockFavorites,
      isLoading: false,
    };

    const result = favoritesData.reducer(
      undefined,
      fetchFavoritesAction.fulfilled(mockFavorites, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "fetchFavoritesAction.rejected"', () => {
    const expectedState = {
      items: [],
      isLoading: false,
    };

    const result = favoritesData.reducer(
      undefined,
      fetchFavoritesAction.rejected(null, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should add offer to favorites when "changeFavoriteStatusAction.fulfilled" and item is missing', () => {
    const updatedOffer = makeFakeOffer('1', true);

    const result = favoritesData.reducer(
      undefined,
      changeFavoriteStatusAction.fulfilled(updatedOffer, '', mockFavoritesStatusData),
    ).items;

    expect(result).toEqual([updatedOffer]);
  });

  it('should update existing favorite when "changeFavoriteStatusAction.fulfilled"', () => {
    const prevState = {
      items: [makeFakeOfferPreview('1', true)],
      isLoading: false
    };
    const updatedOffer = makeFakeOffer('1', true);

    const result = favoritesData.reducer(
      prevState,
      changeFavoriteStatusAction.fulfilled(updatedOffer, '', mockFavoritesStatusData),
    ).items;

    expect(result).toEqual([updatedOffer]);
  });

  it('should remove offer from favorites when "changeFavoriteStatusAction.fulfilled" with "isFavorite: false"', () => {
    const prevState = {
      items: [makeFakeOfferPreview('1', true)],
      isLoading: false
    };
    const updatedOffer = makeFakeOffer('1', false);

    const result = favoritesData.reducer(
      prevState,
      changeFavoriteStatusAction.fulfilled(updatedOffer, '', mockFavoritesStatusData),
    ).items;

    expect(result).toEqual([]);
  });

  it('should stop loading with "logoutAction.fulfilled"', () => {
    const prevState = {
      items: [makeFakeOfferPreview('1', true)],
      isLoading: true
    };
    const expectedState = {
      items: [makeFakeOfferPreview('1', true)],
      isLoading: false,
    };

    const result = favoritesData.reducer(prevState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
