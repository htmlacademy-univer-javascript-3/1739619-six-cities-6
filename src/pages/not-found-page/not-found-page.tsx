import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <Link to={AppRoute.Main} style={{ color: 'blue'}}>
        Вернуться на главную страницу
      </Link>
    </div>
  );
}
