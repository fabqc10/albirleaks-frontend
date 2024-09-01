"use client";

import { useForm } from "react-hook-form";
import {
  Button,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
} from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { JobsContext } from "../contexts/jobs.context";
import FormButton from "../components/common/form-button";

type JobForUpdate = {
    jobId:string;
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
  createdAt: string
};

type JobUpdateFormProps = {
    job: JobForUpdate;
  };

const JobUpdateForm = ({ job}: JobUpdateFormProps) => {
  const { updateJob } = useContext(JobsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<JobForUpdate>();

  // Set form values when job prop changes
  useEffect(() => {
    reset(job); // Pre-fill the form with the current job values
  }, [job, reset]);

  const onSubmit = async (data: JobForUpdate) => {
    updateJob(data.jobId,data);
    reset();
  };

  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button color="primary">Update Job</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Update Job</h3>

            <Input
              {...register("jobTitle", { required: "Job Title is required" })}
              label="Job Title"
              labelPlacement="outside"
              placeholder="Job Title"
              isInvalid={!!errors.jobTitle}
              errorMessage={errors.jobTitle?.message}
            />

            <Textarea
              {...register("jobDescription", { required: "Job Description is required" })}
              label="Job Description"
              labelPlacement="outside"
              placeholder="Job Description"
              isInvalid={!!errors.jobDescription}
              errorMessage={errors.jobDescription?.message}
            />

            <Input
              {...register("location", { required: "Location is required" })}
              label="Location"
              labelPlacement="outside"
              placeholder="Location"
              isInvalid={!!errors.location}
              errorMessage={errors.location?.message}
            />

            <Input
              {...register("companyName", { required: "Company Name is required" })}
              label="Company Name"
              labelPlacement="outside"
              placeholder="Company Name"
              isInvalid={!!errors.companyName}
              errorMessage={errors.companyName?.message}
            />

            <FormButton>Update Job</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default JobUpdateForm;