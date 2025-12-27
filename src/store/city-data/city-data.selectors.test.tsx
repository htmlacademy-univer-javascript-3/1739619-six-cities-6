import {describe, expect, it} from 'vitest';
import {getCity} from './selectors';
import {makeFakeStore, mockCity} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';

describe('City selectors', () => {
  it('should return current city from state', () => {
    const state = makeFakeStore(AuthorizationStatus.NoAuth, {
      [NameSpace.City]: mockCity,
    }) as State;

    expect(getCity(state)).toEqual(mockCity);
  });
});
