import React from "react";
import Image from "next/image";

const AlbirLogo = () => {
  return (
    <Image
      src={"/assets/albirlogo.png"}
      alt="albir-logo"
      width={148}
      height={48}
    />
  );
};

export default AlbirLogo;
