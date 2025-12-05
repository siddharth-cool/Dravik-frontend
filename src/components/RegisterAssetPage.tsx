
import RegisterAsset from "./RegisterAsset";
import Sidebar from "./Sidebar";

type Props = { token: string };

export default function RegisterAssetPage({ token }: Props) {
  return (
    <div><Sidebar />
    <div className="max-w-4xl mx-auto mt-12 space-y-8">
      <h2 className="text-3xl font-bold text-sky-600">Register New Asset</h2>

      <div className="card p-6">
        <RegisterAsset token={token} onSuccess={() => {}} />
      </div>
    </div>
    </div>
  );
}
