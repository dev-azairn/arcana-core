import {
  ArrowRight,
  CheckCircle2,
  ListTodo,
  Sparkles,
  Timer,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { getNextLevelXp } from "@/types";

interface SummaryCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: typeof ListTodo;
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-card-foreground">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

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
          Math.round(
            (currentXp / nextLevelXp) * 100,
          ),
        )
      : 0;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header className="rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-medium text-primary">
          Adventurer dashboard
        </p>

        <h1 className="mt-2 text-2xl font-bold text-card-foreground sm:text-3xl">
          Welcome back, {username}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Continue your quests, earn experience, and
          strengthen your daily routine.
        </p>

        <div className="mt-6 max-w-xl">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              Level {level}
            </span>

            <span className="text-muted-foreground">
              {currentXp} / {nextLevelXp} XP
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{
                width: `${xpProgress}%`,
              }}
            />
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Current level"
          value={level}
          description="Complete quests to increase your level."
          icon={Sparkles}
        />

        <SummaryCard
          label="Current XP"
          value={currentXp}
          description={`${nextLevelXp - currentXp} XP remaining until the next level.`}
          icon={CheckCircle2}
        />

        <SummaryCard
          label="Active quests"
          value="—"
          description="Task data will appear after loading the task API."
          icon={ListTodo}
        />

        <SummaryCard
          label="Focus sessions"
          value="—"
          description="Pomodoro history will appear after integration."
          icon={Timer}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold text-card-foreground">
            Quest board
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your active tasks.
          </p>

          <Link
            to="/app/tasks"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Open tasks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold text-card-foreground">
            Focus chamber
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Begin a focus session and earn additional XP.
          </p>

          <Link
            to="/app/pomodoro"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Start focusing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>
    </div>
  );
}
