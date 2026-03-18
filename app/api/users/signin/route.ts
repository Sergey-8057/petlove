import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('users/signin', body);
    const { token } = apiRes.data;
    const cookieStore = await cookies();

    cookieStore.set('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(apiRes.data, { status: 201 });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;

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
