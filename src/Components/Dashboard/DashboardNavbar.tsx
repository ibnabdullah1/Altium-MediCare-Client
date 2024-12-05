import { FiFilter } from "react-icons/fi";
import { HiMiniBars3 } from "react-icons/hi2";
import { LuSearch } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../assets/light-logo.png";
import Notification from "../../Shared/Notification";
import DashboardDropdown from "./DashboardDropdown";
const DashboardNavbar = ({ isActive, handleToggle }: any) => {
  return (
    <div className="max-w-[920px] mx-auto bg-gray-50 sticky top-0 z-10 flex gap-2 justify-between items-center py-2 px-4">
      <div className="flex lg:hidden">
        <Link to={"/"}>
          <div className="flex  items-center gap-1 ">
            <img src={logo} alt="" className="size-[25px] md:size-[35px]" />
            <h2 className="text-base md:text-xl text-secondary font-bold">
              Altium <span className="text-primary">MediCare</span>
            </h2>
          </div>
        </Link>
      </div>
      <div className="lg:flex hidden items-center gap-2">
        <div className="flex items-center bg-gray-100  rounded-lg gap-2 p-[6px]">
          <LuSearch className="text-gray-400" />

          <input
            type="text"
            name=""
            id=""
            className="placeholder:text-sm w-[400px] bg-gray-100 placeholder:text-slate-400 border-none outline-none focus:ring-0"
            placeholder="Search"
          />
        </div>

        <div className="p-[8px] rounded-lg place-items-center bg-primary/80  text-white transition-a hover:bg-primary">
          <FiFilter />
        </div>
      </div>
      <div className="flex  items-center gap-2">
        <Notification />
        <DashboardDropdown />
        <button
          onClick={handleToggle}
          className="lg:hidden flex hover:text-primary duration-200 bg-gray-100 rounded-full text-secondary/50 p-2 text-xl hover:bg-primary/10"
        >
          {isActive ? <HiMiniBars3 /> : <MdClose />}
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
