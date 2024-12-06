import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import Checkout2 from "../Pages/Customer/Checkout/Checkout2";
import FollowedShops from "../Pages/Customer/FollowedShops/FollowedShops";
import MyShoppingCart from "../Pages/Customer/MyShoppingCart/MyShoppingCart";
import OrderHistory from "../Pages/Customer/OrderHistory/OrderHistory";
import MyWishlist from "../Pages/Customer/Wishlist/Wishlist";
import Dashboard from "../Pages/Dashboard/Dashboard";
import NotFoundPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import RecentView from "../Pages/RecentView/RecentView";
import ShopDetails from "../Pages/ShopDetails/ShopDetails";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Profile from "../Pages/UserProfile/UserProfile";
import AddProduct from "../Pages/Vendor/AddProduct/AddProduct";
import CreateShop from "../Pages/Vendor/CreateShop/CreateShop";
import ManageOrders from "../Pages/Vendor/ManageOrders/ManageOrders";
import ManageProducts from "../Pages/Vendor/ManageProducts/ManageProducts";
import ManageShops from "../Pages/Vendor/ManageShops/ManageShops";
import ProductTranslation from "../Pages/Vendor/ProductTranslation/ProductTranslation";
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
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/shop/:id",
        element: <ShopDetails />,
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
        path: "recent-view-products",
        element: <RecentView />,
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            {" "}
            <Profile />
          </PrivateRoute>
        ),
      },
      // Admin routes
      {
        path: "manage-users",
        element: <Dashboard />,
      },
      {
        path: "manage-all-products",
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
        element: <MyShoppingCart />,
      },
      {
        path: "wishlist",
        element: <MyWishlist />,
      },
      {
        path: "checkout",
        element: <Checkout2 />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "recent-products",
        element: <Dashboard />,
      },
      {
        path: "followed-shops",
        element: <FollowedShops />,
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
        element: <ManageProducts />,
      },
      {
        path: "Manage-Orders",
        element: (
          <VendorPrivateRoute>
            <ManageOrders />
          </VendorPrivateRoute>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <VendorPrivateRoute>
            <ProductTranslation />
          </VendorPrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
