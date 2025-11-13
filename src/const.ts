import {cityMap} from './mocks/city.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;
export const RATING_VALUES = [5, 4, 3, 2, 1] as const;
export const RATING_TITLES: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export const URL_MARKER_DEFAULT = '../public/img/pin.svg';

export const URL_MARKER_CURRENT = '../public/img/pin-active.svg';

export const NEARBY_OFFERS_LIMIT = 3;

export const CITY_NAMES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const DEFAULT_CITY = cityMap.Paris;
