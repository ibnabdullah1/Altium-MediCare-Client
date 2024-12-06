import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  logout,
  selectCurrentUser,
  setProfile,
  setRole,
} from "../Redux/features/auth/authSlice";
import { useAppDispatch } from "../Redux/features/hooks";
import { useMyProfileDataQuery } from "../Redux/features/user/userApi";
import LoaderSpinner from "../Shared/LoaderSpinner";
import { UserStatus } from "../types/types";
import { USER_ROLE } from "../utils/userRole";

const VendorPrivateRoute = ({ children }: any) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const { data, error, isLoading } = useMyProfileDataQuery(undefined);
  const dispatch = useAppDispatch();
  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return toast.error(error.message);
  }

  const createShop = data?.data?.shops?.length;

  if (createShop < 1) {
    return (
      <Navigate
        to={"/dashboard/create-shop"}
        state={{ from: location }}
        replace
      />
    );
  }

  // Handle blocked or invalid user status
  if (data?.data?.status === UserStatus.BLOCKED || !data?.data?.status) {
    dispatch(logout());
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Update Redux state with profile and role data
  if (data?.data?.profilePhoto) {
    dispatch(setProfile(data.data.profilePhoto));
  }

  if (data?.data?.role) {
    dispatch(setRole(data.data.role));
  }

  // Render children if the user is authenticated
  if (user?.email && user?.role === USER_ROLE.VENDOR) {
    return <>{children}</>;
  }

  return <Navigate to={"/sign-in"} state={{ from: location }} replace />;
};

export default VendorPrivateRoute;
