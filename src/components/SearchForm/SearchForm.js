import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({
  onSubmit,
  onFilter,
  isLoading,
  moviesRequest,
  isCheckBoxChecked,
}) {
  const [userRequest, setUserRequest] = useState('');
  const [errorText, setErrorText] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    moviesRequest && setUserRequest(moviesRequest);
  }, [moviesRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathname !== '/movies' || userRequest) {
      onSubmit(userRequest);
      setErrorText('');
    } else {
      setErrorText('Нужно ввести ключевое слово');
    }
  };

  const handleChange = (e) => {
    setUserRequest(e.target.value);
  };

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__wrapper'>
        <input
          type='text'
          className='search-form__input'
          placeholder='Фильм'
          value={userRequest || ''}
          name='search'
          id='search'
          onChange={handleChange}
          autoComplete='off'
          disabled={isLoading}
          required
        />
        <button
          type='submit'
          className='search-form__button'
          disabled={isLoading}
        >
          Поиск
        </button>
      </div>
      <span className='search-form__error'>{errorText}</span>
      <FilterCheckbox
        checked={isCheckBoxChecked}
        onFilter={onFilter}
        isLoading={isLoading}
      ></FilterCheckbox>
    </form>
  );
}

export default SearchForm;
