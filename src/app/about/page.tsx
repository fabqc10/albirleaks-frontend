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
      <div className="relative h-full w-full p-10 flex justify-center items-center">
        <div className="relative w-1/2 flex justify-center items-center text-center">
          <span>
            Da visibilidad más rapidamente a aquellos trabajos boca a boca y ayuda el crecimineto local.
          </span>
        </div>
        <div className="w-1/2 flex justify-center">
          <Image
            src={
              "https://cdn.pixabay.com/photo/2017/05/02/03/41/action-2277292_1280.jpg"
            }
            alt="collaboration"
            width={500}
            quality={100}
            height={10}
          />
          
        </div>
      </div>
    </div>
  );
};

export default About;