import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoLocationOutline, IoLogoYoutube } from "react-icons/io5";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import logo from "../../assets/light-logo.png";
const Footer = () => {
  return (
    <>
      <div className="bg-secondary py-14">
        <div className="fixed-w lg:grid grid-cols-12 text-white gap-4 space-y-5">
          <div className="col-span-3 space-y-4">
            <Link to={"/"} className="flex  items-center gap-1 ">
              <img src={logo} alt="" className="size-10" />
              <h2 className="text-xl text-white font-bold font-josefin">
                Altium <span className="text-primary">MediCare</span>
              </h2>
            </Link>
            <p>
              Lorem Ipsum is simply dummy text of the and typesetting industry.
              Lorem Ipsum is dummy text of the printing.
            </p>
            <div className="flex items-center gap-2">
              <IoLocationOutline /> <p>Brooklyn, New York, United States</p>
            </div>

            <div className="flex items-center gap-2">
              <LiaPhoneVolumeSolid /> <a href="">+0123-456789</a>
            </div>

            <div className="flex items-center gap-2">
              <TfiEmail />
              <a href="">info@altium-medicine.com</a>
            </div>
            <div className="flex items-center gap-5">
              <Link to={"/"}>
                <FaFacebookF className="hover:text-primary duration-150" />
              </Link>
              <Link to={"/"}>
                <FaTwitter className="hover:text-primary duration-150" />
              </Link>
              <Link to={"/"}>
                <FaLinkedin className="hover:text-primary duration-150" />
              </Link>
              <Link to={"/"}>
                <IoLogoYoutube className="hover:text-primary duration-150" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 col-span-6">
            {/* Company Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 font-josefin">Company</h2>
              <ul className="list-none space-y-3">
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  About
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Blog
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  All Products
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Locations Map
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  FAQ
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Contact us
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 font-josefin">Services</h2>
              <ul className="list-none space-y-3">
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Order tracking
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Wish List
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Login
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  My account
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Terms & Conditions
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Promotional Offers
                </li>
              </ul>
            </div>

            {/* Customer Care Section */}
            <div>
              <h2 className="text-lg font-bold mb-2 font-josefin">
                Customer Care
              </h2>
              <ul className="list-none space-y-3">
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Login
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  My account
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Wish List
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Order tracking
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  FAQ
                </li>
                <li className="hover:text-primary duration-150 cursor-pointer hover:underline">
                  Contact us
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-3 space-y-10">
            {" "}
            <div className="space-y-5">
              <h2 className="text-lg font-bold mb-2 font-josefin">
                Newsletter
              </h2>{" "}
              <p>
                Subscribe to our weekly Newsletter and receive updates via
                email.
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  name=""
                  id=""
                  className="placeholder:text-sm px-3 py-4 bg-gray-50 placeholder:text-secondary text-secondary border-none outline-none focus:ring-0"
                  placeholder="Email"
                />
                <button className="px-3 py-4 bg-primary hover:bg-secondary text-white hover:text-primary duration-150">
                  <IoIosSend className="text-2xl" />
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 font-josefin">
                We Accept{" "}
              </h2>
              <img
                src="https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/icons/payment-4.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0c2528] text-white py-5">
        <div className="fixed-w md:flex justify-between items-center space-y-3">
          <p>All Rights Reserved @ Company 2024</p>
          <div className="font-josefin flex gap-5">
            <Link to={"/"} className="font-semibold hover:text-primary">
              Terms & Conditions
            </Link>{" "}
            <Link to={"/"} className="font-semibold hover:text-primary">
              Claim
            </Link>{" "}
            <Link to={"/"} className="font-semibold hover:text-primary">
              Privacy & Policy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
