export default function Footer() {
  return (
    <footer className="footer mt-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-neo text-gray-700">
      
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">


        {/* Brand */}
<div className="lg:col-span-3">
  <h3 className="text-2xl font-bold text-sky-700 mb-4">

    Dravik Asset Vault
  </h3>
  <p className="text-base leading-relaxed text-gray-700 max-w-xl">
    On-chain IP registration, licensing, and automated revenue sharing
    built for the next generation of digital creators.
  </p>
</div>

{/* Legal */}
<div className="lg:col-span-1">
  <h4 className="font-semibold mb-4">Legal</h4>
  <div className="flex flex-col gap-2 text-sm">
    <a href="/privacy" className="hover:text-sky-500 transition">
      Privacy Policy
    </a>
    <a href="/terms" className="hover:text-sky-500 transition">
      Terms of Service
    </a>
  </div>
</div>

{/* Connect */}
<div className="lg:col-span-1">
  <h4 className="font-semibold mb-4">Connect</h4>
  <div className="flex flex-col gap-2 text-sm">
    <a
      href="https://linkedin.com/in/siddharth-jagtap"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-sky-500 transition"
    >
      LinkedIn
    </a>
  </div>
        </div>
      </div>

      {/* Copyright - Always at bottom */}
      {/* Release Notice */}
<div className="border-t border-gray-200 text-center text-sm text-gray-500 py-6 space-y-2">

  <p className="text-gray-600">
    Version 1.0 — Initial Public Release.
    Continuously improving.
    Feedback and community contributions welcome.
  </p>

  <p>
    © {new Date().getFullYear()} Dravik Asset Vault. All rights reserved.
  </p>

</div>


    </footer>
  );
}
