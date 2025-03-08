"use client";

import { JobsContext } from "@/app/contexts/jobs.context";
import { useContext, useState } from "react";
import JobCard from "../components/jobCard";

const JobsPage = () => {
  const { jobs } = useContext(JobsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredJobs = jobs.filter(job => 
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tablón de Anuncios</h1>
          <p className="text-gray-600 mt-2">Explora las últimas oportunidades laborales en El Albir</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="search"
              placeholder="Buscar por título o descripción..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              <option value="recent">Más recientes</option>
              <option value="featured">Destacados</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mb-4 text-gray-400">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No se encontraron anuncios
            </h2>
            <p className="text-gray-600">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.jobId}
                className="transform hover:-translate-y-1 transition-all duration-200"
              >
                <JobCard job={job} showActions={false}/>
              </div>
            ))}
          </div>
        )}

        {/* Stats Bar */}
        <div className="mt-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{jobs.length}</p>
              <p className="text-gray-500 text-sm">Total Anuncios</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{filteredJobs.length}</p>
              <p className="text-gray-500 text-sm">Resultados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">24h</p>
              <p className="text-gray-500 text-sm">Últimas 24h</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">Local</p>
              <p className="text-gray-500 text-sm">El Albir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
