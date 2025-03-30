"use client";

import { ToastContainer } from "react-toastify";
import EmotionThemeProvider from "./EmotionThemeProvider";
import QueryProvider from "./QueryProvider";
import DateLocalizationProvider from "./DateLocalizationProvider";

interface Props {
  children: React.ReactNode;
}

const AllProviders: React.FC<Props> = (props) => {
  return (
    <EmotionThemeProvider>
      <QueryProvider>
        <DateLocalizationProvider>
          {props.children}
        </DateLocalizationProvider>
        <ToastContainer />
      </QueryProvider>
    </EmotionThemeProvider>
  );
}

export default AllProviders;