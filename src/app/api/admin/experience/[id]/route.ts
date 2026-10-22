import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ExperienceEntity } from "@/lib/entities/Experience";
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
    const repo = db.getRepository(ExperienceEntity);

    const existing = await repo.findOneBy({ id });
    if (!existing) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    repo.merge(existing, {
      ...body,
      skills: Array.isArray(body.skills)
        ? body.skills
        : typeof body.skills === "string"
        ? body.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
        : existing.skills,
    });

    const updated = await repo.save(existing);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT /api/admin/experience/[id]]", err);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
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
    const repo = db.getRepository(ExperienceEntity);
    const result = await repo.delete({ id });
    if (result.affected === 0) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/experience/[id]]", err);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
