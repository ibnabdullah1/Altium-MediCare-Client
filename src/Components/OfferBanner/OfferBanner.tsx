import offerImage1 from "../../assets/OfferBanner1.jpg";
import offerImage2 from "../../assets/OfferBanner2.jpg";
import offerImage3 from "../../assets/OfferBanner3.jpg";

const OfferBanner = () => {
  return (
    <div className="fixed-w">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <OfferBannerCard
          image={offerImage1}
          title={"25% off in all products"}
        />
        <OfferBannerCard
          image={offerImage2}
          title={"25% off in all products"}
        />
        <OfferBannerCard
          image={offerImage3}
          title={"25% off in all products"}
        />
      </div>
    </div>
  );
};

export default OfferBanner;
const OfferBannerCard = ({ image, title }: any) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(30deg , rgba(0, 0, 0,0.05) 10%, rgba(0, 0, 0,0.07) 100%), url("${image}")`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" pb-16 pt-10 px-4"
    >
      <h2 className="font-semibold text-[20px] md:text-[28px] capitalize leading-9">
        {title}
      </h2>
      <button className=" md:mt-5 px-6 py-2 text-center text-white bg-primary border border-primary hover:border-white  font-semibold hover:bg-white hover:text-primary duration-300">
        Shop now
      </button>
    </div>
  );
};
