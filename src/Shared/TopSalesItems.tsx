import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { topSalesItems } from "../Data/productsData";

const TopSalesItems = () => {
  const [active, setActive] = useState<"weekly" | "monthly">("weekly");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="rounded bg-white lg:col-span-8 p-6 mt-4">
      <div className="lg:flex items-start justify-between gap-3">
        <h2 className="font-semibold">Most Popular Menu Items</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 text-sm py-1 rounded ${
              active === "weekly"
                ? "bg-primary text-white"
                : "bg-[rgb(10,154,115,0.1)] text-primary"
            }`}
            onClick={() => setActive("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 text-sm py-1 rounded ${
              active === "monthly"
                ? "bg-primary text-white"
                : "bg-[rgb(10,154,115,0.1)] text-primary"
            }`}
            onClick={() => setActive("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="pt-6">
        <div className="max-w-screen-lg overflow-x-auto overflow-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left text-gray-600 w-[240px] text-xs font-medium">
                  Menu Item Name
                </th>
                <th className="py-3 text-left text-gray-600 text-xs font-medium">
                  Item Price
                </th>
                <th className="py-3 text-right text-gray-600 text-xs font-medium">
                  Total Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Skeleton circle={true} height={40} width={40} />
                          <Skeleton width={120} />
                        </div>
                      </td>
                      <td className="py-3 text-left text-secondary/70 text-sm">
                        <Skeleton width={50} />
                      </td>
                      <td className="py-3 text-right text-secondary/90 text-sm font-medium">
                        <Skeleton width={50} />
                      </td>
                    </tr>
                  ))
                : topSalesItems
                    .slice(0, 4)
                    .map(({ itemName, price, totalRevenue, image }, i) => (
                      <tr key={i}>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <img
                              className="w-10 h-10"
                              src={image}
                              alt={itemName}
                            />
                            <h3 className="text-[13px]">
                              {itemName.length > 25
                                ? itemName.slice(0, 20) + "..."
                                : itemName}
                            </h3>
                          </div>
                        </td>
                        <td className="py-3 text-left text-secondary/70 text-sm">
                          {price}$
                        </td>
                        <td className="py-3 text-right text-secondary/90 text-sm font-medium">
                          {totalRevenue}$
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

export default TopSalesItems;
