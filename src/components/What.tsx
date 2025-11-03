import React from 'react';
import Image from 'next/image';

const LeadershipBenefits = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white container ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Benefits cards */}
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-[#F9FAFB] p-4 rounded-lg mb-6">
            <h2 className="md:text-5xl text-3xl  text-black text-center">What is <span className='text-[#EA0028] font-bold'>TEDx?</span></h2>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-[#F9FAFB] p-6 rounded-lg">
              <div className="text-3xl font-bold text-black mb-2">01.</div>
              <h3 className="text-lg font-bold text-black mb-3">
                What is TEDx?
              </h3>
              <p className="text-gray-700 text-sm">
                TEDx is a global initiative by TED to bring the spirit of TED&apos;s mission, “Ideas Worth Spreading,” to local communities around the world. These independently organized events follow TED&apos;s format and guidelines. </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-black mb-2">02.</div>
              <h3 className="text-lg font-bold text-black mb-3">
                The Power of TEDx Talks
              </h3>
              <p className="text-gray-700 text-sm">
                At TEDx events, speakers from diverse backgrounds—ranging from technology, entertainment, and design to science, education, and beyond—deliver short, impactful talks on topics they’re passionate about. These talks aim to spark conversations, challenge perspectives, and inspire action.</p>

            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <div className="text-3xl font-bold text-black mb-2">03.</div>
              <h3 className="text-lg font-bold text-black mb-3">
                Community-Driven Events
              </h3>
              <p className="text-gray-700 text-sm">
                Each TEDx event is independently organized by a dedicated team of volunteers who carefully curate the event&apos;s theme, speakers, and activities to reflect the local spirit and interests.


              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F9FAFB] p-6 rounded-lg">
              <div className="text-3xl font-bold text-black mb-2">04.</div>
              <h3 className="text-lg font-bold text-black mb-3">
                Inspiring Connection and Change
              </h3>
              <p className="text-gray-700 text-sm">
                TEDx events are designed not only to inspire audiences but also to foster meaningful connections and a sense of community, driving conversations that can lead to real-world impact.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Professional image */}
        <div className="h-full ">
         <Image src="/ted.jpg" alt="tedimage" height={1600} width={700} className='rounded-lg' ></Image>
          <div>
           <Image src="/ted2.jpg" alt="tedimage" height={400} width={700} className='rounded-lg mt-5'></Image>

        </div>
          
          
          
        </div> 
       
      </div>
    </div>
  );
};

export default LeadershipBenefits;