import {errorMessage} from '../store/user-data/user-data.ts';
import {clearErrorAction} from '../store/api-actions.ts';
import {AppDispatch} from '../types/state.ts';

let dispatch: AppDispatch | null = null;

export const bindErrorHandler = (appDispatch: AppDispatch): void => {
  dispatch = appDispatch;
};

export const handleErrorMessage = (message: string): void => {
  if (!dispatch) {
    return;
  }

  dispatch(errorMessage(message));
  dispatch(clearErrorAction());
};
