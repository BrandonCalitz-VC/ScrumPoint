import clsx from 'clsx';
import React, { FC } from 'react';
import { FieldErrors, FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors : FieldErrors;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({ label, id, type, errors, register, disabled, required}) => {
  return (
    <div className='flex flex-col gap-1 text-white'>
      <label className='text-lg'>{label}</label>
      <input 
        id={id}
        type={type}
        placeholder={label}
        autoComplete={id}
        disabled={disabled}
      {...register(id, {required})}
        className={clsx('block focus-visible:outline-none border-0 border-black border-b-2 bg-transparent', 
        errors[id] && "focus: border-red-500",
        disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  )
}

export default Input;