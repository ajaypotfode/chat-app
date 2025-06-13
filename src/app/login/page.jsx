"use client"
import UseAuthData from "@/hooks/useAuthData";
import Link from "next/link";

export default function LoginPage() {
    const {loginData,getUserLogin,handleLoginData}=UseAuthData()
    
  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center">
      <div className="bg-[#2A2A2A] p-8 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={getUserLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email||""}
            onChange={handleLoginData}
            className="w-full p-3 rounded-lg bg-[#1E1E1E] text-white border border-[#444] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
             name="password"
            value={loginData.password||""}
            onChange={handleLoginData}
            className="w-full p-3 rounded-lg bg-[#1E1E1E] text-white border border-[#444] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#F25C5C] text-white py-3 rounded-lg hover:bg-[#e04b4b] transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Don't have an account? <Link href="/signup" className="text-[#F25C5C] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
