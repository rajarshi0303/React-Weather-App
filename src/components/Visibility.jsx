import React from "react";

export default function Visibility({ visibility }) {
  return (
    <div>
      <div className="p-4 overflow-hidden rounded-xl bg-gray-800/60">
        <h4 className=" text-gray-400 font-semibold text-lg">Visibility</h4>

        <div className="flex items-center justify-between mt-4">
          <svg
            className="w-7 h-7 sm:w-12 sm:h-12 text-gray-300"
            fill="currentColor"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 449 449"
            xmlSpace="preserve"
          >
            <path d="M224.1,128.7c-52.8,0-96,43.2-96,96s43.2,96,96,96s96-43.2,96-96S276.9,128.7,224.1,128.7z M224.1,304.7 c-44,0-80-36-80-80s36-80,80-80s80,36,80,80S268.1,304.7,224.1,304.7z"></path>{" "}
            <path d="M198.5,168.7c-3.6,1.6-6.4,3.6-8.8,5.2c-3.6,2.4-4.8,7.6-2.4,11.2c1.6,2.4,4,3.6,6.8,3.6c1.6,0,3.2-0.4,4.4-1.2 c2-1.6,4-2.8,6.4-3.6c4-1.6,6-6.4,4-10.4C207.3,168.7,202.5,166.7,198.5,168.7z"></path>{" "}
            <path d="M178.5,224.7c0-7.6,2-15.6,6.4-22.8c2-4,0.8-8.8-3.2-10.8s-8.8-0.8-10.8,3.2c-5.2,9.6-8,20.4-8,30.8 c0,15.2,4.8,28.8,14.4,39.6c1.6,2,4,2.8,6,2.8s3.6-0.8,5.2-2c3.2-2.8,3.6-8,0.8-11.2C182.1,245.9,178.5,235.9,178.5,224.7z"></path>{" "}
            <path d="M437.3,194.7c-92.4-99.2-172.8-114-212.8-114s-120.4,14.8-212.8,114c-15.6,16.8-15.6,43.2,0,59.6 c40,42.8,120.8,114,212.8,114c40,0,120.4-14.8,212.8-114C452.9,237.9,452.9,211.5,437.3,194.7z M425.3,243.5 c-91.2,98.4-170.8,109.2-200.8,109.2c-85.6,0-162.8-68.4-200.8-109.2c-10-10.4-10-27.2,0-38c91.2-98,170.8-108.8,200.8-108.8 s109.6,10.8,200.8,109.2C435.3,216.3,435.3,233.1,425.3,243.5z"></path>{" "}
          </svg>

          <h5 className="flex text-xl lg:text-4xl leading-none font-normal text-gray-300 dark:text-white">
            {visibility / 1000}
            <span className="lg:text-2xl self-end px-1">km</span>
          </h5>
        </div>
      </div>
    </div>
  );
}
