import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('/users/signup', body);
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
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status }
      );
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
