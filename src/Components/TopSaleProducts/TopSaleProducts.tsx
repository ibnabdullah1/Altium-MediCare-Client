import { useAllProductsQuery } from "../../Redux/features/product/productApi";
import LoaderSpinner from "../../Shared/LoaderSpinner";
import FeaturedProductCard2 from "../Products/FeaturedProductCard2";

const TopSaleProducts = () => {
  const { data, isLoading } = useAllProductsQuery(undefined);
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="pt-10 pb-20 font-josefin  mt-10 ">
      <div className="fixed-w">
        <h3 className="text-center heading my-6">Top Sales Products</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.slice(0, 9).map((product: any) => (
            <FeaturedProductCard2 key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSaleProducts;
