export type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface User {
  id: string | null;
  username: string | null;
  email: string | null;
  roles: Role[];
}
