import {Route, BrowserRouter, Routes} from 'react-router-dom';
import MainScreen from '../pages/main-screen/main-screen.tsx';
import AuthScreen from '../pages/auth-screen/auth-screen.tsx';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen.tsx';
import OffersScreen from '../pages/offer-screen/offer-screen.tsx';
import NotFoundPage from '../pages/not-found-page/not-found-page.tsx';

import {AppRoute} from '../const.ts';

type AppProps = {
  offersCount: number;
};

export default function App({ offersCount }: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen offersCount={offersCount}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<AuthScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesScreen/>}
        />
        <Route
          path={`${AppRoute.Offer}/:offerId`}
          element={<OffersScreen/>}
        />
        <Route
          path='*'
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>

  );
}
