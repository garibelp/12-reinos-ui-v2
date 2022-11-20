import { AxiosResponse } from "axios";
import { JwtResponse } from "../../interfaces/jwt-response.interface";
import api from "../api";

export function signIn(
  username: string,
  password: string
): Promise<AxiosResponse<JwtResponse>> {
  return api.post<JwtResponse>(
    "/auth/signin",
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );
}

export function signUp(
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse<{ message: string }>> {
  return api.post<{ message: string }>(
    "/auth/signup",
    { username, password, email, firstName, lastName },
    { headers: { "Content-Type": "application/json" } }
  );
}

export function logout(): void {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  document.location.href = "/sign-in";
}
