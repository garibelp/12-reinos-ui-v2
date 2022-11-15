export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export interface JwtResponse {
    jwt: string;
    id: string;
    username: string;
    email: string;
    roles: Role[];
}
