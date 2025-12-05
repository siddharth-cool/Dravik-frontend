import  { useEffect, useState } from "react";
import axios from "axios";
import AssetCard from "./AssetCard";
import Sidebar from "./Sidebar";

type Props = { token: string };

export default function MyAssetsPage({ token }: Props) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_BACKEND_URL;
  
  const fetchAssets = async () => {
    try {
      const res = await axios.get(`${API}/assets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data.assets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div>
        <Sidebar />
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-sky-600 mb-8">My Assets</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {assets.map((asset: any, i: number) => (
            <AssetCard key={i} asset={asset} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
