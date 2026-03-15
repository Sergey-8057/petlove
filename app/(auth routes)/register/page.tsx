'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';

import Title from '@/components/Title/Title';
import PetBlock from '@/components/PetBlock/PetBlock';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import css from './Register.module.css';

export default function Register() {
  const titleForPageRegister = 'Registration';
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <Title title={titleForPageRegister} />
      <PetBlock />
      <RegistrationForm onSubmit={handleSubmit} error={error} />

      {error && <p>{error}</p>}
    </main>
  );
}
