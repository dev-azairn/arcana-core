import * as React from "react";
import { LoaderCircle } from "lucide-react";

import * as AuthApi from "@/api/auth.api";
import { Button } from "@/components/ui/button";

interface GoogleButtonProps {
  redirectPath?: string;
  onError?: (message: string) => void;
}

function createOAuthState(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
}

export default function GoogleButton({ redirectPath = "/app/dashboard", onError }: GoogleButtonProps) {
  const [loading, setLoading] = React.useState(false);

  async function startGoogleLogin() {
    setLoading(true);
    try {
      const state = createOAuthState();
      sessionStorage.setItem("googleOAuthState", state);
      sessionStorage.setItem("googleOAuthRedirect", redirectPath);
      const url = await AuthApi.getGoogleAuthUrl(state);
      window.location.assign(url);
    } catch (error) {
      setLoading(false);
      onError?.(error instanceof Error ? error.message : "Unable to start Google sign-in.");
    }
  }

  return (
    <Button type="button" variant="outline" className="w-full" disabled={loading} onClick={() => void startGoogleLogin()}>
      {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : (
        <svg aria-hidden="true" className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.3h5.4a4.6 4.6 0 0 1-2 3v2.8h3.3c1.9-1.8 2.9-4.4 2.9-7.9Z" />
          <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.7c-.9.6-2.1 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2H2.9v2.8A10 10 0 0 0 12 22Z" />
          <path fill="#FBBC05" d="M6.3 13.7a6 6 0 0 1 0-3.4V7.5H2.9a10 10 0 0 0 0 9l3.4-2.8Z" />
          <path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.9 1.5l2.9-2.9A9.8 9.8 0 0 0 2.9 7.5l3.4 2.8C7.1 7.9 9.4 6.1 12 6.1Z" />
        </svg>
      )}
      {loading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
}
