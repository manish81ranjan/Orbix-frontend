import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/store/auth.store";

/**
 * Register
 * - Auth page (guest-only)
 * - Creates user and redirects to home
 */
export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (username.trim().length < 3) {
      setErr("Username must be at least 3 characters.");
      return;
    }
    if (!email.includes("@")) {
      setErr("Enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await register(username, email, password);
      navigate("/", { replace: true });
    } catch (e) {
      setErr(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold">Create account</h1>
      <p className="text-sm text-white/60 mt-1">
        Join Orbix and start sharing.
      </p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
        />

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
          autoComplete="new-password"
        />

        <Button
          disabled={loading}
          className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner size="sm" /> Creating...
            </span>
          ) : (
            "Register"
          )}
        </Button>

        {err && (
          <div className="text-sm text-red-300 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
            {err}
          </div>
        )}
      </form>

      <div className="mt-4 text-sm text-white/70">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-300 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
