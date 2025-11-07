import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {Offer} from '../../types/offer';
import PlaceCard from '../../components/place-card/place-card.tsx';

type FavoritesScreenProps = {
  offers: Offer[];
};

type FavoritesByCity = Record<string, Offer[]>;

const groupOffersByCity = (favoriteOffers: Offer[]): FavoritesByCity => favoriteOffers.reduce<FavoritesByCity>((accumulator, offer) => ({
  ...accumulator,
  [offer.city.name]: [...(accumulator[offer.city.name] ?? []), offer],
}), {});

export default function FavoritesScreen({offers}: FavoritesScreenProps) {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const groupedOffers = groupOffersByCity(favoriteOffers);
  const cities = Object.keys(groupedOffers);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="../../../markup/img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
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
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}
