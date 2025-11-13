import {Location} from './location.ts';
import {CITY_NAMES} from '../const.ts';

export type CityName = (typeof CITY_NAMES)[number];

export type City = {
  name: CityName;
  location: Location;
};
