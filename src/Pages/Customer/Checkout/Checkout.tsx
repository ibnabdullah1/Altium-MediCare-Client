import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import ShopReviewModal from "../../../Modal/ShopReviewModal";
import { selectCurrentUser } from "../../../Redux/features/auth/authSlice";
import { RootState } from "../../../Redux/features/store";
import CashOnDelivery from "./CashOnDelivery";
import StripePayment from "./Stripe";
const stripePromise = loadStripe(
  import.meta.env.VITE_payment_Gateway_pk as string
);

const Checkout = () => {
  const [paymentMethod, setSelectPaymentMethod] = useState("CASH_ON_DELIVERY");
  const [updateShopReviewModal, setUpdateShopReviewModal] = useState(false);
  const { name, email }: any = useSelector(selectCurrentUser);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const price = cartItems.reduce((price, item) => price + item.price, 0);
  const allQuantity = cartItems.reduce(
    (quantity, item) => quantity + item?.quantity,
    0
  );
  const totalPrice = price * allQuantity;
  const handlePaymentMethodChange = (method: string) => {
    setSelectPaymentMethod(method);
  };
  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row px-10 ">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Progress
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Confirm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="px-4 pt-8">
          <p className="text-xl font-semibold">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {cartItems.length > 0 && (
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cartItems?.map((item): any => (
                <div className="flex  gap-3 rounded-lg bg-white">
                  <img
                    className="h-16 w-20 rounded-md border object-cover object-center"
                    src={item.thumbnail}
                    alt=""
                  />
                  <div className="flex w-full flex-col">
                    <p className="text-lg font-semibold text-secondary/80">
                      {item?.name}
                    </p>
                    <p className="text-lg text-primary font-semibold">
                      ${item?.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-lg font-semibold">Payment Methods</p>
          <div className="mt-5 grid gap-6">
            <div className="relative">
              <input
                checked={paymentMethod === "STRIPE"}
                onChange={() => handlePaymentMethodChange("STRIPE")}
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
              />
              <span className="peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border peer-checked:border-primary bg-white peer-checked:bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 rounded object-contain"
                  src="https://cdn.dribbble.com/users/920/screenshots/3031540/media/87dda1cf7011aae1f3d3272b74e2bb53.gif"
                  alt=""
                />

                <span className="mt-2 ml-3 font-semibold">Stripe</span>
              </label>
            </div>
            <div className="relative bg-white">
              <input
                checked={paymentMethod === "CASH_ON_DELIVERY"}
                onChange={() => handlePaymentMethodChange("CASH_ON_DELIVERY")}
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
              />
              <span className="peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border peer-checked:border-primary bg-white peer-checked:bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-20 object-cover"
                  src="https://support.techvill.org/public/addons/martvill/CashOnDelivery/preview.png"
                  alt=""
                />

                <span className="mt-2 font-semibold">Cash On Delivery</span>
              </label>
            </div>
          </div>
        </div>
        {paymentMethod === "STRIPE" && (
          <Elements stripe={stripePromise}>
            <StripePayment
              totalPrice={totalPrice}
              setUpdateShopReviewModal={setUpdateShopReviewModal}
              name={name}
              email={email}
            />
          </Elements>
        )}
        {paymentMethod === "CASH_ON_DELIVERY" && (
          <CashOnDelivery
            totalPrice={totalPrice}
            setUpdateShopReviewModal={setUpdateShopReviewModal}
            name={name}
            email={email}
          />
        )}
      </div>
      <ShopReviewModal
        updateShopReviewModal={updateShopReviewModal}
        setUpdateShopReviewModal={setUpdateShopReviewModal}
      />
    </>
  );
};

export default Checkout;
