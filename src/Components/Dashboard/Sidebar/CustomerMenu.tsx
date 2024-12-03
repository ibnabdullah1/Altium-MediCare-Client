import { FaRegEye, FaRegHeart } from "react-icons/fa6";
import {
  MdOutlineCollectionsBookmark,
  MdOutlineHistory,
  MdOutlineShoppingCart,
} from "react-icons/md";
import MenuItem from "./MenuItem";

const CustomerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineShoppingCart}
        label="My Cart"
        address="my-cart"
      />
      <MenuItem icon={FaRegHeart} label="Wishlist" address="wishlist" />
      <MenuItem
        icon={MdOutlineHistory}
        label="Order History"
        address="order-history"
      />
      <MenuItem
        icon={MdOutlineCollectionsBookmark}
        label="Recent Products"
        address="recent-products"
      />
      <MenuItem
        icon={FaRegEye}
        label="Followed Shops"
        address="followed-shops"
      />
    </>
  );
};

export default CustomerMenu;
