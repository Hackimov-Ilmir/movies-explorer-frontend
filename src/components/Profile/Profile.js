import './Profile.css';
import Header from '../Header/Header';
import { useContext, useEffect, useState } from 'react';
import { nameRegex } from '../../utils/regex';
import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({
  isEdit,
  onSignOut,
  onSubmit,
  onEditProfile,
  isProfileUpdate,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isOtherUserData, setIsOtherUserData] = useState(false);
  const { formValues, isFormValid, handleInputChange, resetFormValidation } =
    useForm();

  useEffect(() => {
    resetFormValidation(
      { name: currentUser.name, email: currentUser.email },
      {},
      false
    );
  }, [currentUser, resetFormValidation]);

  useEffect(() => {
    if (
      formValues.name !== currentUser.name ||
      formValues.email !== currentUser.email
    ) {
      setIsOtherUserData(true);
    } else {
      setIsOtherUserData(false);
    }
  }, [formValues.name, formValues.email, currentUser.name, currentUser.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <>
      <Header loggedIn={true} blackHeader={true}></Header>
      <div className='profile'>
        <h1 className='profile__title'>Привет, {currentUser.name}</h1>
        <form
          onSubmit={handleSubmit}
          noValidate
          type='profile'
          name='profile'
          id='form'
        >
          <div className='profile__name-container'>
            <label className='profile__text' htmlFor='name'>
              Имя
            </label>
            <input
              className='profile__input profile__text-value'
              type='text'
              id='name'
              name='name'
              value={formValues.name || ''}
              onChange={handleInputChange}
              minLength={2}
              maxLength={30}
              required
              pattern={nameRegex}
              disabled={!isEdit}
            />
          </div>
          <div className='profile__email-container'>
            <label className='profile__text' htmlFor='email'>
              E-mail
            </label>
            <input
              className='profile__input profile__text-value'
              type='email'
              id='email'
              name='email'
              required
              value={formValues.email || ''}
              onChange={handleInputChange}
              disabled={!isEdit}
            />
          </div>
          {isProfileUpdate && !isEdit && (
            <p className='profile__success'>Данные успешно обновлены!</p>
          )}
          <div>
            {isEdit && (
              <button
                type='sumbit'
                className={`profile__save-button ${
                  (!isFormValid || !isOtherUserData) &&
                  'profile__save-button_disabled'
                }`}
                onClick={onEditProfile}
                disabled={!isFormValid || !isOtherUserData}
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
