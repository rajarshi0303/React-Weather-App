import React from "react";

import { useAirPollution } from "../services/WeatherService";

export default function AirQuality({ coordinates }) {
  const { data, error, isLoading, isFetching } = useAirPollution(
    coordinates.lat,
    coordinates.lon
  );

  if (isLoading) {
    return <h1 className="text-2xl">Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <h1 className="text-2xl">Error</h1>;
  }

  const { components } = data.list[0];
  const { aqi } = data.list[0].main;
  //console.log(components);

  let aqiString;
  let bgColor;
  switch (aqi) {
    case 1:
      aqiString = "Good";
      bgColor = "bg-green-600";
      break;
    case 2:
      aqiString = "Fair";
      bgColor = "bg-yellow-600";
      break;
    case 3:
      aqiString = "Moderate";
      bgColor = "bg-orange-600";
      break;
    case 4:
      aqiString = "Poor";
      bgColor = "bg-red-600";
      break;
    case 5:
      aqiString = "Very Poor";
      bgColor = "bg-purple-600";
      break;
    default:
      aqiString = "Unknown";
      bgColor = "bg-gray-600";
  }
  return (
    <div>
      <div className="p-4 rounded-2xl bg-gray-800/60 ">
        <div className="flex justify-between">
          <h4 className=" text-gray-400 font-semibold text-lg">
            Air Quality Index
          </h4>
          <button
            className={`px-4 py-0.5 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${bgColor} rounded-xl`}
          >
            {aqiString}
          </button>
        </div>

        <div className="overflow-hidden rounded py-4">
          <div className="flex items-end justify-between flex-wrap">
            <svg
              className="w-7 h-7 sm:w-12 sm:h-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fafafa"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H10C11.6569 8 13 6.65685 13 5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M4 16H15C16.6569 16 18 17.3431 18 19C18 20.6569 16.6569 22 15 22C13.3431 22 12 20.6569 12 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <path
                d="M2 12H19C20.6569 12 22 10.6569 22 9C22 7.34315 20.6569 6 19 6C17.3431 6 16 7.34315 16 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </svg>
            <div className="px-4 text-center">
              <h4 className=" text-gray-300 font-semibold text-base mb-1 uppercase">
                PM25
              </h4>
              <h5 className="flex lg:text-3xl leading-none font-normal text-gray-300 dark:text-white">
                {components.pm2_5}
              </h5>
            </div>
            <div className="px-4 text-center">
              <h4 className=" text-gray-300 font-semibold text-base mb-1 uppercase">
                SO2
              </h4>
              <h5 className="flex lg:text-3xl leading-none font-normal text-gray-300 dark:text-white">
                {components.so2}
              </h5>
            </div>
            <div className="px-4 text-center">
              <h4 className=" text-gray-300 font-semibold text-base mb-1 uppercase">
                NO2
              </h4>
              <h5 className="flex lg:text-3xl leading-none font-normal text-gray-300 dark:text-white">
                {components.no2}
              </h5>
            </div>
            <div className="px-4 text-center">
              <h4 className=" text-gray-300 font-semibold text-base mb-1 uppercase">
                O3
              </h4>
              <h5 className="flex lg:text-3xl leading-none font-normal text-gray-300 dark:text-white">
                {components.o3}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
