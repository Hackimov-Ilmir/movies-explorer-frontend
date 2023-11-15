import './Login.css';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useEffect } from 'react';

function Login({
  onSignin,
  isRequestSuccessful,
  errorText,
  onCleanErrorText,
  isLoading,
  isLoggedIn,
}) {
  const { formValues, formErrors, isFormValid, handleInputChange } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate('/movies', { replace: true });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignin(formValues);
  };

  return (
    <div className='login'>
      <div>
        <Link to='/'>
          <img className='login__logo' src={logo} alt='logo' />
        </Link>
        <h1 className='login__title'>Рады видеть!</h1>
      </div>
      <form className='login__form' onSubmit={handleSubmit}>
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
              value={formValues.email || ''}
              onChange={handleInputChange}
            />
            <span className='login__input-error'>{formErrors.email}</span>
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
              minLength={2}
              maxLength={30}
              value={formValues.password || ''}
              onChange={handleInputChange}
            />
            <span className='login__input-error'>{formErrors.password}</span>
          </div>
        </div>
        <div>
          <span className='login__input-error'>{errorText}</span>
          <button
            className={`login__button ${
              !isFormValid && 'login__button_disabled'
            }`}
            type='submit'
            disabled={!isFormValid}
          >
            Войти
          </button>
          <p className='login__bottom'>
            Ещё не зарегистрированы?
            <Link
              className='login__bottom-link'
              to='/signup'
              onClick={onCleanErrorText}
            >
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
