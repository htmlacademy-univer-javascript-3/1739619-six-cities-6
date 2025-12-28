import {render, screen} from '@testing-library/react';
import App from './app';
import {APIRoute, AppRoute, AuthorizationStatus, NameSpace} from '../const';
import {withStore} from '../hocs';
import {makeFakeStore} from '../utils';

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    window.history.pushState({}, '', AppRoute.Main);
    const {withStoreComponent} = withStore(<App />, makeFakeStore(AuthorizationStatus.NoAuth, {
      [NameSpace.Offers]: {items: [], isLoading: true},
    }));

    render(withStoreComponent);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    window.history.pushState({}, '', AppRoute.Login);
    const {withStoreComponent} = withStore(<App />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByRole('heading', {name: /sign in/i})).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites" and is authorized', () => {
    window.history.pushState({}, '', AppRoute.Favorites);
    const {withStoreComponent, mockAxiosAdapter} = withStore(
      <App />,
      makeFakeStore(AuthorizationStatus.Auth),
    );

    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);

    render(withStoreComponent);

    expect(screen.getByText(/saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/nothing yet saved\./i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/favorites" and is not authorized', () => {
    window.history.pushState({}, '', AppRoute.Favorites);
    const {withStoreComponent} = withStore(<App />, makeFakeStore(AuthorizationStatus.NoAuth));

    render(withStoreComponent);

    expect(screen.getByRole('heading', {name: /sign in/i})).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    window.history.pushState({}, '', '/unknown-route');
    const {withStoreComponent} = withStore(<App />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/404 - page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/вернуться на главную страницу/i)).toBeInTheDocument();
  });
});
