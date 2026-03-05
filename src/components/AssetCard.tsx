import { useState } from "react";

export default function AssetCard({ asset }: any) {
  const [showLicense, setShowLicense] = useState(false);

  const shareText = `🚀 I just published "${asset.metadata?.title}" on Dravik — a licensed digital asset secured by Story Protocol on-chain.

${asset.metadata?.description}

🔐 Verified ownership
📜 Transparent licensing
🎨 Original creation by ${asset.metadata?.creatorName}

View asset image: ${asset.imageUrl}`;

  return (
    <div className="group card transition-all hover:scale-[1.03] px-6 py-5 flex flex-col bg-white rounded-2xl shadow-md">
      {/* IMAGE */}
      {asset.imageUrl && (
        <div className="mb-4 w-full rounded-lg overflow-hidden">
          <img
            src={asset.imageUrl}
            alt={asset?.metadata?.title}
            className="w-full object-contain rounded-lg shadow-sm"
          />
        </div>
      )}

      {/* TEXT INFO */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-sky-600 mb-2">
            {asset.metadata?.title}
          </h3>

          <p className="text-gray-700 text-sm mb-2">
            {asset.metadata?.description}
          </p>

          <p className="text-gray-500 text-xs">
            <strong>Creator:</strong> {asset.metadata?.creatorName}
          </p>
          <p className="text-gray-500 text-xs truncate mb-2">
            <strong>Wallet:</strong> {asset.metadata?.creatorWallet}
          </p>

          <a
            href={asset.explorer}
            target="_blank"
            className="text-sky-600 text-xs underline hover:text-sky-500 transition"
          >
            View on Explorer →
          </a>
        </div>

        {/* LICENSE */}
        {asset.license && (
          <div className="mt-3">
            <button
              onClick={() => setShowLicense(!showLicense)}
              className={`w-full px-5 py-2.5 rounded-xl text-white text-sm transition flex items-center justify-center gap-2 shadow-md
                ${showLicense ? "bg-sky-500 hover:bg-sky-400" : "bg-sky-600 hover:bg-sky-500"}`}
            >
              {/* Document Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                />
              </svg>

              {showLicense ? "Hide License" : "Show License"}
            </button>

            {showLicense && (
              <div className="mt-2 p-3 rounded-lg bg-black/20 text-white text-xs space-y-1 border border-white/10">
                <p>
                  <strong>Commercial:</strong>{" "}
                  {asset.license.commercialUse ? "Allowed" : "Not Allowed"}
                </p>
                <p>
                  <strong>Derivatives:</strong>{" "}
                  {asset.license.derivativesAllowed ? "Allowed" : "Not Allowed"}
                </p>
                <p>
                  <strong>AI Training:</strong>{" "}
                  {asset.license.aiTraining ? "Allowed" : "Not Allowed"}
                </p>
                <p>
                  <strong>Rev Share:</strong> {asset.license.commercialRevShare}%
                </p>
                <p>
                  <strong>Max Licenses:</strong> {asset.license.maxLicenses}
                </p>
                <p>
                  <strong>Transferable:</strong>{" "}
                  {asset.license.transferable ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* SHARE SECTION */}
        <div className="mt-3 flex flex-wrap gap-2">
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              asset.imageUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs hover:bg-blue-500 shadow-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.5S3.34 9.5 4.98 9.5 7.96 8.16 7.96 6.5 6.62 3.5 4.98 3.5zM2 21.5h5.96V10H2v11.5zM9.96 10h5.71v1.53h.08c.8-1.51 2.75-3.1 5.66-3.1 6.06 0 7.18 3.98 7.18 9.16V21.5h-5.96v-8.22c0-1.96-.03-4.49-2.74-4.49-2.74 0-3.16 2.15-3.16 4.37v8.34H9.96V10z" />
            </svg>
            LinkedIn
          </a>

          {/* X/Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-800 text-white text-xs hover:bg-blue-700 shadow-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.56c-.88.39-1.82.65-2.81.77a4.92 4.92 0 002.16-2.71 9.86 9.86 0 01-3.12 1.2A4.92 4.92 0 0016.67 3c-2.72 0-4.92 2.2-4.92 4.91 0 .39.04.77.13 1.13C7.69 8.89 4.1 6.92 1.67 3.92a4.93 4.93 0 00-.66 2.47c0 1.71.87 3.21 2.18 4.1a4.93 4.93 0 01-2.23-.61v.06c0 2.38 1.69 4.37 3.95 4.82a4.95 4.95 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 19.54a13.92 13.92 0 007.56 2.22c9.06 0 14.02-7.5 14.02-14.02 0-.21 0-.42-.02-.63A10.06 10.06 0 0024 4.56z" />
            </svg>
            X
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              shareText
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-green-600 text-white text-xs hover:bg-green-500 shadow-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.623-6.035C.122 5.422 5.477 0 12.073 0c3.2 0 6.199 1.247 8.463 3.51a11.837 11.837 0 013.51 8.461c-.003 6.594-5.478 11.95-12.066 11.95a12.19 12.19 0 01-6.05-1.623L.057 24zm6.597-3.807c1.74.995 3.283 1.591 5.421 1.592 5.448 0 9.885-4.41 9.888-9.843.002-2.625-1.025-5.088-2.887-6.947-1.857-1.859-4.303-2.887-6.932-2.887-5.448 0-9.885 4.41-9.888 9.842-.001 2.578 1.048 5.062 2.946 6.934l-.632 2.311 2.645-.657zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.148-1.758-.868-2.03-.967-.272-.099-.47-.148-.669.149-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.074-.297-.148-1.252-.461-2.38-1.464-.88-.788-1.474-1.761-1.647-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.174.198-.298.297-.497.099-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.571-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.148.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
            </svg>
            WhatsApp
          </a>

          {/* Copy Post */}
          <button
            onClick={() => navigator.clipboard.writeText(shareText)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-200 text-gray-800 text-xs hover:bg-gray-300 shadow-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16h8M8 12h8M8 8h8M4 4h16v16H4V4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
