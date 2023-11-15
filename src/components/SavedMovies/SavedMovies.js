import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  moviesCards,
  isLoading,
  onDeleteMovie,
  onFilter,
  didTheUserSearch,
  isRequestSuccessful,
  onSubmit,
}) {
  const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));

  return (
    <section className='saved-movies'>
      <div>
        <Header loggedIn={true} blackHeader={true}></Header>
        <SearchForm
          onFilter={onFilter}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        {isLoading && <Preloader />}
        {!isLoading && storedSavedMovies.length > 0 && (
          <MoviesCardList
            movies={moviesCards}
            buttonType='delete'
            place='saved-movies'
            onDeleteMovie={onDeleteMovie}
            didTheUserSearch={didTheUserSearch}
            isRequestSuccessful={isRequestSuccessful}
          />
        )}
      </div>
      <Footer></Footer>
    </section>
  );
}

export default SavedMovies;
