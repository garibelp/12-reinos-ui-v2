import { AxiosResponse } from "axios";
import {
  DetailedLineage,
  LineageList,
} from "../../interfaces/lineage.interface";
import api from "../api";

export function getLineageList(): Promise<AxiosResponse<LineageList>> {
  return api.get<LineageList>("/lineages/list", {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function getDetailedLineage(
  id: string
): Promise<AxiosResponse<DetailedLineage>> {
  return api.get<DetailedLineage>("/lineages", {
    params: { id },
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}
