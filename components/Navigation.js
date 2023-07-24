import React from "react";
import { ImStatsBars } from "react-icons/im";

function Nav() {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex justify-between ">
        {/* User Info*/}
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
              alt="P imange"
            />
          </div>
          <small className="text-xl">Hi,Peter</small>
        </div>

        {/* User Info*/}
        <nav className="flex gap-4 items-center">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="red_btn">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
