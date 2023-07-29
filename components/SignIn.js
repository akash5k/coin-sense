import React, { useContext, useRef } from "react";
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";

import { authContext } from "../lib/store/auth-context";
import { auth } from "../lib/firebase";

function SignIn() {
  const { googleLoginHandler, emailLoginHandler } = useContext(authContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    emailLoginHandler(auth, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Coin Sense</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Track your Expenses !
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            {/* <span>Don't have an account?</span>
            <Link className="underline" href="/SignUp">Get Started!</Link>             */}
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <div  className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value="test@gmail.com"
                ref={emailRef}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                value="test@password"
                ref={passwordRef}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                required
              />
            </div>
            <div className="flex items-center space-x-2"></div>
            <div>
              <button
                // type="submit"
                onClick={handleEmailLogin}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                <a                  
                  className="flex items-center justify-center cursor-pointer px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                >
                  <FcGoogle />

                  <span
                    onClick={googleLoginHandler}
                    className="text-sm font-medium text-gray-800 group-hover:text-white"
                  >
                    Google
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
