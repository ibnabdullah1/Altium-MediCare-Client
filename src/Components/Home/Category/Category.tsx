import {
  AiFillFire,
  AiFillMedicineBox,
  AiOutlineSafetyCertificate,
} from "react-icons/ai";
import { BiSolidBong } from "react-icons/bi";
import {
  FaBoxTissue,
  FaNotesMedical,
  FaProcedures,
  FaPumpMedical,
  FaStethoscope,
  FaSyringe,
  FaTooth,
} from "react-icons/fa";
import { IoIosNutrition } from "react-icons/io";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const categories = [
  {
    href: "/collections/dental-item",
    icon: FaTooth,
    name: "Dental Items",
  },
  {
    href: "/collections/germs-pads",
    icon: FaProcedures,
    name: "Germ Pads",
  },
  {
    href: "/collections/germs-pads",
    icon: FaNotesMedical,
    name: "Best Deals",
  },
  {
    href: "/collections/accessories",
    icon: FaPumpMedical,
    name: "Medical Accessories",
  },
  {
    href: "/collections/accessories",
    icon: FaSyringe,
    name: "Medical Supplies",
  },
  {
    href: "/collections/accessories",
    icon: FaStethoscope,
    name: "Healthcare Tools",
  },
  {
    href: "/collections/accessories",
    icon: FaBoxTissue,
    name: "Germ Pads",
  },
  {
    href: "/collections/accessories",
    icon: BiSolidBong,
    name: "Medicine Caps",
  },
  {
    href: "/collections/medicine-boxes",
    icon: AiFillMedicineBox,
    name: "Medicine Boxes",
  },
  {
    href: "/collections/safety-products",
    icon: AiOutlineSafetyCertificate,
    name: "Safety Products",
  },
  {
    href: "/collections/health-supplements",
    icon: IoIosNutrition,
    name: "Health Supplements",
  },
  {
    href: "/collections/first-aid",
    icon: AiFillFire,
    name: "First Aid",
  },
  {
    href: "/collections/medical-equipment",
    icon: FaStethoscope,
    name: "Medical Equipment",
  },
];

const CategoryItem = ({ icon: Icon, name }: any) => (
  <Link to={"#"} className=" group cursor-pointer flex flex-col  items-center">
    <Icon className="text-[#8cb2b2] text-3xl group-hover:text-primary duration-200" />
    <h6 className="text-xs mt-3 font-josefin md:text-sm font-bold text-secondary group-hover:text-primary duration-200">
      {name}
    </h6>
  </Link>
);

export default function Reviews() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <Swiper
        freeMode={true}
        breakpoints={{
          400: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        autoplay={true}
        modules={[FreeMode, Pagination, Autoplay]}
      >
        <div>
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <CategoryItem
                key={index}
                href={category.href}
                icon={category.icon}
                name={category.name}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
