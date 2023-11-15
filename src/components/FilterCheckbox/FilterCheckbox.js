import './FilterCheckbox.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FilterCheckbox = ({ checked, onFilter, isLoading }) => {
  const [isChecked, setIsChecked] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/movies' && checked !== null) {
      setIsChecked(checked);
    }
  }, [pathname, checked]);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onFilter(newValue);
  };

  return (
    <div className='tumb'>
      <label className='filter-checkbox'>
        <input
          type='checkbox'
          onChange={handleCheckboxChange}
          checked={isChecked}
          disabled={isLoading}
          id='checkbox'
          name='checkbox'
        />
        <span className='slider round'></span>
      </label>
      <span className='checkbox-label'>Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
