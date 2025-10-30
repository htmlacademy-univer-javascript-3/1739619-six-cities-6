import {City} from './city.ts';
import {Location} from './location.ts';

export type OfferPreview = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  goods: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
};
