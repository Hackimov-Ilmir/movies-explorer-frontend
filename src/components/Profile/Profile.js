import './Profile.css';
import Header from '../Header/Header';
import { useState } from 'react';

function Profile() {
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Header loggedIn={true} blackHeader={true}></Header>
      <div className='profile'>
        <h1 className='profile__title'>Привет, Виталий!</h1>

        <div className='profile__name-container'>
          <label className='profile__text' htmlFor='name'>
            Имя
          </label>
          {isEditing ? (
            <input
              className='profile__input profile__text-value'
              type='text'
              id='name'
              value={name}
              onChange={handleChangeName}
            />
          ) : (
            <p className='profile__text-value'>{name}</p>
          )}
        </div>
        <div className='profile__email-container'>
          <label className='profile__text' htmlFor='email'>
            E-mail
          </label>
          {isEditing ? (
            <input
              className='profile__input profile__text-value'
              type='email'
              id='email'
              value={email}
              onChange={handleChangeEmail}
            />
          ) : (
            <p className='profile__text-value'>{email}</p>
          )}
        </div>
        {!isEditing ? (
          <>
            <button
              className='profile__button'
              onClick={isEditing ? handleSave : handleEdit}
            >
              Редактировать
            </button>
            <button className='profile__exit-button'>Выйти из аккаунта</button>
          </>
        ) : (
          <button
            className='profile__save-button'
            onClick={isEditing ? handleSave : handleEdit}
          >
            Сохранить
          </button>
        )}
      </div>
    </>
  );
}

export default Profile;
