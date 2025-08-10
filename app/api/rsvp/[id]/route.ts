import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

function forbid() { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const isAdmin = (await cookies()).get("admin")?.value === "1"; if (!isAdmin) return forbid();
  const id = Number(params.id); const row = await prisma.rSVP.findUnique({ where: { id } });
  return NextResponse.json({ row });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const isAdmin = (await cookies()).get("admin")?.value === "1"; if (!isAdmin) return forbid();
  const id = Number(params.id);
  const body = await req.json();
  const updated = await prisma.rSVP.update({
    where: { id },
    data: {
      name: body.name?.trim(),
      email: body.email?.toLowerCase().trim(),
      phone: body.phone ?? null,
      relation: body.relation ?? null,
      attending: typeof body.attending === "boolean" ? body.attending : undefined,
      gender: body.gender && ["MALE","FEMALE"].includes(String(body.gender).toUpperCase())
        ? String(body.gender).toUpperCase() : undefined,
    },
  });
  return NextResponse.json({ row: updated });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const isAdmin = (await cookies()).get("admin")?.value === "1"; if (!isAdmin) return forbid();
  const id = Number(params.id);
  await prisma.rSVP.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
