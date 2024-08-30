"use client";
import React, { useContext, useEffect } from "react";
import { JobsContext } from "../contexts/jobs.context";
import JobCard from "../components/jobCard";
import { Button } from "@nextui-org/react";
import JobCreateForm from "../jobs/job-creare-form";

const page = () => {
  const { userJobs, getUserJobs, error, addJob, deleteJob } = useContext(JobsContext);

  useEffect(() => {
    getUserJobs();
  }, [getUserJobs]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        {/* <Button
        radius="full"
          className="text-xl text-white bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          size="lg"
          color="success"
          onClick={() =>
            addJob({
              jobTitle: "Event manager",
              jobDescription:
                "organize events for the company and bring potential partners.",
              location: "London",
              companyName: "Corporate",
            })
          }
        >
          +
        </Button> */}
        <JobCreateForm />
      </div>
      {userJobs.length === 0 ? (
        <h1 className="text-center text-xl font-bold">
          You have no jobs posted
        </h1>
      ) : (
        <>
          <h1 className="text-center text-xl font-bold align-center">
            My jobs
          </h1>
          <div className="flex flex-wrap -mx-2">
            {userJobs.map((job) => (
              <div
                key={job.jobId}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <JobCard job={job} onDelete={deleteJob}/>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
