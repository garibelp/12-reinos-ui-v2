import { AxiosResponse } from "axios";
import { WoundList } from "../../interfaces/wound.interface";
import api from "../api";

export function getWoundList(): Promise<AxiosResponse<WoundList>> {
  return api.get<WoundList>("/wounds/list", {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function addWound(
  sheetId: string,
  woundId?: string
): Promise<AxiosResponse<{ message: string }>> {
  return api.patch<{ message: string }>(`/sheets/${sheetId}/addWound`, null, {
    params: { woundId },
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function removeWound(
  sheetId: string
): Promise<AxiosResponse<{ message: string }>> {
  return api.patch<{ message: string }>(
    `/sheets/${sheetId}/removeWound`,
    null,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }
  );
}
