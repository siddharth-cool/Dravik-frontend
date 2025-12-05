import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#ebeff5] to-[#e2e8f0]">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-sky-700 mb-4 drop-shadow-sm">
          Dravik Asset Vault
        </h1>

        <p className="text-gray-700 max-w-2xl text-lg sm:text-xl mb-10">
          A next-gen IPFi platform — Register, License and Monetize your digital creations 
          using on-chain IP licensing and automated revenue sharing.
        </p>

        <div className="flex gap-6">
          <Link
            to="/signup"
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition font-semibold shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-500 transition font-semibold shadow-lg hover:shadow-xl"
          >
            Login
          </Link>
        </div>
      </section>
{/* --------------------------- */} 
{/* TRUSTED BY SLIDER */} 
{/* --------------------------- */} 
{/* TRUSTED BY SLIDER */}
<section className="bg-white/50 backdrop-blur-md py-12 mb-24">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
    Trusted & Powered By
  </h2>

  <div className="overflow-hidden relative">
    <div className="flex gap-20 px-10 animate-marquee whitespace-nowrap">

      {/* row 1 */}
      {[
        "/assets/logos/pizzadao.png",
        "/assets/logos/storyprotocol.png",
        "/assets/logos/ethereum.png",
        "/assets/logos/ipfs.png",
        "/assets/logos/chainlink.png",
        "/assets/logos/pinata.png",
        "/assets/logos/solidity.png"
      ].map((logo, i) => (
        <img
          key={i}
          src={logo}
          className="h-20 w-auto opacity-80 hover:opacity-100 transition"
        />
      ))}

      {/* row 2 – duplicate */}
      {[
        "/assets/logos/pizzadao.png",
        "/assets/logos/storyprotocol.png",
        "/assets/logos/ethereum.png",
        "/assets/logos/ipfs.png",
        "/assets/logos/chainlink.png"
      ].map((logo, i) => (
        <img
          key={`dup-${i}`}
          src={logo}
          className="h-20 w-auto opacity-80 hover:opacity-100 transition"
        />
      ))}
    </div>
  </div>
</section>


      {/* ------------------------------- */}
      {/*      ECOSYSTEM PARTNER CARDS     */}
      {/* ------------------------------- */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Powered By Leading Web3 Ecosystems
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* PizzaDAO */}
          <div className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/logos/pizzadao.png"
                alt="Pizza DAO"
                className="h-22 w-22 object-contain group-hover:scale-110 transition"
              />
            </div>
            <h3 className="text-xl font-bold text-sky-700 text-center mb-3">
              PizzaDAO IP Integration
            </h3>
            <p className="text-gray-600 text-center">
              Use & remix PizzaDAO’s open-licensed IP, fully compatible inside Dravik Vault.
            </p>
          </div>

          {/* Story Protocol */}
          <div className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/logos/storyprotocol.png"
                alt="Story Protocol"
                className="h-22 w-22 object-contain group-hover:scale-110 transition"
              />
            </div>
            <h3 className="text-xl font-bold text-purple-700 text-center mb-3">
              Registered On Story Protocol
            </h3>
            <p className="text-gray-600 text-center">
              Assets are on-chain with authenticated ownership, lineage & traceability.
            </p>
          </div>

          {/* Licensing + Revenue */}
          <div className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/logos/license.png"
                alt="Licensing"
                className="h-22 w-22 object-contain group-hover:scale-110 transition"
              />
            </div>
            <h3 className="text-xl font-bold text-green-700 text-center mb-3">
              IP Licensing & Revenue Claims
            </h3>
            <p className="text-gray-600 text-center">
              Simple licensing, transparent payouts, automated revenue sharing.
            </p>
          </div>

        </div>
      </section>

      {/* --------------------------- */}
      {/*      TRUSTED BY SLIDER     */}
      {/* --------------------------- */}
      <section className="max-w-[1500px] mx-auto px-8 mb-28">
  <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-14">
    How It Works
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-16">

    {/* STEP 1 */}
    <div className="w-full p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition 
      transform hover:-translate-y-3 min-h-[460px] flex flex-col justify-start">

      <div className="flex items-center justify-center gap-5 mb-18">
        <img
          src="/assets/icons/registerIp.png"
          className="h-26 w-24 object-contain"
        />
        <img
          src="/assets/icons/arrow.png"
          className="h-10 w-10 object-contain opacity-80"
        />
        <img
          src="/assets/logos/pizza1.png"
          className="h-28 w-26 object-contain"
        />
      </div>

      <h3 className="text-2xl font-bold text-purple-700 text-center mb-4">
        1. Register Your IP + PizzaDAO Remix
      </h3>

      <p className="text-gray-600 text-center text-lg leading-relaxed">
        Register your work — optionally remix PizzaDAO’s open IP.
      </p>
    </div>

    {/* STEP 2 */}
    <div className="w-full p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition 
      transform hover:-translate-y-3 min-h-[460px] flex flex-col justify-start">

      <img
        src="/assets/icons/marketplace.png"
        className="h-45 w-48 mb-3 mx-auto object-contain"
      />

      <h3 className="text-2xl font-bold text-sky-700 text-center mb-4">
        2. Add to Marketplace
      </h3>

      <p className="text-gray-600 text-center text-lg leading-relaxed">
        Set pricing & publish your asset with remix compatibility tags.
      </p>
    </div>

    {/* STEP 3 */}
    <div className="w-full p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition 
      transform hover:-translate-y-3 min-h-[460px] flex flex-col justify-start">

      <img
        src="/assets/icons/money.png"
        className="h-45 w-40 mb-3 mx-auto object-contain"
      />

      <h3 className="text-2xl font-bold text-green-700 text-center mb-4">
        3. License & Claim Revenue
      </h3>

      <p className="text-gray-600 text-center text-lg leading-relaxed">
        Buyers license your IP. Revenue is paid automatically.
      </p>
    </div>

  </div>
</section>



      {/* --------------------------- */}
      {/*       DEMO ASSETS           */}
      {/* --------------------------- */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Demo Creations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "Mystic Forest", image: "/assets/demo/demo1.jpg" },
            { title: "Digital Wave", image: "/assets/demo/demo2.jpg" },
            { title: "Neon City", image: "/assets/demo/demo3.jpg" },
          ].map((asset, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center transform hover:-translate-y-3 hover:scale-105 transition-all duration-300"
            >
              <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border-4 border-sky-200 shadow-inner">
                <img src={asset.image} alt={asset.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-800 font-semibold text-center text-lg">
                {asset.title}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
