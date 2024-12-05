import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../../Redux/features/order/orderApi";
import { useAddPaymentMutation } from "../../../Redux/features/payment/paymentApi";
import { RootState } from "../../../Redux/features/store";

const StripePayment = ({ totalPrice, name, email }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [addPayment] = useAddPaymentMutation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    if (totalPrice > 0) {
      const fetchClientSecret = async () => {
        try {
          const res = await addPayment({ price: totalPrice }).unwrap();
          setClientSecret(res?.data?.clientSecret);
        } catch (err) {
          toast.error("Failed to initialize payment");
        }
      };
      fetchClientSecret();
    }
  }, [addPayment, totalPrice]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;

    if (!stripe || !elements || !clientSecret) {
      toast.error("Stripe is not initialized properly.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card details are missing.");
      return;
    }

    setIsProcessing(true);
    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: name || "Anonymous",
              email: email || "anonymous@example.com",
            },
          },
        }
      );

      if (error) {
        toast.error(error.message || "Payment failed.");
      } else if (paymentIntent?.status === "succeeded") {
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
                transactionId: paymentIntent.id,
                method: "STRIPE",
                status: "PAID",
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
        for (const order of Object.values(ordersByShop)) {
          try {
            setIsProcessing(true);
            // Sending order to the server
            const res = await createOrder(order).unwrap();
            if (res.status) {
              setIsProcessing(false);
              toast.success(res.message);
            }
          } catch (err: any) {
            setIsProcessing(false);
            toast.error(
              err?.data?.message || err?.message || "Something went wrong!"
            );
          }
        }
      }
    } catch (err) {
      toast.error("Unexpected error occurred during payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-semibold">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="mt-4 block text-sm font-medium">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
        />

        <label htmlFor="email" className="mt-4 block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={email}
          className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="email" className="mt-4 block text-sm font-medium">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter your address"
          className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-blue-500"
        />

        <label htmlFor="card" className="mt-4 block text-sm font-medium">
          Card Details
        </label>
        <div className="rounded-md bg-white border border-gray-200 px-4 py-[14px] shadow-sm">
          <CardElement />
        </div>
        <button
          type="submit"
          className="bg-primary px-8 mt-4 w-full transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white uppercase"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
          ) : (
            `Pay $${totalPrice}`
          )}
        </button>
      </form>
    </div>
  );
};

export default StripePayment;