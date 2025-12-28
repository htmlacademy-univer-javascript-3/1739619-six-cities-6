import {render, screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {vi} from 'vitest';
import OfferScreen from './offer-screen';
import {withHistory, withStore} from '../../hocs';
import {AuthorizationStatus, AppRoute, NameSpace} from '../../const';
import {makeFakeOffer, makeFakeOfferPreview, makeFakeReview, makeFakeStore} from '../../utils';

vi.mock('../../components/map/map.tsx', () => ({
  default: () => <div data-testid="map" />,
}));

vi.mock('../../components/reviews-list/reviews-list.tsx', () => ({
  default: () => <div data-testid="reviews-list" />,
}));

vi.mock('../../components/comment-form/comment-form.tsx', () => ({
  default: () => <div data-testid="comment-form" />,
}));

vi.mock('../../components/near-places-list/near-places-list.tsx', () => ({
  default: () => <div data-testid="near-places" />,
}));

vi.mock('../../store/api-actions', () => ({
  fetchOfferAction: vi.fn(() => ({type: 'offer/fetch'})),
  fetchNearbyOffersAction: vi.fn(() => ({type: 'offer/nearby'})),
  fetchOfferReviewsAction: vi.fn(() => ({type: 'reviews/fetch'})),
  changeFavoriteStatusAction: vi.fn(() => ({type: 'favorites/change'})),
}));

describe('Page: OfferScreen', () => {
  it('should render spinner while offer is loading', () => {
    const {withStoreComponent} = withStore(
      <OfferScreen />,
      makeFakeStore(AuthorizationStatus.NoAuth, {
        [NameSpace.OfferDetails]: {
          data: null,
          isLoading: true,
          nearbyOffers: [],
        },
      }),
    );

    render(withHistory(withStoreComponent, [`${AppRoute.Offer}/1`]));

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should redirect to not found when offer is missing', () => {
    const {withStoreComponent} = withStore(
      (
        <Routes>
          <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferScreen />} />
          <Route path={AppRoute.NotFound} element={<div>Not Found Page</div>} />
        </Routes>
      ),
      makeFakeStore(AuthorizationStatus.NoAuth, {
        [NameSpace.OfferDetails]: {
          data: null,
          isLoading: false,
          nearbyOffers: [],
        },
      }),
    );

    render(withHistory(withStoreComponent, [`${AppRoute.Offer}/1`]));

    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });

  it('should render offer details when data is available', () => {
    const offer = makeFakeOffer('1');
    const nearby = [makeFakeOfferPreview('2')];
    const reviews = [makeFakeReview('1')];
    const {withStoreComponent} = withStore(
      <OfferScreen />,
      makeFakeStore(AuthorizationStatus.Auth, {
        [NameSpace.OfferDetails]: {
          data: offer,
          isLoading: false,
          nearbyOffers: nearby,
        },
        [NameSpace.Reviews]: {
          items: reviews,
          isPosting: false,
        },
      }),
    );

    render(withHistory(withStoreComponent, [`${AppRoute.Offer}/1`]));

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(/reviews ·/i)).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('near-places')).toBeInTheDocument();
    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
  });
});
