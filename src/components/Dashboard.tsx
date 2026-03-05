import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function Dashboard({
  token,
  role,
  user
}: {
  token: string;
  role: string | null;
  user: any;
})
 {
  
  const [assets, setAssets] = useState<any[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(true);
  
   const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {

  axios
    .get(`${API}/assets`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setAssets(res.data.assets))
    .finally(() => setLoadingAssets(false));
}, [token]);


  const profileImage = assets[0]?.imageUrl || "https://via.placeholder.com/120";

  if (loadingAssets) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading assets...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar role={user?.role || null} />


      <div className="flex-1 max-w-4xl mx-auto mt-20 px-6 space-y-8">
        {/* Welcome Card with Profile Image */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 text-center flex flex-col items-center">
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-4 shadow-md border-2 border-sky-500"
          />

          <h2 className="text-3xl font-extrabold text-sky-600 mb-4">
            Welcome to Dravik Vault
          </h2>

          {user && (
            <div className="space-y-2">
              <p className="text-xl font-semibold text-gray-900">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 font-mono">{user.wallet}</p>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Assets Created</p>
            <p className="text-2xl font-bold text-sky-600">{assets.length}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Latest Asset</p>
            <p className="text-base font-semibold text-gray-900">
              {assets[0]?.metadata?.title || "—"}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Explore Latest</p>
            {assets[0]?.ipId ? (
              <a
                href={`https://aeneid.explorer.story.foundation/ipa/${assets[0].ipId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 font-semibold hover:underline"
              >
                View on Explorer
              </a>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {/* Action Buttons */}
<div className="flex justify-center gap-4 mt-8 flex-wrap">

  {role === "admin" && (
    <Link
      to="/admin"
      className="bg-red-600 px-6 py-3 no-underlinerounded-xl text-white hover:bg-red-500 transition flex items-center gap-2 shadow-md hover:shadow-lg"
    >
      {/* Shield Icon */}
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
          d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"
        />
      </svg>
      Admin Panel
    </Link>
  )}

  <Link
    to="/register"
    className="bg-sky-600 px-6 py-3 no-underline rounded-xl text-white hover:bg-sky-500 transition flex items-center gap-2 shadow-md hover:shadow-lg"
  >
    {/* Plus Icon */}
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
        d="M12 4v16m8-8H4"
      />
    </svg>
    Register New Asset
  </Link>

  <Link
    to="/assets"
    className="bg-gray-900 px-6 py-3 no-underline rounded-xl text-white hover:bg-gray-700 transition flex items-center gap-2 shadow-md hover:shadow-lg"
  >
    {/* Folder Icon */}
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
        d="M3 7h5l2 3h11v9H3V7z"
      />
    </svg>
    View My Assets
  </Link>

</div>

      </div>
    </div>
  );
}
