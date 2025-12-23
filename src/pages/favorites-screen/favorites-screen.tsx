import {useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, FavoriteStatus, FOOTER_LOGO_SIZE} from '../../const.ts';
import {OfferPreview} from '../../types/offers-preview.ts';
import PlaceCard from '../../components/place-card/place-card.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Header from '../../components/header/header.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import {getAuthorizationStatus} from '../../store/user-data/selectors.ts';
import {
  getFavoriteOffers,
  getFavoriteOffersCount,
  getFavoritesLoadingStatus
} from '../../store/favorites-data/selectors.ts';
import {changeFavoriteStatusAction, fetchFavoritesAction} from '../../store/api-actions.ts';

type FavoritesByCity = Record<string, OfferPreview[]>;

const groupOffersByCity = (favoriteOffers: OfferPreview[]): FavoritesByCity => favoriteOffers.reduce<FavoritesByCity>((accumulator, offer) => ({
  ...accumulator,
  [offer.city.name]: [...(accumulator[offer.city.name] ?? []), offer],
}), {});

export default function FavoritesScreen() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavoritesLoading = useAppSelector(getFavoritesLoadingStatus);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, dispatch]);

  const handleFavoriteToggle = useCallback((offerId: OfferPreview['id'], isFavorite: boolean) => {
    const status = isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite;
    dispatch(changeFavoriteStatusAction({offerId, status}));
  }, [dispatch]);

  const groupedOffers = groupOffersByCity(favoriteOffers);
  const cities = Object.keys(groupedOffers);

  if (isFavoritesLoading) {
    return (
      <div className="page">
        <Header favoriteOffersCount={favoriteOffersCount} />
        <main className="page__main page__main--favorites">
          <Spinner />
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header favoriteOffersCount={favoriteOffersCount} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {cities.length === 0 ? (
              <p className="favorites__status">Nothing yet saved.</p>
            ) : (
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Main}>
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedOffers[city].map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          offer={offer}
                          variant="favorites"
                          onFavoriteToggle={handleFavoriteToggle}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="../../../markup/img/logo.svg"
            alt="6 cities logo"
            width={FOOTER_LOGO_SIZE.width}
            height={FOOTER_LOGO_SIZE.height}
          />
        </Link>
      </footer>
    </div>
  );
}
