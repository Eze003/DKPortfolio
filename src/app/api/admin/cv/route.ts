import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { CvEntity } from "@/lib/entities/Cv";
import { isAdminAuthenticated } from "@/lib/session";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const DEFAULT_CV = {
  id: "active_cv",
  fileName: "DIKE_Resume.pdf",
  fileUrl: "/cv.pdf",
  fileSize: "2.4 MB",
  updatedAt: "Oct 21, 2026",
  downloadLabel: "Download CV",
};

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  try {
    const db = await getDb();
    const cv = await db
      .getRepository(CvEntity)
      .findOneBy({ id: "active_cv" });
    return NextResponse.json(cv ?? DEFAULT_CV);
  } catch (err) {
    console.error("[GET /api/admin/cv]", err);
    return NextResponse.json(DEFAULT_CV);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  try {
    const body = await req.json();
    const db = await getDb();
    const repo = db.getRepository(CvEntity);

    let cv = await repo.findOneBy({ id: "active_cv" });
    if (!cv) {
      cv = repo.create({
        id: "active_cv",
        fileName: body.fileName || "Resume.pdf",
        fileUrl: body.fileUrl,
        fileSize: body.fileSize || "1.5 MB",
        updatedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        downloadLabel: body.downloadLabel || "Download CV",
      });
    } else {
      repo.merge(cv, {
        fileName: body.fileName || cv.fileName,
        fileUrl: body.fileUrl || cv.fileUrl,
        fileSize: body.fileSize || cv.fileSize,
        updatedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        downloadLabel: body.downloadLabel || cv.downloadLabel,
      });
    }

    const saved = await repo.save(cv);
    return NextResponse.json(saved);
  } catch (err) {
    console.error("[POST /api/admin/cv]", err);
    return NextResponse.json({ error: "Failed to update CV" }, { status: 500 });
  }
}
