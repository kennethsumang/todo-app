"use client";

import { ToastContainer } from "react-toastify";
import EmotionThemeProvider from "./EmotionThemeProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";
import QueryProvider from "./QueryProvider";

interface Props {
  children: React.ReactNode;
}

const AllProviders: React.FC<Props> = (props) => {
  return (
    <EmotionThemeProvider>
      <GoogleAuthProvider>
        <QueryProvider>
          {props.children}
          <ToastContainer />
        </QueryProvider>
      </GoogleAuthProvider>
    </EmotionThemeProvider>
  );
}

export default AllProviders;