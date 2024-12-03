import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../Redux/features/auth/authSlice";
const PrivateRoute = ({ children }: any) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  if (user?.email) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default PrivateRoute;
