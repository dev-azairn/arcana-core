import api from "./axios";
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    Account,
} from "@/types";
import type { UpdateProfileRequest } from "@/types";
import { mapAccount } from "./mappers";

export const login = async (
    request: LoginRequest
): Promise<AuthResponse> => {
    const { data } = await api.post("/api/auth/login", request);
    return { accessToken: data.token, user: mapAccount(data.user) };
};

export const register = async (
    request: RegisterRequest
): Promise<AuthResponse> => {
    const { data } = await api.post("/api/auth/signup", request);
    return { accessToken: data.token, user: mapAccount(data.user) };
};

export const getGoogleAuthUrl = async (state: string): Promise<string> => {
    const apiBaseUrl = String(import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
    const response = await fetch(
        `${apiBaseUrl}/api/auth/google/url?${new URLSearchParams({ state })}`,
        {
            method: "GET",
            headers: { Accept: "application/json" },
        },
    );
    const data = await response.json() as { url?: string; error?: string };

    if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to get the Google authorization URL.");
    }

    return data.url;
};

export const loginWithGoogle = async (tokenId: string): Promise<AuthResponse> => {
    const apiBaseUrl = String(import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
    const response = await fetch(`${apiBaseUrl}/api/auth/google/callback`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId }),
    });
    const data = await response.json() as {
        token?: string;
        user?: Record<string, unknown>;
        error?: string;
    };

    if (!response.ok || !data.token || !data.user) {
        throw new Error(data.error ?? "Unable to exchange the Google authorization code.");
    }

    return { accessToken: data.token, user: mapAccount(data.user) };
};

export const logout = async () => {
    await api.post("/api/auth/logout");
};

export const getProfile = async (): Promise<Account> => {
    const { data } = await api.get("/api/auth/me");
    return mapAccount(data);
};

export const updateProfile = async (request: UpdateProfileRequest): Promise<Account> => {
    const { data } = await api.put("/api/auth/me", request);
    return mapAccount(data);
};
