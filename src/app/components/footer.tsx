'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
// import AlbirLogo from './albirlogo'; // Comenta o elimina la importación antigua
import NewAlbirLogo from './NewAlbirLogo'; // Importa el nuevo logo SVG
import paths from '@/paths'; // Asegúrate que la ruta sea correcta
import { FiMail, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'; // Importa iconos necesarios

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }} // Un pequeño delay para que aparezca después del contenido
      className="bg-gray-50 border-t border-gray-200 text-gray-600 mt-auto py-12" // Estilos mejorados: más padding, color de texto base
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Layout en Grid para mejor estructura en pantallas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">

          {/* Columna 1: Logo, Descripción y Contacto */}
          <div className="space-y-4">
            <Link href={paths.home()} className="inline-flex items-center gap-2 text-gray-900 hover:opacity-80 transition-opacity">
              {/* Reemplaza AlbirLogo por NewAlbirLogo */}
              <NewAlbirLogo width={28} height={28} /> {/* Tamaño ligeramente menor para el footer */}
              <span className="text-lg font-semibold">AlbirJobs</span>
            </Link>
            <p className="text-sm">Conectando oportunidades y talento local en El Albir.</p>
            {/* Email añadido */}
            <div className="flex items-center gap-2 text-sm pt-2">
              <FiMail className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <a href="mailto:contacto@albirjobs.com" className="hover:text-gray-900 transition-colors break-all">
                contacto@albirjobs.com
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación Principal */}
          <div className="md:justify-self-center"> {/* Centrado en pantallas medianas */}
            <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-3">
              <li><Link href={paths.home()} className="text-sm hover:text-gray-900 transition-colors">Inicio</Link></li>
              <li><Link href={paths.about()} className="text-sm hover:text-gray-900 transition-colors">Sobre Nosotros</Link></li>
              <li><Link href={paths.jobs()} className="text-sm hover:text-gray-900 transition-colors">Buscar Empleo</Link></li>
              <li><Link href={paths.myjobs()} className="text-sm hover:text-gray-900 transition-colors">Mis Anuncios</Link></li>
              {/* Añade más enlaces si es necesario */}
            </ul>
          </div>

          {/* Columna 3: Enlaces Legales */}
          <div className="md:justify-self-center"> {/* Centrado en pantallas medianas */}
            <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {/* Crea estas páginas si no existen */}
              <li><Link href="/privacy" className="text-sm hover:text-gray-900 transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-gray-900 transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/cookies" className="text-sm hover:text-gray-900 transition-colors">Política de Cookies</Link></li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className="lg:justify-self-end"> {/* Alineado a la derecha en pantallas grandes */}
            <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">Síguenos</h3>
            {/* Iconos sociales */}
            <div className="flex space-x-5">
              {/* Reemplaza '#' con tus enlaces reales */}
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-gray-800 transition-colors"><FiFacebook className="w-5 h-5" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-gray-800 transition-colors"><FiTwitter className="w-5 h-5" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-gray-800 transition-colors"><FiInstagram className="w-5 h-5" /></a>
              {/* Añade más redes si es necesario */}
            </div>
          </div>

        </div>

        {/* Separador y Copyright */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-center text-sm">
          <p>&copy; {currentYear} AlbirJobs. Todos los derechos reservados.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
