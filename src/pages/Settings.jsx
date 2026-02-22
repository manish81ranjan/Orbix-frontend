// import React, { useState } from "react";
// import Button from "@/components/ui/Button";
// import { useAuth } from "@/store/auth.store";

// /**
//  * Settings
//  * - Basic settings page
//  * - Includes logout + future toggles
//  */
// export default function Settings() {
//   const { user, logout } = useAuth();
//   const [theme, setTheme] = useState("dark");

//   return (
//     <section className="rounded-2xl border border-border bg-card p-4 space-y-4">
//       <div>
//         <h1 className="text-lg font-semibold">Settings</h1>
//         <p className="text-sm text-white/60 mt-1">
//           Manage your preferences for Orbix.
//         </p>
//       </div>

//       <div className="rounded-xl border border-border bg-white/5 p-3">
//         <div className="text-sm font-medium">Account</div>
//         <div className="text-sm text-white/70 mt-1">
//           Logged in as <span className="text-white">@{user?.username}</span>
//         </div>
//       </div>

//       <div className="rounded-xl border border-border bg-white/5 p-3">
//         <div className="text-sm font-medium">Theme</div>
//         <div className="mt-2 flex gap-2">
//           <button
//             onClick={() => setTheme("dark")}
//             className={`px-3 py-1.5 rounded-xl text-sm border ${
//               theme === "dark"
//                 ? "bg-white/10 border-border"
//                 : "border-transparent text-white/60 hover:bg-white/5"
//             }`}
//           >
//             Dark
//           </button>
//           <button
//             onClick={() => setTheme("light")}
//             className={`px-3 py-1.5 rounded-xl text-sm border ${
//               theme === "light"
//                 ? "bg-white/10 border-border"
//                 : "border-transparent text-white/60 hover:bg-white/5"
//             }`}
//           >
//             Light (later)
//           </button>
//         </div>
//         <div className="text-xs text-white/50 mt-2">
//           Theme switching will be wired globally later.
//         </div>
//       </div>

//       <Button
//         onClick={logout}
//         className="w-full bg-red-500/10 hover:bg-red-500/20 border-red-400/20 text-red-200"
//       >
//         Logout
//       </Button>
//     </section>
//   );
// }
// // src/pages/Settings.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import Button from "@/components/ui/Button";
// import Modal from "@/components/ui/Modal";
// import Input from "@/components/ui/Input";
// import { useAuth } from "@/store/auth.store";
// import { BACKEND_ORIGIN } from "@/api/http";

// // ----------------------------
// // helpers
// // ----------------------------
// const LS_KEY = "orbix_settings";

// function loadLocalSettings() {
//   try {
//     const raw = localStorage.getItem(LS_KEY);
//     return raw ? JSON.parse(raw) : {};
//   } catch {
//     return {};
//   }
// }

// function saveLocalSettings(v) {
//   localStorage.setItem(LS_KEY, JSON.stringify(v));
// }

// function initials(u) {
//   const s = (u || "u").trim();
//   return s.slice(0, 2).toUpperCase();
// }

// // If you later add a profile image in DB, this will work.
// function resolveAvatar(url) {
//   if (!url) return "";
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
//   return url;
// }

// // ----------------------------
// // UI pieces
// // ----------------------------
// function Section({ title, desc, children }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <div className="text-sm font-semibold text-white/90">{title}</div>
//           {desc ? <div className="text-xs text-white/50 mt-1">{desc}</div> : null}
//         </div>
//       </div>
//       <div className="mt-4">{children}</div>
//     </div>
//   );
// }

// function Row({ label, hint, right }) {
//   return (
//     <div className="flex items-center justify-between gap-3 py-3 border-b border-white/10 last:border-b-0">
//       <div className="min-w-0">
//         <div className="text-sm text-white/90">{label}</div>
//         {hint ? <div className="text-xs text-white/50 mt-1">{hint}</div> : null}
//       </div>
//       <div className="shrink-0">{right}</div>
//     </div>
//   );
// }

