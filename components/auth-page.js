import React, { useContext, useRef, useState } from "react";
import Link from "next/link";
import { FcGoogle, FcCurrencyExchange } from "react-icons/fc";

import { authContext } from "../lib/store/auth-context";
import { auth } from "../lib/firebase";
import { toast } from "react-toastify";

function SignIn() {
  const {
    googleLoginHandler,
    emailLoginHandler,
    emailSignupHandler,
    handleResetPassword,
  } = useContext(authContext);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  //login with email
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    emailLoginHandler(auth, email, password);
  };

  const resetPasswordHandler = () => {
    const email = emailRef.current.value;
    handleResetPassword(email);
  };
  //signup with email
  const signupEmailRef = useRef();
  const signupPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();

  const handleEmailSignup = () => {
    const email = signupEmailRef.current.value;
    const password = signupPasswordRef.current.value;
    const name = nameRef.current.value;

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    emailSignupHandler(auth, email, password, name);
  };

  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
    setPasswordsMatch(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-1  lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-2xl max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 pt-4 pb-1 md:py-6 text-white bg-[#503a93] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Coin Sense</a>
          </div>
          <div className="hidden md:block justify-center">
            <FcCurrencyExchange className="text-[10rem]" />
          </div>
          <p className="mt-6 font-normal text-center text-gray-200 md:mt-0">
            Track your Expenses !
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <Link
              className="underline"
              href="/"
              onClick={handleOpenSignUpModal}
            >
              Get Started!
            </Link>
          </p>
        </div>
        <div className="p-5 bg-[#1C1B1F] md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-100">
            Login to your account
          </h3>
          <div className="flex flex-col space-y-5">
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoFocus
              placeholder="Email address"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              required
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              ref={passwordRef}
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              required
            />

            <span
              onClick={resetPasswordHandler}
              className="text-sm rounded-sm underline text-red-400 hover:text-blue-600 duration-300 cursor-pointer"
            >
              Forgot password ?
            </span>

            <div className="flex items-center space-x-2"></div>
            <div>
              <button
                onClick={handleEmailLogin}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>

              {/* Modal for sign-up */}
              {showSignUpModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-md shadow-md max-w-xl">
                    <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      ref={nameRef}
                      className="border rounded-md p-2 mb-2 w-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      ref={signupEmailRef}
                      className="border rounded-md p-2 mb-2 w-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      ref={signupPasswordRef}
                      className="border rounded-md p-2 mb-2 w-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Confirm your Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      ref={confirmPasswordRef}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border rounded-md p-2 mb-2 w-full focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    {!passwordsMatch && (
                      <p className="text-red-500">Passwords do not match.</p>
                    )}
                    <div className="flex justify-between">
                      <button
                        onClick={handleEmailSignup}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2"
                      >
                        Sign Up
                      </button>
                      <button
                        onClick={handleCloseSignUpModal}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-4 py-2 ml-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-200">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>

              <div className="flex flex-col space-y-4 pb-2 items-center">
                <div className="flex w-full items-center justify-center cursor-pointer px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-100 rounded-md group hover:bg-gray-700 focus:outline-none">
                  <FcGoogle />

                  <span
                    onClick={googleLoginHandler}
                    className="text-sm font-medium text-gray-100 group-hover:text-white"
                  >
                    Google
                  </span>
                </div>
              
              <span 
              onClick={handleOpenSignUpModal} 
              className="text-sm hover:cursor-pointer hover:underline">
                New here? <span className="text-green-500">Sign up</span>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
