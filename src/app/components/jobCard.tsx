'use client'
import React from "react";
import JobUpdateForm from "../jobs/job-update-form";
import { FiMapPin, FiClock, FiTrash2, FiEdit, FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Job } from '../types/job.type';
import { Button } from '@nextui-org/react';

type JobCardProps = {
  job: Job;
  onDelete?: (jobId: string) => void;
  showActions?: boolean;
};

const JobCard = ({ job, onDelete, showActions = true }: JobCardProps) => {
  const { jobId, jobTitle, jobDescription, location, companyName, createdAt, isExpired } = job;

  const handleDelete = () => {
    if (onDelete && window.confirm(`¿Seguro que quieres eliminar el anuncio "${jobTitle}"?`)) {
      onDelete(jobId);
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <motion.div
      className={`relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden group transition-opacity duration-300 h-full flex flex-col ${isExpired ? 'opacity-60' : ''}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.02, shadow: 'lg', borderColor: 'rgb(209 213 219)' }}
      transition={{ type: 'spring', stiffness: 300, duration: 0.3 }}
      layout
    >
      <div className="relative z-10 flex flex-col flex-grow p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{jobTitle}</h2>
            <div className="flex items-center gap-1.5 text-sm text-blue-600 font-medium mt-1">
              <FiBriefcase className="w-4 h-4"/>
              <span>{companyName}</span>
            </div>
          </div>
          {isExpired && (
             <span className="flex-shrink-0 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">Expirado</span>
          )}
           {!isExpired && showActions && (
             <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Activo</span>
           )}
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
          {jobDescription}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-200 pt-3">
          <div className="flex items-center gap-1">
            <FiMapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {showActions && onDelete && (
           <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50">
             <JobUpdateForm job={job} />
             <Button
               isIconOnly
               color="danger"
               variant="light"
               onPress={handleDelete}
               aria-label="Eliminar Anuncio"
               className="hover:bg-red-100 text-red-600"
             >
               <FiTrash2 className="w-5 h-5" />
             </Button>
           </div>
       )}
    </motion.div>
  );
};

export default JobCard;
