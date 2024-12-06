import { Alert } from "antd";
import CountUp from "react-countup";
import { HiMiniUser } from "react-icons/hi2";
import { MdLocalOffer } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import { TbShoppingCartCheck } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useGetVendorDashboardStatsQuery } from "../../../Redux/features/dashboard/dashboardApi";
import CurrentOrders from "../../../Shared/CurrentOrders";
import OrdersChart from "../../../Shared/OrdersChart";
import RecentViewProducts from "../../../Shared/RecentViewProducts";
import SalesAnalytics from "../../../Shared/SalesAnalytics ";
import Weather from "../../../Shared/Weather";
const VendorDashboard = () => {
  // Fetch the data using the hook
  const { data, error, isLoading } = useGetVendorDashboardStatsQuery(undefined);

  if (isLoading) {
    return;
  }

  if (error) {
    return <p>Error loading stats!</p>;
  }

  // Extract the stats from the API response
  const {
    isShop,
    message,
    totalProducts,
    totalRevenue,
    totalOrders,
    totalReviews,
    averageRating,
  } = data?.data || {};

  return (
    <div>
      {!isShop && (
        <Alert
          message={
            <>
              {message}{" "}
              <Link
                to="create-shop"
                className="text-blue-600 hover:underline font-semibold"
              >
                Create Shop
              </Link>
            </>
          }
          type="warning"
          showIcon
          closable
        />
      )}

      <Weather />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Revenue
              </p>
              <div className="flex items-center gap-1 mt-1">
                <p className="font-semibold text-secondary/70">
                  ${<CountUp end={totalRevenue || 0} duration={2.5} />}
                </p>

                <p className="text-primary/70 text-[10px] font-normal">
                  +3.67%
                </p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <MdLocalOffer className="text-lg" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Orders
              </p>
              <div className="flex items-center gap-1 mt-1">
                <p className="font-semibold text-secondary/80">
                  <CountUp end={totalOrders || 0} duration={2} />
                </p>
                <p className="text-red text-[10px]  font-normal">-2.67%</p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <TbShoppingCartCheck className="text-lg" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Products
              </p>
              <div className="flex items-center gap-1 mt-1">
                <p className="font-semibold text-secondary/80">
                  <CountUp end={totalProducts || 0} duration={2} />
                </p>
                <p className="text-primary/70 text-[10px] font-normal">
                  +2.54%
                </p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <HiMiniUser className="text-lg" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-secondary/70 text-sm font-medium">
                Total Reviews
              </p>

              <div className="flex items-center gap-1 mt-1">
                <p className="text-lg font-semibold text-secondary/80">
                  <CountUp end={totalReviews || 0} duration={2} />
                </p>
                <p className="text-green text-xs font-normal">
                  {averageRating ? `${averageRating.toFixed(2)}%` : "No Rating"}
                </p>
              </div>
            </div>

            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <SiCodechef className="text-lg" />
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
          <RecentViewProducts />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
