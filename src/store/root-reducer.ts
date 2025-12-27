import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {cityData} from './city-data/city-data.ts';
import {offersData} from './offers-data/offers-data.ts';
import {offerDetailsData} from './offer-details-data/offer-details-data.ts';
import {reviewsData} from './reviews-data/reviews-data.ts';
import {userData} from './user-data/user-data.ts';
import {favoritesData} from './favorites-data/favorites-data.ts';

export const rootReducer = combineReducers({
  [NameSpace.City]: cityData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.OfferDetails]: offerDetailsData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.Auth]: userData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
});
