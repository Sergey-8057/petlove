import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('Name is required'),

  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Enter a valid Email')
    .required('Email is required'),

  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});
