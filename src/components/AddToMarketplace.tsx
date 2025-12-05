import { useEffect, useState } from "react";
import AssetCard from "./AssetCard";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";

interface Asset {
  id: number;
  ipId: string;
  metadata: any;
  imageUrl?: string;
  license?: any;
  listed?: boolean;
}

interface Props {
  token: string;
}

export default function AddToMarketplace({ token }: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [listingPrices, setListingPrices] = useState<Record<string, number>>({});
const API = import.meta.env.VITE_BACKEND_URL;
  // Fetch user assets and existing marketplace listings
  useEffect(() => {
    async function fetchAssets() {
      try {
        const [assetsRes, listingsRes] = await Promise.all([
          axios.get(`${API}/assets`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API}/market/listings`),
        ]);

        const activeListings: Record<string, boolean> = {};
        listingsRes.data.listings.forEach((l: any) => {
          activeListings[l.ip_id] = true;
        });

        const assetsWithListing = assetsRes.data.assets.map((asset: Asset) => ({
          ...asset,
          listed: !!activeListings[asset.ipId],
        }));

        setAssets(assetsWithListing);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load assets");
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, [token]);

  const handleList = async (ipId: string) => {
    try {
      const price = listingPrices[ipId];
      if (!price || price <= 0) {
        toast.error("Enter a valid price");
        return;
      }

      await axios.post(
        `${API}/list-license`,
        { ipId, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Asset listed successfully!");

      setAssets((prev) =>
        prev.map((asset) => (asset.ipId === ipId ? { ...asset, listed: true } : asset))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to list asset");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading assets...</p>;

return (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6">
      {/* Section Title */}
      <h1 className="text-2xl font-bold mb-6">Add to Marketplace</h1>

      {/* Toaster for notifications */}
      <Toaster position="top-right" />

      {loading ? (
        <p className="text-center mt-10">Loading assets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden"
            >
              <AssetCard asset={asset} />

              {/* Footer with price input and list button */}
              <div className="bg-gray-100 px-4 py-3 flex flex-col gap-2">
                <input
                  type="number"
                  placeholder="Set price in tokens"
                  value={listingPrices[asset.ipId] === undefined ? "" : listingPrices[asset.ipId]}

                  onChange={(e) =>
                    setListingPrices({ ...listingPrices, [asset.ipId]: Number(e.target.value) })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:bg-gray-200"
                  disabled={asset.listed}
                />
                <button
                  onClick={() => handleList(asset.ipId)}
                  className={`w-full py-2 rounded-lg text-white text-sm font-medium transition-all ${
                    asset.listed
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500"
                  }`}
                  disabled={asset.listed}
                >
                  {asset.listed ? "Already Listed" : "List in Marketplace"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
