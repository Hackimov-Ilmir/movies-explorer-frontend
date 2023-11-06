import './NotFoundPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='not-found'>
      <div>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <Link className='not-found__link' to='/'>
        Назад
      </Link>
    </div>
  );
}

export default NotFoundPage;
