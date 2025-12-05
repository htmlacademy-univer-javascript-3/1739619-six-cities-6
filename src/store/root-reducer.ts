import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {cityProcess} from './city-process/city-process.ts';
import {offersData} from './offers-data/offers-data.ts';
import {offerDetailsData} from './offer-details-data/offer-details-data.ts';
import {reviewsData} from './reviews-data/reviews-data.ts';
import {userProcess} from './user-process/user-process.ts';
import {favoritesData} from './favorites-data/favorites-data.ts';

export const rootReducer = combineReducers({
  [NameSpace.City]: cityProcess.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.OfferDetails]: offerDetailsData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.Auth]: userProcess.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
});
