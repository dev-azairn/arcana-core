import * as React from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import type { LoginRequest } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleButton from "@/components/features/auth/GoogleButton";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
    ).response;

    if (response?.data?.message) {
      return response.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to sign in. Please try again.";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    React.useState(false);

  const [submitError, setSubmitError] =
    React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const locationState =
    location.state as LocationState | null;

  const redirectPath =
    locationState?.from?.pathname ??
    "/app/dashboard";

  async function handleLogin(
    values: LoginRequest,
  ) {
    setSubmitError(null);

    try {
      await login({
        email: values.email.trim(),
        password: values.password,
      });

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <header className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LogIn className="h-6 w-6" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-card-foreground">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue your adventure.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Enter a valid email address.",
                },
              })}
            />

            {errors.email?.message && (
              <p
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-medium"
            >
              Password
            </label>

            <div className="relative">
              <Input
                id="login-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                className="pr-10"
                aria-invalid={Boolean(
                  errors.password,
                )}
                {...register("password", {
                  required:
                    "Password is required.",
                })}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password?.message && (
              <p
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {submitError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Signing in..."
              : "Sign in"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /><span>OR</span><span className="h-px flex-1 bg-border" /></div>
        <GoogleButton redirectPath={redirectPath} onError={setSubmitError} />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Do not have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}
