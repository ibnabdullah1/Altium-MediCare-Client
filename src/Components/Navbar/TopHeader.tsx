import { AiOutlineTwitter } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { IoLogoTiktok } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

const TopHeader = () => {
  return (
    <div className=" lg:py-2 lg:border-b border-b-primary/40  ">
      <div className="hidden lg:flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-6">
          <p className="flex items-center gap-2 font-questrial font-semibold text-sm">
            <CiMail className="text-primary" />
            info@webmail.com
          </p>{" "}
          <p className="flex items-center gap-2 font-questrial font-semibold text-sm">
            <SlLocationPin className="text-primary" />
            15/A, Nest Tower, NYC
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GrFacebookOption className="text-gray-700 hover:text-primary duration-200 text-base" />
          <FaLinkedinIn className="text-gray-700 hover:text-primary duration-200 text-base" />
          <AiOutlineTwitter className="text-gray-700 hover:text-primary duration-200 text-base" />
          <IoLogoTiktok className="text-gray-700 hover:text-primary duration-200 text-base" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
