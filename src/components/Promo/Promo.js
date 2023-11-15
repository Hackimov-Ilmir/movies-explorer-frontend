import Header from '../Header/Header';
import './Promo.css';

function Promo({ loggedIn }) {
  return (
    <div className='promo'>
      <Header loggedIn={loggedIn}></Header>
      <section className='promo__section'>
        <div className='promo__content'>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className='promo__text'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className='promo__link' href='#about-project'>
            Узнать больше
          </a>
        </div>
      </section>
    </div>
  );
}

export default Promo;
