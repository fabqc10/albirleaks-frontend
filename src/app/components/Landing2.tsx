'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiBriefcase, FiMapPin, FiTrendingUp, FiUsers, FiCheck } from 'react-icons/fi';

const Landing2 = () => {
  return (
    <div className="bg-white">
      {/* Hero Section con búsqueda prominente */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              El trabajo que buscas está en
              <span className="text-blue-600"> El Albir</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Miles de oportunidades laborales te esperan
            </p>

            {/* Barra de búsqueda destacada */}
            <div className="bg-white rounded-full shadow-xl p-2 flex items-center max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-4 px-4">
                <FiSearch className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="¿Qué trabajo estás buscando?"
                  className="w-full py-2 focus:outline-none text-lg"
                />
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
                Buscar
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-bold text-3xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Categorías Populares */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Explora por categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="relative p-8">
                  <category.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-blue-100 mb-6">{category.count} empleos disponibles</p>
                  <Link 
                    href={category.link}
                    className="inline-flex items-center text-white hover:underline"
                  >
                    Explorar categoría
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección para Empresas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                ¿Buscas talento para tu empresa?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Publica tus ofertas de trabajo y encuentra a los mejores profesionales de El Albir
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <Link 
                href="/myjobs"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg
                  mt-8 hover:bg-blue-700 transition-colors"
              >
                Publicar oferta
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8">
                {/* Aquí podrías agregar un formulario o más contenido */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Encuentra tu próxima oportunidad laboral hoy
          </h2>
          <Link 
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg
              font-semibold hover:bg-gray-100 transition-colors"
          >
            Comenzar ahora
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const stats = [
  { value: "2,000+", label: "Empleos activos" },
  { value: "500+", label: "Empresas" },
  { value: "10k+", label: "Candidatos" },
  { value: "97%", label: "Tasa de éxito" },
];

const categories = [
  {
    icon: FiBriefcase,
    title: "Hostelería",
    count: "150+",
    link: "/category/hosteleria"
  },
  {
    icon: FiUsers,
    title: "Atención al Cliente",
    count: "80+",
    link: "/category/atencion-cliente"
  },
  {
    icon: FiMapPin,
    title: "Turismo",
    count: "120+",
    link: "/category/turismo"
  }
];

const benefits = [
  "Acceso a una amplia base de candidatos locales",
  "Herramientas avanzadas de selección",
  "Publicación de ofertas ilimitadas",
  "Soporte personalizado"
];

export default Landing2; 