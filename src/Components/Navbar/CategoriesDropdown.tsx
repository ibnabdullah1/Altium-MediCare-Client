import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";

const CategoriesDropdown = () => {
  const [isShowCategories, setIsShowCategories] = useState(false);

  return (
    <div className="relative w-full lg:w-auto">
      <div
        onClick={() => setIsShowCategories(!isShowCategories)}
        className="bg-primary px-6 py-4 flex items-center cursor-pointer text-white justify-between gap-8 "
      >
        <span className="ml-1 flex items-center gap-2 text-white uppercase font-semibold tracking-wide">
          <FaBars className="text-sm" />
          Categories
        </span>
        <MdOutlineArrowDropDown
          className={`text-2xl transition-transform ${
            isShowCategories ? "rotate-180 duration-300" : "duration-300"
          }`}
        />
      </div>

      <div
        className={`absolute w-full left-0 top-full bg-white shadow-md divide-y divide-gray-300 transition-transform duration-300 ease-out max-h-screen overflow-y-auto ${
          isShowCategories
            ? "max-h-screen opacity-100 visible translate-y-0"
            : "max-h-0 opacity-0 invisible -translate-y-4"
        }`}
      >
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/stretcher.png?v=1679049588"
            alt="Hospital Stretchers"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Hospital Stretchers</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/defibrillator.png?v=1679049851"
            alt="Defibrillators"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Defibrillators</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/anesthesia.png?v=1679049851"
            alt="Anesthesia Machines"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Anesthesia Machines</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/personal-information.png?v=1679049851"
            alt="Patient Monitors"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Patient Monitors</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/medical-insurance.png?v=1679049851"
            alt="Sterilizers"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Sterilizers</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/ecg-monitor.png?v=1679050151"
            alt="EKG/ECG Machines"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">EKG/ECG Machines</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/surgical-table.png?v=1679050247"
            alt="Surgical Tables"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Surgical Tables</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/warmer.png?v=1679050342"
            alt="Blanket and Fluid Warmers"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Blanket and Fluid Warmers</span>
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-4 hover:bg-gray-100 hover:text-primary text-secondary hover:font-semibold duration-200 transition"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0255/6526/6006/files/robotic-surgery.png?v=1679050444"
            alt="Electrosurgical Units"
            className="w-6 h-6 object-contain"
          />
          <span className="ml-2 text-sm">Electrosurgical Units</span>
        </a>
      </div>
    </div>
  );
};

export default CategoriesDropdown;
