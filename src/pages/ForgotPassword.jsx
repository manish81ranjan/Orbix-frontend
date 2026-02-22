import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

/**
 * ForgotPassword
 * - UI-only for now (email reset flow later)
 * - Later connect to backend: POST /auth/forgot
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setMsg("If this email exists, you'll get a reset link (demo).");
  };

  return (
    <div>
      <h1 className="text-lg font-semibold">Forgot password</h1>
      <p className="text-sm text-white/60 mt-1">
        We’ll send you a reset link (feature will be wired later).
      </p>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />

        <Button className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30">
          Send reset link
        </Button>

        {msg && (
          <div className="text-sm text-green-300 rounded-xl border border-green-500/20 bg-green-500/10 p-3">
            {msg}
          </div>
        )}
      </form>

      <div className="mt-4 text-sm text-white/70">
        <Link to="/login" className="text-indigo-300 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
