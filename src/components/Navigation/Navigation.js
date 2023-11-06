import './Navigation.css';
import icon from '../../images/profile-icon.svg';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navigation({ loggedIn, blackHeader }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return loggedIn ? (
    <nav className='navigation'>
      <div className='navigation__links'>
        <Link className='navigation__link' to='/movies'>
          Фильмы
        </Link>
        <Link className='navigation__link' to='/saved-movies'>
          Сохранённые фильмы
        </Link>
      </div>
      <div className='navigation__profile'>
        <Link className='navigation__link_active' href='/profile'>
          Аккаунт
        </Link>
        <Link
          className={`navigation__profile-icon ${
            blackHeader ? `navigation__profile-icon_black` : ''
          }`}
          to='/profile'
        >
          <img
            className='navigation__profile-icon-img'
            src={icon}
            alt='icon'
          ></img>
        </Link>
      </div>
      <button
        className='navigation__burger-button'
        onClick={handleClick}
      ></button>
      <div className={`overlay ${isOpen ? `overlay_active` : ''}`}></div>
      <div
        className={`navigation__burger-menu ${
          isOpen ? `navigation__burger-menu_active` : ''
        }`}
      >
        <button
          className='navigation__burger-close-button'
          onClick={handleClick}
        ></button>
        <NavLink
          className={({ isActive }) =>
            `navigation__burger-link ${
              isActive ? 'navigation__burger-link_active' : ''
            }`
          }
          exact
          to='/'
        >
          Главная
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `navigation__burger-link ${
              isActive ? 'navigation__burger-link_active' : ''
            }`
          }
          to='/movies'
        >
          Фильмы
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `navigation__burger-link ${
              isActive ? 'navigation__burger-link_active' : ''
            }`
          }
          to='/saved-movies'
        >
          Сохранённые фильмы
        </NavLink>
        <div className='navigation__burger-profile'>
          <Link className='navigation__burger-link-account' href='/profile'>
            Аккаунт
          </Link>
          <Link
            className={`navigation__profile-icon ${
              blackHeader ? `navigation__profile-icon_black` : ''
            }`}
            to='/profile'
          >
            <img
              className='navigation__profile-icon-img'
              src={icon}
              alt='icon'
            ></img>
          </Link>
        </div>
      </div>
    </nav>
  ) : (
    <nav className='navigation'>
      <Link className='navigation__signup' to='/signup'>
        Регистрация
      </Link>
      <Link className='navigation__signin' to='/signin'>
        Войти
      </Link>
    </nav>
  );
}

export default Navigation;
