
'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  // desktop
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const policyDropdownRef = useRef<HTMLDivElement | null>(null);

  // desktop dropdown toggles
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
    setOpenSubmenu(null);
  };
  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  // mobile dropdown toggles
  const toggleMobileDropdown = (name: string) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
    setMobileSubmenu(null);
  };
  const toggleMobileSubmenu = (name: string) => {
    setMobileSubmenu(mobileSubmenu === name ? null : name);
  };

  // close on outside click (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) &&
        (policyDropdownRef.current && !policyDropdownRef.current.contains(event.target as Node))
      ) {
        setOpenDropdown(null);
        setOpenSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
    setMobileSubmenu(null);
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#EB0028] text-white text-sm flex justify-center items-center px-4 py-2">
        <span>Speaker Applications are OPEN</span>
        <Link
          href="/applicationstatus"
          className="ml-4 border border-white px-3 py-1 rounded hover:bg-white hover:text-red-700 transition"
          onClick={closeMobileMenu}
        >
          Apply Now
        </Link>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white px-6 py-4 shadow sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu}>
            <Image src="/logo-black.png" alt="TEDx Logo" height={90} width={168} />
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-6 text-md font-light text-black">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScj-rwj-N_e9VfMcRxP1ciCkLHSnnWoVWngFuQUSDDQU8WdZA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400"
            >
              Speaker Application
            </Link>
            <Link href="/team" className="hover:text-red-400">Our Team</Link>
            <Link href="/pressrelease" className="hover:text-red-400">Press Release</Link>
                <Link href="https://www.tedxthaltejyouth.in/tedxassist-ai" className=" hover:text-red-500  rounded">TEDxAssist</Link>
                <Link href="/gallery" className=" hover:bg-white hover:text-red-500 rounded">Gallery</Link>

            {/* Dropdown: TEDxThaltej Youth 2025 */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-1">
                <Link href="/teamphotos" className="hover:text-red-400">More</Link>
                <button
                  onClick={() => toggleDropdown('tedx2025')}
                  type="button"
                  className="hover:text-red-400"
                  aria-label="Toggle TEDxThaltej Youth 2025 dropdown"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
              {openDropdown === 'tedx2025' && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-black text-white rounded shadow-lg z-50 p-2 space-y-1">
       

                  {/* Notifications Submenu */}
                  <div>
                    <button
                      className="flex justify-between w-full px-3 py-2 cursor-pointer hover:bg-white hover:text-black rounded text-left"
                      onClick={() => toggleSubmenu('notifications')}
                    >
                      <span><Link href="/notification">Notifications</Link></span>
                      {openSubmenu === 'notifications' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {openSubmenu === 'notifications' && (
                      <div className="ml-4 border-l pl-2 space-y-1">
                        <Link href="/verify" className="block text-sm px-3 py-1 hover:bg-white hover:text-black rounded">Documents Verifier</Link>
                        <Link href="/auditreports" className="block text-sm px-3 py-1 hover:bg-white hover:text-black rounded">Audit Reports</Link>
                      </div>
                    )}
                  </div>

                  <Link href="/blog" className="block px-3 py-2 hover:bg-white hover:text-black rounded">Blog</Link>
                  <Link href="/team" className="block px-3 py-2 hover:bg-white hover:text-black rounded">Our Team</Link>
                
                  <Link href="/theme" className="block px-3 py-2 hover:bg-white hover:text-black rounded">Theme</Link>
                  <Link href="/collaborators" className="block px-3 py-2 hover:bg-white hover:text-black rounded">Collaborators</Link>

                  {/* Speakers Submenu */}
                  <div>
                    <button
                      className="flex justify-between w-full px-3 py-2 cursor-pointer hover:bg-white hover:text-black rounded text-left"
                      onClick={() => toggleSubmenu('speakers')}
                    >
                      <span><Link href="/speakers">Speakers</Link></span>
                      {openSubmenu === 'speakers' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {openSubmenu === 'speakers' && (
                      <div className="ml-4 border-l pl-2 space-y-1">
                        <Link href="/teasers" className="block text-sm px-3 py-1 hover:bg-white hover:text-black rounded">Teasers</Link>
                        {/* <Link href="/speakerverifier" className="block text-sm px-3 py-1 hover:bg-white hover:text-black rounded">Speaker Verifier</Link> */}
                          <Link href="/application-status" className="block text-sm px-3 py-1 hover:bg-white hover:text-black rounded" >Application status</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown: Policy Documents */}
            <div className="relative" ref={policyDropdownRef}>
              <div className="flex items-center gap-1">
                <Link href="/policydocuments" className="hover:text-red-400">Policy Documents</Link>
                <button
                  onClick={() => toggleDropdown('policy')}
                  type="button"
                  className="hover:text-red-400"
                  aria-label="Toggle Policy Documents dropdown"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
              {openDropdown === 'policy' && (
                <div className="absolute top-full mt-2 left-0 w-52 bg-black text-white rounded shadow-lg z-50 p-2">
                  <Link href="/faq" className="block px-3 py-2 hover:bg-white hover:text-black rounded">FAQ</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 text-black font-light text-md px-4">
            <Link href="/" className="block py-2" onClick={closeMobileMenu}>Home</Link>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScj-rwj-N_e9VfMcRxP1ciCkLHSnnWoVWngFuQUSDDQU8WdZA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2"
              onClick={closeMobileMenu}
            >
              Speaker Application
            </Link>
            <Link href="/team" className="block py-2" onClick={closeMobileMenu}>Our Team</Link>
            <Link href="/pressrelease" className="block py-2" onClick={closeMobileMenu}>Press Release</Link>
            <Link href="https://www.tedxthaltejyouth.in/tedxassist-ai" className="block py-2">TEDxAssist</Link>
             <Link href="/gallery" className="block py-2" onClick={closeMobileMenu}>Gallery</Link>

            {/* TEDx 2025 (Mobile) */}
            <div>
              <div className="flex justify-between w-full py-2">
                <Link href="/teamphotos" onClick={closeMobileMenu}>More</Link>
                <button onClick={() => toggleMobileDropdown('tedx2025')}>
                  {mobileDropdown === 'tedx2025' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
              {mobileDropdown === 'tedx2025' && (
                <div className="ml-4 space-y-1 text-sm">
                 

                  {/* Notifications */}
                  <div>
                    <div className="flex justify-between w-full py-2">
                      <Link href="/notification" onClick={closeMobileMenu}>Notifications</Link>
                      <button onClick={() => toggleMobileSubmenu('notifications')}>
                        {mobileSubmenu === 'notifications' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                    </div>
                    {mobileSubmenu === 'notifications' && (
                      <div className="ml-4 border-l pl-2 space-y-1">
                        <Link href="/verify" className="block py-2" onClick={closeMobileMenu}>Documents Verifier</Link>
                        <Link href="/auditreports" className="block py-2" onClick={closeMobileMenu}>Audit Reports</Link>
                      </div>
                    )}
                  </div>

                  <Link href="/blog" className="block py-2" onClick={closeMobileMenu}>Blog</Link>
                  <Link href="/theme" className="block py-2" onClick={closeMobileMenu}>Theme</Link>
                  <Link href="/collaborators" className="block py-2" onClick={closeMobileMenu}>Collaborators</Link>

                  {/* Speakers */}
                  <div>
                    <div className="flex justify-between w-full py-2">
                      <Link href="/speakers" onClick={closeMobileMenu}>Speakers</Link>
                      <button onClick={() => toggleMobileSubmenu('speakers')}>
                        {mobileSubmenu === 'speakers' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                    </div>
                    {mobileSubmenu === 'speakers' && (
                      <div className="ml-4 border-l pl-2 space-y-1">
                        <Link href="/teasers" className="block py-2" onClick={closeMobileMenu}>Teasers</Link>
                        {/* <Link href="/speakerverifier" className="block py-2" onClick={closeMobileMenu}>Speaker Verifier</Link> */}
                         <Link href="/application-status" className="block py-2" onClick={closeMobileMenu}>Application status</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Policy Documents (Mobile) */}
            <div>
              <div className="flex justify-between w-full py-2">
                <Link href="/policydocuments" onClick={closeMobileMenu}>Policy Documents</Link>
                <button onClick={() => toggleMobileDropdown('policy')}>
                  {mobileDropdown === 'policy' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
              {mobileDropdown === 'policy' && (
                <div className="ml-4 space-y-1 text-sm">
                  <Link href="/faq" className="block py-2" onClick={closeMobileMenu}>FAQ</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
