'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { register, RegisterRequest } from '@/lib/api/clientApi';
import Title from '@/components/Title/Title';
import PetBlock from '@/components/PetBlock/PetBlock';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import css from './Register.module.css';

export default function RegisterPage() {
  const titleForRegisterPage = 'Registration';
  const imageName = 'image-register';
  const altName = 'cat';
  const router = useRouter();

  const handleSubmit = async (data: RegisterRequest) => {
    try {
      const res = await register(data);
      if (res) {
        toast.success('Registration successful 🎉');
        router.push('/profile');
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          toast.error('This email is already registered');
          return;
        }

        const message =
          error.response?.data?.message || error.response?.data?.error || 'Registration failed';

        toast.error(message);
        return;
      }

      toast.error('Something went wrong');
    }
  };

  return (
    <main className={css.mainContent}>
      <PetBlock imageName={imageName} alt={altName} />
      <div className={css.formWrapper}>
        <Title title={titleForRegisterPage} />
        <p className={css.textRegister}>Thank you for your interest in our platform.</p>
        <RegistrationForm onSubmit={handleSubmit} />
        <p className={css.textBeforeLink}>
          Already have an account?
          <Link href="/login" className={css.link}>
            {' '}
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
