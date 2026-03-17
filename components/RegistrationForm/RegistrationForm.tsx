'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerSchema } from '@/lib/validation/registerSchema';

import css from './RegistrationForm.module.css';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  onSubmit: (data: FormValues) => Promise<void>;
}

export default function RegistrationForm({ onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const getInputClass = (field: keyof FormValues, baseClass: string) => {
    return `
      ${baseClass}
      ${errors[field] ? css.errorInput : ''}
      ${touchedFields[field] && !errors[field] ? css.successInput : ''}
    `;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div>
        <input
          {...register('name')}
          placeholder="Name"
          className={getInputClass('name', css.input)}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('email')}
          autoComplete="email"
          placeholder="Email"
          className={getInputClass('email', css.input)}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.passwordWrapper}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          className={getInputClass('password', css.inputPass)}
        />
        <button
          type="button"
          className={css.togglePassword}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <svg className={css.eyeIcon} width="22" height="22" aria-hidden="true">
            <use href={`/symbol-defs.svg#icon-${showPassword ? 'eye' : 'eye-off'}`} />
          </svg>
        </button>
        {errors.password && <p className={css.error}>{errors.password.message}</p>}
      </div>

      <div className={css.passwordWrapper}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          placeholder="Confirm password"
          className={getInputClass('confirmPassword', css.inputPass)}
        />
        <button
          type="button"
          className={css.togglePassword}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <svg className={css.eyeIcon} width="22" height="22" aria-hidden="true">
            <use href={`/symbol-defs.svg#icon-${showPassword ? 'eye' : 'eye-off'}`} />
          </svg>
        </button>
        {errors.confirmPassword && <p className={css.error}>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className={css.submitButton}>
        {isSubmitting ? 'Loading...' : 'Registration'}
      </button>
    </form>
  );
}
