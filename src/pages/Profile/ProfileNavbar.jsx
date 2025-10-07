import React from "react";

import { assets } from "../../assets/assets.js";
import "./css/ProfileNavbar.css";
import useUserContext from "../../contexts/UserContext.jsx";

const ProfileNavbar = () => {
  const { logoutUser } = useUserContext();

  return (
    <div className="profile-navbar-container">
      <div className="profile-navbar-left-part">
        <img src={assets.logo} alt="" className="nav-logo" />
      </div>
      <div className="profile-navbar-right-part">
        <button className="logout-btn" onClick={logoutUser}>
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileNavbar;
