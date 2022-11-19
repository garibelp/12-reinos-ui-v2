import { AxiosResponse } from "axios";
import { BackgroundList } from "../../interfaces/background.interface";
import api from "../api";

export function getBackgroundList(): Promise<AxiosResponse<BackgroundList>> {
  return api.get<BackgroundList>("/backgrounds/list", {
    headers: {
      authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  });
}
