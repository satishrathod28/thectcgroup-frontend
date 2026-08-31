import React from "react";
import Image from "next/image";
import map from "@/images/map.svg";

const Pin = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="23"
      fill="none"
      viewBox="0 0 18 23"
    >
      <path
        fill="#0C76D8"
        d="M7.115 20.811c.606.5 1.238.957 1.885 1.403.648-.44 1.277-.908 1.885-1.403a28.01 28.01 0 0 0 2.853-2.699C15.782 15.877 18 12.637 18 9A9 9 0 0 0 0 9c0 3.637 2.218 6.876 4.262 9.112.887.966 1.84 1.867 2.853 2.699ZM9 12.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Z"
      />
    </svg>
  );
};

const ManufacturingMap = () => {
  // Coordinates are visually estimated against the provided map, adjusting for "top left" as anchor.
  const pinsData = [
    {
      name: "USA",
      x: "18.5%",
      y: "27%",
      delay: 1,
    },
    {
      name: "India",
      x: "70.5%",
      y: "45%",
      delay: 2,
    },
    {
      name: "China",
      x: "78%",
      y: "40%",
      delay: 3,
    },
    {
      name: "Singapore",
      x: "82%",
      y: "66%",
      delay: 4,
    },
    {
      name: "Germany",
      x: "55%",
      y: "25%",
      delay: 5,
    },
    {
      name: "Switzerland",
      x: "53.5%",
      y: "30%",
      delay: 6,
    },
    {
      name: "Italy",
      x: "56.7%",
      y: "32%",
      delay: 7,
    },
    {
      name: "Romania",
      x: "60%",
      y: "33%",
      delay: 8,
    },
    {
      name: "Philippines",
      x: "86.5%",
      y: "60%",
      delay: 9,
    },
    {
      name: "Vietnam",
      x: "80%",
      y: "56%",
      delay: 10,
    },
    {
      name: "Malaysia",
      x: "80.7%",
      y: "69.5%",
      delay: 11,
    },
    {
      name: "Thailand",
      x: "77.4%",
      y: "60%",
      delay: 12,
    },
    {
      name: "UAE",
      x: "66.5%",
      y: "49.5%",
      delay: 13,
    },
    {
      name: "Saudi Arabia",
      x: "63.5%",
      y: "51.5%",
      delay: 14,
    },
    {
      name: "Oman",
      x: "68.7%",
      y: "57%",
      delay: 15,
    },
    {
      name: "Qatar",
      x: "65.5%",
      y: "54%",
      delay: 16,
    },
    {
      name: "Israel",
      x: "61.8%",
      y: "47.1%",
      delay: 17,
    },
  ];
  return (
    <div className="world-map-container">
      <div className="world-map-img">
        <Image src={map} alt="map" />
      </div>
      <div className="map-pins">
        {pinsData?.map((pin, id) => {
          return (
            <div
              className={`map-pin`}
              style={{ "--x": pin?.x, "--y": pin?.y, "--delay": pin?.delay }}
              key={id}
            >
              <div className="pin-data">
                <h3>{pin?.name}</h3>
              </div>
              <Pin />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManufacturingMap;
