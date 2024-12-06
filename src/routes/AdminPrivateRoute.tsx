import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../Redux/features/auth/authSlice";
import { useMyProfileDataQuery } from "../Redux/features/user/userApi";
import { USER_ROLE } from "../utils/userRole";

const AdminPrivateRoute = ({ children }: any) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const { data, error, isLoading } = useMyProfileDataQuery(undefined);

  if (isLoading) {
    return;
  }

  if (error) {
    return toast.error(error.message);
  }

  if (data?.data.role === USER_ROLE.ADMIN) {
    if (user?.email) {
      return children;
    }
  }

  return <Navigate to={"/sign-in"} state={{ from: location }} replace />;
};

export default AdminPrivateRoute;
