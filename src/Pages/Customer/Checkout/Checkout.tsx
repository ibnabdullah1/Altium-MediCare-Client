import { useState } from "react";

import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { districts } from "../../../Data/productsData";
import { selectCurrentUser } from "../../../Redux/features/auth/authSlice";
import { RootState } from "../../../Redux/features/store";
import { District, FormData } from "../../../types/types";

const Checkout = () => {
  const { name, email }: any = useSelector(selectCurrentUser);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState();
  const [formData, setFormData] = useState<FormData>({
    name: name ? name : "",
    address: "",
    division: "",
    district: "",
    subDistrict: "",
    phone: "",
  });

  const [availableDistricts, setAvailableDistricts] = useState<District[]>([]);
  const [availableUpazilas, setAvailableUpazilas] = useState<string[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const total =
    cartItems.reduce(
      (acc: any, item: any) => acc + item.price * item.quantity,
      0
    ) + 5;
  const orderId = (Math.random() + 1).toString(36).substring(2);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    if (name === "division") {
      setAvailableDistricts(districts[value] || []);
      setFormData((prev: any) => ({
        ...prev,
        district: "",
        subDistrict: "",
      }));
      setAvailableUpazilas([]);
    }

    if (name === "district") {
      const selectedDistrict = availableDistricts.find((d) => d.name === value);
      setAvailableUpazilas(selectedDistrict ? selectedDistrict.upazilas : []);
      setFormData((prev: any) => ({ ...prev, subDistrict: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length > 0) {
      const orderData = {
        ...formData,
        cartItems,
        email: email,
        status: "shipping",
        total,
        orderId,
        paymentMethod: "Cash On Delivery",
      };
      console.log(orderData);
    } else {
      toast.error("Your cart is Empty");
    }
  };

  return (
    <div className="rounded-lg pb-20 bg-white">
      <div className="border-b p-5">
        <h2 className=" text-md md:text-2xl font-semibold font-josefin">
          Shipping Address :
        </h2>
      </div>
      <form className="w-full px-5 pt-10" onSubmit={handleSubmit}>
        {/* Name and Price */}
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border py-2 px-3"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-400 mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                disabled
                className="w-full rounded-lg border py-2 px-3"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 mb-1">
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border py-2 px-3"
              required
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <h3 className=" text-md md:text-xl font-semibold text-gray-700 mb-2">
            Total Cost:{" "}
            <span className="text-primary">
              ${cartItems.length === 0 ? "0" : total}.00
            </span>
          </h3>
          <button
            type="submit"
            disabled={cartItems.length === 0}
            className={`${
              cartItems.length === 0
                ? "bg-gray-300 text-gray-400 px-4 py-2 rounded-lg "
                : "bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            } `}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
