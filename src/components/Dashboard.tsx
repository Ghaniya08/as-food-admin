// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>
           
//     </div>
//   )
// }

// export default Dashboard



import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow rounded-2xl">
        <div className="relative">
          <Search className="absolute left-2 top-2 text-gray-400" size={20} />
          <Input className="pl-8 w-80" placeholder="Search..." />
        </div>
        <div className="flex items-center gap-4">
          <Bell className="text-gray-500 cursor-pointer" size={24} />
          <img src="/admin-avatar.png" alt="Admin" className="w-10 h-10 rounded-full border" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {[
          { title: "Products", count: 120 },
          { title: "Chefs", count: 15 },
          { title: "Users", count: 340 },
          { title: "Orders", count: 87 },
        ].map((item, index) => (
          <Card key={index} className="p-6 text-center shadow-md">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-2xl font-bold mt-2">{item.count}</p>
          </Card>
        ))}
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Recent Orders */}
        <Card className="p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <ul className="text-sm text-gray-600">
            <li>#1234 - John Doe - $50</li>
            <li>#1235 - Jane Smith - $75</li>
            <li>#1236 - Mark Wilson - $30</li>
          </ul>
        </Card>

        {/* Sales Chart Placeholder */}
        <Card className="p-6 shadow-md flex items-center justify-center">
          <p className="text-gray-500">Sales Chart (Coming Soon)</p>
        </Card>
      </div>
    </div>
  );
}
