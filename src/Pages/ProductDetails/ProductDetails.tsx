import { useEffect, useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { CiShare2, CiShop } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineLocalShipping, MdPayment } from "react-icons/md";
import { PiPackageFill, PiShuffleFill } from "react-icons/pi";
import { RiArrowGoBackFill, RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { RxMinus, RxPlus } from "react-icons/rx";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../Redux/features/cart/cartSlice";
import { useGetSingleProductsQuery } from "../../Redux/features/product/productApi";
import { addResentView } from "../../Redux/features/product/productSlice";
import { RootState } from "../../Redux/features/store";
import {
  addWishlist,
  removeWishlist,
} from "../../Redux/features/wishlist/wishlistSlice";
import LoaderSpinner from "../../Shared/LoaderSpinner";
import ProductDescription from "./ProductDescription";
import ProductReview from "./ProductReview";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishList.items);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const { data, error, isLoading } = useGetSingleProductsQuery(id);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const isWishlist = wishlist.find((item: any) => item.id === id);

  const handleAddToWishlist = () => {
    if (isWishlist) {
      toast.error(`Already in wishlist for ${product?.name}`);
      return;
    } else {
      toast.success(`Add to wishlist for ${product?.name}`);
      dispatch(addWishlist(product));
    }
  };
  useEffect(() => {
    if (data?.data) {
      setSelectedImageUrl(data.data.thumbnail);
      dispatch(addResentView(data.data));
    }
  }, [data]);

  useEffect(() => {
    const endDate = new Date("2025-06-31T23:59:59"); // Set your special offer end date here
    const interval = setInterval(() => {
      const now = new Date();
      const timeRemaining = endDate.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (error || !data?.data) {
    navigate(`/404`);
    return null; // Prevent further rendering after navigation
  }

  const product = data.data;

  const productSold =
    product.orderProducts?.length > 0
      ? product.orderProducts.reduce(
          (prev: any, orderProduct: any) => prev + orderProduct.quantity,
          0
        )
      : 0;
  const ratings = product.reviews || [];
  const totalRatings = ratings.length;

  // Calculate average rating
  const averageRating = totalRatings
    ? (
        ratings.reduce((acc: number, r: any) => acc + r.rating, 0) /
        totalRatings
      ).toFixed(1)
    : 0;

  const soldPercentage = Math.min((productSold / product.inventory) * 100, 100);
  // Handle adding item to the cart
  const handleAddToCart = () => {
    const cartData = {
      id: product.id,
      name: product.name,
      price: product.price * quantity,
      shopId: product.shop.id,
      thumbnail: product.thumbnail,
      quantity: quantity,
      stockQuantity: product.inventory,
    };
    dispatch(addToCart(cartData));
    setQuantity(1);
  };

  // Handle adding item to the wishlist

  // Handle removing item from the wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeWishlist(product.id));
    toast.success(`Removed from wishlist for ${product?.name}`);
  };

  return (
    <div className="fixed-w pb-14">
      {/* Product Image Details */}
      <div className="grid lg:grid-cols-8 pt-10 pb-14">
        {/* Product Images */}
        <div className="lg:col-span-3 p-4">
          <div className="border rounded-lg">
            <img
              src={selectedImageUrl}
              alt={product.name}
              className="object-cover w-full h-[400px] rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-3 p-4">
            {product?.images.map((image: string, i: any) => (
              <div
                key={i}
                className={`border rounded-lg size-[80px] ${
                  selectedImageUrl === image
                    ? "border-primary/70"
                    : "border-primary/10"
                }`}
              >
                <img
                  src={image}
                  onClick={() => setSelectedImageUrl(image)}
                  alt={product?.name}
                  className="object-cover h-full w-full rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 p-4">
          {/* Product Details */}
          <h2 className="font-bold text-3xl">{product.name}</h2>
          <div className="flex font-mono items-center gap-2 text-gray-400">
            <p className="text-[#ffcc00] relative top-[2px]">
              <Rating
                emptySymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
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
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                initialRating={+averageRating}
                readonly
              />
            </p>
            <p className="font-semibold text-primary">
              {averageRating}{" "}
              <span className="text-gray-400 font-normal">
                ({product?.reviews?.length})
              </span>
            </p>{" "}
            |
            <p className="text-gray-400">
              SKU: <span className="text-secondary font-semibold">EBDYCRP</span>
            </p>
          </div>
          <hr className="my-3" />
          <p className="text-secondary/80 text-sm">{product?.description}</p>
          <div className="flex items-center gap-3 my-5">
            <h3 className="font-sans font-bold text-xl flex items-center gap-1">
              <span className="text-primary"> ${product?.price}.00</span>
              <del className="font-sans font-semibold text-[10px] text-secondary/80">
                ${product?.price + 50}.00
              </del>
            </h3>
            <button className="bg-primary text-xs text-white px-3 py-2 font-semibold rounded hover:bg-primary/80 duration-150">
              Order on What'sApp
            </button>
          </div>
          <hr className="my-3" />
          <div className="bg-primary/10 p-3 rounded-lg text-[9px] flex gap-3 items-center">
            <p className="text-primary font-semibold">Special Offer:</p>
            <div className="flex gap-1 items-center font-sans">
              <div className="h-6 w-7 px-1 border-[1.5px] rounded border-primary flex justify-center items-center bg-white">
                {timeLeft.days}d
              </div>
              :
              <div className="h-6 w-7 border-[1.5px] rounded border-primary flex justify-center items-center bg-white">
                {timeLeft.hours}h
              </div>
              :
              <div className="h-6 w-7 border-[1.5px] rounded border-primary flex justify-center items-center bg-white">
                {timeLeft.minutes}m
              </div>
              :
              <div className="h-6 w-7 border-[1.5px] rounded border-primary flex justify-center items-center bg-white">
                {timeLeft.seconds}s
              </div>
            </div>
            <p className="text-secondary/80 font-semibold">
              Remain until the end of the offer
            </p>
          </div>
          <p className="flex items-center gap-2 my-4 font-semibold text-xs text-secondary/80">
            <div className="text-primary text-xs bg-white shadow-lg w-fit p-2 rounded-full">
              <BsLightningChargeFill />
            </div>
            Products are almost sold out
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs font-semibold text-secondary/80 mt-1">
            Available only :{" "}
            <span className="font-mono">{product?.inventory}</span>
          </p>
          <p className="text-secondary/80 my-2 text-sm font-semibold">
            Quantity:
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border-r h-full flex items-center border w-fit px-3 text-sm py-[6px] rounded-full gap-3">
                <RxMinus
                  className="hover:text-primary"
                  onClick={() =>
                    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0))
                  } // Ensure quantity doesn't go below 1
                />
                {quantity}
                <RxPlus
                  className="hover:text-primary"
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  } // Increment normally
                />
              </div>

              <button
                disabled={quantity === 0 || product?.inventory === 0}
                onClick={() => handleAddToCart()}
                className={` text-xs  px-3 py-2 font-semibold rounded  duration-150 flex items-center gap-1 
    ${
      quantity === 0 || product?.inventory === 0
        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
        : "bg-primary hover:bg-primary/80 text-white"
    }`}
              >
                <IoCartOutline className="text-base" />
                Add To Cart
              </button>
            </div>
            <div className="flex items-center gap-2">
              {isWishlist ? (
                <button
                  onClick={() => handleRemoveFromWishlist()}
                  className="bg-primary/10 text-primary hover:bg-primary/15 p-2 rounded-full"
                >
                  <RiHeart3Fill />
                </button>
              ) : (
                <button
                  disabled={quantity === 0 || product?.inventory === 0}
                  onClick={() => handleAddToWishlist()}
                  className={`p-2 rounded-full font-semibold   duration-150 flex items-center gap-1 
                    ${
                      quantity === 0 || product?.inventory === 0
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-primary/10 text-primary hover:bg-primary/15"
                    }`}
                >
                  <RiHeart3Line />
                </button>
              )}

              <button className="bg-primary/10 text-primary hover:bg-primary/15 p-2 rounded-full">
                <PiShuffleFill />
              </button>
              <button className="bg-primary/10 text-primary hover:bg-primary/15 p-2 rounded-full">
                <CiShare2 />
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 border rounded-lg">
          {/* Additional Details */}
          <div className="flex justify-center p-4">
            <div className="bg-primary rounded-full p-1">
              <div className="flex items-center gap-3 text-white font-semibold">
                <div className="flex items-center text-xs gap-1">
                  <div className="bg-white w-fit text-gray-500 rounded-full p-1 text-base">
                    <CiShop />
                  </div>
                  by {product?.shop?.name}
                </div>
                <Link
                  to={`/shop/${product?.shop?.id}`}
                  className="bg-white text-secondary/70 rounded-full py-1.5 px-3 text-xs"
                >
                  View Store
                </Link>
              </div>
            </div>
          </div>

          <div>
            {/* Features */}
            <div className="bg-primary/10 p-4 flex items-start gap-3 border-b">
              <div className="bg-white w-fit text-primary rounded-full p-2 text-lg">
                <MdOutlineLocalShipping />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-secondary/80">Fast Delevery</h4>
                <p className="text-secondary/60">
                  Lightning-fast shipping guaranted
                </p>
              </div>
            </div>
            <div className="bg-primary/10 p-4 flex items-start gap-3 border-b">
              <div className="bg-white w-fit text-primary rounded-full p-2 text-lg">
                <RiArrowGoBackFill />
              </div>

              <div className="text-xs">
                <h4 className="font-bold text-secondary/80">
                  {" "}
                  Free 90-day returns
                </h4>
                <p className="text-secondary/60">
                  Shop risk-free with easy returns.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 p-4 flex items-start gap-3 border-b">
              <div className="bg-white w-fit text-primary rounded-full p-2 text-lg">
                <IoIosCheckmarkCircle />
              </div>

              <div className="text-xs">
                <h4 className="font-bold text-secondary/80">
                  Pickup available at Shop location
                </h4>
                <p className="text-secondary/60">Usually ready in 24 hours</p>
              </div>
            </div>

            <div className="bg-primary/10 p-4 flex items-start gap-3 border-b">
              <div className="bg-white w-fit text-primary rounded-full p-2 text-lg">
                <MdPayment />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-secondary/80">Payment</h4>
                <p className="text-secondary/60">
                  Payment upon receipt of goods, Payment by card in the
                  department, Google Pay, Online card.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 p-4 flex items-start gap-3 border-b">
              <div className="bg-white w-fit text-primary rounded-full p-2 text-lg">
                <IoIosCheckmarkCircle />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-secondary/80">Warranty</h4>
                <p className="text-secondary/60">
                  The Consumer Protection Act does not provide for the return of
                  this product of proper quality.
                </p>
              </div>
            </div>
            <div className="bg-primary/10 p-4 flex items-start gap-3">
              <div className="bg-white w-fit text-primary rounded-full p-2 text-lg">
                <PiPackageFill />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-secondary/80">Packaging</h4>
                <p className="text-secondary/60">
                  Research & development value proposition graphical user
                  interface investor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Description and reviews */}
      <div className="border rounded-lg font-roboto">
        <div className="md:flex items-center justify-between gap-3 border-b p-4 space-y-3">
          {/* Tabs */}
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={() => setActiveTab(1)}
              className={`border rounded-full w-fit px-3 py-1 ${
                activeTab === 1
                  ? "border-primary bg-primary text-white"
                  : "border-secondary/60 bg-white text-secondary/60 hover:text-primary"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`border rounded-full w-fit px-3 py-1 ${
                activeTab === 2
                  ? "border-primary bg-primary text-white"
                  : "border-secondary/60 bg-white text-secondary/60  hover:text-primary"
              }`}
            >
              Reviews
            </button>
          </div>
          <div className=" cursor-pointer bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white duration-150 flex items-center gap-2 text-sm px-3 py-2 rounded-lg">
            <img
              src="https://wowtheme7.com/tailwind/marketpro/images/satisfaction-icon.png"
              alt=""
              className="size-5"
            />
            <h5 className="font-roboto">100% Satisfaction Guarnteed</h5>
          </div>
        </div>
        <div className="p-4">
          {activeTab === 1 && <ProductDescription product={product} />}
          {activeTab === 2 && <ProductReview product={product} />}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
