"use client";
import React from "react";
import { useRouter } from "next/router";

const Watch = () => {
  const router = useRouter();
  const { slug: filename } = router.query;

  const host = typeof window !== "undefined" ? window.location.hostname : "localhost";

  if (!filename) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-col w-full h-screen bg-black items-center justify-center relative">
      {/* <video
        playsInline
        type="video/mp4"
        controls className="w-full lg:h-full h-60">

        <source
          // src={`http://192.168.0.166:3333/stream?filename=${filename}`}
          src={`http://${host}:3000/stream?filename=${filename}`}
          type="video/mp4"
        />
      </video> */}

      <video
        id="player"
        controls
        playsinline
        preload="metadata"
        width="640"
        src={`http://192.168.0.166:3333/stream?filename=${filename}`}
      ></video>

    </div>
  );
};

export default Watch;
