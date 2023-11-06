import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login'>
      <div>
        <Link to='/'>
          <img className='login__logo' src={logo} alt='logo' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
      </div>
      <form className='login__form'>
        <div>
          <div className='login__email-container'>
            <label className='login__label' for='email'>
              E-mail
            </label>
            <input
              className='login__input'
              type='email'
              id='email'
              name='email'
              required
              value={'pochta@yandex.ru'}
            />
          </div>
          <div className='login__password-container'>
            <label className='login__label' for='password'>
              Пароль
            </label>
            <input
              className='login__input'
              type='password'
              id='password'
              name='password'
              required
            />
          </div>
        </div>
        <div>
          <button className='login__button' type='submit'>
            Войти
          </button>
          <p className='login__bottom'>
            Ещё не зарегистрированы?
            <Link className='login__bottom-link' to='/signup'>
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
