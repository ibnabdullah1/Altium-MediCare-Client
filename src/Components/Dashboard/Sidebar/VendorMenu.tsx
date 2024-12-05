import { CiShop } from "react-icons/ci";
import {
  MdOutlineAddBox,
  MdOutlineCollectionsBookmark,
  MdOutlineHistory,
  MdOutlineInventory,
  MdOutlineRateReview,
} from "react-icons/md";
import { PiStorefront } from "react-icons/pi";
import { TbTransactionDollar } from "react-icons/tb";
import MenuItem from "./MenuItem";

const VendorMenu = () => {
  return (
    <>
      <MenuItem icon={CiShop} label="Create Shop" address="create-shop" />
      <MenuItem
        icon={MdOutlineAddBox}
        label="Add Product"
        address="add-product"
      />
      <MenuItem
        icon={PiStorefront}
        label="Manage Shops"
        address="manage-shops"
      />
      <MenuItem
        icon={MdOutlineInventory}
        label="Manage Products"
        address="manage-products"
      />
      <MenuItem
        icon={MdOutlineHistory}
        label="Order History"
        address="order-history"
      />
      <MenuItem
        icon={MdOutlineCollectionsBookmark}
        label="Recent View Products"
        address="recent-view-products"
      />
      <MenuItem
        icon={TbTransactionDollar}
        label="Transaction History"
        address="transactions-history"
      />
      <MenuItem
        icon={MdOutlineRateReview}
        label="Customer Reviews"
        address="reviews"
      />
    </>
  );
};

export default VendorMenu;
