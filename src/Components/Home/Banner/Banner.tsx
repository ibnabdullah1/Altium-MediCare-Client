import offerImage1 from "../../../assets/offerAds1.png";
import offerImage2 from "../../../assets/offerAds2.png";
const Banner = () => {
  return (
    <div className="fixed-w py-6">
      <div className="lg:grid grid-cols-7 gap-5 font-josefin ">
        <div
          style={{
            backgroundImage:
              "url('https://vicodin-demo.myshopify.com/cdn/shop/files/71.jpg?v=1678248205')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="col-span-4 flex items-center px-5 md:px-10 lg:py-0 py-20 md:py-32 mb-5 lg:mb-0"
        >
          <div className="md:space-y-5 space-y-3 ">
            <h4 className="font-semibold text-primary text-lg md:text-xl">
              Welcome to our shop
            </h4>
            <h2 className="font-bold text-[30px] md:text-[40px] leading-[40px] md:leading-[50px] capitalize">
              Gold Standard <br />
              Pre-Workout
            </h2>
            <button className=" md:mt-5 px-6 py-2 text-center text-white bg-primary border border-primary  font-semibold hover:bg-transparent hover:text-primary duration-300">
              Shop now
            </button>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-1 gap-5">
          <div className="group pl-10 pt-10  bg-[#FDF8EC] flex justify-center">
            <div className="pb-10">
              <h2 className="font-bold text-[20px] md:text-[25px] leading-[30px] capitalize">
                First aid kits pre package
              </h2>
              <p className="font-semibold text-[#DCA367]">Starting at &16.99</p>
              <button className=" md:mt-5 px-6 py-2 text-center text-white bg-primary border border-primary  font-semibold hover:bg-transparent hover:text-primary duration-300">
                Shop now
              </button>
            </div>
            <div className=" w-[80%] relative overflow-hidden  ">
              <img
                src={offerImage1}
                alt=""
                className="w-auto h-[160px] group-hover:scale-110 absolute bottom-0 right-7 duration-500"
              />
            </div>
          </div>
          <div className="group p-10  bg-[#DEF3EE] flex justify-between items-center">
            <div className=" w-full">
              <img
                src={offerImage2}
                alt=""
                className="w-auto h-[160px] group-hover:scale-125  duration-500"
              />
            </div>

            <div className="w-full">
              <p className="font-semibold text-primary">Hot product</p>
              <h2 className="font-bold text-[20px] md:text-[25px] leading-[30px] capitalize">
                Hand Sanitizer package
              </h2>
              <p className="font-semibold text-[#DCA367]">
                $199.00/<sub>60%</sub>
              </p>
              <button className=" md:mt-5 px-6 py-2 text-center text-white bg-primary border border-primary  font-semibold hover:bg-transparent hover:text-primary duration-300">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
