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

const CustomersMap = () => {
  const pinsData = [
    {
      name: "India",
      x: "69.5%",
      y: "48%",
      delay: 1,
    },
    {
      name: "Germany",
      x: "50%",
      y: "28%",
      delay: 2,
    },
    {
      name: "Singapore",
      x: "78%",
      y: "50%",
      delay: 3,
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

export default CustomersMap;
