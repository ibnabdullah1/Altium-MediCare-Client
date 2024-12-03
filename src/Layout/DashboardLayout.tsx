import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Components/Dashboard/DashboardNavbar";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";
const DashboardLayout = () => {
  const [isActive, setActive] = useState(true);

  const handleToggle = () => {
    setActive((prev) => !prev);
  };
  return (
    <div className="relative min-h-screen  lg:flex font-questrial gap-5">
      <Sidebar isActive={isActive} />
      <div className="flex-1 lg:ml-64 bg-gray-50 min-h-svh">
        <DashboardNavbar handleToggle={handleToggle} isActive={isActive} />
        <div className=" max-w-4xl  mx-auto py-5 px-5 md:px-8 lg:px-0 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
