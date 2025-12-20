import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import React from 'react';
import Spinner from '../spinner/spinner.tsx';

type PrivateRouteProps = {
  children: React.ReactNode;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state.auth.status);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
