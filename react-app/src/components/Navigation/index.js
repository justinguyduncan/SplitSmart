import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <header className="header">
      <div className="container">
        <ul className="navigation">
          <li>
            <NavLink className="logo" exact to="/">
              <img
                id="logo" alt="split-smart icon"
                src="https://res.cloudinary.com/dr1ekjmf4/image/upload/v1687712495/images_lhirzh.png"
              />
              <h1>SplitSmart</h1>
            </NavLink>
          </li>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navigation;
