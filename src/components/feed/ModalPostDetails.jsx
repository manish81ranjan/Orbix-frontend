// src/components/feed/ModalPostDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "@/components/ui/Modal";
import { useAuth } from "@/store/auth.store";

import { getPostById } from "@/api/posts.api";
import { listComments, addComment } from "@/api/comments.api";

import PostHeader from "@/components/feed/PostHeader";
import PostMedia from "@/components/feed/PostMedia";
import PostActions from "@/components/feed/PostActions";
import PostCaption from "@/components/feed/PostCaption";
import CommentList from "@/components/feed/CommentList";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export default function ModalPostDetails({ open, onClose, postId }) {
  const { token, user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsErr, setCommentsErr] = useState("");
  const [posting, setPosting] = useState(false);

  const pid = useMemo(() => postId, [postId]);

  // Load post + comments when modal opens
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!open) return;
      if (!token || !pid) return;

      try {
        setErr("");
        setLoading(true);

        const data = await getPostById(token, pid);
        if (!mounted) return;
        setPost(data.post);

        setCommentsErr("");
        setCommentsLoading(true);
        const c = await listComments(token, pid);
        if (!mounted) return;
        setComments(c.comments || []);
      } catch (e) {
        if (!mounted) return;
        setErr(e.message || "Failed to load post");
      } finally {
        if (!mounted) return;
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [open, token, pid]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!token || !pid) return;

    const val = text.trim();
    if (!val) return;

    const optimistic = {
      _id: "c_" + Date.now(),
      authorUsername: user?.username || "you",
      text: val,
      createdAt: new Date().toISOString(),
    };

    setText("");
    setComments((prev) => [...prev, optimistic]);
    setPosting(true);

    try {
      const data = await addComment(token, pid, val);
      if (data?.comment?._id) {
        setComments((prev) =>
          prev.map((c) => (c._id === optimistic._id ? data.comment : c))
        );
      }
    } catch {
      setComments((prev) => prev.filter((c) => c._id !== optimistic._id));
    } finally {
      setPosting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="w-full max-w-[980px]">
        {loading ? (
          <div className="space-y-4">
            <div className="h-10 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            <div className="h-[60vh] rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
          </div>
        ) : err ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-red-300">{err}</div>
            <button
              onClick={onClose}
              className="mt-3 text-sm text-indigo-200 hover:underline"
              type="button"
            >
              Close
            </button>
          </div>
        ) : !post ? null : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {/* LEFT (media) */}
            <div className="bg-black/30 md:min-h-[70vh] flex items-center justify-center">
              <div className="w-full">
                <PostMedia post={post} />
              </div>
            </div>

            {/* RIGHT (details + comments) */}
            <div className="flex flex-col max-h-[70vh]">
              {/* Header */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <PostHeader post={post} />
                <Link
                  to={`/p/${post._id}`}
                  className="text-xs text-white/60 hover:text-white"
                  onClick={onClose}
                >
                  Open
                </Link>
              </div>

              {/* Caption + actions */}
              <div className="px-4 py-3 space-y-2 border-b border-white/10">
                <PostActions post={post} />
                <PostCaption post={post} />
              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold">Comments</div>
                </div>

                {commentsLoading ? (
                  <div className="py-6 flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : commentsErr ? (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                    {commentsErr}
                  </div>
                ) : (
                  <CommentList comments={comments} />
                )}
              </div>

              {/* Composer */}
              <div className="px-4 py-3 border-t border-white/10">
                <form onSubmit={submitComment} className="flex gap-2">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment…"
                  />
                  <Button disabled={posting || !text.trim()} className="shrink-0">
                    {posting ? "Posting…" : "Post"}
                  </Button>
                </form>

                <div className="mt-2 text-[11px] text-white/40">
                  This modal uses your real backend comments ✅
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}