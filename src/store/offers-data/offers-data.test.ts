import {describe, expect, it} from 'vitest';
import {offersData} from './offers-data.ts';
import {changeFavoriteStatusAction, fetchOffersAction} from '../api-actions.ts';
import {FavoriteStatus} from '../../const.ts';
import {makeFakeOffer, makeFakeOfferPreview} from '../../utils/mocks.ts';

describe('offersData slice', () => {
  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [],
      isLoading: true,
    };

    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return current state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [makeFakeOfferPreview('1')],
      isLoading: false,
    };

    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "fetchOffersAction.pending"', () => {
    const prevState = {
      items: [makeFakeOfferPreview('1')],
      isLoading: false
    };
    const expectedState = {
      items: [makeFakeOfferPreview('1')],
      isLoading: true
    };

    const result = offersData.reducer(
      prevState,
      fetchOffersAction.pending('', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "items" to array with offers, "isLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
    const expectedState = {
      items: mockOffers,
      isLoading: false,
    };

    const result = offersData.reducer(
      undefined,
      fetchOffersAction.fulfilled(mockOffers, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false" with "fetchOffersAction.rejected"', () => {
    const prevState = {
      items: [makeFakeOfferPreview('1')],
      isLoading: true
    };
    const expectedState = {
      items: [makeFakeOfferPreview('1')],
      isLoading: false
    };

    const result = offersData.reducer(
      prevState,
      fetchOffersAction.rejected(null, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should update offer in "items" on "changeFavoriteStatusAction.fulfilled"', () => {
    const prevState = {items: [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')], isLoading: false};
    const updatedOffer = makeFakeOffer('1', true);
    const mockFavoriteStatusData = {
      offerId: '1',
      status: FavoriteStatus.Favorite,
    };

    const nextState = offersData.reducer(
      prevState,
      changeFavoriteStatusAction.fulfilled(updatedOffer, 'request', mockFavoriteStatusData),
    );

    expect(nextState.items[0]).toEqual(updatedOffer);
    expect(nextState.items[1]).toEqual(prevState.items[1]);
  });
});
