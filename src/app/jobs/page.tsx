"use client";

import { JobsContext } from "@/app/contexts/jobs.context";
import { useContext } from "react";
import JobCard from "../components/jobCard";

const Page = () => {
const {jobs} = useContext(JobsContext);
  return <div>
    {jobs.map((job) => (
        <JobCard job={job}/>
    ))}
  </div>;
};
export default Page;
