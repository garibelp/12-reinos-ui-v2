import api from "../api";
import { JwtResponse } from "../../interfaces/jwt-response.interface";
import { AxiosResponse } from "axios";

export const signIn = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return api.post<JwtResponse>(
    "/auth/signin",
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const signUp = (): void => {};

export const logout = (): void => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  document.location.href = "/signin";
};
