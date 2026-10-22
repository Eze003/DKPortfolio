import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ExperienceEntity } from "@/lib/entities/Experience";
import { initialExperiences } from "@/data/experience";

export async function GET() {
  try {
    const db = await getDb();
    const experiences = await db
      .getRepository(ExperienceEntity)
      .find({ order: { sortOrder: "ASC" } });
    if (experiences && experiences.length > 0) {
      return NextResponse.json(experiences);
    }
    return NextResponse.json(initialExperiences);
  } catch (err) {
    console.error("[GET /api/experience]", err);
    return NextResponse.json(initialExperiences);
  }
}
