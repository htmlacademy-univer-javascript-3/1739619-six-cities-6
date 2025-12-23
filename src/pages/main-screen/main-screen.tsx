import {useCallback, useEffect, useState, memo} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  CITY_NAMES,
  CITIES,
  SortingOption,
  CityName,
  AppRoute,
  AuthorizationStatus,
  FavoriteStatus
} from '../../const.ts';
import OffersList from '../../components/offers-list/offers-list.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';
import Map from '../../components/map/map.tsx';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getCity} from '../../store/city-data/selectors.ts';
import {getOffersByCity, getOffersLoadingStatus} from '../../store/offers-data/selectors.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import {changeCity} from '../../store/city-data/city-data.ts';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import Header from '../../components/header/header.tsx';
import NoOffers from '../../components/no-offers/no-offers.tsx';
import {getAuthorizationStatus} from '../../store/user-data/selectors.ts';
import {getFavoriteOffersCount} from '../../store/favorites-data/selectors.ts';
import {changeFavoriteStatusAction} from '../../store/api-actions.ts';

function MainScreenInner() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offers = useAppSelector(getOffersByCity);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const offersCount = offers.length;
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const currentCity = useAppSelector(getCity);
  const cityName = currentCity.name;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [selectedOfferId, setSelectedOfferId] = useState<OfferPreview['id'] | null>(null);
  const [currentSort, setCurrentSort] = useState<SortingOption>(SortingOption.Popular);

  const [sortedOffers, setSortedOffers] = useState<OfferPreview[]>([]);

  useEffect(() => {
    let sorted;
    switch (currentSort) {
      case SortingOption.PriceLowToHigh:
        sorted = [...offers].sort((a, b) => a.price - b.price);
        break;
      case SortingOption.PriceHighToLow:
        sorted = [...offers].sort((a, b) => b.price - a.price);
        break;
      case SortingOption.TopRatedFirst:
        sorted = [...offers].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted = [...offers];
    }
    setSortedOffers(sorted);
  }, [currentSort, offers]);

  const handleCityChange = useCallback((city: CityName) => {
    setSelectedOfferId(null);
    setCurrentSort(SortingOption.Popular);
    dispatch(changeCity(CITIES[city]));
  }, [dispatch]);

  const handleSortChange = useCallback((sort: SortingOption) => {
    setCurrentSort(sort);
  },[]);

  const handleFavoriteToggle = useCallback((offerId: OfferPreview['id'], isFavorite: boolean) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const status = isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite;
    dispatch(changeFavoriteStatusAction({offerId, status}));
  }, [authorizationStatus, dispatch, navigate]);

  const mainScreenClassName = `page__main page__main--index${offersCount === 0 ? ' page__main--index-empty' : ''}`;

  return (
    <div className="page page--gray page--main">
      <Header favoriteOffersCount={favoriteOffersCount}/>
      <main className={mainScreenClassName}>
        {isOffersLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CitiesList
                  cities={CITY_NAMES}
                  activeCity={cityName}
                  onCityChange={handleCityChange}
                />
              </section>
            </div>
            <div className="cities">
              {offersCount === 0 ? (
                <NoOffers cityName={cityName} />
              ) : (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offersCount} places to stay in {cityName}</b>
                    <SortingOptions activeSort={currentSort} onSortChange={handleSortChange}/>
                    <OffersList
                      offers={sortedOffers}
                      setSelectedOfferId={setSelectedOfferId}
                      variant='cities'
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  </section>
                  <div className="cities__right-section">
                    <Map
                      city={currentCity}
                      offers={offers}
                      selectedOfferId={selectedOfferId}
                      className='cities__map map'
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

const MainScreen = memo(MainScreenInner);

export default MainScreen;
