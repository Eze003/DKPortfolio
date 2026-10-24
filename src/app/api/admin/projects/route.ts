import { NextRequest, NextResponse } from "next/server";
import { getDb, getProjectRepository } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/session";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// GET all projects (admin view — same as public for now)
export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  const db = await getDb();
  const projects = await getProjectRepository(db).find({
    order: { sortOrder: "ASC" },
  });
  return NextResponse.json(projects);
}

// POST — create a new project
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = await req.json();
  const db = await getDb();
  const repo = getProjectRepository(db);

  // Auto-assign sortOrder at end of list
  const maxOrder = await repo.maximum("sortOrder");
  const entity = repo.create({
    ...body,
    sortOrder: (maxOrder ?? -1) + 1,
  });

  const saved = await repo.save(entity);
  return NextResponse.json(saved, { status: 201 });
}
