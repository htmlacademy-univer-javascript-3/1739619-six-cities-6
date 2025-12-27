import {describe, expect, it} from 'vitest';
import {getAuthorizationStatus, getError, getUserData} from './selectors';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeStore, makeFakeUserData} from '../../utils/mocks';
import {State} from '../../types/state';

describe('User selectors', () => {
  it('should return auth status, user data, and error', () => {
    const user = makeFakeUserData();
    const state = makeFakeStore(AuthorizationStatus.Auth, {
      [NameSpace.Auth]: {
        status: AuthorizationStatus.Auth,
        user,
        error: 'Auth error',
      },
    }) as State;

    expect(getAuthorizationStatus(state)).toBe(AuthorizationStatus.Auth);
    expect(getUserData(state)).toEqual(user);
    expect(getError(state)).toBe('Auth error');
  });
});
