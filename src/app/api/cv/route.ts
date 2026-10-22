import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { CvEntity } from "@/lib/entities/Cv";

const DEFAULT_CV = {
  id: "active_cv",
  fileName: "DIKE_Resume.pdf",
  fileUrl: "/cv.pdf",
  fileSize: "2.4 MB",
  updatedAt: "Oct 21, 2026",
  downloadLabel: "Download CV",
};

export async function GET() {
  try {
    const db = await getDb();
    const cv = await db
      .getRepository(CvEntity)
      .findOneBy({ id: "active_cv" });
    return NextResponse.json(cv ?? DEFAULT_CV);
  } catch (err) {
    console.error("[GET /api/cv]", err);
    return NextResponse.json(DEFAULT_CV);
  }
}
