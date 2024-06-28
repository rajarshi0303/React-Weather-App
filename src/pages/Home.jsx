import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";

import CurrentWeather from "../components/CurrentWeather";
import DaysForecast from "../components/DaysForecast";
import AirQuality from "../components/AirQuality";
import Timing from "../components/Timing";
import Humidity from "../components/Humidity";
import Pressure from "../components/Pressure";
import Visibility from "../components/Visibility";
import FeelsLike from "../components/FeelsLike";
import TodaysForcast from "../components/TodaysForcast";
import Navbar from "../components/Navbar";

import { useWeatherData } from "../services/WeatherService";

export default function Home() {
  const [latitude, setLatitude] = useState(21.17024);
  const [longitude, setLongitude] = useState(72.831062);
  const [selectedDate, setSelectedDate] = useState();
  const [currentLocation, setCurrentLocation] = useState(null);

  const { refetch, data, error, isLoading, isSuccess } = useWeatherData(
    latitude,
    longitude
  );

  useEffect(() => {
    if (data) {
      const { timezone } = data;
      const timezoneInMinutes = timezone / 60;
      const currentDate = moment()
        .utcOffset(timezoneInMinutes)
        .format("MM/DD/YYYY");
      setSelectedDate(currentDate);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [latitude, longitude, refetch]);

  if (isLoading) {
    return <h1 className="text-2xl">Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <h1 className="text-2xl">Error</h1>;
  }

  // Destructure the required data from the response object
  const {
    coord,
    name,
    weather,
    main: { temp, feels_like, pressure, humidity },
    visibility,
    wind: { speed },
    sys: { sunrise, sunset, country },
    dt: timestamp,
    timezone,
  } = data || {}; // Add a fallback to prevent errors when data is undefined

  const handleSearchCoordinates = (coordinates) => {
    const { lat, lon } = coordinates;
    setLatitude(lat);
    setLongitude(lon);
    // Update the state or perform other actions as needed
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setError("Error getting location: " + error.message);
      }
    );
  };
  return (
    <div>
      <section className="bg-gray-950">
        <div className="container px-4 lg:px-6 pb-12 mx-auto">
          <Navbar
            handleSearchCoordinates={handleSearchCoordinates}
            handleCurrentLocation={handleCurrentLocation}
          />
          <div className="grid grid-cols-1 mt-6 lg:grid-cols-4">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <CurrentWeather
                name={name}
                country={country}
                temp={temp}
                weather={weather}
                timestamp={timestamp}
                timezone={timezone}
              />
              <DaysForecast
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                coordinates={coord}
              />
            </div>

            <div className="mt-6 lg:mt-0 lg:mx-6 overflow-hidden rounded-lg  space-y-6 lg:col-span-3 lg:h-auto">
              <div className="border-2 border-gray-700 bg-gray-900 rounded-2xl">
                <h4 className="px-5 pt-6 text-gray-300 font-semibold text-xl">
                  Todays Highlight
                </h4>
                <div className="p-4 ">
                  <div className="grid lg:grid-cols-2 gap-4 ">
                    <AirQuality coordinates={coord} />
                    <Timing
                      sunrise={sunrise}
                      sunset={sunset}
                      timezone={timezone}
                    />
                  </div>
                </div>

                <div className="p-4 ">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Humidity humidity={humidity} />
                    <Pressure pressure={pressure} />
                    <Visibility visibility={visibility} />
                    <FeelsLike feelslike={feels_like} />
                  </div>
                </div>
              </div>

              <TodaysForcast selectedDate={selectedDate} coordinates={coord} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
