import  { useState } from "react";

export default function AssetCard({ asset }: any) {
  const [showLicense, setShowLicense] = useState(false);

  return (
    <div className="group card transition-all hover:scale-[1.03] px-6 py-5 flex flex-col">
      {/* IMAGE */}
      {asset.imageUrl && (
        <div className="mb-4 w-full rounded-lg overflow-hidden">
          <img
            src={asset.imageUrl}
            alt={asset?.metadata?.title}
            className="w-full object-contain rounded-lg shadow-md"
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

          <p className="text-gray-500 text-xs"><strong>Creator:</strong> {asset.metadata?.creatorName}</p>
          <p className="text-gray-500 text-xs truncate mb-2">
            <strong>Wallet:</strong> {asset.metadata?.creatorWallet}
          </p>

          <a
            href={asset.explorer}
            target="_blank"
            className="text-sky-600 text-xs underline"
          >
            View on Explorer →
          </a>
        </div>

        {/* LICENSE */}
        {asset.license && (
          <div className="mt-3">
            <button
              onClick={() => setShowLicense(!showLicense)}
              className="w-full py-2 rounded-lg text-white bg-sky-600 text-sm hover:bg-sky-500"
            >
              {showLicense ? "Hide License" : "Show License"}
            </button>

            {showLicense && (
  <div className="mt-2 p-3 rounded-lg bg-black/30 text-white text-xs space-y-1 border border-white/10">
    <p><strong>Commercial:</strong> {asset.license.commercialUse ? "Allowed" : "Not Allowed"}</p>
    <p><strong>Derivatives:</strong> {asset.license.derivativesAllowed ? "Allowed" : "Not Allowed"}</p>
    <p><strong>AI Training:</strong> {asset.license.aiTraining ? "Allowed" : "Not Allowed"}</p>
    <p><strong>Rev Share:</strong> {asset.license.commercialRevShare}%</p>
    <p><strong>Max Licenses:</strong> {asset.license.maxLicenses}</p>
    <p><strong>Transferable:</strong> {asset.license.transferable ? "Yes" : "No"}</p>
  </div>
)}

          </div>
        )}
      </div>
    </div>
  );
}
