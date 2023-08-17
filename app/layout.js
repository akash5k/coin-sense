"use client";
import "./globals.css";
import { Inter } from "next/font/google";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";



import Nav from "../components/Navigation";

import FinanceContextProvider from "../lib/store/finance-context";
import AuthContextProvider from "../lib/store/auth-context";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "CoinSense",
//   description: "A way to track your expenses",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CoinSense</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
      <ThemeProvider  attribute="class">
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
        </ThemeProvider >
      </body>      
    </html>
  );
}
