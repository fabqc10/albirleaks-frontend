'use client'
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiHeart, FiUsers, FiMapPin, FiBriefcase,
  FiRefreshCw,
  FiHome,
  FiTrash2,
  FiChevronDown,
  FiArrowDownCircle
} from 'react-icons/fi';
import { useAuth } from '../contexts/auth.context';

// Componente reutilizable para las tarjetas - VISUAL ACTUALIZADO
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <motion.div
    className="relative h-[380px] bg-white rounded-2xl border border-gray-200 shadow-lg p-8 overflow-hidden group"
    whileHover={{ scale: 1.03, zIndex: 10 }}
    transition={{ type: 'spring', stiffness: 300 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {/* Efecto hover gradiente */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Icono grande de fondo - MÁS GRANDE Y VISIBLE */}
    <Icon className="absolute z-0 -bottom-10 -right-10 w-40 h-40 text-gray-900/[0.02] transform group-hover:scale-115 group-hover:rotate-[-12deg] transition-transform duration-500 ease-out" />

    {/* Contenido principal */}
    <div className="relative z-10 flex flex-col h-full">
      <Icon className="w-10 h-10 text-blue-500 mb-6" />
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
      <Link href="#" className="inline-flex items-center text-sm text-blue-600 group-hover:text-blue-800 transition-colors mt-4 self-start">
        Saber más <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </motion.div>
);

// Datos para las tarjetas - TEXTO ACTUALIZADO
const featureItems = [
  {
    icon: FiBriefcase,
    title: "Conexión Laboral Directa", // Texto ligeramente ajustado
    description: "Publica ofertas o encuentra tu próximo empleo local. Conectamos talento y empresas directamente en El Albir, sin intermediarios." // Texto complementado
  },
  {
    icon: FiRefreshCw,
    title: "Impulso a la Economía Circular", // Texto ligeramente ajustado
    description: "Dale una nueva vida a tus objetos. Ofrece o encuentra artículos de segunda mano entre vecinos, reduciendo residuos y fomentando el consumo consciente." // Texto complementado
  },
  {
    icon: FiHome,
    title: "Fortaleciendo El Albir", // Texto ligeramente ajustado
    description: "Menos desplazamientos, más comunidad. Facilitamos servicios y tareas entre vecinos, creando una red de apoyo local más fuerte y sostenible." // Texto complementado
  },
  {
    icon: FiTrash2,
    title: "Gestión Sostenible de Residuos", // Texto ligeramente ajustado
    description: "Coordina fácilmente la recogida y el transporte de reciclaje o enseres al punto limpio. Una forma sencilla de contribuir a un Albir más limpio." // Texto complementado
  },
  // Puedes añadir más tarjetas aquí si quieres llegar a 6 como Apple
  // {
  //   icon: FiHeart,
  //   title: "Ayuda Vecinal",
  //   description: "Encuentra o ofrece ayuda para pequeñas tareas del día a día, fortaleciendo los lazos comunitarios."
  // },
  // {
  //   icon: FiUsers,
  //   title: "Red Profesional",
  //   description: "Conecta con otros profesionales y empresas locales para colaboraciones y networking."
  // },
];

const AboutPage = () => {
  const { login } = useAuth();
  const baseNodes = [
    { x: 50, y: 70 }, { x: 250, y: 50 }, { x: 150, y: 150 },
    { x: 70, y: 250 }, { x: 230, y: 240 }
  ];

  const connections = [
    [0, 2], [1, 2], [3, 2], [4, 2], [0, 4]
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringNetwork, setIsHoveringNetwork] = useState(false);
  const networkRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (networkRef.current) {
      const rect = networkRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-b from-gray-100 to-gray-200 px-6 py-24"
      >
        {/* <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10" /> */}
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
              Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Conexión</span> Local
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10">
              AlbirJobs es tu solución local cuando necesitas encontrar trabajo o ayuda en El Albir. Nuestra plataforma conecta en tiempo real a vecinos que buscan u ofrecen empleo, servicios o asistencia para tareas cotidianas.
            </p>
            <div className="flex justify-center gap-4 mb-20">
              <Link 
                href="/jobs"
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full
                  font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-blue-700 shadow-md"
              >
                <span className="relative">
                  Buscar Oportunidades
                  <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* --- Inicio: Flecha animada (Chevron) para scroll --- */}
        
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500"
            animate={{
              y: [0, 6, 0],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: 'loop',
              ease: "easeInOut"
            }}
          >
            <FiChevronDown className="w-10 h-10" />
          </motion.div>
          {/* --- Fin: Flecha animada para scroll --- */}

        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* --- Visual Element con Efecto Hover --- */}
            <motion.div
              ref={networkRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[450px] max-w-lg mx-auto lg:mx-0"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringNetwork(true)}
              onMouseLeave={() => setIsHoveringNetwork(false)}
            >
              {/* Contenedor principal */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
                {/* SVG para las líneas y nodos */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                  {/* Definir el gradiente para las líneas */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" /> {/* Azul */}
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0.6)" /> {/* Púrpura */}
                    </linearGradient>
                  </defs>

                  {/* Líneas de Conexión (animadas) */}
                  {connections.map((conn, i) => {
                    const p1 = baseNodes[conn[0]];
                    const p2 = baseNodes[conn[1]];
                    return (
                      <motion.line
                        key={`line-${i}`}
                        x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                        stroke="url(#lineGradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0.6, 0.3, 0.6] }}
                        transition={{
                          pathLength: { delay: i * 0.15 + 0.8, duration: 1, ease: "easeInOut" },
                          opacity: { delay: i * 0.15 + 1.8, duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      />
                    );
                  })}

                  {/* Nodos (con movimiento) */}
                  {baseNodes.map((point, i) => (
                    <motion.g
                      key={`node-group-${i}`}
                      initial={{ x: point.x, y: point.y }}
                      animate={{
                        x: [point.x, point.x + (Math.random() - 0.5) * 10, point.x],
                        y: [point.y, point.y + (Math.random() - 0.5) * 10, point.y],
                      }}
                      transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                      }}
                    >
                      <motion.circle
                        key={`node-circle-${i}`}
                        r="5"
                        fill="rgba(0, 0, 0, 0.05)"
                        stroke="rgba(0, 0, 0, 0.1)"
                        strokeWidth="1"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.5, type: 'spring', stiffness: 150, damping: 15 }}
                      >
                         {/* Brillo interno pulsante */}
                         <motion.circle
                           r="3"
                           fill="rgba(0, 0, 0, 0.3)"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: [0, 0.8, 0] }}
                           transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 + 1 }}
                         />
                      </motion.circle>
                    </motion.g>
                  ))}
                </svg>

                {/* Efecto Spotlight */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 0.04), transparent)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHoveringNetwork ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
            {/* --- Fin Visual Element --- */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-sm font-mono text-blue-600 mb-4 block">NUESTRA HISTORIA</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Una idea <span className="text-blue-600">simple</span>,<br/> un impacto <span className="text-purple-600">real</span>.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                AlbirJobs nació para tejer una red de apoyo local usando la tecnología. Queremos revolucionar cómo los vecinos de El Albir encuentran trabajo y se ayudan mutuamente.
              </p>
              <p className="text-lg text-gray-600">
                ¿Necesitas contratar personal? ¿Buscas ayuda para una mudanza? ¿Quieres ofrecer tus habilidades? Aquí conectas directamente con quien necesitas, con solo unos clics. Facilitamos la vida diaria de unos mientras creamos oportunidades para otros.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values / How it Works */}
      <section className="py-20 md:py-32 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Así Conectamos El Albir
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Una plataforma simple para encontrar y ofrecer trabajo o ayuda local.
            </motion.p>
        </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md text-center"
              >
                <value.icon className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section - CONTENIDO ACTUALIZADO */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Más que Empleo</h2>
            <p className="text-lg text-gray-600">Descubre cómo AlbirJobs fortalece nuestra comunidad</p>
          </motion.div>

          {/* Contenedor de la Cuadrícula */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featureItems.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section (Like Fast Facts) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {fastFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  {fact.value}
                </div>
                <p className="text-gray-600">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-to-t from-gray-100 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-2xl p-12 border border-gray-200 shadow-xl"
          >
             <div className="relative">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Únete a la Comunidad</h2>
              <p className="text-xl text-gray-600 mb-8">
                Forma parte de la red que está haciendo de El Albir un lugar aún mejor para vivir y trabajar.
              </p>
              <button
                onClick={login}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600
                  text-white rounded-full font-medium hover:opacity-90 transition-opacity transform hover:scale-105"
              >
                Crear mi Cuenta / Acceder
                <FiArrowRight className="ml-2" />
              </button>
             </div>
          </motion.div>
      </div>
      </section>
    </div>
  );
};

const coreValues = [
  {
    icon: FiMapPin,
    title: "Hiperlocal",
    description: "Todo sucede aquí, en El Albir. Conectamos vecinos con oportunidades y ayuda a la vuelta de la esquina."
  },
  {
    icon: FiUsers,
    title: "Conexión Directa",
    description: "Contacta y acuerda directamente con otros vecinos, sin intermediarios ni complicaciones."
  },
  {
    icon: FiBriefcase,
    title: "Oportunidades Mutuas",
    description: "Facilitamos que unos encuentren la ayuda o el trabajo que necesitan, y otros obtengan ingresos o experiencia."
  }
];

const fastFacts = [
  { value: "1000+", label: "Vecinos Conectados" },
  { value: "<5 min", label: "Tiempo para Publicar" },
  { value: "100%", label: "Enfoque en El Albir" },
];

export default AboutPage;