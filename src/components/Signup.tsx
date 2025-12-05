import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

type Props = { onLogin: (token: string) => void };

export default function Signup({ onLogin }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    wallet: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigate

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
const API = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.wallet) {
      return alert("Fill all fields");
    }
    setLoading(true);

    try {
      const res = await axios.post(`${API}/signup`, {
        name: form.name,
        email: form.email,
        walletAddress: form.wallet,
        password: form.password,
      });

      // Option 1: Automatically log in after signup
      onLogin(res.data.token);

      // Option 2: Navigate to dashboard
      navigate("/"); // ✅ redirect to dashboard

      alert("Signup successful!");
    } catch (err: any) {
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg max-w-md mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold text-sky-600">Signup</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="input"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="input"
      />

      <input
        type="text"
        name="wallet"
        placeholder="Wallet Address"
        value={form.wallet}
        onChange={handleChange}
        className="input"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="input"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl text-white font-bold transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-sky-600 hover:bg-sky-500 active:bg-sky-700"
        }`}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}
