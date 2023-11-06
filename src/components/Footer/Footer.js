import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className='footer__description'>© 2020</p>
        <div className='footer__copyright'>
          <p className='footer__description'>Яндекс.Практикум</p>
          <p className='footer__description'>Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
