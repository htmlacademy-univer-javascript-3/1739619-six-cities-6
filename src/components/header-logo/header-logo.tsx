import { memo } from 'react';
import { Link } from 'react-router-dom';
import {AppRoute, HEADER_LOGO_SIZE} from '../../const';

function HeaderLogoInner() {
  return (
    <div className="header__left">
      <Link to={AppRoute.Main} className="header__logo-link">
        <img
          className="header__logo"
          src="../../../markup/img/logo.svg"
          alt="6 cities logo"
          width={HEADER_LOGO_SIZE.width}
          height={HEADER_LOGO_SIZE.height}
        />
      </Link>
    </div>
  );
}

const HeaderLogo = memo(HeaderLogoInner);
export default HeaderLogo;
