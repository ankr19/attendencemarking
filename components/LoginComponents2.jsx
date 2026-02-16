"use client"
import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";

export default function LoginComponents() {
  const [activeTab, setActiveTab] = useState("admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">

      {/* Tab Switcher */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full p-1 flex gap-2">
        <button
          // onClick={() => setActiveTab("user")}
          className={`px-6 py-2 rounded-full font-medium ${
            activeTab === "admin"
              ? "bg-white text-purple-900"
              : "text-white"
          }`}
        >
          Admin Login
        </button>
      </div>

      <AdminLogin /> 
      
    </div>
  );
}
