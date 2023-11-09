import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ saved }) {
  return (
    <section className='saved-movies'>
      <Header loggedIn={true} blackHeader={true}></Header>
      <SearchForm></SearchForm>
      <MoviesCardList saved={true}></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}

export default SavedMovies;
