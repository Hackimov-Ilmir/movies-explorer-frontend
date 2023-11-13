import './Profile.css';
import Header from '../Header/Header';
import { useContext, useEffect } from 'react';
import { nameRegex } from '../../utils/regex';
import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({ isEdit, onSignOut, onSubmit, onEditProfile, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { formValues, isFormValid, handleInputChange, resetFormValidation } =
    useForm();

  useEffect(() => {
    resetFormValidation(
      { name: currentUser.name, email: currentUser.email },
      {},
      false
    );
  }, [currentUser, resetFormValidation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <>
      <Header loggedIn={true} blackHeader={true}></Header>
      <div className='profile'>
        <h1 className='profile__title'>Привет, {currentUser.name}</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className='profile__name-container'>
            <label className='profile__text' htmlFor='name'>
              Имя
            </label>
            {isEdit ? (
              <input
                className='profile__input profile__text-value'
                type='text'
                id='name'
                name='name'
                value={formValues.name || ''}
                onChange={handleInputChange}
                minLength={2}
                maxLength={30}
                pattern={nameRegex}
              />
            ) : (
              <p className='profile__text-value'>{formValues.name}</p>
            )}
          </div>
          <div className='profile__email-container'>
            <label className='profile__text' htmlFor='email'>
              E-mail
            </label>
            {isEdit ? (
              <input
                className='profile__input profile__text-value'
                type='email'
                id='email'
                name='email'
                value={formValues.email || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p className='profile__text-value'>{formValues.email}</p>
            )}
          </div>
          <div>
            {isEdit && (
              <button
                type='sumbit'
                className={`profile__save-button ${
                  !isFormValid && 'profile__save-button_disabled'
                }`}
                onClick={onEditProfile}
                disabled={!isFormValid}
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
        {!isEdit && (
          <>
            <button
              className='profile__button'
              type='button'
              onClick={onEditProfile}
            >
              Редактировать
            </button>
            <button className='profile__exit-button' onClick={onSignOut}>
              Выйти из аккаунта
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
