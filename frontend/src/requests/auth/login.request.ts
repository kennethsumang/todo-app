import ApiError from "../../exceptions/api.error";
import { AuthUserState } from "../../types/auth";

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
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error?.message, response.status);
  }

  return data;
};

export default loginUser;
