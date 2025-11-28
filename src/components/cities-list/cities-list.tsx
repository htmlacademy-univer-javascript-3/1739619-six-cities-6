import {MouseEvent} from 'react';
import {CityName} from '../../const.ts';

type CitiesListProps = {
  cities: readonly CityName[];
  activeCity: CityName;
  onCityChange: (city: CityName) => void;
};

function CitiesList({cities, activeCity, onCityChange}: CitiesListProps) {
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
          <a
            className={`locations__item-link tabs__item${city === activeCity ? ' tabs__item--active' : ''}`}
            href="#"
            onClick={handleCityClick(city)}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
