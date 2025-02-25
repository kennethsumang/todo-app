"use client";

import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import classes from "./LoginForm.module.css";
import CustomDivider from "../../common/CustomDivider/CustomDivider";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, password?: string}>({});

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
    } else {
      setErrors(errors);
    }
  }

  return (
    <Stack spacing={{ xs: 1, lg: 2 }}>
      <span className={classes.signInSpan}>Sign in</span>
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