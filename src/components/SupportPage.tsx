import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import toast, { Toaster } from "react-hot-toast";

export default function SupportPage({
  token,
  role,
}: {
  token: string;
  role: string | null;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
const API = import.meta.env.VITE_BACKEND_URL;
  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/support/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.tickets);
    } catch (err) {
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const createTicket = async () => {
    if (!subject || !message) return;

    try {
      setSubmitting(true);
      await axios.post(
        `${API}/support/create`,
        { subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubject("");
      setMessage("");
      toast.success("Ticket created successfully!"); // ✅ Success toast
      loadTickets();
    } catch (err) {
      setError("Failed to create ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "open") return "bg-yellow-100 text-yellow-700";
    if (status === "closed") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <Toaster position="top-right" /> {/* Toast container */}

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="header p-6">
          <h2 className="header-title text-3xl">Support Center</h2>
          <p className="header-subtitle">
            Create and track your support tickets
          </p>
        </div>

        {/* Create Ticket Card */}
        <div className="flex justify-center">
          <div className="card w-full max-w-2xl mb-8">
            <label className="label">Subject</label>
            <input
              className="input mb-4"
              placeholder="Enter ticket subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <label className="label">Message</label>
            <textarea
              className="input mb-4 min-h-[120px]"
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={createTicket}
              disabled={submitting || !subject || !message}
              className={`w-full px-6 py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                submitting || !subject || !message
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-500 active:bg-sky-700"
              }`}
            >
              {/* Support Icon */}
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
                  d="M18 13V9a6 6 0 10-12 0v4l-2 2v1h16v-1l-2-2z"
                />
              </svg>

              {submitting ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        {/* Tickets List */}
        <div className="space-y-4">
          {loading ? (
            // ✅ Loading spinner
            <div className="flex justify-center mt-10">
              <div className="w-12 h-12 border-4 border-sky-600 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : tickets.length === 0 ? (
            <div className="card text-center text-gray-500">
              No support tickets yet.
            </div>
          ) : (
            tickets.map((t, index) => (
              // ✅ Fade-in animation
              <div
                key={t.id}
                className="card animate-fadeIn"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{t.subject}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      t.status
                    )}`}
                  >
                    {t.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-700 mb-2">{t.message}</p>

                {t.admin_reply && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl mt-3">
                    <p className="text-green-700 font-semibold">
                      Admin Reply:
                    </p>
                    <p className="text-green-600">{t.admin_reply}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tailwind animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
