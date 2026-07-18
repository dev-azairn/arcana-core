import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import {
  LoginPage,
  RegisterPage,
  GoogleCallbackPage,
} from "@/pages/auth";

import { DashboardPage } from "@/pages/dashboard";
import { HistoryPage } from "@/pages/history";
import { PomodoroPage } from "@/pages/pomodoro";
import { ProfilePage } from "@/pages/profile";
import { TasksPage } from "@/pages/task";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="text-5xl font-bold text-primary">
          404
        </p>

        <h1 className="mt-3 text-xl font-semibold">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          This path does not exist in Arcana Core.
        </p>
      </div>
    </main>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        element={<PublicOnlyRoute />}
      >
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route path="/auth/callback" element={<GoogleCallbackPage />} />
      </Route>

      <Route
        element={<ProtectedRoute />}
      >
        <Route
          path="/app"
          element={<AppLayout />}
        >
          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="tasks"
            element={<TasksPage />}
          />

          <Route
            path="pomodoro"
            element={<PomodoroPage />}
          />

          <Route
            path="history"
            element={<HistoryPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={
          <Navigate
            to="/app/dashboard"
            replace
          />
        }
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
