"use client";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth.context";
import { useSession } from "next-auth/react";

// Define the Job type
type Job = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
  createdAt: string;
};

type JobForPost = {
  jobTitle: string;
  jobDescription: string;
  location: string;
  companyName: string;
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
  getUserJobs: () => void;
  addJob: (job: JobForPost) => void;
  updateJob: (jobId: string, updatedJob: Job) => void;
  deleteJob: (jobId: string) => void; // No need to pass googleId here
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

export const JobsProvider = ({ children }: JobProviderProps) => {
  const { user, loading } = useAuth();
  const { data: session } = useSession();
  const token = session?.accessToken ?? null;
  const tokenId = session?.idToken ?? null;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"; // Use env variable for API URL

  const getJobs = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/jobs`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      
      const fetchedJobs = await response.json();
      setJobs(fetchedJobs);
      setError(null);
    } catch (error) {
      setError("Error fetching jobs. Please try again.");
    }
  }, [apiUrl]);

  const getUserJobs = useCallback(async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`${apiUrl}/jobs/user/${user.id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${tokenId}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user jobs");

        const fetchedUserJobs = await response.json();
        setUserJobs(fetchedUserJobs);
        setError(null);
      } catch (error) {
        setError("Error fetching user jobs. Please try again.");
      }
    }
  }, [user, tokenId, apiUrl]);

  const addJob = async (job: JobForPost) => {
    try {
      const response = await fetch(`${apiUrl}/jobs`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${tokenId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) throw new Error("Failed to add job");

      const newJob = await response.json();
      setJobs((prevJobs) => [...prevJobs, newJob]);
      setUserJobs((prevUserJobs) => [...prevUserJobs, newJob]);
      await getUserJobs();
    } catch (error) {
      setError("Error adding job. Please try again.");
    }
  };

  const updateJob = async (jobId: string, updatedJob: Job) => {
    try {
      const response = await fetch(`${apiUrl}/jobs/${jobId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${tokenId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      });
      if (!response.ok) throw new Error("Failed to update job");

      const newJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.jobId === jobId ? newJob : job))
      );
      setUserJobs((prevUserJobs) =>
        prevUserJobs.map((job) => (job.jobId === jobId ? newJob : job))
      );
    } catch (error) {
      setError("Error updating job. Please try again.");
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      const response = await fetch(`${apiUrl}/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete job");

      setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
      setUserJobs((prevUserJobs) => prevUserJobs.filter((job) => job.jobId !== jobId));
    } catch (error) {
      setError("Error deleting job. Please try again.");
    }
  };

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  useEffect(() => {
    if (!loading && user && user.id) {
      getUserJobs();
    }
  }, [loading, user, getUserJobs]);

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

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};