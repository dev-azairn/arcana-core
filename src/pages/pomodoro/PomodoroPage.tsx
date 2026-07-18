import * as React from "react";
import {
  Pause,
  Play,
  RefreshCcw,
  Sparkles,
  Timer,
} from "lucide-react";

import * as PomodoroApi from "@/api/pomodoro.api";
import * as TaskApi from "@/api/task.api";
import type { Task } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SESSION_OPTIONS = [
  {
    label: "Short focus",
    minutes: 15,
  },
  {
    label: "Standard focus",
    minutes: 25,
  },
  {
    label: "Deep focus",
    minutes: 50,
  },
] as const;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
            error?: string;
          };
        };
      }
    ).response;

    return (
      response?.data?.message ??
      response?.data?.error ??
      "Unable to complete the focus session."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to complete the focus session.";
}

export default function PomodoroPage() {
  const [mode, setMode] = React.useState<"TASK" | "NEW_QUEST">("TASK");
  const [selectedMinutes, setSelectedMinutes] = React.useState(25);
  const [secondsRemaining, setSecondsRemaining] = React.useState(
    selectedMinutes * 60,
  );
  const [running, setRunning] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [taskId, setTaskId] = React.useState("");
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [newQuestTitle, setNewQuestTitle] = React.useState("");
  const [newQuestTaskId, setNewQuestTaskId] = React.useState<string | null>(null);

  const hasCompleted = secondsRemaining === 0;

  React.useEffect(() => {
    void TaskApi.getTasks().then((items) => {
      const active = items.filter((task) => task.status !== "DONE" && task.status !== "FAILED");
      setTasks(active);
      setTaskId((current) => current || active[0]?.id || "");
    }).catch((requestError) => setError(getErrorMessage(requestError)));
  }, []);

  React.useEffect(() => {
    if (!running || secondsRemaining <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [running, secondsRemaining]);

  React.useEffect(() => {
    if (hasCompleted) {
      setRunning(false);
      void completeSession();
    }
  }, [hasCompleted]);

  function selectDuration(minutes: number) {
    if (running || saving) {
      return;
    }

    setSelectedMinutes(minutes);
    setSecondsRemaining(minutes * 60);
    setMessage(null);
    setError(null);
  }

  function resetTimer() {
    setRunning(false);
    setSecondsRemaining(selectedMinutes * 60);
    setMessage(null);
    setError(null);
  }

  async function completeSession() {
    if (!sessionId) return;
    setSaving(true);
    setError(null);

    try {
      const response = await PomodoroApi.finishPomodoro(sessionId, selectedMinutes * 60);

      setMessage(
        `Focus session completed. You earned ${response.xpReward} XP.`,
      );
      setSessionId(null);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  }

  async function toggleTimer() {
    if (running) { setRunning(false); return; }
    let focusTaskId = mode === "TASK" ? taskId : newQuestTaskId;
    if (mode === "TASK" && !focusTaskId) {
      setError("Choose a quest before starting a focus session.");
      return;
    }
    if (mode === "NEW_QUEST" && !focusTaskId) {
      const title = newQuestTitle.trim();
      if (title.length < 2) {
        setError("Enter a focus quest title with at least 2 characters.");
        return;
      }
      setSaving(true);
      try {
        const createdTask = await TaskApi.createTask({
          title,
          description: `Pomodoro focus quest (${selectedMinutes} minutes)`,
          category: "FOCUS",
          priority: "MEDIUM",
        });
        setTasks((current) => [createdTask, ...current]);
        setNewQuestTaskId(createdTask.id);
        focusTaskId = createdTask.id;
      } catch (requestError) {
        setError(getErrorMessage(requestError));
        setSaving(false);
        return;
      }
    }
    if (!sessionId) {
      setSaving(true);
      try {
        const session = await PomodoroApi.startPomodoro(focusTaskId!);
        setSessionId(session.id);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
        setSaving(false);
        return;
      }
      setSaving(false);
    }
    setRunning(true);
  }

  const progress =
    selectedMinutes > 0
      ? ((selectedMinutes * 60 - secondsRemaining) /
          (selectedMinutes * 60)) *
        100
      : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header>
        <p className="text-sm font-medium text-primary">
          Focus chamber
        </p>

        <h1 className="mt-1 text-2xl font-bold text-foreground">
          Pomodoro
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Focus without interruption and earn additional experience.
        </p>
      </header>

      <section className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Timer className="h-7 w-7" />
        </div>

        <p className="mt-5 text-sm font-medium text-muted-foreground">
          {running ? "Focus in progress" : "Ready to focus"}
        </p>

        <p className="mt-2 font-mono text-6xl font-bold tracking-tight text-card-foreground sm:text-7xl">
          {formatTime(secondsRemaining)}
        </p>

        <div className="mx-auto mt-6 max-w-md">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {SESSION_OPTIONS.map((option) => (
            <button
              key={option.minutes}
              type="button"
              disabled={running || saving}
              onClick={() => selectDuration(option.minutes)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
                selectedMinutes === option.minutes
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-2">
          <Button type="button" variant={mode === "TASK" ? "primary" : "outline"} disabled={running || saving || Boolean(sessionId)} onClick={() => { setMode("TASK"); setError(null); }}>
            Existing task
          </Button>
          <Button type="button" variant={mode === "NEW_QUEST" ? "primary" : "outline"} disabled={running || saving || Boolean(sessionId)} onClick={() => { setMode("NEW_QUEST"); setError(null); }}>
            New focus quest
          </Button>
        </div>

        <div className="mx-auto mt-4 max-w-md text-left text-sm font-medium">
          {mode === "TASK" ? (
            <>
              <span>Quest receiving the focus bonus</span>
              <Select value={taskId || undefined} disabled={running || saving} onValueChange={setTaskId}>
                <SelectTrigger className="mt-2 border-input bg-background text-foreground"><SelectValue placeholder="Choose a quest" /></SelectTrigger>
                <SelectContent className="border-border bg-popover text-popover-foreground">
                  {tasks.map((task) => <SelectItem key={task.id} value={task.id}>{task.title}</SelectItem>)}
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs font-normal text-muted-foreground">Completing the timer awards focus XP while keeping the quest available.</p>
            </>
          ) : (
            <>
              <span>New focus quest</span>
              <Input className="mt-2" value={newQuestTitle} disabled={running || saving || Boolean(newQuestTaskId)} maxLength={150}
                placeholder="What will you focus on?" onChange={(event) => { setNewQuestTitle(event.target.value); setNewQuestTaskId(null); }} />
              <p className="mt-2 text-xs font-normal text-muted-foreground">
                {newQuestTaskId ? "Focus quest created and linked to this timer." : "Starting creates a medium-priority quest in the FOCUS category."}
              </p>
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button
            type="button"
            disabled={saving || hasCompleted}
            onClick={() => void toggleTimer()}
          >
            {running ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={resetTimer}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {saving && (
          <p className="mt-5 text-sm text-muted-foreground">
            Saving completed session...
          </p>
        )}

        {message && (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}
      </section>
    </div>
  );
}
