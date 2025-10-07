import useUserContext from "../contexts/UserContext";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const { user } = useUserContext();
  return !user ? children : <Navigate to="/" />;
};

export default PublicRoute;
