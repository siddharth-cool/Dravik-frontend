import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = { onLogin: (token: string) => void };

export default function Login({ onLogin }: Props) {
  const [form, setForm] = useState({ wallet: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.wallet || !form.password) return alert("Enter wallet and password");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/login`, {
        walletAddress: form.wallet,
        password: form.password, // ✅ send password
      });

      onLogin(res.data.token);

      // 🔥 Redirect to Dashboard automatically
      navigate("/");

    } catch (err: any) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }

    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg max-w-md mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold text-sky-600">Login</h1>

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
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