// function Toggle({ checked, onChange, disabled }) {
//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={() => onChange?.(!checked)}
//       className={[
//         "relative h-7 w-12 rounded-full border transition",
//         disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
//         checked ? "bg-indigo-500/30 border-indigo-400/30" : "bg-white/5 border-white/10",
//       ].join(" ")}
//       aria-pressed={checked}
//     >
//       <span
//         className={[
//           "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white/80 shadow transition",
//           checked ? "left-6" : "left-1",
//         ].join(" ")}
//       />
//     </button>
//   );
// }

// function SmallBtn({ children, onClick, variant = "ghost", className = "", disabled }) {
//   const base =
//     "text-sm px-3 py-1.5 rounded-xl border transition whitespace-nowrap";
//   const styles =
//     variant === "primary"
//       ? "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30"
//       : variant === "danger"
//       ? "border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/20"
//       : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10";

//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={onClick}
//       className={[
//         base,
//         styles,
//         disabled ? "opacity-50 cursor-not-allowed" : "",
//         className,
//       ].join(" ")}
//     >
//       {children}
//     </button>
//   );
// }

// // ----------------------------
// // Main Settings Page
// // ----------------------------
// export default function Settings() {
//   const { user, logout } = useAuth();

//   // local-only settings (works immediately)
//   const [local, setLocal] = useState(() => ({
//     theme: "dark",
//     privateAccount: false,
//     showActivityStatus: true,
//     allowTagging: true,
//     allowMentions: true,
//     autoplayVideos: true,
//     reduceMotion: false,
//     ...loadLocalSettings(),
//   }));

//   // modals
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openPassword, setOpenPassword] = useState(false);
//   const [openBlocked, setOpenBlocked] = useState(false);

//   // edit profile form (UI-ready; wire API later)
//   const [editName, setEditName] = useState(user?.name || "");
//   const [editBio, setEditBio] = useState(user?.bio || "");
//   const [editWebsite, setEditWebsite] = useState(user?.website || "");
//   const [saving, setSaving] = useState(false);
//   const [msg, setMsg] = useState("");

//   // password form (UI-ready; wire API later)
//   const [curPw, setCurPw] = useState("");
//   const [newPw, setNewPw] = useState("");
//   const [pwMsg, setPwMsg] = useState("");
//   const [pwSaving, setPwSaving] = useState(false);

//   // blocked users (UI-ready; wire API later)
//   const blockedDemo = useMemo(
//     () => [
//       { _id: "b1", username: "spam_account_01" },
//       { _id: "b2", username: "toxic_user" },
//     ],
//     []
//   );

//   useEffect(() => {
//     // persist local settings
//     saveLocalSettings(local);

//     // apply quick theme switches (basic)
//     // You can later move this to a global ThemeProvider.
//     document.documentElement.classList.toggle("orbix-light", local.theme === "light");
//   }, [local]);

//   useEffect(() => {
//     // keep edit form updated when user changes
//     setEditName(user?.name || "");
//     setEditBio(user?.bio || "");
//     setEditWebsite(user?.website || "");
//   }, [user]);

//   const avatarUrl = resolveAvatar(user?.avatar_url || user?.avatarUrl);

//   // ----------------------------
//   // Actions (UI now; API later)
//   // ----------------------------
//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     setSaving(true);

//     try {
//       // TODO: wire backend endpoint:
//       // await updateProfile(token, { name: editName, bio: editBio, website: editWebsite })
//       await new Promise((r) => setTimeout(r, 600));
//       setMsg("Saved (UI-only). Add backend endpoint to persist.");
//       setOpenEdit(false);
//     } catch (err) {
//       setMsg(err?.message || "Failed to save profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const changePassword = async (e) => {
//     e.preventDefault();
//     setPwMsg("");
//     setPwSaving(true);

//     try {
//       // TODO: wire backend endpoint:
//       // await changePassword(token, { current: curPw, next: newPw })
//       await new Promise((r) => setTimeout(r, 600));
//       setPwMsg("Password updated (UI-only). Add backend endpoint to persist.");
//       setCurPw("");
//       setNewPw("");
//       setOpenPassword(false);
//     } catch (err) {
//       setPwMsg(err?.message || "Failed to update password");
//     } finally {
//       setPwSaving(false);
//     }
//   };

//   // ----------------------------
//   // Render
//   // ----------------------------
//   return (
//     <section className="space-y-4">
//       {/* header */}
//       <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
//         <div className="flex items-center gap-4">
//           {/* avatar */}
//           {avatarUrl ? (
//             <img
//               src={avatarUrl}
//               alt="avatar"
//               className="h-14 w-14 rounded-full object-cover border border-white/10"
//             />
//           ) : (
//             <div className="h-14 w-14 rounded-full bg-white/10 grid place-items-center text-sm font-semibold">
//               {initials(user?.username)}
//             </div>
//           )}

//           <div className="min-w-0">
//             <div className="text-lg font-semibold text-white/90">Settings</div>
//             <div className="text-sm text-white/60">
//               Logged in as <span className="text-white">@{user?.username}</span>
//             </div>
//           </div>

//           <div className="ml-auto flex gap-2">
//             <SmallBtn onClick={() => setOpenEdit(true)}>Edit profile</SmallBtn>
//             <SmallBtn onClick={() => setOpenPassword(true)}>Password</SmallBtn>
//           </div>
//         </div>

//         {msg ? <div className="mt-3 text-sm text-white/70">{msg}</div> : null}
//       </div>

//       {/* Account */}
//       <Section
//         title="Account"
//         desc="Manage profile, password, and account-related controls."
//       >
//         <Row
//           label="Edit profile"
//           hint="Update name, bio, and website."
//           right={<SmallBtn onClick={() => setOpenEdit(true)}>Open</SmallBtn>}
//         />
//         <Row
//           label="Change password"
//           hint="Keep your account secure."
//           right={<SmallBtn onClick={() => setOpenPassword(true)}>Open</SmallBtn>}
//         />
//         <Row
//           label="Blocked accounts"
//           hint="Manage people you’ve blocked."
//           right={<SmallBtn onClick={() => setOpenBlocked(true)}>View</SmallBtn>}
//         />
//       </Section>

//       {/* Privacy */}
//       <Section
//         title="Privacy"
//         desc="Instagram-like privacy controls (local now; connect backend later)."
//       >
//         <Row
//           label="Private account"
//           hint="Only approved followers can see your posts."
//           right={
//             <Toggle
//               checked={local.privateAccount}
//               onChange={(v) => setLocal((s) => ({ ...s, privateAccount: v }))}
//             />
//           }
//         />
//         <Row
//           label="Activity status"
//           hint="Allow accounts you follow to see when you’re active."
//           right={
//             <Toggle
//               checked={local.showActivityStatus}
//               onChange={(v) => setLocal((s) => ({ ...s, showActivityStatus: v }))}
//             />
//           }
//         />
//         <Row
//           label="Allow mentions"
//           hint="Allow people to mention you."
//           right={
//             <Toggle
//               checked={local.allowMentions}
//               onChange={(v) => setLocal((s) => ({ ...s, allowMentions: v }))}
//             />
//           }
//         />
//         <Row
//           label="Allow tagging"
//           hint="Allow people to tag you in posts."
//           right={
//             <Toggle
//               checked={local.allowTagging}
//               onChange={(v) => setLocal((s) => ({ ...s, allowTagging: v }))}
//             />
//           }
//         />
//       </Section>

//       {/* Notifications */}
//       <Section
//         title="Notifications"
//         desc="Choose what you want to be notified about."
//       >
//         <Row
//           label="Likes"
//           hint="Notify when someone likes your post."
//           right={<Toggle checked onChange={() => {}} disabled />}
//         />
//         <Row
//           label="Comments"
//           hint="Notify when someone comments on your post."
//           right={<Toggle checked onChange={() => {}} disabled />}
//         />
//         <Row
//           label="New followers"
//           hint="Notify when someone follows you."
//           right={<Toggle checked onChange={() => {}} disabled />}
//         />
//         <div className="text-xs text-white/40 mt-2">
//           These toggles will become real once your Notifications API is fully wired.
//         </div>
//       </Section>

//       {/* Preferences */}
//       <Section title="Preferences" desc="App behavior and accessibility.">
//         <Row
//           label="Theme"
//           hint="Dark / Light (light UI needs global styles)."
//           right={
//             <div className="flex gap-2">
//               <SmallBtn
//                 variant={local.theme === "dark" ? "primary" : "ghost"}
//                 onClick={() => setLocal((s) => ({ ...s, theme: "dark" }))}
//               >
//                 Dark
//               </SmallBtn>
//               <SmallBtn
//                 variant={local.theme === "light" ? "primary" : "ghost"}
//                 onClick={() => setLocal((s) => ({ ...s, theme: "light" }))}
//               >
//                 Light
//               </SmallBtn>
//             </div>
//           }
//         />
//         <Row
//           label="Autoplay videos"
//           hint="Auto play videos in feed."
//           right={
//             <Toggle
//               checked={local.autoplayVideos}
//               onChange={(v) => setLocal((s) => ({ ...s, autoplayVideos: v }))}
//             />
//           }
//         />
//         <Row
//           label="Reduce motion"
//           hint="Fewer animations."
//           right={
//             <Toggle
//               checked={local.reduceMotion}
//               onChange={(v) => setLocal((s) => ({ ...s, reduceMotion: v }))}
//             />
//           }
//         />
//       </Section>

//       {/* Danger Zone */}
//       <Section title="Danger Zone" desc="Be careful with these actions.">
//         <div className="flex flex-col sm:flex-row gap-2">
//           <SmallBtn
//             variant="danger"
//             onClick={logout}
//             className="w-full sm:w-auto"
//           >
//             Logout
//           </SmallBtn>

//           <SmallBtn
//             variant="ghost"
//             onClick={() => alert("Add Delete Account endpoint in backend, then wire it here.")}
//             className="w-full sm:w-auto"
//           >
//             Delete account (later)
//           </SmallBtn>
//         </div>
//       </Section>

//       {/* -------------------- MODALS -------------------- */}

//       {/* Edit profile modal */}
//       <Modal
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         title="Edit profile"
//       >
//         <form onSubmit={saveProfile} className="space-y-3">
//           <div>
//             <div className="text-xs text-white/50 mb-1">Name</div>
//             <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Your name" />
//           </div>
//           <div>
//             <div className="text-xs text-white/50 mb-1">Bio</div>
//             <Input value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Write something..." />
//           </div>
//           <div>
//             <div className="text-xs text-white/50 mb-1">Website</div>
//             <Input
//               value={editWebsite}
//               onChange={(e) => setEditWebsite(e.target.value)}
//               placeholder="https://your-site.com"
//             />
//           </div>

//           <div className="pt-2 flex gap-2">
//             <Button type="submit" className="flex-1" disabled={saving}>
//               {saving ? "Saving..." : "Save"}
//             </Button>
//             <Button
//               type="button"
//               className="flex-1 bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
//               onClick={() => setOpenEdit(false)}
//             >
//               Cancel
//             </Button>
//           </div>

//           <div className="text-xs text-white/40">
//             To make it real, create backend: <span className="text-white/70">PATCH /api/users/me</span>
//           </div>
//         </form>
//       </Modal>

//       {/* Password modal */}
//       <Modal
//         open={openPassword}
//         onClose={() => setOpenPassword(false)}
//         title="Change password"
//       >
//         <form onSubmit={changePassword} className="space-y-3">
//           {pwMsg ? <div className="text-sm text-white/70">{pwMsg}</div> : null}

//           <div>
//             <div className="text-xs text-white/50 mb-1">Current password</div>
//             <Input
//               type="password"
//               value={curPw}
//               onChange={(e) => setCurPw(e.target.value)}
//               placeholder="Current password"
//             />
//           </div>

//           <div>
//             <div className="text-xs text-white/50 mb-1">New password</div>
//             <Input
//               type="password"
//               value={newPw}
//               onChange={(e) => setNewPw(e.target.value)}
//               placeholder="New password"
//             />
//           </div>

//           <div className="pt-2 flex gap-2">
//             <Button type="submit" className="flex-1" disabled={pwSaving}>
//               {pwSaving ? "Updating..." : "Update"}
//             </Button>
//             <Button
//               type="button"
//               className="flex-1 bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
//               onClick={() => setOpenPassword(false)}
//             >
//               Cancel
//             </Button>
//           </div>

//           <div className="text-xs text-white/40">
//             To make it real, create backend: <span className="text-white/70">POST /api/users/change-password</span>
//           </div>
//         </form>
//       </Modal>

//       {/* Blocked accounts modal */}
//       <Modal
//         open={openBlocked}
//         onClose={() => setOpenBlocked(false)}
//         title="Blocked accounts"
//       >
//         <div className="space-y-3">
//           {blockedDemo.map((u) => (
//             <div key={u._id} className="flex items-center justify-between gap-3">
//               <div className="flex items-center gap-3 min-w-0">
//                 <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
//                   {initials(u.username)}
//                 </div>
//                 <div className="min-w-0">
//                   <div className="text-sm font-medium truncate">@{u.username}</div>
//                   <div className="text-xs text-white/50 truncate">Blocked</div>
//                 </div>
//               </div>

//               <SmallBtn
//                 onClick={() => alert("Wire /api/users/unblock later")}
//                 variant="ghost"
//               >
//                 Unblock
//               </SmallBtn>
//             </div>
//           ))}

//           <div className="text-xs text-white/40 pt-2">
//             To make it real, create backend:{" "}
//             <span className="text-white/70">GET /api/users/blocked</span>,{" "}
//             <span className="text-white/70">POST /api/users/block</span>,{" "}
//             <span className="text-white/70">POST /api/users/unblock</span>
//           </div>
//         </div>
//       </Modal>
//     </section>
//   );
// }

// src/pages/Settings.jsx
import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/store/auth.store";

import {
  updateMe,
  changePassword as changePasswordApi,
  getBlockedUsers,
  unblockUser,
} from "@/api/users.api";

// ----------------------------
// helpers
// ----------------------------
const LS_KEY = "orbix_settings";

function loadLocalSettings() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveLocalSettings(v) {
  localStorage.setItem(LS_KEY, JSON.stringify(v));
}
function initials(u) {
  const s = (u || "u").trim();
  return s.slice(0, 2).toUpperCase();
}

function Section({ title, desc, children }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white/90 dark:text-white/90">
            {title}
          </div>
          {desc ? (
            <div className="text-xs text-white/50 dark:text-white/50 mt-1">
              {desc}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Row({ label, hint, right }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-white/10 last:border-b-0">
      <div className="min-w-0">
        <div className="text-sm text-white/90 dark:text-white/90">{label}</div>
        {hint ? (
          <div className="text-xs text-white/50 dark:text-white/50 mt-1">
            {hint}
          </div>
        ) : null}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={[
        "relative h-7 w-12 rounded-full border transition",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        checked
          ? "bg-indigo-500/30 border-indigo-400/30"
          : "bg-white/5 border-white/10",
      ].join(" ")}
      aria-pressed={checked}
    >
      <span
        className={[
          "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white/90 shadow transition",
          checked ? "left-6" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

function SmallBtn({ children, onClick, variant = "ghost", disabled }) {
  const base = "text-sm px-3 py-1.5 rounded-xl border transition whitespace-nowrap";
  const styles =
    variant === "primary"
      ? "border-indigo-400/30 bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30"
      : variant === "danger"
      ? "border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/20"
      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[base, styles, disabled ? "opacity-50 cursor-not-allowed" : ""].join(" ")}
    >
      {children}
    </button>
  );
}

// ----------------------------
// Main
// ----------------------------
export default function Settings() {
  const { user, token, logout, setUser } = useAuth();

  // local settings
  const [local, setLocal] = useState(() => ({
    theme: "dark",
    privateAccount: false,
    showActivityStatus: true,
    allowTagging: true,
    allowMentions: true,
    autoplayVideos: true,
    reduceMotion: false,
    ...loadLocalSettings(),
  }));

  // modals
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openBlocked, setOpenBlocked] = useState(false);

  // edit profile
  const [editName, setEditName] = useState(user?.name || "");
  const [editBio, setEditBio] = useState(user?.bio || "");
  const [editWebsite, setEditWebsite] = useState(user?.website || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // password
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  // blocked
  const [blocked, setBlocked] = useState([]);
  const [blockedLoading, setBlockedLoading] = useState(false);
  const [blockedErr, setBlockedErr] = useState("");

  useEffect(() => {
    saveLocalSettings(local);

    // ✅ Tailwind dark mode class
    const root = document.documentElement;
    if (local.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [local]);

  useEffect(() => {
    setEditName(user?.name || "");
    setEditBio(user?.bio || "");
    setEditWebsite(user?.website || "");
  }, [user]);

  const loadBlocked = async () => {
    if (!token) return;
    try {
      setBlockedErr("");
      setBlockedLoading(true);
      const data = await getBlockedUsers(token);
      setBlocked(data.users || []);
    } catch (e) {
      setBlockedErr(e?.message || "Failed to load blocked users");
    } finally {
      setBlockedLoading(false);
    }
  };

  // Save profile (REAL)
  const saveProfile = async (e) => {
    e.preventDefault();
    if (!token) return;

    setMsg("");
    setSaving(true);

    try {
      const data = await updateMe(token, {
        name: editName,
        bio: editBio,
        website: editWebsite,
      });

      // ✅ update auth store user immediately
      if (data?.user) setUser?.(data.user);

      setMsg("Profile updated ✅");
      setOpenEdit(false);
    } catch (err) {
      setMsg(err?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  // Change password (REAL)
  const changePassword = async (e) => {
    e.preventDefault();
    if (!token) return;

    setPwMsg("");
    setPwSaving(true);

    try {
      await changePasswordApi(token, { currentPassword: curPw, newPassword: newPw });
      setPwMsg("Password updated ✅");
      setCurPw("");
      setNewPw("");
      setOpenPassword(false);
    } catch (err) {
      setPwMsg(err?.message || "Failed to update password");
    } finally {
      setPwSaving(false);
    }
  };

  const onOpenBlocked = async () => {
    setOpenBlocked(true);
    await loadBlocked();
  };

  const onUnblock = async (username) => {
    if (!token) return;

    // optimistic
    setBlocked((prev) => prev.filter((u) => u.username !== username));

    try {
      await unblockUser(token, username);
    } catch (e) {
      // rollback by reloading
      await loadBlocked();
    }
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-white/10 grid place-items-center text-sm font-semibold">
            {initials(user?.username)}
          </div>

          <div className="min-w-0">
            <div className="text-lg font-semibold">Settings</div>
            <div className="text-sm text-white/60">
              Logged in as <span className="text-white">@{user?.username}</span>
            </div>
          </div>

          <div className="ml-auto hidden sm:flex gap-2">
            <SmallBtn onClick={() => setOpenEdit(true)}>Edit profile</SmallBtn>
            <SmallBtn onClick={() => setOpenPassword(true)}>Password</SmallBtn>
          </div>
        </div>

        {msg ? <div className="mt-3 text-sm text-white/70">{msg}</div> : null}
      </div>

      {/* Account */}
      <Section title="Account" desc="Manage profile, password and blocked accounts.">
        <Row
          label="Edit profile"
          hint="Update name, bio and website."
          right={<SmallBtn onClick={() => setOpenEdit(true)}>Open</SmallBtn>}
        />
        <Row
          label="Change password"
          hint="Keep your account secure."
          right={<SmallBtn onClick={() => setOpenPassword(true)}>Open</SmallBtn>}
        />
        <Row
          label="Blocked accounts"
          hint="Manage people you’ve blocked."
          right={<SmallBtn onClick={onOpenBlocked}>View</SmallBtn>}
        />
      </Section>

      {/* Privacy (local now; backend later) */}
      <Section title="Privacy" desc="Instagram-like privacy controls (local).">
        <Row
          label="Private account"
          hint="Only approved followers can see your posts."
          right={
            <Toggle
              checked={local.privateAccount}
              onChange={(v) => setLocal((s) => ({ ...s, privateAccount: v }))}
            />
          }
        />
        <Row
          label="Activity status"
          hint="Allow accounts you follow to see when you’re active."
          right={
            <Toggle
              checked={local.showActivityStatus}
              onChange={(v) => setLocal((s) => ({ ...s, showActivityStatus: v }))}
            />
          }
        />
        <Row
          label="Allow mentions"
          hint="Allow people to mention you."
          right={
            <Toggle
              checked={local.allowMentions}
              onChange={(v) => setLocal((s) => ({ ...s, allowMentions: v }))}
            />
          }
        />
        <Row
          label="Allow tagging"
          hint="Allow people to tag you in posts."
          right={
            <Toggle
              checked={local.allowTagging}
              onChange={(v) => setLocal((s) => ({ ...s, allowTagging: v }))}
            />
          }
        />
      </Section>

      {/* Preferences */}
      <Section title="Preferences" desc="Theme and app behavior.">
        <Row
          label="Theme"
          hint="Dark / Light (fully working)"
          right={
            <div className="flex gap-2">
              <SmallBtn
                variant={local.theme === "dark" ? "primary" : "ghost"}
                onClick={() => setLocal((s) => ({ ...s, theme: "dark" }))}
              >
                Dark
              </SmallBtn>
              <SmallBtn
                variant={local.theme === "light" ? "primary" : "ghost"}
                onClick={() => setLocal((s) => ({ ...s, theme: "light" }))}
              >
                Light
              </SmallBtn>
            </div>
          }
        />
        <Row
          label="Autoplay videos"
          hint="Auto play videos in feed."
          right={
            <Toggle
              checked={local.autoplayVideos}
              onChange={(v) => setLocal((s) => ({ ...s, autoplayVideos: v }))}
            />
          }
        />
        <Row
          label="Reduce motion"
          hint="Fewer animations."
          right={
            <Toggle
              checked={local.reduceMotion}
              onChange={(v) => setLocal((s) => ({ ...s, reduceMotion: v }))}
            />
          }
        />
      </Section>

      {/* Danger */}
      <Section title="Danger Zone" desc="Be careful with these actions.">
        <div className="flex flex-col sm:flex-row gap-2">
          <SmallBtn variant="danger" onClick={logout} className="w-full sm:w-auto">
            Logout
          </SmallBtn>
        </div>
      </Section>

      {/* -------------------- MODALS -------------------- */}

      {/* Edit profile */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Edit profile">
        <form onSubmit={saveProfile} className="space-y-3">
          <div>
            <div className="text-xs text-white/50 mb-1">Name</div>
            <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
          </div>
          <div>
            <div className="text-xs text-white/50 mb-1">Bio</div>
            <Input value={editBio} onChange={(e) => setEditBio(e.target.value)} />
          </div>
          <div>
            <div className="text-xs text-white/50 mb-1">Website</div>
            <Input value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} />
          </div>

          <div className="pt-2 flex gap-2">
            <Button type="submit" className="flex-1" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              className="flex-1 bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
              onClick={() => setOpenEdit(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Password */}
      <Modal open={openPassword} onClose={() => setOpenPassword(false)} title="Change password">
        <form onSubmit={changePassword} className="space-y-3">
          {pwMsg ? <div className="text-sm text-white/70">{pwMsg}</div> : null}

          <div>
            <div className="text-xs text-white/50 mb-1">Current password</div>
            <Input type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} />
          </div>

          <div>
            <div className="text-xs text-white/50 mb-1">New password</div>
            <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
          </div>

          <div className="pt-2 flex gap-2">
            <Button type="submit" className="flex-1" disabled={pwSaving}>
              {pwSaving ? "Updating..." : "Update"}
            </Button>
            <Button
              type="button"
              className="flex-1 bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
              onClick={() => setOpenPassword(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Blocked */}
      <Modal open={openBlocked} onClose={() => setOpenBlocked(false)} title="Blocked accounts">
        <div className="space-y-3">
          {blockedLoading ? (
            <div className="text-sm text-white/60">Loading…</div>
          ) : blockedErr ? (
            <div className="text-sm text-red-300">{blockedErr}</div>
          ) : blocked.length === 0 ? (
            <div className="text-sm text-white/60">No blocked accounts.</div>
          ) : (
            blocked.map((u) => (
              <div key={u._id || u.username} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-xs font-semibold">
                    {initials(u.username)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">@{u.username}</div>
                    <div className="text-xs text-white/50 truncate">Blocked</div>
                  </div>
                </div>

                <SmallBtn onClick={() => onUnblock(u.username)} variant="ghost">
                  Unblock
                </SmallBtn>
              </div>
            ))
          )}

          <div className="pt-2">
            <SmallBtn onClick={loadBlocked}>Refresh</SmallBtn>
          </div>
        </div>
      </Modal>
    </section>
  );
}