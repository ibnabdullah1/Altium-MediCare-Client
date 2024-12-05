import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useUserOrderQuery } from "../Redux/features/order/orderApi";
import { formatDate } from "../utils/formatDate";
import { SHIPPING_STATUS } from "../utils/userRole";

const CurrentOrders = () => {
  const { data, error, isLoading } = useUserOrderQuery(undefined);
  return (
    <div className="bg-white text-secondary/80 mt-4 rounded">
      <div className="flex justify-between items-center mb-3 border-b p-6">
        <h1 className="font-semibold">Current Orders</h1>
        <Link
          to={"order-history"}
          className="font-semibold hover:text-primary text-sm"
        >
          View All
        </Link>
      </div>
      <div className="px-5 pb-6">
        <div className="max-w-screen-lg overflow-x-auto overflow-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary ">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left text-gray-600 font-semibold text-[13px] w-[120px]">
                  Shop Name
                </th>

                <th className="py-3 text-left text-gray-600 font-semibold text-[13px] w-[140px]">
                  Date/Time
                </th>
                <th className="py-3 text-center text-gray-600 font-semibold text-[13px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="py-3">
                        <Skeleton width={100} />
                      </td>
                      <td className="py-3">
                        <Skeleton width={70} />
                      </td>
                      <td className="py-3">
                        <Skeleton width={50} />
                      </td>
                      <td className="py-3">
                        <Skeleton width={80} />
                      </td>
                    </tr>
                  ))
                : data?.data
                    .slice(0, 6)
                    .map(({ shop, shippingStatus, createdAt, id }: any) => (
                      <tr key={id}>
                        <td className="py-3 text-left text-[13px] font-medium text-secondary/70">
                          {shop?.name}
                        </td>

                        <td className="py-3 text-left text-secondary/40 text-[13px]">
                          <p>{formatDate(createdAt)}</p>
                        </td>
                        <td className="py-3 w-[90px] text-center text-[13px]">
                          <span
                            className={`${
                              shippingStatus === SHIPPING_STATUS.DELIVERED
                                ? "bg-green px-2 text-white"
                                : shippingStatus === SHIPPING_STATUS.SHIPPED
                                ? "bg-primary px-2 text-white"
                                : shippingStatus === SHIPPING_STATUS.CANCELLED
                                ? "bg-red px-2 text-white"
                                : shippingStatus === SHIPPING_STATUS.PENDING
                                ? "bg-blue-600 px-2 text-white"
                                : ""
                            } py-1 text-xs rounded-full font-medium`}
                          >
                            {shippingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrentOrders;
