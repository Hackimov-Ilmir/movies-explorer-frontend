import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className='app'>
      <div className='app__narrow'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Main />
                <Footer></Footer>
              </>
            }
          />
          <Route path='/movies' element={<Movies></Movies>} />
          <Route path='/saved-movies' element={<SavedMovies></SavedMovies>} />
          <Route path='/signin' element={<Login></Login>} />
          <Route path='/signup' element={<Register></Register>} />
          <Route path='/profile' element={<Profile></Profile>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
