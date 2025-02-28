import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import CustomDivider from "../misc/CustomDivider";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import useAuthStore from "../../store/auth.store";

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, password?: string}>({});
  const { setUser, setAccessToken } = useAuthStore();
  const toastId = useRef<Id|null>(null);

  // useEffect(() => {
  //   switch (status) {
  //     case 'idle':
  //       return;
  //     case 'pending':
  //       toastId.current = toast.info('Logging you in...', { toastId: 'login', autoClose: false });
  //       return;
  //     case 'error':
  //       const message = error.code === 400 ? 'Invalid credentials' : 'An unexpected error has occurred.';
  //       toast.update(toastId.current!, { type: 'error', render: message, autoClose: 3000 });
  //       return;
  //     case 'success':
  //       toast.update(toastId.current!, { type: 'success', render: 'Logged in successfully!', autoClose: 3000 });
  //       setUser(data.user);
  //       setAccessToken(data.accessToken);
  //       return;
  //   }
  // }, [error, data, status]);

  async function handleSigninButtonClick() {
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
      // mutate({ username, password });
    } else {
      setErrors(errors);
    }
  }

  return (
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
        variant="contained"
        onClick={handleSigninButtonClick}
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
  )
}