// Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  role: string | null;
};

export default function Sidebar({ role }: Props) {
  const [open, setOpen] = useState(false);

  const isAdmin = role === "admin";

  return (
    <>
      {/* SIDEBAR BUTTON */}
      <button
        className="fixed top-45 left-12 p-2 bg-white shadow-lg rounded-xl z-50 hover:bg-gray-100 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="space-y-1">
          <div className="w-6 h-1 bg-gray-700 rounded"></div>
          <div className="w-6 h-1 bg-gray-700 rounded"></div>
          <div className="w-6 h-1 bg-gray-700 rounded"></div>
        </div>
      </button>

      {open && (
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          className="fixed top-62 left-10 w-64 bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-gray-200 z-40"
        >
          <h2 className="text-xl font-bold text-gray-800">
            {isAdmin ? "Admin Panel" : "Menu"}
          </h2>

          {/* ===== CUSTOMER MENU ===== */}
          {!isAdmin && (
            <>
              <Link to="/" className="block hover:text-sky-600">
                Dashboard
              </Link>

              <Link to="/register" className="block hover:text-sky-600">
                Register New Asset
              </Link>

              <Link to="/assets" className="block hover:text-sky-600">
                My Assets
              </Link>

              <Link to="/ipfi-dashboard" className="block hover:text-sky-600">
                IPFi Dashboard
              </Link>

              <Link to="/marketplace" className="block hover:text-sky-600">
                License Marketplace
              </Link>

              <Link to="/marketplace/add" className="block hover:text-sky-600">
                Add to Marketplace
              </Link>

              <Link to="/my-licenses" className="block hover:text-sky-600">
                My Licenses
              </Link>

              <Link to="/support" className="block hover:text-sky-600">
                Support Tickets
              </Link>
            </>
          )}

          {/* ===== ADMIN MENU ===== */}
          {isAdmin && (
            <>
            <Link to="/" className="block hover:text-sky-600">
                Dashboard
              </Link>
              <Link to="/admin" className="block hover:text-red-600">
                Admin Dashboard
              </Link>

              <Link to="/admin/users" className="block hover:text-red-600">
                Manage Users
              </Link>

              <Link to="/admin/tickets" className="block hover:text-red-600">
                Support Tickets
              </Link>
            </>
          )}
        </motion.div>
      )}
    </>
  );
}
