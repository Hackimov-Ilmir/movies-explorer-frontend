import './AboutMe.css';
import photo from '../../images/student-photo.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div>
          <h3 className='about-me__subtitle'>Ильмир</h3>
          <p className='about-me__age'>Фронтенд-разработчик, 23 года</p>
          <p className='about-me__text'>
            Я родился и живу в Стерлитамаке, в 2023 году закончил ИХТИ УГНТУ по
            направлению АСУ ТП. Выбрал фронтенд разработку, так как нравится
            делать удобные и красивые интерфейсы. Я люблю слушать музыку, также
            увлекаюсь написанием инструменталов. В свободное время играю на
            гитаре.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/Hackimov-Ilmir/'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img className='about-me__photo' src={photo} alt='student' />
      </div>
    </section>
  );
}

export default AboutMe;
