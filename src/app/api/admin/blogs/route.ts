import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { BlogEntity } from "@/lib/entities/Blog";
import { isAdminAuthenticated } from "@/lib/session";
import { initialBlogs } from "@/data/blogs";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  try {
    const db = await getDb();
    const blogs = await db
      .getRepository(BlogEntity)
      .find({ order: { sortOrder: "ASC" } });
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("[GET /api/admin/blogs]", err);
    return NextResponse.json(initialBlogs);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  try {
    const body = await req.json();
    const db = await getDb();
    const repo = db.getRepository(BlogEntity);

    const slug =
      body.slug ||
      body.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") ||
      `blog-${Date.now()}`;

    const maxOrder = await repo.maximum("sortOrder");
    const entity = repo.create({
      ...body,
      id: slug,
      slug,
      paragraphs: Array.isArray(body.paragraphs)
        ? body.paragraphs
        : typeof body.paragraphs === "string"
        ? body.paragraphs.split("\n\n").filter(Boolean)
        : [],
      sortOrder: (maxOrder ?? -1) + 1,
    });

    const saved = await repo.save(entity);
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/blogs]", err);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
