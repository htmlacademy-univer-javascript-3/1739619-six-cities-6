import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: Element;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state.auth.status);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
