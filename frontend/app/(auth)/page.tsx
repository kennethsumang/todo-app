import LoginForm from "../_components/auth/LoginForm";
import { serverRequestTokenRefresh } from "../_requests/auth/refresh-token.request";
import { redirect } from "next/navigation";

 
export default async function LoginPage() {
  async function getNewAccessToken(): Promise<string|null> {
    try {
      const response = await serverRequestTokenRefresh();
      if (response.accessToken) {
        return response.accessToken;
      }

      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const accessToken = await getNewAccessToken();
  if (!accessToken) {
    return <LoginForm />;
  }
  
  await fetch('http://localhost:5173/api/set-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken }),
  });
  redirect('/app');
};
