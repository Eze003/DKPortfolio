import { NextResponse } from "next/server";
import { getDb, getProjectRepository } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const projects = await getProjectRepository(db).find({
      order: { sortOrder: "ASC" },
    });
    return NextResponse.json(projects);
  } catch (err) {
    console.error("[GET /api/projects]", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
