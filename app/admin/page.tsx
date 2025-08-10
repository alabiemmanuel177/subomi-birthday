"use client";

import { useEffect, useState } from "react";

type RSVP = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  phone?: string | null;
  relation?: string | null;
  attending: boolean;
  gender?: "MALE" | "FEMALE" | null;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pass, setPass] = useState("");
  const [list, setList] = useState<RSVP[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    const res = await fetch("/api/rsvp", { method: "GET", credentials: "include" });
    if (res.status === 401) { setAuthed(false); return; }
    if (!res.ok) { setError("Failed to load"); setAuthed(false); return; }
    const json = await res.json();
    setList(json.rsvps || []);
    setAuthed(true);
  }

  useEffect(() => { check(); }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ passcode: pass }),
    });
    if (res.ok) check();
    else setError("Incorrect passcode");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setList(null);
  }

  async function exportCSV() {
    const a = document.createElement("a");
    a.href = "/api/rsvps.csv";
    a.download = "rsvps.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  if (authed === null) return <div className="section py-16">Loading…</div>;

  if (!authed) {
    return (
      <div className="section py-16 max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={login} className="card p-6 space-y-3">
          <input
            type="password"
            placeholder="Enter passcode"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3 outline-none focus:ring-2 focus:ring-silver-500"
          />
          <button className="btn w-full">Sign in</button>
          {error && <p className="text-red-300">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="section py-12">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">RSVPs</h1>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="btn">Export CSV</button>
          <button onClick={logout} className="btn bg-denim-600 text-silver-100">Logout</button>
        </div>
      </div>
      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-denim-900/50">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Gender</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Relation</th>
              <th className="text-left p-3">Attending</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((r) => (
              <tr key={r.id} className="odd:bg-denim-900/20">
                <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.gender ? (r.gender === "MALE" ? "Male" : "Female") : "—"}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.phone || "—"}</td>
                <td className="p-3">{r.relation || "—"}</td>
                <td className="p-3">{r.attending ? "Yes" : "No"}</td>
              </tr>
            ))}
            {!list?.length && (
              <tr><td className="p-4 text-center" colSpan={7}>No RSVPs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
