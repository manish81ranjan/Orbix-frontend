// // import React, { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";

// // import { useAuth } from "@/store/auth.store";
// // import { getPostById } from "@/api/posts.api";

// // import PostHeader from "@/components/feed/PostHeader";
// // import PostMedia from "@/components/feed/PostMedia";
// // import PostActions from "@/components/feed/PostActions";
// // import PostCaption from "@/components/feed/PostCaption";
// // import CommentList from "@/components/feed/CommentList";

// // import Input from "@/components/ui/Input";
// // import Button from "@/components/ui/Button";

// // /**
// //  * PostDetails
// //  * - Shows a single post
// //  * - Comments UI (placeholder list + add box)
// //  * - Later connect to real comment API endpoints
// //  */
// // export default function PostDetails() {
// //   const { id } = useParams();
// //   const { token } = useAuth();

// //   const [post, setPost] = useState(null);
// //   const [comments, setComments] = useState([]);
// //   const [text, setText] = useState("");

// //   const [loading, setLoading] = useState(true);
// //   const [err, setErr] = useState("");

// //   useEffect(() => {
// //     let mounted = true;

// //     const load = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await getPostById(token, id);
// //         if (!mounted) return;

// //         setPost(data.post);

// //         // Placeholder comments for now (backend comments later)
// //         setComments([
// //           {
// //             _id: "c1",
// //             authorUsername: "orbix_team",
// //             text: "Welcome to Orbix ✨",
// //             createdAt: new Date().toISOString()
// //           }
// //         ]);
// //       } catch (e) {
// //         if (mounted) setErr(e.message || "Failed to load post");
// //       } finally {
// //         if (mounted) setLoading(false);
// //       }
// //     };

// //     load();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, [token, id]);

// //   const addComment = (e) => {
// //     e.preventDefault();
// //     const val = text.trim();
// //     if (!val) return;

// //     setComments((prev) => [
// //       ...prev,
// //       {
// //         _id: "c_" + Date.now(),
// //         authorUsername: "you",
// //         text: val,
// //         createdAt: new Date().toISOString()
// //       }
// //     ]);
// //     setText("");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="space-y-4">
// //         <div className="h-40 rounded-2xl bg-card border border-border animate-pulse" />
// //         <div className="h-72 rounded-2xl bg-card border border-border animate-pulse" />
// //       </div>
// //     );
// //   }

// //   if (err) {
// //     return (
// //       <div className="rounded-2xl border border-border bg-card p-4">
// //         <div className="text-red-300">{err}</div>
// //         <Link className="text-indigo-300 hover:underline text-sm" to="/">
// //           Back to Home
// //         </Link>
// //       </div>
// //     );
// //   }

// //   if (!post) return null;

// //   return (
// //     <section className="space-y-4">
// //       {/* Post */}
// //       <article className="rounded-2xl border border-border bg-card overflow-hidden">
// //         <div className="p-4">
// //           <PostHeader post={post} />
// //         </div>

// //         <PostMedia post={post} />

// //         <div className="p-4 space-y-3">
// //           <PostActions post={post} />
// //           <PostCaption post={post} />
// //         </div>
// //       </article>

// //       {/* Comments */}
// //       <div className="rounded-2xl border border-border bg-card p-4">
// //         <h2 className="text-sm font-medium mb-3">Comments</h2>

// //         <CommentList comments={comments} />

// //         <form onSubmit={addComment} className="mt-4 flex gap-2">
// //           <Input
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             placeholder="Write a comment..."
// //           />
// //           <Button className="shrink-0">Post</Button>
// //         </form>

// //         <div className="mt-2 text-xs text-white/50">
// //           Comments will be connected to backend API next.
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// import { useAuth } from "@/store/auth.store";
// import { getPostById } from "@/api/posts.api";

// import PostHeader from "@/components/feed/PostHeader";
// import PostMedia from "@/components/feed/PostMedia";
// import PostActions from "@/components/feed/PostActions";
// import PostCaption from "@/components/feed/PostCaption";
// import CommentList from "@/components/feed/CommentList";

// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";

// export default function PostDetails() {
//   const { id } = useParams();
//   const { token } = useAuth();

//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const load = async () => {
//       try {
//         setLoading(true);
//         const data = await getPostById(token, id);
//         if (!mounted) return;

//         setPost(data.post);

//         setComments([
//           {
//             _id: "c1",
//             authorUsername: "orbix_team",
//             text: "Welcome to Orbix ✨",
//             createdAt: new Date().toISOString()
//           }
//         ]);
//       } catch (e) {
//         if (mounted) setErr(e.message || "Failed to load post");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [token, id]);

