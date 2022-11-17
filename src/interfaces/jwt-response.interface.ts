import { User } from "./user.interface";

export interface JwtResponse extends User {
  jwt: string;
}
