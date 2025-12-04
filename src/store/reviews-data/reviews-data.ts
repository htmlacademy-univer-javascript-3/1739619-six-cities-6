import {createSlice} from '@reduxjs/toolkit';
import {fetchOfferReviewsAction, postOfferReviewAction} from '../api-actions.ts';
import {ReviewsState} from '../../types/offers-state.ts';
import {NameSpace} from '../../const.ts';

const initialState: ReviewsState = {
  items: [],
  isPosting: false,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchOfferReviewsAction.rejected, (state) => {
        state.items = [];
      })
      .addCase(postOfferReviewAction.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postOfferReviewAction.fulfilled, (state, action) => {
        state.items = action.payload.length === 1
          ? [action.payload[0], ...state.items]
          : action.payload;
        state.isPosting = false;
      })
      .addCase(postOfferReviewAction.rejected, (state) => {
        state.isPosting = false;
      });
  },
});
