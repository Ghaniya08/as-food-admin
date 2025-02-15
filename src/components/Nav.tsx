"use client"
import pic from "../../public/admin.jpg";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChefHat,
  ShoppingBag,
  FileText,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  // const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard" },
    { label: "Products", icon: <ShoppingBag className="w-5 h-5" />, href: "/dashboard/products" },
    { label: "Chefs", icon: <ChefHat className="w-5 h-5" />, href: "/dashboard/chefs" },
    { label: "Users", icon: <Users className="w-5 h-5" />, href: "/dashboard/users" },
    { label: "Add Products", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard/addproducts" },
    { label: "Orders", icon: <FileText className="w-5 h-5" />, href: "/dashboard/orders" },
  ];

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarContent onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 bg-white border-r">
        <SidebarContent />
      </div>
    </div>
  );
};

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard" },
    { label: "Products", icon: <ShoppingBag className="w-5 h-5" />, href: "/dashboard/products" },
    { label: "Chefs", icon: <ChefHat className="w-5 h-5" />, href: "/dashboard/chefs" },
    { label: "Users", icon: <Users className="w-5 h-5" />, href: "/dashboard/users" },
    { label: "Add Products", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard/addproducts" },
    { label: "Orders", icon: <FileText className="w-5 h-5" />, href: "/dashboard/orders" },
  ];

  return (
    <>
      {/* Logo/Header */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Food Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} onClick={onClose}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
     
      <div className="p-4 border-t flex items-center gap-3 mt-auto">
        <Image src={pic} alt="admin" className="w-[50px] h-[50px] rounded-full" />
        <div>
          <p className="font-medium text-sm">GHANIYA KHAN</p>
          <p className="text-xs text-gray-500">ghaniyaakhann08@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
