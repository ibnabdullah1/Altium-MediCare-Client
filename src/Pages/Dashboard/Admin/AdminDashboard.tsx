import CountUp from "react-countup";
import { HiMiniUser } from "react-icons/hi2";
import { MdLocalOffer } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import { TbShoppingCartCheck } from "react-icons/tb";
import CurrentOrders from "../../../Shared/CurrentOrders";
import OrdersChart from "../../../Shared/OrdersChart";
import SalesAnalytics from "../../../Shared/SalesAnalytics ";
import TopSalesItems from "../../../Shared/TopSalesItems";
import Weather from "../../../Shared/Weather";
const AdminDashboard = () => {
  return (
    <div>
      <Weather />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white px-5 py-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Revenue
              </p>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-lg font-semibold text-secondary/80">
                  $
                  <CountUp end={10000} duration={2.5} />
                </p>
                <p className="text-primary/70 text-xs font-semibold">+3.67%</p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <MdLocalOffer className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white px-5 py-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Orders
              </p>
              <div className="flex items-center gap-3 mt-1">
                <p className="  text-lg font-semibold text-secondary/80">
                  <CountUp end={200} duration={2} />
                </p>
                <p className="text-red-500 text-xs font-semibold">-2.67%</p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <TbShoppingCartCheck className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white px-5 py-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Reservations
              </p>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-lg font-semibold text-secondary/80">
                  <CountUp end={20} duration={1.5} />
                </p>
                <p className="text-primary/70 text-xs font-semibold">+2.54%</p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <HiMiniUser className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white px-5 py-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Items
              </p>

              <div className="flex items-center gap-3 mt-1">
                <p className=" ] text-lg font-semibold text-secondary/80">
                  <CountUp end={130} duration={1.5} />
                </p>
                <p className="text-red-500 text-xs font-semibold">-2.67%</p>
              </div>
            </div>

            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <SiCodechef className="text-3xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <CurrentOrders />
          <OrdersChart />
        </div>
        <div>
          <SalesAnalytics />
          <TopSalesItems />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
