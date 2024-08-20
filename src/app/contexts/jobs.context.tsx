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
  deleteJob: (jobId: string) => void;
};

const jobsArray: Job[] = [
  {
    jobId: "1",
    jobTitle: "Software Engineer",
    jobDescription:
      "Develop and maintain web applications using modern JavaScript frameworks.",
    location: "San Francisco, CA",
    companyName: "Tech Corp",
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    jobId: "2",
    jobTitle: "Product Manager",
    jobDescription:
      "Lead product development teams and define product strategy.",
    location: "New York, NY",
    companyName: "Innovate Inc.",
    createdAt: "2024-02-15T09:30:00Z",
  },
  {
    jobId: "3",
    jobTitle: "Data Scientist",
    jobDescription: "Analyze complex data sets to derive actionable insights.",
    location: "Boston, MA",
    companyName: "DataWorks",
    createdAt: "2024-03-10T12:15:00Z",
  },
  {
    jobId: "4",
    jobTitle: "UX Designer",
    jobDescription:
      "Design user interfaces and improve user experience for our products.",
    location: "Seattle, WA",
    companyName: "DesignHub",
    createdAt: "2024-04-05T08:45:00Z",
  },
  {
    jobId: "5",
    jobTitle: "Marketing Specialist",
    jobDescription:
      "Create and execute marketing campaigns to promote our services.",
    location: "Chicago, IL",
    companyName: "MarketMasters",
    createdAt: "2024-05-20T14:00:00Z",
  },
];

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

  console.log("token", token);
  console.log("tokenId", tokenId);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log(jobs);
  console.log("USER JOBS: " + userJobs);
  console.log("USER email" + user?.email);

  const getJobs = useCallback(async () => {
    try {
      console.log("triggering getJobs");
      const response = await fetch(`http://localhost:8080/jobs`);
      const fetchedJobs = await response.json();
      setJobs(fetchedJobs);
      setError(null);
    } catch (error) {
      setError("Error fetching jobs. Please try again.");
    }
  }, []);

  const getUserJobs = useCallback(async () => {
    console.log("I am getting called");
    if (user && user.id) {
      try {
        console.log(
          "getting jobs from " + `http://localhost:8080/jobs/user/${user.id}`
        );
        const response = await fetch(
          `http://localhost:8080/jobs/user/${user.id}`,
          {
            method: "GET",
            credentials: "include", // Required for sending cookies
            headers: {
              Authorization: `Bearer ${tokenId}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedUserJobs = await response.json();
        setUserJobs(fetchedUserJobs);
        setError(null);
      } catch (error) {
        setError("Error fetching user jobs. Please try again.");
      }
    }
  }, [user, token]);

  const addJob = async (job: JobForPost) => {
    try {
        const response = await fetch("http://localhost:8080/jobs", {
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${tokenId}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
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

  // useEffect(() => {
  //   if (!loading && user && user.id) {
  //     getUserJobs();
  //   }
  // }, [loading, user, getUserJobs]);

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
