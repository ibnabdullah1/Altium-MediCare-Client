import { productsData } from "../../Data/productsData";
import FeaturedProductCard2 from "../Products/FeaturedProductCard2";

const TopSaleProducts = () => {
  return (
    <div className="pt-10 pb-20 font-josefin  mt-10 ">
      <div className="fixed-w">
        <h3 className="text-center heading my-6">Top Sales Products</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsData.slice(0, 9).map((product, i) => (
            <FeaturedProductCard2 key={i} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSaleProducts;
