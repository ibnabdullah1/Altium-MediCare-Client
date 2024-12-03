import { productsData } from "../../Data/productsData";
import ProductCard from "../Products/ProductCard";

const TrendingProducts = () => {
  return (
    <div className="fixed-w">
      <div className="py-10 font-josefin ">
        <h3 className="text-center heading my-6">Trending Products</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsData.slice(0, 8).map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
