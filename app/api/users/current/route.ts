// app/api/users/current/route.ts
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');

    // Если нет токена, возвращаем 401
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Отправляем запрос к бэкенду с токеном в заголовке
    const apiRes = await api.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token.value}`,
        // Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(apiRes.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;

      // Если токен невалидный, удаляем его из cookies
      if (status === 401) {
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');
      }

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Request failed';

      return NextResponse.json({ message }, { status });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
