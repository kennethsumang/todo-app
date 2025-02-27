import _ from 'lodash';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { AuthUserState } from '@/app/_types/auth';

interface LoginResponseData {
  user: AuthUserState;
  accessToken: string;
  refreshToken: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the JSON body from the request
    const { username, password } = await request.json();
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Use an environment variable for the backend API URL
    const backendUrl = process.env.API_URL;

    // Forward the login request to the external backend API
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || 'Login failed' },
        { status: response.status }
      );
    }

    const responseData = data as LoginResponseData;

    // Return the successful response to the client
    const dataToReturn = _.omit(responseData, 'refreshToken');
    return NextResponse.json(dataToReturn, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
