import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';

const OFFERS_COUNT = 5;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_COUNT}/>
  </React.StrictMode>
);
