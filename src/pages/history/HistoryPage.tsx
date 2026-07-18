import * as React from "react";
import {
  Activity,
  CheckCircle2,
  History,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  Timer,
} from "lucide-react";

import * as HistoryApi from "@/api/history.api";
import type { ActionHistory } from "@/types";

import { Button } from "@/components/ui/button";

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
      "Unable to load your history."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to load your history.";
}

function getHistoryIcon(action: string) {
  const normalizedAction = action.toLowerCase();

  if (
    normalizedAction.includes("task") ||
    normalizedAction.includes("quest")
  ) {
    return CheckCircle2;
  }

  if (
    normalizedAction.includes("pomodoro") ||
    normalizedAction.includes("focus")
  ) {
    return Timer;
  }

  if (
    normalizedAction.includes("xp") ||
    normalizedAction.includes("level")
  ) {
    return Sparkles;
  }

  return Activity;
}

function formatHistoryDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function HistoryPage() {
  const [history, setHistory] = React.useState<ActionHistory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  async function loadHistory() {
    setLoading(true);
    setError(null);

    try {
      const response = await HistoryApi.getHistory();

      setHistory(response);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void loadHistory();
  }, []);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Adventure log
          </p>

          <h1 className="mt-1 text-2xl font-bold text-foreground">
            History
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Review completed quests, focus sessions, and XP changes.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => void loadHistory()}
        >
          <RefreshCw
            className={[
              "mr-2 h-4 w-4",
              loading ? "animate-spin" : "",
            ].join(" ")}
          />

          Refresh
        </Button>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-card">
          <div className="text-center">
            <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />

            <p className="mt-3 text-sm text-muted-foreground">
              Loading your adventure log...
            </p>
          </div>
        </div>
      ) : history.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-card px-6">
          <div className="text-center">
            <History className="mx-auto h-9 w-9 text-muted-foreground" />

            <h2 className="mt-3 font-semibold text-card-foreground">
              No history yet
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Complete quests or focus sessions to build your adventure log.
            </p>
          </div>
        </div>
      ) : (
        <section className="space-y-3">
          {history.map((item) => {
            const Icon = getHistoryIcon(item.action);

            return (
              <article
                key={item.id}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-card-foreground">
                        {item.action}
                      </h2>

                      {item.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {typeof item.xpChange === "number" && (
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          item.xpChange >= 0
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive",
                        ].join(" ")}
                      >
                        {item.xpChange >= 0 ? "+" : ""}
                        {item.xpChange} XP
                      </span>
                    )}
                  </div>

                  <time className="mt-3 block text-xs text-muted-foreground">
                    {formatHistoryDate(item.createdAt)}
                  </time>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}