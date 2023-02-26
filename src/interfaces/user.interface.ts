import { RolesEnum } from "../enum/roles.enum";

export interface User {
  id: string | null;
  username: string | null;
  email: string | null;
  roles: RolesEnum[];
}
