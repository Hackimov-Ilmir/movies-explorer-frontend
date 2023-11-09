import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard({ src, saved }) {
  const [isLike, setIsLike] = useState(false);

  const handleClick = () => {
    setIsLike(!isLike);
  };

  return (
    <div className='movies-card'>
      <div className='movies-card__description'>
        <p className='movies-card__name'>В погоне за Бенкси</p>
        <p className='movies-card__time'>0ч 42м</p>
      </div>
      <img
        className='movies-card__img'
        src={src}
        alt='В погоне за Бенкси'
      ></img>
      {saved ? (
        <button className='movies-card__button movies-card__button_delete'></button>
      ) : (
        <button
          className={`movies-card__button ${
            isLike ? `movies-card__button_active` : ''
          }
        `}
          type='button'
          onClick={handleClick}
        >
          Сохранить
        </button>
      )}
    </div>
  );
}

export default MoviesCard;
