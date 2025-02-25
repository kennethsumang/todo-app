"use client";

import { Grid2 } from "@mui/material";
import LoginForm from "../_components/auth/LoginForm/LoginForm";

export default function Home() {
  return (
    <Grid2 container spacing={2} style={{ height: "100%" }}>
      <Grid2 size={6}>
        <div style={{
          height: '100%',
          width: '100%',
          backgroundImage: 'url("/background.webp")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
        ></div>
      </Grid2>
      <Grid2
        size={6}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '3rem',
          paddingRight: '3rem'
        }}
      >
        <LoginForm />
      </Grid2>
    </Grid2>
  );
}
