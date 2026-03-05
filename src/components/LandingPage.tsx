import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage(
) 
{useEffect(() => {
  window.scrollTo(0, 0);
}, []);

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
        {/* HERO BUTTONS */}
<div className="flex gap-6 ">
  {/* Get Started Button */}
  <Link
    to="/signup"
    className="bg-green-600 px-8 py-3 no-underline rounded-xl text-white hover:bg-green-500 transition flex items-center gap-3 shadow-lg hover:shadow-xl"
  >
    {/* Rocket Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l-4-4 4-4m5 0l4 4-4 4" />
    </svg>
    Get Started
  </Link>

  {/* Login Button */}
  <Link
    to="/login"
    className="bg-sky-600 px-8 py-3 no-underline rounded-xl text-white hover:bg-sky-500 transition flex items-center gap-3 shadow-lg hover:shadow-xl"
  >
    {/* Login Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m12 0l-4-4m4 4l-4 4" />
    </svg>
    Login
  </Link>

</div>

      </section>
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
{/* --------------------------- */}
{/*      COMMUNITY + AUTHOR     */}
{/* --------------------------- */}

  <div className="max-w-6xl mx-auto">

    {/* Reviews */}
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
      What Creators Are Saying
    </h2>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {[
        {
          name: "Ananya Sharma",
          review: "Finally a proper Web3 IP licensing platform. Clean, powerful & future-ready."
        },
        {
          name: "Rahul Mehta",
          review: "Revenue sharing automation is insane. This changes digital ownership."
        },
        {
          name: "CryptoDAO",
          review: "On-chain IP licensing done right. Extremely impressive execution."
        }
      ].map((item, i) => (
        <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-600 italic mb-4">“{item.review}”</p>
          <h4 className="font-semibold text-sky-600">— {item.name}</h4>
        </div>
      ))}
    </div>

    {/* Post Review Button */}
    {/* Post Review Button */}
<div className="text-center mb-20">
  <Link
  to="/signup"
  className="bg-sky-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-sky-500 transition font-semibold flex items-center justify-center gap-2 max-w-[200px] mx-auto no-underline focus:outline-none"
>
  {/* SVG icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-7-9-7-9 7 9 7z" />
  </svg>
  Post Review
</Link>

</div>


{/* Social Links */}
<div className="text-center mb-16">
  <h3 className="text-2xl font-bold text-gray-800 mb-6">
    Join The Community
  </h3>

  <div className="flex justify-center gap-6">

    <a
      href="https://twitter.com/YOUR_HANDLE"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition shadow flex items-center no-underline gap-2"
    >
      {/* Twitter Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.72 9.72 0 01-3.13 1.2A4.52 4.52 0 0016.88 0c-2.63 0-4.77 2.13-4.77 4.77 0 .37.04.73.12 1.08C7.69 6.68 4.07 4.77 1.64 1.89a4.73 4.73 0 00-.64 2.4c0 1.66.85 3.12 2.14 3.97A4.5 4.5 0 01.96 7v.06c0 2.33 1.66 4.28 3.85 4.72a4.54 4.54 0 01-2.14.08c.61 1.9 2.38 3.28 4.47 3.32A9.05 9.05 0 010 19.54 12.72 12.72 0 006.92 21c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.59A9.22 9.22 0 0023 3z"/>
      </svg>
      Twitter / X
    </a>

    <a
      href="https://www.linkedin.com/in/siddharth-jagtap-2a137831a"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition no-underline shadow flex items-center gap-2"
    >
      {/* LinkedIn Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm.02 4.5H0v16h5V8zm7 0h-5v16h5v-8.5c0-2.36 3-2.55 3 0v8.5h5v-10c0-5.22-5-5-6-2.45V8z"/>
      </svg>
      LinkedIn
    </a>

  </div>
</div>


    {/* About Author */}
    <div className="bg-gradient-to-r from-sky-100 to-sky-50 p-10 rounded-3xl shadow-xl text-center">

  
  <img
    src="/assets/tony-stark gif.gif"   // add your photo here
    className="w-28 h-28 rounded-full mx-auto mb-6 object-cover shadow-lg"
  />

  <h3 className="text-2xl font-bold text-gray-800 mb-2">
    Built & Designed By
  </h3>

  <p className="text-xl font-semibold text-sky-700 mb-4">
    Siddharth Jagtap
  </p>

  <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
    Web3 developer focused on IPFi, blockchain licensing, and decentralized
    intellectual property infrastructure. Dravik Asset Vault is built with
    a long-term vision of secure, programmable digital ownership.
  </p>

  <a
  href="https://www.linkedin.com/in/siddharth-jagtap-2a137831a"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center no-underline gap-2 mt-6 bg-sky-600 text-white px-6 py-2 rounded-xl shadow hover:bg-sky-500 transition"
>
  {/* LinkedIn Icon */}
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm.02 4.5H0v16h5V8zm7 0h-5v16h5v-8.5c0-2.36 3-2.55 3 0v8.5h5v-10c0-5.22-5-5-6-2.45V8z"/>
  </svg>
  Connect on LinkedIn
</a>

</div>


  </div>


    </div>
  );
}
