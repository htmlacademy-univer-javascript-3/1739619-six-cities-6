import {describe, expect, it} from 'vitest';
import {AuthorizationStatus} from '../../const.ts';
import {userData, authorizationStatus, errorMessage, errorReset} from './user-data.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions.ts';
import {makeFakeUserData} from '../../utils/mocks.ts';

describe('userData slice', () => {
  const mockUser = makeFakeUserData();

  const mockLoginData = {
    login: 'test@test.com',
    password: 'password1',
  };

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: null,
      error: null,
    };

    const result = userData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return current state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      error: 'Error',
    };

    const result = userData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" with "authorizationStatus" action', () => {
    const expectedState = {
      status: AuthorizationStatus.Auth,
      user: null,
      error: null,
    };

    const result = userData.reducer(undefined, authorizationStatus(AuthorizationStatus.Auth));

    expect(result).toEqual(expectedState);
  });

  it('should set "error" with "errorMessage" action', () => {
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: null,
      error: 'Error',
    };

    const result = userData.reducer(undefined, errorMessage('Error'));

    expect(result).toEqual(expectedState);
  });

  it('should reset "error" to "null" with "errorReset" action', () => {
    const prevState = {
      status: AuthorizationStatus.Unknown,
      user: null,
      error: 'Error',
    };
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: null,
      error: null,
    };

    const result = userData.reducer(prevState, errorReset());

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Auth" and store "user" with "checkAuthAction.fulfilled"', () => {
    const expectedState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      error: null,
    };

    const result = userData.reducer(
      undefined,
      checkAuthAction.fulfilled(mockUser, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Unknown" with "checkAuthAction.pending"', () => {
    const prevState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      error: null,
    };
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: mockUser,
      error: null,
    };

    const result = userData.reducer(
      prevState,
      checkAuthAction.pending('', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "NoAuth" and clear "user" with "checkAuthAction.rejected"', () => {
    const prevState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      error: null,
    };
    const expectedState = {
      status: AuthorizationStatus.NoAuth,
      user: null,
      error: null,
    };

    const result = userData.reducer(
      prevState,
      checkAuthAction.rejected(null, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Auth" and store "user" with "loginAction.fulfilled"', () => {
    const expectedState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      error: null,
    };

    const result = userData.reducer(
      undefined,
      loginAction.fulfilled(mockUser, '', mockLoginData),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "Unknown" with "loginAction.pending"', () => {
    const prevState = {
      status: AuthorizationStatus.NoAuth,
      user: null,
      error: null,
    };
    const expectedState = {
      status: AuthorizationStatus.Unknown,
      user: null,
      error: null,
    };

    const result = userData.reducer(
      prevState,
      loginAction.pending('', mockLoginData),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "NoAuth" and clear "user" with "loginAction.rejected"', () => {
    const prevState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      error: null,
    };
    const expectedState = {
      status: AuthorizationStatus.NoAuth,
      user: null,
      error: null,
    };

    const result = userData.reducer(
      prevState,
      loginAction.rejected(null, '', mockLoginData),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "NoAuth" and clear "user" with "logoutAction.fulfilled"', () => {
    const prevState = {
      status: AuthorizationStatus.Auth,
      user: mockUser,
      error: null,
    };
    const expectedState = {
      status: AuthorizationStatus.NoAuth,
      user: null,
      error: null,
    };

    const result = userData.reducer(
      prevState,
      logoutAction.fulfilled(undefined, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });
});
