import React from "react";
import { ImStatsBars } from "react-icons/im";
import { useContext } from "react";

import { authContext } from "../lib/store/auth-context";

function Nav() {
  const { user, loading, logout } = useContext(authContext);

  return (
    <div className="container max-w-2xl px-4  mx-auto">
      <div className="flex justify-between">
        {/* User Info*/}
        {user && !loading && (
          <div className="flex items-center gap-2 py-6">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              {user && user.photoURL ? (
                <img
                  className="object-cover w-full h-full"
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div>
                  {/* Placeholder image or alternate content */}
                  <img
                    className="object-cover w-full h-full"
                    src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                    alt="Placeholder"
                  />
                </div>
              )}
            </div>
            {user && user.displayName ? (
              <small className="text-xl font-bold">{`Hi,${user.displayName}`}</small>
            ) : null}
          </div>
        )}

        {/* right side*/}
        {user && !loading && (
          <nav className="flex gap-4 items-center">
            <div>
              <a href="#stats">
                <ImStatsBars className="text-2xl text-gray-400 hover:text-white" />
              </a>
            </div>
            <div>
              <button onClick={logout} className="red_btn">
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Nav;
