import {MouseEvent, memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, CityName} from '../../const.ts';

type CitiesListProps = {
  cities: readonly CityName[];
  activeCity: CityName;
  onCityChange: (city: CityName) => void;
};

function CitiesListInner({cities, activeCity, onCityChange}: CitiesListProps) {
  const handleCityClick = (city: CityName) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (city === activeCity) {
      return;
    }

    onCityChange(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <Link
            className={`locations__item-link tabs__item${city === activeCity ? ' tabs__item--active' : ''}`}
            to={AppRoute.Main}
            onClick={handleCityClick(city)}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const CitiesList = memo(CitiesListInner);
export default CitiesList;
