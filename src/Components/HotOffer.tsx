import { useEffect, useState } from "react";
import HotOfferImage from "../assets/HotOffer.jpg";
import PrimaryButton from "../Shared/PrimaryButton";
import PrimaryLink from "../Shared/PrimaryLink";
const HotOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endDate: any = new Date("2024-12-25T00:00:00");
    const calculateTimeLeft = () => {
      const now: any = new Date();
      const difference = endDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#F2F6F7] p-6 py-20 font-josefin ">
      {" "}
      <div
        style={{
          backgroundImage: `url(${HotOfferImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="fixed-w"
      >
        <h1 className="text-lg md:text-2xl font-bold text-primary mb-4">
          Today's Hot Offer
        </h1>
        <h2 className="heading">
          Free Covid-19 Vaccine
          <br />
          Campaign Ticket{" "}
        </h2>
        <p className="text-sm md:text-lg text-secondary/80 md:w-[50%]  mb-6">
          Cur tantas regiones barbarorum obiit, tot maria transmist summo bono
          fruitur id est voluptate barbarorum
        </p>
        <div className="flex  space-x-4">
          {timeLeft.days > 200 ? (
            <div className="text-lg  font-semibold text-red-500">
              <p className="text-4xl font-bold">200+</p>
              <p className="text-lg text-secondary ">Days</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-1">
                <span className="md:text-3xl text-primary w-[40px] md:w-[60px] bg-white p-2 md:h-12 flex justify-center items-center">
                  {timeLeft.days}
                </span>
                <span className="md:text-lg text-secondary  uppercase">
                  Days
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="md:text-3xl text-primary w-[40px] md:w-[60px] bg-white p-2 md:h-12 flex justify-center items-center">
                  {timeLeft.hours}
                </span>
                <span className="md:text-lg text-secondary  uppercase">
                  Hrs
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="md:text-3xl text-primary w-[40px] md:w-[60px] bg-white p-2 md:h-12 flex justify-center items-center">
                  {timeLeft.minutes}
                </span>
                <span className="md:text-lg text-secondary  uppercase">
                  Mins
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="md:text-3xl text-primary w-[40px] md:w-[60px] bg-white p-2 md:h-12 flex justify-center items-center">
                  {timeLeft.seconds}
                </span>
                <span className="md:text-lg text-secondary  uppercase">
                  Secs
                </span>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-3 items-center justify-start mt-6">
          <PrimaryButton address={"/"} level={"Book Now"} />
          <PrimaryLink address={"/"} level={"Deal of The Day"} />
        </div>
      </div>
    </div>
  );
};

export default HotOffer;
