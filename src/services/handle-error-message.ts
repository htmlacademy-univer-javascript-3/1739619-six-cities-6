import {store} from '../store';
import {setError} from '../store/user-data/user-data.ts';
import {clearErrorAction} from '../store/api-actions.ts';

export const handleErrorMessage = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
