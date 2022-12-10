import { DetailedJob, JobList } from "../../interfaces/job.interface";
import jobList from "../../mock/jobs.json";

export function getJobList(): Promise<{ data: JobList }> {
  const v = {
    data: {
      list: jobList.list.map((l) => {
        return { id: l.id, name: l.name };
      }),
    },
  };
  return new Promise((res) => setTimeout(() => res(v), 100));
}

export function getDetailedJob(
  id: string
): Promise<{ data: DetailedJob | undefined }> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          // @ts-ignore
          data: jobList.list.find((l) => l.id === id),
        }),
      100
    )
  );
}
