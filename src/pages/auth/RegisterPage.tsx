import * as React from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import type { RegisterRequest } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RegisterFormValues = RegisterRequest & {
  confirmPassword: string;
};

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
            error?: string;
          };
        };
      }
    ).response;

    return (
      response?.data?.message ??
      response?.data?.error ??
      "Unable to create your account."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to create your account.";
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerAccount } = useAuth();

  const [showPassword, setShowPassword] =
    React.useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState(false);

  const [submitError, setSubmitError] =
    React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  async function handleRegister(
    values: RegisterFormValues,
  ) {
    setSubmitError(null);

    const request: RegisterRequest = {
      username: values.username.trim(),
      email: values.email.trim(),
      password: values.password,
    };

    try {
      await registerAccount(request);

      navigate("/app/dashboard", {
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
            <UserPlus
              aria-hidden="true"
              className="h-6 w-6"
            />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-card-foreground">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create an adventurer and begin completing quests.
          </p>
        </header>

        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="space-y-1.5">
            <label
              htmlFor="register-username"
              className="text-sm font-medium text-foreground"
            >
              Username
            </label>

            <Input
              id="register-username"
              autoComplete="username"
              placeholder="Choose a username"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.username)}
              {...register("username", {
                required: "Username is required.",
                minLength: {
                  value: 2,
                  message:
                    "Username must contain at least 2 characters.",
                },
                maxLength: {
                  value: 50,
                  message:
                    "Username cannot exceed 50 characters.",
                },
              })}
            />

            {errors.username?.message && (
              <p
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>

            <Input
              id="register-email"
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
              htmlFor="register-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>

            <div className="relative">
              <Input
                id="register-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                placeholder="Create a password"
                disabled={isSubmitting}
                className="pr-10"
                aria-invalid={Boolean(errors.password)}
                {...register("password", {
                  required:
                    "Password is required.",
                  minLength: {
                    value: 8,
                    message:
                      "Password must contain at least 8 characters.",
                  },
                })}
              />

              <button
                type="button"
                disabled={isSubmitting}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
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

          <div className="space-y-1.5">
            <label
              htmlFor="register-confirm-password"
              className="text-sm font-medium text-foreground"
            >
              Confirm password
            </label>

            <div className="relative">
              <Input
                id="register-confirm-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                placeholder="Repeat your password"
                disabled={isSubmitting}
                className="pr-10"
                aria-invalid={Boolean(
                  errors.confirmPassword,
                )}
                {...register("confirmPassword", {
                  required:
                    "Please confirm your password.",
                  validate: (value) =>
                    value === password ||
                    "Passwords do not match.",
                })}
              />

              <button
                type="button"
                disabled={isSubmitting}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirmed password"
                    : "Show confirmed password"
                }
                onClick={() =>
                  setShowConfirmPassword(
                    (current) => !current,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword?.message && (
              <p
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.confirmPassword.message}
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
              ? "Creating account..."
              : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}