"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "./assets/logo.png";
import emailIcon from "./assets/email-icon.png";
import substackIcon from "./assets/substack.png";

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
          <p className="text-[#F7F6F2] text-xs mb-4 whitespace-nowrap">
            Leave your email and we&apos;ll send you an invite when we launch the beta.
          </p>

          {submitted ? (
            <p className="text-[#D97858] text-center py-4">
              You&apos;re on the list! We&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex items-center bg-[#F4F1EB] border border-[#B1ADA5] rounded-lg px-4 py-3 gap-3">
                <Image src={emailIcon} alt="email" className="w-5 h-5 shrink-0" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-email bg-transparent flex-1 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="btn-submit w-full bg-[#C15F3C] border border-[#D97858] cursor-pointer text-white py-3 rounded-lg"
              >
                Submit
              </button>
            </form>
          )}
          <p className="text-[#F7F6F2] text-xs text-center mt-3">
            No spam, no sharing, no selling. Just your invite when we&apos;re ready.
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-6 flex items-center gap-4">
        <a
          href="https://augle.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Substack"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <Image src={substackIcon} alt="Substack" className="w-6 h-6" />
        </a>
      </footer>
    </main>
  );
}
