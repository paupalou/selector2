import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

interface Job {
  id: string;
  company: string;
}

interface Props {
  search?: string;
}

const fetchJobs = (description: string = "") => async (): Promise<Job[]> => {
  let url = "/positions.json?location=europe";
  if (description) {
    url.concat(`&description=${description}`);
  }

  const data = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const jobsData: Job[] = await data.json();
  return jobsData;
};

const useDebouncedApiCall = (search: string) => {
  const apiCallRef = useRef<() => Promise<Job[]>>();

  useEffect(() => {
    apiCallRef.current = debounce(fetchJobs(), 500);
  }, []);

  useEffect(() => {
    if (apiCallRef.current) {
      apiCallRef.current.cancel()
    }
  }, [search]);


};

function Data(props: Props) {
  const [jobs, setJobs] = useState([]);
  const apiData = useDebouncedApiCall(props.search)

  return (
    <div>
      {jobs.map((job: Job) => (
        <p key={job.id}>{job.company}</p>
      ))}
    </div>
  );
}

export default Data;
