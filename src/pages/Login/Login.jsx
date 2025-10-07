import React, { useState } from "react";
import "./Login.css";
import useUserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const { setUser, setIsLoggedIn, BASE_URL } = useUserContext();

  const [requestData, setRequestData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setUser(data.data);
        setIsLoggedIn(true);
        localStorage.setItem("token", JSON.stringify(data.data.token));
        navigate("/");
      } else {
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 2000);
      }
    } catch (error) {
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {showErrorPopup && (
        <div className="login-error-popup">
          <span>❌ Invalid email or password!</span>
        </div>
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Logging in...</p>
        </div>
      )}
      <div className="login-card">
        <div className="login-header">
          <h3>Login</h3>
          <p>Enter your credentials</p>
        </div>
        <div className="login-form">
          <div className="input-div">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={requestData.email || ""}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-div">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={requestData.password || ""}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="login-button">
          Login
        </button>
        <p className="register-text">
          Don't have an account?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
