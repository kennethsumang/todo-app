"use client";

import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";
import useAuthStore from "@/app/_store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, LoginResponse } from "@/app/_requests/auth/login.request";
import { useRouter } from "next/navigation";
import config from "@/app/_config/app.config";
import LoginValidator from "@/app/_validators/auth/login.validator";
import _ from "lodash";

type ErrorKey = 'username'|'password';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, password?: string}>({});
  const { setUser, setAccessToken } = useAuthStore();
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      const response = await fetch(`${config.appUrl}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json() as LoginResponse;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push('/todos');
    },
    onError: (error) => {
      console.error(error);
      toast.error('An unexpected error has occurred while logging you in.');
    }
  });

  function handleFormSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    const formData = { username, password };
    const validationResponse = (new LoginValidator).validate<LoginPayload>(formData);
    if ("errors" in validationResponse) {
      const errorObj: { username?: string, password?: string, retypePassword?: string } = {};
      _.forEach(validationResponse.errors.details, (value) => {
        const errorKey = value.path[0] as ErrorKey;
        errorObj[errorKey] = value.message;
      });
      setErrors(errorObj);
      return;
    }

    setErrors({});
    loginMutation.mutate(validationResponse);
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
      </Stack>
    </form>
  )
}