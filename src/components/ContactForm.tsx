"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setError("Failed to send message");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-green-500/30 bg-green-500/5 p-6 text-center">
        <p className="font-pixel text-[11px] text-green-500">
          QUEST REQUEST SENT
        </p>
        <p className="font-mono text-xs text-retro-muted mt-2">
          I&apos;ll respond to your quest soon.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-4 font-mono text-xs text-retro-amber hover:underline"
        >
          START ANOTHER QUEST
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="font-mono text-[10px] text-retro-muted block mb-1">
          &gt; YOUR NAME
        </label>
        <input
          id="contact-name"
          name="name"
          required
          className="w-full border border-retro-brown/30 bg-retro-card/30 px-3 py-2 font-mono text-xs text-retro-tan focus:border-retro-amber focus:outline-none transition-colors placeholder:text-retro-brown/30"
          placeholder="Your name..."
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="font-mono text-[10px] text-retro-muted block mb-1">
          &gt; YOUR EMAIL
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full border border-retro-brown/30 bg-retro-card/30 px-3 py-2 font-mono text-xs text-retro-tan focus:border-retro-amber focus:outline-none transition-colors placeholder:text-retro-brown/30"
          placeholder="your@email.com..."
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="font-mono text-[10px] text-retro-muted block mb-1">
          &gt; QUEST DESCRIPTION
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full border border-retro-brown/30 bg-retro-card/30 px-3 py-2 font-mono text-xs text-retro-tan focus:border-retro-amber focus:outline-none transition-colors resize-none placeholder:text-retro-brown/30"
          placeholder="Write something..."
        />
      </div>

      {state === "error" && (
        <p className="font-mono text-[10px] text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full border-2 border-retro-amber px-6 py-3 font-pixel text-[11px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "sending" ? "SENDING QUEST REQUEST..." : "SEND QUEST REQUEST"}
      </button>
    </form>
  );
}
