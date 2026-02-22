import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { useAuth } from "@/store/auth.store";

/**
 * EditProfile
 * - UI form for editing profile
 * - Backend update will be connected later
 */
export default function EditProfile() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

  const [msg, setMsg] = useState("");

  const save = (e) => {
    e.preventDefault();
    // Backend integration later: PATCH /users/me
    setMsg("Saved locally ✅ Backend update will be added next.");
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <h1 className="text-lg font-semibold">Edit Profile</h1>
      <p className="text-sm text-white/60 mt-1">
        Profile update API will be connected later.
      </p>

      <form onSubmit={save} className="mt-4 space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <Input
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Avatar URL (optional)"
        />

        <Button className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30">
          Save
        </Button>

        {msg && (
          <div className="text-sm text-green-300 rounded-xl border border-green-500/20 bg-green-500/10 p-3">
            {msg}
          </div>
        )}
      </form>
    </section>
  );
}
