import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from '../pages/main-screen/main-screen.tsx';
import AuthScreen from '../pages/auth-screen/auth-screen.tsx';
import OffersScreen from '../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen.tsx';
import NotFoundPage from '../pages/not-found-page/not-found-page.tsx';
import ProtectedRoute from '../components/protected-route/protected-route.tsx';
import {AppRoute} from '../const.ts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Login}
          element={
            <AuthScreen/>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <ProtectedRoute>
              <FavoritesScreen/>
            </ProtectedRoute>
          }
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
