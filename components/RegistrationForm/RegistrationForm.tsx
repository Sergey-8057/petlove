'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { RegisterRequest } from '@/lib/api/clientApi';
import { registerSchema } from '@/lib/validation/registerSchema';
import css from './RegistrationForm.module.css';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  onSubmit: (data: RegisterRequest) => Promise<void>;
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
    return clsx(baseClass, {
      [css.errorInput]: errors[field],
      [css.successInput]: touchedFields[field] && !errors[field],
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onFormSubmit = async (data: FormValues) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={css.form}>
      <div className={css.inputWrapper}>
        <input
          {...register('name')}
          placeholder="Name"
          className={getInputClass('name', css.input)}
        />
        {errors.name && (
          <svg className={css.crossIcon} width="22" height="22" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-cross" />
          </svg>
        )}
        {touchedFields.name && !errors.name && (
          <svg className={css.checkIcon} width="22" height="22" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-check" />
          </svg>
        )}
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

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
          autoComplete="new-password"
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

      <div className={css.passwordWrapper}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          autoComplete="new-password"
          placeholder="Confirm password"
          className={getInputClass('confirmPassword', css.inputPass)}
        />
        {errors.confirmPassword && (
          <svg className={css.crossIcon} width="22" height="22" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-cross" />
          </svg>
        )}
        {touchedFields.confirmPassword && !errors.confirmPassword && (
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
        {errors.confirmPassword && <p className={css.error}>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className={css.submitButton}>
        {isSubmitting ? 'Loading...' : 'Registration'}
      </button>
    </form>
  );
}
