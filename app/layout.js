"use client";
import "./globals.css";
import { Inter } from "next/font/google";

import Nav from "../components/Navigation";

import FinanceContextProvider from "../lib/store/finance-context";
import AuthContextProvider from "../lib/store/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coinsense",
  description: "A way to track your expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
