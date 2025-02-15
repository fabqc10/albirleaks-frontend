import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Sobre Nosotros</h3>
          <p>Somos una plataforma dedicada a conectar a la comunidad del Albir y alrededores, fomentando el crecimiento local y la colaboración.</p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Inicio</a></li>
            <li><a href="#" className="hover:underline">Servicios</a></li>
            <li><a href="#" className="hover:underline">Contacto</a></li>
            <li><a href="#" className="hover:underline">Política de Privacidad</a></li>
          </ul>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold mb-2">Contáctanos</h3>
          <p>Email: info@tuplataforma.com</p>
          <p>Teléfono: +34 123 456 789</p>
          <div className="flex justify-center md:justify-end space-x-4 mt-4">
            <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>© 2024 AlbirLeaks. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
