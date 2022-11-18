import { AxiosResponse } from "axios";
import { BackgrounList } from "../../interfaces/background.interface";
import api from "../api";

export function getBackgroundList(): Promise<AxiosResponse<BackgrounList>> {
  return api.get<BackgrounList>("/backgrounds/list", {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}
