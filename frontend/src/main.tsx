import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from "react-toastify";
import QueryProvider from './providers/QueryProvider';
import GoogleAuthProvider from './providers/GoogleAuthProvider';
import Router from './router/Router';
import './index.css';
import EmotionThemeProvider from './providers/EmotionThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmotionThemeProvider>
      <GoogleAuthProvider>
        <QueryProvider>
          <Router />
          <ToastContainer />
        </QueryProvider>
      </GoogleAuthProvider>
    </EmotionThemeProvider>
  </StrictMode>,
)
