'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { loginSchema } from '@/lib/validation/loginSchema';
import css from './LoginForm.module.css';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: FormValues) => Promise<void>;
}

export default function LoginForm({ onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const getInputClass = (field: keyof FormValues, baseClass: string) => {
    return clsx(baseClass, {
      [css.errorInput]: errors[field],
      [css.successInput]: touchedFields[field] && !errors[field],
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputWrapper}>
        <input
          {...register('email')}
          autoComplete="email"
          placeholder="Email"
          className={getInputClass('email', css.input)}
        />
        {errors.email && (
          <svg className={css.crossIcon} width="22" height="22" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-cross" />
          </svg>
        )}
        {touchedFields.email && !errors.email && (
          <svg className={css.checkIcon} width="22" height="22" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-check" />
          </svg>
        )}
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.passwordWrapper}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          className={getInputClass('password', css.inputPass)}
        />
        {errors.password && (
          <svg className={css.crossIcon} width="22" height="22" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-cross" />
          </svg>
        )}
        {touchedFields.password && !errors.password && (
          <svg className={css.checkIcon} width="22" height="22" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-check" />
          </svg>
        )}
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

      <button type="submit" disabled={isSubmitting} className={css.submitButton}>
        {isSubmitting ? 'Loading...' : 'Log in'}
      </button>
    </form>
  );
}