//   const addComment = (e) => {
//     e.preventDefault();
//     const val = text.trim();
//     if (!val) return;

//     setComments((prev) => [
//       ...prev,
//       {
//         _id: "c_" + Date.now(),
//         authorUsername: "you",
//         text: val,
//         createdAt: new Date().toISOString()
//       }
//     ]);
//     setText("");
//   };

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <div className="h-40 rounded-2xl bg-card border border-border animate-pulse" />
//         <div className="h-72 rounded-2xl bg-card border border-border animate-pulse" />
//       </div>
//     );
//   }

//   if (err) {
//     return (
//       <div className="rounded-2xl border border-border bg-card p-4">
//         <div className="text-red-300">{err}</div>
//         <Link className="text-indigo-300 hover:underline text-sm" to="/">
//           Back to Home
//         </Link>
//       </div>
//     );
//   }

//   if (!post) return null;

//   return (
//     <section className="space-y-4">
//       <article className="rounded-2xl border border-border bg-card overflow-hidden">
//         <div className="p-4">
//           <PostHeader post={post} />
//         </div>

//         <PostMedia post={post} />

//         <div className="p-4 space-y-3">
//           <PostActions post={post} />
//           <PostCaption post={post} />
//         </div>
//       </article>

//       <div className="rounded-2xl border border-border bg-card p-4">
//         <h2 className="text-sm font-medium mb-3">Comments</h2>

//         <CommentList comments={comments} />

//         <form onSubmit={addComment} className="mt-4 flex gap-2">
//           <Input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Write a comment..."
//           />
//           <Button className="shrink-0">Post</Button>
//         </form>

//         <div className="mt-2 text-xs text-white/50">
//           Comments will be connected to backend API next.
//         </div>
//       </div>
//     </section>
//   );
// }
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// import { useAuth } from "@/store/auth.store";
// import { getPostById } from "@/api/posts.api";
// import { listComments, addComment } from "@/api/comments.api";

// import PostHeader from "@/components/feed/PostHeader";
// import PostMedia from "@/components/feed/PostMedia";
// import PostActions from "@/components/feed/PostActions";
// import PostCaption from "@/components/feed/PostCaption";
// import CommentList from "@/components/feed/CommentList";

// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";
// import Spinner from "@/components/ui/Spinner";

// export default function PostDetails() {
//   const { id } = useParams();
//   const { token, user } = useAuth();

//   const [post, setPost] = useState(null);

//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   const [commentsLoading, setCommentsLoading] = useState(false);
//   const [commentsErr, setCommentsErr] = useState("");
//   const [posting, setPosting] = useState(false);

//   const postId = useMemo(() => id, [id]);

//   // Load post + comments
//   useEffect(() => {
//     let mounted = true;

//     const load = async () => {
//       if (!token) return;

//       try {
//         setErr("");
//         setLoading(true);

//         const data = await getPostById(token, postId);
//         if (!mounted) return;
//         setPost(data.post);

//         // comments
//         setCommentsErr("");
//         setCommentsLoading(true);
//         const c = await listComments(token, postId);
//         if (!mounted) return;
//         setComments(c.comments || []);
//       } catch (e) {
//         if (!mounted) return;
//         setErr(e.message || "Failed to load post");
//       } finally {
//         if (!mounted) return;
//         setLoading(false);
//         setCommentsLoading(false);
//       }
//     };

//     load();
//     return () => {
//       mounted = false;
//     };
//   }, [token, postId]);

//   const submitComment = async (e) => {
//     e.preventDefault();
//     if (!token) return;

//     const val = text.trim();
//     if (!val) return;

//     const optimistic = {
//       _id: "c_" + Date.now(),
//       authorUsername: user?.username || "you",
//       text: val,
//       createdAt: new Date().toISOString(),
//     };

//     setText("");
//     setComments((prev) => [...prev, optimistic]);
//     setPosting(true);

//     try {
//       const data = await addComment(token, postId, val);
//       // replace optimistic if backend returns real comment
//       if (data?.comment?._id) {
//         setComments((prev) =>
//           prev.map((c) => (c._id === optimistic._id ? data.comment : c))
//         );
//       }
//     } catch (e2) {
//       // rollback optimistic
//       setComments((prev) => prev.filter((c) => c._id !== optimistic._id));
//     } finally {
//       setPosting(false);
//     }
//   };

//   if (!token) {
//     return (
//       <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
//         Please login to view this post.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="mx-auto w-full max-w-[560px] space-y-4">
//         <div className="h-40 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
//         <div className="h-72 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
//       </div>
//     );
//   }

