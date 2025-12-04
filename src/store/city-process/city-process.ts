import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_CITY, NameSpace} from '../../const.ts';
import {City} from '../../types/city.ts';

const initialState: City = DEFAULT_CITY;

export const cityProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (_state, action: PayloadAction<City>) => action.payload,
  },
});

export const {changeCity} = cityProcess.actions;
