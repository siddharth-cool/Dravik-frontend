import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Sidebar from "./Sidebar";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

interface Investor {
  wallet: string;
  shares: number;
}

interface Asset {
  ipId: string;
  metadata: {
    title: string;
  };
  creatorShares: number;
  investors: Investor[];
  revenueEarned: Record<string, number>;
}

interface Props {
  token: string;
}

export default function IPFiDashboard({ token }: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<string | null>(null); // ipId being processed
  const API = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(`${API}/ipfi-assets`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAssets(res.data.assets))
      .catch((err) => console.error(err));
  }, [token]);

  const handleClaimRevenue = async (ipId: string, totalRevenue: number) => {
    if (!totalRevenue) return alert("No revenue to claim");
    setLoading(ipId); // disable button
    try {
      const res = await axios.post(
        `${API}/claim`,
        { ipId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert(`Revenue claimed: ${totalRevenue} WIP`);
        const updated = await axios.get(`${API}/ipfi-assets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssets(updated.data.assets);
      } else {
        alert(res.data.message || "Claim failed");
      }
    } catch (err: any) {
      console.error(err);
      alert("Error claiming revenue: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-5 flex-1">
        <h1 className="text-2xl font-bold mb-5">IPFi Dashboard</h1>

        {!assets.length && <p className="text-gray-500">No IPFi assets yet.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assets.map((asset, index) => {
            const { ipId, metadata, creatorShares, investors, revenueEarned } = asset;

            const pieData = [
              { name: "Creator", value: creatorShares },
              ...investors.map((inv) => ({ name: inv.wallet, value: inv.shares })),
            ];

            const totalRevenue = Object.values(revenueEarned || {}).reduce(
              (a: number, b: number) => a + Number(b),
              0
            );

            return (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-4">{metadata.title}</h2>
                <p className="text-sm text-gray-600 mb-4">IP ID: {ipId}</p>

                {/* PieChart inside card */}
                <div className="flex justify-center mb-4">
                  <PieChart width={300} height={250}>
                    <Pie
                      data={pieData}
                      cx={150}
                      cy={120}
                      outerRadius={100}
                      dataKey="value"
                      label
                    >
                      {pieData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>

                <div className="mt-3 text-lg font-bold">
  <div>
    Total Revenue (WIP):{" "}
    <span className="text-blue-600">{totalRevenue} WIP</span>
  </div>
  <div>
    Claimable Revenue:{" "}
    <span className="text-green-600">
      {totalRevenue || 0} Sepeth
    </span>
  </div>
</div>


                <div className="mt-3">
                  <h3 className="text-md font-semibold mb-1">Investors:</h3>
                  {investors.length ? (
                    investors.map((inv, idx) => (
                      <p key={idx} className="text-gray-700 text-sm">
                        {inv.wallet} — {inv.shares} shares
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No investors yet.</p>
                  )}
                </div>

                {totalRevenue > 0 && (
                  <button
                    onClick={() => handleClaimRevenue(ipId, totalRevenue)}
                    disabled={loading === ipId}
                    className={`mt-4 px-4 py-2 rounded text-white ${
                      loading === ipId
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-500"
                    }`}
                  >
                    {loading === ipId ? "Processing..." : "Claim Revenue"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
