export const CARD_CLASS_MAP = {
  cities: 'cities__card place-card',
  favorites: 'favorites__card place-card',
  'near-places': 'near-places__card place-card',
} as const;

export const IMAGE_WRAPPER_CLASS_MAP = {
  cities: 'cities__image-wrapper place-card__image-wrapper',
  favorites: 'favorites__image-wrapper place-card__image-wrapper',
  'near-places': 'near-places__image-wrapper place-card__image-wrapper',
} as const;

export const INFO_CLASS_MAP = {
  cities: 'place-card__info',
  favorites: 'favorites__card-info place-card__info',
  'near-places': 'place-card__info',
} as const;

export const IMAGE_SIZE_MAP = {
  cities: { width: 260, height: 200 },
  favorites: { width: 150, height: 110 },
  'near-places': { width: 260, height: 200 },
} as const;

export const BOOKMARK_TEXT = {
  active: 'In bookmarks',
  inactive: 'To bookmarks',
} as const;

export const PREMIUM_LABEL = 'Premium';
export const BOOKMARK_ICON_SIZE = { width: 18, height: 19 } as const;
