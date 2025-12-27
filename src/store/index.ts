import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createAPI } from '../services/api';
import { bindErrorHandler } from '../services/handle-error-message';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

bindErrorHandler(store.dispatch);
