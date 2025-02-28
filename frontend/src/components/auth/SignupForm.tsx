import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import CustomDivider from "../misc/CustomDivider";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";

export default function SignupForm() {
  return (
    <Stack spacing={{ xs: 1, lg: 2 }}>
      <span className="text-4xl font-bold">Create an account</span>
      <TextField label="User Name" size="small" />
      <TextField type="password" size="small" label="Password" />
      <Button variant="contained">Sign in</Button>
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
  )
}