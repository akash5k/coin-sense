import React from "react";
import { BiStats } from "react-icons/bi";
import { useContext } from "react";

import { DarkModeSwitch } from "react-toggle-dark-mode";

import { authContext } from "../lib/store/auth-context";
import { DarkModeContext } from "../lib/store/dark-mode-context";

function Nav() {
  const { user, loading, logout } = useContext(authContext);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="container max-w-2xl pl-4  mx-auto">
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
              <small className="text-sm font-semibold">{`${greeting}, ${user.displayName}`}</small>
            ) : null}
          </div>
        )}

        {/* right side*/}
        {user && !loading && (
          <nav className="flex gap-4 items-center">
            <div className="flex flex-row gap-2">
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={20}
              />
              <a href="#stats">
                <BiStats
                  className={`text-2xl ${
                    isDarkMode ? "text-white" : "text-black"
                  } hover:bg-gray-200 rounded-md transition-all`}
                />
              </a>
            </div>
            <div>
              <button
                onClick={logout}
                class="relative  items-center justify-center inline-block mr-2 px-2 py-2 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-md group"
              >
                <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                  <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                </span>
                <span class="relative text-white">Log out</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Nav;
