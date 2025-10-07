import { useNavigate } from "react-router";
import { assets } from "../../assets/assets.js";
import "./Navbar.css";
import useUserContext from "../../contexts/UserContext.jsx";

const Navbar = () => {
  const { user, isLoggedIn, logoutUser } = useUserContext();
  const navigate = useNavigate();

  return (
    <nav className="container">
      <div className="left-part">
        <img src={assets.logo} alt="" className="nav-logo" />
      </div>
      <div className="right-part">
        {isLoggedIn ? (
          <div className="profile-group">
            <img
              src={user?.profileImageUrl}
              alt="Profile"
              className="profile-img"
            />
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => navigate(`/profile/${user?.id}`)}
              >
                My Profile
              </button>
              <button className="dropdown-item" onClick={logoutUser}>Logout</button>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="btn-primary">
            Login
            <img src={assets.arrow} alt="Arrow" className="arrow-icon" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
