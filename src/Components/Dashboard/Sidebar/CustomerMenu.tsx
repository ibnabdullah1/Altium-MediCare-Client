import { BsShop } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
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
      <MenuItem icon={GoHeart} label="Wishlist" address="wishlist" />
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
      <MenuItem icon={BsShop} label="Followed Shops" address="followed-shops" />
    </>
  );
};

export default CustomerMenu;
