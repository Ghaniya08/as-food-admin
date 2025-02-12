"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js Router

export default function SignIn({ setIsAuthenticated }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Correct Next.js navigation

  const handleLogin = () => {
    if (username === "ghaniyakhan08" && password === "asfoodbygk1012") {
      setIsAuthenticated(true);
      router.push("/dashboard"); // Correct way to navigate in Next.js
    } else {
      setError("Please try again, password incorrect");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="p-6 w-[400px] bg-yellow-400 h-[350px] rounded-lg shadow-lg">
        <div>
          <h2 className="text-2xl underline font-extrabold text-center mb-6 text-black">
            Admin Sign In
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-lg font-medium text-black">User Name:</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 w-full border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium text-black">Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 w-full border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full mt-4 p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
