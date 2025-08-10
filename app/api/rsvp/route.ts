import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { render } from "@react-email/render";
import RSVPConfirm from "@/emails/RSVPConfirm";
import RSVPNotify from "@/emails/RSVPNotify";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    // Require gender as "MALE" | "FEMALE" (we store as string)
    if (typeof body.gender !== "string") {
      return NextResponse.json({ error: "Gender is required" }, { status: 400 });
    }
    const g = String(body.gender).toUpperCase();
    if (g !== "MALE" && g !== "FEMALE") {
      return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
    }

    // Save
    const saved = await prisma.rSVP.create({
      data: {
        name: String(body.name).trim(),
        email: String(body.email).trim().toLowerCase(),
        phone: body.phone ? String(body.phone).trim() : null,
        relation: body.relation ? String(body.relation).trim() : null,
        attending: Boolean(body.attending),
        gender: g,
      },
    });

    // Fire-and-forget emails (don’t block RSVP if email fails)
    const from = process.env.RSVP_FROM!;
    const adminTo = process.env.RSVP_ADMIN_TO;
    const replyTo = process.env.RSVP_REPLY_TO;

    // 1) guest confirmation
    const confirmHtml = await render(
      RSVPConfirm({
        name: saved.name,
        attending: saved.attending,
        gender: (saved.gender as "MALE" | "FEMALE" | undefined) || undefined,
        relation: saved.relation,
        dateText: "Saturday, 23rd August",
        startText: "Arrivals 5:00 PM • Start 6:00 PM",
      })
    );

    // 2) admin notification
    const notifyHtml = await render(
      RSVPNotify({
        name: saved.name,
        email: saved.email,
        phone: saved.phone,
        relation: saved.relation,
        gender: (saved.gender as "MALE" | "FEMALE" | undefined) || undefined,
        attending: saved.attending,
      })
    );

    // Send in parallel (if keys are present)
    if (process.env.RESEND_API_KEY && from) {
      const tasks: Promise<unknown>[] = [];

      tasks.push(
        resend.emails.send({
          from,
          to: saved.email,
          subject: saved.attending
            ? "You're in — Subomi’s Denim & Diamonds ✨"
            : "RSVP received — Subomi’s Denim & Diamonds",
          html: confirmHtml,
          replyTo: replyTo,
        })
      );

      if (adminTo) {
        tasks.push(
          resend.emails.send({
            from,
            to: adminTo,
            subject: `New RSVP — ${saved.name} (${saved.attending ? "Attending" : "Not attending"})`,
            html: notifyHtml,
          })
        );
      }

      // Do not await for user-perceived speed, but log errors
      Promise.allSettled(tasks).then((results) => {
        results.forEach((r) => {
          if (r.status === "rejected") console.error("Email error:", r.reason);
        });
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
