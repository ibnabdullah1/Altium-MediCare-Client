import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Navbar/Header";
import Navbar from "../Components/Navbar/Navbar";
import TopHeader from "../Components/Navbar/TopHeader";
import ShippingFast from "../Components/ShippingFast/ShippingFast";

const MainLayout = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      <Navbar />
      <Outlet />
      <ShippingFast />
      <Footer />
    </div>
  );
};

export default MainLayout;
