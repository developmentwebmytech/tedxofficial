'use client';

import { TypeAnimation } from 'react-type-animation';

const PressReleaseHero = () => {
  return (
    <section className="relative px-4 md:px-12 py-40 border-b border-gray-200 min-h-[300px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover h-full bg-center"
        style={{
          backgroundImage: "url('/press.jpg')", // update path if needed
        }}
      >
        {/* Red overlay for visibility */}
        
      </div>

      {/* Content */}
      <div className="relative top-25 z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <TypeAnimation
          sequence={[
            'Press Releases', // text to type
            1000,             // wait 1s
            '',               // clear
            500,              // wait
            'Press Releases', // type again
          ]}
          wrapper="h1"
          cursor={true}
          repeat={Infinity}
          className="text-4xl font-bold text-white tracking-tight mb-2 font-sans"
        />
        <p className="text-white text-sm font-sans">
          Stay up to date with the latest announcements and stories.
        </p>
      </div>
    </section>
  );
};

export default PressReleaseHero;
