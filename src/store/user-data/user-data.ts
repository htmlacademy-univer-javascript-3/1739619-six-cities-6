import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {AuthState} from '../../types/offers-state.ts';
import {UserData} from '../../types/user-data.ts';
import {loginAction, logoutAction} from '../api-actions.ts';

const initialState: AuthState = {
  status: AuthorizationStatus.Unknown,
  user: null,
  error: null,
};

export const userData = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.status = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.pending, (state) => {
        state.status = AuthorizationStatus.Unknown;
      })
      .addCase(loginAction.rejected, (state) => {
        state.status = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  },
});

export const {requireAuthorization, setError} = userData.actions;
