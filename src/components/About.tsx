import React from 'react';

const StrategicLeadershipAlignment = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4">
            About <span className="text-[#EA0028]">TEDx</span>Thaltej Youth
          </h1>
        </div>

        {/* Cards Container */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border-4 border-black p-8 transition-all duration-150 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:-translate-x-0.5 active:-translate-y-0.5">
            <div className="mb-6">
              <div className="bg-[#EA0028] text-black font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center mb-4">1</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Empowering Young Minds</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              TEDxThaltej Youth is a student-organized TEDx event designed to empower young minds and foster transformative ideas within our community.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border-4 border-black p-8 transition-all duration-150 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:-translate-x-0.5 active:-translate-y-0.5">
            <div className="mb-6">
              <div className="bg-[#EA0028] text-black font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center mb-4">2</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Shaping the Future of Education</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              We bring together students, educators, and changemakers to share insights that shape the future of education.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border-4 border-black p-8 transition-all duration-150 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:-translate-x-0.5 active:-translate-y-0.5">
            <div className="mb-6">
              <div className="bg-[#EA0028] text-black font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center mb-4">3</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Future Forward</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Through talks, discussions, and collaborations, we strive to spark a movement that drives the future of education—one that is inclusive, innovative, and accessible for all.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl border-4 border-black p-8 transition-all duration-150 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:-translate-x-0.5 active:-translate-y-0.5">
            <div className="mb-6">
              <div className="bg-[#EA0028] text-black font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center mb-4">4</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">The Future of Education – A Light Towards Wisdom</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our theme for 2025, “The Future of Education – A Light Towards Wisdom,” invites a new generation to explore innovative ideas and wisdom-driven paths that can illuminate and evolve the educational landscape.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicLeadershipAlignment;
