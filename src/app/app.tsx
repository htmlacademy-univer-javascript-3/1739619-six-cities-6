import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from '../pages/main-screen/main-screen.tsx';
import AuthScreen from '../pages/auth-screen/auth-screen.tsx';
import OffersScreen from '../pages/offer-screen/offer-screen.tsx';
import NotFoundPage from '../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from '../components/protected-route/protected-route.tsx';

import {AppRoute, AuthorizationStatus} from '../const.ts';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen.tsx';

type AppProps = {
  offersCount: number;
};

export default function App({offersCount}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen offersCount={offersCount}/>}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <AuthScreen/>
            </PrivateRoute>
          }
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
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>

  );
}
