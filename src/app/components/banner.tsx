import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="w-full h-96 bg-gray-300 flex items-center">
      <div className="w-1/2 p-8">
        <span>
          Whether you need help moving, delivering, shopping, or recycling, our app
          instantly connects you with thousands of helpers—everyday people with a
          car and the time to help you out.
        </span>
      </div>
      <div className="relative w-1/2 h-full">
        <Image
          src={"https://a.storyblok.com/f/198708/1037x875/4e391d1794/advertiser-with-stuff.png/m/460x0"}
          alt="albir-logo"
          layout="fill"
          quality={100}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Banner;