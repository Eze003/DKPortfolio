import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ProjectEntity } from "@/lib/entities/Project";
import { isAdminAuthenticated } from "@/lib/session";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

type Params = { params: Promise<{ id: string }> };

// PUT — update an existing project
export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id } = await params;
  const body = await req.json();
  const db = await getDb();
  const repo = db.getRepository<ProjectEntity>("ProjectEntity");

  const existing = await repo.findOneBy({ id });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = repo.merge(existing, body);
  const saved = await repo.save(updated);
  return NextResponse.json(saved);
}

// DELETE — remove a project
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const { id } = await params;
  const db = await getDb();
  const repo = db.getRepository<ProjectEntity>("ProjectEntity");

  const existing = await repo.findOneBy({ id });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await repo.remove(existing);
  return NextResponse.json({ ok: true });
}
