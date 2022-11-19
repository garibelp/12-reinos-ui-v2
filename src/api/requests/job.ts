import { AxiosResponse } from "axios";
import { DetailedJob, JobList } from "../../interfaces/job.interface";
import api from "../api";

export function getJobList(): Promise<AxiosResponse<JobList>> {
  return api.get<JobList>("/jobs/list", {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function getDetailedJob(
  id: string
): Promise<AxiosResponse<DetailedJob>> {
  return api.get<DetailedJob>("/jobs", {
    params: { id },
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}
