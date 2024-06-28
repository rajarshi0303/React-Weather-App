import React, { useEffect } from "react";
import { useState } from "react";
import { useCityData } from "../services/WeatherService";

export default function Navbar({
  handleSearchCoordinates,
  handleCurrentLocation,
}) {
  const [searchInput, setSearchInput] = useState("");
  const { refetch, data, error, isLoading } = useCityData(searchInput);

  useEffect(() => {
    // Only proceed if searchInput is not empty or whitespace
    if (searchInput.trim() !== "") {
      const timer = setTimeout(() => {
        refetch();
      }, 500); // Delay of 500ms

      // Cleanup function to clear the timeout if searchInput changes before delay
      return () => clearTimeout(timer);
    }
  }, [searchInput, refetch]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div className="my-4 lg:mr-6 lg:grid grid-cols-3 items-center justify-between py-4 rounded-xl flex-wrap bg-gray-950 ">
        <div className="col-span-1">
          <div className="px-4 flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/src/assets/logo.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center col-span-2 mt-6 lg:mt-0">
          <div className="mt-0 relative w-full max-w-md rounded-lg ">
            <div className=" relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                className="block w-full p-2 ps-10 text-gray-300 border border-gray-600 rounded-lg bg-gray-800"
                placeholder="Search..."
              />
            </div>
            <div className="absolute flow-root bg-gray-800 mt-1 rounded-lg w-full z-10">
              <ul className="divide-y divide-gray-700">
                {data?.map((city, index) => (
                  <li
                    key={index}
                    className="px-6 py-3 hover:bg-gray-700 cursor-pointer"
                    onClick={() =>
                      handleSearchCoordinates({
                        lat: city.lat,
                        lon: city.lon,
                      })
                    }
                  >
                    <div className="space-y-0.5 font-medium text-white text-left rtl:text-right ms-3">
                      <div>{city.name}</div>
                      <div className="flex items-center text-gray-400 ">
                        <svg
                          className="w-5 h-5 "
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
                            d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                          />
                        </svg>
                        <span className="px-1">
                          {city.state} , {city.country}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={handleCurrentLocation}
            className="mx-2 lg:mx-4 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize  bg-indigo-700 rounded-lg lg:rounded-full "
          >
            <svg
              className="w-6 h-6 text-gray-300 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M19 12H21M12 19C8.13401 19 5 15.866 5 12M12 19V21M5 12C5 8.13401 8.13401 5 12 5M5 12H3M12 5V3M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </svg>

            <span className="mx-1 hidden lg:block">Current Location</span>
          </button>
        </div>
      </div>
    </div>
  );
}
