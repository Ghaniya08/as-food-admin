"use client";
import { client } from "@/lib/client";
import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  available: boolean;
  tags: string[];
  image: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState("");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.fetch(`*[_type == "food"]`);
      setProducts(result);
    };

    fetchData();
  }, []);

  // Handle Edit Click
  const handleEditClick = (item: Product) => {
    setSelectedProduct({ ...item });
    setOpen(true);
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
      });
    }
  };

  // Handle Availability Toggle
  const handleAvailabilityToggle = () => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        available: !selectedProduct.available,
      });
    }
  };

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const imageData = new FormData();
    imageData.append("file", imageFile);

    const res = await fetch("", {
      method: "POST",
      body: imageData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  // Handle Adding Tags
  const handleAddTag = () => {
    if (newTag.trim() && selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        tags: [...selectedProduct.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!selectedProduct) return;
    setLoading(true);

    let uploadedImageUrl = selectedProduct.image;
    if (imageFile) {
      uploadedImageUrl = await handleImageUpload();
    }

    const updatedProductData = {
      ...selectedProduct,
      image: uploadedImageUrl,
    };

    try {
      console.log("📤 Sending Data to API:", updatedProductData);

      const response = await fetch("/api/editproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProductData),
      });

      const data = await response.json();
      console.log("📩 API Response:", data);

      if (response.ok) {
        console.log("✅ Update Success");

        setProducts((prev) =>
          prev.map((p) => (p._id === selectedProduct._id ? updatedProductData : p))
        );

        setOpen(false);
      } else {
        console.error("❌ Update Failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
    }

    setLoading(false);
  };
  

  return (
    <div>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
        <Table className="bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Original Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50 transition">
                <TableCell>
                <Image
  src={item.image ? urlFor(item.image).url() : "/placeholder.jpg"}
  alt={item.name}
  width={60}
  height={60}
  className="rounded-lg object-cover"
/>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="font-bold text-green-600">$ {item.price}</TableCell>
                <TableCell className="text-gray-500 line-through">$ {item.originalPrice}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${item.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {item.available ? "In Stock" : "Out of Stock"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(item)} className="flex items-center space-x-1">
                    <Pencil size={16} />
                    <span>Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      {selectedProduct && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogClose onClick={() => setOpen(false)} />
            </DialogHeader>
            <div className="space-y-4">
              <Input name="name" value={selectedProduct.name} onChange={handleInputChange} />
              <Input name="category" value={selectedProduct.category} onChange={handleInputChange} />
              <Input name="price" type="number" value={selectedProduct.price} onChange={handleInputChange} />
              <Input name="originalPrice" type="number" value={selectedProduct.originalPrice} onChange={handleInputChange} />
              <Textarea name="description" value={selectedProduct.description} onChange={handleInputChange} />
              <Switch checked={selectedProduct.available} onCheckedChange={handleAvailabilityToggle}>
                Available
              </Switch>
              <div className="flex space-x-2">
                <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add Tag" />
                <Button onClick={handleAddTag}>+</Button>
              </div>
              {/* <Input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} /> */}
            </div>
            <Button onClick={handleUpdate} disabled={loading} className="mt-4 bg-black text-white">
              {loading ? "Updating..." : "Confirm Edit"}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Page;
