import { useEffect, useState } from "react";
import { BsWind } from "react-icons/bs";
import { FiDroplet } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";
import weatherImage from "../assets/weather-bg.jpg";

const Weather = () => {
  const [dateTime, setDateTime] = useState({
    date: "",
    day: "",
    time: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const day = now.toLocaleDateString("en-US", { weekday: "long" });

      const dayNumber = now.getDate();
      const ordinalSuffix = (n: any) => {
        const s = ["th", "st", "nd", "rd"],
          v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
      };
      const date = `${now.toLocaleDateString("en-US", {
        month: "long",
      })} ${dayNumber}${ordinalSuffix(dayNumber)}, ${now.getFullYear()}`;

      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setDateTime({ date, day, time });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative rounded-md px-8 pt-2 pb-6 my-4 text-white text-sm"
      style={{
        backgroundImage: `url(${weatherImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 z-0 rounded-md "
        style={{ backgroundColor: "rgba(10,154,115, 0.6)" }}
      />
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <p className="text-xs my-2">Today</p>
          <p>{dateTime.day},</p>
          <p>{dateTime.date}</p>
          <p className="my-2">{dateTime.time}</p>

          <button className="flex items-center gap-1 bg-white text-secondary hover:text-primary px-3 py-1 rounded-full">
            See Details
            <MdArrowForwardIos />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="border-[1.3px] gap-1 text-xs border-white flex rounded-full items-center py-1 px-3 opacity-90">
            <TiWeatherCloudy />
            <span>Drizzling</span>
          </p>
          <h3 className="text-4xl font-medium my-3">
            31
            <sup className="text-xl font-normal -top-4">
              <sup className="text-xs -top-2">o</sup>C
            </sup>
          </h3>
          <p className="flex items-center gap-2 text-xs opacity-80">
            <span className="flex items-center ">
              <FiDroplet className="text-lg" />
              75%
            </span>
            <span className="flex items-center gap-1">
              <BsWind className="text-lg" />
              10km/h
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
