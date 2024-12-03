import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/features/auth/authSlice";
import { USER_ROLE } from "../../utils/userRole";
import AdminDashboard from "./Admin/AdminDashboard";
import CustomerDashboard from "./Customer/CustomerDashboard";
import VendorDashboard from "./Vendor/VendorDashboard";

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      {user?.role === USER_ROLE.CUSTOMER && <CustomerDashboard />}
      {user?.role === USER_ROLE.ADMIN && <AdminDashboard />}
      {user?.role === USER_ROLE.VENDOR && <VendorDashboard />}
    </div>
  );
};

export default Dashboard;
