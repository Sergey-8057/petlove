'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { register, RegisterRequest } from '@/lib/api/clientApi';
import Title from '@/components/Title/Title';
import PetBlock from '@/components/PetBlock/PetBlock';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import css from './Register.module.css';

export default function Register() {
  const titleForPageRegister = 'Registration';
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
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <main className={css.mainContent}>
      <PetBlock imageName={imageName} alt={altName} />
      <div className={css.formWrapper}>
        <Title title={titleForPageRegister} />
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
