import { GiMountainCave } from "react-icons/gi";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { TfiHeartBroken } from "react-icons/tfi";
import HotOfferImage from "../assets/offerBanner4.jpg";
import PrimaryLink from "../Shared/PrimaryLink";
const ProductOffer = () => {
  return (
    <div className=" bg-[#F2F6F7] p-6 py-28 font-josefin">
      {" "}
      <div
        style={{
          backgroundImage: `url(${HotOfferImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="fixed-w grid grid-cols-1 lg:grid-cols-2"
      >
        <div></div>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-primary mb-4">
            N95 Facial Covering Mask
          </h1>
          <h2 className="font-bold text-secondary text-[25px] md:text-[40px] leading-[30px] md:leading-[50px] capitalize">
            Grade A Safety Masks For
            <br />
            Sale. Haurry Up!
          </h2>
          <p className="text-sm md:text-lg text-secondary/80   mb-6">
            Over 39,000 people work for us in more than 70 countries all over
            the This breadth of global coverage, combined with specialist
            services.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex gap-2 items-center">
              <div className="p-3 text-white text-2xl rounded-full bg-primary w-fit">
                <HiOutlineHomeModern />
              </div>
              <h4>Activated Carbon</h4>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-3 text-white text-2xl rounded-full bg-primary w-fit">
                <GiMountainCave />
              </div>
              <h4>Breathing Valve</h4>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-3 text-white text-2xl rounded-full bg-primary w-fit">
                <TfiHeartBroken />
              </div>
              <h4>6 Layer Filtration</h4>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-3 text-white text-2xl rounded-full bg-primary w-fit">
                <MdOutlineHealthAndSafety />
              </div>
              <h4>Rewashes & Reusable</h4>
            </div>
          </div>

          <PrimaryLink address={"/"} level={"View Products"} />
        </div>
      </div>
    </div>
  );
};

export default ProductOffer;
