import {createSlice} from '@reduxjs/toolkit';
import {fetchNearbyOffersAction, fetchOfferAction} from '../api-actions.ts';
import {OfferDetailsState} from '../../types/offers-state.ts';
import {NameSpace} from '../../const.ts';

const initialState: OfferDetailsState = {
  data: null,
  isLoading: true,
  nearby: [],
};

export const offerDetailsData = createSlice({
  name: NameSpace.OfferDetails,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isLoading = false;
        state.data = null;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearby = [];
      });
  },
});
