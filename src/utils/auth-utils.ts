import { Role } from "../interfaces/jwt-response.interface";

export interface PlayerState {
  id: string | null;
  username: string | null;
  email: string | null;
  roles: Role[];
}

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function isUserAuthenticated() {
  const token = localStorage.getItem("jwt");
  const user = localStorage.getItem("user");

  if (!token || !user) return false;

  try {
    const { exp } = parseJwt(token);

    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}

export function retrieveUser(): PlayerState | null {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
}
