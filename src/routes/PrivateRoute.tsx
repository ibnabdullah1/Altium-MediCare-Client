import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  selectCurrentUser,
  setProfile,
  setRole,
} from "../Redux/features/auth/authSlice";
import { useAppDispatch } from "../Redux/features/hooks";
import { useMyProfileDataQuery } from "../Redux/features/user/userApi";

const PrivateRoute = ({ children }: any) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);
  const { data, error, isLoading } = useMyProfileDataQuery(undefined);

  // Handle loading and error outside of the hook calls
  if (isLoading) {
    return;
  }

  if (error) {
    return <p>Error loading profile: {error.message}</p>;
  }

  // Dispatch profile and role data after profile is fetched

  if (data?.data?.profilePhoto) {
    dispatch(setProfile(data?.data?.profilePhoto));
  }
  if (data?.data?.role) {
    dispatch(setRole(data?.data?.role));
  }

  // If user is authenticated, render children
  if (user?.email) {
    return children;
  }

  // Redirect to login if not authenticated
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default PrivateRoute;
