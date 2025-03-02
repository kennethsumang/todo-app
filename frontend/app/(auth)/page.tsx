import LoginForm from "../_components/auth/LoginForm";
import requestTokenRefresh from "../_requests/auth/refresh-token.request";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  async function getNewAccessToken(): Promise<string|null> {
    try {
      const response = await requestTokenRefresh();
      if (response.accessToken) {
        return response.accessToken;
      }

      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const newAccessToken = await getNewAccessToken();
  if (!newAccessToken) {
    return <LoginForm />;
  }
  
  redirect('/app');
};