import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CiUser } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../Redux/features/auth/authSlice";

const MenuDropdown = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        {!user ? (
          <button className="hover:text-primary duration-200 bg-gray-100 rounded-full p-2 text-xl hover:bg-primary/20">
            <CiUser />
          </button>
        ) : (
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
        <Menu.Items className="absolute right-0 mt-2 min-w-[250px] max-w-[250px] origin-top-right divide-y divide-gray-100 z-50 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {user ? (
            <div className="max-h-[90vh] overflow-y-auto pt-4">
              <Link
                to={"/user-profile"}
                className="flex items-center cursor-pointer px-4 py-2 text-sm text-gray-700 border-l-2 border-transparent  hover:border-primary  hover:text-primary"
              >
                <span className="mr-2">
                  <FiUser />
                </span>
                My Account
              </Link>
              <Link
                to="/dashboard"
                className="flex px-4 py-2 cursor-pointer text-sm text-gray-700 border-l-2 border-transparent  hover:border-primary  hover:text-primary"
              >
                <span className="mr-2">
                  <MdOutlineDashboardCustomize />{" "}
                </span>
                Dashboard
              </Link>
              <Link
                to={"/create-post"}
                className="flex lg:hidden items-center cursor-pointer px-4 py-2 text-sm text-gray-700 border-l-2 border-transparent  hover:border-primary  hover:text-primary"
              >
                {" "}
                <span className="mr-2">
                  <IoCreateOutline />
                </span>
                Wishlist
              </Link>

              <hr className="my-3" />
              <a className="flex px-4 py-1 cursor-pointer text-sm text-gray-700  hover:text-primary">
                Settings
              </a>

              <hr className="my-3" />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-left text-sm text-gray-700 hover:text-primary"
              >
                <p>Sign Out</p>
                <div className="flex items-center">
                  <p>
                    {user &&
                      user?.email.split("@")[0].slice(0, 2) +
                        "*".repeat(user?.email.split("@")[0].length - 2)}
                  </p>
                  <p>@{user && user?.email.split("@")[1]}</p>
                </div>
              </button>
            </div>
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

export default MenuDropdown;
