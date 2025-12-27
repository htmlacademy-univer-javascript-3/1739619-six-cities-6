import {describe, expect, it} from 'vitest';
import {cityData, currentCity} from './city-data.ts';
import {DEFAULT_CITY} from '../../const.ts';
import {mockCity} from '../../utils/mocks.ts';

describe('cityData slice', () => {
  it('should return initial state if state is undefined', () => {
    const emptyAction = { type: '' };
    const initialState = DEFAULT_CITY;

    const result = cityData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return initial state for empty action', () => {
    const expectedState = mockCity;
    const emptyAction = { type: '' };

    const result = cityData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it('should update the current city with currentCity', () => {
    const newCurrentCity = currentCity(mockCity);

    const result = cityData.reducer(DEFAULT_CITY, newCurrentCity);

    expect(result).toEqual(mockCity);
  });
});
