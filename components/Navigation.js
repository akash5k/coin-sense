import React from "react";
import { ImStatsBars } from "react-icons/im";
import { useContext } from "react";

import { authContext } from "../lib/store/auth-context";

function Nav() {

const {user,loading,logout} = useContext(authContext)

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex justify-between ">
        {/* User Info*/}
        {user && !loading && (
          <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={user.photoURL}
              alt={user.displayName}
              referrerPolicy="no-referrer"
            />
          </div>
          <small className="text-xl">Hi,{user.displayName}</small>
        </div>
        )}
        

        {/* right side*/}
        {user && !loading &&(
          <nav className="flex gap-4 items-center">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button onClick={logout} className="red_btn">Sign Out</button>
          </div>
        </nav>
        )}
        
      </div>
    </header>
  );
}

export default Nav;