//   if (err) {
//     return (
//       <div className="mx-auto w-full max-w-[560px] rounded-2xl border border-white/10 bg-white/5 p-4">
//         <div className="text-red-300">{err}</div>
//         <Link className="text-indigo-300 hover:underline text-sm" to="/">
//           Back to Home
//         </Link>
//       </div>
//     );
//   }

//   if (!post) return null;

//   return (
//     <section className="mx-auto w-full max-w-[560px] space-y-4">
//       {/* Post */}
//       <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
//         <div className="px-4 py-3">
//           <PostHeader post={post} />
//         </div>

//         <PostMedia post={post} />

//         <div className="px-4 py-3 space-y-2">
//           <PostActions post={post} />
//           <PostCaption post={post} />
//         </div>
//       </article>

//       {/* Comments (Instagram feel: list + input at bottom) */}
//       <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="text-sm font-semibold">Comments</h2>
//           <Link to="/" className="text-xs text-white/60 hover:text-white">
//             Back
//           </Link>
//         </div>

//         {commentsLoading ? (
//           <div className="py-6 flex items-center justify-center">
//             <Spinner />
//           </div>
//         ) : commentsErr ? (
//           <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
//             {commentsErr}
//           </div>
//         ) : (
//           <CommentList comments={comments} />
//         )}

//         <form onSubmit={submitComment} className="mt-4 flex gap-2">
//           <Input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Add a comment…"
//           />
//           <Button disabled={posting || !text.trim()} className="shrink-0">
//             {posting ? "Posting…" : "Post"}
//           </Button>
//         </form>

//         <div className="mt-2 text-xs text-white/50">
//           Comments are now connected to backend ✅
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

export default function PostDetails() {
  const { id } = useParams();
  const { token, user } = useAuth();

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsErr, setCommentsErr] = useState("");
  const [posting, setPosting] = useState(false);

  const postId = useMemo(() => id, [id]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!token) return;

      try {
        setErr("");
        setLoading(true);

        const data = await getPostById(token, postId);
        if (!mounted) return;
        setPost(data.post);

        setCommentsErr("");
        setCommentsLoading(true);

        const c = await listComments(token, postId);
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
  }, [token, postId]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!token) return;

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
      const data = await addComment(token, postId, val);
      if (data?.comment?._id) {
        setComments((prev) =>
          prev.map((c) => (c._id === optimistic._id ? data.comment : c))
        );
      }
    } catch (e2) {
      setComments((prev) => prev.filter((c) => c._id !== optimistic._id));
    } finally {
      setPosting(false);
    }
  };

  if (!token) {
    return (
      <div className="glass-card p-6 text-white/70 text-center">
        Please login to view this post.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[620px] space-y-5">
        <div className="glass-card p-5 animate-pulse space-y-4">
          <div className="h-6 w-40 bg-white/10 rounded-lg" />
          <div className="h-80 bg-white/10 rounded-2xl" />
          <div className="h-4 w-56 bg-white/10 rounded-lg" />
        </div>
        <div className="glass-card p-5 animate-pulse space-y-3">
          <div className="h-5 w-28 bg-white/10 rounded-lg" />
          <div className="h-20 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="mx-auto w-full max-w-[620px] glass-card p-6">
        <div className="text-red-300">{err}</div>
        <Link
          className="inline-block mt-3 text-indigo-300 hover:underline text-sm"
          to="/"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (!post) return null;

  return (
    <section className="mx-auto w-full max-w-[620px] space-y-5">
      {/* Post */}
      <article className="glass-card overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10">
          <PostHeader post={post} />
        </div>

        {/* Media */}
        <PostMedia post={post} />

        {/* Actions + caption */}
        <div className="px-5 py-4 space-y-3">
          <PostActions post={post} />
          <PostCaption post={post} />
        </div>
      </article>

      {/* Comments */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Comments</h2>
          <Link to="/" className="text-xs text-white/60 hover:text-white">
            Back
          </Link>
        </div>

        <div className="glass-soft rounded-2xl border border-white/10 p-4">
          {commentsLoading ? (
            <div className="py-8 flex items-center justify-center">
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

        <form onSubmit={submitComment} className="mt-4 flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            className="rounded-2xl"
          />
          <Button
            disabled={posting || !text.trim()}
            className="shrink-0 rounded-2xl bg-indigo-500/20 border-indigo-400/30 hover:bg-indigo-500/30"
          >
            {posting ? "Posting…" : "Post"}
          </Button>
        </form>

        <div className="mt-2 text-xs text-white/50">
          Comments are connected to backend ✅
        </div>
      </div>
    </section>
  );
}