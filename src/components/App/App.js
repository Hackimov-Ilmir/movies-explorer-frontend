import './App.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [foundMovies, setFoundMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [isSavedMoviesLoading, setIsSavedMoviesLoading] = useState(false);
  const [didTheUserSearch, setDidTheUserSearch] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(true);
  const [isUserRequestSuccessful, setIsUserRequestSuccessful] = useState(true);
  const [errorText, setErrortext] = useState('');
  const [isProfileUpdate, setIsProfileUpdate] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tokenCheck = useCallback(() => {
    const authorized = localStorage.getItem('authorized');
    if (authorized) {
      mainApi
        .getContent()
        .then((userData) => {
          if (userData.email) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    tokenCheck();
    isLoggedIn &&
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, savedMovies]) => {
          setCurrentUser(userData);
          setSavedMovies(savedMovies);
          localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
          const userRequest = localStorage.getItem('userRequest');
          userRequest ? setDidTheUserSearch(true) : setDidTheUserSearch(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn, tokenCheck]);

  useEffect(() => {
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));
    if (storedSavedMovies && pathname === '/movies') {
      setSavedMovies(storedSavedMovies);
    }
  }, [pathname]);

  async function handleSignUp(values) {
    setIsRegisterLoading(true);
    setErrortext('');
    const { name, email, password } = values;
    try {
      const signUpdata = await mainApi.register(name, email, password);
      if (signUpdata) {
        handleSignIn(values);
      }
    } catch (err) {
      console.log(err);
      setIsRequestSuccessful(false);
      setErrortext(err);
    } finally {
      setTimeout(() => {
        setIsRegisterLoading(false);
      }, 1500);
    }
  }

  async function handleSignIn(values) {
    setIsLoginLoading(true);
    setErrortext('');
    if (!values.email || !values.password) {
      return;
    }
    try {
      const signInData = await mainApi.authorize(values.email, values.password);
      if (signInData.token) {
        setIsLoggedIn(true);
        localStorage.setItem('authorized', 'true');
        localStorage.setItem('jwt', signInData.token);
        navigate('/movies', { replace: true });
      }
    } catch (err) {
      console.log(err);
      setIsRequestSuccessful(false);
      setErrortext(err);
    } finally {
      setTimeout(() => {
        setIsLoginLoading(false);
      }, 1500);
    }
  }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setFoundMovies([]);
    setInitialMovies([]);
    setDidTheUserSearch(false);
    navigate('/', { replace: true });
  }

  function handleEditProfile() {
    setIsProfileEdit(true);
  }

  async function handleProfileSubmit(values) {
    setIsProfileEdit(true);
    try {
      const userData = await mainApi.editProfile(values.name, values.email);
      setCurrentUser(userData);
      setIsProfileUpdate(true);
    } catch (err) {
      console.log(err);
      setErrortext(err);
    } finally {
      setIsProfileEdit(false);
    }
  }

  function handleCleanErrorText() {
    setErrortext('');
  }

  async function handleMoviesSubmit(value) {
    setIsMoviesLoading(true);
    !didTheUserSearch && setDidTheUserSearch(true);
    try {
      if (!JSON.parse(localStorage.getItem('movies'))) {
        const moviesFromBeatFilm = await moviesApi.getMovies();
        localStorage.setItem('movies', JSON.stringify(moviesFromBeatFilm));
      }
      localStorage.setItem('userRequest', value);
      const foundMovies = JSON.parse(localStorage.getItem('movies')).filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(value.toLowerCase())
      );
      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      setFoundMovies(foundMovies);
      const checkboxState = localStorage.getItem('checkboxState');
      if (checkboxState === 'true') {
        const filteredFoundMovies = foundMovies.filter(
          (movie) => movie.duration <= 40
        );
        setInitialMovies(filteredFoundMovies);
      } else {
        setInitialMovies(foundMovies);
      }
      !isUserRequestSuccessful && setIsUserRequestSuccessful(true);
    } catch (err) {
      setIsUserRequestSuccessful(false);
      console.log(err);
    } finally {
      setIsMoviesLoading(false);
    }
  }

  function handleSavedMoviesSubmit(value) {
    setIsSavedMoviesLoading(true);
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));
    if (storedSavedMovies && storedSavedMovies.length > 0) {
      const foundSavedMovies = JSON.parse(
        localStorage.getItem('saved-movies')
      ).filter(
        (savedMovie) =>
          savedMovie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
          savedMovie.nameEN.toLowerCase().includes(value.toLowerCase())
      );
      setFoundSavedMovies(foundSavedMovies);
      const checkboxState = localStorage.getItem('checkboxSavedMoviesState');
      if (checkboxState === 'true') {
        const filteredFoundSavedMovies = foundSavedMovies.filter(
          (movie) => movie.duration <= 40
        );
        setSavedMovies(filteredFoundSavedMovies);
      } else {
        setSavedMovies(foundSavedMovies);
      }
    }
    setIsSavedMoviesLoading(false);
  }

  function handleFilterMovies(checked) {
    localStorage.setItem('checkboxState', checked);
    const storedMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const filteredFoundMovies = foundMovies.filter(
      (movie) => movie.duration <= 40
    );
    const filteredStoredMovies =
      storedMovies &&
      storedMovies.length > 0 &&
      storedMovies.filter((movie) => movie.duration <= 40);
    if (checked) {
      setInitialMovies(
        foundMovies.length > 0 ? filteredFoundMovies : filteredStoredMovies
      );
    } else {
      setInitialMovies(foundMovies.length > 0 ? foundMovies : storedMovies);
    }
  }

  function handleFilterSavedMovies(checked) {
    localStorage.setItem('checkboxSavedMoviesState', checked);
    const filteredFoundSavedMovies = foundSavedMovies.filter(
      (movie) => movie.duration <= 40
    );
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'))
      ? JSON.parse(localStorage.getItem('saved-movies'))
      : [];
    const filteredSavedMovies = savedMovies.filter(
      (movie) => movie.duration <= 40
    );
    if (checked) {
      setSavedMovies(
        foundSavedMovies.length > 0
          ? filteredFoundSavedMovies
          : filteredSavedMovies
      );
    } else {
      setSavedMovies(
        foundSavedMovies.length > 0 ? foundSavedMovies : storedSavedMovies
      );
    }
  }

  async function handleSaveMovie(movie) {
    try {
      const isMovieInSaved = savedMovies.some(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      if (!isMovieInSaved) {
        const savedMovie = await mainApi.saveMovie(movie);
        const updatedSavedMovies = [...savedMovies, savedMovie];
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem(
          'saved-movies',
          JSON.stringify(updatedSavedMovies)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteMovie(movieId) {
    try {
      await mainApi.deleteMovie(movieId);
      const updatedSavedMovies = savedMovies.filter(
        (movie) => movie._id !== movieId
      );
      setSavedMovies(updatedSavedMovies);
      localStorage.setItem('saved-movies', JSON.stringify(updatedSavedMovies));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <div className='app__narrow'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Main loggedIn={isLoggedIn} />
                  <Footer></Footer>
                </>
              }
            />
            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={isLoggedIn}
                  initialMoviesCards={initialMovies}
                  onSubmit={handleMoviesSubmit}
                  checked={localStorage.getItem('IsCheckBoxChecked')}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                  onFilter={handleFilterMovies}
                  isLoading={isMoviesLoading}
                  savedMovies={savedMovies}
                  didTheUserSearch={didTheUserSearch}
                  isRequestSuccessful={isUserRequestSuccessful}
                ></ProtectedRouteElement>
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={isLoggedIn}
                  moviesCards={savedMovies}
                  onSubmit={handleSavedMoviesSubmit}
                  onDeleteMovie={handleDeleteMovie}
                  onFilter={handleFilterSavedMovies}
                  isLoading={isSavedMoviesLoading}
                  didTheUserSearch={didTheUserSearch}
                  isRequestSuccessful={isUserRequestSuccessful}
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login
                  onSignin={handleSignIn}
                  isRequestSuccessful={isRequestSuccessful}
                  errorText={errorText}
                  onCleanErrorText={handleCleanErrorText}
                  isLoading={isLoginLoading}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/signup'
              element={
                <Register
                  onSignup={handleSignUp}
                  isRequestSuccessful={isRequestSuccessful}
                  errorText={errorText}
                  onCleanErrorText={handleCleanErrorText}
                  isLoading={isRegisterLoading}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={isLoggedIn}
                  isEdit={isProfileEdit}
                  onSubmit={handleProfileSubmit}
                  onEditProfile={handleEditProfile}
                  onSignOut={handleSignOut}
                  isProfileUpdate={isProfileUpdate}
                />
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
