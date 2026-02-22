// import React, { useState } from "react";
// import Textarea from "@/components/ui/Textarea";
// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";
// import { useAuth } from "@/store/auth.store";
// import { createPost } from "@/api/posts.api";

// /**
//  * CreatePost
//  * - Create a new post (caption + mediaUrl for now)
//  * - Later upgrade to real upload (Cloudinary signed upload)
//  */
// export default function CreatePost() {
//   const { token } = useAuth();

//   const [caption, setCaption] = useState("");
//   const [mediaUrl, setMediaUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [okMsg, setOkMsg] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setOkMsg("");
//     setErrMsg("");

//     if (!caption.trim() && !mediaUrl.trim()) {
//       setErrMsg("Add a caption or media URL.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createPost(token, { caption, mediaUrl });
//       setOkMsg("Post created ✅ Go to Home to see it.");
//       setCaption("");
//       setMediaUrl("");
//     } catch (err) {
//       setErrMsg(err.message || "Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="rounded-2xl border border-border bg-card p-4">
//       <h1 className="text-lg font-semibold">Create Post</h1>
//       <p className="text-sm text-white/60 mt-1">
//         Upload system will be added next. For now, paste an image/video URL.
//       </p>

//       <form onSubmit={onSubmit} className="mt-4 space-y-3">
//         <Textarea
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           placeholder="Write your caption..."
//         />

//         <Input
//           value={mediaUrl}
//           onChange={(e) => setMediaUrl(e.target.value)}
//           placeholder="Media URL (https://...)"
//         />

//         <Button
//           disabled={loading}
//           className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30"
//         >
//           {loading ? "Posting..." : "Post"}
//         </Button>

//         {okMsg && (
//           <div className="text-sm text-green-300 rounded-xl border border-green-500/20 bg-green-500/10 p-3">
//             {okMsg}
//           </div>
//         )}

//         {errMsg && (
//           <div className="text-sm text-red-300 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
//             {errMsg}
//           </div>
//         )}
//       </form>
//     </section>
//   );
// }
// import React, { useMemo, useState } from "react";
// import Textarea from "@/components/ui/Textarea";
// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";
// import { createPost } from "@/api/posts.api";

// function isValidUrl(url) {
//   try {
//     const u = new URL(url);
//     return u.protocol === "http:" || u.protocol === "https:";
//   } catch {
//     return false;
//   }
// }

// function guessMediaType(url) {
//   const lower = (url || "").toLowerCase();
//   if (lower.match(/\.(mp4|webm|ogg)(\?|#|$)/)) return "video";
//   if (lower.match(/\.(png|jpg|jpeg|gif|webp|svg)(\?|#|$)/)) return "image";
//   // fallback: unknown - try image preview first
//   return "unknown";
// }

// /**
//  * CreatePost (Professional)
//  * - Caption + Media URL (image/video)
//  * - Preview panel
//  * - Validates URL
//  * - Sends mediaUrl + media_url to backend
//  */
// export default function CreatePost() {
//   const [caption, setCaption] = useState("");
//   const [mediaUrl, setMediaUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [okMsg, setOkMsg] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   const mediaType = useMemo(() => guessMediaType(mediaUrl), [mediaUrl]);

//   const canSubmit = useMemo(() => {
//     const hasCaption = caption.trim().length > 0;
//     const hasUrl = mediaUrl.trim().length > 0;
//     if (!hasCaption && !hasUrl) return false;
//     if (hasUrl && !isValidUrl(mediaUrl.trim())) return false;
//     return true;
//   }, [caption, mediaUrl]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setOkMsg("");
//     setErrMsg("");

//     const cap = caption.trim();
//     const url = mediaUrl.trim();

//     if (!cap && !url) {
//       setErrMsg("Add a caption or a media URL.");
//       return;
//     }

//     if (url && !isValidUrl(url)) {
//       setErrMsg("Please enter a valid URL starting with http:// or https://");
//       return;
//     }

//     try {
//       setLoading(true);

//       await createPost({
//         caption: cap,
//         mediaUrl: url,
//       });

//       setOkMsg("Posted ✅ Go to Home to see it.");
//       setCaption("");
//       setMediaUrl("");
//     } catch (err) {
//       setErrMsg(err?.message || "Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="space-y-4">
//       {/* Header */}
//       <div className="rounded-2xl border border-border bg-card p-5">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-xl font-semibold">Create Post</h1>
//             <p className="text-sm text-white/60 mt-1">
//               Paste an image/video URL for now. Upload system can be added next.
//             </p>
//           </div>

