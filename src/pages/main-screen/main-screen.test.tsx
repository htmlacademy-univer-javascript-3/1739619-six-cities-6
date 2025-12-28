import {render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import MainScreen from './main-screen';
import {withHistory, withStore} from '../../hocs';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOfferPreview, makeFakeStore, mockCity} from '../../utils';

vi.mock('../../components/map/map.tsx', () => ({
  default: () => <div data-testid="map" />,
}));

describe('Page: MainScreen', () => {
  it('should render empty state when no offers available', () => {
    const {withStoreComponent} = withStore(
      <MainScreen />,
      makeFakeStore(AuthorizationStatus.NoAuth, {
        [NameSpace.City]: mockCity,
        [NameSpace.Offers]: {items: [], isLoading: false},
      }),
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText(/no places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/in amsterdam/i)).toBeInTheDocument();
  });

  it('should render offers list and map when data is loaded', () => {
    const offers = [makeFakeOfferPreview('1')];
    const {withStoreComponent} = withStore(
      <MainScreen />,
      makeFakeStore(AuthorizationStatus.NoAuth, {
        [NameSpace.City]: mockCity,
        [NameSpace.Offers]: {items: offers, isLoading: false},
      }),
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText('1 places to stay in Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
