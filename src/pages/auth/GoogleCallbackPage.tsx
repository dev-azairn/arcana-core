import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

export default function GoogleCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const attempted = React.useRef(false);

  React.useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;
    const code = params.get("code");
    const state = params.get("state");
    const expectedState = sessionStorage.getItem("googleOAuthState");
    const providerError = params.get("error");

    if (providerError) { setError("Google sign-in was cancelled or denied."); return; }
    if (!code || !state || state !== expectedState) { setError("The Google sign-in response could not be verified."); return; }

    sessionStorage.removeItem("googleOAuthState");
    sessionStorage.removeItem("googleOAuthRedirect");
    void loginWithGoogle(code)
      .then(() => navigate("/app/dashboard", { replace: true }))
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Google sign-in failed."));
  }, [loginWithGoogle, navigate, params]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        {error ? <><h1 className="text-xl font-semibold">Unable to sign in</h1><p role="alert" className="mt-3 text-sm text-destructive">{error}</p><Link to="/login" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">Return to sign in</Link></> : <><LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" /><h1 className="mt-4 text-xl font-semibold">Completing Google sign-in</h1><p className="mt-2 text-sm text-muted-foreground">Please wait while we verify your account.</p></>}
      </section>
    </main>
  );
}
