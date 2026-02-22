// // import React from "react";

// // /**
// //  * PostMedia
// //  * - Renders media for a post
// //  * - Supports image now, extend to video later
// //  */
// // export default function PostMedia({ post }) {
// //   const mediaUrl = post.mediaUrl || "";

// //   if (!mediaUrl) {
// //     return (
// //       <div className="aspect-[4/3] bg-slate-900/60 border-y border-border grid place-items-center text-white/40 text-sm">
// //         No media
// //       </div>
// //     );
// //   }

// //   const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl);

// //   return (
// //     <div className="border-y border-border bg-black">
// //       {isVideo ? (
// //         <video
// //           src={mediaUrl}
// //           controls
// //           className="w-full max-h-[560px] object-contain"
// //         />
// //       ) : (
// //         <img
// //           src={mediaUrl}
// //           alt="post"
// //           loading="lazy"
// //           className="w-full max-h-[560px] object-cover"
// //         />
// //       )}
// //     </div>
// //   );
// // }
// // frontend/src/components/feed/PostMedia.jsx
// import React from "react";

// const BACKEND_ORIGIN =
//   import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

// function resolveUrl(url) {
//   if (!url) return "";
//   if (url.startsWith("http://") || url.startsWith("https://")) return url;
//   if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`; // ✅ FIX
//   return url;
// }

// export default function PostMedia({ post }) {
//   const raw = post?.media_url || post?.mediaUrl || "";
//   const url = resolveUrl(raw);

//   if (!url) return null;

//   const type =
//     post?.media_type ||
//     post?.mediaType ||
//     (/\.(mp4|webm|mov|mkv)$/i.test(url) ? "video" : "image");

//   if (type === "video") {
//     return (
//       <div className="bg-black/20">
//         <video
//           src={url}
//           controls
//           className="w-full max-h-[520px] object-contain"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black/20">
//       <img
//         src={url}
//         alt="post"
//         className="w-full max-h-[520px] object-cover"
//         loading="lazy"
//       />
//     </div>
//   );
// }


// import React from "react";

// export default function PostMedia({ post }) {
//   const url = post?.mediaUrl || post?.media_url || "";
//   if (!url) return null;

//   const type =
//     post?.mediaType ||
//     post?.media_type ||
//     (/\.(mp4|webm|mov|mkv)$/i.test(url) ? "video" : "image");

//   if (type === "video") {
//     return (
//       <div className="bg-black/20">
//         <video
//           src={url}
//           controls
//           className="w-full max-h-[520px] object-contain"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black/20">
//       <img
//         src={url}
//         alt="post"
//         className="w-full max-h-[520px] object-cover"
//         loading="lazy"
//       />
//     </div>
//   );
// }

import React from "react";

const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000";

function resolveUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${url}`;
  return url;
}

export default function PostMedia({ post }) {
  const raw = post?.media_url || post?.mediaUrl || "";
  const url = resolveUrl(raw);

  if (!url) return null;

  const type =
    post?.media_type ||
    post?.mediaType ||
    (/\.(mp4|webm|mov|mkv)$/i.test(url) ? "video" : "image");

  if (type === "video") {
    return (
      <div className="bg-black/20">
        <video
          src={url}
          controls
          className="w-full max-h-[520px] object-contain"
        />
      </div>
    );
  }

  return (
    <div className="bg-black/20">
      <img
        src={url}
        alt="post"
        className="w-full max-h-[520px] object-cover"
        loading="lazy"
      />
    </div>
  );
}