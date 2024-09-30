import React from 'react';
import Image from 'next/image';

const banner4 = () => {
  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Beneficios para la Comunidad</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Image
            src="https://cdn.pixabay.com/photo/2017/05/02/03/41/action-2277292_1280.jpg"
            alt="Crecimiento Local"
            width={300}
            height={300}
            className="mx-auto mb-4 rounded-lg"
          />
          <h3 className="text-xl font-semibold mb-2">Crecimiento Local</h3>
          <p>Fomentamos la empleabilidad y la colaboración local.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Image
            src="https://cdn.pixabay.com/photo/2016/11/29/09/32/meeting-1868728_1280.jpg"
            alt="Rapidez y Eficiencia"
            width={300}
            height={300}
            className="mx-auto mb-4 rounded-lg"
          />
          <h3 className="text-xl font-semibold mb-2">Rapidez y Eficiencia</h3>
          <p>Conexiones rápidas y eficientes.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Image
            src="https://cdn.pixabay.com/photo/2017/02/25/23/52/connections-2099068_1280.png"
            alt="Conexiones Significativas"
            width={300}
            height={300}
            className="mx-auto mb-4 rounded-lg"
          />
          <h3 className="text-xl font-semibold mb-2">Conexiones Significativas</h3>
          <p>Fortalecemos el tejido social del Albir.</p>
        </div>
      </div>
    </section>
  );
}

export default banner4;
