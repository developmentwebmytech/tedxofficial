
import React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen  bg-gray-50 items-stretch">

      <div className="">
      {/* Sidebar */}
      <AdminSidebar/>
      </div>

      {/* Main content */}
      <div className=" flex-1 container mx-auto">
        <header className="mb-6">
         
        </header>

        <main>{children}</main>
      </div>
    </div>
  )
}