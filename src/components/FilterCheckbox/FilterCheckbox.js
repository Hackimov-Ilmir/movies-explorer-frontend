import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className='tumb'>
      <label className='filter-checkbox'>
        <input type='checkbox' />
        <span className='slider round'></span>
      </label>
      <span className='checkbox-label'>Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;
