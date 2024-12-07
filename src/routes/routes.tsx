import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import ManageAllProducts from "../Pages/Admin/ManageAllProducts";
import ManageAllUsers from "../Pages/Admin/ManageAllUsers";
import Checkout from "../Pages/Customer/Checkout/Checkout";
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

import AllProductTranslation from "../Pages/Admin/AllProductTranslation";
import ManageAllShops from "../Pages/Admin/ManageAllShops";
import ReviewActivities from "../Pages/Admin/ReviewActivities";
import AllCollections from "../Pages/AllColections/AllColections";
import ChangePassword from "../Pages/ChangePassword/ChangePassword";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import VendorShopReview from "../Pages/Vendor/VendorShopReview/VendorShopReview";
import ComingSoonPage from "../Shared/ComingSoonPage";
import AdminPrivateRoute from "./AdminPrivateRoute";
import PrivateRoute from "./PrivateRoute";
import VendorPrivateRoute from "./VerndorPrivateRoute";

const routes = [
  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about-us", element: <ComingSoonPage /> },
      { path: "/blogs", element: <ComingSoonPage /> },
      { path: "/faqs", element: <ComingSoonPage /> },
      { path: "/privacy-policy", element: <ComingSoonPage /> },
      { path: "/refund-policy", element: <ComingSoonPage /> },
      { path: "/terms-of-service", element: <ComingSoonPage /> },
      { path: "/product-details/:id", element: <ProductDetails /> },
      { path: "/all-collections", element: <AllCollections /> },
      {
        path: "/shop/:id",
        element: (
          <PrivateRoute>
            <ShopDetails />
          </PrivateRoute>
        ),
      },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },

      { path: "/sign-up", element: <SignUp /> },
    ],
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "recent-view-products", element: <RecentView /> },
      { path: "user-profile", element: <Profile /> },
      { path: "help-line", element: <h2>Coming Soon help-line page</h2> },
      { path: "settings", element: <h2>Coming Soon settings page</h2> },

      // Admin Routes
      {
        path: "manage-users",
        element: (
          <AdminPrivateRoute>
            <ManageAllUsers />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "manage-all-shops",
        element: (
          <AdminPrivateRoute>
            <ManageAllShops />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "manage-all-products",
        element: (
          <AdminPrivateRoute>
            <ManageAllProducts />
          </AdminPrivateRoute>
        ),
      },
      // {
      //   path: "blacklist-shops",
      //   element: (
      //     <AdminPrivateRoute>
      //       <h2>Coming Soon</h2>
      //     </AdminPrivateRoute>
      //   ),
      // },
      {
        path: "transactions",
        element: (
          <AdminPrivateRoute>
            <AllProductTranslation />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "review-activities",
        element: (
          <AdminPrivateRoute>
            <ReviewActivities />
          </AdminPrivateRoute>
        ),
      },

      // User Routes
      { path: "my-cart", element: <MyShoppingCart /> },
      { path: "wishlist", element: <MyWishlist /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-history", element: <OrderHistory /> },
      { path: "followed-shops", element: <FollowedShops /> },

      // Vendor Routes
      {
        path: "create-shop",
        element: (
          <PrivateRoute>
            <CreateShop />
          </PrivateRoute>
        ),
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
        element: (
          <VendorPrivateRoute>
            <ManageShops />
          </VendorPrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <VendorPrivateRoute>
            <ManageProducts />
          </VendorPrivateRoute>
        ),
      },
      {
        path: "manage-orders",
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
        element: (
          <VendorPrivateRoute>
            <VendorShopReview />
          </VendorPrivateRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
