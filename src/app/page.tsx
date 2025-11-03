import AboutSection from '@/components/About'
import Certification from '@/components/Certificate'
import EUDRSection from '@/components/Hero'

import MissionSection from '@/components/Mission'
import TestimonialSection from '@/components/Testimonial'
import VideoSection from '@/components/Video'
import TEDxInfo from '@/components/What'
import Whatis from '@/components/Whatis'
import Vision from '@/components/WhoWeAre'


import React from 'react'


const page = () => {
  return (
    <main>
      <EUDRSection />
      <Vision />
      
      <MissionSection />
      <VideoSection videoUrl={''} />
      <AboutSection />
      <TEDxInfo />
      
      <Whatis/>
      <TestimonialSection/>
      
      <Certification/>



    </main>
  )
}

export default page