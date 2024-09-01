import React from "react";
import JobUpdateForm from "../jobs/job-update-form";

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
  const { jobId, jobTitle, jobDescription, location, companyName, createdAt } =
    job;

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this job?")) {
      console.log("JOB TO DELETE: " + jobId);
      onDelete?.(jobId); // Call onDelete only if it's provided
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900">{jobTitle}</h2>
        <p className="text-lg text-gray-700 mt-2">{companyName}</p>
        <p className="text-gray-600 mt-2">{jobDescription}</p>
        <p className="text-gray-500 mt-4">Location: {location}</p>
        <p className="text-gray-500 mt-1">Posted on: {createdAt}</p>

        {showActions && (
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md"
            >
              Delete
            </button>

            <JobUpdateForm job={job} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
