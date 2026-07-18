import * as React from "react";
import {
  Mail,
  Save,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";

import * as AuthApi from "@/api/auth.api";
import { useAuth } from "@/contexts/AuthContext";
import type { UpdateProfileRequest } from "@/types";
import { getNextLevelXp } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      "Unable to update your profile."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to update your profile.";
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm<UpdateProfileRequest>({
    defaultValues: {
      username: user?.username ?? "",
    },
  });

  React.useEffect(() => {
    reset({
      username: user?.username ?? "",
    });
  }, [reset, user?.username]);

  async function handleUpdateProfile(
    values: UpdateProfileRequest,
  ) {
    setMessage(null);
    setError(null);

    try {
      await AuthApi.updateProfile({
        username: values.username.trim(),
      });

      await refreshUser();

      setMessage("Profile updated successfully.");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  const username =
    user?.username ??
    user?.email ??
    "Adventurer";

  const level = user?.level ?? 1;
  const currentXp = user?.xp ?? 0;
  const nextLevelXp = getNextLevelXp(level);

  const xpProgress =
    nextLevelXp > 0
      ? Math.min(
          100,
          Math.round((currentXp / nextLevelXp) * 100),
        )
      : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header>
        <p className="text-sm font-medium text-primary">
          Adventurer identity
        </p>

        <h1 className="mt-1 text-2xl font-bold text-foreground">
          Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review your account and character progression.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-border bg-card p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {username.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-bold text-card-foreground">
            {username}
          </h2>

          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            {user?.email}
          </p>

          <div className="mt-6 rounded-xl bg-muted/60 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Level {level}
              </span>

              <span className="text-xs text-muted-foreground">
                {xpProgress}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${xpProgress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {currentXp} / {nextLevelXp} XP
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border p-4">
            <Sparkles className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm font-medium text-card-foreground">
                Total experience
              </p>

              <p className="text-xs text-muted-foreground">
                {currentXp} accumulated XP
              </p>
            </div>
          </div>
        </aside>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-card-foreground">
                Profile information
              </h2>

              <p className="text-sm text-muted-foreground">
                Update the public name shown throughout Arcana Core.
              </p>
            </div>
          </div>

          <form
            className="mt-6 max-w-xl space-y-4"
            onSubmit={handleSubmit(handleUpdateProfile)}
          >
            <div className="space-y-1.5">
              <label
                htmlFor="profile-username"
                className="text-sm font-medium text-foreground"
              >
                Username
              </label>

              <Input
                id="profile-username"
                autoComplete="username"
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
                htmlFor="profile-email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>

              <Input
                id="profile-email"
                type="email"
                value={user?.email ?? ""}
                disabled
              />

              <p className="text-xs text-muted-foreground">
                Email changes are not enabled in this prototype.
              </p>
            </div>

            {message && (
              <div className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                {message}
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !isDirty}
            >
              <Save className="mr-2 h-4 w-4" />

              {isSubmitting
                ? "Saving..."
                : "Save changes"}
            </Button>
          </form>
        </section>
      </section>
    </div>
  );
}
