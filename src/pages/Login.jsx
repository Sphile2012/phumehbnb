import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPageUrl } from "@/utils";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) return;
    login({
      ...form,
      full_name: form.full_name || form.email.split("@")[0],
      created_date: new Date().toISOString(),
      role: "user",
    });
    navigate(createPageUrl("Home"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 32 32" className="h-10 w-10 text-[#FF385C]" fill="currentColor">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.907 6.478-6.5 6.478-2.08 0-4.198-.963-6.237-2.735l-.228-.202-.312-.29-.012-.012-.312.29-.228.202c-2.039 1.772-4.157 2.735-6.237 2.735C5.907 28.478 3 26.062 3 22l.001-.228.01-.415c.05-.924.293-1.805.96-3.396l.145-.353c.986-2.296 5.146-11.005 7.1-14.836l.533-1.025C13.037 1.963 14.492 1 16.5 1h-.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-center mb-1">Welcome to Phumeh</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={form.full_name}
              onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="mt-1"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-xl py-5 font-semibold">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
