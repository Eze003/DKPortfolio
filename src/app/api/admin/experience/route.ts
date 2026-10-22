import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ExperienceEntity } from "@/lib/entities/Experience";
import { isAdminAuthenticated } from "@/lib/session";
import { initialExperiences } from "@/data/experience";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  try {
    const db = await getDb();
    const experiences = await db
      .getRepository(ExperienceEntity)
      .find({ order: { sortOrder: "ASC" } });
    return NextResponse.json(experiences);
  } catch (err) {
    console.error("[GET /api/admin/experience]", err);
    return NextResponse.json(initialExperiences);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  try {
    const body = await req.json();
    const db = await getDb();
    const repo = db.getRepository(ExperienceEntity);

    const id = body.id || `exp-${Date.now()}`;
    const maxOrder = await repo.maximum("sortOrder");

    const entity = repo.create({
      ...body,
      id,
      skills: Array.isArray(body.skills)
        ? body.skills
        : typeof body.skills === "string"
        ? body.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
      sortOrder: (maxOrder ?? -1) + 1,
    });

    const saved = await repo.save(entity);
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/experience]", err);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
