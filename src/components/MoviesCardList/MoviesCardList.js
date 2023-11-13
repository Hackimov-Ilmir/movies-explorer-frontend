import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({
  movies,
  buttonType,
  onSaveMovie,
  onDeleteMovie,
  onShowMoreMovies,
  place,
  isMovieInSaved,
  movieIdForDelete,
  savedMovies,
  isRequestSuccessful,
  showMoreButton,
}) {
  const { pathname } = useLocation();

  const movieCardElements = movies.map((movieCard) => (
    <div key={movieCard.id || movieCard._id}>
      <MoviesCard
        movieCard={movieCard}
        buttonType={buttonType}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        place={place}
        isMovieInSaved={isMovieInSaved}
        movieIdForDelete={movieIdForDelete}
        IsSaved={
          pathname === '/movies'
            ? savedMovies.some(
                (savedMovie) => savedMovie.movieId === movieCard.id
              )
            : false
        }
        savedMovies={savedMovies}
      />
    </div>
  ));

  return (
    <>
      <section>
        {movies.length === 0 ? (
          <p
            className={`movies-card-list__not-found ${
              !isRequestSuccessful
                ? 'movies-card-list__not-found_req_unsuccsessful'
                : ''
            }`}
          >
            {!isRequestSuccessful
              ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
              : 'Ничего не найдено'}
          </p>
        ) : (
          <div className='movies-card-list'>{movieCardElements}</div>
        )}
      </section>
      {showMoreButton && (
        <button
          className='movies-card-list__button'
          type='button'
          onClick={onShowMoreMovies}
        >
          Ещё
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
