import { useAllProductsQuery } from "../../Redux/features/product/productApi";
import LoaderSpinner from "../../Shared/LoaderSpinner";
import ProductCard from "../Products/ProductCard";

const TrendingProducts = () => {
  const { data, isLoading } = useAllProductsQuery(undefined);
  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <div className="fixed-w">
      <div className="py-10 font-josefin ">
        <h3 className="text-center heading my-6">Trending Products</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.data?.slice(7, 15).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
