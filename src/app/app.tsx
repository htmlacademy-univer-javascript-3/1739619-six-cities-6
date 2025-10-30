import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from '../pages/main-screen/main-screen.tsx';
import AuthScreen from '../pages/auth-screen/auth-screen.tsx';
import OffersScreen from '../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen.tsx';
import NotFoundPage from '../pages/not-found-page/not-found-page.tsx';
import PrivateRoute from '../components/protected-route/protected-route.tsx';

import {AppRoute, AuthorizationStatus} from '../const.ts';
import {Offer} from '../types/offer.ts';

type AppProps = {
  offers: Offer[];
};

export default function App({offers}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen offers={offers}/>}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <AuthScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesScreen offers={offers}/>}
        />
        <Route
          path={`${AppRoute.Offer}/:offerId`}
          element={<OffersScreen offers={offers}/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>

  );
}
