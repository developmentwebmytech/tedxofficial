// components/Hero.tsx
'use client';

import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  return (
    <div
      className="relative h-[50vh] w-full bg-contain bg-center flex bg-no-repeat items-center justify-center"
      style={{
        backgroundImage: `url('/notify.jpg')`, // replace with your image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-red-500/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          <Typewriter
            words={['Notifications']}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="mt-4 text-lg md:text-xl">Stay updated with the latest alerts and updates</p>
      </div>
    </div>
  );
}
