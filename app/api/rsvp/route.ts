import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin")?.value === "1";
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rsvps = await prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ rsvps });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.name || !body?.email || typeof body?.attending !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Require gender and normalize to "MALE" | "FEMALE"
    if (typeof body.gender !== "string") {
      return NextResponse.json({ error: "Gender is required" }, { status: 400 });
    }
    const g = String(body.gender).toUpperCase();
    if (g !== "MALE" && g !== "FEMALE") {
      return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
    }

    await prisma.rSVP.create({
      data: {
        name: String(body.name).trim(),
        email: String(body.email).trim().toLowerCase(),
        phone: body.phone ? String(body.phone).trim() : null,
        relation: body.relation ? String(body.relation).trim() : null,
        attending: Boolean(body.attending),
        gender: g,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
