import { useState, useEffect } from "react";
import axios from "axios";

function toast(msg: string) {
  alert(msg);
}

type Props = {
  token: string;
  onSuccess?: (asset: any) => void;
};

// Example PizzaDAO assets
const PIZZADAO_ASSETS = [
  {
    id: "molto-benny",
    title: "Molto Benny",
    description: "PizzaDAO mascot",
    imageUrl: "/assets/molto-benny.png",
    licenses: {
      commercialAllowed: true,
      remixAllowed: true,
      aiTrainingAllowed: true,
      revShare: 0,
      maxLicenses: 1,
    },
  },
  {
    id: "pepperoni-pie",
    title: "Pepperoni Pie",
    description: "Classic pizza slice on volcano",
    imageUrl: "/assets/pepperoni-pie.png",
    licenses: {
      commercialAllowed: true,
      remixAllowed: false,
      aiTrainingAllowed: true,
      revShare: 0,
      maxLicenses: 1,
    },
  },
];

export default function RegisterAsset({ token, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [usePizzaDAO, setUsePizzaDAO] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<any>(null);
  const API = import.meta.env.VITE_BACKEND_URL;
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    creatorName: "",
    creatorWallet: "",
    commercialAllowed: false,
    remixAllowed: false,
    aiTrainingAllowed: false,
    revShare: "0",
    maxLicenses: "1",
  });

  const [image, setImage] = useState<File | null>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [errors, setErrors] = useState<any>({});

  // Autofill PizzaDAO asset metadata & license terms
  useEffect(() => {
    if (selectedPizza) {
      setForm({
        ...form,
        title: selectedPizza.title,
        description: selectedPizza.description,
        commercialAllowed: selectedPizza.licenses.commercialAllowed,
        remixAllowed: selectedPizza.licenses.remixAllowed,
        aiTrainingAllowed: selectedPizza.licenses.aiTrainingAllowed,
        revShare: String(selectedPizza.licenses.revShare),
        maxLicenses: String(selectedPizza.licenses.maxLicenses),
      });
      setImage(null); // Use PizzaDAO image URL instead of uploaded image
    }
  }, [selectedPizza]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [target.name]: target.checked }));
      return;
    }
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  }

  function validate() {
    const newErr: any = {};
    if (!form.title.trim()) newErr.title = "Title is required";
    if (!form.description.trim()) newErr.description = "Description is required";
    if (!form.creatorName.trim()) newErr.creatorName = "Creator name is required";
    if (!form.creatorWallet.startsWith("0x") || form.creatorWallet.length !== 42)
      newErr.creatorWallet = "Invalid wallet address";
    if (Number(form.revShare) < 0) newErr.revShare = "Royalty must be 0 or above";
    if (Number(form.maxLicenses) <= 0)
      newErr.maxLicenses = "Must be at least 1 license";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return toast("Fix errors first.");
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));

    try {
      let imageFile: File | null = null;

      // ✅ Handle PizzaDAO image fetch
      if (usePizzaDAO && selectedPizza?.imageUrl) {
        const response = await fetch(selectedPizza.imageUrl);
        const blob = await response.blob();
        imageFile = new File([blob], selectedPizza.imageUrl.split("/").pop() || "pizza.png", {
          type: blob.type,
        });
        formData.append("image", imageFile);
      } else if (image) {
        imageFile = image;
        formData.append("image", image);
      }

      if (media) formData.append("media", media);

      const res = await axios.post(`${API}/register`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast("🎉 Asset registered successfully!");
      onSuccess?.({
        metadata: { ...form },
        explorer: res.data.data.explorer,
        ipId: res.data.data.ipId,
        txHash: res.data.data.txHash,
        imageUrl: res.data.data.imageUrl || (imageFile ? URL.createObjectURL(imageFile) : null),
      });

      // Reset form if not PizzaDAO
      if (!usePizzaDAO) {
        setForm({
          title: "",
          description: "",
          creatorName: "",
          creatorWallet: "",
          commercialAllowed: false,
          remixAllowed: false,
          aiTrainingAllowed: false,
          revShare: "0",
          maxLicenses: "1",
        });
        setImage(null);
        setMedia(null);
      }
    } catch (err: any) {
      toast("❌ Failed: " + (err.response?.data?.message || err.message));
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg max-w-2xl mx-auto border border-gray-300 space-y-6"
    >
      <h1 className="text-3xl font-bold text-sky-600 mb-2">Register IP Asset</h1>

      {/* PizzaDAO Toggle */}
      <label className="flex items-center gap-3 mb-3">
        <input
          type="checkbox"
          checked={usePizzaDAO}
          onChange={(e) => {
            setUsePizzaDAO(e.target.checked);
            setSelectedPizza(null);
          }}
        />
        Use PizzaDAO IP
      </label>

      {/* PizzaDAO gallery */}
      {usePizzaDAO && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {PIZZADAO_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className={`border rounded-xl p-2 cursor-pointer hover:border-sky-600 ${
                selectedPizza?.id === asset.id ? "border-sky-600 bg-sky-50" : ""
              }`}
              onClick={() => setSelectedPizza(asset)}
            >
              <img src={asset.imageUrl} className="w-full h-32 object-contain" />
              <p className="text-sm font-semibold mt-1">{asset.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* TITLE */}
      <input
        type="text"
        name="title"
        placeholder="Asset Title"
        value={form.title}
        onChange={handleChange}
        className="input"
        disabled={usePizzaDAO}
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="input h-28"
        disabled={usePizzaDAO}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}

      {/* CREATOR NAME */}
      <input
        type="text"
        name="creatorName"
        placeholder="Creator Name"
        value={form.creatorName}
        onChange={handleChange}
        className="input"
      />
      {errors.creatorName && (
        <p className="text-red-500 text-sm">{errors.creatorName}</p>
      )}

      {/* WALLET */}
      <input
        type="text"
        name="creatorWallet"
        placeholder="Wallet (0x...)"
        value={form.creatorWallet}
        onChange={handleChange}
        className="input"
      />
      {errors.creatorWallet && (
        <p className="text-red-500 text-sm">{errors.creatorWallet}</p>
      )}

      {/* LICENSE TERMS */}
      <div className="bg-[#f5f6fa] p-5 rounded-2xl border border-gray-300 mt-6 space-y-4">
        <h2 className="text-xl font-semibold text-sky-600 mb-1">License Terms</h2>

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            name="commercialAllowed"
            checked={form.commercialAllowed}
            onChange={handleChange}
            disabled={usePizzaDAO}
          />
          Allow Commercial Use
        </label>

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            name="remixAllowed"
            checked={form.remixAllowed}
            onChange={handleChange}
            disabled={usePizzaDAO}
          />
          Allow Remix / Derivatives
        </label>

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            name="aiTrainingAllowed"
            checked={form.aiTrainingAllowed}
            onChange={handleChange}
            disabled={usePizzaDAO}
          />
          Allow AI Training
        </label>

        {/* ROYALTY */}
        <div>
          <label className="text-gray-600 text-sm">Royalty % (0–100)</label>
          <input
            type="number"
            name="revShare"
            min={0}
            value={form.revShare}
            onChange={handleChange}
            className="input mt-1"
            disabled={usePizzaDAO}
          />
          {errors.revShare && (
            <p className="text-red-500 text-sm">{errors.revShare}</p>
          )}
        </div>

        {/* MAX LICENSES */}
        <div>
          <label className="text-gray-600 text-sm">Max Licenses</label>
          <input
            type="number"
            name="maxLicenses"
            min={1}
            value={form.maxLicenses}
            onChange={handleChange}
            className="input mt-1"
            disabled={usePizzaDAO}
          />
          {errors.maxLicenses && (
            <p className="text-red-500 text-sm">{errors.maxLicenses}</p>
          )}
        </div>
      </div>

      {/* IMAGE */}
      {!usePizzaDAO && (
        <>
          <label className="label">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="text-gray-700"
          />
        </>
      )}

      {/* MEDIA */}
      <label className="label">Media (Audio / Video)</label>
      <input
        type="file"
        accept="audio/*,video/*"
        onChange={(e) => setMedia(e.target.files?.[0] || null)}
        className="text-gray-700"
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading || (usePizzaDAO && !selectedPizza)}
        className={`w-full py-3 rounded-xl text-white font-bold transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-sky-600 hover:bg-sky-500 active:bg-sky-700"
        }`}
      >
        {loading ? "Registering..." : "Register IP Asset"}
      </button>
    </form>
  );
}
