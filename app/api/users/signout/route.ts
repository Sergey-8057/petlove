// app/api/users/signout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');

    // Если есть токен, пытаемся выйти на бэкенде
    if (token) {
      try {
        await api.post('/users/signout', null, {
          headers: {
            Authorization: `Bearer ${token.value}`,
            Cookie: cookieStore.toString(),
          },
        });
      } catch (backendError) {
        // Если бэкенд вернул ошибку, логируем, но продолжаем
        console.error('Backend logout error:', backendError);
        // Не выбрасываем ошибку, чтобы пользователь все равно мог выйти локально
      }
    }

    // В любом случае удаляем токен из cookies
    cookieStore.delete('accessToken');

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Logout route error:', error);

    // Даже если произошла ошибка, пытаемся удалить токен
    try {
      const cookieStore = await cookies();
      cookieStore.delete('accessToken');
    } catch (cookieError) {
      console.error('Failed to delete cookie:', cookieError);
    }

    return NextResponse.json({ message: 'Logout completed with warnings' }, { status: 200 });
  }
}
