"use client";

import React, { useState } from "react";
import { Lock, Shield, Mail, Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/FirebaseConfig";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔐 Sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        adminForm.email,
        adminForm.password
      );

      const user = userCredential.user;

      // 🔎 Check role from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === "admin") {
        alert("Admin Login Successful");
        router.push("/admin-dashboard");
      } else {
        alert("Access Denied: Not an Admin");
      }

    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-red-500/20">

        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-center">
          <Shield className="w-10 h-10 text-white mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <input
            type="email"
            placeholder="Admin Email"
            value={adminForm.email}
            onChange={(e) =>
              setAdminForm({ ...adminForm, email: e.target.value })
            }
            className="w-full p-3 rounded bg-slate-700 text-white"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={adminForm.password}
              onChange={(e) =>
                setAdminForm({ ...adminForm, password: e.target.value })
              }
              className="w-full p-3 rounded bg-slate-700 text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded"
          >
            {loading ? "Checking..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
