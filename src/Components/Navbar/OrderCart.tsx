import { Dialog, Transition } from "@headlessui/react";

import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { RxMinus, RxPlus } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  removeFromCart,
  updateQuantity,
} from "../../Redux/features/cart/cartSlice";
import { RootState } from "../../Redux/features/store";

const OrderCart = ({ open, setOpen }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#79C044",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        dispatch(removeFromCart(id));
      }
    });
  };

  const handleQuantityChange = (
    id: string,
    quantity: number,
    stockQuantity: number
  ) => {
    dispatch(updateQuantity({ id, quantity, stockQuantity }));
  };

  const total =
    cartItems.length > 0
      ? cartItems.reduce(
          (acc: any, item: any) => acc + item.price * item.quantity,
          0
        ) + 5
      : 0;
  const shippingCost = cartItems.length > 0 ? 10 : 0;

  const handleQuantityUp = (newQuantity: number, id: string) => {
    const item = cartItems.find((item: any) => item.id === id);
    if (item) {
      handleQuantityChange(id, newQuantity, item.stockQuantity);
    }
  };

  const handleQuantityDown = (newQuantity: number, id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && newQuantity >= 1) {
      handleQuantityChange(id, newQuantity, item.stockQuantity);
    } else {
      toast.error("Quantity cannot be less than 1.");
    }
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Use Dialog.Panel for overlay */}
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md font-sans">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 overflow-y-auto">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="flex justify-between items-center w-full border-b-2 border-primary/60 py-3 px-4">
                          <h4 className="text-lg md:text-xl font-semibold text-primary tracking-wide font-josefin">
                            Shopping Cart
                          </h4>
                          <button
                            type="button"
                            className=" hover:text-primary duration-200 bg-gray-100 rounded-full p-2 text-xl hover:bg-primary/20 text-secondary/60"
                            onClick={() => setOpen(false)}
                          >
                            <IoClose />
                          </button>
                        </Dialog.Title>
                      </div>

                      <div className="mt-8 px-4">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((product) => (
                              <li key={product.id} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-800">
                                      <h3 className="text-primary">
                                        {product.name}
                                      </h3>
                                      <p className="ml-4 text-primary">
                                        ${product.price * product.quantity}.00
                                      </p>
                                    </div>
                                  </div>

                                  <h3 className="text-sm">
                                    Stock: {product.stockQuantity}
                                  </h3>
                                  <div className="flex-1 flex items-start mt-3 justify-between text-sm">
                                    <div className="border w-[80px] md:w-[100px] h-8 flex items-center justify-between">
                                      <div className="border-r h-full px-1 flex items-center justify-center hover:bg-gray-100 duration-150">
                                        <RxMinus
                                          onClick={() =>
                                            handleQuantityDown(
                                              product.quantity - 1,
                                              product.id
                                            )
                                          }
                                        />
                                      </div>
                                      {product.quantity}
                                      <div className="border-l h-full px-1 flex items-center justify-center hover:bg-gray-100 duration-150">
                                        <RxPlus
                                          onClick={() =>
                                            handleQuantityUp(
                                              product.quantity + 1,
                                              product.id
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <button
                                        onClick={() => handleDelete(product.id)}
                                        className="font-medium tracking-wide text-teal-600 hover:text-teal-800 "
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-800">
                        <p>Shipping Cost</p>
                        <p>${shippingCost}.00</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-800">
                        <p>Subtotal</p>
                        <p>${total}.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          disabled={cartItems.length === 0}
                          onClick={() => {
                            setOpen(false);
                            navigate("/dashboard/checkout");
                          }}
                          className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/80"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="text-primary font-medium hover:text-primary/80"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default OrderCart;
