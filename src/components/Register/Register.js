import './Register.css';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { nameRegex } from '../../utils/regex';
import useForm from '../../hooks/useForm';
import { useEffect } from 'react';

function Register({
  onSignup,
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
    onSignup(formValues);
  };

  return (
    <div className='register'>
      <Link to='/'>
        <img className='register__logo' src={logo} alt='logo' />
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit} noValidate>
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
              value={formValues.name || ''}
              minLength={2}
              maxLength={30}
              pattern={nameRegex}
              onChange={handleInputChange}
            />
            <span className='register__input-error'>{formErrors.name}</span>
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
              value={formValues.email || ''}
              onChange={handleInputChange}
            />
            <span className='register__input-error'>{formErrors.email}</span>
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
              minLength={8}
              maxLength={30}
              value={formValues.password || ''}
              onChange={handleInputChange}
            />
            <span className='register__input-error'>{formErrors.password}</span>
          </div>
        </div>
        <div>
          <span className='register__input-error'>{errorText}</span>
          <button
            className={`register__button ${
              !isFormValid && 'register__button_disabled'
            }`}
            type='submit'
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </button>
          <p className='register__bottom'>
            Уже зарегистрированы?
            <Link
              className='register__bottom-link'
              to='/signin'
              onClick={onCleanErrorText}
            >
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
