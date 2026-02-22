import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/store/auth.store";

/**
 * Login
 * - Auth page (guest-only)
 * - Redirects back to intended page after login
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold">Login</h1>
      <p className="text-sm text-white/60 mt-1">
        Welcome back to Orbix.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          autoComplete="email"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
        />

        <Button
          disabled={loading}
          className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner size="sm" /> Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>

        {err && (
          <div className="text-sm text-red-300 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
            {err}
          </div>
        )}
      </form>

      <div className="mt-4 text-sm text-white/70 flex items-center justify-between">
        <Link to="/register" className="text-indigo-300 hover:underline">
          Create account
        </Link>
        <Link to="/forgot" className="text-indigo-300 hover:underline">
          Forgot?
        </Link>
      </div>
    </div>
  );
}
