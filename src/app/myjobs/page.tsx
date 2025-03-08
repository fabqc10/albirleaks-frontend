"use client";
import React, { useContext, useEffect } from "react";
import { JobsContext } from "../contexts/jobs.context";
import JobCard from "../components/jobCard";
import JobCreateForm from "../jobs/job-creare-form";

const MyJobsPage = () => {
  const { userJobs, getUserJobs, deleteJob } = useContext(JobsContext);

  useEffect(() => {
    getUserJobs();
  }, [getUserJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Mi Panel de Anuncios</h1>
            <p className="text-gray-600 mt-2">Gestiona tus anuncios de trabajo publicados</p>
          </div>
          <JobCreateForm />
        </div>

        {/* Stats Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">{userJobs.length}</span>
            <span className="text-gray-600">anuncios publicados</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Mis Anuncios</h2>
          </div>

          {userJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes anuncios publicados</h3>
              <p className="text-gray-600 mb-4">Comienza publicando tu primer anuncio de trabajo</p>
              <JobCreateForm />
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userJobs.map((job) => (
                  <div 
                    key={job.jobId} 
                    className="transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <JobCard 
                      job={job} 
                      onDelete={deleteJob}
                      showActions={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJobsPage;
