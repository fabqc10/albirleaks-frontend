'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiBriefcase, FiUsers, FiMap, FiArrowRight } from 'react-icons/fi';

const LandingPage = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        
        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 px-4 max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Encuentra trabajo en
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                El Albir
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              La plataforma que conecta el talento local con las mejores oportunidades laborales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-full 
                  text-lg font-medium hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Explorar trabajos
                <FiArrowRight className="ml-2" />
              </Link>
              <Link 
                href="/myjobs"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700/30 text-white 
                  rounded-full text-lg font-medium border-2 border-white/20 hover:bg-blue-700/50 
                  transition-all backdrop-blur-sm"
              >
                Publicar anuncio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir AlbirJobs?
            </h2>
            <p className="text-xl text-gray-600">
              Una plataforma diseñada pensando en la comunidad local
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-lg transition-all"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comienza tu búsqueda hoy
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Únete a la comunidad laboral más grande de El Albir
            </p>
            <Link 
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 
                rounded-full text-lg font-medium hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Crear cuenta gratuita
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: FiBriefcase,
    title: "Oportunidades Locales",
    description: "Encuentra trabajo cerca de ti, en tu propia comunidad."
  },
  {
    icon: FiUsers,
    title: "Conexión Directa",
    description: "Contacta directamente con empleadores y candidatos sin intermediarios."
  },
  {
    icon: FiMap,
    title: "100% El Albir",
    description: "Una plataforma exclusiva para nuestra comunidad local."
  }
];

export default LandingPage; 