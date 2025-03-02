"use client";

import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import CustomDivider from "../misc/CustomDivider";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";
import useAuthStore from "@/app/_store/auth.store";
import { useMutation } from "@tanstack/react-query";
import requestLogin, { LoginPayload } from "@/app/_requests/auth/login.request";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, password?: string}>({});
  const { setUser, setAccessToken } = useAuthStore();
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginPayload) => requestLogin(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push('/app');
    },
    onError: (error) => {
      console.error(error);
      toast.error('An unexpected error has occurred while logging you in.');
    }
  });

  function handleFormSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    let hasErrors = false;
    let errors: { username?: string, password?: string} = {}
    if (!username) {
      errors = { ...errors, username: 'Username is required!' };
      hasErrors = true;
    }

    if (!password) {
      errors = ({ ...errors, password: 'Password is required!' });
      hasErrors = true;
    }

    if (!hasErrors) {
      setErrors({});
      const response = loginMutation.mutate({ username, password });
      console.log(response);
    } else {
      setErrors(errors);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={{ xs: 1, lg: 2 }}>
        <span className="text-4xl font-bold">Sign in</span>
        <TextField
          label="User Name"
          size="small"
          error={!!errors?.username}
          helperText={errors?.username ?? ''}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setErrors({ ...errors, username: undefined })}
        />
        <TextField
          type="password"
          size="small"
          label="Password"
          error={!!errors?.password}
          helperText={errors?.password ?? ''}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setErrors({ ...errors, password: undefined })}
        />
        <Button
          type="submit"
          variant="contained"
          // onClick={handleSigninButtonClick}
        >
          Sign in
        </Button>
        <Typography align="center">
          {`Don't have an account?`}
          &nbsp;
          <Link href="/register">Sign up.</Link>
        </Typography>
        <CustomDivider>OR</CustomDivider>
        <FacebookLogin
          appId=""
          style={{
            backgroundColor: '#4267b2',
            color: '#fff',
            fontSize: '16px',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
          }}
        />
        <GoogleLogin locale="en_PH" onSuccess={() => {}} />
      </Stack>
    </form>
  )
}