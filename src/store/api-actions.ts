import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferPreview} from '../types/offers-preview.ts';
import {APIRoute} from '../const.ts';

export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, {
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);

    return data;
  }
);
