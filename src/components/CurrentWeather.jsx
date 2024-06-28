import React from "react";

import moment from "moment";

export default function CurrentWeather({
  name,
  country,
  weather,
  timestamp,
  timezone,
  temp,
}) {
  // Extract the weather description and icon from the weather array
  const { description, icon } = weather[0];

  // Convert the timezone from seconds to minutes
  const timezoneInMinutes = timezone / 60;
  // Get the current local time
  const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
  // Get the current local date
  const currDate = moment().utcOffset(timezoneInMinutes).format("MMMM D, YYYY");

  return (
    <>
      <div className="block h-fit max-w-sm p-6 border rounded-lg shadow  bg-gray-900 border-gray-700 ">
        <h4 className="text-gray-400 font-semibold">Now</h4>

        <div className="grid grid-cols-2 justify-items-start items-center py  -2 pb-4">
          <h5 className="flex text-6xl font-semibold leading-none text-gray-300">
            {temp.toFixed()}
            <span className="pl-1 relative  text-xl self-start">o</span>
            <span className="text-2xl self-end">C</span>
          </h5>
          <img
            className="h-20"
            src={`public/weather_icons/${icon}.png`}
            alt=""
          />
        </div>

        <p className="font-normal text-gray-400 capitalize">{description}</p>

        <div className="mt-4 pt-2 border-t-2 border-t-gray-600">
          <button className="flex items-center py-2 text-gray-400 sm:text-base gap-x-3">
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"></path>
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              ></path>
            </svg>

            <span>{currDate} </span>
          </button>

          <button className="flex items-center py-2 text-gray-400 sm:text-base gap-x-3">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="capitalize">
              {name} ,{country}
            </span>
          </button>

          <button className="flex items-center py-2 text-gray-400 sm:text-base gap-x-3">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>{currTime}</span>
          </button>
        </div>
      </div>
    </>
  );
}
