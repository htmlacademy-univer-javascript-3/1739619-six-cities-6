import {render, screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {withHistory, withStore} from '../../utils/mock-component';
import ProtectedRoute from './protected-route';
import {makeFakeStore} from '../../utils/mocks';

const publicRouteText = 'public route';
const privateRouteText = 'private route';

describe('Component: ProtectedRoute', () => {
  it('should render component for public route, when user not authorized', () => {
    const {withStoreComponent} = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{publicRouteText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <ProtectedRoute>
              <span>{privateRouteText}</span>
            </ProtectedRoute>
          }
        />
      </Routes>,
      makeFakeStore(AuthorizationStatus.NoAuth),
    );

    const preparedComponent = withHistory(withStoreComponent, [AppRoute.Favorites]);

    render(preparedComponent);

    expect(screen.getByText(publicRouteText)).toBeInTheDocument();
    expect(screen.queryByText(privateRouteText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const {withStoreComponent} = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{publicRouteText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <ProtectedRoute>
              <span>{privateRouteText}</span>
            </ProtectedRoute>
          }
        />
      </Routes>,
      makeFakeStore(AuthorizationStatus.Auth),
    );

    const preparedComponent = withHistory(withStoreComponent, [AppRoute.Favorites]);

    render(preparedComponent);

    expect(screen.getByText(privateRouteText)).toBeInTheDocument();
    expect(screen.queryByText(publicRouteText)).not.toBeInTheDocument();
  });
});
