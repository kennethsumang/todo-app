import { useNavigate } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import useAuthStore from "../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import requestTokenRefresh from "../requests/auth/refresh-token.request";
import { useEffect } from "react";

export default function LoginPage() {
  const { setAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const tokenRefreshMutation = useMutation({
    mutationFn: requestTokenRefresh,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      navigate('/app');
    },
    onError: (error) => {
      console.log('[Error]')
      console.error(error);
    },
    retry: false,
  });

  useEffect(() => {
    tokenRefreshMutation.mutate();
  }, []);
  
  return <LoginForm />;
};