import {FormEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, passwordStrengthRegex} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions.ts';
import {getAuthorizationStatus, getError} from '../../store/user-data/selectors.ts';
import {AuthFormState} from '../../types/auth-form-state.ts';
import HeaderLogo from '../../components/header-logo/header-logo.tsx';
import AmsterdamLink from '../../components/amsterdam-link/amsterdam-link.tsx';

export default function AuthScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [formState, setFormState] = useState<AuthFormState>({
    data: {
      email: '',
      password: '',
    },
    validation: null,
  });
  const authError = useAppSelector(getError);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main}/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const {email, password} = formState.data;

    const passwordHasLetterAndNumber = passwordStrengthRegex.test(password);

    if (!email || !password.trim()) {
      setFormState((prev) => ({...prev, validation: 'Введите email и пароль.'}));
      return;
    }

    if (!passwordHasLetterAndNumber) {
      setFormState((prev) => ({...prev, validation: 'Пароль должен содержать хотя бы одну букву и цифру.'}));
      return;
    }

    setFormState((prev) => ({...prev, validation: null}));
    dispatch(loginAction({login: email, password}));
  };

  const errorMessage = formState.validation || authError || '';

  const {data} = formState;

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(evt) => {
                    setFormState((prev) => ({
                      ...prev,
                      data: {...prev.data, email: evt.target.value},
                      validation: null,
                    }));
                  }}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(evt) => {
                    setFormState((prev) => ({
                      ...prev,
                      data: {...prev.data, password: evt.target.value},
                      validation: null,
                    }));
                  }}
                  required
                />
              </div>
              {errorMessage && (
                <p className="login__error-message" role="alert" style={{color: 'red'}}>
                  {errorMessage}
                </p>
              )}
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <AmsterdamLink/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
