import { Menu, Transition } from "@headlessui/react";

import { Fragment } from "react";
import { CiSettings } from "react-icons/ci";
import { GoMail } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";
import { LiaUserSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../../Redux/features/auth/authSlice";
import { clearCart } from "../../Redux/features/cart/cartSlice";
import { clearWishlist } from "../../Redux/features/wishlist/wishlistSlice";

const DashboardDropdown = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearWishlist());
    dispatch(clearCart());
    navigate("/sign-in");
  };
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <Menu.Button>
        {user?.email && (
          <div className=" relative rounded-full z-10 top-[3.5px]  border-[2px] border-primary/50">
            <img
              src={
                user?.profilePhoto
                  ? user?.profilePhoto
                  : "https://d1c9wriao5k55q.cloudfront.net/assets/images/anonymous-user.png"
              }
              alt=""
              className="size-8 rounded-full"
            />
          </div>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2  min-w-[250px] max-w-[300px] origin-top-right divide-y divide-gray-100 z-50  rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div
            className="py-1 border-b border-gray-200 dark:border-gray-600"
            role="none"
          >
            <p className="px-5 pt-2 mb-1 font-normal text-gray-500 dark:text-gray-500">
              Signed in as:
            </p>
            <a className="flex px-4 pb-2 text-sm items-center font-semibold text-gray-700">
              <span className="mr-2">
                <LiaUserSolid className="text-lg" />
              </span>
              <p>
                {user &&
                  user?.email.split("@")[0].slice(0, 2) +
                    "*".repeat(user?.email.split("@")[0].length - 2)}
              </p>
              <p>@{user && user?.email.split("@")[1]}</p>
            </a>
          </div>
          {user ? (
            <>
              <div role="none">
                <a className="flex items-center cursor-pointer px-4 py-2 text-sm text-gray-700 border-l-2 border-transparent  hover:border-primary  hover:text-primary">
                  <span className="mr-2">
                    <GoMail />
                  </span>
                  Messages
                </a>
              </div>
              <div role="none">
                <a className="flex px-[14px] cursor-pointer py-2 text-sm text-gray-700 border-l-2 border-transparent  hover:border-primary  hover:text-primary">
                  <span className="mr-1">
                    <CiSettings className="text-lg" />
                  </span>
                  Settings
                </a>
              </div>

              <div role="none">
                <button
                  onClick={handleLogout}
                  className="flex px-[12px]  py-2 text-sm text-gray-700 border-l-2 border-transparent  rounded-bl-md hover:border-primary  hover:text-primary"
                >
                  <span className="mr-2">
                    <IoLogInOutline className="text-[16px]" />
                  </span>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="max-h-[90vh] overflow-y-auto py-4">
              <Link to={"/sign-in"}>
                <button className="flex px-4 hover:bg-primary/10 w-full py-4 text-sm text-gray-700 border-l-2 border-transparent  hover:border-primary  hover:text-primary font-semibold">
                  Sign in
                </button>
              </Link>
              <Link to={"/sign-up"}>
                <button className="flex px-4 hover:bg-primary/10 w-full py-4 text-sm text-gray-700 border-l-2 border-transparent  hover:border-primary  hover:text-primary font-semibold">
                  Register
                </button>
              </Link>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DashboardDropdown;
