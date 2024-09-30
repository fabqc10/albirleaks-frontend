import React from "react";
import Banner3 from "../components/banner3";
import Image from "next/image";
import Banner4 from "../components/banner4";

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
          Bienvenido a AlbirLeaks, una plataforma diseñada para fomentar el crecimiento local y fortalecer la comunidad del Albir y sus alrededores. Aquí, puedes publicar trabajos, ofrecer tus habilidades y conectar con personas que necesitan ayuda en diversas tareas, desde mudanzas hasta el cuidado de personas mayores.
          </span>
        </div>
      </div>
      <div className="relative h-full w-full p-10 flex justify-center items-center">
        <div className="relative w-1/2 flex justify-center items-center text-center">
            <p className="mb-4">En AlbirLeaks, creemos en el poder del boca a boca y en la importancia de las conexiones locales. Queremos dar visibilidad a los trabajos y servicios que a menudo se comparten de manera informal, ayudando a que las personas encuentren la ayuda que necesitan de manera rápida y eficiente.</p>
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
      <Banner4 />
    </div>
  );
};

export default About;