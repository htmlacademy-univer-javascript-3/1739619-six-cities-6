import {createSlice} from '@reduxjs/toolkit';
import {FavoritesState} from '../../types/offers-state.ts';
import {NameSpace} from '../../const.ts';
import {changeFavoriteStatusAction, fetchFavoritesAction, logoutAction} from '../api-actions.ts';

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const existingIndex = state.items.findIndex((offer) => offer.id === updatedOffer.id);

        if (updatedOffer.isFavorite) {
          if (existingIndex === -1) {
            state.items.push(updatedOffer);
          } else {
            state.items[existingIndex] = updatedOffer;
          }
        } else if (existingIndex !== -1) {
          state.items.splice(existingIndex, 1);
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});
