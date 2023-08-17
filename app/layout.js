"use client";
import "./globals.css";
import { Inter } from "next/font/google";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";

import Nav from "../components/Navigation";

import FinanceContextProvider from "../lib/store/finance-context";
import AuthContextProvider from "../lib/store/auth-context";
import DarkModeContext from "../lib/store/dark-mode-context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CoinSense</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
      <ThemeProvider  attribute="class">
      <DarkModeContext>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </DarkModeContext>
      </ThemeProvider >
      </body>      
    </html>
  );
}
