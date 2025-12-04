import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';
import {OfferPreview} from '../../types/offers-preview.ts';

export const getFavoriteOffers = (state: State): OfferPreview[] => state[NameSpace.Favorites].items;
export const getFavoriteOffersCount = (state: State): number => state[NameSpace.Favorites].items.length;
export const getFavoritesLoadingStatus = (state: State): boolean => state[NameSpace.Favorites].isLoading;
