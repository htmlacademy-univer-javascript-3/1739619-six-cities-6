import {memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';
import {selectAuthorizationStatus, selectUserData} from '../../store/selectors.ts';
import HeaderLogo from '../header-logo/header-logo.tsx';

type HeaderProps = {
  favoriteOffersCount?: number;
};

function HeaderInner({favoriteOffersCount = 0}: HeaderProps) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userData = useAppSelector(selectUserData);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo/>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorized && userData ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userData?.email}
                      </span>
                      <span className="header__favorite-count">{favoriteOffersCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item user" onClick={handleSignOut}>
                    <a className="header__nav-link" >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

const Header = memo(HeaderInner);
export default Header;
