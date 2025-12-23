import {store} from '../store';
import {errorMessage} from '../store/user-data/user-data.ts';
import {clearErrorAction} from '../store/api-actions.ts';

export const handleErrorMessage = (message: string): void => {
  store.dispatch(errorMessage(message));
  store.dispatch(clearErrorAction());
};
