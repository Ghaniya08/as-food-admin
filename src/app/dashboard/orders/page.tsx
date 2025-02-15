import { client } from '@/lib/client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
const pages = async() => {
     const result = await client.fetch(` *[_type == "order"] {
        _id,
        userId,
        fullName,
        email,
        phone,
        company,
        address,
        orderTotal,
        orderStatus,
        cartItems[] {
          title,
          quantity,
          price
        }
     }`)
  return (
    <div>
      {/* <Table className="bg-white shadow-md rounded-lg overflow-hidden">
  <TableCaption>List of all customer orders</TableCaption>
  <TableHeader>
    <TableRow className="bg-gray-100">
      <TableHead className="w-[100px]">Order ID</TableHead>
      <TableHead>Full Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Phone</TableHead>
      <TableHead>Company</TableHead>
      <TableHead>Address</TableHead>
      <TableHead>Order Total</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Items</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {result.map((order: any) => (
      <TableRow key={order._id} className="hover:bg-gray-50 transition">
        <TableCell className="font-medium">{order._id}</TableCell>
        <TableCell>{order.fullName}</TableCell>
        <TableCell>{order.email}</TableCell>
        <TableCell>{order.phone}</TableCell>
        <TableCell>{order.company || "N/A"}</TableCell>
        <TableCell className=''>{order.address}</TableCell>
        <TableCell className="font-bold text-green-600">${order.orderTotal.toFixed(2)}</TableCell>
        <TableCell>
          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${order.orderStatus === "Delivered" ? "bg-green-200 text-green-800" : order.orderStatus === "Processing" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800"}`}>
            {order.orderStatus}
          </span>
        </TableCell>
        <TableCell>
          <ul className="list-disc pl-4 text-gray-500">
            {order.cartItems.map((item: any, index: number) => (
              <li key={index}>
                {item.title} - {item.quantity}x @ ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table> */}

<div className="w-full overflow-x-auto">
  <Table className="bg-white shadow-md rounded-lg min-w-[900px]">
    {/* <TableCaption className="text-lg font-semibold text-gray-600">
      Customer Orders Overview
    </TableCaption> */}
    <TableHeader>
      <TableRow className="bg-gray-100 text-gray-700">
        <TableHead className="w-[200px] p-4 text-left">Order ID</TableHead>
        <TableHead className="w-[350px] p-4 text-left">Full Name</TableHead>
        <TableHead className="w-[250px] p-4 text-left">Email</TableHead>
        <TableHead className="w-[150px] p-4 text-left">Phone</TableHead>
        <TableHead className="w-[350px] p-4 text-left">Order Total</TableHead>
        <TableHead className="w-[630px] p-4 text-left">Status</TableHead>
        <TableHead className="w-[300px] p-4 text-left">Items</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {result.map((order: any) => (
        <TableRow key={order._id} className="hover:bg-gray-50 transition">
          <TableCell className="p-4 font-medium text-gray-800">
            {order._id}
          </TableCell>
          <TableCell className="p-4">{order.fullName}</TableCell>
          <TableCell className="p-4">{order.email}</TableCell>
          <TableCell className="p-4">{order.phone}</TableCell>
          <TableCell className="p-4 font-bold text-green-600">
            ${order.orderTotal.toFixed(2)}
          </TableCell>
          <TableCell className="p-4">
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                order.orderStatus === "Delivered"
                  ? "bg-green-200 text-green-800"
                  : order.orderStatus === "Processing"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </TableCell>
          <TableCell className="p-4">
            <div className="space-y-2">
              {order.cartItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>{item.title}</span>
                  <span>
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

    </div>
  )
}

export default pages


