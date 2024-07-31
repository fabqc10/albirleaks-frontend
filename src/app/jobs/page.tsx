"use client";

import { JobsContext } from "@/app/contexts/jobs.context";
import { useContext } from "react";

const Page = () => {
const {jobs} = useContext(JobsContext);
  return <div>
    {jobs.map((job) => (
        <div>{job.jobTitle}</div>
    ))}
  </div>;
};
export default Page;
