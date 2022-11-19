import { AxiosResponse } from "axios";
import { CharacterPaginated } from "../../interfaces/character-paginated.interface";
import { CreateCharacter } from "../../interfaces/create-character.interface";
import api from "../api";

export function getCharactersPaginated(
  pageSize?: number,
  currentPage?: number
): Promise<AxiosResponse<CharacterPaginated>> {
  return api.get<CharacterPaginated>("/sheets/list", {
    params: {
      pageSize,
      currentPage,
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
