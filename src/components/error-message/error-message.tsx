import {useAppSelector} from '../../hooks';
import './error-message.css';

function ErrorMessage() {
  const error = useAppSelector((state) => state.auth.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
