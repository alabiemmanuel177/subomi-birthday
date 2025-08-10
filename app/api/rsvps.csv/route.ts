import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin")?.value === "1";
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
  const header = ["id","createdAt","name","email","phone","relation","gender","attending"];
  const csv = [
    header.join(","),
    ...rows.map(r =>
      [
        r.id,
        r.createdAt.toISOString(),
        r.name,
        r.email,
        r.phone ?? "",
        r.relation ?? "",
        r.gender ?? "",
        r.attending ? "Yes" : "No",
      ].map(String).join(",")
    )
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=rsvps.csv",
    },
  });
}
