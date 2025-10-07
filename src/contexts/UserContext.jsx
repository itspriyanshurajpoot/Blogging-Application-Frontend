import axios from "axios";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState();
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  let jwtToken = JSON.parse(localStorage.getItem("token"));

  const getHeader = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const postHeader = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/users/logout`,
        getHeader
      );

      if (data.success) {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = async () => {
    try {
      jwtToken = JSON.parse(localStorage.getItem("token"));
      if (jwtToken) {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/users/by-token`,
          getHeader
        );

        if (data.success) {
          setUser(data.data);
          setIsLoggedIn(true);
          console.log(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/blogs/by-user`,
          getHeader
        );
        if (data.success) {
          setUserBlogs(data.data);
          console.log("User's blogs ",data.data);
          
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    isAuthenticated();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    postHeader,
    logoutUser,
    getUserBlogs,
    userBlogs,
    setUserBlogs,
    BASE_URL
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
