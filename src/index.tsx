import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import {Provider} from 'react-redux';
import {store} from './store';
import {loadOffers} from './store/action.ts';
import {Offer} from './types/offer.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const offers: Offer[] = [];

store.dispatch(loadOffers(offers));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>

  </React.StrictMode>
);
