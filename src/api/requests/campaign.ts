import { AxiosResponse } from "axios";
import api from "../api";
import {
  CampaignPaginated,
  CreateCampaign,
  DetailedCampaign,
} from "../../interfaces/campaign.interface";

export function createCampaign(
  payload: CreateCampaign
): Promise<AxiosResponse<{ id: string }>> {
  return api.post<{ id: string }>("/campaigns", payload, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function getCampaignPaginated(
  pageSize?: number,
  currentPage?: number
): Promise<AxiosResponse<CampaignPaginated>> {
  return api.get<CampaignPaginated>("/campaigns/list", {
    params: {
      pageSize,
      currentPage,
    },
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function getCampaignDetails(
  id: string
): Promise<AxiosResponse<DetailedCampaign>> {
  return api.get<DetailedCampaign>("/campaigns", {
    params: { id },
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function deleteCampaign(
  id: string
): Promise<AxiosResponse<{ message: string }>> {
  return api.delete<{ message: string }>(`/campaigns/${id}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function removeSheets(
  id: string,
  sheetsIds: string[]
): Promise<AxiosResponse<{ message: string }>> {
  return api.patch<{ message: string }>(
    `/campaigns/removeSheets/${id}`,
    { idList: sheetsIds },
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }
  );
}

export function addSheets(
  id: string,
  sheetsIds: string[]
): Promise<AxiosResponse<{ message: string }>> {
  return api.patch<{ message: string }>(
    `/campaigns/addSheets/${id}`,
    { idList: sheetsIds },
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }
  );
}
