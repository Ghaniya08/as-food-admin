"use client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SignIn from "../components/signin";
import Dashboard from "@/components/Dashboard";
// Yeh path sahi check karna!

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
      </Routes>
    </Router>
  );
}

export default App;
