import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { SocialEntity } from "@/lib/entities/Social";
import { initialSocials } from "@/data/socials";

export async function GET() {
  try {
    const db = await getDb();
    const socials = await db
      .getRepository(SocialEntity)
      .find({ where: { enabled: true }, order: { sortOrder: "ASC" } });
    if (socials && socials.length > 0) {
      return NextResponse.json(socials);
    }
    return NextResponse.json(initialSocials);
  } catch (err) {
    console.error("[GET /api/socials]", err);
    return NextResponse.json(initialSocials);
  }
}
