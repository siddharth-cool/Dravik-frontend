import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard({
  token,
  role,
}: {
  token: string;
  role: string | null;
}) {
  const [stats, setStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const [showLogs, setShowLogs] = useState(false);
const API = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardRes = await axios.get(
          `${API}/admin/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const activityRes = await axios.get(
         `${API}/admin/activity`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStats(dashboardRes.data.stats);
        setRecentActivity(dashboardRes.data.recentActivity || []);
        setActivityLogs(activityRes.data.logs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const chartData = stats
    ? [
        { name: "Users", value: stats.totalUsers },
        { name: "Assets", value: stats.totalAssets },
        { name: "Sales", value: stats.totalSales },
        { name: "Tickets", value: stats.openTickets },
      ]
    : [];

  return (
    <div className="flex ">
      <Sidebar role={role} />

      <div className="flex-1 p-8">
        <div className="header p-6 mb-6">
          <h1 className="header-title text-3xl">
            Admin Dashboard
          </h1>
          <p className="header-subtitle">
            Platform overview and analytics
          </p>
        </div> 

        {loading ? (
          <p className="text-gray-500">Loading dashboard...</p>
        ) : (
          <>
            <div className="space-y-8">
  {/* STAT CARDS */}
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <StatCard label="Total Users" value={stats.totalUsers} />
              <StatCard label="Active Today" value={stats.activeUsersToday} />
              <StatCard label="Total Assets" value={stats.totalAssets} />
              <StatCard label="Total Sales" value={stats.totalSales} />
            </div>

            {/* ANALYTICS CHART */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Platform Overview
              </h2>

              <ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
    <XAxis dataKey="name" stroke="#6b7280" />
    <YAxis stroke="#6b7280" />
    <Tooltip
      contentStyle={{
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    />
    <Bar
  dataKey="value"
  radius={[8, 8, 0, 0]}
  fill="#2563eb"
  animationDuration={1200}
  animationBegin={200}
  isAnimationActive={true}
/>

  </BarChart>
</ResponsiveContainer>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Recent Activity
              </h2>

              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div
                    key={i}
                    className="p-3 border rounded-lg text-sm flex justify-between"
                  >
                    <div>
                      <span className="font-semibold">
                        {a.email || "System"}
                      </span>{" "}
                      — {a.action}
                    </div>
                    <span className="text-gray-500">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FULL ACTIVITY LOG VIEW */}
<div className="bg-white p-6 rounded-xl shadow">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">
      Full Activity Logs
    </h2>

    <button
      onClick={() => setShowLogs(!showLogs)}
      className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
    >
      {showLogs ? "Hide Logs" : "View Logs"}
    </button>
  </div>

  {showLogs && (
    <div className="max-h-96 overflow-y-auto border rounded-lg animate-fadeIn">
      {activityLogs.length === 0 ? (
        <p className="p-4 text-gray-500 text-sm">No logs available.</p>
      ) : (
        activityLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 border-b text-sm hover:bg-gray-50 transition"
          >
            <div className="font-semibold">
              {log.email || "System"}
            </div>
            <div>{log.action}</div>
            <div className="text-gray-500 text-xs">
              {new Date(log.created_at).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  )}
</div>


            <div className="flex gap-4">
  <Link
    to="/admin/users"
    className="bg-sky-600 px-6 py-3 rounded-xl text-white hover:bg-sky-500 transition flex items-center gap-2"
  >
    {/* Users Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-1a4 4 0 00-3-3.87M9 20H4v-1a4 4 0 013-3.87m10-5.13a4 4 0 11-8 0 4 4 0 018 0zm6 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    Manage Users
  </Link>

  <Link
    to="/admin/tickets"
    className="bg-sky-600 px-6 py-3 rounded-xl text-white hover:bg-sky-500 transition flex items-center gap-2"
  >
    {/* Ticket Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 14l2-2 4 4m-6-6l2-2 4 4M7 7h10v10H7z"
      />
    </svg>
    Support Tickets
  </Link>
</div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-gray-500">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
