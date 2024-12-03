import { BsEye } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { MdCompareArrows } from "react-icons/md";
import Rating from "react-rating";
import "./ProductCard.css";
const ProductCard = ({ thumbnail, title, price, originalPrice, discount }) => {
  return (
    <div className=" group relative pb-3 ">
      <div className=" overflow-hidden bg-[#F6F8FC] py-10 ">
        <img
          className=" 
          h-[280px] object-cover object-center w-full group-hover:scale-110 duration-700"
          src={thumbnail}
          alt=""
        />
      </div>
      <div className="hidden group-hover:flex duration-700 transition-all absolute top-1/3 left-1/2 transform -translate-x-1/2 shadow-lg animate-slideIn">
        <button className="bg-white border-r border-r-secondary/10  hover:text-white text-xl p-3 hover:bg-primary duration-300">
          <CiHeart />
        </button>
        <button className="bg-white border-r border-r-secondary/10 hover:text-white text-xl p-3 hover:bg-primary duration-300">
          <BsEye />
        </button>
        <button className="bg-white border-r border-r-secondary/10 hover:text-white text-xl p-3 hover:bg-primary duration-300">
          <FaCartShopping />
        </button>
        <button className="bg-white hover:text-white text-xl p-3 hover:bg-primary duration-300">
          <MdCompareArrows />
        </button>
      </div>
      <div className="absolute top-4 right-5 py-[2px] text-sm bg-primary w-14 text-center text-white font-josefin">
        -{discount}
      </div>

      <div className=" px-3 font-josefin">
        <h3 className="text-xl font-medium mt-2  ">{title}</h3>
        <div className="flex justify-between items-center w-full">
          <h4 className="text-base font-semibold  text-gray-800">
            ${price}.00{" "}
            <strike className="text-red">${originalPrice}.00</strike>{" "}
          </h4>
          <p className=" text-primary ">
            <Rating
              emptySymbol={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              }
              fullSymbol={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              initialRating={4.5}
              readonly
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;