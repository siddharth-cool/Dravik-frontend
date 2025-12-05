
import logo from "../assets/logo.png";

type HeaderProps = {
  token: string | null;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
};

export default function Header({ token, onLogout }: HeaderProps) {
  return (
    <header className="header flex items-center justify-between px-6 py-4 mb-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-neo">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Dravik Logo" className="w-12 h-12 object-contain" />
        <div>
          <h1 className="header-title text-2xl sm:text-3xl font-extrabold text-sky-500">
            Dravik Asset Licensing
          </h1>
          <p className="header-subtitle text-gray-600 text-sm sm:text-base">
            Manage your digital assets securely
          </p>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all"
            >
              Logout
            </button>
            <a
              href="/"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-all"
            >
              Dashboard
            </a>
          </>
        ) : (
          <>
            <a
              href="/signup"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-500 text-white transition-all"
            >
              Signup
            </a>
            <a
              href="/login"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-all"
            >
              Login
            </a>
          </>
        )}
      </div>
    </header>
  );
}
