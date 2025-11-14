import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, CITY_NAMES, SortingOption} from '../../const.ts';
import {cityMap} from '../../mocks/city';
import OffersList from '../../components/offers-list/offers-list.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';
import Map from '../../components/map/map.tsx';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {selectCity, selectOffersByCity} from '../../store/selectors.ts';
import {CityName} from '../../types/city.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import {changeCity} from '../../store/action.ts';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';


export default function MainScreen() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffersByCity);
  const offersCount = offers.length;
  const favoriteOffersCount = offers.filter((offer) => offer.isFavorite).length;
  const currentCity = useAppSelector(selectCity);
  const cityName = currentCity.name;
  const [selectedOfferId, setSelectedOfferId] = useState<OfferPreview['id'] | null>(null);
  const [currentSort, setCurrentSort] = useState<SortingOption>(SortingOption.Popular);

  let sortedOffers = offers;

  switch (currentSort) {
    case SortingOption.PriceLowToHigh:
      sortedOffers = [...offers].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
      break;
    case SortingOption.PriceHighToLow:
      sortedOffers = [...offers].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
      break;
    case SortingOption.TopRatedFirst:
      sortedOffers = [...offers].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
      break;
  }

  const handleCityChange = (city: CityName) => {
    setSelectedOfferId(null);
    setCurrentSort(SortingOption.Popular);
    dispatch(changeCity(cityMap[city]));
  };

  const handleSortChange = (sort: SortingOption) => {
    setCurrentSort(sort);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
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
                    <span className="header__favorite-count">{favoriteOffersCount}</span>
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITY_NAMES}
              activeCity={currentCity.name}
              onCityChange={handleCityChange}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {cityName}</b>
              <SortingOptions activeSort={currentSort} onSortChange={handleSortChange}/>
              <OffersList
                offers={sortedOffers}
                setSelectedOfferId={setSelectedOfferId}
                variant='cities'
              />
            </section>
            <div className="cities__right-section">
              {currentCity && offers.length > 0 ? (
                <Map
                  city={currentCity}
                  offers={offers}
                  selectedOfferId={selectedOfferId}
                  className='cities__map map'
                />
              ) : (
                <section className="cities__map map" />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

