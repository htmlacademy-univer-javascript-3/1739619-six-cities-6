import {createSlice} from '@reduxjs/toolkit';
import {fetchOffersAction} from '../api-actions.ts';
import {OffersCollectionState} from '../../types/offers-state.ts';
import {NameSpace} from '../../const.ts';

const initialState: OffersCollectionState = {
  items: [],
  isLoading: true,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
