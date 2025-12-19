import {AppRoute, CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';
import {changeCity} from '../../store/city-data/city-data.ts';
import {useAppDispatch} from '../../hooks';
import {memo} from 'react';

function AmsterdamLinkInner() {
  const dispatch = useAppDispatch();
  const handleCityClick = () => dispatch(changeCity(CITIES['Amsterdam']));

  return (
    <Link to={AppRoute.Main} className="locations__item-link" onClick={handleCityClick}>
      <span>Amsterdam</span>
    </Link>
  );
}

const AmsterdamLink = memo(AmsterdamLinkInner);
export default AmsterdamLink;
