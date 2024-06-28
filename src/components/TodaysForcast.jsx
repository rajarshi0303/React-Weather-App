import React from "react";

import { useForecast } from "../services/WeatherService";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delay: 0.4,
      staggerChildren: 0.1, // Adjust the stagger delay as needed
      duration: 0.5, // Add duration
      ease: "easeOut", // Add easing
      when: "beforeChildren",
    },
  },
};

const cardVarient = {
  hidden: { opacity: 0, scale: 0.8 }, // Add y for a slight upward motion
  show: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.5, // Add duration
    ease: "easeOut", // Add easing
  },
};
export default function TodaysForcast({ coordinates, selectedDate }) {
  const { data, error, isLoading, isFetching, isSuccess } = useForecast(
    coordinates.lat,
    coordinates.lon
  );

  let filteredData = [];
  if (isSuccess && selectedDate) {
    const localDate = selectedDate;

    // Filter the data to include only the data points that match the current date
    filteredData = data.list.filter((item) => {
      const itemDate = new Date(item.dt_txt).toLocaleDateString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return itemDate === localDate;
    });
  }

  if (isLoading) {
    return <h1 className="text-2xl">Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <h1 className="text-2xl">Error</h1>;
  }

  return (
    <div>
      <div className="p-4 overflow-hidden border-2 border-gray-700 rounded-2xl bg-gray-800/60 ">
        <div className="pt-2 pb-4 px-1 flex items-center justify-between">
          <h4 className=" text-gray-400 font-semibold text-xl">
            Hourly Forecast
          </h4>
          <button className="text-gray-400 sm:text-base ">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 lg:grid-cols-8 gap-4 "
        >
          {filteredData.map((item, index) => (
            <motion.div key={index} variants={cardVarient}>
              <ForcastCard data={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ForcastCard({ data }) {
  // Extract the time from the dt_txt property
  const time = new Date(data.dt_txt).toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden rounded-xl bg-gray-800 p-4">
      <h4 className="text-gray-300 font-semibold text-base mb-1 uppercase">
        {time}
      </h4>
      <img
        className="h-12"
        src={`public/weather_icons/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      />
      <h5 className="mt-2 flex text-xl leading-none text-gray-300 dark:text-white">
        {data.main.temp.toFixed()}
        <span className="relative -top-1 text-xs self-start">o</span>
      </h5>
    </div>
  );
}
