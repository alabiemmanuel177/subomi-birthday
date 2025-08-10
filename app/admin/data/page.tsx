"use client";
import { useEffect, useState } from "react";

type Row = {
  id:number; createdAt:string; name:string; email:string;
  phone?:string|null; relation?:string|null; attending:boolean; gender?:string|null;
};

export default function DataBrowser() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row|null>(null);
  const [error, setError] = useState<string|null>(null);

  async function load() {
    setError(null);
    const res = await fetch("/api/rsvp", { credentials:"include" });
    if (res.status === 401) { setError("Unauthorized"); return; }
    const json = await res.json(); setRows(json.rsvps||[]);
  }

  useEffect(() => { load(); }, []);

  async function save(row: Row) {
    const res = await fetch(`/api/rsvp/${row.id}`, {
      method:"PATCH", headers:{ "Content-Type":"application/json" }, credentials:"include",
      body: JSON.stringify(row),
    });
    if (!res.ok) { setError("Failed to save"); return; }
    setEditing(null); load();
  }

  async function remove(id:number) {
    if (!confirm("Delete this RSVP?")) return;
    const res = await fetch(`/api/rsvp/${id}`, { method:"DELETE", credentials:"include" });
    if (!res.ok) { setError("Failed to delete"); return; }
    load();
  }

  return (
    <div className="section py-12">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Data Browser</h1>
        <button onClick={load} className="btn">Refresh</button>
      </div>
      {error && <p className="text-red-300 mb-3">{error}</p>}
      <div className="card p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-denim-900/50">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Relation</th>
              <th className="p-3 text-left">Attending</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="odd:bg-denim-900/20">
                <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.gender ?? "—"}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.phone ?? "—"}</td>
                <td className="p-3">{r.relation ?? "—"}</td>
                <td className="p-3">{r.attending ? "Yes" : "No"}</td>
                <td className="p-3 text-right">
                  <button className="btn bg-denim-600 text-silver-100 mr-2"
                          onClick={() => setEditing(r)}>Edit</button>
                  <button className="btn" onClick={() => remove(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={8} className="p-6 text-center">No data.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* quick edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
             onClick={(e)=>{ if(e.target===e.currentTarget) setEditing(null); }}>
          <div className="card w-full max-w-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Edit RSVP</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm">Name
                <input className="w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3"
                       value={editing.name} onChange={e=>setEditing({...editing, name:e.target.value})}/>
              </label>
              <label className="text-sm">Email
                <input className="w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3"
                       value={editing.email} onChange={e=>setEditing({...editing, email:e.target.value})}/>
              </label>
              <label className="text-sm">Phone
                <input className="w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3"
                       value={editing.phone??""} onChange={e=>setEditing({...editing, phone:e.target.value})}/>
              </label>
              <label className="text-sm">Relation
                <input className="w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3"
                       value={editing.relation??""} onChange={e=>setEditing({...editing, relation:e.target.value})}/>
              </label>
              <label className="text-sm">Gender
                <select className="w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3"
                        value={editing.gender??""}
                        onChange={e=>setEditing({...editing, gender:e.target.value as any})}>
                  <option value="">—</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </label>
              <label className="text-sm">Attending
                <select className="w-full rounded-lg bg-denim-900/50 border border-silver-400/30 p-3"
                        value={editing.attending ? "yes":"no"}
                        onChange={e=>setEditing({...editing, attending: e.target.value==="yes"})}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn" onClick={()=>setEditing(null)}>Cancel</button>
              <button className="btn bg-denim-600 text-silver-100"
                      onClick={()=>save(editing)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 