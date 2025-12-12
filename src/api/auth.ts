import { api } from "./client";

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string };

export async function login(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>("/token", payload);
    return data;
}
