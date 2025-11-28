import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferPreview} from '../types/offers-preview.ts';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const.ts';
import {AppDispatch, State} from '../types/state.ts';
import {requireAuthorization, setError} from './action.ts';
import {UserData} from '../types/user-data.ts';
import {AuthData} from '../types/auth-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {Offer} from '../types/offer.ts';
import {Review} from '../types/review.ts';

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

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));

    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);

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
