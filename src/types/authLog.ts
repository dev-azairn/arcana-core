export type AuthType =
    | "LOGIN"
    | "REGISTER"
    | "GOOGLE_LOGIN"
    | "GOOGLE_REGISTER"
    | "LOGOUT"
    | "TOKEN_REFRESH"
    | "PASSWORD_RESET";

export type AuthStatus =
    | "SUCCESS"
    | "FAILED";

export interface AuthLog {
    id: string;

    accountId?: string;

    email: string;

    authType: AuthType;

    status: AuthStatus;

    ipAddress?: string;

    userAgent?: string;

    failureReason?: string;

    createdAt: string;
}