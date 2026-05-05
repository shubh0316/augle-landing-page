"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "./assets/logo.png";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#171613] px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {/* Logo */}
        <Image src={logo} alt="Augle" width={320} priority />
        {/* Waitlist card */}
        <div className="w-full mt-4">
          <h2 className="text-[#D97858] text-2xl font-semibold mb-1">
            Join the waitlist
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Leave your email and we&apos;ll send you an invite when we launch the beta.
          </p>

          {submitted ? (
            <p className="text-[#D97858] text-center py-4">
              You&apos;re on the list! We&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex items-center bg-[#f5f0eb] rounded-lg px-4 py-3 gap-3">
                <svg
                  className="w-5 h-5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent flex-1 text-gray-700 placeholder-gray-400 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D97858] cursor-pointer hover:bg-[#a85a35] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Submit
              </button>
            </form>
          )}

          <p className="text-gray-500 text-xs text-center mt-3">
            No spam, no sharing, no selling. Just your invite when we&apos;re ready.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6">
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X / Twitter"
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </footer>
    </main>
  );
}
