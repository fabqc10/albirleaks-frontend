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
import { useContext } from "react";
import { JobsContext } from "../contexts/jobs.context"; // Adjust the path accordingly
import FormButton from "../components/common/form-button";

// Define the type for the form data
type JobForPost = {
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
};

const JobCreateForm = () => {
  const { addJob } = useContext(JobsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<JobForPost>();

  const onSubmit = async (data: JobForPost) => {
    addJob(data);
    reset()
  };

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Job</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Job</h3>

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

            <FormButton>Create Job</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default JobCreateForm;