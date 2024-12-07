import {
  MdOutlineCollectionsBookmark,
  MdOutlineInventory,
  MdOutlineManageAccounts,
  MdOutlineRateReview,
} from "react-icons/md";
import { TbLockCog, TbTransactionDollar } from "react-icons/tb";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineManageAccounts}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem
        icon={MdOutlineInventory}
        label="Manage Products"
        address="manage-all-products"
      />
      <MenuItem
        icon={TbLockCog}
        label="Manage Shops"
        address="manage-all-shops"
      />
      {/* <MenuItem
        icon={TbLockCog}
        label="Blacklist Shops"
        address="blacklist-shops"
      /> */}
      {/* <MenuItem
        icon={MdOutlineCategory}
        label="Manage Categories"
        address="manage-categories"
      /> */}
      <MenuItem
        icon={MdOutlineCollectionsBookmark}
        label="Recent View Products"
        address="recent-view-products"
      />
      <MenuItem
        icon={TbTransactionDollar}
        label="Transactions"
        address="transactions"
      />
      <MenuItem
        icon={MdOutlineRateReview}
        label="Review Activities"
        address="review-activities"
      />
    </>
  );
};

export default AdminMenu;
