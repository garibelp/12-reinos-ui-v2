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
