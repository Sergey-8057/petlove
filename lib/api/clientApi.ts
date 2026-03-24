import { isAxiosError } from 'axios';

import { nextServer } from './api';
import { User, AuthResponse, UserInfo } from '@/types/user';

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  try {
    const res = await nextServer.post<AuthResponse>('/users/signup', data);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 409) {
        throw new Error('This email is already registered');
      }

      const message =
        error.response?.data?.message || error.response?.data?.error || 'Registration failed';

      throw new Error(message);
    }

    throw new Error('Something went wrong');
  }
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  try {
    const res = await nextServer.post<User>('/users/signin', data);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        throw new Error('Email or password invalid');
      }

      const message =
        error.response?.data?.message || error.response?.data?.error || 'Login failed';

      throw new Error(message);
    }

    throw new Error('Something went wrong');
  }
};

export const getMe = async () => {
  try {
    const { data } = await nextServer.get<UserInfo>('/users/current');
    return data;
  } catch (error) {
    // Если ошибка 401, возвращаем null (пользователь не авторизован)
    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    // Для других ошибок логируем и возвращаем null
    console.error('Failed to fetch user:', error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    // Отправляем запрос на выход
    await nextServer.post('/users/signout');
  } catch (error) {
    // Даже если запрос не удался, не выбрасываем ошибку
    // Пользователь все равно должен быть разлогинен локально
    console.error('Logout request failed:', error);

    // Если ошибка не 401, все равно продолжаем
    if (isAxiosError(error) && error.response?.status !== 401) {
      console.warn('Logout completed with warnings');
    }
  }
};

// export type UpdateUserRequest = {
//   username: string;
// };

// export const updateMe = async (payload: UpdateUserRequest) => {
//   const res = await nextServer.patch<User>('/users/me', payload);
//   return res.data;
// };

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export const clientFetchNotes = async (
//   search: string,
//   page: number,
//   perPage: number,
//   tag: string
// ) => {
//   const params: Record<string, string | number> = {
//     page,
//     perPage,
//   };
//   const trimmedSearch = search.trim();
//   if (trimmedSearch) {
//     params.search = trimmedSearch;
//   }
//   if (tag !== 'All') {
//     params.tag = tag;
//   }

//   const res = await nextServer.get<NotesResponse>('/notes', { params });
//   return res.data;
// };

// export const clientFetchNoteById = async (noteId: string) => {
//   const res = await nextServer.get<Note>(`/notes/${noteId}`);
//   return res.data;
// };

// export const clientCreateNote = async (noteData: NewNoteData) => {
//   const res = await nextServer.post<Note>('/notes', noteData);
//   return res.data;
// };

// export const clientDeleteNote = async (noteId: string) => {
//   const res = await nextServer.delete<Note>(`/notes/${noteId}`);
//   return res.data;
// };
