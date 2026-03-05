import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";

export default function AdminTickets({
  token,
  role,
}: {
  token: string;
  role: string | null;
}) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyMap, setReplyMap] = useState<{ [key: number]: string }>({});
  const [sendingId, setSendingId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const loadTickets = async (currentPage = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/admin/tickets?page=${currentPage}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTickets(res.data.tickets);
      setTotalPages(res.data.pagination.totalPages);
      setPage(res.data.pagination.page);

      toast.success("Tickets loaded");
    } catch (err) {
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets(page);
  }, [token, page]);

  const sendReply = async (ticketId: number) => {
    const reply = replyMap[ticketId];
    if (!reply) return;

    try {
      setSendingId(ticketId);

      await axios.post(
        "http://localhost:5000/admin/ticket/reply",
        { ticketId, reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReplyMap((prev) => ({ ...prev, [ticketId]: "" }));
      toast.success("Reply sent successfully");
      loadTickets(page);
    } catch (err) {
      toast.error("Failed to send reply");
    } finally {
      setSendingId(null);
    }
  };

  const updateStatus = async (ticketId: number, status: string) => {
    try {
      await axios.post(
        "http://localhost:5000/admin/ticket/status",
        { ticketId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Status updated");
      loadTickets(page);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const closeTicket = async (ticketId: number) => {
    try {
      await axios.post(
        "http://localhost:5000/admin/ticket/close",
        { ticketId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Ticket closed");
      loadTickets(page);
    } catch (err) {
      toast.error("Failed to close ticket");
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "open") return "bg-yellow-100 text-yellow-700";
    if (status === "in_progress") return "bg-blue-100 text-blue-700";
    if (status === "closed") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />

      <div className="flex-1 p-8">
        <div className="header p-6 mb-6">
          <h2 className="header-title text-3xl">Admin Support Panel</h2>
          <p className="header-subtitle">
            Manage and respond to user tickets
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="space-y-6">
              {tickets.map((t, index) => (
                <div
                  key={t.id}
                  className="card animate-ticket"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">{t.email}</p>
                      <p className="text-lg font-bold">{t.subject}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusColor(
                        t.status
                      )}`}
                    >
                      {t.status?.toUpperCase()}
                    </span>
                  </div>

                  <p className="mb-3">{t.message}</p>

                  <div className="flex gap-3 mb-3">
                    <select
                      value={t.status}
                      onChange={(e) =>
                        updateStatus(t.id, e.target.value)
                      }
                      className="px-3 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>

                    {t.status !== "closed" && (
                      <button
                        onClick={() => closeTicket(t.id)}
                        className="bg-red-600 px-5 py-2.5 rounded-xl text-white hover:bg-red-500 transition flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        {/* X Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Close Ticket
                      </button>
                    )}
                  </div>

                  {t.admin_reply && (
                    <div className="bg-green-50 p-3 rounded mb-3">
                      <p className="font-semibold">Previous Reply:</p>
                      <p>{t.admin_reply}</p>
                    </div>
                  )}

                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
                    placeholder="Write reply..."
                    value={replyMap[t.id] || ""}
                    onChange={(e) =>
                      setReplyMap((prev) => ({
                        ...prev,
                        [t.id]: e.target.value,
                      }))
                    }
                  />

                  <button
  onClick={() => sendReply(t.id)}
  disabled={sendingId === t.id || !replyMap[t.id]}
  className={`px-6 py-3 rounded-xl text-white transition flex items-center gap-2 shadow-md hover:shadow-lg ${
    sendingId === t.id || !replyMap[t.id]
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-sky-600 hover:bg-sky-500"
  }`}
>
  {/* Send Icon */}
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
      d="M22 2L11 13"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 2L15 22L11 13L2 9L22 2Z"
    />
  </svg>
  {sendingId === t.id ? "Sending..." : "Send Reply"}
</button>

                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-10 items-center flex-wrap">
  <button
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
    className={`px-5 py-2.5 rounded-xl text-white transition flex items-center gap-2 shadow-md hover:shadow-lg ${
      page === 1
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gray-900 hover:bg-gray-700"
    }`}
  >
    {/* Left Arrow */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Previous
  </button>

  <span className="px-4 py-2 text-gray-600 font-medium">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage((p) => p + 1)}
    className={`px-5 py-2.5 rounded-xl text-white transition flex items-center gap-2 shadow-md hover:shadow-lg ${
      page === totalPages
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gray-900 hover:bg-gray-700"
    }`}
  >
    Next
    {/* Right Arrow */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>

          </>
        )}
      </div>
    </div>
  );
}
