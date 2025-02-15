"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  Package,
  ShoppingBag,
  LineChart,
  Clock,
} from "lucide-react";
import { client } from "@/lib/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const query = `{
        "totalProducts": count(*[_type == "food"]),
        "deliveredOrders": count(*[_type == "order" && orderStatus == "Delivered"]),
        "pendingOrders": count(*[_type == "order" && orderStatus in ["Order Confirmed" ,"pending", "processing", "order confirmed"]]),
        "totalSales": *[_type == "order"] { orderTotal }
      }`;

      const result = await client.fetch(query);
      const totalSales = result.totalSales.reduce(
        (sum: number, order: any) => sum + (order.orderTotal || 0),
        0
      );

      setStats({
        totalProducts: result.totalProducts,
        deliveredOrders: result.deliveredOrders,
        pendingOrders: result.pendingOrders,
        totalSales: totalSales,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow rounded-2xl gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2 top-2 text-gray-400" size={20} />
          <Input className="pl-8 w-full md:w-80" placeholder="Search..." />
        </div>
        <div className="flex items-center gap-4">
          <Bell className="text-gray-500 cursor-pointer" size={24} />
          <img
            src="/admin-avatar.png"
            alt="Admin"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <Card className="p-6 text-center shadow-md bg-white rounded-xl flex flex-col items-center">
          <Package className="text-purple-500" size={32} />
          <h2 className="text-lg font-semibold mt-2">Total Products</h2>
          <p className="text-2xl font-bold mt-1">{stats.totalProducts}</p>
        </Card>
        <Card className="p-6 text-center shadow-md bg-white rounded-xl flex flex-col items-center">
          <ShoppingBag className="text-yellow-500" size={32} />
          <h2 className="text-lg font-semibold mt-2">Total Orders Delivered</h2>
          <p className="text-2xl font-bold mt-1">{stats.deliveredOrders}</p>
        </Card>
        <Card className="p-6 text-center shadow-md bg-white rounded-xl flex flex-col items-center">
          <LineChart className="text-green-500" size={32} />
          <h2 className="text-lg font-semibold mt-2">Total Sales</h2>
          <p className="text-2xl font-bold mt-1">
            ${stats.totalSales ? stats.totalSales.toLocaleString() : "0"}
          </p>
        </Card>
        <Card className="p-6 text-center shadow-md bg-white rounded-xl flex flex-col items-center">
          <Clock className="text-orange-500" size={32} />
          <h2 className="text-lg font-semibold mt-2">Total Pending</h2>
          <p className="text-2xl font-bold mt-1">{stats.pendingOrders}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <ul className="text-sm text-gray-600">
            <li>#1234 - John Doe - $50</li>
            <li>#1235 - Jane Smith - $75</li>
            <li>#1236 - Mark Wilson - $30</li>
          </ul>
        </Card>
        <Card className="p-6 shadow-md flex items-center justify-center">
          <p className="text-gray-500">Sales Chart (Coming Soon)</p>
        </Card>
      </div>
    </div>
  );
}
