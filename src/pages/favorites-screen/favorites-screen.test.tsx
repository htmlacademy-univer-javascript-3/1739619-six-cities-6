import {render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import FavoritesScreen from './favorites-screen';
import {withHistory, withStore} from '../../utils/mock-component';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOfferPreview, makeFakeStore} from '../../utils/mocks';
import {fetchFavoritesAction} from '../../store/api-actions';

vi.mock('../../store/api-actions', () => ({
  fetchFavoritesAction: vi.fn(() => ({type: 'favorites/fetch'})),
  changeFavoriteStatusAction: vi.fn(() => ({type: 'favorites/change'})),
}));

describe('Page: FavoritesScreen', () => {
  it('should render spinner while favorites are loading', () => {
    const {withStoreComponent} = withStore(
      <FavoritesScreen />,
      makeFakeStore(AuthorizationStatus.NoAuth, {
        [NameSpace.Favorites]: {items: [], isLoading: true},
      }),
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should render empty state when there are no favorites', () => {
    const {withStoreComponent} = withStore(
      <FavoritesScreen />,
      makeFakeStore(AuthorizationStatus.NoAuth, {
        [NameSpace.Favorites]: {items: [], isLoading: false},
      }),
    );

    render(withHistory(withStoreComponent));

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render grouped favorites by city', () => {
    const favorites = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
    const {withStoreComponent} = withStore(
      <FavoritesScreen />,
      makeFakeStore(AuthorizationStatus.Auth, {
        [NameSpace.Favorites]: {items: favorites, isLoading: false},
      }),
    );

    render(withHistory(withStoreComponent));

    expect(fetchFavoritesAction).toHaveBeenCalled();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Offer 1')).toBeInTheDocument();
  });
});
