"use client";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

// Define the Job type
type Job = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
  createdAt: string;
};

// Define the props for the provider
type JobProviderProps = {
  children: ReactNode;
};

// Define the context type
type JobsContextType = {
  jobs: Job[];
  userJobs: Job[];
  error: string | null;
  getJobs: () => void;
  getUserJobs: (userId: string) => void;
  addJob: (job: Job) => void;
  updateJob: (jobId: string, updatedJob: Job) => void;
  deleteJob: (jobId: string) => void;
};

export const JobsContext = createContext<JobsContextType>({
  jobs: [],
  userJobs: [],
  error: null,
  getJobs: () => {},
  getUserJobs: () => {},
  addJob: () => {},
  updateJob: () => {},
  deleteJob: () => {},
});

export const JobProvider = ({ children }: JobProviderProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getJobs = useCallback(async () => {
    try {
      const response = await fetch("/jobs");
      const fetchedJobs = await response.json();
      setJobs(fetchedJobs);
      setError(null);
    } catch (error) {
      setError("Error fetching jobs. Please try again.");
    }
  }, []);

  const getUserJobs = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/jobs`);
      const fetchedUserJobs = await response.json();
      setUserJobs(fetchedUserJobs);
      setError(null);
    } catch (error) {
      setError("Error fetching user jobs. Please try again.");
    }
  }, []);

  const addJob = async (job: Job) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      const newJob = await response.json();
      setJobs([...jobs, newJob]);
    } catch (error) {
      setError("Error adding job. Please try again.");
    }
  };

  const updateJob = async (jobId: string, updatedJob: Job) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      });
      const newJob = await response.json();
      setJobs(jobs.map((job) => (job.jobId === jobId ? newJob : job)));
      setUserJobs(userJobs.map((job) => (job.jobId === jobId ? newJob : job)));
    } catch (error) {
      setError("Error updating job. Please try again.");
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });
      setJobs(jobs.filter((job) => job.jobId !== jobId));
      setUserJobs(userJobs.filter((job) => job.jobId !== jobId));
    } catch (error) {
      setError("Error deleting job. Please try again.");
    }
  };

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const value: JobsContextType = {
    jobs,
    userJobs,
    error,
    getJobs,
    getUserJobs,
    addJob,
    updateJob,
    deleteJob,
  };

  return (
    <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
  );
};
