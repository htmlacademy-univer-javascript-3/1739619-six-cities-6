import {describe, expect, it} from 'vitest';
import {getCurrentOffer, getCurrentOfferLoadingStatus, getNearbyOffers} from './selectors';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOffer, makeFakeOfferPreview, makeFakeStore} from '../../utils/mocks';
import {State} from '../../types/state';

describe('Offer details selectors', () => {
  it('should return current offer data, loading status, and nearby offers', () => {
    const currentOffer = makeFakeOffer('1');
    const nearbyOffers = [makeFakeOfferPreview('2'), makeFakeOfferPreview('3')];
    const state = makeFakeStore(AuthorizationStatus.NoAuth, {
      [NameSpace.OfferDetails]: {
        data: currentOffer,
        isLoading: false,
        nearbyOffers,
      },
    }) as State;

    expect(getCurrentOffer(state)).toEqual(currentOffer);
    expect(getCurrentOfferLoadingStatus(state)).toBe(false);
    expect(getNearbyOffers(state)).toEqual(nearbyOffers);
  });
});

