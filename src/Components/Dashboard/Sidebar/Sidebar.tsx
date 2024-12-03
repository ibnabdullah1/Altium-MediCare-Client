import { HiOutlineSquaresPlus, HiOutlineUser } from "react-icons/hi2";
import { TbHelpSquareRounded, TbSettings } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/light-logo.png";
import { selectCurrentUser } from "../../../Redux/features/auth/authSlice";
import { USER_ROLE } from "../../../utils/userRole";
import AdminMenu from "./AdminMenu";
import CustomerMenu from "./CustomerMenu";
import MenuItem from "./MenuItem";
import VendorMenu from "./VendorMenu";
const Sidebar = ({ isActive }: any) => {
  const user = useSelector(selectCurrentUser);
  return (
    <div
      className={`z-20 fixed flex flex-col justify-between overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.05)]  bg-[#fff] w-[280px] space-y-6  pb-4  inset-y-0 left-0 transform ${
        isActive && "-translate-x-full"
      }  lg:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div>
        <div className="sticky py-4 top-0 flex pl-4 pr-3 bg-white z-40">
          <Link to={"/"}>
            <div className="flex  items-center gap-1 ">
              <img src={logo} alt="" className="size-[35px]" />
              <h2 className="text-xl text-secondary font-bold">
                Altium <span className="text-primary">MediCare</span>
              </h2>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-between flex-1 mt-6 px-4">
          <nav>
            <MenuItem
              icon={HiOutlineSquaresPlus}
              label="Dashboard"
              address="/dashboard"
            />
            <MenuItem
              icon={HiOutlineUser}
              label="User Profile"
              address="user-profile"
            />
            {user?.role === USER_ROLE.ADMIN && <AdminMenu />}
            {user?.role === USER_ROLE.VENDOR && <VendorMenu />}
            {user?.role === USER_ROLE.CUSTOMER && <CustomerMenu />}
            {/* User Menu Items */}
            <div className="w-full h-[1px] bg-secondary/30 my-8"></div>
            <MenuItem
              icon={TbHelpSquareRounded}
              label="Help Line"
              address="/"
            />
            <MenuItem icon={TbSettings} label="Settings" address="/" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
