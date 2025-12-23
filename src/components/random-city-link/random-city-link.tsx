import {memo, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, CITIES, CITY_NAMES, CityName} from '../../const.ts';
import {useAppDispatch} from '../../hooks';
import {currentCity} from '../../store/city-data/city-data.ts';

function RandomCityLinkInner() {
  const dispatch = useAppDispatch();
  const cityName = useMemo<CityName>(
    () => CITY_NAMES[Math.floor(Math.random() * CITY_NAMES.length)],
    []
  );

  const handleCityClick = () => dispatch(currentCity(CITIES[cityName]));

  return (
    <Link to={AppRoute.Main} className="locations__item-link" onClick={handleCityClick}>
      <span>{cityName}</span>
    </Link>
  );
}

const RandomCityLink = memo(RandomCityLinkInner);
export default RandomCityLink;
