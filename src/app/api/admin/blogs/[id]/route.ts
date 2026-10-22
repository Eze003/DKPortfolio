import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { BlogEntity } from "@/lib/entities/Blog";
import { isAdminAuthenticated } from "@/lib/session";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  const { id } = await params;
  try {
    const db = await getDb();
    const blog = await db
      .getRepository(BlogEntity)
      .findOneBy({ id });
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  const { id } = await params;

  try {
    const body = await req.json();
    const db = await getDb();
    const repo = db.getRepository(BlogEntity);

    const existing = await repo.findOneBy({ id });
    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    repo.merge(existing, {
      ...body,
      paragraphs: Array.isArray(body.paragraphs)
        ? body.paragraphs
        : typeof body.paragraphs === "string"
        ? body.paragraphs.split("\n\n").filter(Boolean)
        : existing.paragraphs,
    });

    const updated = await repo.save(existing);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT /api/admin/blogs/[id]]", err);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  const { id } = await params;

  try {
    const db = await getDb();
    const repo = db.getRepository(BlogEntity);
    const result = await repo.delete({ id });
    if (result.affected === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/blogs/[id]]", err);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
