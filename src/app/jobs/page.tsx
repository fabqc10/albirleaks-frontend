"use client";

import { JobsContext } from "@/app/contexts/jobs.context";
import { useContext, useState, useMemo } from "react";
import JobCard from "../components/jobCard";
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase } from 'react-icons/fi';

const JobsPage = () => {
  const { jobs } = useContext(JobsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredJobs = useMemo(() => jobs.filter(job =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  ), [jobs, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
       {/* Efecto de fondo */}
       <div className="fixed inset-0 bg-[url('/assets/grid.svg')] opacity-[0.05] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Oportunidad</span>
          </h1>
          <p className="text-lg text-gray-400">Explora los últimos anuncios en El Albir</p>
        </motion.div>

        {/* Barra de Búsqueda */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.6 }}
           className="mb-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <input
              type="search"
              placeholder="Buscar por puesto, empresa, ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {/* Aquí podrías añadir filtros más avanzados si los tienes */}
        </motion.div>

        {/* Listado de Trabajos */}
        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-500"
          >
            <FiBriefcase className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No se encontraron anuncios que coincidan con tu búsqueda.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.jobId} job={job} showActions={false}/> // showActions={false} para la vista pública
            ))}
          </div>
        )}
         {/* Podrías añadir paginación aquí si tienes muchos trabajos */}
      </div>
    </div>
  );
};

export default JobsPage;
