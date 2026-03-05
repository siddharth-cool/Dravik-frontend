import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";

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
      <div className="flex items-center gap-4">
        {token ? (
          <>
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="bg-red-600 px-6 py-3 no-underline rounded-xl text-white hover:bg-red-500 transition flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
            >
              {/* Logout Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              Logout
            </button>

            {/* Dashboard Link */}
            <Link
              to="/"
              className="bg-sky-600 px-6 py-3 no-underline rounded-xl text-white hover:bg-sky-500 transition flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
            >
              {/* Dashboard Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
              </svg>
              Dashboard
            </Link>
          </>
        ) : (
          <>
            {/* Signup */}
            <Link
              to="/signup"
              className="bg-green-600 px-6 py-3 no-underline rounded-xl text-white hover:bg-green-500 transition flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
            >
              {/* Signup Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Signup
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="bg-sky-600 px-6 py-3 rounded-xl no-underline text-white hover:bg-sky-500 transition flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold"
            >
              {/* Login Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m12 0l-4-4m4 4l-4 4" />
              </svg>
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
