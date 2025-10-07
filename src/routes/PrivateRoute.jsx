import useUserContext from '../contexts/UserContext'
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
  const {user} = useUserContext();
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute