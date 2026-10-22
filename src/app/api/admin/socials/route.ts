import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { SocialEntity } from "@/lib/entities/Social";
import { isAdminAuthenticated } from "@/lib/session";
import { initialSocials } from "@/data/socials";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  try {
    const db = await getDb();
    const socials = await db
      .getRepository(SocialEntity)
      .find({ order: { sortOrder: "ASC" } });
    return NextResponse.json(socials);
  } catch (err) {
    console.error("[GET /api/admin/socials]", err);
    return NextResponse.json(initialSocials);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  try {
    const body = await req.json();
    const db = await getDb();
    const repo = db.getRepository(SocialEntity);

    const id =
      body.id ||
      body.platform?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      `social-${Date.now()}`;

    const maxOrder = await repo.maximum("sortOrder");
    const entity = repo.create({
      ...body,
      id,
      enabled: body.enabled !== undefined ? Boolean(body.enabled) : true,
      sortOrder: (maxOrder ?? -1) + 1,
    });

    const saved = await repo.save(entity);
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/socials]", err);
    return NextResponse.json({ error: "Failed to create social item" }, { status: 500 });
  }
}
