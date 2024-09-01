"use client";

import { JobsContext } from "@/app/contexts/jobs.context";
import { useContext } from "react";
import JobCard from "../components/jobCard";

const Page = () => {
  const { jobs } = useContext(JobsContext);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2">
        {jobs.map((job) => (
          <div
            key={job.jobId}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
          >
            <JobCard job={job} showActions={false}/>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Page;
