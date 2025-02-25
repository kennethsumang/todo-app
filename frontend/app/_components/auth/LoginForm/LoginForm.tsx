"use client";

import { Button, Stack, TextField } from "@mui/material";
import classes from "./LoginForm.module.css";
import CustomDivider from "../../common/CustomDivider/CustomDivider";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginForm() {
  return (
    <Stack spacing={{ xs: 1, lg: 2 }}>
      <span className={classes.signInSpan}>Sign in</span>
      <TextField label="User Name" size="small" />
      <TextField type="password" size="small" label="Password" />
      <Button variant="contained">Sign in</Button>
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