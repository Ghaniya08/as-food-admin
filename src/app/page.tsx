"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/signin";
import Dashboard from "@/components/Dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to SignIn page
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      {isAuthenticated ? <Dashboard /> : <SignIn setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
}
