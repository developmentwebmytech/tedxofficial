'use client'

import { Linkedin, Instagram, Youtube, } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-12 py-12 ">
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-25 container mx-auto">
        {/* Explore */}
        <div>
          <div className=''>
        <Image
          src="/logo-white.png"
          alt="Logo"
          width={240} // w-60 = 240px
          height={64} // approximate height, adjust as needed
          className="h-full w-60 -ml-3"
        />
      </div>

          <h4 className="font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/applicationstatus">Speaker Application</Link></li>
            <li><Link href="#">TEDxAssist</Link></li>
            <li><Link href="/pressrelease">Press Release</Link></li>
            <li><Link href="/theme">Theme</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/faq">FAQ</Link></li>

          </ul>
        </div>

        {/* Our Community */}
        <div>
          <h4 className="font-semibold mb-4">Our community</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/teamphotos">TEDxThaltej 2025</Link></li>
            <li><Link href="/team">Our Team</Link></li>
            <li><Link href="/collaborators">collaborators</Link></li>
            <li><Link href="/speakerverifier">Speaker Verifier</Link></li>
            <li><Link href="/auditreports">Audit reports</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
       

        {/* Become a TED Member & Socials */}
        <div>
          <h4 className="font-semibold mb-4">Become a TED Member</h4>
          <p className="text-sm text-gray-300 mb-6">
            TED Members help billions of people worldwide access inspiring ideas. Plus, they get
            exclusive benefits like invite-only events with speakers. Join today for a brighter
            future – and a better you.
          </p>

          <h4 className="font-semibold mb-3">Follow <span className='text-[#EB0028]'>Tedx</span> Thaltej youth</h4>
          <div className="flex gap-4 mb-6">
           <Link href="https://www.linkedin.com/company/tedxthaltej-youth/"> <Linkedin className="hover:text-gray-400 cursor-pointer" /></Link>

            <Link href="https://www.instagram.com/tedxthaltejyouth?igsh=MTNyeGZ6NGxzcHMxNA=="><Instagram className="hover:text-gray-400 cursor-pointer" /></Link>
            <Link href="https://youtu.be/GG64ZSxIqtQ?si=XvsHHQuWT0j8IsL0"><Youtube className="hover:text-gray-400 cursor-pointer" /></Link>

          </div>

          {/* <h4 className="font-semibold mb-2">Download the <span className='text-[#EB0028]'>TED</span> App</h4> */}
          {/* <div className="flex gap-3">
            <Image
              src="/playstore.png"
              alt="Google Play"
              width={32} // w-8 = 32px
              height={32} // h-8 = 32px
              className="w-8 h-8"
            />

            <Image
              src="/app.png"
              alt="App Store"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div> */}
        </div>
      </div>

      <hr className="my-10 mx-25 border-gray-700" />

      {/* Bottom Links */}
      

      <p className="text-center   text-xs text-white mt-6">
        © TEDxThaltej Youth 2025 | Licensed by TED | All Rights Reserved
      </p>
      <p className="text-center md:text-sm text-xs text-white mt-6">
        Developed by Fenil Shah - Copyright © Fenil Shah Publications
      </p>
    </footer>
  )
}

export default Footer
