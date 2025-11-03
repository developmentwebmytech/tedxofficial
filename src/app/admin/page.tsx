"use client"


import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {  CreditCard, Users, DollarSign } from "lucide-react"
// import Link from "next/link"

















// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"








export default function AdminDashboard() {
  
 

  // const publishedPosts = posts.filter((post: { status: string }) => post.status === "published")
  // const draftPosts = posts.filter((post: { status: string }) => post.status === "draft")


  return (
    <div className="dashboard-content">
      {/* Welcome Section */}
      <div className="welcome-section ">
        <div className="">
         
           {/* <h1 className="text-2xl font-bold text-gray-800 ml-80">Admin Dashboard</h1> */}
          {/* <p className="text-muted-foreground mt-2 text-md">Here&apos;s what&apos;s happening with your blog today.</p> */}
        </div>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          {/* <Link href="/admin/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link> */}
        </Button>
      </div>
      

      <div className="bg-white p-5 mx-8 shadow-lg">
      <h1 className="mb-3 ml-7 text-2xl font-bold">Welcome back!</h1>
      <div className="grid grid-cols-3 gap-4 px-9">
       
        
        {/* Total Products */}
        <Card className="bg-red-300 border border-green-100 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Pages</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-800" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">22</div>
            <p className="text-xs text-gray-800">+0 new products this month</p>
          </CardContent>
        </Card>

        {/* Total Categories */}
        <Card className="bg-red-300 border border-purple-100 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Blogs</CardTitle>
              <Users className="h-4 w-4 text-gray-800 " />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">6</div>
            <p className="text-xs text-gray-600">+0 new categories this month</p>
          </CardContent>
        </Card>

        {/* Total Brands */}
        <Card className="bg-red-300  shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Brands</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-800" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">6</div>
            <p className="text-xs text-gray-600">+0 new brands this month</p>
          </CardContent>
        </Card>

        {/* Total Variations */}
        </div>
      

        {/* Total Users */}
       </div>
      {/* Main Content Grid */}
      <div className="main-grid">
     
      </div>
    </div>
  )
}
