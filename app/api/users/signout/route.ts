import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');

    if (token) {
      try {
        await api.post('/users/signout', null, {
          headers: {
            Authorization: `Bearer ${token.value}`,
            Cookie: cookieStore.toString(),
          },
        });
      } catch (backendError) {
        console.error('Backend logout error:', backendError);
      }
    }

    cookieStore.delete('accessToken');

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Logout route error:', error);

    try {
      const cookieStore = await cookies();
      cookieStore.delete('accessToken');
    } catch (cookieError) {
      console.error('Failed to delete cookie:', cookieError);
    }

    return NextResponse.json({ message: 'Logout completed with warnings' }, { status: 200 });
  }
}
