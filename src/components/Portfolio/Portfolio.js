import './Portfolio.css';
import icon from '../../images/link_icon.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <div className='portfolio__item'>
        <p className='portfolio__name'>Статичный сайт</p>
        <a
          className='portfolio__link'
          href='https://github.com/Hackimov-Ilmir/how-to-learn'
          target='_blank'
          rel='noreferrer'
        >
          <img className='portfolio__link-img' src={icon} alt='icon' />
        </a>
      </div>
      <div className='portfolio__item'>
        <p className='portfolio__name'>Адаптивный сайт</p>
        <a
          className='portfolio__link'
          href='https://github.com/Hackimov-Ilmir/russian-travel'
          target='_blank'
          rel='noreferrer'
        >
          <img className='portfolio__link-img' src={icon} alt='icon' />
        </a>
      </div>
      <div className='portfolio__item'>
        <p className='portfolio__name'>Одностраничное приложение</p>
        <a
          className='portfolio__link'
          href='https://github.com/Hackimov-Ilmir/react-mesto-api-full-gha'
          target='_blank'
          rel='noreferrer'
        >
          <img className='portfolio__link-img' src={icon} alt='icon' />
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
