// hooks/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import ApiError from '../_exception/api.error';
import { AuthUserState } from '../_types/auth';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  // refreshToken: string;
  user: AuthUserState;
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error?.message, response.status);
  }

  return data;
};

const loginUserWithDelay = async (payload: LoginPayload): Promise<LoginResponse> => {
  return new Promise(function(resolve) {
    setTimeout(() => {
      return resolve(loginUser(payload));
    }, 3000);
});
}

export const useLoginMutation = () => {
  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: loginUser,
  });
};
