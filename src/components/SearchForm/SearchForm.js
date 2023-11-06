import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <form className='search-form'>
      <div className='search-form__wrapper'>
        <input type='text' className='search-form__input' placeholder='Фильм' />
        <button type='submit' className='search-form__button'>
          Поиск
        </button>
      </div>
      <FilterCheckbox></FilterCheckbox>
    </form>
  );
}

export default SearchForm;
