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
  const [isHoveringVisual, setIsHoveringVisual] = useState(false);

  // Definir nodos (posiciones relativas en viewBox 0-100)
  const nodes = [
    { id: 'center', cx: 50, cy: 50, r: 5 }, // Nodo central
    { id: 'n1', cx: 20, cy: 30, r: 3 },
    { id: 'n2', cx: 80, cy: 40, r: 3 },
    { id: 'n3', cx: 30, cy: 75, r: 3 },
    { id: 'n4', cx: 70, cy: 80, r: 3 },
    { id: 'n5', cx: 50, cy: 15, r: 3 },
    { id: 'n6', cx: 90, cy: 65, r: 3 },
  ];

  // Definir conexiones [fromId, toId]
  const connections = [
    ['center', 'n1'], ['center', 'n2'], ['center', 'n3'], ['center', 'n4'], ['center', 'n5'],
    ['n1', 'n3'], ['n2', 'n6'], ['n4', 'n6'], ['n5', 'n2']
  ];

  const getNodePos = (id: string) => nodes.find(n => n.id === id);

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

            {/* --- INICIO: Nuevo Visual "Red de Oportunidades en Expansión" --- */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative h-[450px] max-w-lg mx-auto lg:mx-0"
              onMouseEnter={() => setIsHoveringVisual(true)}
              onMouseLeave={() => setIsHoveringVisual(false)}
            >
              <div className="absolute inset-0 bg-gray-50 rounded-3xl border border-gray-200/80 overflow-hidden shadow-lg p-4">
                 <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="lineFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                          <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                      </filter>
                    </defs>

                    {connections.map(([fromId, toId], i) => {
                      const fromNode = getNodePos(fromId);
                      const toNode = getNodePos(toId);
                      if (!fromNode || !toNode) return null;

                      const pathLength = Math.hypot(toNode.cx - fromNode.cx, toNode.cy - fromNode.cy);

                      return (
                        <motion.line
                          key={`line-${i}`}
                          x1={fromNode.cx} y1={fromNode.cy}
                          x2={toNode.cx} y2={toNode.cy}
                          stroke="url(#lineFlowGradient)"
                          strokeWidth="0.7"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, pathOffset: pathLength }}
                          animate={{ pathLength: pathLength, pathOffset: 0 }}
                          transition={{
                            pathLength: { delay: 0.5 + i * 0.1, duration: 1, ease: "easeInOut" },
                            pathOffset: { delay: 0.5 + i * 0.1, duration: 1, ease: "easeInOut" },
                          }}
                        />
                      );
                    })}

                    {nodes.map((node, i) => {
                      // Genera offsets aleatorios pequeños para el movimiento
                      const moveX = (Math.random() - 0.5) * 4; // Movimiento horizontal pequeño (-2 a +2)
                      const moveY = (Math.random() - 0.5) * 4; // Movimiento vertical pequeño (-2 a +2)
                      const duration = 4 + Math.random() * 4; // Duración aleatoria entre 4 y 8 segundos

                      return (
                        <motion.circle
                          key={node.id}
                          cx={node.cx} cy={node.cy} r={node.r}
                          fill={node.id === 'center' ? "rgba(96, 165, 250, 0.6)" : "rgba(192, 132, 252, 0.5)"}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 0.8,
                            // --- INICIO: Animación de Movimiento (solo para nodos satélite) ---
                            x: node.id !== 'center' ? [0, moveX, 0] : 0, // Mueve en X si no es el centro
                            y: node.id !== 'center' ? [0, moveY, 0] : 0, // Mueve en Y si no es el centro
                            // --- FIN: Animación de Movimiento ---
                          }}
                          transition={{
                            scale: { delay: 0.8 + i * 0.05, duration: 0.5, type: 'spring', stiffness: 150 },
                            opacity: { delay: 0.8 + i * 0.05, duration: 0.5 },
                            // --- INICIO: Transición para Movimiento ---
                            x: { // Transición para el movimiento en X
                                duration: duration,
                                repeat: Infinity,
                                repeatType: "mirror", // Va y vuelve
                                ease: "easeInOut"
                            },
                            y: { // Transición para el movimiento en Y
                                duration: duration * (0.8 + Math.random() * 0.4), // Ligeramente diferente a X
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: Math.random() * 1 // Delay aleatorio pequeño para desincronizar X e Y
                            }
                            // --- FIN: Transición para Movimiento ---
                          }}
                          whileHover={{ scale: 1.5, opacity: 1, filter: 'url(#glow)' }}
                        />
                      );
                    })}
                 </svg>
              </div>
            </motion.div>
            {/* --- FIN: Nuevo Visual --- */}


            {/* --- Contenido de Texto (sin cambios) --- */}
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
            {/* --- Fin Contenido de Texto --- */}
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