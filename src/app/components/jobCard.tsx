'use client'
import React from "react";
import JobUpdateForm from "../jobs/job-update-form";
import { FiMapPin, FiClock, FiTrash2, FiEdit, FiEye, FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Job = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
  createdAt: string;
  isExpired?: boolean;
};

type JobCardProps = {
  job: Job;
  onDelete?: (jobId: string) => void;
  showActions?: boolean;
};

const JobCard = ({ job, onDelete, showActions = true }: JobCardProps) => {
  const { jobId, jobTitle, jobDescription, location, companyName, createdAt, isExpired } = job;

  const handleDelete = () => {
    if (onDelete && confirm("¿Estás seguro de que quieres eliminar este anuncio?")) {
      onDelete(jobId);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 overflow-hidden group transition-all duration-300 h-full flex flex-col ${isExpired ? 'opacity-60' : ''}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.03, borderColor: 'rgba(255, 255, 255, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-white line-clamp-2">{jobTitle}</h2>
            <p className="text-sm text-blue-400 font-medium mt-1">{companyName}</p>
          </div>
          {isExpired && (
             <span className="flex-shrink-0 px-2 py-0.5 bg-red-500/20 text-red-300 text-xs rounded-full">Expirado</span>
          )}
           {!isExpired && showActions && (
             <span className="flex-shrink-0 px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full">Activo</span>
           )}
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {jobDescription}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-3">
          <div className="flex items-center gap-1">
            <FiMapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

         {showActions && onDelete && (
           <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
             <button
               onClick={handleDelete}
               className="flex items-center gap-1.5 px-3 py-1.5 text-red-400 hover:bg-red-500/20 rounded-md text-xs transition-colors"
               aria-label="Eliminar anuncio"
             >
               <FiTrash2 className="w-3.5 h-3.5" />
               <span>Eliminar</span>
             </button>
             <JobUpdateForm job={job} />
           </div>
         )}
      </div>
    </motion.div>
  );
};

export default JobCard;
