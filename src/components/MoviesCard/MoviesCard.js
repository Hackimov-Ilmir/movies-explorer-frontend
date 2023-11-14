import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({
  movieCard,
  onSaveMovie,
  onDeleteMovie,
  place,
  IsSaved,
  savedMovies,
}) {
  const [isMovieSaved, setIsMovieSaved] = useState(IsSaved ? true : false);
  const [movieIdForDelete, setMovieIdForDelete] = useState('');

  const { pathname } = useLocation();
  const moviePath = pathname === '/movies';

  const onClickOnMoviePath = isMovieSaved ? handleDeleteMovie : handleSaveMovie;

  const movie = Object.assign({}, movieCard);
  movie.image = Object.assign({}, movieCard.image);
  movie.image =
    place === 'saved-movies'
      ? movieCard.image
      : `${'https://api.nomoreparties.co'}${movieCard.image.url}`;
  movie.thumbnail =
    movieCard.thumbnail ||
    `${'https://api.nomoreparties.co'}${movieCard.image.formats.thumbnail.url}`;
  movie.movieId = movie.id;

  function handleGetDurationFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  function handleSaveMovie() {
    onSaveMovie(movie);
    setIsMovieSaved(true);
  }

  function handleDeleteMovie() {
    onDeleteMovie(movieIdForDelete || movie._id);
    setIsMovieSaved(false);
  }

  useEffect(() => {
    const savedFilm =
      savedMovies &&
      savedMovies.find((savedFilm) => savedFilm?.movieId === movieCard.id);
    setMovieIdForDelete(savedFilm?._id);
  }, [savedMovies, movieCard.id]);

  return (
    <div className='movies-card'>
      <div className='movies-card__description'>
        <p className='movies-card__name'>{movie.nameRU}</p>
        <p className='movies-card__time'>
          {handleGetDurationFromMins(movie.duration)}
        </p>
      </div>
      <a href={movieCard.trailerLink} target='_blank' rel='noreferrer'>
        <img
          className='movies-card__img'
          src={movie.image}
          alt={movie.nameRU}
        ></img>
      </a>
      {!moviePath ? (
        <button
          className='movies-card__button movies-card__button_delete'
          onClick={handleDeleteMovie}
        ></button>
      ) : (
        <button
          className={`movies-card__button ${
            IsSaved ? `movies-card__button_active` : ''
          }
        `}
          type='button'
          onClick={moviePath ? onClickOnMoviePath : handleDeleteMovie}
        >
          Сохранить
        </button>
      )}
    </div>
  );
}

export default MoviesCard;
