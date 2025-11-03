import React from 'react';

const StrategicLeadershipAlignment = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4">
             <span className="text-[#EA0028]">Mission</span>
          </h1>
          <p className="text-xl text-black">
            Shaping Tomorrow Through Ideas That Matter

          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Vision & Strategy Sessions */}
          <div className="bg-white rounded-2xl border-4 border-black p-8 cursor-pointer transition-all duration-150 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[-2px] active:translate-y-[-2px]">
            <div className="mb-6">
              <div className="bg-[#EA0028] text-black font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Youth Empowerment

              </h2>
              
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
             At TEDx Thaltej Youth, our mission is to create a platform where ideas worth spreading are shared with young minds. 
            </p>
          </div>

          {/* Card 2 - KPI and Metrics Training */}
          <div className="bg-white rounded-2xl border-4 border-black p-8 cursor-pointer transition-all duration-150 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[-2px] active:translate-y-[-2px]">
            <div className="mb-6">
              <div className="bg-[#EA0028] text-black font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                2
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                 Inspiring Change

              </h2>
              
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
             We aim to bring together passionate thinkers, educators, and innovators who will challenge conventional perspectives, inspire curiosity, and ignite positive action in the realm of education. </p>
          </div>

          {/* Card 3 - Continuous Improvement Frameworks */}
          <div className="bg-white rounded-2xl border-4 border-black p-8 cursor-pointer transition-all duration-150 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[-2px] active:translate-y-[-2px]">
            <div className="mb-6">
              <div className="bg-[#EA0028] text-black font-bold text-2xl w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Future Forward

              </h2>
             
             
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Through talks, discussions, and collaborations, we strive to spark a movement that drives the future of education—one that is inclusive, innovative, and accessible for all.


            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicLeadershipAlignment;