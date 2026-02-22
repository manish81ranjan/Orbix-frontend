import React, { useMemo, useState } from "react";

function Avatar({ name }) {
  const initials = (name || "User")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500/35 to-purple-500/35 border border-white/10 grid place-items-center text-xs font-semibold shadow-md">
      {initials}
    </div>
  );
}

function ChatRow({ chat, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left flex items-center gap-3 rounded-2xl px-3 py-2 transition",
        active ? "bg-white/10" : "hover:bg-white/5",
      ].join(" ")}
    >
      <Avatar name={chat.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-semibold truncate">{chat.name}</div>
          <div className="text-xs text-white/40 shrink-0">{chat.time}</div>
        </div>
        <div className="text-xs text-white/55 truncate">{chat.last}</div>
      </div>

      {chat.unread > 0 && (
        <div className="ml-2 h-6 min-w-6 px-2 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 text-xs grid place-items-center">
          {chat.unread}
        </div>
      )}
    </button>
  );
}

function Bubble({ me, text, time }) {
  return (
    <div className={["flex", me ? "justify-end" : "justify-start"].join(" ")}>
      <div
        className={[
          "max-w-[80%] rounded-2xl px-4 py-2 border",
          me
            ? "bg-indigo-500/20 border-indigo-400/30 text-white"
            : "bg-white/5 border-white/10 text-white/90",
        ].join(" ")}
      >
        <div className="text-sm leading-relaxed">{text}</div>
        <div className={["mt-1 text-[11px]", me ? "text-white/60" : "text-white/40"].join(" ")}>
          {time}
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  // Mock chats (replace later with API)
  const chats = useMemo(
    () => [
      {
        id: "c1",
        name: "Daniel Parker",
        time: "2m",
        last: "Are we posting today?",
        unread: 2,
        messages: [
          { me: false, text: "Hey! Are we posting today?", time: "5:18 PM" },
          { me: true, text: "Yep, I’m finishing the UI. Posting soon 🔥", time: "5:19 PM" },
          { me: false, text: "Perfect. Send me the link when done.", time: "5:20 PM" },
        ],
      },
      {
        id: "c2",
        name: "Sophie",
        time: "15m",
        last: "That UI looks insane 🔥",
        unread: 0,
        messages: [
          { me: false, text: "That UI looks insane 🔥", time: "5:05 PM" },
          { me: true, text: "Thanks! Glass + gradients are the vibe 😄", time: "5:06 PM" },
        ],
      },
      {
        id: "c3",
        name: "James",
        time: "1h",
        last: "Send me the repo link",
        unread: 1,
        messages: [
          { me: false, text: "Send me the repo link", time: "4:10 PM" },
          { me: true, text: "Sure — sending in a few minutes.", time: "4:12 PM" },
        ],
      },
      {
        id: "c4",
        name: "Ava Stone",
        time: "3h",
        last: "Can you review my post?",
        unread: 0,
        messages: [
          { me: false, text: "Can you review my post?", time: "2:21 PM" },
          { me: true, text: "Yes, share it here.", time: "2:24 PM" },
        ],
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(chats[0]?.id);
  const [draft, setDraft] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeChat = chats.find((c) => c.id === activeId) || chats[0];

  const send = () => {
    const msg = draft.trim();
    if (!msg) return;
    // UI-only demo: We won't mutate mock list to keep code simple & stable.
    // Hook your API here later.
    setDraft("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* LEFT: Chat list */}
      <section className={["lg:col-span-4", mobileOpen ? "hidden lg:block" : ""].join(" ")}>
        <div className="glass-card p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-semibold">Messages</div>
              <div className="text-xs text-white/50">Your conversations</div>
            </div>
            <button className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition">
              New Chat
            </button>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="flex items-center gap-2 rounded-2xl glass-soft px-3 py-2">
              <span className="text-white/50 text-sm">🔎</span>
              <input
                placeholder="Search messages"
                className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40"
              />
            </div>
          </div>

          {/* List */}
          <div className="mt-4 space-y-1">
            {chats.map((c) => (
              <ChatRow
                key={c.id}
                chat={c}
                active={c.id === activeId}
                onClick={() => {
                  setActiveId(c.id);
                  setMobileOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT: Conversation */}
      <section className={["lg:col-span-8", mobileOpen ? "" : "hidden lg:block"].join(" ")}>
        <div className="glass-card p-4 flex flex-col h-[70vh] lg:h-[75vh]">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile back */}
              <button
                onClick={() => setMobileOpen(false)}
                className="lg:hidden rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm hover:bg-white/10 transition"
              >
                ←
              </button>

              <Avatar name={activeChat?.name} />
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{activeChat?.name}</div>
                <div className="text-xs text-white/50">Active now</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition grid place-items-center">
                📞
              </button>
              <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition grid place-items-center">
                🎥
              </button>
              <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition grid place-items-center">
                ⋯
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-3">
            {(activeChat?.messages || []).map((m, idx) => (
              <Bubble key={idx} me={m.me} text={m.text} time={m.time} />
            ))}

            {/* Empty state (if no messages) */}
            {!activeChat?.messages?.length && (
              <div className="h-full grid place-items-center text-white/50 text-sm">
                No messages yet.
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-end gap-2">
              <button className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition grid place-items-center">
                ➕
              </button>

              <div className="flex-1 rounded-2xl glass-soft px-3 py-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={1}
                  placeholder="Write a message…"
                  className="w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/40 resize-none"
                />
              </div>

              <button
                onClick={send}
                className="h-11 px-4 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-100 hover:bg-indigo-500/30 transition text-sm font-semibold"
              >
                Send
              </button>
            </div>

            <div className="mt-2 text-xs text-white/40">
              Tip: This is UI-only. Connect your API/WebSocket later.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}