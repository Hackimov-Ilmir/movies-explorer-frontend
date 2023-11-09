import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <section className='movies'>
      <Header loggedIn={true} blackHeader={true}></Header>
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
      <button className='movies__add-button' type='button'>
        Ещё
      </button>
      <Footer></Footer>
    </section>
  );
}

export default Movies;
