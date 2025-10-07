import React, { useState } from "react";
import { useNavigate } from "react-router";
import { assets } from "../../assets/assets";

import "./Register.css";
import useUserContext from "../../contexts/UserContext";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, BASE_URL } = useUserContext();
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      const f = e.target.files[0];
      setInputData({
        ...inputData,
        [e.target.name]: f,
      });
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true); // Show loading spinner
    const formData = new FormData();
    formData.append("file", inputData.file);
    formData.append("fullName", inputData.fullName);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        // Set the user data
        setUser(data.data);

        // Set the isLoggedIn field as true
        setIsLoggedIn(true);

        // Set the token in the localstorage
        localStorage.setItem("token", JSON.stringify(data.data.token));

        // Navigate to the home page
        navigate("/");
      }
    } catch (error) {
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="login-page">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Registering...</p>
        </div>
      )}
      <div className="login-card">
        <div className="login-header">
          <h3>Create your account</h3>
        </div>
        <div className="login-form">
          <div className="profile-upload">
            <label htmlFor="profile">
              <img
                src={
                  !inputData.file
                    ? assets.upload_area
                    : URL.createObjectURL(inputData.file)
                }
                alt=""
              />
              <input
                type="file"
                name="file"
                onChange={handleChange}
                required
                id="profile"
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="input-div">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="fullName"
              value={inputData.fullName || ""}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="input-div">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={inputData.email || ""}
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
              value={inputData.password || ""}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button className="login-button" onClick={handleSubmit}>
          Register
        </button>
        <p className="register-text">
          Already have an account?{" "}
          <span className="register-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
