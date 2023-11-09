import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ loggedIn, blackHeader }) {
  return (
    <header className='header'>
      <Link to='/' className='header__link'>
        <img className='header__logo' src={logo} alt='logo' />
      </Link>
      <Navigation loggedIn={loggedIn} blackHeader={blackHeader}></Navigation>
    </header>
  );
}

export default Header;