//           <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
//             <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
//               Tip: Use .jpg / .png / .mp4 URLs
//             </span>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {/* Form */}
//           <form onSubmit={onSubmit} className="space-y-3">
//             <div>
//               <label className="text-sm text-white/70">Caption</label>
//               <div className="mt-2">
//                 <Textarea
//                   value={caption}
//                   onChange={(e) => setCaption(e.target.value)}
//                   placeholder="Write your caption..."
//                 />
//               </div>
//               <div className="mt-1 text-xs text-white/50">
//                 {caption.trim().length}/2200
//               </div>
//             </div>

//             <div>
//               <label className="text-sm text-white/70">Media URL</label>
//               <div className="mt-2">
//                 <Input
//                   value={mediaUrl}
//                   onChange={(e) => setMediaUrl(e.target.value)}
//                   placeholder="https://... (image or video link)"
//                 />
//               </div>
//               {mediaUrl.trim() && !isValidUrl(mediaUrl.trim()) && (
//                 <div className="mt-2 text-xs text-red-300">
//                   Invalid URL. Must start with http:// or https://
//                 </div>
//               )}
//             </div>

//             <Button
//               type="submit"
//               disabled={loading || !canSubmit}
//               className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Posting..." : "Post"}
//             </Button>

//             {okMsg && (
//               <div className="text-sm text-green-300 rounded-xl border border-green-500/20 bg-green-500/10 p-3">
//                 {okMsg}
//               </div>
//             )}

//             {errMsg && (
//               <div className="text-sm text-red-300 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
//                 {errMsg}
//               </div>
//             )}
//           </form>

//           {/* Preview */}
//           <div className="rounded-2xl border border-border bg-black/20 p-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-sm font-medium text-white/80">Preview</h2>
//               <span className="text-xs text-white/50">
//                 {mediaUrl.trim()
//                   ? mediaType === "video"
//                     ? "Video"
//                     : mediaType === "image"
//                     ? "Image"
//                     : "Auto"
//                   : "No media"}
//               </span>
//             </div>

//             <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 overflow-hidden min-h-[240px] flex items-center justify-center">
//               {!mediaUrl.trim() ? (
//                 <div className="text-sm text-white/50 px-6 text-center">
//                   Add a media URL to preview it here.
//                 </div>
//               ) : mediaType === "video" ? (
//                 <video
//                   src={mediaUrl.trim()}
//                   controls
//                   className="w-full h-full max-h-[420px] object-contain"
//                 />
//               ) : (
//                 <img
//                   src={mediaUrl.trim()}
//                   alt="preview"
//                   className="w-full h-full max-h-[420px] object-contain"
//                   onError={(e) => {
//                     // If image fails and it might be video, show message
//                     e.currentTarget.style.display = "none";
//                   }}
//                 />
//               )}
//             </div>

//             <div className="mt-3">
//               <div className="text-xs text-white/60">What will be posted:</div>
//               <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3">
//                 <div className="text-sm text-white/80">
//                   {caption.trim() ? caption.trim() : "No caption"}
//                 </div>
//                 {mediaUrl.trim() && (
//                   <div className="mt-2 text-xs text-white/50 break-all">
//                     {mediaUrl.trim()}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React, { useMemo, useState } from "react";
// import Textarea from "@/components/ui/Textarea";
// import Button from "@/components/ui/Button";
// import { uploadMedia } from "@/api/upload.api";
// import { createPost } from "@/api/posts.api";

// function isVideoFile(file) {
//   return file?.type?.startsWith("video/");
// }
// function isImageFile(file) {
//   return file?.type?.startsWith("image/");
// }

