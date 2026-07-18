import * as React from "react";
import {
  Check,
  Circle,
  LoaderCircle,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";

import * as TaskApi from "@/api/task.api";
import type {
  CreateTaskRequest,
  Task,
  TaskStatus,
} from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskFormValues {
  title: string;
  description: string;
  dueDate: string;
}

type TaskFilter =
  | "all"
  | "pending"
  | "in_progress"
  | "completed";

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
      "The task request failed."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "The task request failed.";
}

function getStatusLabel(status: TaskStatus) {
  switch (status) {
    case "in_progress":
      return "In progress";

    case "completed":
      return "Completed";

    default:
      return "Pending";
  }
}

function getNextStatus(
  status: TaskStatus,
): TaskStatus {
  switch (status) {
    case "pending":
      return "in_progress";

    case "in_progress":
      return "completed";

    case "completed":
      return "pending";
    default:
      return "pending";
  }
}

export default function TasksPage() {
  const [tasks, setTasks] =
    React.useState<Task[]>([]);

  const [filter, setFilter] =
    React.useState<TaskFilter>("all");

  const [loading, setLoading] =
    React.useState(true);

  const [pageError, setPageError] =
    React.useState<string | null>(null);

  const [updatingTaskId, setUpdatingTaskId] =
    React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const filteredTasks = React.useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    return tasks.filter(
      (task) => task.status === filter,
    );
  }, [filter, tasks]);

  async function loadTasks() {
    setLoading(true);
    setPageError(null);

    try {
      const response = await TaskApi.getTasks();
      setTasks(response);
    } catch (error) {
      setPageError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void loadTasks();
  }, []);

  async function handleCreateTask(
    values: TaskFormValues,
  ) {
    setPageError(null);

    const request: CreateTaskRequest = {
      title: values.title.trim(),
      description:
        values.description.trim() || undefined,
      dueDate: values.dueDate || undefined,
    };

    try {
      const createdTask =
        await TaskApi.createTask(request);

      setTasks((current) => [
        createdTask,
        ...current,
      ]);

      reset();
    } catch (error) {
      setPageError(getErrorMessage(error));
    }
  }

  async function handleChangeStatus(task: Task) {
    setUpdatingTaskId(task.id);
    setPageError(null);

    try {
      const updatedTask =
        await TaskApi.updateTask(task.id, {
          status: getNextStatus(task.status),
        });

      setTasks((current) =>
        current.map((currentTask) =>
          currentTask.id === updatedTask.id
            ? updatedTask
            : currentTask,
        ),
      );
    } catch (error) {
      setPageError(getErrorMessage(error));
    } finally {
      setUpdatingTaskId(null);
    }
  }

  async function handleDeleteTask(taskId: string) {
    const confirmed = window.confirm(
      "Delete this task?",
    );

    if (!confirmed) {
      return;
    }

    setUpdatingTaskId(taskId);
    setPageError(null);

    try {
      await TaskApi.deleteTask(taskId);

      setTasks((current) =>
        current.filter(
          (task) => task.id !== taskId,
        ),
      );
    } catch (error) {
      setPageError(getErrorMessage(error));
    } finally {
      setUpdatingTaskId(null);
    }
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Quest board
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create quests and update their progress.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => void loadTasks()}
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

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-semibold">
          Create quest
        </h2>

        <form
          className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_180px_auto]"
          onSubmit={handleSubmit(
            handleCreateTask,
          )}
        >
          <div>
            <Input
              placeholder="Quest title"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.title)}
              {...register("title", {
                required:
                  "Task title is required.",
                minLength: {
                  value: 2,
                  message:
                    "Task title is too short.",
                },
                maxLength: {
                  value: 150,
                  message:
                    "Task title cannot exceed 150 characters.",
                },
              })}
            />

            {errors.title?.message && (
              <p className="mt-1 text-xs text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          <Input
            placeholder="Description"
            disabled={isSubmitting}
            {...register("description")}
          />

          <Input
            type="date"
            disabled={isSubmitting}
            {...register("dueDate")}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            <Plus className="mr-2 h-4 w-4" />

            {isSubmitting
              ? "Creating..."
              : "Add task"}
          </Button>
        </form>
      </section>

      {pageError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {pageError}
        </div>
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(
            [
              "all",
              "pending",
              "in_progress",
              "completed",
            ] as const
          ).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={[
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                filter === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              {value === "all"
                ? "All"
                : getStatusLabel(value)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-card">
            <div className="text-center">
              <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-primary" />

              <p className="mt-2 text-sm text-muted-foreground">
                Loading quests...
              </p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border bg-card">
            <div className="text-center">
              <Circle className="mx-auto h-8 w-8 text-muted-foreground" />

              <h2 className="mt-3 font-semibold">
                No quests found
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Create a task or select another filter.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const isUpdating =
                updatingTaskId === task.id;

              return (
                <article
                  key={task.id}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
                >
                  <button
                    type="button"
                    disabled={isUpdating}
                    aria-label={`Change status of ${task.title}`}
                    onClick={() =>
                      void handleChangeStatus(task)
                    }
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                      task.status === "completed"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                    ].join(" ")}
                  >
                    {isUpdating ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : task.status ===
                      "completed" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className={[
                          "font-semibold",
                          task.status ===
                          "completed"
                            ? "text-muted-foreground line-through"
                            : "text-card-foreground",
                        ].join(" ")}
                      >
                        {task.title}
                      </h2>

                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {getStatusLabel(task.status)}
                      </span>

                      {task.xpReward !== undefined && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          +{task.xpReward} XP
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    )}

                    {task.dueDate && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Due{" "}
                        {new Date(
                          task.dueDate,
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={isUpdating}
                    aria-label={`Delete ${task.title}`}
                    onClick={() =>
                      void handleDeleteTask(task.id)
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
