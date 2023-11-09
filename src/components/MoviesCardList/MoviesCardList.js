import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import filmimage from '../../images/pic__COLOR_pic.jpg';
import filmimage1 from '../../images/pic__COLOR_pic-1.jpg';
import filmimage2 from '../../images/pic__COLOR_pic-2.jpg';
import filmimage3 from '../../images/pic__COLOR_pic-3.jpg';
import filmimage4 from '../../images/pic__COLOR_pic-4.jpg';
import filmimage5 from '../../images/pic__COLOR_pic-5.jpg';
import filmimage6 from '../../images/pic__COLOR_pic-6.jpg';
import filmimage7 from '../../images/pic__COLOR_pic-7.jpg';
import filmimage8 from '../../images/pic__COLOR_pic-8.jpg';
import filmimage9 from '../../images/pic__COLOR_pic-9.jpg';
import filmimage10 from '../../images/pic__COLOR_pic-10.jpg';
import filmimage11 from '../../images/pic__COLOR_pic-11.jpg';

function MoviesCardList({ saved }) {
  return (
    <section className='movies-card-list'>
      {false ? <Preloader></Preloader> : null}
      <MoviesCard src={filmimage} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage1} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage2} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage3} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage4} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage5} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage6} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage7} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage8} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage9} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage10} saved={saved}></MoviesCard>
      <MoviesCard src={filmimage11} saved={saved}></MoviesCard>
    </section>
  );
}

export default MoviesCardList;
