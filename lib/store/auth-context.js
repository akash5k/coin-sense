"use client";

import { createContext } from "react";

import { auth } from "../firebase/index";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { toast } from "react-toastify";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  emailLoginHandler: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider(auth);

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };

  const emailLoginHandler = async (auth, email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const emailSignupHandler = async (auth, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const values = {
    user,
    loading,
    googleLoginHandler,
    emailLoginHandler,
    emailSignupHandler,
    logout,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
