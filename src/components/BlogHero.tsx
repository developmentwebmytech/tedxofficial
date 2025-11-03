"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold">Blogs</h1>
      </div>
    </section>
  );
}
