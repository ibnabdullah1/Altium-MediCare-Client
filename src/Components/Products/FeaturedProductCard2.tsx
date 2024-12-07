import { Link } from "react-router-dom";

const FeaturedProductCard2 = ({ thumbnail, name, price, id }: any) => {
  return (
    <div className="flex items-center rounded-lg bg-white p-4 gap-3 hover:border-primary/30 border border-transparent transition-all duration-300 hover:drop-shadow-xl hover:text-primary ">
      <img src={thumbnail} alt="" className="w-20" />
      <div>
        <Link to={`/product-details/${id}`} className="font-bold ">
          {name}
        </Link>
        <p className="font-semibold text-primary">
          ${price}.00{" "}
          <span className="font-normal text-sm text-primary">
            <del className="text-red">${price * 1.5}.00</del>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FeaturedProductCard2;
