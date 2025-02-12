"use client"
import { useState } from 'react';
import { FaCamera } from "react-icons/fa";
export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    tags: '',
    image: null,
    description: '',
    available: false,
  });
  
  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e:any) => {
    setForm((prev) => ({ ...prev, image: e.target.files?.[0] || null }));
  };
const handleSubmit = async (e: any) => {
    e.preventDefault(); 
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && e.target.image.files.length > 0) {
        formData.append(key, e.target.image.files[0]); 
      } else {
        formData.append(key, String(value));
      }
    });
    try {
      const response = await fetch("/api/productapi", {
        method: "POST",
        body: formData, 
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product");
      }
      alert("✅ Product added successfully!");
      setForm({
        name: "",
        category: "",
        price: "",
        originalPrice: "",
        tags: "",
        image: null,
        description: "",
        available: false,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };  
  return (
   <div>
        <h1 className="scroll-m-20 mt-[30px] ml-[20px] text-2xl font-extrabold tracking-tight lg:text-3xl">Add Products</h1>
     <form
    onSubmit={handleSubmit}
    className=" mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6 lg:m-[50px]"
  >
    <div className="flex flex-col items-center">
      <label className="cursor-pointer relative flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200">
          <FaCamera className="text-gray-600 text-2xl" />
        </div>
        <span className="text-black mt-2 text-sm">Upload Cover Photo</span>
        <input type="file" name="image" className="hidden" onChange={handleImageChange} required />
      </label>
    </div>
    <input
        type="text" name="name" placeholder="Food Name" value={form.name} onChange={handleChange} required
        className="border p-3 rounded-lg"
      />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required  className="border p-3 rounded-lg"/>
      <input type="number" name="price" placeholder="Current Price" value={form.price} onChange={handleChange} required className="border p-3 rounded-lg"/>
      <input type="number" name="originalPrice" placeholder="Original Price" value={form.originalPrice} onChange={handleChange} className="border p-3 rounded-lg"/>
      <input type="text" name="tags" placeholder="Tags (comma-separated)" value={form.tags} onChange={handleChange} className="border p-3 rounded-lg"/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-3 rounded-lg"/>
      {/* <input type="file" name="image" onChange={handleImageChange} required /> */}

      <label className="flex items-center space-x-3 cursor-pointer">
  <input 
    type="checkbox" 
    name="available" 
    checked={form.available} 
    onChange={handleChange}  
    className="w-5 h-5 accent-green-500 border-gray-300 rounded focus:ring focus:ring-green-300"
  />
  <span className="text-gray-700 font-medium">Available</span>
</label>
      <button className="bg-black text-white py-3 rounded-lg text-lg transition">
      Add Now
    </button>
  </form>
   </div>
  );
}

