"use client";
import React, { useEffect, useState } from 'react'
import SearchableProductList from './Searchbar'
import { IoSearch } from "react-icons/io5";
import { client } from '@/lib/client';
import Link from 'next/link';
const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);
     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await client.fetch(`*[_type == "food"]{
                _id,
                name,
                category,
                price,
                originalPrice,
                image,
                description,
                available,
                tags
            }`);
            setProducts(data);
        };
        fetchProducts();
    }, []);
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <div>
        <div>
                            <div className="flex items-center gap-[10px] px-[15px] py-[5px] border border-bordercoloryello rounded-2xl">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery} 
                                    onChange={handleSearch} 
                                   className="bg-transparent outline-none text-whitetext text-[14px] placeholder:text-whitetext w-full"
                                />
                                <IoSearch className="text-whitetext w-[20px] h-[20px]" />
                            </div>
                            {searchQuery && filteredProducts.length > 0 && (
                                <div className="absolute bg-white w-[240px] mt-1 border border-gray-300 rounded-md shadow-lg z-10">
                                    <ul>
                                        {filteredProducts.map((product: any) => (
                                            <li key={product._id} className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                                                    {product.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
    </div>
  )
}

export default Header
