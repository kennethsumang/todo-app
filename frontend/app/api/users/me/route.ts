import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const bearerToken = request.headers.get('Authorization');

    if (!bearerToken) {
      return NextResponse.json(
        { error: 'No access token found in request.' },
        { status: 401 }
      );
    }

    const splitToken = bearerToken.split(' ');
    if (!splitToken || splitToken.length !== 2) {
      return NextResponse.json(
        { error: 'Invalid bearer token.' },
        { status: 401 }
      );
    }

    // Use an environment variable for the backend API URL
    const url = `${process.env.API_URL}/api/users/me`;
    // Forward the login request to the external backend API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${splitToken[1]}`,
        Cookie: `refreshToken=${refreshToken}`
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || 'User fetch failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
