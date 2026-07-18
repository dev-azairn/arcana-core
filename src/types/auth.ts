import type { Account } from "./account";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface GoogleLoginRequest {
    credential: string;
}

export interface AuthResponse {
    accessToken: string;
    user: Account;
}

export interface UpdateProfileRequest { username: string; }
