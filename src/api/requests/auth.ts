import { AxiosResponse } from "axios";
import api from "../api"

export const signIn = (username: string, password: string): Promise<AxiosResponse<any, any>> => {
    return api.post("/auth/signin", { username, password }, { headers: { 'Content-Type' : 'application/json' }});
}

export const signUp = (): void => {

}