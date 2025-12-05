import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import "./App.css";

function App() {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("jwt") || null
  );

  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem("jwt", token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("jwt");
  };

  return (
    <Router>
      <div className="App bg-[#eceef3] min-h-screen text-gray-900 p-6 ">
        <Header token={token} onLogout={handleLogout} />

        <main className="max-w-6xl mx-auto mt-6">
          <Routes>
  <Route
    path="/"
    element={
      token ? <Dashboard token={token} /> : <LandingPage />
    }
  />

  <Route
    path="/register"
    element={
      token ? <RegisterAssetPage token={token} /> : <Navigate to="/login" />
    }
  />

  <Route
    path="/assets"
    element={
      token ? <MyAssetsPage token={token} /> : <Navigate to="/login" />
    }
  />

  <Route
  path="/ipfi-dashboard"
  element={token ? <IPFiDashboard token={token} /> : <Navigate to="/login" />}
/>

<Route
  path="/marketplace"
  element={token ? <LicenseMarketplace token={token} /> : <Navigate to="/login" />}
/>

<Route path="/marketplace/add" element={
  token ? <AddToMarketplace token={token} /> : <Navigate to="/login" />
} />

<Route
  path="/my-licenses"
  element={
    token ? <MyLicenses token={token} /> : <Navigate to="/login" />
  }
/>

  <Route path="/login" element={<Login onLogin={handleLogin} />} />
  <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
</Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
