import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

export default function PublicOnlyRoute() {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="mt-3 text-sm text-muted-foreground">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/app/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}