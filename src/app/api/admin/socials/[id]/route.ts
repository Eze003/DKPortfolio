import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { SocialEntity } from "@/lib/entities/Social";
import { isAdminAuthenticated } from "@/lib/session";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  const { id } = await params;

  try {
    const body = await req.json();
    const db = await getDb();
    const repo = db.getRepository(SocialEntity);

    const existing = await repo.findOneBy({ id });
    if (!existing) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 });
    }

    repo.merge(existing, {
      ...body,
      enabled: body.enabled !== undefined ? Boolean(body.enabled) : existing.enabled,
    });

    const updated = await repo.save(existing);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT /api/admin/socials/[id]]", err);
    return NextResponse.json({ error: "Failed to update social link" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  const { id } = await params;

  try {
    const db = await getDb();
    const repo = db.getRepository(SocialEntity);
    const result = await repo.delete({ id });
    if (result.affected === 0) {
      return NextResponse.json({ error: "Social link not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/socials/[id]]", err);
    return NextResponse.json({ error: "Failed to delete social link" }, { status: 500 });
  }
}
