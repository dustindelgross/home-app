import { motion } from 'framer-motion';


export const TextInput = ({
  id,
  label,
  value,
  placeholder,
  required = false,
  disabled = false,
  errorText,
  onChange,
}: {
  id: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errorText?: string;
  onChange?: (value: string) => void;
}) => {


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (onChange) {
      onChange(inputValue); // Pass the updated value back to the parent component
    }
  };

  return (
    <motion.div className='flex flex-col justify-center items-center'>
      {label &&
        <motion.label htmlFor={id}>{label}</motion.label>
      }
      <motion.input
        type='text'
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value || ''}
        id={id}
        name={id}
        aria-describedby={errorText ? `${id}-error` : undefined}
        className='w-full bg-grey-200/20 border-grey-500 border rounded pl-2'
        onChange={handleChange}
      ></motion.input>
      {errorText &&
        <motion.p
          id={`${id}-error`} className='text-red-400'
        >
          {errorText}
        </motion.p>
      }

    </motion.div>
  )
}

import React from 'react';

export const TextArea = ({
  id,
  label,
  value,
  placeholder,
  required = false,
  disabled = false,
  errorText,
  onChange,
}: {
  id: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errorText?: string;
  onChange?: (value: string) => void; // Add the onChange prop for event handling
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (onChange) {
      onChange(inputValue); // Pass the updated value back to the parent component
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value || ''}
        id={id}
        name={id}
        aria-describedby={errorText ? `${id}-error` : undefined}
        className='w-full bg-grey-200/20 border-grey-500 border rounded pl-2'
        onChange={handleChange}
      />
      {errorText && (
        <p id={`${id}-error`} className='text-red-400'>
          {errorText}
        </p>
      )}
    </div>
  );
};

export const DateTimeLocal = ({
  id,
  label,
  value,
  required = false,
  disabled = false,
  errorText,
  onChange,
}: {
  id: string;
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  errorText?: string;
  onChange?: (value: string) => void; // Add the onChange prop for event handling
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (onChange) {
      onChange(inputValue); // Pass the updated value back to the parent component
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type='datetime-local'
        required={required}
        disabled={disabled}
        value={value || ''}
        id={id}
        name={id}
        aria-describedby={errorText ? `${id}-error` : undefined}
        className='w-full bg-grey-200/20 border-grey-500 border rounded pl-2'
        onChange={handleChange}
      />
      {errorText && (
        <p id={`${id}-error`} className='text-red-400'>
          {errorText}
        </p>
      )}
    </div>
  );
};

export const SubmitButton = ({
  text
}: {
  text: string;
}) => {
  return (
    <div className='flex flex-col justify-center items-center mt-3'>
      <button
        className='bg-blue-600 px-5 py-1 rounded'
        type="submit">{text}</button>
    </div>
  )
}