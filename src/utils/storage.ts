import {
    REFRESH_TOKEN_STORAGE_KEY,
    TOKEN_STORAGE_KEY,
} from "@/config/constants";

export const storage = {
    getToken() {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    },

    setToken(token: string) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(
            REFRESH_TOKEN_STORAGE_KEY
        );
    },

    setRefreshToken(token: string) {
        localStorage.setItem(
            REFRESH_TOKEN_STORAGE_KEY,
            token
        );
    },

    removeRefreshToken() {
        localStorage.removeItem(
            REFRESH_TOKEN_STORAGE_KEY
        );
    },

    clear() {
        localStorage.clear();
    },
};