import {render, screen} from '@testing-library/react';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import {AuthorizationStatus, NameSpace} from '../const.ts';
import {makeFakeStore} from '../utils';
import {State} from '../types';
import {withHistory, withStore} from './mock-component.tsx';

describe('HOC: withStore', () => {
  it('should wrap component with redux provider', () => {
    const initialState = makeFakeStore(AuthorizationStatus.Auth);
    const TestComponent = () => {
      const status = useSelector((state: State) => state[NameSpace.Auth].status);

      return <span>{status}</span>;
    };

    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(
      <TestComponent />,
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText(AuthorizationStatus.Auth)).toBeInTheDocument();
    expect(mockStore.getState()).toEqual(initialState);
    expect(mockAxiosAdapter).toBeInstanceOf(MockAdapter);
  });
});

describe('HOC: withHistory', () => {
  it('should wrap component with router history', () => {
    const TestComponent = () => {
      const location = useLocation();

      return <span>{location.pathname}</span>;
    };

    render(withHistory(<TestComponent />, ['/login']));

    expect(screen.getByText('/login')).toBeInTheDocument();
  });
});
