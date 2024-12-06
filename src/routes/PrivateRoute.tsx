import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
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

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);

  const { data, error, isLoading } = useMyProfileDataQuery(undefined);

  // Redirect unauthenticated users
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Show loading state
  if (isLoading) {
    return <LoaderSpinner />;
  }

  // Handle errors from the API query
  if (error) {
    return <p>Error loading profile: {error.message}</p>;
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
  if (user?.email) {
    return <>{children}</>;
  }

  // Fallback to the login page
  return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
