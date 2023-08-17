"use client";

import { createContext } from "react";

import { auth } from "../firebase/index";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile, 
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

function displayWelcomeMessage(user) {
  if (user) {
    toast.success(`Welcome back, ${user.displayName || 'User'}!`);
  } else {
    toast.success("Welcome back!");
  }
}

export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider(auth);

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      // Fetch the currently signed-in user's information
      const user = auth.currentUser; 
      displayWelcomeMessage(user);

    } catch (error) {
      toast.error(error.message);
    }
  };

  const emailLoginHandler = async (auth, email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password); 

      // Fetch the currently signed-in user's information
      const user = auth.currentUser;  
      displayWelcomeMessage(user);
    }
      catch (error) {
      toast.error(error.message);
      }
  };
  
  const emailSignupHandler = async (auth, email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      // Update user's display name
      await updateDisplayName(userCredential.user, name);
  
      // Other actions after successful sign-up if needed
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const updateDisplayName = async (user, displayName) => {
    try {
      await updateProfile(user, {
        displayName: displayName,
      });
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
