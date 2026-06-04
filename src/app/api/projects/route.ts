import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ProjectEntity } from "@/lib/entities/Project";

export async function GET() {
  try {
    const db = await getDb();
    const projects = await db
      .getRepository<ProjectEntity>("ProjectEntity")
      .find({ order: { sortOrder: "ASC" } });
    return NextResponse.json(projects);
  } catch (err) {
    console.error("[GET /api/projects]", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
