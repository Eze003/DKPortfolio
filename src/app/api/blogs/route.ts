import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { BlogEntity } from "@/lib/entities/Blog";
import { initialBlogs } from "@/data/blogs";

export async function GET() {
  try {
    const db = await getDb();
    const blogs = await db
      .getRepository(BlogEntity)
      .find({ order: { sortOrder: "ASC" } });
    if (blogs && blogs.length > 0) {
      return NextResponse.json(blogs);
    }
    return NextResponse.json(initialBlogs);
  } catch (err) {
    console.error("[GET /api/blogs]", err);
    return NextResponse.json(initialBlogs);
  }
}
