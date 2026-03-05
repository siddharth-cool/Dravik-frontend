import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { ethers } from "ethers";

interface Listing {
  id: number;
  ip_id: string;
  creator_wallet: string;
  price: number;
  image?: string; // image from ipfs_metadata
  terms?: {
    imageUrl?: string;
    [key: string]: any;
  };
}

interface Props {
  token: string;
  role: string | null;
}


export default function LicenseMarketplace({ token, role }: Props) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [serverWallet, setServerWallet] = useState<string>("");
  const [processingId, setProcessingId] = useState<number | null>(null);
const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${API}/wallet/server`).then((res) => {
      setServerWallet(res.data.wallet);
    });
  }, []);

  const loadListings = () => {
    axios
      .get(`${API}/market/listings`)
      .then((res) => {
        const data = res.data.listings || [];
        // Add image if ipfs_metadata exists
        setListings(
          data.map((l: any) => ({
            ...l,
            image: l.image || null,
            terms: l.terms || {}, // keep terms if present
          }))
        );
      })
      .catch((err) => console.error("Failed loading listings", err));
  };

  useEffect(() => {
    loadListings();
  }, []);

  const buyLicense = async (listingId: number, price: number) => {
    if (!serverWallet) {
      alert("Server wallet not loaded yet!");
      return;
    }

    try {
      const provider = (window as any).ethereum;
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const user = accounts[0];

      // --- Check Sepolia network ---
      const chainId = await provider.request({ method: "eth_chainId" });
      if (chainId !== "0xaa36a7") {
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }],
          });
        } catch (switchError: any) {
          alert("Please switch your MetaMask network to Sepolia Testnet!");
          return;
        }
      }

      const valueWei = ethers.parseEther(price.toString());
      setProcessingId(listingId);

      const tx = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: user,
            to: serverWallet,
            value: `0x${valueWei.toString(16)}`,
          },
        ],
      });

      const res = await axios.post(
        `${API}/buy-license`,
        { listingId, paymentTxHash: tx, token: "SEPOLIA_ETH" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("License purchased! Tx: " + res.data.txHash);
      loadListings();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">License Marketplace</h1>
        {!listings.length && <p>No active listings</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <div
              key={l.id}
              className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between"
            >
              {/* Image */}
              {(l.terms?.imageUrl || l.image) && (
  <img
    src={l.terms?.imageUrl || l.image}
    alt={`Asset ${l.ip_id}`}
    className="w-full h-48 object-cover rounded-md mb-4"
  />
)}


              <div className="space-y-2">
                <h2 className="font-bold text-lg truncate">IP ID: {l.ip_id}</h2>
                <p className="text-sm text-gray-600 truncate">
                  Creator: <span className="text-sky-600">{l.creator_wallet}</span>
                </p>
                <p className="text-md font-semibold text-green-600">Price: {l.price} SepETH</p>
              </div>

              <button
  onClick={() => buyLicense(l.id, l.price)}
  disabled={processingId === l.id}
  className={`mt-4 w-full px-5 py-2.5 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
    processingId === l.id
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-sky-600 hover:bg-sky-500"
  }`}
>
  {/* Shopping Cart Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
  </svg>

  {processingId === l.id ? "Processing..." : "Buy License"}
</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
