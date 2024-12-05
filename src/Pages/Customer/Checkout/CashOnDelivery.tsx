import React, { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../../Redux/features/order/orderApi";
import { RootState } from "../../../Redux/features/store";

interface CashOnDeliveryProps {
  totalPrice: number;
  name: string;
  email: string;
}

const CashOnDelivery: React.FC<CashOnDeliveryProps> = ({
  totalPrice,
  name,
  email,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    // Retrieve form data
    const form = e.target;
    const address = form.address.value;

    // Group cart items by shopId
    const ordersByShop = cartItems.reduce((orders: any, item) => {
      const shopId = item.shopId;

      // Initialize an order for the shopId if it doesn't exist
      if (!orders[shopId]) {
        orders[shopId] = {
          shopId: shopId,
          address: address,
          products: [],
          totalAmount: 0,
          payment: {
            method: "CASH_ON_DELIVERY",
            status: "PENDING",
          },
        };
      }

      // Add item to the corresponding order
      orders[shopId].products.push({
        productId: item.id,
        quantity: item.quantity,
        totalAmount: item.price * item.quantity,
        shopId: item.shopId,
      });

      // Accumulate the totalAmount for the shop's order
      orders[shopId].totalAmount += item.price * item.quantity;

      return orders;
    }, {});

    // Iterate over the orders grouped by shopId
    for (const order of Object.values(ordersByShop)) {
      try {
        setLoading(true);
        // Sending order to the server
        const res = await createOrder(order).unwrap();
        if (res.status) {
          setLoading(false);
          toast.success(res.message);
        }
      } catch (err: any) {
        setLoading(false);
        toast.error(
          err?.data?.message || err?.message || "Something went wrong!"
        );
      }
    }
  };

  return (
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-semibold">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={email}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
              required
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Your Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
              required
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Your Address
          </label>
          <div className="relative">
            <input
              type="text"
              id="address"
              name="address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your address"
              required
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">${totalPrice}.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">$50.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            ${totalPrice + 50}.00
          </p>
        </div>
        <button
          type="submit"
          className="bg-primary w-full mt-3 px-8 transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase"
          disabled={loading}
        >
          {loading ? (
            <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
          ) : (
            "Place Order"
          )}
        </button>
      </form>
    </div>
  );
};

export default CashOnDelivery;
