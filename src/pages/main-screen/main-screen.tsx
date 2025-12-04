import {useCallback, useEffect, useState, memo} from 'react';
import {CITY_NAMES, CITIES, SortingOption, CityName} from '../../const.ts';
import OffersList from '../../components/offers-list/offers-list.tsx';
import {OfferPreview} from '../../types/offers-preview.ts';
import Map from '../../components/map/map.tsx';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {selectCity, selectOffersByCity, selectOffersLoading} from '../../store/selectors.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import {changeCity} from '../../store/action.ts';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import Header from '../../components/header/header.tsx';


function MainScreenInner() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffersByCity);
  const isOffersLoading = useAppSelector(selectOffersLoading);
  const offersCount = offers.length;
  const favoriteOffersCount = offers.filter((offer) => offer.isFavorite).length;
  const currentCity = useAppSelector(selectCity);
  const cityName = currentCity.name;
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

  return (
    <div className="page page--gray page--main">
      <Header favoriteOffersCount={favoriteOffersCount}/>
      <main className="page__main page__main--index">
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
                  <Map
                    city={currentCity}
                    offers={offers}
                    selectedOfferId={selectedOfferId}
                    className='cities__map map'
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

const MainScreen = memo(MainScreenInner);

export default MainScreen;
