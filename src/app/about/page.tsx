import React from "react";
import Banner3 from "../components/banner3";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <Banner3 />
      <div className="relative h-full w-full p-10 flex justify-center items-center">
        <div className="w-1/2 flex justify-center">
          <Image
            src={
              "https://alfas.es/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-04-at-10.38.23-4.jpeg"
            }
            alt="albir-logo"
            width={500}
            quality={100}
            height={10}
          />
        </div>

        <div className="relative w-1/2 flex justify-center items-center text-center">
          <span>
            Esta es una plataforma creada para dar más visibilidad a puestos de
            trabajo, encontrar ayuda si necesitas hacer una mudanza o cosas del
            hogar, colaborar y conectar en la zona del Albir y alrededores.
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;