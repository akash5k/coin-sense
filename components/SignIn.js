import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import { authContext } from "../lib/store/auth-context";
import { auth } from "../lib/firebase";


function SignIn() {
    const{googleLoginHandler} = useContext(authContext)
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl text-center font-bold">Welcome</h1>

      <div className="flex overflow-hidden shadow-md shadow-slate-500"></div>
      <div className="px-4 py-4">
        <h3 className="text-2xl text-center">Please Sign In to continue</h3>
        <button 
        onClick={googleLoginHandler}
        className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium align-middle text-white bg-gray-700 rounded-xl">
          <FcGoogle className="text-2xl"/>
          Google
        </button>
      </div>
    </main>
  );
}

export default SignIn;
