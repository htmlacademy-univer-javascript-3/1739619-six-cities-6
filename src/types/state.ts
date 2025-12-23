import {store} from '../store';
import {rootReducer} from '../store/root-reducer.ts';

export type State = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
