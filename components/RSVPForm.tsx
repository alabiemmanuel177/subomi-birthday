"use client";

import { useState } from "react";

export default function RSVPForm() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<{ ok: boolean; message: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setState(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          relation: data.relation || null,
          attending: data.attending === "yes",
          gender: data.gender, // "MALE" | "FEMALE"
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Something went wrong");
      setState({ ok: true, message: "You're warmly invited to a radiant afternoon of sparkle and love" });
      form.reset();
    } catch (err: any) {
      setState({ ok: false, message: err.message || "Failed to RSVP" });
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3.5 text-base sm:text-lg outline-none focus:ring-2 focus:ring-silver-500 placeholder:text-silver-300/60";

  const legendCls = "text-base sm:text-lg font-medium";

  const radioWrap =
    "inline-flex items-center gap-2 rounded-lg border border-silver-400/30 bg-denim-900/40 px-4 py-2 hover:brightness-110";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm sm:text-base mb-1.5">Full Name *</label>
          <input required name="name" className={inputCls} placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-sm sm:text-base mb-1.5">Email Address *</label>
          <input type="email" required name="email" className={inputCls} placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm sm:text-base mb-1.5">Phone Number</label>
          <input name="phone" className={inputCls} placeholder="+234…" />
        </div>
        <div>
          <label className="block text-sm sm:text-base mb-1.5">How do you know the celebrant?</label>
          <input name="relation" className={inputCls} placeholder="Friend, cousin, classmate…" />
        </div>
      </div>

      {/* Gender */}
      <fieldset className="space-y-3">
        <legend className={legendCls}>Gender *</legend>
        <div className="flex flex-wrap gap-3">
          <label className={radioWrap}>
            <input type="radio" name="gender" value="MALE" required className="accent-silver-300" />
            <span className="text-base sm:text-lg">Male</span>
          </label>
          <label className={radioWrap}>
            <input type="radio" name="gender" value="FEMALE" required className="accent-silver-300" />
            <span className="text-base sm:text-lg">Female</span>
          </label>
        </div>
      </fieldset>

      {/* Attending */}
      <fieldset className="space-y-3">
        <legend className={legendCls}>Will you be attending? *</legend>
        <div className="flex flex-wrap gap-3">
          <label className={radioWrap}>
            <input type="radio" name="attending" value="yes" required className="accent-silver-300" />
            <span className="text-base sm:text-lg">Yes</span>
          </label>
          <label className={radioWrap}>
            <input type="radio" name="attending" value="no" required className="accent-silver-300" />
            <span className="text-base sm:text-lg">No</span>
          </label>
        </div>
      </fieldset>

      <div className="pt-2">
        <button disabled={loading} className="btn w-full sm:w-auto text-base sm:text-lg px-7 py-4">
          {loading ? "Submitting..." : "Submit RSVP"}
        </button>
      </div>

      {state && (
        <p className={`text-base ${state.ok ? "text-green-300" : "text-red-300"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
