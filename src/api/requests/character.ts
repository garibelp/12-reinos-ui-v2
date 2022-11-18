import { AxiosResponse } from "axios";
import { CharacterPaginated } from "../../interfaces/character-paginated.interface";
import api from "../api";

export function charactersPaginated(
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
