import { client } from '@/lib/client';
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const page = async () => {
    const user = await client.fetch(` *[_type == "user"] {
  _id,
  email,
  userName
}
`)
  return (
    <div>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">Chefs List</h1>
      {/* <Table className="bg-white shadow-md rounded-lg overflow-hidden">
        <TableCaption>List of all available chefs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.map((item: any) => (
            <TableRow key={item._id} className="hover:bg-gray-50 transition">
              <TableCell>
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell className="font-bold text-green-600"> {item.experience}</TableCell>
              <TableCell className="text-gray-500 "> {item.specialty}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${item.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {item.available ? "Available" : "Not Available"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <Table className="bg-white shadow-md rounded-lg overflow-hidden">
          <TableCaption>List of all registered users</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.map((user:any) => (
              <TableRow key={user._id} className="hover:bg-gray-50 transition">
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
      {/* <Header/> */}

    </div>
  )
}

export default page
