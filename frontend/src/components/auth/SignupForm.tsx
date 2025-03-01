import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import CustomDivider from "../misc/CustomDivider";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import { SyntheticEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import requestRegister, { RegisterPayload } from "../../requests/auth/register.request";
import RegisterValidator from "../../validators/auth/register.validator";
import _ from "lodash";

type ErrorKey = 'username'|'password'|'retypePassword';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, password?: string, retypePassword?: string }>({});
  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => requestRegister(payload),
    onSuccess: (data) => {
      console.log(data);
    }
  })

  function handleFormSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    const formData = { username, password, retypePassword };
    const validationResponse = (new RegisterValidator).validate<RegisterPayload>(formData);
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
    registerMutation.mutate(validationResponse);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={{ xs: 1, lg: 2 }}>
        <span className="text-4xl font-bold">Create an account</span>
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
        <TextField
          type="password"
          size="small"
          label="Retype Password"
          error={!!errors?.retypePassword}
          helperText={errors?.retypePassword ?? ''}
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          onFocus={() => setErrors({ ...errors, retypePassword: undefined })}
        />
        <Button type="submit" variant="contained">Sign up</Button>
        <Typography align="center">
          {`Already have an account?`}
          &nbsp;
          <Link href="/">Sign in.</Link>
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