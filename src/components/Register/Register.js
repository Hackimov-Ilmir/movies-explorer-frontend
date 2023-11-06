import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='register'>
      <Link to='/'>
        <img className='register__logo' src={logo} alt='logo' />
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form'>
        <div>
          <div className='register__name-container'>
            <label className='register__label' for='name'>
              Имя
            </label>
            <input
              className='register__input'
              type='text'
              id='name'
              name='name'
              required
              value={'Виталий'}
            />
          </div>
          <div className='register__email-container'>
            <label className='register__label' for='email'>
              E-mail
            </label>
            <input
              className='register__input'
              type='email'
              id='email'
              name='email'
              required
              value={'pochta@yandex.ru'}
            />
          </div>
          <div className='register__password-container'>
            <label className='register__label' for='password'>
              Пароль
            </label>
            <input
              className='register__input'
              type='password'
              id='password'
              name='password'
              required
            />
            <span className='register__input-error'>
              Что-то пошло не так...
            </span>
          </div>
        </div>
        <div>
          <button className='register__button' type='submit'>
            Зарегистрироваться
          </button>
          <p className='register__bottom'>
            Уже зарегистрированы?
            <Link className='register__bottom-link' to='/signin'>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
