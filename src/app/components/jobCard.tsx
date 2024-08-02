import React from 'react';

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
  };

const JobCard = ({ job }: JobCardProps) => {
  const { jobTitle, jobDescription, location, companyName, createdAt } = job;
//   const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//   });

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900">{jobTitle}</h2>
        <p className="text-lg text-gray-700 mt-2">{companyName}</p>
        <p className="text-gray-600 mt-2">{jobDescription}</p>
        <p className="text-gray-500 mt-4">Location: {location}</p>
        <p className="text-gray-500 mt-1">Posted on: {createdAt}</p>
      </div>
    </div>
  );
};

export default JobCard;
