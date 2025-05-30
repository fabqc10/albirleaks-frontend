import React from "react";

const Banner3 = () => {
  return (
    <div
      className=" w-full h-screen top-0 left-0 z-10 flex items-center justify-center"
      style={{
        backgroundImage: "url('https://alicanteout.com/wp-content/uploads/el-albir.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 bg-opacity-70 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Conecta,colabora y trabaja.</h1>
        <p className="text-lg text-gray-600">Encuentra trabajo, ofrece ayuda, y crea conexiones en el area del Albir y alrededores.</p>
      </div>
    </div>
  );
};

export default Banner3;