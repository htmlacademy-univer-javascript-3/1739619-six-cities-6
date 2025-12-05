import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';
import {UserData} from '../../types/user-data.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.Auth].status;
export const getUserData = (state: State): UserData | null => state[NameSpace.Auth].user;
export const getError = (state: State): string | null => state[NameSpace.Auth].error;
