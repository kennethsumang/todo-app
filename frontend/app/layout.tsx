import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./_providers/Providers";
import { ToastContainer } from "react-toastify";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Todo Application",
  description: "Full Stack Developer Certification Case Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.variable}`}>
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
