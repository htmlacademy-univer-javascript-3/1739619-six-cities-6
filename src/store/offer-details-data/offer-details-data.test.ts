import {describe, expect, it} from 'vitest';
import {offerDetailsData} from './offer-details-data.ts';
import {
  changeFavoriteStatusAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
} from '../api-actions.ts';
import {FavoriteStatus} from '../../const.ts';
import {makeFakeOffer, makeFakeOfferPreview} from '../../utils/mocks.ts';

describe('offerDetailsData slice', () => {
  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      data: null,
      isLoading: true,
      nearbyOffers: [],
    };

    const result = offerDetailsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return current state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      data: makeFakeOffer('1'),
      isLoading: false,
      nearbyOffers: [makeFakeOfferPreview('2')],
    };

    const result = offerDetailsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true" with "fetchOfferAction.pending"', () => {
    const prevState = {
      data: null,
      isLoading: false,
      nearbyOffers: []
    };
    const expectedState = {
      data: null,
      isLoading: true,
      nearbyOffers: []
    };

    const result = offerDetailsData.reducer(
      prevState,
      fetchOfferAction.pending('', '1'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "data" to offer, "isLoading" to "false" with "fetchOfferAction.fulfilled"', () => {
    const mockOffer = makeFakeOffer('1');
    const expectedState = {
      data: mockOffer,
      isLoading: false,
      nearbyOffers: [],
    };

    const result = offerDetailsData.reducer(
      undefined,
      fetchOfferAction.fulfilled(mockOffer, '', '1'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "data" to "null", "isLoading" to "false" with "fetchOfferAction.rejected"', () => {
    const prevState = {
      data: makeFakeOffer('1'),
      isLoading: true,
      nearbyOffers: [makeFakeOfferPreview('2')],
    };
    const expectedState = {
      data: null,
      isLoading: false,
      nearbyOffers: [makeFakeOfferPreview('2')],
    };

    const result = offerDetailsData.reducer(
      prevState,
      fetchOfferAction.rejected(null, '', '1'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" to array with items with "fetchNearbyOffersAction.fulfilled"', () => {
    const mockNearbyOffers = [makeFakeOfferPreview('2'), makeFakeOfferPreview('3')];
    const expectedState = {
      data: null,
      isLoading: true,
      nearbyOffers: mockNearbyOffers,
    };

    const result = offerDetailsData.reducer(
      undefined,
      fetchNearbyOffersAction.fulfilled(mockNearbyOffers, '', '1'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" to empty array with "fetchNearbyOffersAction.rejected"', () => {
    const prevState = {
      data: null,
      isLoading: true,
      nearbyOffers: [makeFakeOfferPreview('2')],
    };
    const expectedState = {
      data: null,
      isLoading: true,
      nearbyOffers: [],
    };

    const result = offerDetailsData.reducer(
      prevState,
      fetchNearbyOffersAction.rejected(null, '', '1'),
    );

    expect(result).toEqual(expectedState);
  });

  it('should update "data" and matching "nearbyOffers" item on "changeFavoriteStatusAction.fulfilled"', () => {
    const prevState = {
      data: makeFakeOffer('1', false),
      isLoading: false,
      nearbyOffers: [makeFakeOfferPreview('1', false), makeFakeOfferPreview('2')],
    };
    const updatedOffer = makeFakeOffer('1', true);
    const mockFavoriteStatusData = {
      offerId: '1',
      status: FavoriteStatus.Favorite,
    };

    const result = offerDetailsData.reducer(
      prevState,
      changeFavoriteStatusAction.fulfilled(updatedOffer, '', mockFavoriteStatusData),
    );

    expect(result.data?.isFavorite).toBe(true);
    expect(result.nearbyOffers[0].isFavorite).toBe(true);
  });
});
