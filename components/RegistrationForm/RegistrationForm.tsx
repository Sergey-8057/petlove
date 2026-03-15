'use client';

import css from './RegistrationForm.module.css';

interface Props {
  onSubmit: (formData: FormData) => void;
  error?: string;
}

export default function RegistrationForm({ onSubmit, error }: Props) {
  return (
    <form action={onSubmit} className={css.form}>
      <input id="name" type="text" name="name" className={css.input} placeholder="Name" required />

      <input
        id="email"
        type="email"
        name="email"
        className={css.input}
        placeholder="Email"
        required
      />

      <input
        id="password"
        type="password"
        name="password"
        className={css.input}
        placeholder="Password"
        required
      />

      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        className={css.input}
        placeholder="Confirm password"
        required
      />

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Registration
        </button>
      </div>

      {error && <p className={css.error}>{error}</p>}
    </form>
  );
}
