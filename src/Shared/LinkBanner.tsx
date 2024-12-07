import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import LinkBannerImage from "../assets/linkBanner.jpg";
const LinkBanner = ({ subLocation, activeLocation, group }: any) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(30deg , rgba(255, 255, 255, 0.3) 10%, rgba(255, 255, 255, 0.3) 100%), url("${LinkBannerImage}")`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" bg-white h-[200px] "
    >
      <div className="fixed-w flex flex-col justify-center h-full ml-7">
        <h3 className="font-bold heading mb-5">{group ? group : "Home"}</h3>
        <div className="text-lg leading-tight  mb-4 flex items-center gap-2">
          <Link
            className="text-gray-700 hover:text-primary font-semibold cursor-pointer flex items-center gap-1"
            to={"/"}
          >
            <HiHome className="text-primary/90" />
            Home
          </Link>
          {subLocation && (
            <Link to={`/${subLocation.toLowerCase()}`}>/{subLocation}</Link>
          )}
          {activeLocation && (
            <span className="text-primary font-semibold cursor-pointer">
              / {activeLocation}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkBanner;
