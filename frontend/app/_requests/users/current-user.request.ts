import ApiError from "../../_exceptions/api.error";
import { AuthUserState } from "../../_types/auth";

export const getCurrentProfile = async (
  token: string
): Promise<AuthUserState> => {
  const response = await fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error?.message, response.status);
  }

  return data;
};
