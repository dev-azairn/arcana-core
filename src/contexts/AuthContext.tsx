import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import * as AuthApi from "@/api/auth.api";
import type {
    Account,
    LoginRequest,
    RegisterRequest,
} from "@/types";

interface AuthContextType {
    user: Account | null;
    token: string | null;

    loading: boolean;

    login: (request: LoginRequest) => Promise<void>;

    register: (request: RegisterRequest) => Promise<void>;
    loginWithGoogle: (tokenId: string) => Promise<void>;

    logout: () => Promise<void>;

    refreshUser: () => Promise<void>;

    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {

    const [user, setUser] = useState<Account | null>(null);

    const [token, setToken] = useState(
        localStorage.getItem("accessToken")
    );

    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        try {

            const profile = await AuthApi.getProfile();

            setUser(profile);

        } catch {

            setUser(null);

            setToken(null);

            localStorage.removeItem("accessToken");
        }
    }

    async function login(request: LoginRequest) {

        const response = await AuthApi.login(request);

        localStorage.setItem(
            "accessToken",
            response.accessToken
        );

        setToken(response.accessToken);

        setUser(response.user);
    }

    async function register(request: RegisterRequest) {

        const response = await AuthApi.register(request);

        localStorage.setItem(
            "accessToken",
            response.accessToken
        );

        setToken(response.accessToken);

        setUser(response.user);
    }

    async function loginWithGoogle(tokenId: string) {
        const response = await AuthApi.loginWithGoogle(tokenId);
        localStorage.setItem("accessToken", response.accessToken);
        setToken(response.accessToken);
        setUser(response.user);
    }

    async function logout() {

        await AuthApi.logout();

        localStorage.removeItem("accessToken");

        setToken(null);

        setUser(null);
    }

    useEffect(() => {

        async function initialize() {

            if (token) {

                await refreshUser();

            }

            setLoading(false);

        }

        initialize();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,

                loading,

                login,

                register,
                loginWithGoogle,

                logout,

                refreshUser,

                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider."
        );

    }

    return context;
}
