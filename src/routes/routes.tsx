import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import AddProduct from "../Pages/AddProduct/AddProduct";
import CreateShop from "../Pages/CreateShop/CreateShop";
import Dashboard from "../Pages/Dashboard/Dashboard";
import NotFoundPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ManageShops from "../Pages/ManageShops/ManageShops";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Profile from "../Pages/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import VendorPrivateRoute from "./VerndorPrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "user-profile",
        element: <Profile />,
      },
      // Admin routes
      {
        path: "manage-users",
        element: <Dashboard />,
      },
      {
        path: "manage-products",
        element: <Dashboard />,
      },
      {
        path: "blacklist-shops",
        element: <Dashboard />,
      },
      {
        path: "manage-categories",
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Dashboard />,
      },
      {
        path: "review-activities",
        element: <Dashboard />,
      },

      // User Routes
      {
        path: "my-cart",
        element: <Dashboard />,
      },
      {
        path: "wishlist",
        element: <Dashboard />,
      },
      {
        path: "order-history",
        element: <Dashboard />,
      },
      {
        path: "recent-products",
        element: <Dashboard />,
      },

      // Vendor Routes
      {
        path: "create-shop",
        element: <CreateShop />,
      },
      {
        path: "add-product",
        element: (
          <VendorPrivateRoute>
            <AddProduct />
          </VendorPrivateRoute>
        ),
      },
      {
        path: "manage-shops",
        element: <ManageShops />,
      },
      {
        path: "manage-products",
        element: <Dashboard />,
      },
      {
        path: "order-history",
        element: <Dashboard />,
      },
      {
        path: "transactions-history",
        element: <Dashboard />,
      },
      {
        path: "reviews",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
