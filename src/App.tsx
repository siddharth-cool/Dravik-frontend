import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Dashboard from "./components/Dashboard";
import Header from "./components/header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RegisterAssetPage from "./components/RegisterAssetPage";
import MyAssetsPage from "./components/MyAssetsPage";
import IPFiDashboard from "./components/IPFiDashboard";
import LicenseMarketplace from "./components/LicenseMarketplace";
import AddToMarketplace from "./components/AddToMarketplace";
import MyLicenses from "./components/OwnedLicenseCard";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminUsers from "./components/admin/AdminUsers";
import AdminTickets from "./components/admin/AdminTickets";
import SupportPage from "./components/SupportPage";
import { Toaster } from "react-hot-toast";



import "./App.css";
<Toaster position="top-right" />
function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt") || null
  );
const API = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState<any>(null);

  // 🔥 Fetch user ONCE when token exists
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    axios
      .get(`${API}/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("jwt");
      });
  }, [token]);

  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem("jwt", token);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
  };

  return (
    <Router>
      <div className="App bg-[#eceef3] min-h-screen text-gray-900 p-6">
        <Header token={token} onLogout={handleLogout} />

        <main className="max-w-6xl mx-auto mt-6">
          <Routes>

            <Route
              path="/"
              element={
                token
                  ? <Dashboard token={token} role={user?.role || null} user={user} />
                  : <LandingPage />
              }
            />

            <Route
              path="/register"
              element={
                token
                  ? <RegisterAssetPage token={token} role={user?.role || null} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/assets"
              element={
                token
                  ? <MyAssetsPage token={token} role={user?.role || null} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/ipfi-dashboard"
              element={
                token
                  ? <IPFiDashboard token={token} role={user?.role || null} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/marketplace"
              element={
                token
                  ? <LicenseMarketplace token={token} role={user?.role || null} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/marketplace/add"
              element={
                token
                  ? <AddToMarketplace token={token} role={user?.role || null} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/my-licenses"
              element={
                token
                  ? <MyLicenses token={token} role={user?.role || null} />
                  : <Navigate to="/login" />
              }
            />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />

            <Route
              path="/support"
              element={
                token
                  ? <SupportPage token={token} role={user?.role || null} />
                  : <Navigate to="/login" />
              }
            />
            

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                token && user?.role === "admin"
                  ? <AdminDashboard token={token} role={user?.role || null} />
                  : <Navigate to="/" />
              }
            />

            <Route
              path="/admin/users"
              element={
                token && user?.role === "admin"
                  ? <AdminUsers token={token} role={user?.role || null}/>
                  : <Navigate to="/" />
              }
            />

            <Route
              path="/admin/tickets"
              element={
                token && user?.role === "admin"
                  ? <AdminTickets token={token} role={user?.role || null}/>
                  : <Navigate to="/" />
              }
            />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
