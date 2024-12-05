import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/light-logo.png";
import { RootState } from "../../Redux/features/store";
import MenuDropdown from "../../Shared/MenuDropdown";
import OrderCart from "./OrderCart";
const Header = () => {
  const [open, setOpen] = useState(false);
  const wishlist = useSelector((state: RootState) => state.wishList.items);
  const cart = useSelector((state: RootState) => state.cart.items);
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

        <Link
          to={"dashboard/wishlist"}
          className="relative hover:text-primary duration-200 bg-gray-100 rounded-full p-2 text-xl hover:bg-primary/20"
        >
          {wishlist?.length > 0 && (
            <div className="absolute -right-2 -top-1 bg-primary text-white rounded-full size-5 text-[10px] flex justify-center items-center">
              {wishlist?.length}
            </div>
          )}
          <IoHeartOutline />
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Cart"
          className="relative hover:text-primary duration-200 bg-gray-100 rounded-full p-2 text-xl hover:bg-primary/20"
        >
          {cart?.length > 0 && (
            <div className="absolute -right-2 -top-1 bg-primary text-white rounded-full size-5 text-[10px] flex justify-center items-center">
              {cart?.length}
            </div>
          )}
          <BsCart4 />
        </button>
        <OrderCart open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Header;
