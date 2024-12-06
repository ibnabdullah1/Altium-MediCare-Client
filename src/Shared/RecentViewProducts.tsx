import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../Redux/features/store";

const RecentViewProducts = () => {
  const resentViewProduct = useSelector(
    (state: RootState) => state.resentViewProduct.items
  );

  return (
    <div className="rounded-lg bg-white lg:col-span-8 mt-4">
      <div className="flex justify-between items-center mb-3 border-b p-6">
        <h2 className="font-semibold">Recent View Products</h2>
        <Link
          to={"/dashboard/recent-view-products"}
          className="font-semibold hover:text-primary text-sm"
        >
          View All
        </Link>
      </div>
      <div className="px-6">
        <div className="max-w-screen-lg overflow-x-auto overflow-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left text-gray-600 w-[240px] text-xs font-semibold">
                  Item Name
                </th>
                <th className="py-3 text-left text-gray-600 text-xs font-semibold">
                  Item Price
                </th>
                <th className="py-3 text-left text-gray-600 text-xs font-semibold">
                  Total Quantity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {resentViewProduct &&
                resentViewProduct.slice(0, 4).map((product, i) => (
                  <tr key={i}>
                    <td className="py-3">
                      <Link
                        to={`/product-details/${product.id}`}
                        className="flex items-center gap-2"
                      >
                        <img
                          className="w-10 h-10 rounded-lg"
                          src={product?.thumbnail}
                          alt={product?.name}
                        />
                        <h3 className="text-[13px] hover:text-primary">
                          {product?.name}
                        </h3>
                      </Link>
                    </td>
                    <td className="py-3 text-left text-secondary/70 text-sm">
                      ${product?.price}
                    </td>
                    <td className="py-3 text-left text-secondary/90 text-sm font-medium">
                      {product?.inventory}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {resentViewProduct?.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No recent view products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentViewProducts;
