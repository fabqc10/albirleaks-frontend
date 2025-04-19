"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { JobsContext } from "../contexts/jobs.context";
import JobCard from "../components/jobCard";
import JobCreateForm from "../jobs/job-creare-form";
import { motion } from 'framer-motion';
import { FiPlusCircle, FiArchive } from "react-icons/fi";

const MyJobsPage = () => {
  const { userJobs, getUserJobs, deleteJob } = useContext(JobsContext);

  useEffect(() => {
    getUserJobs();
  }, [getUserJobs]);

  const activeJobs = useMemo(() => userJobs.filter(job => !job.isExpired), [userJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="fixed inset-0 bg-[url('/assets/grid.svg')] opacity-[0.05] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Mis Anuncios</h1>
            <p className="text-gray-400 mt-1">Gestiona los trabajos que has publicado</p>
          </div>
          <JobCreateForm />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
        >
           <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
             <p className="text-sm text-gray-400 mb-1">Anuncios Activos</p>
             <p className="text-3xl font-bold text-green-400">{activeJobs.length}</p>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
             <p className="text-sm text-gray-400 mb-1">Total Publicados</p>
             <p className="text-3xl font-bold text-blue-400">{userJobs.length}</p>
           </div>
        </motion.div>

        {userJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20 text-gray-500 border border-white/10 rounded-xl bg-white/5"
          >
             <FiArchive className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="mb-6">Aún no has publicado ningún anuncio.</p>
             <JobCreateForm />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userJobs.map((job) => (
              <JobCard
                 key={job.jobId}
                 job={job}
                 onDelete={deleteJob}
                 showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobsPage;
