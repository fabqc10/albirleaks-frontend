import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import FormButton from "../components/common/form-button";

const JobCreateForm = () => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Job</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={"action"}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Job</h3>

            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              //   isInvalid = {!!formState.errors.title}
              //   errorMessage = {formState.errors.title?.join(", ")}
            />

            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              //   isInvalid = {!!formState.errors.content}
              //   errorMessage = {formState.errors.content?.join(", ")}
            />

            <Input
              name="location"
              label="Location"
              labelPlacement="outside"
              placeholder="Location"
              //   isInvalid = {!!formState.errors.title}
              //   errorMessage = {formState.errors.title?.join(", ")}
            />

            <Input
              name="company-name"
              label="Company Name"
              labelPlacement="outside"
              placeholder="Company Name"
              //   isInvalid = {!!formState.errors.title}
              //   errorMessage = {formState.errors.title?.join(", ")}
            />

            {/* {formState.errors._form ? (
                  <div className="rounded p-2 bg-red-200 border border-red-400">
                    {formState.errors._form?.join(", ")}
                  </div>
                ) : null} */}

            <FormButton>Create Job</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default JobCreateForm;
