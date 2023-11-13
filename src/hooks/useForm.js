import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

function useForm() {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'name' && e.target.validity.patternMismatch) {
      e.target.setCustomValidity(
        'Имя должно содержать только кириллицу, латиницу, пробел или дефис.'
      );
    } else if (name === 'email' && !isEmail(value)) {
      e.target.setCustomValidity('Неверный формат адреса электронной почты');
    } else {
      e.target.setCustomValidity('');
    }
    setFormValues((values) => ({ ...values, [name]: value }));
    setFormErrors((errors) => ({
      ...errors,
      [name]: e.target.validationMessage,
    }));
    const isValid = e.target.closest('form').checkValidity();
    setIsFormValid(isValid);
  }

  const resetFormValidation = useCallback(function resetForm(
    values = {},
    errors = {},
    isValid = false
  ) {
    setFormValues(values);
    setFormErrors(errors);
    setIsFormValid(isValid);
  },
  []);

  return {
    formValues,
    formErrors,
    isFormValid,
    handleInputChange,
    resetFormValidation,
  };
}

export default useForm;
