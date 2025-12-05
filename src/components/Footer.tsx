

export default function Footer() {
  return (
    <footer className="footer flex flex-col sm:flex-row items-center justify-between px-6 py-6 mt-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-neo text-gray-700">
      {/* Left side: info */}
      <div className="text-sm sm:text-base">
        © {new Date().getFullYear()} Dravik Asset Licensing. All rights reserved.
      </div>

      {/* Right side: links */}
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <a
          href="/privacy"
          className="hover:text-sky-500 transition-colors text-sm sm:text-base"
        >
          Privacy Policy
        </a>
        <a
          href="/terms"
          className="hover:text-sky-500 transition-colors text-sm sm:text-base"
        >
          Terms of Service
        </a>
        <a
          href="https://dravik.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-500 transition-colors text-sm sm:text-base"
        >
          Visit Website
        </a>
      </div>
    </footer>
  );
}
