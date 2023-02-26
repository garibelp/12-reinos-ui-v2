import { AxiosResponse } from "axios";
import {
  CharacterPaginated,
  CreateCharacter,
  DetailedCharacter,
  UpdateAttributePayload,
} from "../../interfaces/character.interface";
import api from "../api";

export function getCharactersPaginated(
  usePlayerProfile: boolean,
  pageSize?: number,
  currentPage?: number
): Promise<AxiosResponse<CharacterPaginated>> {
  return api.get<CharacterPaginated>("/sheets/list", {
    params: {
      pageSize,
      currentPage,
      usePlayerProfile,
    },
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function createCharacter(
  payload: CreateCharacter
): Promise<AxiosResponse<{ id: string }>> {
  return api.post<{ id: string }>("/sheets", payload, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function getCharacterDetails(
  id: string
): Promise<AxiosResponse<DetailedCharacter>> {
  return api.get<DetailedCharacter>("/sheets", {
    params: { id },
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}

export function updateAttributes(
  id: string,
  payload: UpdateAttributePayload
): Promise<AxiosResponse<{ message: string }>> {
  return api.patch<{ message: string }>(
    `/sheets/${id}/currentPoints`,
    payload,
    {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }
  );
}

export function deleteCharacter(
  id: string
): Promise<AxiosResponse<{ message: string }>> {
  return api.delete<{ message: string }>(`/sheets/${id}`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}
