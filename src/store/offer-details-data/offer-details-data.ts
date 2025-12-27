import {createSlice} from '@reduxjs/toolkit';
import {changeFavoriteStatusAction, fetchNearbyOffersAction, fetchOfferAction} from '../api-actions.ts';
import {OfferDetailsState} from '../../types/offers-state.ts';
import {NameSpace} from '../../const.ts';

const initialState: OfferDetailsState = {
  data: null,
  isLoading: true,
  nearbyOffers: [],
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
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updated = action.payload;

        if (state.data?.id === updated.id) {
          Object.assign(state.data, updated);
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updated.id ? { ...offer, ...updated } : offer
        );
      });
  },
});
