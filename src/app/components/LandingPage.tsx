'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiSend, FiCheckCircle } from 'react-icons/fi';

// Componente simple para los pasos
const StepCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay }}
    className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-md"
  >
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="w-full overflow-x-hidden bg-white text-gray-900">
      {/* Hero Section - Layout Asimétrico */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Fondo con gradientes y elementos flotantes */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-300/30 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', delay: 3 }}
            className="absolute bottom-[-20%] right-[-15%] w-[50vw] h-[50vw] bg-purple-300/30 rounded-full blur-[130px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Contenido de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
              Trabajo y Ayuda
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                a tu alcance
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-xl">
              La forma más rápida y directa de encontrar oportunidades o publicar tus necesidades en El Albir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/jobs"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-full
                  text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30 hover:bg-blue-700"
              >
                <span className="relative">
                  Ver Anuncios
                  <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/myjobs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg
                  font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition-all"
              >
                Publicar Ahora
              </Link>
            </div>
          </motion.div>

          {/* Visual Animado (Placeholder - puede ser más complejo) */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="hidden lg:block relative h-[450px]"
          >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-3xl border border-gray-200 shadow-xl backdrop-blur-none">
                  <div className="absolute top-8 left-8 w-3/4 h-4 bg-gray-300/50 rounded"></div>
                  <div className="absolute top-16 left-8 w-1/2 h-3 bg-gray-300/30 rounded"></div>
                  <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80"></div>
              </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-100 to-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Así de Sencillo</h2>
            <p className="text-lg text-gray-600">Conecta con tu comunidad en 3 simples pasos.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              icon={FiSearch}
              title="1. Busca o Publica"
              description="Encuentra trabajos, servicios o ayuda cerca de ti, o publica tu necesidad en segundos."
              delay={0.1}
            />
            <StepCard
              icon={FiSend}
              title="2. Conecta Directo"
              description="Comunícate directamente con otros vecinos a través de la plataforma, sin intermediarios."
              delay={0.3}
            />
            <StepCard
              icon={FiCheckCircle}
              title="3. Resuelve y Colabora"
              description="Acuerda los detalles y completa el trabajo o la ayuda. ¡Fortalece El Albir!"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section Final (Puede ser similar a About o más simple) */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              ¿Listo para Conectar?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Únete a la red de vecinos de El Albir hoy mismo.
            </p>
            <Link
              href="/api/auth/signin"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600
                text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Crear Cuenta / Acceder
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 