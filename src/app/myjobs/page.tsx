"use client";

import React, { useContext, useEffect } from 'react'
import { JobsContext } from '../contexts/jobs.context'
import JobCard from '../components/jobCard';

const page = () => {
const {userJobs,getUserJobs,error} = useContext(JobsContext);

useEffect(() => {
    getUserJobs();
  }, [getUserJobs]);

  
  return (
    <div className="container mx-auto p-4">
      {userJobs.length === 0 ? (
        <h1 className="text-center text-xl font-bold">You have no jobs posted</h1>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {userJobs.map((job) => (
            <div key={job.jobId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                    <h1 className="text-center text-xl font-bold">MY JOBS</h1>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default page