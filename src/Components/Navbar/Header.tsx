import { BsCart4 } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import logo from "../../assets/light-logo.png";
import MenuDropdown from "../../Shared/MenuDropdown";
const Header = () => {
  return (
    <div className="max-w-6xl mx-auto flex items-center justify-between  py-4 px-5 lg:px-0 ">
      <Link to={"/"}>
        <div className="flex  items-center gap-1 ">
          <img src={logo} alt="" className="w-[35px] md:w-[50px]" />
          <h2 className="text-xl md:text-3xl text-secondary font-bold">
            Altium <span className="text-primary">MediCare</span>
          </h2>
        </div>
      </Link>
      <div className="hidden lg:flex items-center bg-gray-50  rounded-full gap-2 px-4 py-2">
        <LuSearch className="text-gray-400" />

        <input
          type="text"
          name=""
          id=""
          className="placeholder:text-sm w-[400px] bg-gray-50 placeholder:text-slate-400 border-none outline-none focus:ring-0"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center gap-3 text-gray-500">
        <MenuDropdown />

        <button className="hover:text-primary duration-200 bg-gray-100 rounded-full p-2 text-xl hover:bg-primary/20">
          <IoHeartOutline />
        </button>
        <button className="hover:text-primary duration-200 bg-gray-100 rounded-full p-2 text-xl hover:bg-primary/20">
          <BsCart4 />
        </button>
      </div>
    </div>
  );
};

export default Header;
