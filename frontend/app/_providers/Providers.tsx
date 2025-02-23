"use client";

import EmotionThemeProvider from "./EmotionThemeProvider";
import GoogleLoginProvider from "./GoogleLoginProvider";
import QueryProvider from "./QueryProvider";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = function (props) {
  return (
    <EmotionThemeProvider>
      <GoogleLoginProvider>
        <QueryProvider>
          {props.children}
        </QueryProvider>
      </GoogleLoginProvider>
    </EmotionThemeProvider>
  );
}

export default Providers;