'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

import { login, LoginRequest } from '@/lib/api/clientApi';
import Title from '@/components/Title/Title';
import PetBlock from '@/components/PetBlock/PetBlock';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm'; //edit
import css from './Login.module.css';

export default function LoginPage() {
  const titleForLoginPage = 'Log in';
  const imageName = 'image-register'; //edit
  const altName = 'dog';
  const router = useRouter();

  const handleSubmit = async (data: LoginRequest) => {
    try {
      const res = await login(data);
      if (res) {
        toast.success('Login successful 🎉');
        router.push('/profile');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.request?.status;

        if (status === 401) {
          toast.error('Email or password invalid');
          return;
        }

        const message =
          error.response?.data?.message || error.response?.data?.error || 'Login failed';

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
        <Title title={titleForLoginPage} />
        <p className={css.textRegister}>
          Welcome! Please enter your credentials to login to the platform:
        </p>
        <RegistrationForm onSubmit={handleSubmit} />
        <p className={css.textBeforeLink}>
          Don’t have an account?
          <Link href="/register" className={css.link}>
            {' '}
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
