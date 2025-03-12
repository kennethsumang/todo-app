"use client";

import { ToastContainer } from "react-toastify";
import EmotionThemeProvider from "./EmotionThemeProvider";
import GoogleAuthProvider from "./GoogleAuthProvider";
import QueryProvider from "./QueryProvider";
import DateLocalizationProvider from "./DateLocalizationProvider";

interface Props {
  children: React.ReactNode;
}

const AllProviders: React.FC<Props> = (props) => {
  return (
    <EmotionThemeProvider>
      <GoogleAuthProvider>
        <QueryProvider>
          <DateLocalizationProvider>
            {props.children}
          </DateLocalizationProvider>
          <ToastContainer />
        </QueryProvider>
      </GoogleAuthProvider>
    </EmotionThemeProvider>
  );
}

export default AllProviders;