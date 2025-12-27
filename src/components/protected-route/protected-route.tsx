import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-data/selectors.ts';
import React from 'react';
import Spinner from '../spinner/spinner.tsx';

type ProtectedRouteProps = {
  children: React.ReactNode;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const {children} = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
