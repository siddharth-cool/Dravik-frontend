import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

type MyLicense = {
  id: number;
  ipId: string;
  terms: any;
  purchasedOn: string;
};

export default function MyLicenses({ token }: { token: string }) {
  const [licenses, setLicenses] = useState<MyLicense[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState<{ url: string } | null>(null);
  const API = import.meta.env.VITE_BACKEND_URL;
  async function loadLicenses() {
    try {
      const res = await axios.get<{ licenses: any[] }>(
        `${API}/my-licenses`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const parsed = res.data.licenses.map((l) => ({
        ...l,
        terms: typeof l.license_metadata === "string"
          ? JSON.parse(l.license_metadata)
          : l.terms,
      }));
      setLicenses(parsed);
    } catch (err) {
      console.error("Failed loading my licenses:", err);
    }
  }

  useEffect(() => {
    loadLicenses();
  }, []);

  if (licenses.length === 0) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-center p-4 text-gray-400">
          You have not purchased any licenses.
        </div>
      </div>
    );
  }

  const renderImage = (terms: any) => {
    const url = terms.imageUrl || terms.image;
    if (!url) return null;

    const displayUrl = url.startsWith("ipfs://")
      ? url.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
      : url;

    return (
      <div className="w-full h-36 overflow-hidden relative">
        <img src={displayUrl} alt="asset" className="w-full h-full object-cover rounded-t-xl" />
      </div>
    );
  };

  // 🔥 Simplified: No extension/type detection
  const openMediaModal = (terms: any) => {
    const url =
      terms.mediaUrl ||
      terms.imageUrl ||
      terms.image ||
      null;

    if (!url) return;

    setModalMedia({ url });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMedia(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {licenses.map((item) => {
          const t = item.terms || {};
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 flex flex-col overflow-hidden h-100"
            >
              {renderImage(t)}

              <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 truncate">
                    {t.title || "Licensed Asset"}
                  </h3>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-gray-700 mt-2">
                    <div>
                      <p className="font-semibold">Commercial</p>
                      <p>{t.commercialUse ? "Allowed" : "No"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Derivatives</p>
                      <p>{t.derivativesAllowed ? "Allowed" : "No"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">AI Training</p>
                      <p>{t.aiTraining ? "Allowed" : "No"}</p>
                    </div>
                    {t.commercialRevShare !== undefined && (
                      <div>
                        <p className="font-semibold">Rev Share</p>
                        <p>{t.commercialRevShare}%</p>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">Expiration</p>
                      <p>
                        {t.expiration === "0" || t.expiration === 0
                          ? "Lifetime"
                          : new Date(Number(t.expiration) * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  <p className="break-all">
                    <strong>IP ID:</strong> {item.ipId}
                  </p>
                  <p className="mt-1">
                    Purchased: {new Date(item.purchasedOn).toLocaleDateString()}
                  </p>
                  <a
                    href={`https://aeneid.explorer.story.foundation/ipa/${item.ipId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-sky-600 text-white text-center py-1.5 rounded-md mt-2 text-xs"
                  >
                    View on Explorer
                  </a>

                  {t.mediaUrl && (
                    <button
                      onClick={() => openMediaModal(t)}
                      className="inline-block w-full bg-gray-700 text-white text-center py-1.5 rounded-md mt-2 text-xs hover:bg-gray-600"
                    >
                      View Media
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL with SMART AUTO-DETECT VIEWER */}
      {modalOpen && modalMedia && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-4 w-[90%] max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 font-bold hover:text-gray-900"
            >
              ✕
            </button>

            {/* Try VIDEO first */}
            <video
              controls
              className="w-full rounded-md"
              src={modalMedia.url}
              onError={(e) => {
                (e.target as HTMLVideoElement).style.display = "none";
                const a = document.getElementById("audio-player");
                if (a) a.style.display = "block";
              }}
            />

            {/* Try AUDIO next */}
            <audio
              id="audio-player"
              controls
              className="w-full mt-2 hidden"
              src={modalMedia.url}
              onError={(e) => {
                (e.target as HTMLAudioElement).style.display = "none";
                const img = document.getElementById("image-fallback");
                if (img) img.style.display = "block";
              }}
            />

            {/* FALLBACK → IMAGE */}
            <img
              id="image-fallback"
              src={modalMedia.url}
              className="w-full h-auto rounded-md hidden"
              alt="media"
            />
          </div>
        </div>
      )}
    </div>
  );
}
