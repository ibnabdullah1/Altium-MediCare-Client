const FeaturedProductCard2 = ({ thumbnail, title, price, originalPrice }) => {
  return (
    <div className="flex items-center bg-white p-4 gap-3 hover:border-primary/30 border border-transparent transition-all duration-300 hover:drop-shadow-xl ">
      <img src={thumbnail} alt="" className="w-20" />
      <div>
        <h2 className="font-bold">{title}</h2>
        <p className="font-semibold text-primary">
          ${price}.00{" "}
          <span className="font-normal text-sm text-primary">
            <strike>${originalPrice}.00</strike>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FeaturedProductCard2;
