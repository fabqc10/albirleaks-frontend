import React from "react";
import JobUpdateForm from "../jobs/job-update-form";
import { FiMapPin, FiClock, FiTrash2 } from 'react-icons/fi';

type Job = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
  createdAt: string;
};

type JobCardProps = {
  job: Job;
  onDelete?: (jobId: string) => void;
  showActions?: boolean;
};

const JobCard = ({ job, onDelete, showActions = true }: JobCardProps) => {
  const { jobId, jobTitle, jobDescription, location, companyName, createdAt } = job;

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar este anuncio?")) {
      onDelete?.(jobId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 hover:line-clamp-none">
              {jobTitle}
            </h2>
            <p className="text-blue-600 font-medium mt-1">
              {companyName}
            </p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            Activo
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-3 line-clamp-3 hover:line-clamp-none">
          {jobDescription}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <FiMapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{createdAt}</span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
            <JobUpdateForm job={job} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
