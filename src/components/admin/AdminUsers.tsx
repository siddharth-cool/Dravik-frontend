import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";

export default function AdminUsers({
  token,
  role,
}: {
  token: string;
  role: string | null;
}) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const API = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axios.get(
          `${API}/admin/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  const getRoleColor = (role: string) => {
    if (role === "admin")
      return "bg-red-100 text-red-600";
    return "bg-blue-100 text-blue-600";
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />

      <div className="flex-1 p-8">
        <div className="header p-6 mb-6">
          <h2 className="header-title text-3xl">
            User Management
          </h2>
          <p className="header-subtitle">
            View and manage platform users
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <div className="card text-center text-gray-500">
            No users found.
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="card">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">
                      {u.name}
                    </p>
                    <p className="text-gray-600">
                      {u.email}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Wallet: {u.wallet_address}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                      u.role
                    )}`}
                  >
                    {u.role.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