// export default function CreatePost() {
//   const [caption, setCaption] = useState("");
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [isReel, setIsReel] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [okMsg, setOkMsg] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   const mediaType = useMemo(() => {
//     if (!file) return "";
//     if (isVideoFile(file)) return "video";
//     if (isImageFile(file)) return "image";
//     return "";
//   }, [file]);

//   const pickFile = (f) => {
//     setErrMsg("");
//     setOkMsg("");

//     if (!f) return;

//     const ok = isImageFile(f) || isVideoFile(f);
//     if (!ok) {
//       setErrMsg("Only image or video files are allowed.");
//       return;
//     }

//     setFile(f);

//     const url = URL.createObjectURL(f);
//     setPreviewUrl(url);

//     // if video, suggest reel mode
//     if (isVideoFile(f)) setIsReel(true);
//     else setIsReel(false);
//   };

//   const canSubmit = useMemo(() => {
//     return Boolean(file) || caption.trim().length > 0;
//   }, [file, caption]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setOkMsg("");
//     setErrMsg("");

//     if (!file && !caption.trim()) {
//       setErrMsg("Add a file or a caption.");
//       return;
//     }

//     try {
//       setLoading(true);

//       let media_url = "";
//       let media_type = "";

//       if (file) {
//         const uploaded = await uploadMedia(file);
//         media_url = uploaded.url;
//         media_type = uploaded.media_type;
//       }

//       await createPost({
//         caption: caption.trim(),
//         mediaUrl: media_url,
//         media_url,
//         media_type,
//         is_reel: Boolean(isReel && media_type === "video"),
//         tags: [], // later
//       });

//       setOkMsg("Posted ✅ Go Home / Profile to see it.");
//       setCaption("");
//       setFile(null);
//       setPreviewUrl("");
//       setIsReel(false);
//     } catch (err) {
//       setErrMsg(err?.message || "Failed to post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="rounded-2xl border border-border bg-card p-5">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-xl font-semibold">Create Post</h1>
//           <p className="text-sm text-white/60 mt-1">
//             Upload a photo/video like Instagram. Video can be posted as Reel.
//           </p>
//         </div>
//       </div>

//       <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* Left: form */}
//         <div className="space-y-3">
//           <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium text-white/80">Media</div>
//               <div className="text-xs text-white/50">
//                 {file ? `${file.name} (${mediaType})` : "No file selected"}
//               </div>
//             </div>

//             <div className="mt-3 flex flex-col sm:flex-row gap-3">
//               <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
//                 Choose file
//                 <input
//                   type="file"
//                   accept="image/*,video/*"
//                   className="hidden"
//                   onChange={(e) => pickFile(e.target.files?.[0])}
//                 />
//               </label>

//               {file && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setFile(null);
//                     setPreviewUrl("");
//                     setIsReel(false);
//                   }}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>

//             {mediaType === "video" && (
//               <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
//                 <div>
//                   <div className="text-sm font-medium">Post as Reel</div>
//                   <div className="text-xs text-white/60">
//                     Reels tab will show videos uploaded as reels.
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setIsReel((v) => !v)}
//                   className={`h-10 w-20 rounded-full border transition ${
//                     isReel
//                       ? "bg-indigo-500/25 border-indigo-400/30"
//                       : "bg-white/5 border-white/10"
//                   }`}
//                 >
//                   <span
//                     className={`block h-8 w-8 rounded-full bg-white/80 transition ${
//                       isReel ? "translate-x-10" : "translate-x-1"
//                     }`}
//                   />
//                 </button>
//               </div>
//             )}
//           </div>

//           <div>
//             <div className="text-sm text-white/70">Caption</div>
//             <div className="mt-2">
//               <Textarea
//                 value={caption}
//                 onChange={(e) => setCaption(e.target.value)}
//                 placeholder="Write a caption..."
//               />
//             </div>
//           </div>

//           <Button
//             type="submit"
//             disabled={loading || !canSubmit}
//             className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30 disabled:opacity-50"
//           >
//             {loading ? "Uploading & Posting..." : "Post"}
//           </Button>

//           {okMsg && (
//             <div className="text-sm text-green-300 rounded-xl border border-green-500/20 bg-green-500/10 p-3">
//               {okMsg}
//             </div>
//           )}
//           {errMsg && (
//             <div className="text-sm text-red-300 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
//               {errMsg}
//             </div>
//           )}
//         </div>

//         {/* Right: preview */}
//         <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
//           <div className="flex items-center justify-between">
//             <div className="text-sm font-medium text-white/80">Preview</div>
//             <div className="text-xs text-white/50">{file ? "Ready" : "Empty"}</div>
//           </div>

//           <div className="mt-3 min-h-[320px] rounded-2xl border border-white/10 bg-black/30 overflow-hidden flex items-center justify-center">
//             {!previewUrl ? (
//               <div className="text-sm text-white/50 px-6 text-center">
//                 Select a photo or video to preview.
//               </div>
//             ) : mediaType === "video" ? (
//               <video src={previewUrl} controls className="w-full h-full object-contain max-h-[520px]" />
//             ) : (
//               <img src={previewUrl} alt="preview" className="w-full h-full object-contain max-h-[520px]" />
//             )}
//           </div>
//         </div>
//       </form>
//     </section>
//   );
// }
// import React, { useMemo, useState } from "react";
// import Textarea from "@/components/ui/Textarea";
// import Button from "@/components/ui/Button";
// import { useAuth } from "@/store/auth.store";
// import { createPost } from "@/api/posts.api";
// import { useNavigate } from "react-router-dom";

// export default function CreatePost() {
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   const [caption, setCaption] = useState("");
//   const [file, setFile] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [okMsg, setOkMsg] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
//   const isVideo = file?.type?.startsWith("video/");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setOkMsg("");
//     setErrMsg("");

//     if (!file && !caption.trim()) {
//       setErrMsg("Choose an image/video or write a caption.");
//       return;
//     }
//     if (!file) {
//       setErrMsg("Please choose a media file (image/video).");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createPost(token, { caption, file });
//       setOkMsg("Posted ✅ Redirecting to Home...");
//       setCaption("");
//       setFile(null);

//       // ✅ go home + feed will fetch new posts
//       setTimeout(() => navigate("/"), 600);
//     } catch (err) {
//       setErrMsg(err.message || "Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="rounded-2xl border border-border bg-card p-5">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <h1 className="text-xl font-semibold">Create Post</h1>
//           <p className="text-sm text-white/60 mt-1">
//             Upload a photo/video like Instagram. Videos will be treated as Reels.
//           </p>
//         </div>
//       </div>

//       <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* LEFT */}
//         <div className="space-y-3">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium">Media</div>
//               <div className="text-xs text-white/50">{file ? file.name : "No file selected"}</div>
//             </div>

//             <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
//               Choose file
//               <input
//                 type="file"
//                 accept="image/*,video/*"
//                 className="hidden"
//                 onChange={(e) => setFile(e.target.files?.[0] || null)}
//               />
//             </label>
//           </div>

//           <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//             <div className="text-sm font-medium mb-2">Caption</div>
//             <Textarea
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//               placeholder="Write a caption..."
//               className="min-h-[120px]"
//             />
//           </div>

//           <Button
//             disabled={loading}
//             className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-400/30"
//           >
//             {loading ? "Posting..." : "Post"}
//           </Button>

//           {okMsg && (
//             <div className="text-sm text-green-300 rounded-xl border border-green-500/20 bg-green-500/10 p-3">
//               {okMsg}
//             </div>
//           )}

//           {errMsg && (
//             <div className="text-sm text-red-300 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
//               {errMsg}
//             </div>
//           )}
//         </div>

//         {/* RIGHT */}
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//           <div className="flex items-center justify-between">
//             <div className="text-sm font-medium">Preview</div>
//             <div className="text-xs text-white/50">{file ? (isVideo ? "Video" : "Image") : "Empty"}</div>
//           </div>

//           <div className="mt-3 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 flex items-center justify-center">
//             {!file ? (
//               <div className="text-sm text-white/50">Select a photo or video to preview.</div>
//             ) : isVideo ? (
//               <video src={previewUrl} controls className="h-full w-full object-cover" />
//             ) : (
//               <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />
//             )}
//           </div>
//         </div>
//       </form>
//     </section>
//   );
// }
import React, { useMemo, useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { useAuth } from "@/store/auth.store";
import { createPost } from "@/api/posts.api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );

  const isVideo = file?.type?.startsWith("video/");

  const onSubmit = async (e) => {
    e.preventDefault();
    setOkMsg("");
    setErrMsg("");

    if (!file) {
      setErrMsg("Please choose an image or video.");
      return;
    }

    try {
      setLoading(true);
      await createPost(token, { caption, file });

      setOkMsg("Posted successfully ✅ Redirecting...");
      setCaption("");
      setFile(null);

      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      setErrMsg(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <section className="w-full max-w-6xl glass-card p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Create Post</h1>
          <p className="text-sm text-white/60 mt-1">
            Share a photo or reel with your followers.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* LEFT PANEL */}
          <div className="space-y-5">
            {/* File Upload */}
            <div className="glass-soft rounded-2xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Media</span>
                <span className="text-xs text-white/50">
                  {file ? file.name : "No file selected"}
                </span>
              </div>

              <label className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-2xl h-36 cursor-pointer hover:bg-white/5 transition">
                <div className="text-4xl mb-2">📁</div>
                <span className="text-sm text-white/70">
                  Click to upload image or video
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {/* Caption */}
            <div className="glass-soft rounded-2xl p-5 border border-white/10">
              <div className="text-sm font-medium mb-2">Caption</div>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write something amazing..."
                className="min-h-[140px]"
              />
            </div>

            {/* Submit */}
            <Button
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-indigo-400/30 hover:from-indigo-500/40 hover:to-purple-500/40 transition font-semibold"
            >
              {loading ? "Posting..." : "Share Post"}
            </Button>

            {/* Feedback */}
            {okMsg && (
              <div className="text-sm text-green-300 rounded-2xl border border-green-500/20 bg-green-500/10 p-3">
                {okMsg}
              </div>
            )}

            {errMsg && (
              <div className="text-sm text-red-300 rounded-2xl border border-red-500/20 bg-red-500/10 p-3">
                {errMsg}
              </div>
            )}
          </div>

          {/* RIGHT PANEL (PREVIEW) */}
          <div className="glass-soft rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Preview</span>
              <span className="text-xs text-white/50">
                {file ? (isVideo ? "Video" : "Image") : "Empty"}
              </span>
            </div>

            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center">
              {!file ? (
                <div className="text-sm text-white/50">
                  Your media preview will appear here.
                </div>
              ) : isVideo ? (
                <video
                  src={previewUrl}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}