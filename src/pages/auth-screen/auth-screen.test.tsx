import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Route, Routes} from 'react-router-dom';
import {vi} from 'vitest';
import AuthScreen from './auth-screen';
import {withHistory, withStore} from '../../utils/mock-component';
import {AuthorizationStatus, AppRoute} from '../../const';
import {makeFakeStore} from '../../utils/mocks';
import {loginAction} from '../../store/api-actions';

vi.mock('../../store/api-actions', () => ({
  loginAction: vi.fn(() => ({type: 'user/login'})),
}));

describe('Page: AuthScreen', () => {
  it('should submit login form with valid credentials', async () => {
    const user = userEvent.setup();
    const {withStoreComponent, mockStore} = withStore(
      <AuthScreen />,
      makeFakeStore(AuthorizationStatus.NoAuth),
    );

    render(withHistory(withStoreComponent, [AppRoute.Login]));

    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password1');
    await user.click(screen.getByRole('button', {name: /sign in/i}));

    expect(loginAction).toHaveBeenCalledWith({login: 'test@test.com', password: 'password1'});
    expect(mockStore.getActions()).toContainEqual({type: 'user/login'});
  });

  it('should redirect to main when user is authorized', () => {
    const {withStoreComponent} = withStore(
      (
        <Routes>
          <Route path={AppRoute.Login} element={<AuthScreen />} />
          <Route path={AppRoute.Main} element={<div>Home page</div>} />
        </Routes>
      ),
      makeFakeStore(AuthorizationStatus.Auth),
    );

    render(withHistory(withStoreComponent, [AppRoute.Login]));

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
