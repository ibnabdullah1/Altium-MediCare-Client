import { IoIosArrowDroprightCircle } from "react-icons/io";
import offerImage2 from "../../assets/offerAds2.png";
import { useAllProductsQuery } from "../../Redux/features/product/productApi";
import ProductCard from "../Products/ProductCard";
const FeaturedProducts = () => {
  const { data, error, isLoading } = useAllProductsQuery(undefined);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="fixed-w">
      <div className="py-10 font-josefin">
        <h3 className="text-center heading my-6">Featured Products</h3>
        <div className="lg:grid grid-cols-4 gap-4  w-full ">
          <div className="lg:col-span-1 w-full lg:flex-col flex-col md:flex-row flex lg:justify-start justify-center py-4 lg:py-0  gap-4">
            <div className="group px-5 py-10 mb-4 md:mb-0  bg-[#e0f4f7] space-y-5 h-fit">
              <div>
                <p className="font-semibold text-primary">-29% OFF</p>
                <h2 className="font-semibold text-[20px] md:text-[25px] leading-[30px] capitalize">
                  Antiseptie dry hand gel
                </h2>

                <button className=" mt-3 mb-4  border-primary  font-semibold  text-primary duration-300 flex items-center gap-1">
                  Buy Now <IoIosArrowDroprightCircle />
                </button>
              </div>
              <img
                src={offerImage2}
                alt=""
                className="w-auto ml-4 h-[160px] group-hover:scale-125  duration-1000"
              />
            </div>
            <div className="group px-5 py-10  bg-[#E6EFEE] space-y-5 h-fit">
              <div>
                <p className="font-semibold text-primary">-29% OFF</p>
                <h2 className="font-semibold text-[20px] md:text-[25px] leading-[30px] capitalize">
                  Antiseptie dry hand gel
                </h2>

                <button className=" mt-3 mb-4  border-primary  font-semibold  text-primary duration-300 flex items-center gap-1">
                  Buy Now <IoIosArrowDroprightCircle />
                </button>
              </div>
              <img
                src={offerImage2}
                alt=""
                className="w-auto ml-4 h-[160px] group-hover:scale-125  duration-1000"
              />
            </div>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.slice(0, 6).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
