import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';
import {Offer} from '../../types/offer.ts';
import {OfferPreview} from '../../types/offers-preview.ts';

export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.OfferDetails].data;
export const getCurrentOfferLoadingStatus = (state: State): boolean => state[NameSpace.OfferDetails].isLoading;
export const getNearbyOffers = (state: State): OfferPreview[] => state[NameSpace.OfferDetails].nearby;
