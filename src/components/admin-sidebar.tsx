"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  FileText,
  Settings,
  ChevronDown,
  LogOut,
  Dock,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };


  const isActive = (url: string) => pathname === url;

  const linkClasses = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
      active
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-red-500 hover:text-white"
    }`;

  const subLinkClasses = (active: boolean) =>
    `block rounded px-2 py-1 text-sm transition ${
      active
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-red-500 hover:text-white"
    }`;

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/admin/login"); // redirect to login
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="left-0 h-full w-[290px] bg-white shadow-lg flex flex-col justify-between">
      <div>
        {/* User Info */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-red-500 text-white">
              {user?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-800">
              {user?.name || "Admin"}
            </span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <h3 className="text-md font-bold text-gray-700 uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <Link href="/admin" className={linkClasses(isActive("/admin"))}>
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </li>

            {/* Blogs */}
            <li>
              <button
                onClick={() => toggleDropdown("posts")}
                className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  Blogs
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openDropdown === "posts" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                  openDropdown === "posts"
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <li>
                  <Link
                    href="/admin/blog"
                    className={subLinkClasses(isActive("/admin/blog"))}
                  >
                    All Blogs
                  </Link>
                </li>
              </ul>
            </li>

            {/* Pages */}
            <li>
              <button
                onClick={() => toggleDropdown("pages")}
                className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  Pages
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openDropdown === "pages" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                  openDropdown === "pages"
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                {[
                  { href: "/admin/gallery", label: "Gallery" },
                  { href: "/admin/pressrelease", label: "Press Release" },
                  { href: "/admin/contactenquiry", label: "Contact Enquiry" },
                  { href: "/admin/faq", label: "FAQ" },
                  { href: "/admin/videos", label: "Videos" },
                  { href: "/admin/team", label: "Team" },
                  { href: "/admin/collaborators", label: "Collaborators" },
                  { href: "/admin/speakers", label: "Speakers" },
                  { href: "/admin/teaser", label: "Teasers" },
                  { href: "/admin/notification", label: "Notification" },
                  { href: "/admin/policydocuments", label: "Policy documents" },
                  { href: "/admin/auditreports", label: "Audit reports" },
                   { href: "/admin/verify", label: "Document verifier" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={linkClasses(isActive(item.href))}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Settings */}
            <li>
              <Link
                href="/admin/settings"
                className={linkClasses(isActive("/admin/settings"))}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/admin/applications"
                className={linkClasses(isActive("/admin/applications"))}
              >
               <Dock className="w-4 h-4" />
                Application status
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-6 border-t border-gray-300 pt-4">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 text-md text-black hover:bg-[#E90223] hover:text-white px-3 py-2 rounded-md transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
