import React from "react";

import { useForecast } from "../services/WeatherService";

export default function DaysForecast({
  coordinates,
  selectedDate,
  setSelectedDate,
}) {
  const { data, error, isLoading, isFetching } = useForecast(
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

  // Group the data by day
  const dataByDay = data.list.reduce((acc, item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Select one data point from each day
  const dailyData = Object.values(dataByDay).map((items) => items[0]);

  return (
    <div>
      <div className="block max-w-sm p-4 border rounded-lg shadow bg-gray-900 border-gray-700 ">
        <h4 className="text-gray-400 font-semibold px-2 py-3 text-lg capitalize">
          Daily Forecast
        </h4>
        {dailyData.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              const date = new Date(item.dt_txt);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
              setSelectedDate(formattedDate);
            }}
            className={`p-2 grid grid-cols-2 justify-items-start items-center cursor-pointer rounded-xl  ${
              selectedDate ===
              new Date(item.dt_txt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
                ? "bg-gray-700"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            <div className="grid grid-cols-2 justify-items-start items-center">
              <img
                className="h-10"
                src={`public/weather_icons/${item.weather[0].icon}.png`}
                alt=""
              />
              <h5 className="px-0.5 flex text-xl font-semibold leading-none text-gray-300 ">
                {item.main.temp.toFixed()}
                <span className="pl-1 relative -top-1  text-sm self-start">
                  o
                </span>
                <span className="text-base self-end">C</span>
              </h5>
            </div>
            <div className="flex items-center justify-between w-full">
              <h4 className="text-gray-300 font-semibold ">
                {new Date(item.dt_txt).toLocaleDateString("en-us", {
                  day: "numeric",
                  month: "short",
                })}
              </h4>

              <h4 className="text-gray-300 font-semibold ">
                {new Date(item.dt_txt).toLocaleString("en-us", {
                  weekday: "short",
                })}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
