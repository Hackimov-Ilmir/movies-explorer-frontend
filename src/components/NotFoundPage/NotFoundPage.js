import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className='not-found'>
      <div>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <button className='not-found__button' onClick={handleGoBack}>
        Назад
      </button>
    </div>
  );
}

export default NotFoundPage;
