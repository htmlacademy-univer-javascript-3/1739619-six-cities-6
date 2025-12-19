import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferPreview} from '../types/offers-preview.ts';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const.ts';
import {AppDispatch, State} from '../types/state.ts';
import {requireAuthorization, setError} from './user-data/user-data.ts';
import {UserData} from '../types/user-data.ts';
import {AuthData} from '../types/auth-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {Offer} from '../types/offer.ts';
import {Review} from '../types/review.ts';
import {ReviewData} from '../types/review-data.ts';
import {FavoritesStatusData} from '../types/favorites-status-data.ts';

export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, {
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);

    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, OfferPreview['id'], {
  extra: AxiosInstance;
}>(
  'offer/fetchCurrentOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);

    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<OfferPreview[], OfferPreview['id'], {
  extra: AxiosInstance;
}>(
  'offer/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${offerId}/nearby`);

    return data;
  }
);

export const fetchOfferReviewsAction = createAsyncThunk<Review[], OfferPreview['id'], {
  extra: AxiosInstance;
}>(
  'offer/fetchReviews',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);

    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<OfferPreview[], undefined, {
  extra: AxiosInstance;
}>(
  'favorite/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Favorite);

    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<Offer, FavoritesStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/changeStatus',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);

    return data;
  }
);

export const postOfferReviewAction = createAsyncThunk<Review[], ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/postReview',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Review[] | Review>(`${APIRoute.Comments}/${offerId}`, {comment, rating});

    return Array.isArray(data) ? data : [data];
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);

    dispatch(fetchFavoritesAction());

    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
}>(
  'data/clearError',
  (_arg, {dispatch}) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
