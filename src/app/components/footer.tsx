'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NewAlbirLogo from './NewAlbirLogo'; // Asegúrate que usa el logo correcto
import paths from '@/paths';
import { FiMail, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'; // Importa iconos necesarios

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      // Estilos para tema oscuro
      className="bg-black border-t border-white/10 text-gray-400 mt-auto py-12"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Layout en Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">

          {/* Columna 1: Logo, Descripción y Contacto */}
          <div className="space-y-4">
             {/* Logo y Nombre (texto blanco) */}
            <Link href={paths.home()} className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <NewAlbirLogo width={28} height={28} />
              <span className="text-lg font-semibold">AlbirJobs</span>
            </Link>
            {/* Descripción (texto gris claro) */}
            <p className="text-sm">Conectando oportunidades y talento local en El Albir.</p>
            {/* Email */}
            <div className="flex items-center gap-2 text-sm pt-2">
              <FiMail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {/* Enlace email (hover blanco) */}
              <a href="mailto:contacto@albirjobs.com" className="hover:text-white transition-colors break-all">
                contacto@albirjobs.com
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación Principal */}
          <div className="md:justify-self-center">
             {/* Título (blanco/gris muy claro) */}
            <h3 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-3">
              {/* Enlaces (hover blanco) */}
              <li><Link href={paths.home()} className="text-sm hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href={paths.about()} className="text-sm hover:text-white transition-colors">Sobre Nosotros</Link></li>
              <li><Link href={paths.jobs()} className="text-sm hover:text-white transition-colors">Buscar Empleo</Link></li>
              <li><Link href={paths.myjobs()} className="text-sm hover:text-white transition-colors">Mis Anuncios</Link></li>
            </ul>
          </div>

          {/* Columna 3: Enlaces Legales */}
          <div className="md:justify-self-center">
             {/* Título */}
            <h3 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {/* Enlaces */}
              <li><Link href="/privacy" className="text-sm hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/cookies" className="text-sm hover:text-white transition-colors">Política de Cookies</Link></li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className="lg:justify-self-end">
             {/* Título */}
            <h3 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider">Síguenos</h3>
            <div className="flex space-x-5">
               {/* Iconos (texto gris claro, hover blanco) */}
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FiFacebook className="w-5 h-5" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><FiTwitter className="w-5 h-5" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><FiInstagram className="w-5 h-5" /></a>
            </div>
          </div>

        </div>

        {/* Separador y Copyright */}
         {/* Borde blanco tenue, texto gris claro */}
        <div className="mt-10 pt-8 border-t border-white/10 text-center text-sm">
          <p>&copy; {currentYear} AlbirJobs. Todos los derechos reservados.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
